pragma solidity ^0.4.16;

/// @title 위임 투표.
contract Ballot {
    // 이것은 나중에 변수에 사용될 새로운
    // 복합 유형을 선언합니다.
    // 그것은 단일 유권자를 대표할 것입니다.
    struct Voter {
        uint weight; // weight 는 대표단에 의해 누적됩니다.
        bool voted;  // 만약 이 값이 true라면, 그 사람은 이미 투표한 것 입니다.
        address delegate; // 투표에 위임된 사람
        uint vote;   // 투표된 제안의 인덱스 데이터 값
    }

    // 이것은 단일 제안에 대한 유형입니다.
    struct Proposal {
        bytes32 name;   // 간단한 명칭 (최대 32바이트)
        uint voteCount; // 누적 투표 수
    }

    address public chairperson;

    // 이것은 각각의 가능한 주소에 대해
    // `Voter` 구조체를 저장하는 상태변수를 선언합니다.
    mapping(address => Voter) public voters;

    // 동적으로 크기가 지정된 `Proposal` 구조체의 배열입니다.
    Proposal[] public proposals;

    /// `proposalNames` 중 하나를 선택하기 위한 새로운 투표권을 생성십시오.
    function Ballot(bytes32[] proposalNames) public {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        // 각각의 제공된 제안서 이름에 대해,
        // 새로운 제안서 개체를 만들어 배열 끝에 추가합니다.
        for (uint i = 0; i < proposalNames.length; i++) {
            // `Proposal({...})` creates a temporary
            // Proposal object and `proposals.push(...)`
            // appends it to the end of `proposals`.
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    // `voter` 에게 이 투표권에 대한 권한을 부여하십시오.
    // 오직 `chairperson` 으로부터 호출받을 수 있습니다.
    function giveRightToVote(address voter) public {
        // `require`의 인수가 `false`로 평가되면,
        // 그것은 종료되고 모든 변경내용을 state와
        // Ether Balance로 되돌립니다.
        // 함수가 잘못 호출되면 이것을 사용하는 것이 좋습니다.
        // 그러나 조심하십시오,
        // 이것은 현재 제공된 모든 가스를 소비할 것입니다.
        // (이것은 앞으로 바뀌게 될 예정입니다)
        require(
            (msg.sender == chairperson) &&
            !voters[voter].voted &&
            (voters[voter].weight == 0)
        );
        voters[voter].weight = 1;
    }

    /// `to` 로 유권자에게 투표를 위임하십시오.
    function delegate(address to) public {
        // 참조를 지정하십시오.
        Voter storage sender = voters[msg.sender];
        require(!sender.voted);

        // 자체 위임은 허용되지 않습니다.
        require(to != msg.sender);

        // `to`가 위임하는 동안 delegation을 전달하십시오.
        // 일반적으로 이런 루프는 매우 위험하기 때문에,
        // 너무 오래 실행되면 블록에서 사용가능한 가스보다
        // 더 많은 가스가 필요하게 될지도 모릅니다.
        // 이 경우 위임(delegation)은 실행되지 않지만,
        // 다른 상황에서는 이러한 루프로 인해
        // 스마트 컨트랙트가 완전히 "고착"될 수 있습니다.
        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // 우리는 delegation에 루프가 있음을 확인 했고 허용하지 않았습니다.
            require(to != msg.sender);
        }

        // `sender` 는 참조이므로,
        // `voters[msg.sender].voted` 를 수정합니다.
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];
        if (delegate_.voted) {
            // 대표가 이미 투표한 경우,
            // 투표 수에 직접 추가 하십시오
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            // 대표가 아직 투표하지 않았다면,
            // weight에 추가하십시오.
            delegate_.weight += sender.weight;
        }
    }

    /// (당신에게 위임된 투표권을 포함하여)
    /// `proposals[proposal].name` 제안서에 투표 하십시오.
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted);
        sender.voted = true;
        sender.vote = proposal;

        // 만약 `proposal` 이 배열의 범위를 벗어나면
        // 자동으로 throw 하고 모든 변경사항을 되돌릴 것입니다.
        proposals[proposal].voteCount += sender.weight;
    }

    /// @dev 모든 이전 득표를 고려하여 승리한 제안서를 계산합니다.
    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    // winningProposal() 함수를 호출하여
    // 제안 배열에 포함된 승자의 index를 가져온 다음
    // 승자의 이름을 반환합니다.
    function winnerName() public view
            returns (bytes32 winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }
}