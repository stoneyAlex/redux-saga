/*
 * @Author: shimingxia
 * @Date: 2022-08-23 19:50:30
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-08-24 10:24:36
 * @Description: 
 */
import * as effectsTypes from './effectTypes'

export function take(actionType) {
  return { type: effectsTypes.TAKE, actionType }
}

export function put(action) {
  return { type: effectsTypes.PUT, action }
}

export function fork(saga, ...args) {
  return { type: effectsTypes.FORK, saga, args }
}
export function takeEvery(actionType, saga) {
  function *takeEveryHelper() {
    while(true) {
      const action = yield take(actionType)
      yield fork(saga, action)
    }
  }
  return fork(takeEveryHelper)
}

export function call(fn, ...args) {
  return { type: effectsTypes.CALL, fn, args}
}

export function cps(fn, ...args) {
  return { type: effectsTypes.CPS, fn, args}
}

export function all(iterators) {
  return { type: effectsTypes.ALL, iterators}
}

export function cancel(task) {
  return { type: effectsTypes.CANCEL, task}
}

const delayFn = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export function delay(...args) {
  return call(delayFn, ...args)
}