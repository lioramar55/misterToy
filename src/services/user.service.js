import axios from 'axios'
const BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/auth/'
    : '//localhost:3030/api/auth/'

export default {
  attemptLogin,
  addUser,
  getLoggedInUser,
}

axios.defaults.withCredentials = true

async function getLoggedInUser() {
  const URL = BASE_URL.replace('auth', 'user') + 'get'
  try {
    const res = await axios.get(URL)
    return res.data
  } catch (err) {
    console.log('err', err)
  }
}
async function attemptLogin(user) {
  try {
    const res = await axios.post(BASE_URL + 'login', user)

    return res.data
  } catch (err) {
    console.dir('cannot login', err)
  }
}
async function addUser(user) {
  try {
    const res = await axios.post(BASE_URL + 'signup', user)
    return res.data
  } catch (err) {
    Promise.reject('cannot add user')
  }
}
