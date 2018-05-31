import React, { Component } from 'react'
import SampleStorageContract from '../build/contracts/SampleStorage.json'
import getWeb3 from './utils/getWeb3'

//components
import SoundFile from './Components/SoundFile.js'
import Header from './Components/Header.js'
import Footer from './Components/Footer.js'

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
      currentID:'',
      currentColor:'383f51',
      isPlaying:null,
      isRinkeby:false,
      userAccount:null,
      userFiles: []
    }
    // this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
      })

      // Instantiate contract once web3 provided.
      // this.instantiateContract()
      this.loadSamples()
      this.state.web3.eth.getAccounts().then(res => {
        this.setState({userAccount: res})
      })
      this.state.web3.eth.net.getNetworkType()
      .then(network => {
        if (network==='rinkeby') {
          this.setState({isRinkeby:true})
          //returns null
          // this.state.web3.eth.getAccounts(accounts => console.log(accounts[0]))
        }
      })

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
    // console.log("calling instantiatecontract");
    // Declaring this for later so we can chain functions on SampleStorage.
    var sampleStorageInstance
    // Get accounts
    this.state.web3.eth.getAccounts((error, accounts) => {
      sampleStorage.deployed().then((instance) => {
        sampleStorageInstance = instance
        // calls createSample function on smart contract
        return sampleStorageInstance.createSample(this.state.web3.utils.toHex(e), this.state.web3.utils.toHex(c), {from: accounts[0]})
      })
    })
  }

  loadSamples() {
    // e.preventDefault()
    const contract = require('truffle-contract')
    const sampleStorage = contract(SampleStorageContract)
sampleStorage.setProvider(this.state.web3.currentProvider)
    // Declaring this for later so we can chain functions on SampleStorage.
    var sampleStorageInstance
      sampleStorage.deployed().then((instance) => {
        sampleStorageInstance = instance
        // gets sample array length
        return sampleStorageInstance.getSampleCount()
      }).then((result) => {
        // Update state with length of list
        return this.setState({ listLength: result.c[0]})
      }).then( async(items) => {
        // loop through array stored in smart contract
        let array=[]
        for (let i = this.state.listLength - 1; i > 0 ; i--) {
          const result = await sampleStorageInstance.getSample(i)
          // convert hex to ascii and append to array
          console.log(result)
          array.push({
            "fileHash": this.state.web3.utils.hexToAscii(result[0]),
            "fileID": result[1].c[0],
            "color": this.state.web3.utils.hexToAscii(result[2]),
            //address not working yet for some unknown reason
            "uploader": result[3]})
          // console.log(array)
          this.setState({contractHashes: array})
        }
      })
}

// getSortedRandom(e) {
//   //e: id for sorting type
//   // e.preventDefault()
//   const contract = require('truffle-contract')
//   const sampleStorage = contract(SampleStorageContract)
// sampleStorage.setProvider(this.state.web3.currentProvider)
//   // Declaring this for later so we can chain functions on SampleStorage.
//   var sampleStorageInstance
//     sampleStorage.deployed().then((instance) => {
//       sampleStorageInstance = instance
//       // gets sample array length
//       return sampleStorageInstance.getSampleCount()
//     }).then((result) => {
//       // Update state
//       return this.setState({ listLength: result.c[0]})
//     }).then( async(items) => {
//       // loop through array stored in smart contract
//       let array=[]
//
//       for (let i = 0; i < this.state.listLength; i++) {
//         const result = await sampleStorageInstance.getSample(i)
//
//         // convert hex to ascii and append to array
//         array.push({
//           "fileHash": this.state.web3.utils.hexToAscii(result[0]),
//           "fileID": result[1].c[0],
//           "color": this.state.web3.utils.hexToAscii(result[2]),
//           "uploader": result[3]})
//         // console.log(array)
//         this.setState({contractHashes: array})
//       }
//     })
// }

  //TODO
  toggleForm() {
    const currentState = this.state.showForm
    this.setState({ showForm: !currentState })
  }

  playSound(e,f,g){
    //e: hash
    //f: color
    //g: id
      this.setState({currentSound: e})
      this.setState({isPlaying: true})
      this.setState({currentColor: f})
      this.setState({currentID: g})
  }

  //check if str is a color
  is_hexadecimal(str){
    // console.log(str);
    let regexp = /^[0-9a-fA-F]+$/
    if (regexp.test(str)){
      return true
      }
      else {
      return false;
      }
}

rgb2hsv () {
  var rr, gg, bb,
  r = arguments[0] / 255,
  g = arguments[1] / 255,
  b = arguments[2] / 255,
  h, s,
  v = Math.max(r, g, b),
  diff = v - Math.min(r, g, b),
  diffc = function(c){
    return (v - c) / 6 / diff + 1 / 2;
  };

  if (diff === 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(r);
    gg = diffc(g);
    bb = diffc(b);

    if (r === v) {
      h = bb - gg;
    }else if (g === v) {
      h = (1 / 3) + rr - bb;
    }else if (b === v) {
      h = (2 / 3) + gg - rr;
    }
    if (h < 0) {
      h += 1;
    }else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
}

flipOrder(){
  this.state.contractHashes.reverse()
}

  render() {
    // let itemsToIterate = this.state.contractHashes.slice(0).reverse();
    let allFiles=this.state.contractHashes.map(item => {
      if (this.is_hexadecimal(item.color)===true){
        //this should work, but it doesn't so right now i'm hiding broken files manually, which sucks

          if (item.fileID!==21) {
            if (item.fileID!==22) {
              return <SoundFile
                key={item.fileHash}
                currentID={this.state.currentID}
                fileHash={item.fileHash}
                fileID={item.fileID}
                color={item.color}
                uploader={item.uploader}
                playSound={(e,f,g) => this.playSound(e,f,g)}/>
            }
          }

      }

    })


// let userFiles=this.state.contractHashes.map(item => {
//       if (this.state.web3.eth.accounts[0]===item.uploader){
//       return <SoundFile key={item.fileID} fileHash={item.fileHash} fileID={item.fileID} color={item.color} fireContract={(e,f,c) => this.instantiateContract(e,f,c)} playSound={(e,f,g) => this.playSound(e,f,g)}/>
//       }
//   })

    // let bgColor= "#" + this.state.currentColor
    return (
    <div className="App">
    {this.state.isRinkeby?
      <div>
        <Header className="form" color={this.state.currentColor} fireContract={(e,f,c)=>this.instantiateContract(e,f,c)}/>

        <div className="flex-container">
          {allFiles}
        </div>

        <Footer currentSound={this.state.currentSound} currentColor={this.state.currentColor} autoPlay={this.state.isPlaying}/>
      </div>
      : <div className="header">make sure metamask is installed and set to rinkeby network. more info <a target="_blank" href="http://lums.io/color_consensus">here</a></div>}
    </div>
    );
  }
}

export default App
