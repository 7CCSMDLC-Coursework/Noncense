// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract MyContract {
    uint data;

    function setData(uint _data) external {
        data = _data;
    }

    function getData() external view returns(uint) {
        return data;
    }

}
