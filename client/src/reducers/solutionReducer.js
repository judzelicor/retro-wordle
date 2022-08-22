const INITIAL_STATE = {
    solution: {
        word: "sstor",
        uppercase: "SSTOR"
    }
}

function solutionReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case "solution/add":
            return {
                ...state,
                solution: action.payload
            }

        default:
            return state
    }
}

export default solutionReducer;