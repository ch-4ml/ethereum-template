// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract Voting {
  
    mapping (bytes32 => uint256) public votesReceived;  // 각 후보자의 득표수
    bytes32[] public candidateList;  // 후보자 목록

    // 생성자. contract를 배포할 때 호출됨
    constructor(bytes32[] memory candidateNames) {
        candidateList = candidateNames;
    }

    // 후보자 추가
    function setCandidate(bytes32 candidateName) public {
        candidateList.push(candidateName);
    }

    // 후보자 전체 조회
    function getAllCandidates() public view returns(bytes32[] memory) {
        return candidateList;
    }

    // 후보자의 득표수 조회
    function totalVotesFor(bytes32 candidate) public view returns(uint256) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }

    // 투표
    function voteForCandidate(bytes32 candidate) public {
        // 투표 전, 후보자가 목록에 있는지 검사해야 합니다.
        // 해당 로직을 여기에 작성하세요. (1줄)
        require(validCandidate(candidate));
        // 후보자가 목록에 있다면 후보자의 득표 수를 1 추가합니다.
        // 해당 로직을 여기에 작성하세요. (1줄)
        votesReceived[candidate] += 1;
    }

    // 해당 후보자가 목록에 있는지 체크
    function validCandidate(bytes32 candidate) public view returns(bool) {  // true, false
        // 모든 후보자에 대해 반복하면서 검사합니다.
        for(uint i = 0; i < candidateList.length; i++) {
            // 후보자가 목록에 있다면 참(true)을 반환합니다.
            // 해당 로직을 여기에 작성하세요. (3줄)
            if(candidate == candidateList[i]) {
                return true;
            }
        }
        // 모든 후보자를 검사하는 동안 이 함수가 return되지 않았다면
        // 인자로 넘어온 후보자는 목록에 존재하지 않는 것입니다.
        // 목록에 존재하지 않다는 것을 알려주기 위해서 거짓(false)를 반환합니다.
        // 해당 로직을 여기에 작성하세요. (1줄)
        return false;
    }
}

/*
    ["0x52616d6100000000000000000000000000000000000000000000000000000000", // Rama
    "0x4e69636b00000000000000000000000000000000000000000000000000000000",  // Nick
    "0x4a6f736500000000000000000000000000000000000000000000000000000000"]  // Jose
*/
