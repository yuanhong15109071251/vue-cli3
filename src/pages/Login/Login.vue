<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!isRightPhone || computeTime>0" class="get_verification" :class="{right_phone_number:isRightPhone}" @click.prevent="sendCode">
                {{computeTime>0 ?`已发送验证码(${computeTime}s)`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码"  v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text':'password'" maxlength="8" placeholder="密码" v-model="pwd"> 
                 <div class="switch_button off" @click="isShowPwd=!isShowPwd" :class="isShowPwd? 'on':'off'"><!--//赋一个新的值 取反后的值 -->
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:5000/captcha?" alt="captcha" @click="updatwCaptcha" ref='captcha'>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { all } from 'q';
//引入接口请求函数
import {reqSendCode,reqSmsLogin, reqPwdLogin} from '../../api'
//引入 
import {RECEIVE_USER} from '../../vuex/mutation-types'
// import { clearInterval,setInterval } from 'timers';
  export default {
    data(){
      return {
        loginWay:false,//短信登录
        phone:'',//手机号
        computeTime:0,//计时剩余时间，0就是没计时
        isShowPwd:false,//是否显示密码  默认不显示 
        code:'',//短信验证码
        name:'',//用户名
        captcha:'',//图形验证码
        pwd:'',//密码

      }
    },
    methods:{ 
      async sendCode(){
       //发送验证码 
       //设置最大剩余时间
       this.computeTime=10
       //启动计时 循环定时器 
          const intervalId=setInterval(()=>{
          this.computeTime--
          //到o时清除定时器 停止计时
          if(this.computeTime===0){
            clearInterval(intervalId)
          }
       },1000)
       //发送ajax请求 发送短信验证码
      const result=await reqSendCode(this.phone)
      if(result.code===0){
        //成功  短信发送成功
        alert('短信已发送成功')

      }else{
        //失败、
        alert(result.msg)
      }
      },
      updatwCaptcha(){
        //更新一次性图形验证码显示   $refs是一个包含标签对象  每个标签对象属性名是ref 
        //给img指定一个新的src的值   携带一个新的时间戳的参数  值是当前时间 参数名随便起
        this.$refs.captcha.src='http://localhost:5000/captcha?time='+Date.now()
      },
      //发送登录的请求
      async login(){
        //取出相关的数据
        const {loginWay,phone,code,name,pwd,captcha}= this
        let result
        if(!loginWay){
          //发密码登录的请求
         result = await reqPwdLogin({ name,pwd,captcha })
        }else{
          //发短信登录的请求
         result = await reqSmsLogin(phone,code)
        }
        //根据结果进行响应处理 
        if(result.code===0){
          //登录成功
          //将user信息保存到state中
          const user = result.data
          //要触发mutation调用 必须调用commit 通过$store
          //dispatch 1.将token存到localStorage里 2.将user存到状态里
          this.$store.dispatch('recordUser',user)
          //跳转的profile个人中心
          this.$router.replace('/profile')
      }else{
         //登录失败
         alert(result.msg)
      }
    },     
   },
   computed:{
        //是否是一个正确的手机号
        isRightPhone(){
          return /^1\d{10}$/.test(this.phone)//传参数就是用来去匹配那个字符串 
        }
      }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'

  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                 color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                   transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>