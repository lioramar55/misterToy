import { createStore } from 'vuex'
import toyStore from './modules/toy.store.js'
const store = createStore({
  strict: true,
  state() {
    return {}
  },
  getters: {},
  mutations: {},
  modules: {
    toyStore,
  },
  actions: {
    loadApp({ dispatch }) {
      dispatch('loadToys')
    },
  },
})

export default store
