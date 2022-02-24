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
    function transfer(address _to, uint256 _value) public view {
        // 토큰을 전송하기 전 보유한 토큰이 전송하려는 토큰보다 많은지
        // 검사하는 코드를 여기에 작성하세요.
        // require(조건): 조건이 참인 경우에만 아래 코드를 이어서 실행
        
        require(balanceOf[_to] + _value >= balanceOf[_to]);  // check for overflows
        
        // 토큰을 전송할 수 있는 조건을 모두 만족한 경우,
        // 토큰을 전송하는 로직을 여기에 작성하세요.
        // 보내는 사람의 토큰을 _value만큼 깎고, 받는 사람의 토큰을 _value만큼 더하면 됩니다.
    }
}