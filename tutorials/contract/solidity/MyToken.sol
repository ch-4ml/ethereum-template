// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract MyToken {
    
    // 해당 주소의 토큰 보유 량
    mapping (address => uint256) public balanceOf;
    
    // 생성자. contract를 배포할 때 호출됨
    constructor(uint256 initialSupply) {
        balanceOf[msg.sender] = initialSupply;
    }
    
    // 토큰 발행
    function mint(address _to, uint256 _value) public {
        balanceOf[_to] += _value;
    }
    
    // 토큰 전송
    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value);            // check if the sender has enough 
        require(balanceOf[_to] + _value >= balanceOf[_to]);  // check for overflows
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
    }
}