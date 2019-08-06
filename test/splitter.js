Promise = require("bluebird");
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

const Splitter = artifacts.require("./Splitter.sol");


contract("Splitter contract", async (accounts) => {

});
