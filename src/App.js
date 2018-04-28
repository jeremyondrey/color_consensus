import React, { Component } from 'react'
import SampleStorageContract from '../build/contracts/SampleStorage.json'
import getWeb3 from './utils/getWeb3'

//components
import SoundFile from './Components/SoundFile.js'
import SubmitForm from './Components/SubmitForm.js'
import Footer from './Components/Footer.js'
import ReactAudioPlayer from 'react-audio-player'

import AboutIcon from 'react-icons/lib/fa/info-circle'

import './css/oswald.css'
import './css/open-sans.css'
// import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listLength: null,
      web3: null,
      soundFiles: [],
      contractHashes: [],
      showForm:false,
      currentSound:'',
      isPlaying:null
    }
    // this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    this.setState({soundFiles: [{
      fileHash: "Qmctyojt2Rc7PbKbi3CM9zpoHR91qhNpgj6Jkq2Zi6VdfG",
      fileID: 0,
      category: 1,
      color: '44dd21'
    },
    {
      fileHash: "QmSnUCS7wRhkcJj97d8poXM9CvH45VGjUBnEUjLZW49BcH",
      fileID: 1,
      category: 2,
      color: '383f51'
    },
    {
      fileHash: "QmUhD25MRvghabeUxPxc7qBtzSnZvQn8DG2WgrbMkPRqRF",
      fileID: 2,
      category: 3,
      color: '991163'
    },
    {
      fileHash: "QmUhD25MRvghabeUxPxc7qBtzSnZvQn8DG2WgrbMkPRqRF",
      fileID: 3,
      category: 3,
      color: 'F381d3'
    },
    {
      fileHash: "QmUhD25MRvghabeUxPxc7qBtzSnZvQn8DG2WgrbMkPRqRF",
      fileID: 4,
      category: 3,
      color: '18a4b2'
    },
    {
      fileHash: "QmUhD25MRvghabeUxPxc7qBtzSnZvQn8DG2WgrbMkPRqRF",
      fileID: 5,
      category: 3,
      color: 'dd1143'
    },
    {
      fileHash: "QmUhD25MRvghabeUxPxc7qBtzSnZvQn8DG2WgrbMkPRqRF",
      fileID: 6,
      category: 3,
      color: '9fff63'
    },
    {
      fileHash: "QmUhD25MRvghabeUxPxc7qBtzSnZvQn8DG2WgrbMkPRqRF",
      fileID: 7,
      category: 3,
      color: 'ff44ff'
    },
    {
      fileHash: "Qmevt9AJLAJyBo8KtxiKJ8qGNNY57fJFJqVXkhPVXHZzPs",
      fileID: 8,
      category: 2,
      color: 'ddff14'
    },
    {
      fileHash: "Qmevt9AJLAJyBo8KtxiKJ8qGNNY57fJFJqVXkhPVXHZzPs",
      fileID: 9,
      category: 2,
      color: 'b6d014'
    },
    {
      fileHash: "Qmevt9AJLAJyBo8KtxiKJ8qGNNY57fJFJqVXkhPVXHZzPs",
      fileID: 10,
      category: 2,
      color: 'ddff14'
    },
    {
      fileHash: "QmSnUCS7wRhkcJj97d8poXM9CvH45VGjUBnEUjLZW49BcH",
      fileID: 11,
      category: 2,
      color: '383f51'
    },
    {
      fileHash: "QmUhD25MRvghabeUxPxc7qBtzSnZvQn8DG2WgrbMkPRqRF",
      fileID: 12,
      category: 3,
      color: '991163'
    },
    {
      fileHash: "QmUhD25MRvghabeUxPxc7qBtzSnZvQn8DG2WgrbMkPRqRF",
      fileID: 13,
      category: 3,
      color: 'F381d3'
    },
    {
      fileHash: "QmUhD25MRvghabeUxPxc7qBtzSnZvQn8DG2WgrbMkPRqRF",
      fileID: 14,
      category: 3,
      color: '18a4b2'
    },
    {
      fileHash: "QmUhD25MRvghabeUxPxc7qBtzSnZvQn8DG2WgrbMkPRqRF",
      fileID: 15,
      category: 3,
      color: 'dd1143'
    },
    {
      fileHash: "QmUhD25MRvghabeUxPxc7qBtzSnZvQn8DG2WgrbMkPRqRF",
      fileID: 16,
      category: 3,
      color: '9fff63'
    },
    {
      fileHash: "QmUhD25MRvghabeUxPxc7qBtzSnZvQn8DG2WgrbMkPRqRF",
      fileID: 17,
      category: 3,
      color: 'ff44ff'
    },
    {
      fileHash: "Qmevt9AJLAJyBo8KtxiKJ8qGNNY57fJFJqVXkhPVXHZzPs",
      fileID: 18,
      category: 2,
      color: 'ddff14'
    },
    {
      fileHash: "Qmevt9AJLAJyBo8KtxiKJ8qGNNY57fJFJqVXkhPVXHZzPs",
      fileID: 19,
      category: 2,
      color: 'b6d014'
    },
    {
      fileHash: "Qmevt9AJLAJyBo8KtxiKJ8qGNNY57fJFJqVXkhPVXHZzPs",
      fileID: 20,
      category: 2,
      color: 'ddff14'
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

    console.log(sentData);
    // Get accounts
    this.state.web3.eth.getAccounts((error, accounts) => {
      sampleStorage.deployed().then((instance) => {
        sampleStorageInstance = instance
        // calls createSample function on contract, mstores values in array
        return sampleStorageInstance.createSample(sentData, category, c, {from: accounts[0]})
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
          console.log(result);
          array.push({
            "fileHash": this.state.web3.utils.hexToAscii(result[0]),
            "fileID": result[1].c[0],
            "category": result[2].c[0],
            "color": this.state.web3.utils.hexToAscii(result[3])}
          )
          // console.log(array)
          // let sortedArray=this.nestComments(array)
          // console.log(sortedArray);
          this.setState({contractHashes: array})
        }
      })
  }

  //TODO
  toggleForm() {
    const currentState = this.state.showForm
    this.setState({ showForm: !currentState })
  }

  playSound(e){
      this.setState({currentSound: e})
      this.setState({isPlaying: true})
  }

  urlExists(hash){
    var http = new XMLHttpRequest();
    http.open('HEAD', "https://ipfs.io/ipfs/" + hash, false);
    http.send();
    return http.status!=404;
  }

  render() {
    let allFiles=this.state.soundFiles.map(item => <SoundFile className="flex-item" fileHash={item.fileHash} fileID={item.fileID} category={item.category} color={item.color} fireContract={(e,f,c) => this.instantiateContract(e,f,c)} playSound={(e) => this.playSound(e)}/>)
    let url="https://ipfs.io/ipfs/" + this.state.currentSound
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
    return (
    <div className="App">
      <div className="header">


        <div class="left">
          <b>color_consensus </b>
          <a target="_blank" href="http://lums.io/color_consensus"><AboutIcon/></a>
        </div>
        <div class="right">
          <SubmitForm className="form" fireContract={(e,f,c) => this.instantiateContract(e,f,c)}/>
        </div>


      </div>
        <div className="flex-container" >
          {allFiles}
        </div>
      <div className="footer">
        <Footer currentSound={this.state.currentSound} autoPlay={this.state.isPlaying}/>
      </div>
    </div>
    );
  }
}

export default App
