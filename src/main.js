import './assets/main.scss'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import locale from 'element-plus/dist/locale/zh-cn.js'

createApp(App).use(store).use(router).use(ElementPlus,{locale}).mount('#app')
