const INITIAL_STATE = {
    guessHistory: [],
    currentGuess: "",
    guessObjectsHistory: [],
    guessRound: 1
}

function guessReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case "guessed/word":
            return {
                ...state,
                guessHistory: [...state.guessHistory, action.payload.toString()],
                guessObjectsHistory: [...state.guessObjectsHistory, action.payload],
                guessRound: state.guessRound + 1
            }

        case "guessed/letter":
            return {
                ...state,
                currentGuess: state.currentGuess + action.payload
            }

        case "undo/letter":
            return {
                ...state,
                currentGuess: state.currentGuess.slice(0, -1)
            }

        case "RESET/GUESS_WORD":
            return {
                ...state,
                currentGuess: ""
            }

        default:
            return state;
    }
}

export default guessReducer;