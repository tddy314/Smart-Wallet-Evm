// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ISmartWallet} from "../interface/ISmartWallet.sol";
import {ISmartWalletBeacon} from "../interface/ISmartWalletBeacon.sol";
import {SmartWalletFactoryStorage} from "./abstract/SmartWalletFactoryStorage.sol";
import {
    BeaconProxy
} from "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";


contract SmartWalletFactory is SmartWalletFactoryStorage {
    using EnumerableSet for EnumerableSet.AddressSet;

    function initialize(address new_owner, address agent_, address beacon) external initializer {
        require(new_owner != address(0), "Owner is address zero!");
        require(beacon != address(0), "Beacon is address zero!");
        SmartWalletBeacon = ISmartWalletBeacon(beacon);
        __Ownable_init(new_owner);
        _transferOwnership(new_owner);
        agent = agent_;
    }

    function createSmartWallet(
        address agent,
        bytes32 user,
        address wormhole,
        address tokenBridge,
        address weth,
        uint16 chainId
    ) external onlyAuthorization returns(address) {
        require(walletsByUser[user] == address(0), "Already initialized");
        address wallet = _preDeploy(agent, user, wormhole, tokenBridge, weth, chainId);
        walletsByUser[user] = wallet;
        _wallets.add(wallet);
        return wallet;
    }

    function _preDeploy(
        address agent,
        bytes32 user,
        address wormhole,
        address tokenBridge,
        address weth,
        uint16 chainId
    ) internal returns (address newWallet) {
        bytes memory data = abi.encodeWithSelector(
            ISmartWallet.initialize.selector,
            owner(),
            agent,
            address(this),
            user,
            wormhole,
            tokenBridge,
            weth,
            chainId
        );

        bytes32 salt = keccak256(
            abi.encodePacked(tx.origin, block.number, data)
        );

        newWallet = address(
            new BeaconProxy{salt: salt}(address(SmartWalletBeacon), data)
        );
    }
}