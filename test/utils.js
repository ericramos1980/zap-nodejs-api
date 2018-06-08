const { eth } = require('./bootstrap');
const { network_id } = require('../config');
const objectToCreate = { from: '0x627306090abab3a6e1400e9345bc60c78a8bef57', gas: 6000000 };
const { fromAscii, toBN } = require('ethjs');
const BigNumber = require('bignumber.js');
const Curve = require('../src/api/components/Curve');

function getInstanceOfSmartContract(abiFile) {
    return eth.contract(abiFile.abi).at(abiFile.networks[network_id].address);
}

async function getNewSmartContract(abiFile) {
    const contract = getEthContract(abiFile);
    const txHash = await contract.new(objectToCreate);
    const { contractAddress } = await eth.getTransactionReceipt(txHash);
    return eth.contract(abiFile.abi).at(contractAddress);
}

async function getNewRegistryContract({ abiFile, regStoreAddress }) {
    const contract = getEthContract(abiFile);
    const txHash = await contract.new(regStoreAddress, objectToCreate);
    const { contractAddress } = await eth.getTransactionReceipt(txHash);
    return eth.contract(abiFile.abi).at(contractAddress);
}

async function getNewBondageContract({ abiFile, pointerAddress, bondStoreAddress, tokenAddress, currentCostAddress }) {
    const contract = getEthContract(abiFile);
    const txHash = await contract.new(
        pointerAddress,
        bondStoreAddress,
        tokenAddress,
        currentCostAddress,
        objectToCreate
    );
    const { contractAddress } = await eth.getTransactionReceipt(txHash);
    return eth.contract(abiFile.abi).at(contractAddress);
}

async function getNewArbiterContract({ abiFile, pointerAddress, arbiterStoreAddress, bondageAddress }) {
    const contract = getEthContract(abiFile);
    const txHash = await contract.new(
        pointerAddress,
        arbiterStoreAddress,
        bondageAddress,
        objectToCreate
    );
    const { contractAddress } = await eth.getTransactionReceipt(txHash);
    return eth.contract(abiFile.abi).at(contractAddress);
}

async function getNewDispatchContract({ abiFile, pointerAddress, dispatchStoreAddress, bondageAddress }) {
    const contract = getEthContract(abiFile);
    const txHash = await contract.new(
        pointerAddress,
        dispatchStoreAddress,
        bondageAddress,
        objectToCreate
    );
    const { contractAddress } = await eth.getTransactionReceipt(txHash);
    return eth.contract(abiFile.abi).at(contractAddress);
}

function getEthContract({ abi, bytecode }) {
    return eth.contract(abi, bytecode);
}

async function getNewCurrentCostContract({ abiFile, pointerAddress, registryAddress }) {
    const contract = getEthContract(abiFile);
    const txHash = await contract.new(
        pointerAddress,
        registryAddress,
        objectToCreate
    );
    const { contractAddress } = await eth.getTransactionReceipt(txHash);
    return eth.contract(abiFile.abi).at(contractAddress);
}

async function getNewTestSubscriberContract({ abiFile, dispatchAddress, bondageAddress, tokenAddress }) {
    const contract = getEthContract(abiFile);
    const txHash = await contract.new(
        dispatchAddress,
        bondageAddress,
        tokenAddress,
        objectToCreate
    );
    const { contractAddress } = await eth.getTransactionReceipt(txHash);
    return eth.contract(abiFile.abi).at(contractAddress);
}

const providerTitle = "test";
const providerPublicKey = 111;
const params = ["p1", "p2"];
const specifier = "test-linear-specifier";
const oracleEndpoint = specifier.valueOf();
const gasTransaction = toBN(3000000);
const tokensForOwner = new BigNumber("1e30");
const tokensForOracle = new BigNumber('1e24');
const allocateAccount = 300000;
const query = "Why?";
const curve = new Curve([2, 2, 0, 1, 1, 1, 10, 0, 0], [0, 5, 5, 10], [1, 3]);


module.exports = {
    getInstanceOfSmartContract,
    getNewSmartContract,
    getNewBondageContract,
    getNewArbiterContract,
    getNewDispatchContract,
    getNewRegistryContract,
    providerTitle,
    providerPublicKey,
    params,
    specifier,
    oracleEndpoint,
    gasTransaction,
    tokensForOwner,
    tokensForOracle,
    allocateAccount,
    getNewCurrentCostContract,
    query,
    curve,
    getNewTestSubscriberContract
};
