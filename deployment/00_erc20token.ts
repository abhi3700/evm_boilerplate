import { ethers } from "hardhat";
const hre = require('hardhat');
import { Contract, ContractFactory /* , BigNumber */ } from "ethers";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
const config = hre.config;  // get raw config values
const deploymentParams = require('../deployment.json');
const { generateVerifyFile } = require('../libs/helpers/helpers.js')
dotenvConfig({ path: resolve(__dirname, "./.env") });

console.log('START DEPLOYING....');
console.log('Config:', deploymentParams)

async function main(): Promise<void> {
  // ==============================================================================
  // We get the token contract to deploy
  const Erc20TokenFactory: ContractFactory = await ethers.getContractFactory("ERC20Token");
  const erc20TokenContract: Contract = await Erc20TokenFactory.deploy(
     deploymentParams.name,
     deploymentParams.symbol
   );
  await erc20TokenContract.deployed();
  console.log("ERC20 token SC deployed to: ", erc20TokenContract.address);
  console.log(
    `The transaction that was sent to the network to deploy the erc20 token contract: ${erc20TokenContract.deployTransaction.hash}`
  );

  // Prepare verify data
  await generateVerifyFile('ERC20Token', erc20TokenContract.address, erc20TokenContract.args, hre.network.name)

  console.log("Args:", erc20TokenContract.args);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then()
  .catch((error: Error) => {
    console.error(error);
    throw new Error("Exit: 1");
  });

// M-2
// import { task } from "hardhat/config";
// import { TaskArguments } from "hardhat/types";
// import { Contract, ContractFactory /* , BigNumber */ } from "ethers";

// task("deploy:ERC20Token", "Deploy Escrow Contract").setAction(async function (
//   taskArguments: TaskArguments,
//   { ethers }
// ) {
//   // TODO: modify as per the SC written
//   // We get the erc20 token contract to deploy
//   const Erc20TokenFactory: ContractFactory = await ethers.getContractFactory(
//     "ERC20Token"
//   );
//   const erc20TokenContract: Contract = await Erc20TokenFactory.deploy(
//     "Health Token",
//     "HLT"
//   );
//   await erc20TokenContract.deployed();
//   console.log("ERC20 token SC deployed to: ", erc20TokenContract.address);
//   console.log(
//     `The transaction that was sent to the network to deploy the token contract: ${erc20TokenContract.deployTransaction.hash}`
//   );
// });
