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
        } else if (filterBy.inStock === 'outOfStock')
          filteredToys = filteredToys.filter((toy) => !toy.inStock)
        return filteredToys
      } else return toys
    },
  },
  mutations: {
    load(state, { toys }) {
      state.toys = toys
    },
  },
  actions: {
    loadToys({ commit }) {
      toyService.query().then((toys) => {
        commit({ type: 'load', toys })
      })
    },
  },
}
