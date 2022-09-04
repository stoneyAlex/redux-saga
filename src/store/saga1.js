/*
 * @Author: shimingxia
 * @Date: 2022-08-23 18:17:10
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-08-24 09:31:55
 * @Description: 
 */
import * as actionTypes from './action-types';
import {put, take} from '../redux-saga/effects';
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
function* workerSaga() {
  yield delay(1000)
  yield put({type: actionTypes.ADD})
}
function* watcherSaga() {
  const action = yield take(actionTypes.ASYNC_ADD)
  console.log('action', action)
  yield workerSaga()
  console.log('watcherSaga 结束')
}
function* rootSaga() {
  yield watcherSaga()
  console.log('rootSaga结束')
}
export default rootSaga