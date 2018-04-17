pragma solidity ^0.4.18;

contract fileHashes {
    uint idList=0;
    struct Sample{
        bytes fileHash;
        bytes parentHash;
    }
    //create array of structs
    Sample[] private samples;

    function createSamples(bytes _hash, bytes _parent) public {
        samples.push(Sample(_hash, _parent));
    }

    // function set(uint x, uint y) public {
    //   fileId = y;
    // }

    // function get() public view returns (bytes) {
    //   return fileHash[0];
    // }

    function getSample(uint i) public view returns (bytes, bytes){
        //return properties of struct
        return (samples[i].fileHash, samples[i].parentHash);
    }

}
