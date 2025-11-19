// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {ISmartWalletFactory} from "../../interface/ISmartWalletFactory.sol";
import {IWormhole} from "../../interface/IWormhole.sol";
import {ITokenBridge} from "../../interface/ITokenBridge.sol";
import {IWETH} from "../../interface/IWeth.sol";
import {TransferToken} from "../../message/Message.sol";

abstract contract SmartWalletStorage is OwnableUpgradeable, ReentrancyGuardUpgradeable {
    bytes32 public user;
    address public agent;
    address public pendingAdmin;
    ISmartWalletFactory public factory;
    IWormhole public wormhole;
    ITokenBridge public tokenBridge;
    IWETH public weth;
    uint16 chainId;
    mapping(uint64 => bool) public isReceive;
    mapping(uint64 => uint256) public requestPosition;
    TransferToken[] public transferRequest;
    //uint256 public index;

    modifier onlyAuthorized() {
        require(msg.sender == owner() || msg.sender == agent, "Not Authorized!");
        _;
    }

    modifier onlyPendingAdmin {
        require(msg.sender == pendingAdmin, "Not Authorized!");
        _;
    }

    function changeAgent(address new_agent) external onlyOwner {
        agent = new_agent;
    }

    function proposeNewAdmin(address new_admin) external onlyOwner {
        pendingAdmin = new_admin;
    }

    function acceptAdminRole() external onlyPendingAdmin {
        _transferOwnership(pendingAdmin);
        pendingAdmin = address(0);
    } 

    function _popFromRequest(uint256 index) internal {
        uint256 length = transferRequest.length;
        if(length == 1) {
            transferRequest.pop();
            return;
        }
        TransferToken memory request = transferRequest[length - 1];
        transferRequest[index] = request;
        requestPosition[request.sequence] = index;
        transferRequest.pop(); 
    }
}