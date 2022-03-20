import axios from 'axios'
const BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/auth/'
    : '//localhost:3030/api/auth/'

export default {
  login,
  signup,
  logout,
}

axios.defaults.withCredentials = true

async function login(user) {
  try {
    const res = await axios.post(BASE_URL + 'login', user)
    return res.data
  } catch (err) {
    Promise.reject('cannot login')
  }
}
async function signup(user) {
  try {
    const res = await axios.post(BASE_URL + 'signup', user)
    return res.data
  } catch (err) {
    Promise.reject('cannot add user')
  }
}

async function logout() {
  try {
    await axios.post(BASE_URL + 'logout')
    return Promise.resolve('logged out')
  } catch (err) {
    return Promise.reject('cannot logout')
  }
}
