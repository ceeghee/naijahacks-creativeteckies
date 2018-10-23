pragma solidity 0.4.24;
// pragma experimental ABIEncoderV2;

contract Votera {

    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    //Model a Post (or Categories)
    struct Posts {
        uint id;
        string postName;
        uint numberOfCandidates;

        
    }
    

    // Store accounts that have voted
    mapping(address => bool) public voters;

    // bytes32[] public candidateList;

    
     // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;

    // Store Posts
    // Fetch Posts
    mapping(address => Posts) public posts;

    // Store Categories
    // Fetch Categories
    // mapping(string => mapping (uint => Candidate)) public categories;

    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    constructor () public {
        addCandidate("Goodluck Ekene");
        addCandidate("Fakorede Moshood");
        addCandidate("Olawale Akin");
        // for(uint i = 0; i<_candidateNames.length; i++){
        //     // addCandidate(_candidateNames[i]);
        // }

    }

    function addCandidate (string _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        votedEvent(_candidateId);
    }
}
