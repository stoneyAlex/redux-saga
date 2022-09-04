import * as effectsTypes from './effectTypes'
const TASK_CANCEL = 'TASK_CANCEL'

function runSaga(env, saga, sagaDone) {
  const task = {cancel: () => next(TASK_CANCEL)}
  const {channel, dispatch} = env;
  const it = typeof saga === 'function' ? saga() : saga
  function next(value, isError) {
    let result 
    if(isError) {
      result = it.throw(value)
    } else if(value === TASK_CANCEL) {
      result = it.return(value)
    } else {
      result = it.next(value)
    }
    let {done, value: effect} = result
    if(!done) {
      if(typeof effect[Symbol.iterator] === 'function') {
        runSaga(env, effect)
        next()
      } else if(effect instanceof Promise) {
        effect.then(next)
      } else {
        switch (effect.type) {
          case effectsTypes.TAKE:
            channel.once(effect.actionType, (action) => next(action))
            break;
          case effectsTypes.PUT:
            dispatch(effect.action)
            next()
            break;
          case effectsTypes.FORK:
            let forkTask = runSaga(env, effect.saga.bind(null, ...effect.args))
            next(forkTask)
            break;
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
      sagaDone && sagaDone(effect)
    }
  }
  next()
  return task
}

export default runSaga