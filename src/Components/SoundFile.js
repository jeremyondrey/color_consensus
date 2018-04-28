import React, { Component } from 'react'

//icons
import FaPlay from 'react-icons/lib/fa/play'
import FaPause from 'react-icons/lib/fa/pause'
import Cat1 from 'react-icons/lib/fa/circle-o-notch'
import Cat2 from 'react-icons/lib/fa/th'
import Cat3 from 'react-icons/lib/fa/'

class SoundFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileHash: this.props.fileHash,
      fileID: this.props.fileID,
      color: this.props.color
    }
  }

  handleClick(e) {
    console.log("playing " + this.state.fileHash);
    // e.preventDefault();
    this.props.playSound(this.state.fileHash,this.state.color)
  }

  returnIcon(e){
    if (e==1) {
      return <Cat1/>
    }else if (e==2) {
      return <Cat2/>
    }else if (e==3){
      return <Cat3/>
    }
  }


  render() {

    let color="#" + this.props.color
    return (
      <div className="box" style={{backgroundColor: color}}>
        <button className ="button" onClick={this.handleClick.bind(this)}>
          <FaPlay />
        </button>
      </div>
    );
  }
}

export default SoundFile
