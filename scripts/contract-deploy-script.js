// sample contract deployment script on moonbeam
const Web3 = require('web3');
const { bytecode, abi } = require('./truffle/build/contracts/<CONTRACT_NAME>.json');

// Initialization
const web3 = new Web3('https://rpc.testnet.moonbeam.network');
const walletPrivateKey = PRIVATE_KEY;
const walletAddress = WALLET_ADDRESS;

// Deploy contract
const deploy = async () => {
    console.log('⏳ Attempting to deploy from account:', walletAddress);

    const contract = new web3.eth.Contract(abi);

    const contractTx = contract.deploy({
        data: bytecode,
        // arguments: [], // if constructor needs arguments put it in array here like this [5, '0x...', 'Hello World']
    });

    const createTransaction = await web3.eth.accounts.signTransaction(
        {
            from: walletAddress,
            data: contractTx.encodeABI(),
            gas: '4294967295',
        },
        walletPrivateKey
    );

    const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
    );

    console.info(`- Amount of Gas Used: ${createReceipt.gasUsed}`);
    console.info(`- More transaction details at: http://8.9.36.141:4000/tx/${createReceipt.transactionHash}`);
    console.log('✅ Contract deployed at address', createReceipt.contractAddress);
};

deploy();