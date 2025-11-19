// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;


struct TransferToken {
    address recipient;
    address token;
    uint256 amount;
    uint64 sequence;
}