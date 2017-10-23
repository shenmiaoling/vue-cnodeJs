<template>
  <div class="user-info">
    <ul class="login-no" v-if="!userInfo.loginname">
      <li class="login" @click="goEnter"><a><i class="iconfont icon-login"></i>登录</a></li>
    </ul>
    <div class="login-yes" v-if="userInfo.loginname" @click="goUser">
      <div class="avatar"><img v-if="userInfo.avatar_url" :src="userInfo.avatar_url"></div>
      <div class="info">
        <p v-if="userInfo.loginname" v-text="userInfo.loginname"></p>
      </div>
      <div><p class="iconfont icon-goto"></p></div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    replace : true,
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
    },
    methods: {
      goEnter() {
        this.$router.push({
          name: 'login',
          query: {
            redirect: encodeURIComponent(this.$route.path)
          }
        })
      },
      goUser() {
        this.$parent.$parent.openMenu()
        this.$router.push({
          name: 'user',
          params: {
            loginname: this.userInfo.loginname
          }
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
/*侧边栏用户信息区域*/
.user-info {
    padding: 15px;
    font-size: 15px;
    color: #313131;
}
  .icon-goto
    font-size 14px
    color #2c3e50
  .login-no
    overflow: hidden;
    margin: 8px 9px;
    padding: 0;
    list-style-type: none;
  .login
    float: left
  .icon-login
    color: #c94343
    font-size 30px
    vertical-align middle
  .icon-login:before
    margin-right 20px
  .avatar img
    width 40px
    height 40px
    border-radius 50%
    vertical-align middle
  .info
    font-size 12px
    color #2c3e50
  .login-yes
    width: 100%
    display: flex;
    justify-content: space-between;
</style>
