import React, { Component } from 'react'
import SampleStorageContract from '../build/contracts/SampleStorage.json'
import getWeb3 from './utils/getWeb3'
import ReactAudioPlayer from 'react-audio-player'

//components
import SoundFile from './Components/SoundFile.js'

//local json database
import jsonSoundList from './jsonSoundList.json'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: "hello",
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const sampleStorage = contract(SampleStorageContract)
    sampleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SampleStorage.
    var sampleStorageInstance
    let sentData = "Qmctyojt2Rc7PbKbi3CM9zpoHR91qhNpgj6Jkq2Zi6VdfG"

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      sampleStorage.deployed().then((instance) => {
        sampleStorageInstance = instance

        // Stores a given value, 5 by default.
        return sampleStorageInstance.set(sentData, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return sampleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result})
      })
    })
  }

  render() {
    let fileHash1="Qmctyojt2Rc7PbKbi3CM9zpoHR91qhNpgj6Jkq2Zi6VdfG"
    let fileHash2="QmSnUCS7wRhkcJj97d8poXM9CvH45VGjUBnEUjLZW49BcH"
    let fileHash3="Qmevt9AJLAJyBo8KtxiKJ8qGNNY57fJFJqVXkhPVXHZzPs"
    // jsonSoundList.push({description:'helloagain_again',fileHash:'verylongfilehash'});
    console.log(jsonSoundList.description);
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">resample.space</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
            <h1>Blockchain based sampling database</h1>
            <p>listen to audio samples, remix and reply to sounds. <br /> this project is an experiment to see what happens when pseudonymous users can share and remix sounds stored on a permissionless database.</p>
            <SoundFile fileHash={fileHash1}/>
            <div className="tab"><SoundFile fileHash={fileHash2}/></div>
            <div className="tab"><div className="tab"><SoundFile fileHash={fileHash3}/> </div></div>
            <SoundFile fileHash={fileHash1}/>
            <div className="tab"><SoundFile fileHash={fileHash2}/></div>
            <SoundFile fileHash={fileHash1}/>
              <p><strong>line 59: </strong> {this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
