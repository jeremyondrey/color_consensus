import React, { Component } from 'react'

//icons
import FaPlay from 'react-icons/lib/fa/play'
import FaPause from 'react-icons/lib/fa/pause'

class SoundFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileHash: this.props.fileHash,
      fileID: this.props.fileID,
      color: "383F51"
    }
  }

  componentWillMount(){
    if (this.props.color){
      this.setState({color: this.props.color})
    }
  }

  handleClick(e) {
    console.log("playing " + this.state.fileHash);
    // e.preventDefault();
    this.props.playSound(this.state.fileHash,this.state.color)
  }

  render() {
    let color="#" + this.state.color
    return (
      <div className="flex-item" style={{backgroundColor: color}}>
        <button className="button" onClick={this.handleClick.bind(this)}>
          <FaPlay />
        </button>
      </div>
    );
  }
}

export default SoundFile
