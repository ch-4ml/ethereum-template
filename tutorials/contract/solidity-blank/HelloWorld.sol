// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract HelloWorld {
    // 자료형이 string이고, 가시성(Visibility)은 public이며,
    // message라는 이름을 가진 변수를 여기에 선언하세요.
    string public message;
    
    // 생성자. contract를 배포할 때 호출됨
    constructor(string memory initMessage) {
        // contract를 배포할 때 입력하는 인자의 값이
        // message 변수에 저장되도록 여기에서 할당하세요.
        message = initMessage;
    }

    function update(string memory newMessage) public {
        // 적절한 로직을 여기에 작성하세요.
        message = newMessage;
    }
}