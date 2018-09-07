/* eslint-disable */
/**
 * Ajax请求公用方法
 *
 * @ 默认 GET
 * @ 默认 application/json
 * @ 示例：
 *   get:   $.Ajax(url).then()
 *   post:  $.Ajax(url,{
 *            method: 'post',
 *            params: {},
 *            headers: {}
 *          }).then()
 */

import Axios from 'axios'
// import { Message } from 'element-ui'

export default function (url, {
  params = {},
  methods = 'GET',
  headers = {},
} = {}) {
  const method = methods.toUpperCase()
  let config = {
    url,
    method,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      ...headers,
    },
    timeout: 20000,
  }
  const opts = {}
  if (method === 'GET' || config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    opts.params = params
  } else if (method === 'POST') {
    opts.data = params
  }
  config = {
    ...config,
    ...opts,
  }

  return new Promise(((resolve, reject) => {
    Axios(config).then(({ data }) => {
      if (data.code == 1 || data.code === 100000) {
        if(data.data){
          return resolve(data.data)
        }else {
          return resolve(true)
        }

      } else if (data.code === 302) {
        window.location.href = data.data
      }
      return reject(data)
    }).catch(() => reject(new Error('接口请求出错')))
  }))
}
