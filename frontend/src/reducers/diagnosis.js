export default function diagnosis(state=[], action) {
    switch (action.type) {
      case 'FETCH_MOST_FREQ_DIAG':
        return [...state, ...action.diagnosis];
      case 'FETCH_DIAGS':
        return [...state, ...action.diagnosis];
  
      default:
        return state;
    }
  }