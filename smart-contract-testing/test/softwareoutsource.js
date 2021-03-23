const truffleAssert = require("truffle-assertions")
const SoftwareOutsource = artifacts.require("SoftwareOutsource");

contract("SoftwareOutsource", (accounts) => {
    it("state should have been initialised correctly", async () => {
        const instance = await SoftwareOutsource.deployed();
        const state = await instance.getState();
        const employer = await instance.getEmployer();
        const contractors = await instance.getContractors();

        assert.equal(state.valueOf(), 0, "State should have been set to 0.");
        assert.equal(employer.toString(), accounts[0], "The employer assigned is wrong.");
        // console.log(contractors.getValue());
        assert.equal(contractors.toString(), [], "The contractors array should be empty.");
    });
    it("should fail a non-employer adress", async() => {
        const instance = await SoftwareOutsource.deployed();
        const previous_state = await instance.getState();
        await truffleAssert.reverts(instance.setStateToFulfilled({'from': accounts[1]}));
        const state = await instance.getState();

        assert.equal(previous_state.valueOf(), 0, "State was 0.")
        assert.equal(state.valueOf(), 0, "State should still be 0.");
        assert.equal(state.toString(), previous_state.toString(), "States should be the same.")
    });
    it("state should set the state to FULFILLED", async() => {
        const instance = await SoftwareOutsource.deployed();
        const previous_state = await instance.getState();
        await instance.setStateToFulfilled({'from': accounts[0]});
        const state = await instance.getState();

        assert.equal(state.valueOf(), 1, "State should have been set to 1.");
        assert.notEqual(state, previous_state, "State should have changed.")
    });
    it("should store a contractor address", async() => {
        const instance = await SoftwareOutsource.deployed();
        await instance.addContractor(accounts[1], {'from': accounts[0]});
        const contractors = await instance.getContractors();
        
        assert.equal(accounts[1], contractors.valueOf(), "Addresses don't match.");
    });
    it("should not store the same contractor address", async() => {
        const instance = await SoftwareOutsource.deployed();
        await truffleAssert.reverts(instance.addContractor(accounts[1], {'from': accounts[0]}));
        const contractors = await instance.getContractors();

        assert.equal(contractors.valueOf(), accounts[1], "Addresses don't match.");
        assert.notEqual(contractors.valueOf(), [accounts[1], accounts[1]], "Address duplicate found.");
    });
    it("should have stored a new address next to the previous one", async() => {
        const instance = await SoftwareOutsource.deployed();
        await instance.addContractor(accounts[2], {'from': accounts[0]});
        const contractors = await instance.getContractors();
        let accountslist = [accounts[1], accounts[2]];

        assert.equal(contractors.valueOf().toString(), accountslist.toString(), "Addresses don't match.");
        assert.equal(contractors.valueOf()[1], accounts[2], "Address not added correctly.");
    });
    it("should not allow the employer to be assigned as a contractor", async() => {
        const instance = await SoftwareOutsource.deployed();
        await truffleAssert.reverts(instance.addContractor(accounts[0], {'from': accounts[0]}));
        const contractors = await instance.getContractors();
        let accountslist = [accounts[1], accounts[2]];

        assert.equal(contractors.valueOf().toString(), accountslist.toString(), "Addresses don't match.");

        accountslist.push(accounts[0]);

        assert.notEqual(contractors.valueOf().toString(), accountslist.toString(), 
            "Contractors array shouldn't have the employer.")
    });
})