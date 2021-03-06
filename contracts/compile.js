const fs = require('fs');
const solc = require('solc');
const path = require('path');
const { inject } = require('async');


//Compiling the contract
const pathToContract = path.resolve(__dirname,'MyContract.sol');
const source = fs.readFileSync(pathToContract, 'utf-8');
var input = {
    language: 'Solidity',
    sources: {
        'MyContract.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ 'abi', 'evm.bytecode' ]
            }
        }
    }
};
const buildPath = path.resolve('bin'); 
let compiledContract = JSON.parse(solc.compile(JSON.stringify(input))).contracts;
//console.log(buildPath);

for (let contract in compiledContract) {
    console.log("here - " + contract);
    for(let contractName in compiledContract[contract]) {
        console.log("there - " + contractName);
        fs.writeFileSync(
            path.resolve(buildPath, `${contractName}.json`),
            JSON.stringify(compiledContract[contract][contractName])
        )
    }
}