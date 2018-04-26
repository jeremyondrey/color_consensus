import React, { Component } from 'react'
import SampleStorageContract from '../build/contracts/SampleStorage.json'
import getWeb3 from './utils/getWeb3'

//components
import SoundFile from './Components/SoundFile.js'
import SubmitForm from './Components/SubmitForm.js'
import Footer from './Components/Footer.js'

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
      contractHashes: [],
      showForm:false
    }
    // this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    this.setState({soundFiles: [{
      fileHash: "Qmctyojt2Rc7PbKbi3CM9zpoHR91qhNpgj6Jkq2Zi6VdfG",
      fileID: 0,
      category: 0,
      color: '383f51'
    },
    {
      fileHash: "QmSnUCS7wRhkcJj97d8poXM9CvH45VGjUBnEUjLZW49BcH",
      fileID: 1,
      category: 0,
      color: '383f51'
    },
    {
      fileHash: "QmUhD25MRvghabeUxPxc7qBtzSnZvQn8DG2WgrbMkPRqRF",
      fileID: 2,
      category: 0,
      color: '991163'
    },
    {
      fileHash: "Qmevt9AJLAJyBo8KtxiKJ8qGNNY57fJFJqVXkhPVXHZzPs",
      fileID: 3,
      category: 0,
      color: 'aaff44'
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


  instantiateContract(e,f,c) {
    //e: new file hash from form
    //f: category
    //c: color
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
    let category=f
    let color=this.state.web3.utils.toHex(c)
    console.log(sentData);
    // Get accounts
    this.state.web3.eth.getAccounts((error, accounts) => {
      sampleStorage.deployed().then((instance) => {
        sampleStorageInstance = instance
        // calls createSample function on contract, mstores values in array
        return sampleStorageInstance.createSample(sentData, category, color, {from: accounts[0]})
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
            "category": result[2].c[0],
            "color": this.state.web3.utils.hexToAscii(result[3].c[0])}
          )
          // console.log(array)
          // let sortedArray=this.nestComments(array)
          // console.log(sortedArray);
          this.setState({contractHashes: array})
        }
      })
  }

  toggleForm() {
    const currentState = this.state.showForm
    this.setState({ showForm: !currentState })
  }

  render() {
    // //map through soundFiles array, store list in hashList var
    // console.log(this.state.contractHashes);
    // let hashList
    // if (this.state.contractHashes) {
    //   hashList = this.state.contractHashes.map(item => {
    //     // return <SoundFile fileHash={item.fileHash} fileID={item.fileID} parentID={item.parentID} fireContract={(e,f) => this.instantiateContract(e,f)}/>
    //   })
    // }
    //
    let allFiles=this.state.soundFiles.map(item => <SoundFile className="box" fileHash={item.fileHash} fileID={item.fileID} category={item.category} color={item.color} fireContract={(e,f,c) => this.instantiateContract(e,f,c)}/>)
    // let category1=this.state.contractHashes.map(item => {
    //   if (item.category==1){
    //     return <SoundFile fileHash={item.fileHash} fileID={item.fileID} fireContract={(e,f,c) => this.instantiateContract(e,f,c)}/>
    //   }
    // })
    // let category2=this.state.contractHashes.map(item => {
    //   if (item.category==2) {
    //     return <SoundFile fileHash={item.fileHash} fileID={item.fileID} fireContract={(e,f,c) => this.instantiateContract(e,f,c)}/>
    //   }
    // })
    // let category3=this.state.contractHashes.map(item => {
    //   if (item.category==3) {
    //     return <SoundFile fileHash={item.fileHash} fileID={item.fileID} fireContract={(e,f,c) => this.instantiateContract(e,f,c)}/>
    //   }
    // })
    //
    // console.log(hashList);

    return (
    <div className="App">

      <div className="colorgrid" >
        {this.state.showForm ? <SubmitForm className="box" fireContract={(e,f,c) => this.instantiateContract(e,f,c)}/> : <button onClick={this.toggleForm()}>+</button>}
        {allFiles}
      </div>
      <Footer />
    </div>
    );
  }
}

export default App
