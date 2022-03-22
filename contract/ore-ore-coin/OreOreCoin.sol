// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract OreOreCoin {
    // 상태 변수 선언
    string public name; // 토큰 이름
    string public symbol; // 토큰 단위
    uint8 public decimals; // 소수점 이하 자릿수
    uint256 public totalSupply; // 토큰 총량
    mapping (address => uint256) public balanceOf; // 각 주소의 잔고
    
    // 이벤트 알림
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    // 생성자
    constructor(uint256 _supply, string memory _name, string memory _symbol, uint8 _decimals) {
        balanceOf[msg.sender] = _supply;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _supply;
    }
 
    // 송금
    function transfer(address _to, uint256 _value) public {
        // 부정 송금 확인
        require (balanceOf[msg.sender] >= _value, "tranfer_err_1");
        require (balanceOf[_to] + _value >= balanceOf[_to], "tranfer_err_2");
        // 송금하는 주소와 송금받는 주소의 잔고 갱신
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        // 이벤트 알림
        emit Transfer(msg.sender, _to, _value);
    }
}
