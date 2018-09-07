/**
 * mock服务配置文件
 * 
 * @proxy {Boolean} [是否开启代理，从远程 host 拿数据]
 * @ajax {Boolean} [开启proxy后，是否仅代理 ajax请求(请求头含：'X-Requested-With': 'XMLHttpRequest')]
 * @具体mock数据放置在 根目录的 mock文件夹下
 */
const host = 'http://10.30.128.233:18989/'

module.exports = {
  proxy: false,
  api: {
    '.*': {
      target: host,
      ajax: true,
      secure: false,
    },
  },
}
