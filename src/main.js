import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/style.css'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const app = createApp(App)

// register globally
app.config.globalProperties.$filters = {
  currencyUSD(amount) {
    return '$' + amount
  },
}

// app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
