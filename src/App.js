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
      web3: null,
      soundFiles: []
    }

  }

  componentWillMount() {
    this.setState({soundFiles: [{
      fileHash: "Qmctyojt2Rc7PbKbi3CM9zpoHR91qhNpgj6Jkq2Zi6VdfG",
      parentHash: "Qmctyojt2Rc7PbKbi3CM9zpoHR91qhNpgj6Jkq2Zi6VdfG"
    },
    {
      fileHash: "QmSnUCS7wRhkcJj97d8poXM9CvH45VGjUBnEUjLZW49BcH",
      parentHash: "Qmctyojt2Rc7PbKbi3CM9zpoHR91qhNpgj6Jkq2Zi6VdfG"
    },
    {
      fileHash: "Qmevt9AJLAJyBo8KtxiKJ8qGNNY57fJFJqVXkhPVXHZzPs",
      parentHash: "Qmctyojt2Rc7PbKbi3CM9zpoHR91qhNpgj6Jkq2Zi6VdfG"
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
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract(e) {
    console.log(e, "it works!");
    // e.preventDefault()
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const sampleStorage = contract(SampleStorageContract)
    sampleStorage.setProvider(this.state.web3.currentProvider)
    console.log("calling instantiatecontract");

    // Declaring this for later so we can chain functions on SampleStorage.
    var sampleStorageInstance
    // convert input string to hex value
    let sentData = this.state.web3.utils.toHex(e)
    let parentID=4;
    console.log(sentData);
    // Get accounts
    this.state.web3.eth.getAccounts((error, accounts) => {
      sampleStorage.deployed().then((instance) => {
        sampleStorageInstance = instance

        // calls createSample function on contract, mstores values in array
        return sampleStorageInstance.createSample(sentData, parentID, {from: accounts[0]})
      }).then((result, res2, res3) => {
        // Get the value from the contract to prove it worked.
        return console.log(sampleStorageInstance.getSample.call(2, accounts[0]))
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result})
      })
    })
  }


  render() {
    //map through soundFiles array, store list in hashList var


    let hashList
    if (this.state.soundFiles) {
      hashList = this.state.soundFiles.map(item => {
        return <SoundFile fileHash={item.fileHash} parentHash={item.parentHash} fireContract={(e) => this.instantiateContract(e)}/>
      })
    }

    let fileHash1="Qmctyojt2Rc7PbKbi3CM9zpoHR91qhNpgj6Jkq2Zi6VdfG"
    let fileHash2="QmSnUCS7wRhkcJj97d8poXM9CvH45VGjUBnEUjLZW49BcH"
    let fileHash3="Qmevt9AJLAJyBo8KtxiKJ8qGNNY57fJFJqVXkhPVXHZzPs"
    // jsonSoundList.push({description:'helloagain_again',fileHash:'verylongfilehash'});
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">resample.space</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
            <h1>Blockchain based sampling database</h1>
            {hashList}
            <p>listen to audio samples, remix and reply to sounds. <br />
            this project is an experiment to see what happens when pseudonymous users can share and remix sounds stored on a permissionless database.</p>
            <SoundFile fileHash={fileHash1} fireContract={(e) => this.instantiateContract(e)}/>
            <div className="tab"><SoundFile fileHash={fileHash2}/></div>
            <div className="tab"><div className="tab"><SoundFile fileHash={fileHash3}/> </div></div>
            <SoundFile fileHash={fileHash1} fireContract={(e) => this.instantiateContract(e)}/>
            <div className="tab"><SoundFile fileHash={fileHash2}/></div>
            <SoundFile fileHash={fileHash1} fireContract={(e) => this.instantiateContract(e)}/>
              <p><strong>line 59: </strong> {this.state.storageValue}</p>
              <Footer currentTrack={fileHash1}/>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
