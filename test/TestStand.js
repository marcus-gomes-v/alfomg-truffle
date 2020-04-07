var Stand = artifacts.require("./Stand.sol");

contract("Stand", function (accounts) {
    var standInstance;

    it("initializes with no stands", function () {
        return Stand.deployed().then(function (instance) {
            return instance.standersCount();
        })
        .then(function (count) {
            assert.equal(count, 0);
        });
    });

    it("allows add stand", function () {

        return Stand.deployed().then(function (instance) {
            standInstance = instance;
            return standInstance.addStander(accounts[1], ['0x0000000000000000000000000000000000000000'], { from: accounts[0] });
        })
        .then(function (receipt) {
            assert.equal(receipt.logs.length, 0, "no event was triggered");
            return standInstance.standersCount();
        })
        .then(function (standersCount) {
            assert.equal(standersCount, 1);
            return standInstance.standers(1);
        }).then(function (stander) {
            assert.equal(stander.owner, accounts[1]);
        });
    });

    it("allows a customer to scan a Stand", function () {
        return Stand.deployed().then(function (instance) {
            standInstance = instance;
            standerId = 1;
            return standInstance.scan(standerId, { from: accounts[0] });
        })
        .then(function (receipt) {
            assert.equal(receipt.logs.length, 1, "an event was triggered");
            assert.equal(receipt.logs[0].event, "scannedStand", "the event type is correct");
            assert.equal(receipt.logs[0].args._standerId.toNumber(), standerId, "the stander id is correct");
            return standInstance.customers(accounts[0]);
        })
        .then(function (scanned) {
            assert(scanned, "the customer was marked as scanned");
            return standInstance.standersCount();
        })
        .then(function (standersCount) {
            assert.equal(standersCount, 1);
            return standInstance.getChildOfTheMapping(standerId);
        }).then(function (customers) {
            assert.equal(customers[1], accounts[0]);
        });
        
    });

});
