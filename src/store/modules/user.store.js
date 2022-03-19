import userService from '../../services/user.service.js'

export default {
  state: {
    user: null,
  },
  getters: {
    user({ user }) {
      return user
    },
  },
  mutations: {
    userLoggedIn(state, { user }) {
      state.user = user
    },
  },
  actions: {
    async loadUser({ commit }) {
      try {
        const user = await userService.getLoggedInUser()
        commit({ type: 'userLoggedIn', user })
      } catch (err) {
        console.log('No logged in user')
      }
    },

    async attemptLogin({ commit }, { user }) {
      try {
        const account = await userService.attemptLogin(user)
        commit({ type: 'userLoggedIn', user: account })
      } catch (err) {
        console.log('cannot log u in')
      }
    },
    async onSignUp({ commit }, { user }) {
      try {
        const account = await userService.addUser(user)
        commit({ type: 'userLoggedIn', user: account })
        return addedUser
      } catch (err) {
        console.log('cannot sign u up')
      }
    },
  },
}
