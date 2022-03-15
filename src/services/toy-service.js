import axios from 'axios'
import { utilService } from './util-service.js'
const BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/toy/'
    : '//localhost:3000/api/toy/'

function query(filterBy) {
  return axios
    .get(BASE_URL, { params: filterBy })
    .then((res) => res.data)
}

function getById(id) {
  return axios.get(BASE_URL + id).then((res) => res.data)
}

function save(toyToSave) {
  if (toyToSave._id) {
    return axios
      .put(BASE_URL + toyToSave._id, toyToSave)
      .then((res) => res.data)
  } else {
    return axios.post(BASE_URL, toyToSave)
  }
}
function remove(id) {
  return axios.delete(BASE_URL + id)
}

function addReview(oldToy, review) {
  return query().then((toys) => {
    const idx = toys.findIndex(
      (toy) => toy._id === oldToy._id
    )
    if (idx === -1) return Promise.reject()
    review._id = utilService.makeId()
    toys[idx].reviews.unshift(review)
    return save(toys[idx])
  })
}

function _getUrl(id = '') {
  return `${BASE_URL + id}`
}

export default {
  query,
  getById,
  save,
  remove,
  addReview,
}
