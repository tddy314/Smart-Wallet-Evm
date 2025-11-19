// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {SmartWalletRouterStorage} from "./SmartWalletRouterStorage.sol";
import {ISmartWalletFactory} from "./interface/ISmartWalletFactory.sol";
import {ISmartWallet} from "./interface/ISmartWallet.sol";

contract SmartWalletRouter is SmartWalletRouterStorage {

    function initialize(
        address new_owner,
        address factory_,
        address agent_,
        address wormhole_,
        address tokenBridge_,
        address weth_,
        uint16 chainId_
    ) external initializer {
        require(agent_ != address(0), "");
        require(factory_ != address(0), "");
        factory = ISmartWalletFactory(factory_);
        agent = agent_;
        wormhole = wormhole_;
        tokenBridge = tokenBridge_;
        weth = weth_;
        chainId = chainId_;
        __Ownable_init(new_owner);
        __UUPSUpgradeable_init();
        __Pausable_init();
        __ReentrancyGuard_init();
        _transferOwnership(new_owner);
    }

    function createSmartWallet(bytes32 user) external returns(address) {
        address new_wallet = factory.createSmartWallet(user);
        walletByUser[user] = new_wallet;
        return new_wallet;
    }

    function transferTokenBackToSmartWallet(
        bytes32 user,
        address token,
        uint256 amount,
        uint256 arbiterFee,
        uint32 nonce
    ) external {
        address sw = walletByUser[user];
        require(sw != address(0), "No wallet found!");
        ISmartWallet(sw).transferTokenBackToSmartWallet(token, amount, arbiterFee, nonce);
    }

    function receiveMessage(bytes32 user, bytes memory encodeMessage) external {
        address sw = walletByUser[user];
        require(sw != address(0), "No wallet found!");
        ISmartWallet(sw).receiveMessage(encodeMessage);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    receive() external payable {}
}