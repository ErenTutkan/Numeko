import { api } from 'src/boot/axios'
import { Loading } from 'quasar'
const state = {
  list: []
}
const getters = {
  getList: (state) => state.list
}
const mutations = {
  setList (state, list) {
    state.list = list
  }
}
const actions = {
  async getList ({ commit, rootGetters }, type) {
    Loading.show({
      message: 'Eğitimler Yükleniyor.'
    })
    const id = rootGetters['user/getUserId']
    await api.get(`Education?companyId=${id}&Type=${type}`).then(({ data }) => {
      commit('setList', data)
    }).catch(() => {
      Loading.hide()
    })
    Loading.hide()
  }

}
export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
