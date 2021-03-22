const SoftwareOutsource = artifacts.require("SoftwareOutsource");

module.exports = function(deployer) {
    deployer.deploy(SoftwareOutsource, "test", "more_test");
};