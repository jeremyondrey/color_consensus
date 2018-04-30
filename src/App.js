import React, { Component } from 'react'
import SampleStorageContract from '../build/contracts/SampleStorage.json'
import getWeb3 from './utils/getWeb3'

//components
import SoundFile from './Components/SoundFile.js'
import SubmitForm from './Components/SubmitForm.js'
import Footer from './Components/Footer.js'

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
      currentColor:'383f51',
      isPlaying:null
    }
    // this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    this.setState({soundFiles: [{
      fileHash: "Qmeh3HjEy7UAP5teJgAQGV1dg4dSirL9e3CqhoheoAcWzZ",
      fileID: 1,
      color: '222222'
    },
    {
      fileHash: "QmNstz28c3DwLLdCBf5FcpiiMT6VVJYbp9QQrXBaKHmqS5",
      fileID: 2,
      color: 'FF2130'
    },
    {
      fileHash: "Qmbhsy22wk3GUjd3qhytaCCmAEasDK7petMmtwi2d39nYM",
      fileID: 3,
      color: '15f1ff'
    },
    {
      fileHash: "QmVeLFK63Un6VGrLsABg5VQ2QsVySqZVi9xog7S9wrC3er",
      fileID: 4,
      color: '4C334E'
    },
    {
      fileHash: "QmbsobVqoj2ijg3orycMAYYvjEiRkYpDAXdZZkqpNvjarz",
      fileID: 5,
      color: '11a1df'
    },
    {
      fileHash: "Qmaqaopby8Bqujh36foFe2khUZt6SN6JC3vLkf99qM6fiA",
      fileID: 6,
      color: 'ff1131'
    },
    {
      fileHash: "QmTqgETbRMyAFxYDpamuwoRbyUB1PF7zvbCYkWx9HEuCBi",
      fileID: 7,
      color: 'ff44ff'
    },
    {
      fileHash: "QmTQeR7H2miPP6sp5EuhgfhajfoLtPMgzWig8GBMGgzhZA",
      fileID: 8,
      color: 'a1dda1'
    },
    {
      fileHash: "QmXVtwVKQgcjAxM2eS46TVTPo9d1TKwGA23RwjifVh8Vrp",
      fileID: 9,
      color: 'dafa8a'
    },
    {
      fileHash: "QmXF99jf1NTzVBwUsjfnXtYxy9KEEncz6sS5dVowRs3deM",
      fileID: 10,
      color: 'aa3333'
    },
    {
      fileHash: "QmcmWwc27xHvJ41K8cyZK4WUFAdzwE9RwQXqbY5QNy9rkt",
      fileID: 11,
      color: 'e1afd1'
    },
    {
      fileHash: "QmZdCR79s335zAjS7kBGZG35FNms3EzA1HMxRbVxMNNASi",
      fileID: 12,
      color: '991163'
    },
    {
      fileHash: "QmXFsb8yyYPaEvZNT9nrKHdxNU6XTCt4dG89otGhr91Fb8",
      fileID: 13,
      color: 'BF1230'
    },
    {
      fileHash: "QmcBFmitKuezSMp6PrKm2LpvUdduZfDLcN8VntavCaZotc",
      fileID: 14,
      color: 'B32C2B'
    },
    {
      fileHash: "QmdzHsPAyfWPDLYvhq3uPGurL1vdCi8JotfzwxAS2jMLDm",
      fileID: 15,
      color: 'FF41a0'
    },
    {
      fileHash: "QmZ6EMc9bUNAXQzbcwM6yjqEyq36cynLDj44haRCDdqSpm",
      fileID: 16,
      color: '115f43'
    },
    {
      fileHash: "QmbLX4pCDz4DNeMwC47Wd1vhnjuUi9YqZRDD28FZk49iJd",
      fileID: 17,
      color: 'bbeebb'
    },
    {
      fileHash: "QmQT5c3toLfJZ8pAor6MekuBhphW7bHCxX9dvhyqrbqUM5",
      fileID: 18,
      color: '410F0F'
    },
    {
      fileHash: "QmNg7Xxkk1Ux8z13s9A8byt5A4LUq2vxndia4nU8yCkV78",
      fileID: 19,
      color: '7B1919'
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

  instantiateContract(e,c) {
    //e: new file hash from form
    //c: new color

    const contract = require('truffle-contract')
    const sampleStorage = contract(SampleStorageContract)
    sampleStorage.setProvider(this.state.web3.currentProvider)
    console.log("calling instantiatecontract");
    // Declaring this for later so we can chain functions on SampleStorage.
    var sampleStorageInstance
    let color = this.state.web3.utils.toHex(c)
    // Get accounts
    this.state.web3.eth.getAccounts((error, accounts) => {
      sampleStorage.deployed().then((instance) => {
        sampleStorageInstance = instance
        // calls createSample function on smart contract
        return sampleStorageInstance.createSample(this.state.web3.utils.toHex(e), color, {from: accounts[0]})
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
            "color": this.state.web3.utils.hexToAscii(result[2])})
          // console.log(array)
          this.setState({contractHashes: array})
        }
      })
  }

  //TODO
  toggleForm() {
    const currentState = this.state.showForm
    this.setState({ showForm: !currentState })
  }

  playSound(e,f){
    //e: hash
    //f: color
      this.setState({currentSound: e})
      this.setState({isPlaying: true})
      this.setState({currentColor: f})
  }

  //check if str is a color
  is_hexadecimal(str){
    let regexp = /^[0-9a-fA-F]+$/
    if (regexp.test(str)){
      return true
      }
      else {
      return false;
      }
}

  render() {
    let allFiles=this.state.contractHashes.map(item => {
      if (this.is_hexadecimal(item.color)==true){
      return <SoundFile key={item.fileID} fileHash={item.fileHash} fileID={item.fileID} color={item.color} fireContract={(e,f,c) => this.instantiateContract(e,f,c)} playSound={(e,f) => this.playSound(e,f)}/>
      }
  })

    // let url="https://ipfs.io/ipfs/" + this.state.currentSound
    let bgColor= "#" + this.state.currentColor
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
        <SubmitForm className="form" fireContract={(e,f,c) => this.instantiateContract(e,f,c)}/>
      <div className="flex-container" style={{backgroundColor: bgColor}} >
        {allFiles}
      </div>
        <Footer currentSound={this.state.currentSound} currentColor={this.state.currentColor} autoPlay={this.state.isPlaying}/>
    </div>
    );
  }
}

export default App
