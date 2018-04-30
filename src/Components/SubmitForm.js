import React, { Component } from 'react'
import { ChromePicker } from 'react-color';

class SubmitForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hash: '',
      color:"383f51",
      displayColorPicker: false,
    }
    this.hashUpdate = this.hashUpdate.bind(this);
    this.colorUpdate = this.colorUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  pickColor = (e) => {
    e.preventDefault()
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };


  hashUpdate(event) {
    this.setState({hash: event.target.value});
  }

  colorUpdate = (color) => {
    this.setState({ color: color.hex.substr(1) })
  };

  handleSubmit(event) {
    alert(this.state.hash + ' ' + this.state.color + ' Confirm that this is correct, then open Metamask and sign the transaction. Note that inputting anything other than a hash linking to a sound file will not show up.');
    event.preventDefault();
    this.props.fireContract(this.state.hash, this.state.color)
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
      <form className="form" onSubmit={this.handleSubmit}>
          <label>
            <input type="text" value={this.state.hash} placeholder="paste IPFS hash" onChange={this.hashUpdate} />
          </label>
              <button onClick={ this.pickColor }>Pick Color</button>
          { this.state.displayColorPicker ? <div style={ popover }>
            <div style={ cover } onClick={ this.handleClose }/>
            <ChromePicker color={bgColor} onChangeComplete={this.colorUpdate} disableAlpha/>
          </div> : null }
          <input type="submit" value="Submit"/>
        </form>
      </span>
      <span className="right">
        <p><mark>color_consensus aims to find a relationship between sound and color in a decentralized way. anyone can upload audio and match it with a color to participate. read more about it <a target="_blank" href="http://lums.io/color_consensus">here</a></mark></p>
      </span>
    </div>
    );
  }
}

export default SubmitForm
