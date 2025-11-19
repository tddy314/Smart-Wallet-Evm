// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {
    UpgradeableBeacon
} from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

contract SmartWalletBeacon is UpgradeableBeacon {
    constructor(address implementation_, address owner_)
        UpgradeableBeacon(implementation_, owner_)
    {
        require(
            implementation_ != address(0),
            "implementation is address zero"
        );
        require(owner_ != address(0), "owner is address zero");
        _transferOwnership(owner_);
    }
}