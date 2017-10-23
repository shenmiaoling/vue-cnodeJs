<style lang="stylus" scoped>
  .user-info
    margin-top: 45px;
    background linear-gradient(left top, #649173, #DBD5A4)
    text-align: center;
    height: 180px;
  .avatar
    margin-top 15px
    width 100px
    height 100px
    border-radius 50%
  .score
    width 50%
    float right
  .icon-score
    color #63a35c
    margin-right 5px
    font-size 20px
  .create
    width 50%
    float left
    color #2f2e2e
    font-size 12px
  .score-count
    color #505050
  .user-tabs
    width 100%
    display: flex;
    justify-content: space-between;
  .item
    width 50%
    text-align center
    padding: 10px
    font-weight bold
    background-color #f6f6f6
  .br
    border-right: 1px solid #d4d4d4
  .content
    border-top 1px solid #d4d4d4
  .selected
    color: #ff5a5f;
    border-bottom: solid 2px #ff5a5f;
  .item-list
    padding 10px
    display flex
    align-items center
  .head
    width 30px
    height 30px
    border-radius 3px
    vertical-align middle
    margin-right 8px
  .item-title
    color #08c
    text-overflow ellipsis
    white-space nowrap
    overflow hidden
  .no-data
    text-align center
    margin-top 30px
    color #729979
    font-size 20px
</style>
<template>
  <div>
    <nv-head page-type="用户信息" :fix-head="true" :show-menu="false" :need-add="true"></nv-head>
    <nv-loading v-if="loading"></nv-loading>
    <div v-else>
      <section class="user-info">
        <img :src="user.avatar_url" class="avatar">
        <div>{{user.loginname}}</div>
        <div class="create">注册时间 {{dateParse(user.create_at)}}</div>
        <div class="score"><span class="iconfont icon-score"></span><span class="score-count">{{user.score}}</span></div>
      </section>
      <section class="topics">
        <div class="user-tabs">
          <div class="item br" :class='{"selected":selectItem === 1}' @click="changeItem(1)">最近回复</div>
          <div class="item" :class='{"selected":selectItem === 2}' @click="changeItem(2)">最新发布</div>
        </div>
        <div class="content" v-for="item in currentData">
          <div class="item-list">
            <router-link :to="{name:'user',params:{loginname:item.author.loginname}}"><img :src="item.author.avatar_url" class="head"></router-link>
            <router-link :to="{name:'topic',params:{id:item.id}}"><h4 class="item-title">{{item.title}}</h4></router-link>
          </div>
        </div>
        <div class="no-data" v-show="currentData.length === 0">
          ╮(╯▽╰)╭暂无数据!
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import $ from 'webpack-zepto'
  import utils from '../libs/utils.js'
  import nvHead from '../components/header.vue'
  import superagent from 'superagent'
  import { API_URL } from '../../constant.js'
  import nvLoading from '../components/loading.vue'
  export default {
    data() {
      return {
        user: {},
        selectItem: 1,
        currentData: [],
        loading : true
      }
    },
    mounted(){
      this.getUser()
    },
    methods: {
      changeItem(idx){
        this.selectItem = idx
        this.currentData = idx === 1 ? this.user.recent_replies : this.user.recent_topics
      },
      getUser(){
        superagent.get(`${API_URL}/user/${this.$route.params.loginname}`).end((error,response)=>{
          this.user = response.body.data
          if (response.body.data.recent_replies.length > 0) {
              this.currentData = response.body.data.recent_replies;
              this.loading = false
          } else {
              this.currentData = response.body.data.recent_topics;
              this.selectItem = 2;
              this.loading = false
          }
        })
      },
      dateParse(time){
        return utils.dateParse(time)
      }
    },
    watch: {
      // 切换页面
      '$route' (to, from) {
          this.getUser();
      }
    },
    components: {
      nvHead,
      nvLoading
    }
  }
</script>

