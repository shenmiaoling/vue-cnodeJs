<template>
  <div>
    <nv-head :page-type="getTitleStr(searchKey.tab)"
    ref="head"
    :fix-head="true"
    :need-add="true">
    </nv-head>
    <nv-loading v-if="loading"></nv-loading>
    <section id="page">

      <ul class="post-list">
        <li v-for="item in topics" :key="item.id">
          <router-link :to="{name:'topic', params:{id:item.id}}">
            <h3 v-text="item.title"
            :class="getTabInfo(item.tab,item.good,item.top,true)"
            :title="getTabInfo(item.tab,item.good,item.top,false)">
            </h3>
            <div class="content">
            <div><img class="avatar" :src="item.author.avatar_url" />
            <span class="name">
                    {{item.author.loginname}}
                  </span></div>

              <div class="info">
                <p>
                  <span class="status" v-if="item.reply_count > 0">
                    <i class="iconfont icon-comment"></i>
                    <b>{{item.reply_count}}</b>
                    /<i class="iconfont icon-view"></i>{{item.visit_count}}
                  </span>
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
    <nv-top></nv-top>
  </div>
</template>
<script>
  import $ from 'webpack-zepto'
  import _ from 'underscore'
  import superagent from 'superagent'
  import utils from '../libs/utils.js'
  import {API_URL} from '../../constant.js'
  import nvHead from '../components/header.vue'
  import nvTop from '../components/backtotop.vue'
  import nvLoading from '../components/loading.vue'
  export default {
    filters: {
      getLastTimeStr(time, isFromNow) {
        return utils.getLastTimeStr(time, isFromNow)
      }
    },
    data() {
      return {
        scroll: true,
        topics: [],
        index: {},
        loading: true,
        searchKey: {
          page: 1,
          limit: 20,
          tab: 'all',
          mdrender: true
        },
        searchDataStr: ''
      }
    },
    mounted() {
      if (this.$route.query && this.$route.query.tab) {
        this.searchKey.tab = this.$route.query.tab
      }
      if (sessionStorage.searchKey && sessionStorage.tab === this.searchKey.tab) {
        this.topics = JSON.parse(
          sessionStorage.topics)
        this.searchKey = JSON.parse(sessionStorage.searchKey)
        this.$nextTick(() => $(window).scrollTop(sessionStorage.scrollTop))
      } else {
        this.getTopics()
      }
      $(window).on('scroll',_.throttle(this.getScrollData, 300))
    },
    beforeRouteLeave(to, from, next) {
      if (to.name === 'topic') {
        sessionStorage.scrollTop = $(window).scrollTop()
        sessionStorage.topics = JSON.stringify(this.topics)
        sessionStorage.searchKey = JSON.stringify(this.searchKey)
        sessionStorage.tab = from.query.tab || 'all'
      }
      $(window).off('scroll')
      next()
    },
    beforeRouteEnter(to, from, next) {
      if (from.name !== 'topic') {
        if (sessionStorage.tab) {
          sessionStorage.removeItem('topics')
          sessionStorage.removeItem('searchKey')
          sessionStorage.removeItem('tab')
        }
      }
      next(vm=>{vm._data.loading = false})
    },
    methods: {
      getTitleStr(tab) {
        let str = '';
        switch (tab) {
          case 'share':
            str = '分享';
            break;
          case 'ask':
            str = '问答';
            break;
          case 'job':
            str = '招聘';
            break;
          case 'good':
            str = '精华';
            break;
          default:
            str = '全部';
            break;
        }
        return str;
      },
      getTabInfo(tab, good, top, isClass) {
        return utils.getTabInfo(tab, good, top, isClass)
      },
      getTopics() {
        this.loading = true
        let params = $.param(this.searchKey)
        superagent.get(`${API_URL}/topics?${params}`).end((error,response)=>{
            this.scroll = true
            this.loading = false
            this.topics = this.topics.concat(response.body.data)
        })
      },
      getScrollData() {
        if (this.scroll) {
          let totalheight = parseInt($(window).height(), 20) + parseInt($(window).scrollTop(),20)
          if ($(document).height() <= totalheight + 200) {
            this.searchKey.page += 1
            this.getTopics()
          }
        }
      }
    },
    watch: {
      '$route' (to,from) {
        if(to.query && to.query.tab) {
          this.searchKey.tab = to.query.tab
          this.topics = []
          this.index = {}
        }
        this.searchKey.page = 1;
        this.getTopics();
      }
    },
    components: {
      nvHead,
      nvTop,
      nvLoading
    }
  }
</script>
<style lang="styl" scoped>
  #page
    margin-top 60px
  #page a
    color: #2c3e50
  #page li
    list-style none
    padding 10px 15px
    border-bottom 1px solid #d5dbdb
  #page ul
    padding 0
  .post-list .content {
    width: 100%
    display: flex;
    justify-content: space-between;
}
  .status b
    color #42b983
  .avatar
    width 40px
    height 40px
    border-radius 50%
    vertical-align middle
  .info
    display inline-block
  .break {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
  .title {
        font-weight: bold;
        display: block;
        width: 100%;
        flex: 1;
        line-height: 2
        @extend .break;
    }
  .tag {
    padding: 5px 6px;
    font-size: 10px;
    font-weight: 400;
    border-radius: 4px;
    background-color: #e7e7e7;
    text-align: center;
    vertical-align: middle;
    }
h3 {
        @extend .title;
        &:before {
            content: attr(title);
            margin-right: 10px;
            margin-top: -3px;
            @extend .tag;
            color: #fff;
        }
        &.top:before {
            background: #E74C3C;
        }
        &.ask:before {
            background: #3498DB;
        }
        &.good:before {
            background: #E67E22;
        }
        &.job:before {
            background: #9B59B6;
        }
        &.share:before {
            background: #1ABC9C;
        }
    }
  a
    text-decoration none
</style>
