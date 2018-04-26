import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player'

class SoundFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileHash: this.props.fileHash,
      fileID: this.props.fileID,
      category: this.props.category,
      color: this.props.color
    }
  }

  render() {
    let url="https://ipfs.io/ipfs/" + this.props.fileHash
    let color="#" + this.props.color
    return (
      <div className="box" style={{backgroundColor: color}}>
        <h3 className="child-title">fileID: {this.props.fileID}, color: {this.props.color}</h3>
      </div>
    );
  }
}

export default SoundFile
