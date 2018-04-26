import React, { Component } from 'react'
// import ColorPicker from '../utils/jscolor.js'

class SubmitForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hash: '',
      category: '1',
      color:"383f51"
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
    this.setState({category: event.target.value})
  }
  colorUpdate(event){
    this.setState({color: event.target.value})
  }

  handleSubmit(event) {
    alert(this.state.hash + ' ' + this.state.category + ' ' + this.state.color + ' Confirm that this is correct, then open Metamask and sign the transaction. Note that inputting anything other than a hash linking to a sound file will show up as a comment instead.');
    event.preventDefault();
    this.props.fireContract(this.state.hashValue, this.state.category, this.state.color)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{backgroundColor: "#222222"}}>
          <label>

            <input type="text" value={this.state.hash} onChange={this.hashUpdate} />
          </label>
          <select value={this.state.category} onChange={this.categoryUpdate}>
            <option>Sample</option>
            <option>Loop</option>
            <option>Track</option>
          </select>
          <br/>
          <input className="jscolor {width:101, padding:0, shadow:false,
    borderWidth:0, backgroundColor:'transparent', insetColor:'#000'}" value={this.state.color} onchange={this.colorUpdate} />
          <input type="submit" value="Submit"/>
        </form>

    );
  }
}

export default SubmitForm
