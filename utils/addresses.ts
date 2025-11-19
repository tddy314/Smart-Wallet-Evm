import { ZeroAddress } from "ethers";

export const addresses = {
    zeroAddress: "0x0000000000000000000000000000000000000000",
    arbitrum: {
        weth: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        
    },
    base: {
        weth: "0x4200000000000000000000000000000000000006",
        usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
        wormhole: ZeroAddress,
        tokenBridge: ZeroAddress,
        chainId: 1

    },

    baseSepolia: {
        weth: "0x4200000000000000000000000000000000000006",
        usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
        wormhole: ZeroAddress,
        tokenBridge: ZeroAddress,
        chainId: 1
    }
    
}