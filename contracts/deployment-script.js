const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

//Fetching compiled contract
const MyContract = require('./../bin/SoftwareOutsource.json');

//Setting up account and private key
const address = '0xd9ED426f3F1ca5351480006bC9aB86CA97eFeFA6';
const privateKey = '0xd7d113798a8f06669525813431ecc5972faec78b40f6b58df43275ccdcb5c1b9';

//Signing transaction with wallet
const provider = new HDWalletProvider(privateKey, "https://ropsten.infura.io/v3/b08ecb4bb9e945beb2373643b4db9e9d");

//Setting provider inside web3
const web3 = new Web3(provider);

const now = Date.now();
let epochTime = now + 10000;

const init = async () => {

    let contract = new web3.eth.Contract(MyContract.abi);
    
    //Deploying contract
    console.log("Starting deployment");
    contract = await contract
                .deploy({data: '0x' + MyContract.evm.bytecode.object, 
                        arguments: ['Sample project',
                                    'This is a sample project created as part of CW',
                                    epochTime]
                        })
                .send({
                    from: address,
                    gas: '2000000',
                    gasPrice: web3.utils.toWei('125','gwei')});

    console.log(`Contract deployed at address: ${contract.options.address}`);
    
    //Executing smart contract functions
    console.log("Adding contractor address ...")
    await contract.methods.addContractor('0x06B2b27B94148D4Ab3Aaee467D5CaF160B81FBa3').send({from:address})
    await contract.methods.setStateToFulfilled().send({from:address});
    console.log("Starting transfer now ...");
    const result = await contract.methods.approve(25).send({from:address,gasPrice: web3.utils.toWei('125','gwei')});
    console.log(result);
    provider.engine.stop();
}

init().catch(error =>{
    console.log(error);
    process.exit(1);
});
