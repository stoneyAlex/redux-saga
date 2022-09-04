/*
 * @Author: shimingxia
 * @Date: 2022-08-23 18:15:31
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-08-24 10:13:20
 * @Description: 
 */
import { createStore, applyMiddleware } from 'redux'
// import createSagaMiddleware from '../redux-saga'
import createSagaMiddleware from '../redux-saga'
// import rootSaga from './saga'
import rootSaga from './saga4'
import reducer from './reducer'
const sagaMiddleware = createSagaMiddleware()
let store = applyMiddleware(sagaMiddleware)(createStore)(reducer)
sagaMiddleware.run(rootSaga)

export default store