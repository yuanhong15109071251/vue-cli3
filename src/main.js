import Vue from 'vue'

import App from './App.vue'
import router from './router'
import {Button} from 'mint-ui'
import store from './vuex/store'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import  './mock/mockServe'
import CartControl from './components/CartControl/CartControl.vue'
// Vue.prototype.$ajax = ajax


// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component(Button.name,Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  /* components: {
    App
  },
  template: '<App/>' */
  // render: createElement => createElement(App)  // <App/>
  render: h => h(App),  // <App/>
  router, // 配置路由器
  store, // 配置vuex
})
