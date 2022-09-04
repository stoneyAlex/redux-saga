/*
 * @Author: shimingxia
 * @Date: 2022-08-23 19:52:07
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-08-23 20:10:34
 * @Description: 
 */
import runSaga from './runSaga'
import createChannel from './createChannel'
import EventEmitter from 'events'

function createSagaMiddleware() {
  // let channel = createChannel()
  let channel = new EventEmitter()
  let boundRunSaga
  function sagaMiddleware({getState, dispatch}) {
    boundRunSaga = runSaga.bind(null, { channel, getState, dispatch})
    return function(next) {
      return function(action) {
        let result = next(action)
        channel.emit(action.type, action)
        return result
      }
    }
  }
  sagaMiddleware.run = (saga) => boundRunSaga(saga)
  return sagaMiddleware
}

export default createSagaMiddleware