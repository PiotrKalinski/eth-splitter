import React, { Component } from "react";
import SplitterContract from "./contracts/Splitter.json"
import getWeb3 from "./utils/getWeb3";
import contract from "truffle-contract"

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Truffle-contrct to perform a contract.
      const splitterContract = contract(SplitterContract);

      splitterContract.setProvider(web3.currentProvider);
      const contractDeployed = await splitterContract.deployed();

      // Get the contract instance.

      //IF WORKS CONNECTION TO WEB3 THEN REMOVE
      /* 
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const SplitterInstance = new web3.eth.Contract(
        SplitterContract.abi,
        deployedNetwork && deployedNetwork.address,
      ); 
      */
      
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: contractDeployed, splitter: SplitterInstance, }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  splitEther = async () => {
    
    const bobAddress = "0x29bae5316455eeb19cbd07f2f17f3ae8c840bfaa";
    const carolAddress = "0xb63f88ca1d5fad10131ca2b3b145e735c8111e08";
    await this.state.contract.splitEther(bob, carol, {
      from: accounts[0]
    });
    console.log("Ether splitter successfully");

  }

  runExample = async () => {
    const { accounts, contract, splitter } = this.state;
    // console.log(alice, bob, carol)
    // Stores a given value, 5 by default.
    console.log('balance', splitter)

    const balance = await splitter.methods.getBalance(accounts[0]).call() 
    // dont know how to deal with this, reciving VM Exception while processing transaction: revert
    // while things goes smoothly on REMIX IDE
    console.log('balance', balance)


    await contract.methods.set(5).send({ from: accounts[0] });
    // Get the value from the contract to  prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
