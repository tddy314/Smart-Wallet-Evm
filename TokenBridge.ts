/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/wormhole.json`.
 */
export type Wormhole = {
  "address": "B6RHG3mfcckmrYN1UhmJzyS1XX3fZKbkeUcpJe9Sy3FE",
  "metadata": {
    "name": "wormhole",
    "version": "0.1.0",
    "spec": "0.1.0"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "writable": true
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "wormhole",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "attestToken",
      "discriminator": [
        79,
        142,
        34,
        225,
        56,
        115,
        171,
        205
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "writable": true
        },
        {
          "name": "mint"
        },
        {
          "name": "wrappedMeta"
        },
        {
          "name": "splMetadata"
        },
        {
          "name": "wormholeBridge",
          "writable": true
        },
        {
          "name": "wormholeMessage",
          "writable": true,
          "signer": true
        },
        {
          "name": "wormholeEmitter"
        },
        {
          "name": "wormholeSequence",
          "writable": true
        },
        {
          "name": "wormholeFeeCollector",
          "writable": true
        },
        {
          "name": "clock"
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "wormholeProgram"
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u32"
        }
      ]
    },
    {
      "name": "completeNative",
      "discriminator": [
        13,
        88,
        204,
        114,
        245,
        195,
        118,
        182
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config"
        },
        {
          "name": "vaa"
        },
        {
          "name": "claim",
          "writable": true
        },
        {
          "name": "endpoint"
        },
        {
          "name": "to",
          "writable": true
        },
        {
          "name": "toFees",
          "writable": true
        },
        {
          "name": "custody",
          "writable": true
        },
        {
          "name": "mint"
        },
        {
          "name": "custodySigner"
        },
        {
          "name": "rent",
          "writable": true
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "wormholeProgram"
        }
      ],
      "args": []
    },
    {
      "name": "completeWrapped",
      "discriminator": [
        70,
        49,
        97,
        3,
        76,
        95,
        91,
        253
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config"
        },
        {
          "name": "vaa"
        },
        {
          "name": "claim",
          "writable": true
        },
        {
          "name": "endpoint"
        },
        {
          "name": "to",
          "writable": true
        },
        {
          "name": "toFees",
          "writable": true
        },
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "wrappedMeta"
        },
        {
          "name": "mintAuthority"
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "wormholeProgram"
        }
      ],
      "args": []
    },
    {
      "name": "transferWrapped",
      "discriminator": [
        218,
        151,
        145,
        55,
        13,
        215,
        173,
        62
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config"
        },
        {
          "name": "from",
          "writable": true
        },
        {
          "name": "fromOwner",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "wrappedMeta"
        },
        {
          "name": "authoritySigner"
        },
        {
          "name": "wormholeBridge",
          "writable": true
        },
        {
          "name": "wormholeMessage",
          "writable": true,
          "signer": true
        },
        {
          "name": "wormholeEmitter"
        },
        {
          "name": "wormholeSequence",
          "writable": true
        },
        {
          "name": "wormholeFeeCollector",
          "writable": true
        },
        {
          "name": "clock"
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "wormholeProgram"
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u32"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "fee",
          "type": "u64"
        },
        {
          "name": "targetAddress",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "targetChain",
          "type": "u16"
        }
      ]
    },
    {
      "name": "transferNative",
      "discriminator": [
        3,
        210,
        148,
        94,
        161,
        70,
        8,
        86
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config"
        },
        {
          "name": "from",
          "writable": true
        },
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "custody",
          "writable": true
        },
        {
          "name": "authoritySigner"
        },
        {
          "name": "custodySigner"
        },
        {
          "name": "wormholeBridge",
          "writable": true
        },
        {
          "name": "wormholeMessage",
          "writable": true,
          "signer": true
        },
        {
          "name": "wormholeEmitter"
        },
        {
          "name": "wormholeSequence",
          "writable": true
        },
        {
          "name": "wormholeFeeCollector",
          "writable": true
        },
        {
          "name": "clock"
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "wormholeProgram"
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u32"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "fee",
          "type": "u64"
        },
        {
          "name": "targetAddress",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "targetChain",
          "type": "u16"
        }
      ]
    },
    {
      "name": "registerChain",
      "discriminator": [
        230,
        181,
        152,
        173,
        20,
        163,
        157,
        243
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config"
        },
        {
          "name": "endpoint",
          "writable": true
        },
        {
          "name": "vaa"
        },
        {
          "name": "claim",
          "writable": true
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "wormholeProgram"
        }
      ],
      "args": []
    },
    {
      "name": "createWrapped",
      "discriminator": [
        204,
        246,
        106,
        93,
        27,
        121,
        10,
        3
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config"
        },
        {
          "name": "endpoint"
        },
        {
          "name": "vaa"
        },
        {
          "name": "claim",
          "writable": true
        },
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "wrappedMeta",
          "writable": true
        },
        {
          "name": "splMetadata",
          "writable": true
        },
        {
          "name": "mintAuthority"
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "splMetadataProgram"
        },
        {
          "name": "wormholeProgram"
        }
      ],
      "args": []
    },
    {
      "name": "upgradeContract",
      "discriminator": [
        2,
        34,
        185,
        187,
        170,
        233,
        37,
        152
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaa"
        },
        {
          "name": "claim",
          "writable": true
        },
        {
          "name": "upgradeAuthority"
        },
        {
          "name": "spill",
          "writable": true
        },
        {
          "name": "implementation",
          "writable": true
        },
        {
          "name": "programData",
          "writable": true
        },
        {
          "name": "tokenBridgeProgram",
          "writable": true
        },
        {
          "name": "rent"
        },
        {
          "name": "clock"
        },
        {
          "name": "bpfLoaderUpgradeable"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": []
    },
    {
      "name": "transferWrappedWithPayload",
      "discriminator": [
        7,
        68,
        186,
        129,
        221,
        132,
        128,
        198
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config"
        },
        {
          "name": "from",
          "writable": true
        },
        {
          "name": "fromOwner",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "wrappedMeta"
        },
        {
          "name": "authoritySigner"
        },
        {
          "name": "wormholeBridge",
          "writable": true
        },
        {
          "name": "wormholeMessage",
          "writable": true,
          "signer": true
        },
        {
          "name": "wormholeEmitter"
        },
        {
          "name": "wormholeSequence",
          "writable": true
        },
        {
          "name": "wormholeFeeCollector",
          "writable": true
        },
        {
          "name": "clock"
        },
        {
          "name": "sender"
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "wormholeProgram"
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u32"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "targetAddress",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "targetChain",
          "type": "u16"
        },
        {
          "name": "payload",
          "type": "bytes"
        },
        {
          "name": "cpiProgramId",
          "type": {
            "option": "pubkey"
          }
        }
      ]
    },
    {
      "name": "transferNativeWithPayload",
      "discriminator": [
        66,
        61,
        220,
        59,
        173,
        253,
        145,
        241
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config"
        },
        {
          "name": "from",
          "writable": true
        },
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "custody",
          "writable": true
        },
        {
          "name": "authoritySigner"
        },
        {
          "name": "custodySigner"
        },
        {
          "name": "wormholeBridge",
          "writable": true
        },
        {
          "name": "wormholeMessage",
          "writable": true,
          "signer": true
        },
        {
          "name": "wormholeEmitter"
        },
        {
          "name": "wormholeSequence",
          "writable": true
        },
        {
          "name": "wormholeFeeCollector",
          "writable": true
        },
        {
          "name": "clock"
        },
        {
          "name": "sender"
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "wormholeProgram"
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u32"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "targetAddress",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "targetChain",
          "type": "u16"
        },
        {
          "name": "payload",
          "type": "bytes"
        },
        {
          "name": "cpiProgramId",
          "type": {
            "option": "pubkey"
          }
        }
      ]
    }
  ]
};
