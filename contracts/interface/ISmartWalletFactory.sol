// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface ISmartWalletFactory {
   function initialize(address new_owner, address agent, address beacon) external;
   function createSmartWallet(
        address agent,
        bytes32 user,
        address wormhole,
        address tokenBridge,
        address weth,
        uint16 chainId
    ) external returns(address);
}