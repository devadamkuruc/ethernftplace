const fs = require("fs");
require("@nomicfoundation/hardhat-toolbox");

const privateKey = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    hardhat: {
      chainId: 31337,
    },
  },
  solidity: "0.8.19",
};
