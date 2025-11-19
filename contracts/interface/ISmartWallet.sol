// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface ISmartWallet {
    function initialize(
        address owner_, 
        address agent_,
        address factory_,
        bytes32 user_
    ) external;

    function transferTokenBackToSmartWallet(
        address token,
        uint256 amount,
        uint256 arbiterFee,
        uint32 nonce
    ) external returns(uint64);

    function receiveMessage(bytes memory encodedVm) external;
}