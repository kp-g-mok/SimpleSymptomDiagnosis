export const fetchMostFreqDiag = (symptom) => {
    return dispatch => {
      let headers = {"Content-Type": "application/json"};
      return fetch(`/api/symptoms/${encodeURIComponent(symptom)}/retrieve_most_freq/`, {headers, })
        .then(res => res.json())
        .then(diagnosis => {
          return dispatch({
            type: "FETCH_MOST_FREQ_DIAG",
            diagnosis
          })
        })
    }
  }

  export const fetchDiags = (symptom) => {
    return dispatch => {
      let headers = {"Content-Type": "application/json"};
      return fetch(`/api/symptoms/${encodeURIComponent(symptom)}`, {headers, })
        .then(res => res.json())
        .then(diagnosis => {
          return diagnosis({
            type: "FETCH_DIAGS",
            diagnosis
          })
        })
    }
  }
  