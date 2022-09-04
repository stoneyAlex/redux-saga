/*
 * @Author: shimingxia
 * @Date: 2022-08-23 19:22:59
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-08-24 10:19:04
 * @Description: 
 */
import * as actionTypes from '../action-types';
const actionCreators = {
  add() {
    return { type: actionTypes.ADD }
  },
  asyncAdd() {
    return { type: actionTypes.ASYNC_ADD }
  },
  stop() {
    return { type: actionTypes.STOP }
  }
}

export default actionCreators