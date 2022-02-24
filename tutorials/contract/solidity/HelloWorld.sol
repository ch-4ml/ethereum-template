// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract HelloWorld {
    string public message;

    // 생성자. contract를 배포할 때 호출됨
    constructor(string memory initMessage) {
        message = initMessage;
    }

    function update(string memory newMessage) public {
        message = newMessage;
    }
}