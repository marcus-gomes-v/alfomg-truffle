var Lecture = artifacts.require("./Lecture.sol");

contract("Lecture", function (accounts) {
    var lectureInstance;
    
    it("initializes with no speakers", function () {
        return Lecture.deployed().then(function (instance) {
            return instance.speakersCount();
        })
        .then(function (count) {
            assert.equal(count, 0);
        });
    });

    it("allows add speaker lecture", function () {
        
        return Lecture.deployed().then(function (instance) {
            lectureInstance = instance;
            return lectureInstance.addSpeaker(accounts[1], ['0x0000000000000000000000000000000000000000'], { from: accounts[0] });
        })
        .then(function (receipt) {
            assert.equal(receipt.logs.length, 0, "no event was triggered");
            return lectureInstance.speakersCount();
        })
        .then(function (speakersCount) {
            assert.equal(speakersCount, 1);
            return lectureInstance.speakers(1);
        }).then(function (speaker) {
            assert.equal(speaker.owner, accounts[1]);
        });
    });

    it("allows a customer to scan a lecture", function () {
        return Lecture.deployed().then(function (instance) {
            lectureInstance = instance;
            speakerId = 1;
            return lectureInstance.scan(speakerId, { from: accounts[0] });
        })
        .then(function (receipt) {
            assert.equal(receipt.logs.length, 1, "an event was triggered");
            assert.equal(receipt.logs[0].event, "scannedEvent", "the event type is correct");
            assert.equal(receipt.logs[0].args._speakerId.toNumber(), speakerId, "the speaker id is correct");
            return lectureInstance.customers(accounts[0]);
        })
        .then(function (scanned) {
            assert(scanned, "the customer was marked as scanned");
            return lectureInstance.speakersCount();
        })
        .then(function (speakersCount) {
            assert.equal(speakersCount, 1);
            return lectureInstance.getChildOfTheMapping(speakerId);
        }).then(function (customers) {
            assert.equal(customers[1], accounts[0]);
        });
        
    });

});
