require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://solitary-dimensional-hill.ethereum-goerli.discover.quiknode.pro/e461b6e585a00c56281986842d3bd2d1b2aae45a/",
      accounts: ["f7b5c6a3b547a829aa5dd3d0e9864190cb28694fcfda119f40c6235474a6bdb5"],
    },
  },
};