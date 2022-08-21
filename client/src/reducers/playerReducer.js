const INITIAL_STATE = {
    player: {}
}

function playerReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case "player/new":
            return {
                ...state,
                player: action.payload
            }

        default:
            return state;
    }
}

export default playerReducer;