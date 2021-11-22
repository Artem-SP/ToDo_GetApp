import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { toDoReducer } from "./toDoReduser.js";
import createSagaMiddleware from "redux-saga";
import { toDoWatcher } from "./saga/toDoSaga.js";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  toDo: toDoReducer
});
const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);

export const persistor = persistStore(store);

sagaMiddleware.run(toDoWatcher);
