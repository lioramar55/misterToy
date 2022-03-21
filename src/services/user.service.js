import { httpService } from './http.service.js'
export default {
  save,
  getUsers,
  getLoggedInUser,
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

function getUsers() {
  return httpService.get('user')
}

async function save(user) {
  try {
    if (user._id) {
      return await httpService.put(`user/${user._id}`, user)
    } else {
      return await httpService.post('user/', user)
    }
  } catch (err) {
    throw 'cannot update/save user'
  }
}

function getLoggedInUser() {
  return JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) ||
      'null'
  )
}
