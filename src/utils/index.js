/**
 * 防抖函数
 * @param {function} fn 需要防抖的函数定义
 * @param {number} delay 需要延迟的毫秒数 default = 500
 */
export function debounce (fn, delay = 500) {
  let timer

  return function () {
    clearTimeout(timer)

    const _this = this
    const _arguments = arguments

    timer = setTimeout(() => {
      fn.apply(_this, _arguments)
    }, delay)
  }
}
