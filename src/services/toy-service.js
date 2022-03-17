import axios from 'axios'
const BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/toy/'
    : '//localhost:3030/api/toy/'

async function query(filterBy) {
  try {
    const res = await axios.get(BASE_URL, {
      params: filterBy,
    })
    return res.data
  } catch (err) {
    return Promise.reject(err)
  }
}

async function getById(id) {
  try {
    const res = await axios.get(BASE_URL + id)
    return res.data
  } catch (err) {
    return Promise.reject(err)
  }
}

async function save(toyToSave) {
  if (toyToSave._id) {
    try {
      const res = await axios.put(
        BASE_URL + toyToSave._id,
        toyToSave
      )
      return res.data
    } catch (err) {
      return Promise.reject(err)
    }
  } else {
    const res = await axios.post(BASE_URL, toyToSave)
    return res.data
  }
}
async function remove(id) {
  try {
    await axios.delete(BASE_URL + id)
    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err)
  }
}

async function addReview(oldToy, review) {
  try {
    const toys = await query()
    const idx = toys.findIndex(
      (toy) => toy._id === oldToy._id
    )
    if (idx === -1) return Promise.reject()
    toys[idx].reviews.unshift(review)
    return save(toys[idx])
  } catch (err) {
    return Promise.reject(err)
  }
}

export default {
  query,
  getById,
  save,
  remove,
  addReview,
}
