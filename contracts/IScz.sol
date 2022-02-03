// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

interface IScz {
    function addFunds() external payable;

    function withdraw(uint256 withdrawAmount) external;
}
 