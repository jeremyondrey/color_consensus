import React, { Component } from 'react'

class SubmitForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parentHash: props.parentHash,
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Replying with ' + this.state.value + '. Confirm that this hash is correct, then open Metamask and sign the transaction.');
    this.props.passValue(this.state.value)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <label>
            Response:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
    );
  }
}

export default SubmitForm
