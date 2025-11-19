import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";


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
                    args: [deployer, deployer, beaconAddress]
                }
            }
        }
    });
}

deploy.tags = ["smartwalletbeacon"];
export default deploy;