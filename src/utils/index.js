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

/**
 * 将数值格式化为指定的位数
 * @param {number} n 需要格式化的数值
 * @param {number} length 需要格式化成的位数 default = 2
 */
export function formatNumber (n, length = 2) {
  n = n.toString()
  if (n.length < length) {
    return '0'.repeat(length - n.length) + n
  }
  return n
}

/**
 * 将过去的日期格式化为距离现在的相对时间，超过 1 天显示具体的 月-日
 * @param {*} dateTime 可被 new Date() 处理的日期
 */
export function beforeNow (dateTime) {
  const now = new Date()
  const target = new Date(dateTime)

  const diff = Math.floor((now.getTime() - target.getTime()) / 1000)
  if (diff < 60) {
    return `${diff}秒前`
  }
  if (diff < 3600) {
    return `${Math.floor(diff / 60)}分钟前`
  }
  if (diff < 86400) {
    return `${Math.floor(diff / 3600)}小时前`
  }
  return `${formatNumber(target.getMonth() + 1)}-${formatNumber(target.getDate())}`
}
