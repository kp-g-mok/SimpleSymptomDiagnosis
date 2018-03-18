export default function symptoms(state=[], action) {
    switch (action.type) {
      case 'FETCH_SYMPTOMS':
        return [...state, ...action.symptoms];  
      default:
        return state;
    }
  }