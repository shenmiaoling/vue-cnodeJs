<style lang="stylus">
  body
    margin 0
  .login-form
    text-align center
    background linear-gradient(#DBD5A4,#649173)
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    bottom 0
    right 0
  .login-img
    width 50%
    display block
    margin 0 auto
    padding-top 45px
  .login-input
    border none
    border-bottom 1px solid rgb(100, 145, 115)
    background-color rgba(255,255,255,.5)
    width 80%
    display block
    margin 0 auto
    padding 5px
    border-radius 5px
    margin-top 20%
    margin-bottom 10px
  .login-btn
    border none
    width 82%
    border-radius 5px
    background #649173
    color white
    font-size 18px
    line-height 2
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header{
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
<template>
  <div class="login-form">
    <img class="login-img" src='../assets/cnodejs.png'/>
    <form @submit="handleLogin">
      <input class="login-input" type="text" placeholder="AccessToken" v-model="token"maxlength="36">
      <button class="login-btn">登录</button>
    </form>
    <div>
      <transition name="modal">
        <div class="modal-mask" v-show="showModal" @click="showModal=false">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                  提示
              </div>
              <div class="modal-body">
                  {{tipText}}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import $ from 'webpack-zepto'
import { API_URL } from '../../constant.js'
import superagent from 'superagent'
export default {
    data(){
      return {
        showModal: false,
        token:"",
        tipText:''
      }
    },
    methods:{
      handleLogin(e){
        e.preventDefault()
        if (this.token==="") {
          this.tipText = "AccessToken 不能为空！"
          this.showModal = true
        }else{
          superagent.post(`${API_URL}/accesstoken`).send({ accesstoken: this.token})
          .end((error,response)=>{
            if (response.status===200) {
              let user = {
                loginname: response.body.loginname,
                avatar_url: response.body.avatar_url,
                userId: response.body.id,
                token: this.token
            };
            sessionStorage.user = JSON.stringify(user);
            this.$store.dispatch('setUserInfo', user);
            let redirect = decodeURIComponent(this.$route.query.redirect || '/');
            this.$router.push({
                path: redirect
            });
            }
            this.showModal = true
            var errorMsg = JSON.parse(response.text)
            this.tipText = errorMsg.error_msg
            console.log(response)
          })
        }
      }
    }
  }
</script>
