/* 
一个能发送ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
*/

import axios from "axios";
// const qs = require('qs')
import qs from "qs";
import store from "../vuex/store";
import router from "../router";
import {Toast} from 'mint-ui'
// 请求超时的全局配置
axios.defaults.timeout = 20000; // 20s

// 添加请求拦截器
axios.interceptors.request.use(config => {
  const { method, data } = config;

  // 如果是携带数据的post请求, 进行处理
  if (method.toLowerCase() === "post" && data && typeof data === "object") {
    config.data = qs.stringify(data); // {name: 'tom', pwd: '123'} ==> name=tom&pwd=123
  }
  //如果浏览器端有token 就自动携带token
  //1.去读localStorage里的token 2.去读state里的
  // const token = localStorage.getItem("token_key");
  // if (token) {
  //   //有token 就要携带
  //   //在配置的请求头里添加一个授权
  //   config.headers.Authorization = token;
  // }
  //如果请求配置标识了需要携带token
  const { needToken } = config.headers;
  if (needToken) {
    //取出state中的token
    const token = store.state.token;
    //如果token有值 添加token Authorization头 值为token
    if (token) {
      config.headers.Authorization = token;
    } else {
      //不发请求 抛出异常 直接进入错误处理
      const error = new Error("没有token，不用发请求");
      error.status = 401; //这是一个标识 没有授权
      throw error; //一旦到这就到响应的错误处理
    }
  }
  return config;
});

// 添加一个响应拦截器
axios.interceptors.response.use(
  response => {
    // 返回response中的data数据, 这样请求成功的数据就是data了
    return response.data;
  },
  error => {
    // 请求异常
    if (!error.response) {
      //发请求前异常
      if (error.status === 401) {
        //说明我们在发请求前就没权限 没token
        //当前还没登录 就是还没token

        //如果当前不在登录界面才需要跳转到登录界面
        if (router.currentRoute.path !== "/login") {
          //得到当前路由容器对象
          router.replace("/login");
          Toast(error.message);
        } else {
          console.log("请求前取消的请求，没有token，已经在登录界面不需要跳转");
        }
      }
    } else {
      //发请求后异常
      const status = error.response.status;
      const msg = error.message;
      if (status === 401) {
        //未授权
        if (router.currentRoute !== "/login") {
          store.dispatch("logout");
          router.replace("/login");
          Toast(error.response.data.message);
        } else {
          console.log("未授权请求，token过期了请求，在登录界面 ");
        }
        //退出登录  把数据弄掉 跳转到登录界面
      } else if (status === 404) {
        Toast("请求资源不存在");
      } else {
        Toast("请求异常: " + msg);
      }
    }

    // return error
    // return Promise.reject(error)
    return new Promise(() => {}); // 中断promise链
  }
);

export default axios;
