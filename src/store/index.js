import { createStore, combineReducers, applyMiddleware } from "redux";
import { toDoReducer } from "./toDoReduser.js";
import createSagaMiddleware from "redux-saga";
import { toDoWatcher } from "./saga/toDoSaga.js";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  toDo: toDoReducer
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(toDoWatcher)
