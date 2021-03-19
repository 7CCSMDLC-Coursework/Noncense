const fs = require('fs');
const solc = require('solc');
const path = require('path');

const pathToContract = path.resolve(__dirname,'SoftwareOutsource.sol');
const source = fs.readFileSync(pathToContract, 'utf-8');
var input = {
    language: 'Solidity',
    sources: {
        'SoftwareOutsource.sol' : {
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

for (let contract in compiledContract) {
    for(let contractName in compiledContract[contract]) {
        fs.writeFileSync(
            path.resolve(buildPath, `${contractName}.json`),
            JSON.stringify(compiledContract[contract][contractName])
        );
    }
}
console.log("Compilation successful!");
