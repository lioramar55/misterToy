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
      const labelsMap = {}
      toys.forEach((toy) => {
        if (toy.labels) {
          toy.labels.forEach((label) => {
            if (!labelsMap[label]) {
              labelsMap[label] = 0
            }
            labelsMap[label]++
          })
        }
      })

      for (let label in labelsMap) {
        const avgPrice = toys.reduce((acc, toy) => {
          if (toy.labels) {
            toy.labels.forEach((toyLabel) => {
              acc + (toyLabel === label ? toy.price : 0)
            })
          }
        }, 0)
        labelsMap[label] = avgPrice / labelsMap[label]
      }

      return {
        labels: Object.keys(labelsMap),
        datasets: [
          {
            data: Object.values(labelsMap),
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
      const labelsMap = {}
      toys.forEach((toy) => {
        if (toy.labels) {
          toy.labels.forEach((label) => {
            if (!labelsMap[label]) {
              labelsMap[label] = 1
            } else labelsMap[label]++
          })
        }
      })
      for (let label in labelsMap) {
        const numOfToysInStock = toys.reduce((acc, toy) => {
          if (toy.labels) {
            toy.labels.forEach((toyLabel) => {
              acc +
                (toy.inStock && toyLabel === label ? 1 : 0)
            }),
              0
          }
        })
        labelsMap[label] =
          (numOfToysInStock / labelsMap[label]) * 100
      }
      return {
        labels: Object.keys(labelsMap),
        datasets: [
          {
            label: '% in stock',
            data: Object.values(labelsMap),
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
