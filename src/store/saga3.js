// import {put, fork, takeEvery} from '../redux-saga/effects'
import {put, fork, take, call, cps, all} from '../redux-saga/effects'
import * as actionTypes from './action-types';

function* add1() {
  for (let i = 0; i < 1; i++) {
    yield take(actionTypes.ASYNC_ADD)
    yield put({type: actionTypes.ADD})
  }
  console.log('add1 done')
  return 'add1result'
}

function* add2() {
  for (let i = 0; i < 2; i++) {
    yield take(actionTypes.ASYNC_ADD)
    yield put({type: actionTypes.ADD})
  }
  console.log('add2 done')
  return 'add2result'
}

function* rootSaga() {
  let result = yield all([add1(), add2()]);
  console.log('all done', result);
}

export default rootSaga;