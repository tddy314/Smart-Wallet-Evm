import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {addresses} from "../../utils/addresses";

const deploy: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy, get } = deployments;
    const { deployer } = await getNamedAccounts();


    const beaconDeployment = await get("SmartWalletBeacon");
    const beaconAddress = beaconDeployment.address;

    await deploy("SmartWalletFactory", {
        contract: "SmartWalletFactory",
        from: deployer,
        log: true,
        autoMine: true,
        proxy: {
            proxyContract: "UUPS",
            execute: {
                init: {
                    methodName: "initialize",
                    args: [deployer, deployer, beaconAddress, addresses.base.wormhole, addresses.base.tokenBridge, addresses.base.weth, 1]
                }
            }
        }
    });
}

deploy.tags = ["smartwalletbeacon"];
export default deploy;