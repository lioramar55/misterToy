import { httpService } from './http.service.js'
export default {
  save,
  getUsers,
}

function getUsers() {
  return httpService.get('user')
}

function save(user) {
  if (user._id) {
    return httpService.put(`user/${user._id}`, user)
  } else {
    return httpService.post('user/', user)
  }
}
