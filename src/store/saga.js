// import {put, fork, takeEvery} from '../redux-saga/effects'
import {put, fork, take, cancel, delay} from '../redux-saga/effects'
import * as actionTypes from './action-types';
function* add() {
  while (true) {
    yield delay(1000)
    yield put({type: actionTypes.ADD})
  }
}

function* addWatcher() {
  const task = yield fork(add)
  yield take(actionTypes.STOP_ADD)
  yield cancel(task)
}

function* rootSaga() {
  yield addWatcher()
}

export default rootSaga