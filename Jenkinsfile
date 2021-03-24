pipeline {
    agent any

    tools {nodejs "nodejs"}

    stages {
        stage('Installing npm dependencies') {
            steps {
                sh 'npm install solc'
                sh 'npm install web3'
                sh 'npm i @truffle/hdwallet-provider@1.0.18'
            }
        }
        stage('Compiling contract') {
            steps {
                sh 'mkdir -p bin'
                sh 'node contracts/compile.js'
            }
        }
        stage('Deploying contract') {
            steps {
                    sh 'node contracts/deployment-script.js'
                    echo response
                    echo "Contract successfully deployed!"
            }
        }
    }
}
