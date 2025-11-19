// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface  ISmartWalletBeacon {
    function upgradeTo(address newImplementation) external;

    function implementation() external view returns (address);
}