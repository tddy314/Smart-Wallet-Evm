// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ISmartWalletBeacon} from "../../interface/ISmartWalletBeacon.sol";
import {ISmartWalletFactory} from "../../interface/ISmartWalletFactory.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

abstract contract SmartWalletFactoryStorage is ISmartWalletFactory, OwnableUpgradeable{
    using EnumerableSet for EnumerableSet.AddressSet;
    ISmartWalletBeacon public SmartWalletBeacon;
    EnumerableSet.AddressSet internal _wallets;
    mapping(bytes32 => address) public walletsByUser;
    address public router;
    address public agent;
    address public wormhole;
    address public tokenBridge;
    address public weth;
    uint16 public chainId;


    modifier onlyAuthorization() {
        require(msg.sender == owner() || msg.sender == agent || tx.origin == agent || msg.sender == router, "not authorized!");
        _;
    }

    function setRouter(address new_router) external onlyOwner {
        router = new_router;
    }

    function changeAgent(address new_agent) external onlyOwner {
        agent = new_agent;
    }

    
}