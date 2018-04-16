import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTrack: props.currentTrack,
    }
  }

  render() {
    return (
      <div className="footer">
      <ReactAudioPlayer src={this.state.currentTrack} controls />
      </div>
    )
  }
}

export default Footer
