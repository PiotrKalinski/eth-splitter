var Splitter = artifacts.require("./Splitter.sol");
var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer, network, accounts) {

  deployer.deploy(SimpleStorage);

  deployer.deploy(Splitter);
};
