/* 
包含n个用于间接修改状态数据的方法的对象
*/
// import { reqAddress, reqCategorys, reqShops ,reqAutoLogin,reqShopInfo,reqShopRatings,reqShopGoods} from "../api";

// import {
//   RECEIVE_ADDRESS,
//   RECEIVE_CATEGORYS,
//   RECEIVE_SHOPS,
//   RECEIVE_USER,
//   RESET_USER,
//   RECEIVE_TOKEN,
//   RESET_TOKEN,
//   RECEIVE_INFO,
//   RECEIVE_RATINGS,
//   RECEIVE_GOODS
// } from "./mutation-types";
import store from './store'
// import Cookies from 'js-cookie'
export default {
  // /* 
  // 获取当前地址的异步action
  // */
  // async getAddress({ commit, state }) {
  //   const { longitude, latitude } = state;
  //   // 发异步ajax请求
  //   const result = await reqAddress(longitude, latitude);
  //   // 有了结果后, 提交mutation
  //   if (result.code === 0) {
  //     const address = result.data;
  //     commit(RECEIVE_ADDRESS, address);
  //   }
  // },

  // /* 
  // 获取分类列表的异步action
  // */
  // async getCategorys({ commit }, callback) {
  //   // 发异步ajax请求
  //   const result = await reqCategorys();
  //   // 有了结果后, 提交mutation
  //   if (result.code === 0) {
  //     const categorys = result.data;
  //     commit(RECEIVE_CATEGORYS, categorys);
  //     // 在更新状态数据后执行回调函数
  //     typeof callback === "function" && callback(); // 发通知
  //   }
  // },

  // /* 
  // 获取商家列表的异步action
  // */
  // async getShops({ commit, state }) {
  //   const { longitude, latitude } = state;
  //   // 发异步ajax请求
  //   const result = await reqShops({ longitude, latitude });
  //   // 有了结果后, 提交mutation
  //   if (result.code === 0) {
  //     const shops = result.data;
  //     commit(RECEIVE_SHOPS, shops);
  //   }
  // },
  // //记录user 持久化保存token' 在state中保存user
  // recordUser({ commit }, user) {
  //   //将user中的token保存到localStorage中    
  //   localStorage.setItem("token_key", user.token);
  //   //将token保存到state中
  //   commit(RECEIVE_TOKEN,{token:user.token})
  //   //删除对象中指定的属性 指定属性名的属性
  //   delete user.token
  //   //将user保存到state中
  //   commit(RECEIVE_USER, { user });
  // },
  // //退出登录
  // logout({ commit }) {
  //   //c重置状态中的user
  //   commit(RESET_USER);
  //  // 重置状态中的token
  //  commit(RESET_TOKEN)
  //   //清除localStorage中的token
  //   localStorage.removeItem("token_key");
  // },
  // //自动登录
  // async autoLogin({commit,state}){
  //   //如果有token就发送自动登录的请求 获取 user的信息
  //   const token =state.token
  //   if(token){
  //     //如果有值
  //     const result = await reqAutoLogin()
  //     if(result.code===0){
  //       //登录成功
  //       const user=result.data
  //       //接收user
  //       commit(RECEIVE_USER,{user})
  //     }
  //   }
  // },
// // 异步获取商家信息
// async getShopInfo({commit}, cb) {
//   const result = await reqShopInfo()
//   if(result.code===0) {
//     const info = result.data
//     info.score = 3.5
//     commit(RECEIVE_INFO, {info})

//     cb && cb()
//   }
// },

// // 异步获取商家评价列表
// async getShopRatings({commit}, cb) {
//   const result = await reqShopRatings()
//   if(result.code===0) {
//     const ratings = result.data
//     commit(RECEIVE_RATINGS, {ratings})

//     cb && cb()
//   }
// },

// // 异步获取商家商品列表
// async getShopGoods({commit}, cb) {
//   const result = await reqShopGoods()
//   if(result.code===0) {
//     const goods = result.data
//     commit(RECEIVE_GOODS, {goods})
//     // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
//     cb && cb()
//   }
// },
};
