import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player'

class SoundFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileHash: props.fileHash,
      parentHash: 'QmfaLOHlkhHkuhfd'

    }
  }

   handleClick() {
     alert("hey")
   }
  // <button className="pure-button-primary" onClick={this.handleClick("download").bind()}>download</button>

  //<a href={"http://ipfs.io/ipfs/" + this.state.fileHash}>{this.state.fileHash}</a> <br />

  render() {
    let url="https://ipfs.io/ipfs/" + this.props.fileHash
    return (
    <div className="sound-element">
      <ReactAudioPlayer src={url} controls />
      <button className="pure-button-active" onClick={this.handleClick.bind()}>respond</button>
    </div>
    );
  }
}

export default SoundFile
