// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract SoftwareOutsource
{
    // TODO: set start and end date for contract
    // TODO: Security for timeouts
    // TODO: Allow Jenkins team to specify a percentage of the payout 
    

    enum ContractState { NOT_FULFILLED, FULFILLED }

    // final amount to payout
    uint value;

    // owner is payable for the event we need to return the 
    // payout in the event the contract is not fulfilled
    address payable owner;
    address payable[] contractors;


    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    ContractState contractState;
    ProjectDetails projectDetails;

    struct ProjectDetails
    {
        string _projectName;
        string _projectDescription;
    }

    constructor (string memory _projectName, string memory _projectDetails) payable
    {       
        value = msg.value; 
        owner = payable( msg.sender);

        contractState = ContractState.NOT_FULFILLED;
        projectDetails = ProjectDetails(_projectName, _projectDetails);
    }

    // TODO: Check if address already added
    function addContractor(address payable contractor) public onlyOwner
    {
        contractors.push(contractor);
    }


    modifier onlyOwner()
    {
        require(msg.sender == owner);
        _;
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner

     */
    function changeOwner(address payable newOwner) public onlyOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Set a new state
     * @param cs A new state to set
     * 
    */
    function updateState(ContractState cs) public onlyOwner
    {
        contractState = cs;
    }


    // TODO: Return if payment was successfull, or the amount that was paid, etc
    function approve() payable public onlyOwner
    {
        require(contractState == ContractState.FULFILLED, "Contract has not been fulfilled");
        require(owner.balance >= value, "Insufficient Balance");

        // Divide payout equally between contractors
        // TODO: Add weighted payouts
        // TODO: Round this value to int
        uint splitPayout = value / contractors.length;


        for (uint i = 0; i < contractors.length; i++)
        {
            contractors[i].transfer(splitPayout);
        }
    }
}
