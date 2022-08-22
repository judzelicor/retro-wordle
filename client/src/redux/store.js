import { 
    createStore, 
    combineReducers 
} from "redux";
import { 
    solutionReducer,
    playerReducer,
    guessReducer,
    alertReducer
 } from "../reducers";

const store = createStore(combineReducers({
    solutionReducer,
    playerReducer,
    guessReducer,
    alertReducer
}));

export default store;