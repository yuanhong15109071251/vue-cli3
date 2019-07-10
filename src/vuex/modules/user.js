import {
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN,
} from '../mutation-types'
import {
  reqAutoLogin
} from '../../api'
const state={
  user:{},//用户登录信息对象
  token:localStorage.getItem('token_key'),//一定要初始的时候读
}
const mutations={
  [RECEIVE_USER](state, {user}) {
    state.user = user
  },
  [RESET_USER](state) {
    state.user = {}
  },
  [RECEIVE_TOKEN](state,{token}) {
    state.token = token
  },
  [RESET_TOKEN](state) {
    state.token = ''
  }
}
const actions={
   //记录user 持久化保存token' 在state中保存user
   recordUser({ commit }, user) {
    //将user中的token保存到localStorage中    
    localStorage.setItem("token_key", user.token);
    //将token保存到state中
    commit(RECEIVE_TOKEN,{token:user.token})
    //删除对象中指定的属性 指定属性名的属性
    delete user.token
    //将user保存到state中
    commit(RECEIVE_USER, { user });
  },
  //退出登录
  logout({ commit }) {
    //c重置状态中的user
    commit(RESET_USER);
   // 重置状态中的token
   commit(RESET_TOKEN)
    //清除localStorage中的token
    localStorage.removeItem("token_key");
  },
  //自动登录
  async autoLogin({commit,state}){
    //如果有token就发送自动登录的请求 获取 user的信息
    const token =state.token
    if(token){
      //如果有值
      const result = await reqAutoLogin()
      if(result.code===0){
        //登录成功
        const user=result.data
        //接收user
        commit(RECEIVE_USER,{user})
      }
    }
  },
}
const getters ={}
export default{
  state,
  mutations,
  actions,
  getters
}