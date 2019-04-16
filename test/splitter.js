Promise = require("bluebird");
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

const Splitter = artifacts.require("./Splitter.sol");


contract("Splitter contract", async (accounts) => {

    let alice;
    let bob;
    let carol;

    [alice, bob, carol] = accounts;

    let contractInstance;
    before("Checking if smart contract is setup properly -  accounts", async () => {
        assert.isAtLeast(accounts.length, 3, "not enough, something is wrong here....");

        console.log("Owner: " + alice);
        console.log("Bob: " + bob);
        console.log("Carol: " + carol);

        contractInstance = await Splitter.new(bob, carol, {from: alice});
        return web3.eth.getBalance(alice)
            .then(_balance => {
                console.log("Alice balance: " + _balance);
            });
    });

});
