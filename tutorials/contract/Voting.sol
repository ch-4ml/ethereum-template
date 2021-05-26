// SPDX-License-Identifier: MIT

pragma solidity ^0.7.6;

contract Voting {
  
    mapping (bytes32 => uint256) public votesReceived;
    bytes32[] public candidateList;

    constructor(bytes32[] memory candidateNames) {
        candidateList = candidateNames;
    }

    function setCandidate(bytes32 candidateName) public {
        candidateList.push(candidateName);
    }

    function getAllCandidates() public view returns(bytes32[] memory) {
        return candidateList;
    }

    function totalVotesFor(bytes32 candidate) public view returns(uint256) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }

    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }

    function validCandidate(bytes32 candidate) public view returns(bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if(candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}