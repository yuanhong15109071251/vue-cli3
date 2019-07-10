import {
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT
} from '../mutation-types'
import {
  reqShopInfo,reqShopRatings,reqShopGoods
} from '../../api'
import Vue from 'vue'
const state={
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
}
const mutations={
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [ADD_FOOD_COUNT](state, food) {
    if(!food.hasOwnProperty('count')){
      //如果没有/不存在 count 判断food里面有没有count这个属性
       // 给food对象添加一个新的属性 属性名为count 值为1 
       // 给一个有数据绑定的对象 新添加一个属性他是没有数据绑定的  !food.count
      //food 是一个响应式的对象 就是对象里面的属性发生改变/本身变了 界面就会更新
       //food.count=1

       //添加一个响应式的对象 确保新属性也是响应式的 界面也会更新
       Vue.set(food,"count",1) //属性名是一个字符串 如果不给他加引号 就找不到这个 就会以为他是个变量
       
    }else{
      food.count++
    }
  },
  [REDUCE_FOOD_COUNT](state, food) {
    if(food.count>0){
      //不能小于0
      food.count--
    }
  },
}
const actions={
  // 异步获取商家信息
async getShopInfo({commit}, cb) {
  const result = await reqShopInfo()
  if(result.code===0) {
    const info = result.data
    info.score = 3.5
    commit(RECEIVE_INFO, {info})
    cb && cb()
  }
},

// 异步获取商家评价列表
async getShopRatings({commit}, cb) {
  const result = await reqShopRatings()
  if(result.code===0) {
    const ratings = result.data
    commit(RECEIVE_RATINGS, {ratings})

    cb && cb()
  }
},

// 异步获取商家商品列表
async getShopGoods({commit}, cb) {
  const result = await reqShopGoods()
      if(result.code===0) {
        const goods = result.data
        commit(RECEIVE_GOODS, {goods})
        // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
        cb && cb()
      }
   },
   updateFoodCount({commit},{isAdd,food}){
     //看到底增加还是减少 isAdd
     if(isAdd){
       //如果增加
      commit(ADD_FOOD_COUNT,food)
     }else{
      commit(REDUCE_FOOD_COUNT,food)
     }
  }
}
const getters ={}
export default{
  state,
  mutations,
  actions,
  getters
}