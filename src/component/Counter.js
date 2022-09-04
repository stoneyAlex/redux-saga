/*
 * @Author: shimingxia
 * @Date: 2022-08-22 19:37:35
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-08-24 10:18:25
 * @Description: 
 */
import React from 'react'
import * as actionTypes from '../store/action-types'
import {useSelector, useDispatch} from 'react-redux'

function Counter() {
  const number = useSelector(state => state.number)
  const dispatch = useDispatch()
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => dispatch({type: actionTypes.ASYNC_ADD})}>+</button>
      <button onClick={() => dispatch({type: actionTypes.STOP_ADD})}>stop</button>
      <button onClick={() => dispatch({type: actionTypes.REQUEST, payload: 'http://localhost:3000/users.json'})}>request</button>
      <button onClick={() => dispatch({type: actionTypes.STOP_REQUEST})}>stopRequest</button>
    </div>
  )
}

export default Counter