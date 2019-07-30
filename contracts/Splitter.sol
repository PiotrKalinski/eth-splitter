




pragma solidity ^0.5.0;

contract Splitter {

   uint ownerWeis;
   address owner;
   uint storedData;

   modifier validEtherSend {
       require(msg.value > 0, "Value must be bigger than 0");
       _;
   }

   event LogSplittedSucceded(uint _weis);
   event LogEtherSended(uint _owner);
   event LogEtherChecked(uint alice, uint bob);

   constructor() public payable {
       owner = msg.sender;
   }

   function split(address payable _bob, address payable _carol) public validEtherSend payable returns (bool) {
       require(_bob != address(0x0), "Bob address cannot be 0x0");
       require(_carol != address(0x0), "Carol address cannot be 0x0 as well");
       if (msg.value % 2 == 0) {
           ownerWeis = 0;
       } else {
           ownerWeis = 1;
       }
       address(_bob).transfer(msg.value / 2);
       address(_carol).transfer(msg.value / 2);

       emit LogEtherSended(msg.value);
       emit LogEtherChecked(address(_bob).balance, address(_bob).balance);
   }

    function getBalance(address user) public view returns (uint myNumber) {
        return address(user).balance;
    }


}