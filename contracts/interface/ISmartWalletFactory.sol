// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface ISmartWalletFactory {
   function initialize(
        address new_owner, 
        address agent_, 
        address beacon,
        address wormhole_,
        address tokenBridge_,
        address weth_,
        uint16 chainId
    ) external;
   function createSmartWallet(
        bytes32 user
    ) external returns(address);
}