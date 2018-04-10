import React, { Component } from 'react'

class SoundFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileHash: props.fileHash,
      parentHash: 'QmfaLOHlkhHkuhfd'

    }
  }

  handleClick(e) {
    alert(e)
  }

  render() {
    return (
    <div>
      <button className="pure-button-play" onClick={this.handleClick("play").bind()}>Play</button>
      <button className="pure-button-primary" onClick={this.handleClick("download").bind()}>download</button>
      <button className="pure-button-active">respond</button>
      <a href={"http://ipfs.io/ipfs/" + this.state.fileHash}>{this.state.fileHash}</a> <br />


    </div>
    );
  }
}

export default SoundFile
