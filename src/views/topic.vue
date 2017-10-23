<template>
  <div>
    <nv-head page-type="主题详情"
    :show-menu="showMenu"
    :need-add="true"
    :fix-head="true"></nv-head>
    <div class="page" v-if="topic">
      <h4 v-text="topic.title"></h4>
      <div class="author">
        <div>
          <router-link :to="{name:'user', params:{loginname:topic.author.loginname}}">
            <img :src="topic.author.avatar_url" class="avatar" />
          </router-link>
          <span v-text="topic.author.loginname"></span>
        </div>
        <div>
          <span class="tag"
            :class="getTabInfo(topic.tab, topic.good, topic.top, true)"
            v-text="getTabInfo(topic.tab, topic.good, topic.top, false)">
          </span>
          <div class="view-count">{{topic.visit_count}}浏览</div>
        </div>
      </div>
      <div v-html="topic.content" class="markdown-body"></div>
      <div class="reply">
        <div class="reply-title">{{topic.reply_count}}回复</div>
        <section class="reply-list">
          <ul>
            <li v-for="(item,index) in topic.replies">
              <div>
                <router-link :to="{name:'user', params:{loginname:item.author.loginname}}"><img class="head" :src="item.author.avatar_url"/></router-link>
                <span>{{item.author.loginname}}</span>
                <span class="floor">#{{index+1}}楼</span>
                <span><span class="floor">·发布于</span>{{dateParse(item.create_at)}}</span>
              </div>
              <div v-html="item.content"></div>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <nv-top></nv-top>
  </div>
</template>
<script>
  import nvHead from '../components/header.vue'
  import nvTop from '../components/backtotop.vue'
  import superagent from 'superagent'
  import {API_URL} from '../../constant.js'
  import utils from '../libs/utils.js'
  export default {
    data() {
      return {
        showMenu: true,
        topic: ''
      }
    },
    mounted() {
      superagent.get(`${API_URL}/topic/${this.$route.params.id}`).end((error,response)=>{
        this.topic = response.body.data
      })
    },
    methods: {
      getTabInfo(tab, good = false, top, isClass) {
          return utils.getTabInfo(tab, good, top, isClass);
      },
      dateParse(time){
        return utils.dateParse(time)
      }
    },
    components: {
      nvHead,
      nvTop
    }
  }
</script>
<style lang="styl" scoped>
  .page
    padding 45px 10px 10px 10px
  .author
    width: 100%
    display: flex;
    justify-content: space-between;
    padding 10px
    border-bottom 1px solid #e3e3e3
    margin-bottom 10px
    /*box-sizing border-box*/
  .avatar
    width: 40px
    height: 40px
    border-radius: 50%
    vertical-align: middle

  .author .tag
    color #fff
    padding 2px 16px
    font-size 12px
    border-radius 4px
    .author
    &.top
      background: #E74C3C;
    &.ask
      background: #3498DB;
    &.good
      background: #E67E22;
    &.job
      background: #9B59B6;
    &.share
      background: #1ABC9C;
  .view-count
    font-size 11px
    color #34495e
    margin-top 8px
  .reply-title
    padding 10px
    border-bottom 1px solid #e3e3e3
    margin-bottom 10px
  .head
    width 30px
    height 30px
    border-radius 3px
    display inline-block
    vertical-align middle
    margin-right 5px
  .reply ul
    padding 0

    li
      list-style none
      padding 10px 0px
      border-bottom 1px solid #d4d4d4
  .floor
    color #08c
</style>
