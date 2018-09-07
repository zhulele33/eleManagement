/* eslint-disable prefer-destructuring */
/**
 * 获得当前js路径
 */
let baseUrl = null

export default function () {
  if (baseUrl === null) {
    let src = ''
    if (document.currentScript) {
      src = document.currentScript.src
    } else {
      const script = document.querySelectAll('script')
      if (script.length) {
        src = script[script.length - 1].src
      }
    }
    const lastPoint = src.lastIndexOf('/js/')
    if (lastPoint >= 0) {
      src = src.substring(0, lastPoint + 1)
    }
    baseUrl = src
  }
  return baseUrl
}
