/* eslint-disable camelcase,no-undef,no-new */
/**
 * 入口文件
 */
import Vue from 'vue'
import App from './App'
import Ajax from './utils/ajax'
import router from './router'
import getBasePath from './utils/getBasePath'
import './common/base.styl'

__webpack_public_path__ = getBasePath()

Vue.prototype.Ajax = Ajax
// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

new Vue({
  el: '#root',
  router,
  template: '<App />',
  components: { App },
})
