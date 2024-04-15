require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.6",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    fuji: {
        url: "https://bold-magical-waterfall.avalanche-testnet.quiknode.pro/b5481f34f7d4ab2e7366478f28b24db40a18ed63/ext/bc/C/rpc/",
        accounts: [`0x` + "d48af1ae626ae64ce9330f0ed41dc018ec0f8c495c4bf51c40aae0b6cb0ef9c3"],
        chainId: 43113,
        gas: 2100000,
        gasPrice: 200000000000
      },
  },
};

//private key 
//d48af1ae626ae64ce9330f0ed41dc018ec0f8c495c4bf51c40aae0b6cb0ef9c3