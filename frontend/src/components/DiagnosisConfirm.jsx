import React, { Component } from 'react';
import {connect} from 'react-redux';
import {diagnosis} from '../actions';


class DiagnosisConfirm extends Component{  
    componentWillReceiveProps(nextProp) {
        console.log(this.props.SelectedSymptom);
        this.props.fetchMostFreqDiag(this.props.SelectedSymptom);
    }

  diagnosisCorrect = (e) => {
    e.preventDefault();
    // Increment selected diagnosis frequency
    this.props.onConfirmDiagnosis()
  }
  
  diagnosisWrong = (e) => {
    e.preventDefault();
    this.props.onNotConfirmDiagnosis()
  }

  render() {
    return (
      <div hidden={this.props.DiagnosisConfirmCollapsed}>
        <h3>Do you have {this.props.diagnosis.name}</h3>
        <button onClick={this.diagnosisCorrect}>Yes</button>
        <button onClick={this.diagnosisWrong}>No</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        diagnosis: state.diagnosis,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        fetchMostFreqDiag: (symptom) => {
        dispatch(diagnosis.fetchMostFreqDiag(symptom));
      },
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(DiagnosisConfirm);
  