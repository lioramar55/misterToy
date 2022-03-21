import userService from '../../services/review-service.js'
import reviewService from '../../services/review-service.js'

export default {
  state: {
    reviews: null,
  },
  getters: {},
  mutations: {},
  actions: {
    async addReview({ dispatch }, { review, toy }) {
      review.aboutToyId = toy._id
      try {
        await reviewService.add(review)
        dispatch('loadToys')
      } catch (err) {
        console.log('cannot add review')
      }
    },
    async removeReview({ commit }, { reviewId, toyId }) {
      try {
        await reviewService.remove(reviewId)
        const reviews = await reviewService.query({
          aboutToyId: toyId,
        })
        return reviews
      } catch (err) {
        console.log('cannot remove review')
        return null
      }
    },
  },
}
