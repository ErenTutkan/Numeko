
import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store }/* { , ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const publicPages = ['login', 'Login', 'reset', 'resetpassword', 'resetPassword', 'certificate', 'Certificate', 'survey']
    const authRequired = !publicPages.includes(to.path.split('/')[1])
    const auth = store.getters['user/getAuth']
    console.log(authRequired)
    if (authRequired) {
      if (auth) {
        next()
      } else {
        return next({ name: 'login' })
      }
    }
    if (auth) {
      if (['login', 'reset', 'resetPassword'].includes(to.name)) {
        return next({ name: 'home' })
      }
    }
    if (!authRequired) return next()
  })

  return Router
})
