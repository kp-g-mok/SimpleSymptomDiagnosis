import React, { Component } from 'react';


class DiagnosisReport extends Component{    
    render() {
        return (
            <div hidden={this.props.DiagnosisReportCollapsed}>
                <h3>Here is a list of diagnosis and their frequencies for your symptoms</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>diagnosis 1</td>
                            <td>frequency 1</td>
                        </tr>
                        <tr>
                            <td>diagnosis 2</td>
                            <td>frequency 2</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
  
  export default DiagnosisReport;
