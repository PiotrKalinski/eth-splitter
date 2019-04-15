var Migrations = artifacts.require("./Migrations.sol");
var Splitter = artifacts.require("./Splitter.sol");
var SimpleStorage = artifacts.require("./SimpleStorage.sol");

const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
module.exports = function(deployer) {
  console.log(web3)
  accounts = web3.eth.getAccounts()

  var owner = web3.eth.accounts[0];
  var bob = web3.eth.accounts[1];
  var carol = web3.eth.accounts[2];
  deployer.deploy(SimpleStorage);

  deployer.deploy(Splitter, bob, carol, {from: owner});
  deployer.deploy(Migrations);
};
