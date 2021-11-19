import { createStore, combineReducers, applyMiddleware } from "redux";
import { toDoReducer } from "./toDoReduser.js";
// import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  toDo: toDoReducer
});

export const store = createStore(rootReducer);
