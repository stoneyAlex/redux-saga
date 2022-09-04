/*
 * @Author: shimingxia
 * @Date: 2022-08-17 18:38:38
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-08-22 20:31:58
 * @Description: 
 */
import React, { Component } from 'react'
export default class Home extends Component {
  render() {
    console.log(this.props.history)
    return (
      <div>
        <p>Home</p>
        <button onClick={() => this.props.history.goBack()}>返回</button>
      </div>
    )
  }
}