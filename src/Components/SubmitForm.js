import React, { Component } from 'react'

class SubmitForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parentHash: props.parentHash,
      responseHash: null,
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

   // handleClick(e) {
   //   // e.preventDefault()
   //  alert("the clicked hash is " + this.props.parentHash)
   //
   //  // this.setState({ showResponder: true });
   // }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <label>
            Response: 
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
    );
  }
}

export default SubmitForm
