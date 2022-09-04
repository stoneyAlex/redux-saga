import {put, take, fork, takeEvery, call,cps} from '../redux-saga/effects'
import * as actionTypes from './action-types'

// function delay(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms)
//   })
// }
const delay = (ms, done) => {
  setTimeout(() => {
    done(null, 'ok')
  }, ms);
}
function* workerSaga(action) {
  console.log(action)
  // yield delay(1000)
  // yield call(delay, 1000)
  const data = yield cps(delay, 1000)
  console.log(data)
  yield put({type: actionTypes.ADD})
}

function* watcherSaga() {
  // const action = yield take(actionTypes.ASYNC_ADD)
  // console.log('action', action)
  // console.log('before workSaga')
  // // yield workerSaga()
  // yield fork(workerSaga)
  // console.log('after workSaga')
  // while (true) {
  //   const action = yield take(actionTypes.ASYNC_ADD)
  //   yield fork(workerSaga)
  // }
  yield takeEvery(actionTypes.ASYNC_ADD, workerSaga)
}

function* rootSaga() {
  yield watcherSaga()
}

export default rootSaga