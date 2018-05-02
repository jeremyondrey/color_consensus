import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player'

//icon
import FaDl from 'react-icons/lib/fa/download';

class Footer extends Component {
  render() {
    let url="https://ipfs.io/ipfs/" + this.props.currentSound
    return (
      <div className="footer">
      <ReactAudioPlayer className="audio" src={url} controls autoPlay={this.props.autoPlay}/>
      {this.props.currentSound ? <a href={url}><strong>color: #{this.props.currentColor}</strong></a> : null}
    </div>
    )
  }
}

export default Footer
