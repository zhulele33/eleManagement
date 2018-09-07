/**
 * dev 环境配置
 */

module.exports = function (webpackConfig) {
  webpackConfig.resolve.alias.vue = 'vue/dist/vue.js'
  return webpackConfig
}
