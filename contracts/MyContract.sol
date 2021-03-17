// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.4;

contract SoftwareOutsouce
{
    // TODO: set start and end date for contract
    // TODO: Security for timeouts

    

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
        owner = msg.sender;

        contractState = ContractState.NOT_FULFILLED;
        projectDetails = ProjectDetails(_projectName, _projectDetails);
    }

    function setContractor(address payable[] memory _contractors) public onlyOwner
    {
        contractors = _contractors;
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
    */
    function updateState(ContractState cs) public onlyOwner
    {
        contractState = cs;
    }

    function approve() payable public onlyOwner
    {
        require(contractState == ContractState.FULFILLED, "Contract has not been fulfilled");
        require(owner.balance >= value, "Insufficient Balance");

        // Divide payout equally between contractors
        // TODO: Add weighted payouts
        uint splitPayout = value / contractors.length;


        for (uint i = 0; i < contractors.length; i++)
        {
            contractors[i].transfer(splitPayout);
        }
    }
}