const SoftwareOutsource = artifacts.require("SoftwareOutsource");

contract("SoftwareOutsource", (accounts) => {
    it("should have \"test\" as a name", async () => {
        const instance = await SoftwareOutsource.deployed();
        const state = await instance.getState.call();
        console.log(state, state.valueOf())
        assert.equal(state.valueOf(), "test", "it should be test");
    })
})