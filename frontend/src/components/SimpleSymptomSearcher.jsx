import React, { Component } from 'react';

import SymptomSelect from './SymptomSelect';
import DiagnosisConfirm from './DiagnosisConfirm';
import DiagnosisSelect from './DiagnosisSelect';
import DiagnosisReport from './DiagnosisReport';

class SimpleSymptomSearcher extends Component {
    state = {
        SelectedSymptomCollapsed: false,
        DiagnosisConfirmCollapsed: true,
        DiagnosisSelectCollapsed: true,
        DiagnosisReportCollapsed: true,
        SelectedSymptom: '',
    };

    resetForm(){
        this.setState({
            SelectedSymptomCollapsed: false,
            DiagnosisConfirmCollapsed: true,
            DiagnosisSelectCollapsed: true,
            DiagnosisReportCollapsed: true,
            SelectedSymptom: '',
        });
    }

    onSelectSymptom = (symptom) => {
        this.setState({
            SelectedSymptomCollapsed: true,
            DiagnosisConfirmCollapsed: false,
            SelectedSymptom: symptom,
        });
    }
    onConfirmDiagnosis = (diagnosis) => {
        this.setState({
            DiagnosisConfirmCollapsed: true,
            DiagnosisReportCollapsed: false,
        });
    }
    onNotConfirmDiagnosis = () => {
        this.setState({
            DiagnosisConfirmCollapsed: true,
            DiagnosisSelectCollapsed: false,
        });
    }
    onSelectedDiagnosis = () => {
        this.setState({
            DiagnosisSelectCollapsed: true,
            DiagnosisReportCollapsed: false,
        });
    }

    render() {
        return (
            <div>
                <h2>Welcome to the Simple Symptom Diagnosis!</h2>
                <button onClick={() => this.resetForm()}>Start Over</button>
                <SymptomSelect
                    onSelectSymptom={this.onSelectSymptom.bind(this)}
                    SelectedSymptomCollapsed={this.state.SelectedSymptomCollapsed}
                />
                <DiagnosisConfirm
                    onConfirmDiagnosis={this.onConfirmDiagnosis.bind(this)}
                    onNotConfirmDiagnosis={this.onNotConfirmDiagnosis.bind(this)}
                    DiagnosisConfirmCollapsed={this.state.DiagnosisConfirmCollapsed}
                    SelectedSymptom={this.state.SelectedSymptom}
                />
                <DiagnosisSelect
                    onSelectedDiagnosis={this.onSelectedDiagnosis.bind(this)}
                    DiagnosisSelectCollapsed={this.state.DiagnosisSelectCollapsed}
                    SelectedSymptom={this.state.SelectedSymptom}
                />
                <DiagnosisReport
                    DiagnosisReportCollapsed={this.state.DiagnosisReportCollapsed}
                    SelectedSymptom={this.state.SelectedSymptom}
                />
            </div>
        );
    }
}

export default SimpleSymptomSearcher;