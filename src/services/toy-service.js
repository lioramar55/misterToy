import axios from 'axios'
import { storageService } from './async-storage.service.js'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']
const KEY = 'toysDB'

storageService.query(KEY).then((toys) => (!toys ? _storeDemoData() : ''))

_storeDemoData()

function query() {
  return storageService.query(KEY)
}

function getById(id) {
  return storageService.get(KEY, id)
}

function save(toyToSave) {
  if (toyToSave._id) {
    return storageService.put(KEY, toyToSave)
  } else {
    return storageService.post(KEY, toyToSave)
  }
}
function remove(id) {
  return storageService.remove(KEY, id)
}

function _storeDemoData() {
  const demoData = [
    {
      _id: 3833,
      name: 'orci sed',
      price: 45,
      type: 'Funny',
      createdAt: '1973-07-11T13:30:49.032Z',
      labels: ['Doll', 'Puzzle', 'Outdoor'],
      inStock: true,
    },
    {
      _id: 3834,
      name: 'sollicitudin curabitur',
      price: 23,
      type: 'Educational',
      createdAt: '1981-08-27T15:09:21.294Z',
      labels: ['On wheels', 'Box game', 'Art'],
      inStock: true,
    },
    {
      _id: 3835,
      name: 'aenean adipiscing',
      price: 16,
      type: 'Funny',
      createdAt: '1986-11-02T20:23:58.834Z',
      labels: ['Baby', 'Doll'],
      inStock: false,
    },
    {
      _id: 3836,
      name: 'odio vel',
      price: 46,
      type: 'Educational',
      createdAt: '1995-03-29T07:57:16.160Z',
      labels: ['On wheels', 'Puzzle', 'Outdoor'],
      inStock: true,
    },
    {
      _id: 3837,
      name: 'pulvinar amet',
      price: 74,
      type: 'Educational',
      createdAt: '1977-04-25T21:57:19.388Z',
      labels: ['Puzzle'],
      inStock: true,
    },
    {
      _id: 3838,
      name: 'lectus mattis',
      price: 49,
      type: 'Adult',
      createdAt: '1994-06-19T23:12:01.759Z',
      labels: ['On wheels', 'Box game', 'Art'],

      inStock: true,
    },
    {
      _id: 3839,
      name: 'sollicitudin pharetra',
      price: 42,
      type: 'Funny',
      createdAt: '1983-05-05T11:39:48.470Z',
      labels: ['Art'],

      inStock: true,
    },
    {
      _id: 3840,
      name: 'tincidunt dolor',
      price: 62,
      type: 'Educational',
      createdAt: '1983-11-20T03:59:06.177Z',
      labels: ['Box game', 'Art', 'Baby'],
      inStock: true,
    },
    {
      _id: 3841,
      name: 'turpis in',
      price: 9,
      type: 'Educational',
      createdAt: '1986-05-08T09:40:52.307Z',
      labels: ['On wheels'],
      inStock: true,
    },
    {
      _id: 3842,
      name: 'dui mattis',
      price: 34,
      type: 'Educational',
      createdAt: '1989-04-30T10:25:14.765Z',
      labels: ['Art', 'Baby', 'Doll'],
      inStock: false,
    },
    {
      _id: 3843,
      name: 'rutrum nullam',
      price: 23,
      type: 'Funny',
      createdAt: '1980-03-03T19:33:09.854Z',
      labels: ['Box game'],
      inStock: true,
    },
    {
      _id: 3844,
      name: 'lectus id',
      price: 42,
      type: 'Educational',
      createdAt: '1987-04-20T12:41:47.897Z',
      labels: ['On wheels'],
      inStock: false,
    },
    {
      _id: 3845,
      name: 'lectus ac',
      price: 11,
      type: 'Educational',
      createdAt: '1991-05-13T15:44:21.389Z',
      labels: ['Baby', 'Doll'],
      inStock: true,
    },
    {
      _id: 3846,
      name: 'mattis sed',
      price: 18,
      type: 'Educational',
      createdAt: '1996-02-14T03:11:46.518Z',
      labels: ['On wheels', 'Box game', 'Art'],
      inStock: true,
    },
    {
      _id: 3847,
      name: 'elit sollicitudin',
      price: 74,
      type: 'Adult',
      createdAt: '1996-06-03T00:25:41.428Z',
      labels: ['Doll', 'Puzzle', 'Outdoor'],
      inStock: false,
    },
    {
      _id: 3848,
      name: 'eget placerat',
      price: 95,
      type: 'Funny',
      createdAt: '1975-08-03T04:45:44.718Z',
      labels: ['Art'],
      inStock: false,
    },
    {
      _id: 3849,
      name: 'sit sollicitudin',
      price: 17,
      type: 'Educational',
      createdAt: '1984-09-30T23:03:14.758Z',
      labels: ['On wheels', 'Puzzle', 'Outdoor'],
      inStock: false,
    },
    {
      _id: 3850,
      name: 'aliquam eget',
      price: 76,
      type: 'Funny',
      createdAt: '1984-02-18T21:41:01.529Z',
      labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll'],
      inStock: false,
    },
    {
      _id: 3851,
      name: 'porta massa',
      price: 39,
      type: 'Educational',
      createdAt: '1980-03-16T09:22:35.017Z',
      labels: ['On wheels', 'Puzzle', 'Outdoor'],
      inStock: true,
    },
    {
      _id: 3852,
      name: 'fringilla lacus',
      price: 49,
      type: 'Educational',
      createdAt: '1979-01-04T15:01:56.335Z',
      labels: ['Doll', 'Puzzle', 'Outdoor'],
      inStock: true,
    },
  ]
  storageService.store(KEY, demoData)
}

export default {
  query,
  getById,
  save,
  remove,
}
