




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
       recipients[0].balance = 0;
       recipients[1].balance = 0;
       recipients[0].holder = _bob;
       recipients[1].holder = _carol;
   }

   function sendEther() public validEtherSend payable {
       uint amount = msg.value;
       if (amount % 2 == 0) {
           ownerWeis = 0;
           amount = amount / 2;
       } else {
           ownerWeis = 1;
           amount = (amount - 1) / 2;
       }
       address(recipients[0].holder).transfer(amount);
       emit LogEtherSended(amount);
       emit LogEtherChecked(recipients[0].holder.balance, recipients[1].holder.balance);
   }

    function getBalance() public view returns (uint) {

        return address(recipients[0].holder);
    }

}