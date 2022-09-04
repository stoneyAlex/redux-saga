/*
 * @Author: shimingxia
 * @Date: 2022-08-15 09:07:10
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-08-23 19:22:06
 * @Description: 
 */
import React from 'react';
import ReactDOM from 'react-dom'
import Counter from './component/Counter'
import { Provider } from 'react-redux';
import store from './store'

ReactDOM.render(<Provider store={store}>
  <Counter />
</Provider>, document.getElementById('root'))