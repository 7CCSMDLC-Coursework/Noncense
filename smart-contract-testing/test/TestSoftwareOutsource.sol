// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SoftwareOutsource.sol";

contract TestSoftwareOutsource {
    event Print(address add);
    function test1() public {
        SoftwareOutsource so = new SoftwareOutsource("Test", "More testing");
        // so.updateState();
        emit Print(msg.sender);
        Assert.equal(so.getState(), "Test", "Requires more testing.");
    }

    function test2() public {
        SoftwareOutsource so = SoftwareOutsource(DeployedAddresses.SoftwareOutsource());
        Assert.equal(so.getState(), "test", "Requires more testing.");
    }
}