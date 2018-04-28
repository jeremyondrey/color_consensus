import React, { Component } from 'react'

//icons
import FaPlay from 'react-icons/lib/fa/play'
import FaPause from 'react-icons/lib/fa/pause'
import FaDl from 'react-icons/lib/fa/download'
import Cat1 from 'react-icons/lib/fa/circle-o-notch'
import Cat2 from 'react-icons/lib/fa/th'
import Cat3 from 'react-icons/lib/fa/'

class SoundFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileHash: this.props.fileHash,
      fileID: this.props.fileID,
      category: this.props.category,
      categoryTag: '<Cat1/>',
      color: this.props.color
    }
  }

  handleClick(e) {
    console.log("playing " + this.state.fileHash);
    // e.preventDefault();
    this.props.playSound(this.state.fileHash)
  }




  render() {
    let categories=["<Cat1/>","<Cat2/>","<Cat3/>"]
    let categoryIcon=categories[this.state.category]

    let color="#" + this.props.color
    return (
      <div className="box" style={{backgroundColor: color}}>
        <button onClick={this.handleClick.bind(this)}>
          <FaPlay />
        </button>
        <button>
          <a href={"https://ipfs.io/ipfs/"+this.state.fileHash}>
            <FaDl />
          </a>
        </button>
        {this.state.categoryTag}
      </div>
    );
  }
}

export default SoundFile
