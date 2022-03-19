// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract OreOreCoin {
    // 상태 변수 선언
    string public name; // 토큰 이름
    string public symbol; // 토큰 단위
    uint8 public decimals; // 소수점 이하 자릿수
    uint256 public totalSupply; // 토큰 총량
    mapping (address => uint256) public balanceOf; // 각 주소의 잔고
    mapping (address => int8) public blackList; // 블랙리스트
    address public owner; // 소유자 주소
    mapping (address => uint8) public cashbackRate; // 각 주소의 캐시백 비율
    
    // 수식자 
    modifier onlyOwner() {
        require (msg.sender == owner, "onlyOwner");
        _;
    }
    
    // 이벤트 알림
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Blacklisted(address indexed target);
    event DeleteFromBlacklist(address indexed target);
    event RejectedPaymentToBlacklistedAddr(address indexed from, address indexed to, uint256 value);
    event RejectedPaymentFromBlacklistedAddr(address indexed from, address indexed to, uint256 value);
    event SetCashback(address indexed addr, uint8 rate);
    event Cashback(address indexed from, address indexed to, uint256 value);
    
    // 생성자
    constructor(uint256 _supply, string memory _name, string memory _symbol, uint8 _decimals) {
        balanceOf[msg.sender] = _supply;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _supply;
        owner = msg.sender; //소유자 주소 설정 
    }
 
    // 주소를 블랙리스트에 등록
    function blacklisting(address _addr) public onlyOwner {
        blackList[_addr] = 1;
        emit Blacklisted(_addr);
    }
 
    // 주소를 블랙리스트에서 해제
    function deleteFromBlacklist(address _addr) public onlyOwner {
        blackList[_addr] = -1;
        emit DeleteFromBlacklist(_addr);
    }
 
    // 캐시백 비율 설정 
    function setCashbackRate(uint8 _rate) public {
        if (_rate > 100) {
            _rate = 100;
        }
        cashbackRate[msg.sender] = _rate;
        emit SetCashback(msg.sender, _rate);
    }
 
    // 송금
    function transfer(address _to, uint256 _value) public {
        // 부정 송금 확인
        require (balanceOf[msg.sender] >= _value, "tranfer_err_1");
        require (balanceOf[_to] + _value >= balanceOf[_to], "tranfer_err_2");
        
        // 블랙리스트에 존재하는 주소는 입출금 불가
        if (blackList[msg.sender] > 0) {
            emit RejectedPaymentFromBlacklistedAddr(msg.sender, _to, _value);
        } else if (blackList[_to] > 0) {
            emit RejectedPaymentToBlacklistedAddr(msg.sender, _to, _value);
        } else {
            // 캐시백 금액 계산(각 대상의 캐시백 비율 사용)
            uint256 cashback = 0;
            if(cashbackRate[_to] > 0) cashback = _value / 100 * uint256(cashbackRate[_to]);
            
            // 송금하는 주소와 송금받는 주소의 잔고 갱신
            balanceOf[msg.sender] -= (_value - cashback);
            balanceOf[_to] += (_value - cashback);
        // 이벤트 알림
        emit Transfer(msg.sender, _to, _value);
        emit Cashback(_to, msg.sender, cashback);
        }
    }
}
