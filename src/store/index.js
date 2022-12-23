import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import Education from './modules/Education'
import createPersistentState from 'vuex-persistedstate'
import participant from './modules/participant'
import user from './modules/user'
// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      Education,
      participant,
      user
    },
    state: {
      totalDay: 0
    },
    getters: {
      getTotalDay (state) {
        return state.totalDay
      }
    },
    mutations: {
      setTotalDay (state, day) {
        state.totalDay = day
      }
    },
    actions: {
      async initial ({ dispatch }) {
        await dispatch('getTotalCount')
      },
      async getTotalCount ({ rootGetters, dispatch, commit }) {
        await dispatch('Education/getList', 1)
        const educationList = rootGetters['Education/getList']
        commit('participant/removeList')
        let count = 0
        for (const item of educationList) {
          count += parseInt(item.educationTime)

          await dispatch('participant/getTotalList', item.id)
        }
        commit('setTotalDay', count)
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
    plugins: [createPersistentState()]
  })
  return Store
})
