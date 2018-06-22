import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import ipfs from '../Components/ipfs.js'
import ReactLoading from 'react-loading'

import ColorIcon from 'react-icons/lib/md/colorize'
import Github from 'react-icons/lib/go/mark-github'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading:false,
      ipfsHash:null,
      buffer:'',
      hash: '',
      color: this.props.color,
      displayColorPicker: false,
      showForm: false
    }
    this.hashUpdate = this.hashUpdate.bind(this);
    this.colorUpdate = this.colorUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.content !== nextProps.content) {
      this.setState({ color: this.props.color })
    }
  }

  captureFile=(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file=event.target.files[0]
        let reader=new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
        this.setState({isLoading:true})
}

convertToBuffer=async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer=await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer})
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
                console.log(err,ipfsHash);
                //setState by setting ipfsHash to ipfsHash[0].hash
        this.setState({ ipfsHash:ipfsHash[0].hash, isLoading:false })
        })
}

  pickColor = (e) => {
    e.preventDefault()
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  unfoldForm = (e) => {
    this.setState({ showForm: e })
  };

  hashUpdate(event) {
    this.setState({hash: event.target.value});
  }

  colorUpdate = (color) => {
    this.setState({ color: color.hex.substr(1) })
  };

  handleSubmit(event) {

    event.preventDefault();
    if (this.state.ipfsHash!=='' && this.state.ipfsHash.startsWith('Qm')) {
    let response = confirm("All hashes and colors are stored in an immutable blockchain. You are responsible for the content you upload. \nOpen Metamask to confirm. It may take a while for the transaction to appear on the network.");
      if (response===true){
      this.props.fireContract(this.state.ipfsHash, this.state.color)
      this.setState({
        color:"383f51",
        ipfsHash:""})
      }
    }
  }

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    let bgColor= "#" + this.state.color

    return (
      <div className="headergrid" style={{backgroundColor: bgColor}}>
        <span className="left">
          <b>color_consensus</b>
          {this.props.isRinkeby &&
            <form className="form" onSubmit={this.handleSubmit}>
              <input className="browseButton"
                type="file"
                accept=".wav"
                onChange={this.captureFile}
              />
              <button onClick={ this.pickColor }><ColorIcon/></button>
              {this.state.displayColorPicker ? <div style={ popover }>
              <div style={ cover } onClick={ this.handleClose }/>
                <ChromePicker color={bgColor} onChangeComplete={this.colorUpdate} disableAlpha/>
              </div> : null }
              {this.state.ipfsHash?
              <input className="submitButton" type="submit" value="submit"/>
              :null}
              {this.state.isLoading?
              <div>Uploading to IPFS node, please decide on a matching color while you wait<ReactLoading type={"bubbles"}/></div>
              :null}
          </form>
          }
        </span>
        {this.props.isRinkeby ?
        <span className="right">
          color_consensus aims to find a relationship between sound and color in a decentralized way.<h3><a target="_blank" href="http://lums.io/color_consensus">how it works</a></h3>
        </span>
        :<div><br/><br/></div>
        }
      </div>
    );
  }
}

export default Header
