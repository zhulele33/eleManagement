/* eslint-disable global-require,import/no-dynamic-require */
import Demo from 'containers/Demo'
import NotFound from 'component/NotFound.vue'

const routes = [
  {
    path: '*',
    name: '页面没有找到',
    component: NotFound,
  },
  // {
  //   path: '/',
  //   name: '首页',
  //   component: Home,
  // },
  {
    path: '/demo',
    name: 'demo',
    component: Demo,
  },
]

function getPlatRoute(routers) {
  const newRoute = []
  routers.forEach((route) => {
    if (route.component) {
      newRoute.push(route)
    }
    if (route.children) {
      const childRoutes = getPlatRoute(route.children)
      newRoute.push(...childRoutes)
    }
  })
  return newRoute
}
const platRoutes = getPlatRoute(routes)

export {
  platRoutes,
  routes,
}
