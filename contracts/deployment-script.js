const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

//Fetching compiled contract
const MyContract = require('./../bin/SoftwareOutsource.json');

//Setting up account and private key
const address = '0x06B2b27B94148D4Ab3Aaee467D5CaF160B81FBa3';
const privateKey = 'b3cf172b90d6e4cd4e238843eec462c3b1bb61b7eb4c939a98bcbe189a2b98dd';

//Signing transaction with wallet
const provider = new HDWalletProvider(privateKey, "https://ropsten.infura.io/v3/b08ecb4bb9e945beb2373643b4db9e9d");

//Setting provider inside web3
const web3 = new Web3(provider);
const now = Date.now();
let epochTime = now + 10000;

const init = async () => {
    
    //Deploying contract
    let contract = new web3.eth.Contract(MyContract.abi);
    contract = await contract
                .deploy({data: '0x' + MyContract.evm.bytecode.object, 
                        arguments: ['Sample project',
                                    'This is a sample project created as part of CW',
                                    epochTime]
                        })
                .send({
                    from: address,
                    gas: '2000000',
                    chainId:3,
                    gasPrice: '10'});

    console.log(`Contract deployed at address: ${contract.options.address}`);
    console.log("Starting transfer now ...");

    //Executing smart contract functions
    await contract.methods.addContractor('0xd9ED426f3F1ca5351480006bC9aB86CA97eFeFA6').send({from:address})
    await contract.methods.updateState(1).send({from:address});
    const result = await contract.methods.approve(25).send({from:address});
    console.log(result);
    provider.engine.stop();
}

init().catch(error =>{
    console.log(error);
    process.exit(1);
});
