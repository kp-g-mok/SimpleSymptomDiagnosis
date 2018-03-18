import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import symptomApp from "./reducers";

import SimpleSymptomSearcher from './components/SimpleSymptomSearcher'
import SymptomSelect from './components/SymptomSelect'
import DiagnosisConfirm from './components/DiagnosisConfirm'
import DiagnosisSelect from './components/DiagnosisSelect'
import DiagnosisReport from './components/DiagnosisReport'

let store = createStore(symptomApp, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SimpleSymptomSearcher} />
            <Route component={SymptomSelect} />
            <Route component={DiagnosisConfirm} />
            <Route component={DiagnosisSelect} />
            <Route component={DiagnosisReport} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
