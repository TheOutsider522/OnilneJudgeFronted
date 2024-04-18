import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// 完整引入ArcoDesign组件库
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

import pinia from '@/stores'

import '@/access'

import 'bytemd/dist/index.css'

import '@/util/request'

const app = createApp(App)

app.use(router)

// 挂载ArcoDesign组件库
app.use(ArcoVue)

app.use(pinia)

app.mount('#app')
