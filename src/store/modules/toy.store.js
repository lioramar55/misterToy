import toyService from '../../services/toy-service.js'

export default {
  state: {
    toys: null,
    filterBy: null,
  },
  getters: {
    toysForDisplay({ toys }) {
      return toys
    },
    typesData({ toys }) {
      const typesMap = {}
      toys.forEach((toy) => {
        if (!typesMap[toy.type]) {
          typesMap[toy.type] = 0
        }
        typesMap[toy.type]++
      })

      for (let type in typesMap) {
        const avgPrice = toys.reduce(
          (acc, toy) =>
            acc + (toy.type === type ? toy.price : 0),
          0
        )
        typesMap[type] = avgPrice / typesMap[type]
      }

      return {
        labels: Object.keys(typesMap),
        datasets: [
          {
            data: Object.values(typesMap),
            backgroundColor: [
              '#77CEFF',
              '#0079AF',
              '#123E6B',
              '#97B0C4',
              '#A5C8ED',
            ],
          },
        ],
      }
    },
  },
  mutations: {
    load(state, { toys }) {
      state.toys = toys
    },
    filter(state, { filterBy }) {
      state.filterBy = filterBy
      this.dispatch({ type: 'loadFilteredToys', filterBy })
    },
    reviewAdded(state, { toys }) {
      state.toys = toys
    },
    updateToy(state, { updatedToy }) {
      const idx = state.toys.findIndex(
        (toy) => toy._id === updatedToy._id
      )
      if (idx === -1) return Promise.reject()
      state.toys[idx] = updatedToy
      return Promise.resolve()
    },
  },
  actions: {
    loadToys({ commit }) {
      toyService.query().then((toys) => {
        commit({ type: 'load', toys })
      })
    },
    loadFilteredToys({ commit }, { filterBy }) {
      toyService.query(filterBy).then((toys) => {
        commit({ type: 'load', toys })
      })
    },
    setFilter({ commit }, { filterBy }) {
      commit({ type: 'filter', filterBy })
    },
    addReview({ commit }, { review, toy }) {
      toyService.addReview(toy, review).then((toys) => {
        commit({ type: 'reviewAdded', toys })
      })
    },
    updateToy({ commit }, { toy }) {
      return toyService
        .save(toy)
        .then((updatedToy) =>
          commit({ type: 'updateToy', updatedToy })
        )
    },
  },
}
