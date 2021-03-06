const Web3 = require('web3');

//Fetching compiled contract
const MyContract = require('./bin/MyContract.json')

//Signing transaction with wallet
const HDWalletProvider = require('@truffle/hdwallet-provider');
const address = '0x25Ca8040596FD7D330C74AaD93dEDEbf9FDf9a29';
const privateKey = '0xac427592d1df42a1bd94c6e5ec84d1f60253a4296847ebb08138b4445eba7850';

const init = async () => {
    const provider = new HDWalletProvider(privateKey, "https://ropsten.infura.io/v3/b08ecb4bb9e945beb2373643b4db9e9d");

    //Deploying contract
    const web3 = new Web3(provider);
    let contract = new web3.eth.Contract(MyContract.abi);

    contract = await contract.deploy({data: '0x' + MyContract.evm.bytecode.object}).send({from: address});

    await contract.methods.setData(10).send({from:address})
    const result = await contract.methods.getData().call();
    console.log(result);
    provider.engine.stop();
}

init();
