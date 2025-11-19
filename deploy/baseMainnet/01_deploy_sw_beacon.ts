import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";


const deploy: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const sw = await deployments.get("SmartWallet");
    const swAddress = sw.address;
    const owner = deployer;

    await deploy("SmartWalletBeacon", {
        contract: "SmartWalletBeacon",
        from: deployer,
        log: true,
        autoMine: true,
        args: [swAddress, deployer]
    });
}

deploy.tags = ["smartwalletbeacon"];
export default deploy;