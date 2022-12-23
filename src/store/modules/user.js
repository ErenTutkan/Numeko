import { api } from 'src/boot/axios'
import { Notify } from 'quasar'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime.js'
import UTC from 'dayjs/plugin/utc.js'
import Timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(UTC)
dayjs.extend(RelativeTime)
dayjs.extend(Timezone)

const state = {
  user: null,
  company: null
}
const getters = {
  getUser: (state) => {
    return state.user
  },
  getUserId: (state) => {
    return state.user?.id
  },
  getToken: (state) => {
    return state.user?.token
  },
  getCompanyName: (state) => {
    return state.company?.companyName
  },
  getAuth (state) {
    const isToken = state.user?.token
    let isExpressionTime = false
    if (state.user?.expressionTime) {
      const expressionTime = dayjs(state.user?.expressionTime).utc()
      const diff = dayjs().diff(expressionTime)
      console.log(diff)

      if (diff < 0) {
        isExpressionTime = true
      }
    }

    return isToken && isExpressionTime
  },
  getCompany (state) {
    return state.company
  }
}
const mutations = {
  setUser (state, user) {
    state.user = user
  },
  Logout (state) {
    state.user = null
  },
  setCompany (state, company) {
    state.company = company
  },
  setLogo (state, logo) {
    state.logo = logo
  }
}
const actions = {
  async Login ({ commit, dispatch }, user) {
    await api.post('Account/Login', user).then(async ({ data }) => {
      commit('setUser', data)
      Notify.create({
        message: 'Giriş Yapıldı. Birazdan Yönlendirileceksiniz.',
        color: 'positive',
        timeout: 2000,
        position: 'top-right'
      })
      setTimeout(async () => {
        this.btnDisable = false
        dispatch('initial')
        this.$router.push('/')
      }, 2000)
    }).catch(async ({ response }) => {
      for (const item of response.data) {
        Notify.create({
          message: item,
          color: 'negative',
          timeout: 2300,
          position: 'top-right'
        })
      }
    })
  },
  getCompany ({ commit, rootGetters }) {
    const userId = rootGetters['user/getUserId']
    api.get(`Account/${userId}`).then(({ data }) => {
      commit('setCompany', data)
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
