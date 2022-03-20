import authService from '../../services/auth.service.js'
import userService from '../../services/user.service.js'

export default {
  state: {
    user: null,
    users: null,
  },
  getters: {
    user({ user }) {
      return user
    },
    users({ users }) {
      return users
    },
  },
  mutations: {
    userLoggedIn(state, { user }) {
      state.user = user
    },
    userLoggedOut(state) {
      state.user = null
    },
    setUsers(state, { users }) {
      state.users = users
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
    async loadUsers({ commit }) {
      try {
        const users = await userService.getUsers()
        commit({ type: 'setUsers', users })
      } catch (err) {}
    },
    async logout({ commit }) {
      try {
        await authService.logout()
        commit({ type: 'userLoggedOut' })
        this.$router.push('/')
      } catch (err) {
        console.log('cannot log u out')
      }
    },

    async attemptLogin({ commit }, { user }) {
      try {
        const account = await authService.login(user)
        commit({ type: 'userLoggedIn', user: account })
      } catch (err) {
        console.log('cannot log u in')
      }
    },
    async onSignUp({ commit }, { user }) {
      try {
        const account = await authService.signup(user)
        commit({ type: 'userLoggedIn', user: account })
        return account
      } catch (err) {
        console.log('cannot sign u up')
      }
    },
    async saveUser({ commit }, { user }) {
      try {
        user.isAdmin =
          user.isAdmin === 'Admin' ? true : false
        const account = await userService.save(user)
        commit({ type: 'userSaved', user: account })
        return account
      } catch (err) {
        console.log('cannot sign u up')
      }
    },
  },
}
