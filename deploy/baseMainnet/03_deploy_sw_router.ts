import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {addresses} from "../../utils/addresses";


const deploy: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy, get } = deployments;
    const { deployer } = await getNamedAccounts();


    const factoryDeployment = await get("SmartWalletFactory");
    const factoryAddress = factoryDeployment.address;

    await deploy("SmartWalletRouter", {
        contract: "SmartWalletRouter",
        from: deployer,
        log: true,
        autoMine: true,
        proxy: {
            proxyContract: "UUPS",
            execute: {
                init: {
                    methodName: "initialize",
                    args: [deployer, factoryAddress, deployer, addresses.base.wormhole, addresses.base.tokenBridge, addresses.base.weth, addresses.base.chainId]
                }
            }
        }
    });
}

deploy.tags = ["smartwalletbeacon"];
export default deploy;