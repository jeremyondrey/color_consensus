pragma solidity ^0.4.18;

contract SampleStorage {
    uint soundID=1;
    struct Sample{
        bytes fileHash;
        uint hashID;
        bytes6 color;
        address uploader;
    }
    //create array of structs
    Sample[] private samples;

    function createSample(bytes _hash, bytes6 _color) public {
        samples.push(Sample(_hash, soundID, _color, msg.sender));
        soundID=soundID+1;
    }

    function getSample(uint i) public view returns (bytes, uint, bytes6, address){
        //return properties of struct
        return (samples[i].fileHash, samples[i].hashID, samples[i].color, samples[i].uploader);
    }

    function getSampleCount() public view returns(uint count) {
        return samples.length;
    }
}
