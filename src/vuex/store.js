/* 
vuex最核心管理对象store
*/
import Vue from 'vue'
import Vuex, {Store} from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
// import getters from './getters'
import msite from './modules/msite'
import user from './modules/user'
import shop from './modules/shop'
// 声明使用vue插件
Vue.use(Vuex)


export default new Store({
  state,
  mutations,
  actions,
  modules: {
    msite: msite,
    user: user,
    shop: shop,
  }
})