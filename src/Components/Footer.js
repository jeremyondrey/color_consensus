import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player'

//icon
import FaDl from 'react-icons/lib/fa/download';

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTrack: props.currentTrack,
    }
  }
  render() {
    let url="https://ipfs.io/ipfs/" + this.props.currentTrack
    return (
      <div className="footer">
      <ReactAudioPlayer src={url} controls />
      <br/>
      <h5>color_consensus - <a href="http://lums.io/color_consensus">read more</a></h5>
      </div>
    )
  }
}

export default Footer
