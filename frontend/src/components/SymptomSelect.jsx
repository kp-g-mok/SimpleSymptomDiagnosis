import React, { Component } from 'react';
import {connect} from 'react-redux';
import {symptoms} from '../actions';

class SymptomSelect extends Component {  
  state = {
    value: 1,
  }

  componentDidMount() {
      this.props.fecthSymptoms();
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
            {this.props.symptoms.map(symptom => (                
                <option value={symptom.id}>{symptom.name}</option>
            ))}
          </select>
          <input type="submit" value="Submit Symptom" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    symptoms: state.symptoms,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fecthSymptoms: () => {
      dispatch(symptoms.fecthSymptoms());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SymptomSelect);
