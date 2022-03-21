import axios from 'axios'

const BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/auth/'
    : '//localhost:3030/api/auth/'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export default {
  login,
  signup,
  logout,
}

axios.defaults.withCredentials = true

async function login(user) {
  try {
    const res = await axios.post(BASE_URL + 'login', user)
    return _saveLocalUser(res.data)
  } catch (err) {
    throw 'cannot login'
  }
}

async function signup(user) {
  try {
    const res = await axios.post(BASE_URL + 'signup', user)
    return _saveLocalUser(res.data)
  } catch (err) {
    throw 'cannot add user'
  }
}

async function logout() {
  try {
    sessionStorage.clear()
    await axios.post(BASE_URL + 'logout')
    return Promise.resolve('logged out')
  } catch (err) {
    throw 'cannot logout'
  }
}

function _saveLocalUser(user) {
  console.log('user', user)
  sessionStorage.setItem(
    STORAGE_KEY_LOGGEDIN_USER,
    JSON.stringify(user)
  )
  return user
}
