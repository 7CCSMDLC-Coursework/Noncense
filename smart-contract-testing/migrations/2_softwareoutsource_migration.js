const SoftwareOutsource = artifacts.require("SoftwareOutsource");

module.exports = function(deployer) {
    deployer.deploy(SoftwareOutsource, "test", "more_test", 1716510465, {'value': '1000000000000000000'});
};