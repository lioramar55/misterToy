import toyService from '../../services/toy-service.js'

export default {
  state: {
    toys: null,
    filterBy: null,
  },
  getters: {
    toys({ toys }) {
      return toys
    },
    lastSortBy({ filterBy }) {
      return filterBy?.sortBy ? filterBy.sortBy : null
    },
    pieData({ toys }) {
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
    barData({ toys }) {
      const typesMap = {}
      toys.forEach((toy) => {
        if (!typesMap[toy.type]) {
          typesMap[toy.type] = 1
        } else typesMap[toy.type]++
      })
      for (let type in typesMap) {
        const numOfToysInStock = toys.reduce(
          (acc, toy) =>
            acc +
            (toy.inStock && toy.type === type ? 1 : 0),
          0
        )
        typesMap[type] =
          (numOfToysInStock / typesMap[type]) * 100
      }
      return {
        labels: Object.keys(typesMap),
        datasets: [
          {
            label: '% in stock',
            data: Object.values(typesMap),
            backgroundColor: '#97B0C4',
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
    saveToy({ commit }, { toy }) {
      return toyService
        .save(toy)
        .then((savedToy) =>
          commit({ type: 'saveToy', savedToy })
        )
    },
  },
}
