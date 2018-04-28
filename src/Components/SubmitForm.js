import React, { Component } from 'react'
import ColorPicker from 'react-simple-colorpicker';

class SubmitForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hash: '',
      color:"FFFFFF"
    }
    this.hashUpdate = this.hashUpdate.bind(this);
    this.colorUpdate = this.colorUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hashUpdate(event) {
    this.setState({hash: event.target.value});
  }
  colorUpdate(event){
    console.log(event)
    this.setState({color: event.target.value})
  }

  handleSubmit(event) {
    alert(this.state.hash + ' ' + this.state.color + ' Confirm that this is correct, then open Metamask and sign the transaction. Note that inputting anything other than a hash linking to a sound file will not show up.');
    event.preventDefault();
    this.props.fireContract(this.state.hash, this.state.color)
  }

  render() {
    let bgColor= "#" + this.state.color
    return (
      <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" value={this.state.hash} placeholder="paste IPFS hash" onChange={this.hashUpdate} />
            <input type="text" value={this.state.color} onChange={this.colorUpdate} maxLength="6" style={{backgroundColor: bgColor}}/>
          </label>
          <br/>
          <input type="submit" value="Submit"/>
        </form>

    );
  }
}

export default SubmitForm
