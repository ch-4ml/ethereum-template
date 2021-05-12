// SPDX-License-Identifier: MIT

pragma solidity ^0.7.6;

contract MyToken {
    
    mapping (address => uint256) public balanceOf;
    
    constructor(uint256 initialSupply) {
        balanceOf[msg.sender] = initialSupply;
    }
    
    function mint(address _to, uint256 _value) public {
        balanceOf[_to] += _value;
    }
    
    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value);            // check if the sender has enough 
        require(balanceOf[_to] + _value >= balanceOf[_to]);  // check for overflows
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
    }
}