// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {
    PausableUpgradeable
} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {
    ReentrancyGuardUpgradeable
} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {
    UUPSUpgradeable
} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ISmartWalletFactory} from "./interface/ISmartWalletFactory.sol";

abstract contract SmartWalletRouterStorage is
    UUPSUpgradeable,
    OwnableUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable 
{
    ISmartWalletFactory public factory;
    address public agent;
    mapping(bytes32 => address) public walletByUser;
    address public wormhole;
    address public tokenBridge;
    address public weth;
    uint16 public chainId;

    modifier onlyAgent() {
        require(msg.sender == agent, "Not authorized");
        _;
    }

    modifier onlyAgentOrOwner() {
        require(msg.sender == agent || msg.sender == owner(), "Not authorized");
        _;
    }

    function changeAgent(address new_agent) external onlyOwner {
        agent = new_agent;
    }

    function changeFactory(address new_factory) external onlyOwner {
        factory = ISmartWalletFactory(new_factory);
    }
}