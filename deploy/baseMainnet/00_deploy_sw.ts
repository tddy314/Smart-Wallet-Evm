import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";


const deploy: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("SmartWallet", {
        contract: "SmartWallet",
        from: deployer,
        log: true,
        autoMine: true,
        args: []
    });
}

deploy.tags = ["smartwallet"];
export default deploy;