import { httpService } from './http.service.js'
export default {
  add,
  query,
  remove,
}

function query(filterBy) {
  return httpService.get(`review`, filterBy)
}

function add(review) {
  return httpService.post('review', review)
}

function remove(reviewId) {
  return httpService.delete(`review/${reviewId}`)
}
