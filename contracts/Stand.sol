pragma solidity >=0.4.21 <0.7.0;

contract Stand {
    // Model a stander
    struct Stander {
        uint id;
        address owner;
        address[] customer;
    }

    // Store accounts that have voted
    mapping (address => bool) public customers;
    // Store standers

    // Fetch stander
    mapping (uint => Stander) public standers;

    // Store standers count
    uint public standersCount;

    // voted event
    event scannedStand (
        uint indexed _standerId
    );


    function addStander(address owner, address[] memory customer) public {
        standersCount ++;
        standers[standersCount] = Stander(standersCount, owner, customer);
        //standers[standersCount].customer.push(customer);
    }

    function getChildOfTheMapping(uint stander) public view returns(address[] memory) {
        return standers[stander].customer;
    }

    function scan(uint _standerId) public {
        // require that they haven't voted before
        require(!customers[msg.sender]);

        // require a valid stander
        require(_standerId > 0 && _standerId <= standersCount);
        
        // record that user has voted
        customers[msg.sender] = true;

        // update stander vote Count
        standers[_standerId].customer.push(msg.sender);

        // trigger event
        emit scannedStand(_standerId);
    }
}