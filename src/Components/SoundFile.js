import React, { Component } from 'react'

//icons
//import FaPlay from 'react-icons/lib/fa/play'
import FlipMove from 'react-flip-move'

class SoundFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileHash: this.props.fileHash,
      color: "383F51"
    }
  }

  componentWillMount(){
    if (this.props.color){
      this.setState({color: this.props.color})
    }
  }

  handleClick(e) {
    console.log("playing id " + this.props.fileID + "\nfile " + this.state.fileHash + "\nfrom " + this.props.uploader)
    // e.preventDefault();
    this.props.playSound(this.state.fileHash,this.state.color,this.props.fileID)
  }

  urlExists(hash){
    var http = new XMLHttpRequest();
    http.open('HEAD', "https://ipfs.io/ipfs/" + hash, false);
    http.send();
    return http.status!==404;
  }

  render() {
    // <button onClick={() => {this.props.addToCollection(this.props.fileID)}}>{this.props.inCrate}</button>
    let color="#" + this.state.color
    return (
      <div className="sqr-text">
      <div className={
          this.props.fileID===this.props.currentID?"isplaying":"flex-item"}
          style={{backgroundColor: color}}
          onClick={this.handleClick.bind(this)}>
          
      </div>
      </div>
    );
  }
}

export default SoundFile
