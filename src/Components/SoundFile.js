import React, { Component } from 'react'

//icons
import FaPlay from 'react-icons/lib/fa/play';
import FaPause from 'react-icons/lib/fa/pause';
import FaDl from 'react-icons/lib/fa/download';

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

  handleClick(e) {
    console.log("playing " + this.state.fileHash);
    // e.preventDefault();
    this.props.playSound(this.state.fileHash)
  }

  render() {
    let color="#" + this.props.color
    return (
      <div className="box" style={{backgroundColor: color}}>
        <h3 className="child-title">fileID: {this.props.fileID}</h3>
        <button onClick={this.handleClick}>
          <FaPlay />
        </button>
        <a href={"https://ipfs.io/ipfs/"+this.state.fileHash}>
          <FaDl />
        </a>
      </div>
    );
  }
}

export default SoundFile
