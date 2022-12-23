import { api } from 'src/boot/axios'
import { Loading } from 'quasar'
const state = {
  list: [],
  totalList: []
}
const getters = {
  getList: (state) => state.list,
  getTotalCount: (state) => state.totalList.length,
  getValidCount: (state) => {
    const count = state.totalList.filter(x => x.isCertificate === true).length
    return count
  }
}
const mutations = {
  setList (state, list) {
    state.list = list
  },
  setItem (state, item) {
    state.totalList.push(item)
  },
  removeList (state) {
    state.totalList = []
  }
}
const actions = {
  async getList ({ commit }, id) {
    Loading.show({ message: 'Katılımlar Yükleniyor.' })
    await api.get('Participant?educationId=' + id).then(({ data }) => {
      commit('setList', data)
    })
    Loading.hide()
  },
  async getTotalList ({ commit }, id) {
    await api.get('Participant?educationId=' + id).then(({ data }) => {
      for (const item of data) {
        commit('setItem', item)
      }
    })
  }
}
export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
