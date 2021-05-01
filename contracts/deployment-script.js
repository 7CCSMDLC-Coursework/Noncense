const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

//Fetching compiled contract
const MyContract = require('./../bin/SoftwareOutsource.json');

//Setting up account and private key
const address = 'deployer_address';
const privateKey = 'deployer_pk';

//Signing transaction with wallet
const provider = new HDWalletProvider(privateKey, "https://ropsten.infura.io/v3/provuri");

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
                    gasPrice: '124000000000'});

    console.log(`Contract deployed at address: ${contract.options.address}`);
    console.log("Starting transfer now ...");

    //Executing smart contract functions
    await contract.methods.addContractor('contractor_address').send({from:address})
    await contract.methods.updateState(1).send({from:address});
    const result = await contract.methods.approve(25).send({from:address});
    console.log(result);
    provider.engine.stop();
}

init().catch(error =>{
    console.log(error);
    process.exit(1);
});
