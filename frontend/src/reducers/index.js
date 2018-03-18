import { combineReducers } from 'redux';
import symptoms from "./symptoms";


const symptomApp = combineReducers({
    symptoms,
})

export default symptomApp;
