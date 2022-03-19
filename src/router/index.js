import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import home from '../views/home.vue'
import toyShop from '../views/toy-shop.vue'
import dashboard from '../views/dashboard.vue'
import toyDetails from '../views/toy-details.vue'
import toyEdit from '../components/toy-edit.vue'
import loginPage from '../views/login.vue'
import signUpPage from '../views/signup.vue'
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
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
    },
    {
      path: '/login',
      name: 'login-page',
      component: loginPage,
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: signUpPage,
    },
    {
      path: '/toy/:id',
      name: 'toy-details',
      component: toyDetails,
    },
    {
      path: '/toy/edit/:id?',
      name: 'toy-edit',
      component: toyEdit,
    },
  ],
})

export default router
