import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(store).use(router).user(ElementPlus).mount('#app')
