// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SoftwareOutsource.sol";

contract TestSoftwareOutsource {
    function test1() public {
        SoftwareOutsource so = new SoftwareOutsource("Test", "More testing", block.timestamp);
        // so.updateState();
        // Assert.equal(so.getState(), "Test", "Requires more testing.");
        Assert.equal(so.getState(), 0, "Not fulfilled");
    }

    function test2() public {
        SoftwareOutsource so = SoftwareOutsource(DeployedAddresses.SoftwareOutsource());
        Assert.equal(so.getState(), 0, "Initial state should be one.");
    }

    // function test3() public {
    //     SoftwareOutsource so = SoftwareOutsource(DeployedAddresses.SoftwareOutsource());
    //     so.setStateToFulfilled();
    //     Assert.equal(so.getState(), 1, "State should have became 1.");
    // }
}