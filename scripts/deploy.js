const { ethers } = require("hardhat");

async function main() {
  const etherNFTPlace = await ethers.deployContract("EtherNFTPlace");

  console.log("EtherNFTPlace deployed to: ", await etherNFTPlace.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
