import { httpService } from './http.service.js'

function query(filterBy) {
  return httpService.get('toy', filterBy)
}

function getById(id) {
  return httpService.get(`toy/${id}`)
}

function save(toyToSave) {
  if (toyToSave._id) {
    return httpService.put(
      `toy/${toyToSave._id}`,
      toyToSave
    )
  } else {
    return httpService.post(`toy/`, toyToSave)
  }
}

function remove(id) {
  return httpService.delete(`toy/${id}`)
}

export default {
  query,
  getById,
  save,
  remove,
}
