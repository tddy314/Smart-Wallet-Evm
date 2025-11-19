// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {SmartWalletStorage} from "./abstract/SmartWalletStorage.sol";
import {ISmartWalletFactory} from "../interface/ISmartWalletFactory.sol";
import {IWormhole} from "../interface/IWormhole.sol";
import {ITokenBridge} from "../interface/ITokenBridge.sol";
import {IWETH} from "../interface/IWeth.sol";
import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../libraries/BytesLib.sol";
import "../libraries/BridgeStructs.sol";
import {TransferToken} from "../message/Message.sol";
   
contract SmartWallet is SmartWalletStorage{

    using SafeERC20 for IERC20;
    using BytesLib for bytes;

    function initialize(
        address owner_, 
        address agent_,
        address factory_,
        bytes32 user_,
        address wormhole_,
        address tokenBridge_,
        address weth_,
        uint16 chainId_
    ) external initializer {
        require(owner_ != address(0), "owner is zero!");
        require(agent_ != address(0), "agent is zero");
        __ReentrancyGuard_init();
        _transferOwnership(owner_);
        agent = agent_;
        user = user_;
        factory = ISmartWalletFactory(factory_);
        wormhole = IWormhole(wormhole_);
        tokenBridge = ITokenBridge(tokenBridge_);
        weth = IWETH(weth_);
        chainId = chainId_;
    }

    function transferTokenBackToSmartWallet( // transfer back to solana smart wallet
        address token,
        uint256 amount,
        uint256 arbiterFee,
        uint32 nonce
    ) external onlyAuthorized returns(uint64) {
        uint256 wormholeFee = wormhole.messageFee();
        IERC20(token).approve(address(tokenBridge), amount);
        return tokenBridge.transferTokens{value: wormholeFee}(
            token,
            amount, 
            chainId, // 1
            user,
            arbiterFee,
            nonce
        );
    }

    function receiveMessage(bytes memory encodedVm) external onlyAuthorized {
        _handleMessage(encodedVm);
    }


    // Mọi message được bridge từ bên kia mình sẽ encode thêm 1 bytes 
    // đầu để xác định type
    function _handleMessage(bytes memory encodedMessage) internal {
        (IWormhole.VM memory vm, bool valid, string memory reason) = wormhole.parseAndVerifyVM(encodedMessage);
        bytes memory message = vm.payload;
        require(valid, reason);
        // decode
        uint256 index = 0;
        uint8 actionType = message.toUint8(index);
        index += 1;
        if(actionType == 1 || actionType == 3) {
            _receiveTokenMessage(encodedMessage, actionType);
        }
        else {
            _handleTransfer(message.slice(index, message.length - 1));
        }
    }

    // Transfer
    // recipient: 20 bytes -> address
    // token: 20 bytes -> address
    // amount: 16 bytes -> uint128
    // sequence: 8 bytes -> uint64: Sequence của transgerToken
    // evm sw address: 20 bytes -> address
    function _handleTransfer(bytes memory message) internal {
        require(message.length == 64, "Wrong message format");
        uint256 index = 0;
        address recipient = message.toAddress(index);
        
        index += 20;
        address token = message.toAddress(index);

        index += 20;
        uint256 amount = uint256(message.toUint128(index));
        
        index += 16;
        uint64 sequence = uint64(message.toUint64(index));

        index += 8;
        address sw = message.toAddress(index);

        require(sw == address(this), "This message is not for this wallet!");

        if(isReceive[sequence]) {
            IERC20(token).transfer(recipient, amount);
        }
        else {
            TransferToken memory request = TransferToken({
                recipient: recipient,
                token: token,
                amount: amount,
                sequence: sequence
            });
            transferRequest.push(request);
            requestPosition[sequence] = transferRequest.length;
        }
    }




    // Transfer for type 3
    // recipient: 20 bytes -> address
    // token: 20 bytes -> address
    // amount: 16 bytes -> uint128
    function _receiveTokenMessage(bytes memory encodedVm, uint8 actionType) internal {

        (IWormhole.VM memory message,,) = wormhole.parseAndVerifyVM(encodedVm);
        (BridgeStructs.Transfer memory transfer, bytes memory payload) = _parseTransferCommon(message.payload);
        address transferRecipient = _truncateAddress(transfer.to);
        require(transferRecipient == address(this), "This message is not for this wallet!"); 
        tokenBridge.completeTransfer(encodedVm);
        
        if(actionType == 1) {
            isReceive[message.sequence] = true;
            if(requestPosition[message.sequence] != 0) {
                uint256 index = requestPosition[message.sequence];
                _executeTransferRequest(transferRequest[index]);
                _popFromRequest(index);
            }
        }
        else {
            uint256 index = 0;
            address recipient = payload.toAddress(index);
            index += 20;

            address token = payload.toAddress(index);
            index += 20;

            index += 20;
            uint256 amount = uint256(payload.toUint128(index));
            
            IERC20(token).transfer(recipient, amount);
        }

    }

    function _executeTransferRequest(TransferToken memory request) internal {
        IERC20(request.token).transfer(request.recipient, request.amount);
    }


    function _parseTransferCommon(bytes memory encoded) public pure returns (BridgeStructs.Transfer memory transfer, bytes memory payload) {
        uint8 payloadID = parsePayloadID(encoded);

        if (payloadID == 1) {
            transfer = parseTransfer(encoded);
        } else if (payloadID == 3) {
            BridgeStructs.TransferWithPayload memory t = parseTransferWithPayload(encoded);
            transfer.payloadID = 3;
            transfer.amount = t.amount;
            transfer.tokenAddress = t.tokenAddress;
            transfer.tokenChain = t.tokenChain;
            transfer.to = t.to;
            transfer.toChain = t.toChain;
            // Type 3 payloads don't have fees.
            transfer.fee = 0;
            payload = t.payload;
        } else {
            revert("Invalid payload id");
        }
    }

    function parsePayloadID(bytes memory encoded) public pure returns (uint8 payloadID) {
        payloadID = encoded.toUint8(0);
    }

    function parseTransferWithPayload(bytes memory encoded) public pure returns (BridgeStructs.TransferWithPayload memory transfer) {
        uint index = 0;

        transfer.payloadID = encoded.toUint8(index);
        index += 1;

        require(transfer.payloadID == 3, "invalid Transfer");

        transfer.amount = encoded.toUint256(index);
        index += 32;

        transfer.tokenAddress = encoded.toBytes32(index);
        index += 32;

        transfer.tokenChain = encoded.toUint16(index);
        index += 2;

        transfer.to = encoded.toBytes32(index);
        index += 32;

        transfer.toChain = encoded.toUint16(index);
        index += 2;

        transfer.fromAddress = encoded.toBytes32(index);
        index += 32;

        transfer.payload = encoded.slice(index, encoded.length - index);
    }

    function parseTransfer(bytes memory encoded) public pure returns (BridgeStructs.Transfer memory transfer) {
        uint index = 0;

        transfer.payloadID = encoded.toUint8(index);
        index += 1;

        require(transfer.payloadID == 1, "invalid Transfer");

        transfer.amount = encoded.toUint256(index);
        index += 32;

        transfer.tokenAddress = encoded.toBytes32(index);
        index += 32;

        transfer.tokenChain = encoded.toUint16(index);
        index += 2;

        transfer.to = encoded.toBytes32(index);
        index += 32;

        transfer.toChain = encoded.toUint16(index);
        index += 2;

        transfer.fee = encoded.toUint256(index);
        index += 32;

        require(encoded.length == index, "invalid Transfer");
    }

    function _truncateAddress(bytes32 b) internal pure returns (address) {
        require(bytes12(b) == 0, "invalid EVM address");
        return address(uint160(uint256(b)));
    }
}