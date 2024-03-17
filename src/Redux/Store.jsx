import { createStore,combineReducers,applyMiddleware } from "redux";
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';
import { taskReducer, userReducer } from "./reducer";
const reducers = combineReducers({user:userReducer,taskData:taskReducer}),initialState={};

const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(thunk)));

export default store