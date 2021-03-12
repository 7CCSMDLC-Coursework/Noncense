pipeline {
    agent any

    tools {nodejs "nodejs"}

    stages {
        stage('Installing npm dependencies') {
            steps {
                sh 'npm install solc'
                sh 'npm install web3'
                sh 'npm install @truffle/hdwallet-provider'
            }
        }
        stage('Compiling contract') {
            steps {
				sh 'mkdir bin'
                sh 'node contracts/compile.js'
            }
        }
        stage('Deploying contract') {
            steps {
                script {
                    final String response = sh (script: 'node contracts/eth-script.js', returnStdout: true).trim()
                    echo response
                    echo "Contract successfully deployed!"
                }
            }
        }
    }
}
