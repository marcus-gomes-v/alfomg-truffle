pragma solidity >=0.4.21 <0.7.0;

contract Election {
    // Model a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store accounts that have voted
    mapping (address => bool) public voters;
    // Store Candidates

    // Fetch Candidate
    mapping (uint => Candidate) public candidates;
    // Store Candidates count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    function addCandidate(string memory _name) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        
        // record that user has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger event
        emit votedEvent(_candidateId);
    }
}