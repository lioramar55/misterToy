import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import home from '../views/home.vue'
import toyShop from '../views/toy-shop.vue'
import toyDetails from '../components/toy-details.vue'
import toyEdit from '../components/toy-edit.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/toy',
      name: 'shop',
      component: toyShop,
    },
    {
      path: '/toy/:id',
      name: 'toy-details',
      component: toyDetails,
    },
    {
      path: '/toy/edit/:id',
      name: 'toy-edit',
      component: toyEdit,
    },
  ],
})

export default router
