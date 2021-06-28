import { createStore, combineReducers } from 'redux';
import media from "./movieReducer";

const reducer = combineReducers({
    media
});

const store = createStore(reducer);

export default store;