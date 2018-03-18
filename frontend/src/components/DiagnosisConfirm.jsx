import React, { Component } from 'react';


class DiagnosisConfirm extends Component{
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
        <h3>Do you have ~test diagnosis~?</h3>
        <button onClick={this.diagnosisCorrect}>Yes</button>
        <button onClick={this.diagnosisWrong}>No</button>
      </div>
    )
  }
}

export default DiagnosisConfirm;
