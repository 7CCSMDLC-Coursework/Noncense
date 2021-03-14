const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

//Fetching compiled contract
const MyContract = require('./bin/MyContract.json')

//Setting up account and private key
const address = '0xd9ED426f3F1ca5351480006bC9aB86CA97eFeFA6';
const privateKey = '0xd7d113798a8f06669525813431ecc5972faec78b40f6b58df43275ccdcb5c1b9';

//Signing transaction with wallet
const provider = new HDWalletProvider(privateKey, "https://ropsten.infura.io/v3/b08ecb4bb9e945beb2373643b4db9e9d");

//Setting provider inside web3
const web3 = new Web3(provider);

const init = async () => {
    
    //Deploying contract
    let contract = new web3.eth.Contract(MyContract.abi);
    contract = await contract
                .deploy({data: '0x' + MyContract.evm.bytecode.object})
                .send({
                    from: address,
                    gas: '2000000',
                    gasPrice: '124000000000'});

    console.log(`Contract deployed at address: ${contract.options.address}`);
    await contract.methods.setData(10).send({from:address})
    console.log("hello");
    const result = await contract.methods.getData().call();
    console.log(result);
    provider.engine.stop();
}

init();
