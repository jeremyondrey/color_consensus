pragma solidity ^0.4.18;

contract SampleStorage {
    uint soundID=0;
    struct Sample{
        bytes fileHash;
        uint hashID;
        uint parentID;
    }
    //create array of structs
    Sample[] private samples;

    function createSample(bytes _hash, uint _parent) public {
        samples.push(Sample(_hash, soundID, _parent));
        soundID=soundID+1;
    }

    function getSample(uint i) public view returns (bytes, uint, uint){
        //return properties of struct
        return (samples[i].fileHash, samples[i].hashID, samples[i].parentID);
    }

}
