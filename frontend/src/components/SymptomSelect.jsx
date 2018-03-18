import React, { Component } from 'react';

class SymptomSelect extends Component {  
  state = {
    value: 1,
  }

  submitSymptom = (e) => {
    e.preventDefault();
    this.props.onSelectSymptom(this.state.value);
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div hidden={this.props.SelectedSymptomCollapsed}>
        <h3>Select a symptom you currently have:</h3>
        <form onSubmit={this.submitSymptom}>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value='1'>Symptom 1</option>
            <option value='2'>Symptom 2</option>
            <option value='3'>Symptom 3</option>
          </select>
          <input type="submit" value="Submit Symptom" />
        </form>
      </div>
    )
  }
}

export default SymptomSelect;
