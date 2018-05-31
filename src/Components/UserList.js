import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player'

//icons
import FaDl from 'react-icons/lib/fa/download';
import InfoButton from 'react-icons/lib/fa/info-circle'

class UserList extends Component {
  render() {
    let url="https://ipfs.io/ipfs/" + this.props.currentSound
    return (
      <div className="footer" style={{background: "#" + this.props.currentColor}}>
      {this.props.currentSound ? <ReactAudioPlayer className="audio" src={url} controls autoPlay={this.props.autoPlay}/>: null}
    </div>
    )
  }
}

export default UserList
