




pragma solidity ^0.5.0;

contract Splitter {

   uint ownerWeis;
   address owner;

   WalletOwner[2] public recipients;

   struct WalletOwner {
       uint balance;
       address payable holder;
   }

   modifier validEtherSend {
       require(msg.value > 0);
       _;
   }

   event LogSplittedSucceded(uint _weis);
   event LogEtherSended(uint _owner);
   event LogEtherChecked(uint alice, uint bob);

   constructor(address payable _bob, address payable _carol) public payable {
       require(_bob != address(0x0));
       require(_carol != address(0x0));
       owner = msg.sender;

       recipients[0].holder = _bob;
       recipients[1].holder = _carol;
   }

   function sendEther() public validEtherSend payable {
       if (msg.value % 2 == 0) {
           ownerWeis = 0;
       } else {
           ownerWeis = 1;
       }
       address(recipients[0].holder).transfer(msg.value / 2);
       address(recipients[1].holder).transfer(msg.value / 2);

       emit LogEtherSended(msg.value);
       emit LogEtherChecked(recipients[0].holder.balance, recipients[1].holder.balance);
   }

    function getBalanceBob() public view returns (uint myNumber) {


        return address(uint160(recipients[0].holder)).balance;
    }



}