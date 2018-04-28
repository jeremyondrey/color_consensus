import React, { Component } from 'react'
import ColorPicker from 'react-simple-colorpicker';

class SubmitForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hash: 'paste hash here',
      category: '1',
      color:"FFFFFF"
    }
    this.hashUpdate = this.hashUpdate.bind(this);
    this.categoryUpdate = this.categoryUpdate.bind(this);
    this.colorUpdate = this.colorUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hashUpdate(event) {
    this.setState({hash: event.target.value});
  }
  categoryUpdate(event){
    // if (event=="Sound")this.setState({category: 1})
    // if (event=="Loop")this.setState({category: 2})
    // if (event=="Track")this.setState({category: 3})
  }
  colorUpdate(event){
    console.log(event)
    this.setState({color: event.target.value})
  }

  handleSubmit(event) {
    alert(this.state.hash + ' ' + this.state.category + ' ' + this.state.color + ' Confirm that this is correct, then open Metamask and sign the transaction. Note that inputting anything other than a hash linking to a sound file will not show up.');
    event.preventDefault();
    this.props.fireContract(this.state.hash, this.state.category, this.state.color)
  }

  render() {
    let bgColor= "#" + this.state.color
    return (
      <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" value={this.state.hash} onChange={this.hashUpdate} /> <br/>
            <input type="text" value={this.state.color} onChange={this.colorUpdate} maxLength="6" style={{backgroundColor: bgColor}}/>
          </label>
          <select value={this.state.category} onChange={this.categoryUpdate}>
            <option>Sample</option>
            <option>Loop</option>
            <option>Track</option>
          </select>
          <br/>
          <input type="submit" value="Submit"/>
        </form>

    );
  }
}

export default SubmitForm
