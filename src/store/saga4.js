import {put, fork, take, cancel, delay} from '../redux-saga/effects'
import * as actionTypes from './action-types';

function* request(action) {
  let url = action.payload
  let res = yield fetch(url).then(res => res.json())
  console.log(res)
}

function* requestWatcher() {
  const requestAction = yield take(actionTypes.REQUEST)
  const requestTask = yield fork(request, requestAction)
  const stopAction = yield take(actionTypes.STOP_REQUEST)
  yield cancel(requestTask)
}

function* rootSaga() {
  yield requestWatcher()
}

export default rootSaga