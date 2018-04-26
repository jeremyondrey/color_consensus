pragma solidity ^0.4.18;

contract SampleStorage {
    uint soundID=1;
    struct Sample{
        bytes fileHash;
        uint hashID;
        uint category;
        bytes3 color;
        address uploader;
    }
    //create array of structs
    Sample[] private samples;

    function createSample(bytes _hash, uint _category, bytes3 _color) public {
        samples.push(Sample(_hash, soundID, _category, _color, msg.sender));
        soundID=soundID+1;
    }

    function getSample(uint i) public view returns (bytes, uint, uint, bytes3){
        //return properties of struct
        return (samples[i].fileHash, samples[i].hashID, samples[i].category, samples[i].color);
    }

    function getSampleCount() public view returns(uint count) {
        return samples.length;
    }

}
