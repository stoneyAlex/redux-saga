/*
 * @Author: shimingxia
 * @Date: 2022-08-24 09:41:28
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-08-24 09:42:47
 * @Description: 
 */
function *gen() {
  while (true) {
    yield Math.random()
  }
}
let it = gen()
let {value: v1} = it.next()
console.log(v1)
let {value: v2} = it.next()
console.log(v2)