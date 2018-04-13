var SampleStorage = artifacts.require("./SampleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(SampleStorage);
};
