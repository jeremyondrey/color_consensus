pragma solidity ^0.4.18;

contract SampleStorage {
  bytes storedData;

  function set(bytes x) public {
    storedData = x;
  }

  function get() public view returns (bytes) {
    return storedData;
  }
}
