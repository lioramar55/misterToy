import toyService from '../../services/toy-service.js'

export default {
  state: {
    toys: null,
    filterBy: null,
  },
  getters: {
    toysForDisplay({ toys, filterBy }) {
      if (filterBy) {
        var filteredToys = JSON.parse(JSON.stringify(toys))
        if (filterBy.txt) {
          const regex = new RegExp(filterBy.txt, 'i')
          filteredToys = filteredToys.filter((toy) => regex.test(toy.name))
        }
        if (filterBy.inStock === 'inStock') {
          filteredToys = filteredToys.filter((toy) => toy.inStock)
        } else {
          filteredToys = filteredToys.filter((toy) => !toy.inStock)
        }
        if (filterBy.label.length) {
          filteredToys = filteredToys.filter((toy) =>
            filterBy.label.every((label) => toy.labels.find((toyLabel) => toyLabel === label))
          )
        }
        return filteredToys
      } else return toys
    },
  },
  mutations: {
    load(state, { toys }) {
      state.toys = toys
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },
  },
  actions: {
    loadToys({ commit }) {
      toyService.query().then((toys) => {
        commit({ type: 'load', toys })
      })
    },
    setFilter({ commit }, { filterBy }) {
      commit({ type: 'setFilter', filterBy })
    },
  },
}
