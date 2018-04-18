import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import SubmitForm from './SubmitForm.js'

class SoundFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileHash: props.fileHash,
      parentHash: 'QmfaLOHlkhHkuhfd',
      showResponder: false
    }
    // binds this keyword to app context
    this.handleClick = this.handleClick.bind(this)
  }

  //set response state to true
  // toggles visibility of response form
   handleClick(e) {
     // alert("hey")
     this.setState({ showResponder: !this.state.showResponder })
   }

   passValue(e){
     //this works
     this.props.fireContract(e)
     // e.preventDefault()
   }

  render() {
    let url="https://ipfs.io/ipfs/" + this.props.fileHash
    // toggles label of respond button
    let respondButtonLabel=this.state.showResponder ? "close" : "respond"
    return (
      <div className="sound-element">{this.props.fileHash} <br/>
        <ReactAudioPlayer src={url} controls />
        <button className="pure-button-active" onClick={this.handleClick}>{respondButtonLabel}</button>
        {this.state.showResponder ? <SubmitForm parentHash={this.props.fileHash} fileHash={this.props.fileHash} passValue={(e) => this.passValue(e)}/> : null }
      </div>
    );
  }
}

export default SoundFile
