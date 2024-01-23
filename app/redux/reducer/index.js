import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import counterSlice from "../slice/counter.slice";

export const rootReducer = combineReducers({
    // Add your reducers here.
    count:counterSlice,
})