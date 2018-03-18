import React, { Component } from 'react';

class DiagnosisSelect extends Component{
  state = {
    value: "",
  }

  submitSymptom = (e) => {
    e.preventDefault();
    // Increment selected diagnosis frequency
    this.props.onSelectedDiagnosis()
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div hidden={this.props.DiagnosisSelectCollapsed}>
        <h3>Select the diagnosis that most matchest your condition</h3>
        <form onSubmit={this.submitSymptom}>
          <select value={this.state.diagnosis} onChange={this.handleChange}>
          <option value='1'>Diagnosis 1</option>
          <option value='2'>Diagnosis 2</option>
          <option value='3'>Diagnosis 3</option>
          </select>
          <input type="submit" value="Submit Symptom" />
        </form>
      </div>
    )
  }
}

export default DiagnosisSelect;