require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      viaIR: true, // Enable Intermediate Representation
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
  },
  networks: {
    garnacho: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: [
        "0xec3e18bbeb6ced88169ab880c05398bef577dd0acbcec8bec38bd460c62bcc3c",
      ],
    },
  },
};