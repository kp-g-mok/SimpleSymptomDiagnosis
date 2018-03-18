import { combineReducers } from 'redux';
import symptoms from "./symptoms";
import diagnosis from "./diagnosis";


const symptomApp = combineReducers({
    symptoms,
    diagnosis,
})

export default symptomApp;
