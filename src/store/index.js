import { createStore } from 'vuex'
import toyStore from './modules/toy.store.js'
import userStore from './modules/user.store.js'
import reviewStore from './modules/review.store.js'
const store = createStore({
  strict: true,
  state() {
    return {}
  },
  getters: {},
  mutations: {},
  modules: {
    toyStore,
    userStore,
    reviewStore,
  },
  actions: {
    loadApp({ dispatch }) {
      dispatch('loadToys')
      dispatch('loadUser')
      dispatch('loadUsers')
    },
  },
})

export default store
