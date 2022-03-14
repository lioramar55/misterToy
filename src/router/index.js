import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home.vue'
import toyShop from '../views/toy-shop.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/shop',
      name: 'shop',
      component: toyShop,
    },
  ],
})

export default router
