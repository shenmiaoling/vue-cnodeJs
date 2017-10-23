<template>
  <section id="sideBar" class="nav-list" :class="{'show':showMenu}">
    <user-info></user-info>
    <section class="list-ul">
      <router-link :to="{'name':'list',query:{tab:'all'}}"><i class="iconfont icon-all-copy item" @click="hideMenu">全部</i></router-link>
      <router-link :to="{'name':'list',query:{tab:'good'}}"><i class="iconfont icon-good item" @click="hideMenu">精华</i></router-link>
      <router-link :to="{'name':'list',query:{tab:'share'}}"><i class="icon-icon iconfont item" @click="hideMenu">分享</i></router-link>
      <router-link :to="{'name':'list',query:{tab:'ask'}}"><i class="icon-ask iconfont item" @click="hideMenu">问答</i></router-link>
      <router-link :to="{'name':'list',query:{tab:'job'}}"><i class="icon-contractjob iconfont item line" @click="hideMenu">招聘</i></router-link>
      <router-link :to="{'name':'list',query:{tab:'message'}}"><i class="icon-news iconfont item" @click="hideMenu">消息</i></router-link>
      <router-link :to="{'name':'list',query:{tab:'about'}}"><i class="icon-about iconfont item" @click="hideMenu">关于</i></router-link>
    </section>
  </section>
</template>
<script>
  export default {
    replace: true,
    props: ['showMenu','pageType', 'nickName', 'profileUrl'],
    data(){
      return {
        show: true
      }
    },
    methods: {
      hideMenu(){
        this.$parent.showMenus()
      }
    },
    components: {
      'userInfo': require('./user-info.vue')
    }
  }
</script>
<style lang="styl" scoped>
  .show {
    transform: translateX(200px);
  }
  .nav-list {
    position: fixed;
    top: 0;
    bottom: 0;
    left: -200px;
    width: 200px;
    background-color: #fff;
    color: #313131;
    transition: all .3s ease;
    z-index: 99;
  }
  .list-ul
    margin: 0 24px;
    border-top: 1px solid #d4d4d4;
    overflow: hidden;
    padding-top: 9%;
    color #2c3e50
  .item
    display: block;
    font-size: 14px;
    font-weight: 200;
    padding: 9% 0;
    text-align: left;
    text-indent: 1px;
    line-height: 15px;
    color: #313131;
    font-weight: 700;
  .item:before {
    margin-right: 30px;
}
  .line
    border-bottom 1px solid #d4d4d4
  a
    text-decoration none
</style>
