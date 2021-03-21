// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2;

contract SoftwareOutsouce
{  
    enum ContractState { NOT_FULFILLED, FULFILLED, COMPLETE }

    // epoch time that the contract will expire
    uint timeout;

    // employer is payable for the event we need to return the 
    // payout in the event the contract is not fulfilled
    address payable employer;
    address payable[] contractors;


    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    ContractState contractState;
    ProjectDetails projectDetails;

    struct ProjectDetails
    {
        string _projectName;
        string _projectDescription;
    }

    constructor (string memory _projectName, string memory _projectDetails, uint256 _timeout) payable
    {       
        employer = payable(msg.sender);

        timeout = _timeout;

        contractState = ContractState.NOT_FULFILLED;
        projectDetails = ProjectDetails(_projectName, _projectDetails);
    }

    function addContractor(address payable contractor) public onlyEmployer
    {
        // Loop through contractors and ensure contractor not already added
        for (uint i = 0; i < contractors.length; i++)
        {
            require (contractors[i] != contractor, "Contractor has already been added");
        }
        contractors.push(contractor);
    }


    modifier onlyEmployer()
    {
        require(msg.sender == employer);
        _;
    }

    /**
     * @dev Set a new state
     * @param cs A new state to set
     * 
    */
    function updateState(ContractState cs) public onlyEmployer
    {
        contractState = cs;
    }


    // BUG: Payment does not get made if paidOut is used as transfer() value
    // TODO: Allow selection of contractors to pay, instead of everyone
    function approve(uint percentToPay) payable public //returns (uint paidOut)
    {
        require(timeout >= block.timestamp, "Contract has expired");
        require(msg.sender == employer, "You are not authorized to call this function");
        require(contractState == ContractState.FULFILLED, "Contract has not been fulfilled");
        require(contractState != ContractState.COMPLETE, "Payment has already been made");
       // require(address(this).balance >= value, "Insufficient Balance");
        require(contractors.length > 0, "No contractors added");

        // extract the percentage to payout
        // percentToPay is set by Jenkins and will change based on the amount of tests that pass
/*        uint value = (percentToPay / 100) * address(this).balance;
        
        // Divide payout equally between contractors
        paidOut = value / contractors.length;
*/
        
        for (uint i = 0; i < contractors.length; i++)
        {
            contractors[i].transfer(address(this).balance);
        }

        // Mark the contract as complete so it can not be called twice
        contractState = ContractState.COMPLETE;
    }
}