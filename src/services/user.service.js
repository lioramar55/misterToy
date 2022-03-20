import axios from 'axios'

const BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/user/'
    : '//localhost:3030/api/user/'

export default {
  save,
  getLoggedInUser,
  getUsers,
}

axios.defaults.withCredentials = true

async function getUsers() {
  try {
    const res = await axios.get(BASE_URL)
    return res.data
  } catch (err) {
    console.log('err', err)
  }
}

async function getLoggedInUser() {
  try {
    const res = await axios.get(BASE_URL + 'get')
    return res.data
  } catch (err) {
    console.log('err', err)
  }
}
async function save(user) {
  try {
    let res = null
    if (user._id) {
      res = await axios.put(BASE_URL + user._id, user)
    } else {
      res = await axios.post(BASE_URL, user)
    }
    return res.data
  } catch (err) {
    console.log('err', err)
  }
}
