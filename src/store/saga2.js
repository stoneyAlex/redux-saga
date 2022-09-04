// import {put, fork, takeEvery} from '../redux-saga/effects'
import {put, fork, takeEvery, call, cps} from 'redux-saga/effects'
import * as actionTypes from './action-types';

// function delay(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms)
//   })
// }

function delay(ms, callback) {
  setTimeout(() => {
    callback(null, 'ms')
  }, ms)
}

function *add() {
  // yield delay(1000)
  yield cps(delay, 1000)
  yield put({type: actionTypes.ADD})
}

function* rootSaga() {
  // yield fork(add)
  // console.log('f')
  yield takeEvery(actionTypes.ASYNC_ADD, add)
}

export default rootSaga