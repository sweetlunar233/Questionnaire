import './assets/main.scss'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/dist/locale/zh-cn.js'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入 vant
import { RadioGroup, Radio } from 'vant'; 
import { Checkbox, CheckboxGroup } from 'vant';
import { Divider } from 'vant';

import VueCookies from 'vue-cookies'

//引入Echarts
import * as echarts from 'echarts';
//引入打印
import Print from 'vue3-print-nb';

const app = createApp(App)

app.config.globalProperties.$echarts = echarts // 全局挂载echarts

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store).use(router).use(ElementPlus,{locale}).use(RadioGroup).use(Radio).use(Checkbox).use(CheckboxGroup).use(Divider).use(echarts).use(Print).mount('#app')


app.config.globalProperties.$cookies = VueCookies
VueCookies.config("1d");