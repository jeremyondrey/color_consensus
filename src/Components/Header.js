import React, { Component } from 'react'
import { ChromePicker } from 'react-color';

import ColorIcon from 'react-icons/lib/md/colorize'
import Github from 'react-icons/lib/go/mark-github'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hash: '',
      color: this.props.color,
      displayColorPicker: false,
      showForm: false
    }
    this.hashUpdate = this.hashUpdate.bind(this);
    this.colorUpdate = this.colorUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.content !== nextProps.content) {
      this.setState({ color: this.props.color })
    }
  }

  pickColor = (e) => {
    e.preventDefault()
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  unfoldForm = (e) => {
    this.setState({ showForm: e })
  };

  hashUpdate(event) {
    this.setState({hash: event.target.value});
  }

  colorUpdate = (color) => {
    this.setState({ color: color.hex.substr(1) })
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.hash!=='' && this.state.hash.startsWith('Qm')) {
    let response = confirm("All hashes and colors are stored in an immutable blockchain. You are responsible for the content you upload. \nOpen Metamask to confirm. It may take a while for the transaction to appear on the network.");
      if (response===true){
      this.props.fireContract(this.state.hash, this.state.color)
      this.setState({color:"383f51"})
      }
    }
  }

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    let bgColor= "#" + this.state.color

    return (
      <div className="headergrid" style={{backgroundColor: bgColor}}>
        <span className="left">
          <b>color_consensus</b>
          {this.props.isRinkeby &&
            <form className="form" onSubmit={this.handleSubmit}>
              <label>
                <input type="text" value={this.state.hash} placeholder="paste IPFS hash" onChange={this.hashUpdate} />
              </label>
              <button onClick={ this.pickColor }><ColorIcon/></button>
              {this.state.displayColorPicker ? <div style={ popover }>
              <div style={ cover } onClick={ this.handleClose }/>
                <ChromePicker color={bgColor} onChangeComplete={this.colorUpdate} disableAlpha/>
              </div> : null }
              <input className="formButton" type="submit" value="submit"/>
            </form>
          }
        </span>
        {this.props.isRinkeby ?
        <span className="right">
          color_consensus aims to find a relationship between sound and color in a decentralized way.<h3><a target="_blank" href="http://lums.io/color_consensus">how it works</a></h3>
        </span>
        :<div><br/><br/></div>
        }
      </div>
    );
  }
}

export default Header
