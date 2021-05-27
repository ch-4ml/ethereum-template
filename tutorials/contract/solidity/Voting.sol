// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

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
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }

    // 해당 후보자가 목록에 있는지 체크
    function validCandidate(bytes32 candidate) public view returns(bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if(candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}

/*
    ["0x52616d6100000000000000000000000000000000000000000000000000000000",
    "0x4e69636b00000000000000000000000000000000000000000000000000000000",
    "0x4a6f736500000000000000000000000000000000000000000000000000000000"]
*/
