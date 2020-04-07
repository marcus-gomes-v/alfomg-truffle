pragma solidity >=0.4.21 <0.7.0;

contract Lecture {
    // Model a speaker
    struct Speaker {
        uint id;
        address owner;
        address[] customer;
    }

    // Store accounts that have voted
    mapping (address => bool) public customers;
    // Store speakers

    // Fetch speaker
    mapping (uint => Speaker) public speakers;

    // Store speakers count
    uint public speakersCount;

    // voted event
    event scannedEvent (
        uint indexed _speakerId
    );


    function addSpeaker(address owner, address[] memory customer) public {
        speakersCount ++;
        speakers[speakersCount] = Speaker(speakersCount, owner, customer);
        //speakers[speakersCount].customer.push(customer);
    }

    function getChildOfTheMapping(uint speaker) public view returns(address[] memory) {
        return speakers[speaker].customer;
    }

    function scan(uint _speakerId) public {
        // require that they haven't voted before
        require(!customers[msg.sender]);

        // require a valid speaker
        require(_speakerId > 0 && _speakerId <= speakersCount);
        
        // record that user has voted
        customers[msg.sender] = true;

        // update speaker vote Count
        speakers[_speakerId].customer.push(msg.sender);

        // trigger event
        emit scannedEvent(_speakerId);
    }
}