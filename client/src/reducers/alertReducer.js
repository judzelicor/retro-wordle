const INITIAL_STATE = {
  incompleteWordInputAlertIsVisible: false 
}

function alertReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case "ALERT/INCOMPLETE_INPUT":
      return {
        ...state,
        incompleteWordInputAlertIsVisible: action.payload
      }
    default:
      return state;
  }
}

export default alertReducer;