// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract SendEther {
    function sendViaCall(address _to) public payable {
        // call 함수는 성공이나 실패를 나타내는 boolean 값을 리턴합니다.
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
}
