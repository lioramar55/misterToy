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
    updateToy(state, { savedToy }) {
      if (savedToy._id) {
        const idx = state.toys.findIndex(
          (toy) => toy._id === savedToy._id
        )
        if (idx === -1) return Promise.reject()
        state.toys[idx] = savedToy
      } else {
        this.dispatch({
          type: 'loadToys',
        })
      }
      return Promise.resolve()
    },
    removeToy(state, { id }) {
      const idx = state.toys.findIndex(
        (toy) => toy._id === id
      )
      state.toys.splice(idx, 1)
    },
  },
  actions: {
    async loadToys({ commit }) {
      const toys = await toyService.query()
      commit({ type: 'load', toys })
    },
    async removeToy({ commit }, { id }) {
      await toyService.remove(id)
      commit({ type: 'removeToy', id })
    },
    async loadFilteredToys({ commit }, { filterBy }) {
      const toys = await toyService.query(filterBy)
      commit({ type: 'load', toys })
    },
    setFilter({ commit }, { filterBy }) {
      if (filterBy.inStock === 'All' || !filterBy.inStock) {
        filterBy.inStock = ''
      } else {
        if (filterBy.inStock === 'In stock')
          filterBy.inStock = true
        else filterBy.inStock = false
      }
      commit({ type: 'filter', filterBy })
    },
    async addReview({ commit }, { review, toy }) {
      const toys = await toyService.addReview(toy, review)
      commit({ type: 'reviewAdded', toys })
    },
    async saveToy({ commit }, { toy }) {
      try {
        const savedToy = await toyService.save(toy)
        commit({ type: 'updateToy', savedToy })
        return savedToy
      } catch (err) {
        console.dir(err)
      }
    },
  },
}
