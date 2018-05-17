import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player'

//icon
import FaDl from 'react-icons/lib/fa/download';

class Footer extends Component {
  render() {
    let url="https://ipfs.io/ipfs/" + this.props.currentSound
    return (
      <div className="footer" style={{background: "#" + this.props.currentColor}}>
      {this.props.currentSound ? <ReactAudioPlayer className="audio" src={url} controls autoPlay={this.props.autoPlay}/>: null}
      {this.props.currentSound ? <mark><a className="dlbtn" href={url}><FaDl/></a></mark> : null}
    </div>
    )
  }
}

export default Footer
