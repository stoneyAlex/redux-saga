/*
 * @Author: shimingxia
 * @Date: 2022-08-23 19:52:41
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-08-24 10:25:28
 * @Description: 
 */
import * as effectsTypes from './effectTypes'
const CALCEL_TASK = 'CALCEL_TASK'
function runSaga(env, saga, callback) {
  let task = {cancel: () => next(CALCEL_TASK)}
  let { channel, dispatch } = env
  let it = typeof saga === 'function' ? saga() : saga
  function next(value, isError) {
    let result
    if(isError) {
      result = it.throw(value)
    } else if(value===CALCEL_TASK) {
      result = it.return(value)
    } else {
      result = it.next(value)
    }
    let { value: effect, done } = result
    if(!done) {
      if(typeof effect[Symbol.iterator] === 'function') {
        runSaga(env, effect)
        next()
      } else if(effect instanceof Promise) {
        effect.then(next)
      } else {
        switch(effect.type) {
          case effectsTypes.TAKE:
            channel.once(effect.effectsTypes, next)
            break;
          case effectsTypes.PUT:
            dispatch(effect.action)
            next()
            break
          case effectsTypes.FORK:
            let forkTask = runSaga(env, effect.saga)
            next(forkTask)
            break
          case effectsTypes.CALL:
            effect.fn(...effect.args).then(next)
            break
          case effectsTypes.CPS:
            effect.fn(...effect.args, (err, data) => {
              if(err) {
                next(err, true)
              } else {
                next(data)
              }
            })
            break
          case effectsTypes.ALL:
            let { iterators } = effect
            let result = []
            let completeCount = 0
            iterators.forEach((iterator, index) => {
              runSaga(env, iterator, (data) => {
                result[index] = data
                if(++completeCount === iterators.length) {
                  next(result)
                }
              })
            })
            break
          case effectsTypes.CANCEL:
            effect.task.cancel()
            next()
            break
          default:
            break;
        }
      }
    } else {
      callback && callback()
    }
  }
  next()
  return task
}

export default runSaga