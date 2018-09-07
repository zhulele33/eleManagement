import Vue from 'vue'
import Router from 'vue-router'
import { platRoutes as routes } from './config'

Vue.use(Router)
export default new Router({ mode: 'history', routes })
