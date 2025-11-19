import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import * as dotenv from "dotenv";
import "@nomicfoundation/hardhat-network-helpers";
import "hardhat-gas-reporter";



dotenv.config();

const PRIVATE_KEY = process.env.EVM_PRIVATE_KEY;

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
   solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: "0.5.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: "0.4.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: "0.7.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      }
    ],
  },
  gasReporter: {
    enabled: false,          // bật gas reporter
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    artifacts: "./build/artifacts",
    cache: "./build/cache",
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      chainId: 8453,
      forking: {
        url: "https://base.gateway.tenderly.co/6b2RFKSUtUFg0WyuJtz9IB",
      },
      gasPrice: 2e6,
      live: false,
      deploy: ["deploy/hardhat"],
    },
    baseMainnet: {
      url: `https://base-rpc.publicnode.com`,
      chainId: 8453,
      gas: 2e6,
      accounts: [
        `0x${PRIVATE_KEY}`,
      ],
      live: true,
      deploy: ["deploy/baseMainnet"],
    },
    arbMainnet:{
      url: `https://arb1.arbitrum.io/rpc`,
      chainId: 42161,
      gas: 2e6,
      accounts: [
        `0x${PRIVATE_KEY}`,
      ],
      live: true,
      deploy: ["deploy/arbMainnet"],
    },
    baseFork: {
      url: "https://virtual.base.eu.rpc.tenderly.co/0e5a0e1a-9ace-4ea8-bd44-47f110825c62",
      //https://virtual.base.eu.rpc.tenderly.co/e2433968-8e35-48f5-abe5-b1b14128dca5
  
      chainId: 8453, 
      accounts: [
        `0x${PRIVATE_KEY}`,
      ],
      gasPrice: 2e6,
      deploy: ["deploy/baseFork"],
    },
    baseSepolia: {
      url: "https://base-sepolia-rpc.publicnode.com",
      chainId: 84532, 
      accounts: [
        `0x${PRIVATE_KEY}`,
      ],
      gasPrice: 2e6,
      deploy: ["deploy/baseSepolia"],
    },
    EthSepolia: {
      url: "https://eth-sepolia.public.blastapi.io",
      chainId: 11155111, 
      accounts: [
        `0x${PRIVATE_KEY}`,
      ],
      gasPrice: 2e6,
      deploy: ["deploy/baseFork"],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },

};

export default config;