import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player'

//icons
import FaDl from 'react-icons/lib/fa/download';
import AddBtn from 'react-icons/lib/md/add-box';
import InfoButton from 'react-icons/lib/fa/info-circle'

class Footer extends Component {

addToCollection(e,f,g){
  if (e !== "") {
    let newItem ={
      key: e,
      fileID: e,
      color:f,
      uploader: g
    }
    console.log(newItem);
  }
}

  render() {
    let url="https://ipfs.io/ipfs/" + this.props.currentSound
    return (
      <div className="footer" style={{background: "#" + this.props.currentColor}}>
        {this.props.currentSound ? <ReactAudioPlayer className="audio" src={url} controls controlsList="nodownload" autoPlay={this.props.autoPlay}/>: null}
        {this.props.currentSound ? <mark><a className="dlbtn" href={url}><FaDl/></a></mark> : null}
    </div>
    )
  }
}

export default Footer
