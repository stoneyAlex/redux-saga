/*
 * @Author: shimingxia
 * @Date: 2022-08-23 17:04:55
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-08-23 17:57:14
 * @Description: 
 */
function* gen() {
  yield { type: 'PUT', action: { type: 'ADD' } }
  yield new Promise(resolve => setTimeout(resolve, 1000))
  yield { type: 'PUT', action: { type: 'MINUS' } }
}

function co(gen) {
  let it = gen()
  function next() {
    let {value: effect, done} = it.next()
    if(!done) {
      if(effect instanceof Promise) {
        effect.then(() => {
          next()
        })
      } else if(effect.type === 'PUT') {
        console.log('如果type === PUT，就需要向仓库派发动作', effect.action)
        next()
      }
    }
  }
  next()
}

co(gen)