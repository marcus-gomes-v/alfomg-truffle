const Lecture = artifacts.require("./Lecture.sol");
const Stand = artifacts.require("./Stand.sol");
const Election = artifacts.require("./Election.sol");



module.exports = function(deployer) {
  deployer.deploy(Lecture);
  deployer.deploy(Stand);
  deployer.deploy(Election);
  
};
