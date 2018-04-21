import React, { Component } from 'react'
import SampleStorageContract from '../build/contracts/SampleStorage.json'
import getWeb3 from './utils/getWeb3'

//components
import SoundFile from './Components/SoundFile.js'
import Footer from './Components/Footer.js'


//local json database
// import jsonSoundList from './jsonSoundList.json'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: "hello",
      listLength: null,
      web3: null,
      soundFiles: [],
      contractHashes: []
    }

  }

  componentWillMount() {
    this.setState({soundFiles: [{
      fileHash: "Qmctyojt2Rc7PbKbi3CM9zpoHR91qhNpgj6Jkq2Zi6VdfG",
      fileID: 0,
      parentID: 0
    },
    {
      fileHash: "QmSnUCS7wRhkcJj97d8poXM9CvH45VGjUBnEUjLZW49BcH",
      fileID: 1,
      parentID: 0
    },
    {
      fileHash: "QmUhD25MRvghabeUxPxc7qBtzSnZvQn8DG2WgrbMkPRqRF",
      fileID: 2,
      parentID: 1
    },
    {
      fileHash: "Qmevt9AJLAJyBo8KtxiKJ8qGNNY57fJFJqVXkhPVXHZzPs",
      fileID: 3,
      parentID: 2
    }]

  })

    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      // this.instantiateContract()
      this.getArrayLength()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  testIfWav(filename) {
    if (filename.split('.').pop() === "wav") {
      return "true"
    } else return "nep"
}

  nestComments(commentList) {
    const commentMap = {};
    // move all the comments into a map of id => comment
    commentList.forEach(comment => commentMap[comment.fileID] = comment);
    // iterate over the comments again and correctly nest the children
    commentList.forEach(comment => {
      if(comment.parentID !== 0) {
        const parent = commentMap[comment.parentID];
        // console.log(comment);

        parent.children = comment;
        //TODO
        // parent.children = (parent.children || []).push(comment);

      }
    })
    // filter the list to return a list of correctly nested comments
    return commentList.filter(comment => {
      return comment.parentID === 0;
    })
  }

  instantiateContract(e,f) {
    //e: new file has from form
    //f: id of parent
    console.log(this.testIfWav(e))
    console.log(e, "it works! ",f)


    const contract = require('truffle-contract')
    const sampleStorage = contract(SampleStorageContract)
    sampleStorage.setProvider(this.state.web3.currentProvider)
    console.log("calling instantiatecontract");

    // Declaring this for later so we can chain functions on SampleStorage.
    var sampleStorageInstance
    // convert input string to hex value
    let sentData = this.state.web3.utils.toHex(e)
    let parentID=f
    console.log(sentData);
    // Get accounts
    this.state.web3.eth.getAccounts((error, accounts) => {
      sampleStorage.deployed().then((instance) => {
        sampleStorageInstance = instance
        // calls createSample function on contract, mstores values in array
        return sampleStorageInstance.createSample(sentData, parentID, {from: accounts[0]})
      })
    })
  }

    getArrayLength() {
      // e.preventDefault()
      const contract = require('truffle-contract')
      const sampleStorage = contract(SampleStorageContract)
      sampleStorage.setProvider(this.state.web3.currentProvider)
      // Declaring this for later so we can chain functions on SampleStorage.
      var sampleStorageInstance
        sampleStorage.deployed().then((instance) => {
          sampleStorageInstance = instance
          // gets sample array length
          return sampleStorageInstance.getSampleCount.call()
        }).then((result) => {
          // Update state
          return this.setState({ listLength: result.c[0]})
        }).then( async(items) => {
          // loop through array stored in smart contract
          let array=[]
          for (let i = 0; i < this.state.listLength; i++) {
            const result = await sampleStorageInstance.getSample.call(i)
            // convert hex to ascii and append to array
            // console.log(result[1].c[0]);
            array.push({
              "fileHash": this.state.web3.utils.hexToAscii(result[0]),
              "fileID": result[1].c[0],
              "parentID": result[2].c[0]}
            )
            // console.log(array)
            this.setState({contractHashes: array})
          }
        })
    }

  render() {
    //map through soundFiles array, store list in hashList var
    let hashList2 = this.nestComments(this.state.soundFiles)
    console.log(hashList2);

    let hashList
    if (this.state.contractHashes) {
      hashList = this.state.contractHashes.map(item => {
        if (item.parentID!==0) {
          <div className="tab"><SoundFile fileHash={item.fileHash} fileID={item.fileID} parentID={item.parentID} fireContract={(e,f) => this.instantiateContract(e,f)}/></div>
        }
     return <SoundFile fileHash={item.fileHash} fileID={item.fileID} parentID={item.parentID} fireContract={(e,f) => this.instantiateContract(e,f)}/>
      })
    }


        // jsonSoundList.push({description:'helloagain_again',fileHash:'verylongfilehash'});
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">resample.space</a>
        </nav>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
            <h4> current number of elements: {this.state.listLength} </h4>
            <h1>Blockchain based sampling database</h1>
            {hashList}
            <p>listen to audio samples, remix and reply to sounds. <br />
            this project is an experiment to see what happens when pseudonymous users can share and remix sounds stored on a permissionless database.<br />
            keep in mind that all content shared here is public and immutable
            </p>
            <p><strong>line 59: </strong> {this.state.storageValue}</p>
              <Footer currentTrack={"Qmevt9AJLAJyBo8KtxiKJ8qGNNY57fJFJqVXkhPVXHZzPs"}/>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
