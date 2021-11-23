import { put, takeEvery } from "redux-saga/effects";

function* addToDoWorker() {
  yield put(addCreator());
}

function* changeToDoWorker() {
  yield put(changeCreator());
}

function* removeToDoWorker() {
  yield put(changeCreator());
}

function* setDoneToDoWorker() {
  yield put(setDoneCreator());
}

export function* toDoWatcher() {
  yield takeEvery(ADD_TODO, addToDoWorker);
  yield takeEvery(CHANGE_TODO, changeToDoWorker);
  yield takeEvery(REMOVE_TODO, removeToDoWorker);
  yield takeEvery(SETDONE_TODO, setDoneToDoWorker);
}
