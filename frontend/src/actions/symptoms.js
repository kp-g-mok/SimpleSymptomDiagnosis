export const fecthSymptoms = () => {
    return dispatch => {
        let headers = {"Content-Type": "application/json"};
        return fetch("/api/symptoms/", {headers, })
            .then(res => res.json())
            .then(symptoms => {
                return dispatch({
                    type: "FETCH_SYMPTOMS",
                    symptoms
            })
        })
    }
}

  