import { 
    createStore, 
    combineReducers 
} from "redux";
import { 
    solutionReducer,
    playerReducer,
    guessReducer
 } from "../reducers";

const store = createStore(combineReducers({
    solutionReducer,
    playerReducer,
    guessReducer
}));

export default store;