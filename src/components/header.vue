<template>
    <div>
        <div class="page-cover"
            v-if="show&&fixHead"
            @click="showMenus">
        </div>
        <header :class="{'show':show&&fixHead,'fix-header':fixHead,'no-fix':!fixHead}" id="hd">
            <div class="nv-toolbar">
                <div class="iconfont icon-menu"
                        @click="openMenu"
                        v-if="fixHead">
                </div>
                <span v-text="pageType"></span>
                <router-link to="/add">
                  <i class="num" v-if="messageCount > 0"> {{messageCount}}</i>
                  <i v-if="needAdd" v-show="!messageCount || messageCount <= 0"
                    class="iconfont icon-plan"></i>
                </router-link>

            </div>
        </header>
        <nv-menu :show-menu="show"
            :page-type="pageType"
            :nick-name="nickname"
            :profile-url="profileimgurl"
            v-if="fixHead" ></nv-menu>
    </div>
</template>

<script>
  import $ from 'webpack-zepto';
  import { mapGetters } from 'vuex'
  export default {
      replace: true,
      props: {
          pageType: String,
          fixHead: Boolean,
          messageCount: Number,
          needAdd: {
              type: Boolean,
              default: true
          }
      },
      data() {
          return {
              nickname: '',
              profileimgurl: '',
              show: false
          };
      },
      computed: {
        ...mapGetters({
          userInfo: 'getUserInfo'
        })
      },
      methods: {
          openMenu() {
              $('html, body, #page').addClass('scroll-hide');
              this.show = !this.show;
          },
          showMenus() {
              this.show = !this.show;
              $('html, body, #page').removeClass('scroll-hide');
          }
      },
      components: {
          'nvMenu': require('./menu.vue')
      }
  };
</script>
<style lang="styl">
  body
    margin 0
  a
    text-decoration: none
  .icon-menu
    margin-left: 10px
  .icon-plan
    margin-right 10px
    color #2c3e50
  #hd {
    border-bottom: 1px solid #e8e8e8;
    &.fix-header {
      width: 100%;
      background-color: rgba(255, 255, 255, 0.95);
      position: fixed;
      top: 0;
      left: 0;
      transition: all .3s ease;
      box-shadow: 0 0 4px rgba(0,0,0,0.25);
      z-index: 6;
    }
    &.no-fix {
      width: 100%;
      background-color: #fff;
      overflow: hidden;
    }
    &.show {
      transform: translateX(200px);
    }
  }
  .nv-toolbar {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    color: #2c3e50
    &>span {
      display: block;
      text-align: center;
      height: 100%;
      line-height: 44px;
      font-size: 16px;
      width: 100%;
      position: relative;
      z-index: 0;
    }
    .num {
      background-color: #80bd01;
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 20px;
      vertical-align: middle;
      text-align: center;
      border-radius: 50%;
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 10;
    }
    .add-icon{
      color: #42b983;
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 10;
      padding: 5px 15px;
      border-radius: 5px;
    }
  }
  .scroll-hide{
    height: 100%;
    overflow: hidden;
  }
.page-cover {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .4);
    z-index: 7;
}
</style>
