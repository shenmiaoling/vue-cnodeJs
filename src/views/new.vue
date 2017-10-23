<style lang="stylus" scoped>
  .post
    margin 50px 10px 10px 10px
    padding 10px
    background-color #f6f6f6
    border-radius 3px
  .catagory-label
    border-left 3px solid #2c3e50
    padding-left 10px
  .post-btn
    border none
    color #fff
    background-color #2c3e50
    border-radius 4px
    padding 5px 15px
    float right
  .catagory
    padding-bottom 15px
    border-bottom 1px solid #d4d4d4
  .title
    margin-top 10px
  .title-input
    border none
    border-bottom 1px solid #d4d4d4
    background-color transparent
  .content
    margin-top 20px
  .md-editor
    width 100%
    display block
    margin 0 auto
    min-height 200px
    border-color #d4d4d4
    resize none
    border-radius 3px
    box-shadow: inset 2px 2px 2px 0px #dddddd
    overflow: auto;
    padding: 7px 10px;
  .user-tabs
    width 100%
    display: flex;
    justify-content: space-between;
  .item
    width 50%
    text-align center
    padding: 5px
    background-color #f6f6f6
  .br
    border-right: 1px solid #d4d4d4
  .selected
    background-color #2c3e50
    color white
    border-radius 3px
  .content textarea
    margin-top 20px
  code
    color #f66
  .err
    border 1px solid #D8000C
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
  <div class="post">
    <nv-head page-type="发表"
            :show-menu="false"
            :fix-head="true">
    </nv-head>
    <div class="catagory">
      <span>选择分类：</span>
      <select class="select-catagory" v-model="topic.tab">
        <option value="share">分享</option>
        <option value="ask">问答</option>
        <option value="job">招聘</option>
      </select>
      <button class="post-btn" @click="handlePost">发布</button>
    </div>
    <div class="title">
      <span class="catagory-label">标题：</span>
      <input type="text" class="title-input" placeholder="标题字数10字以上" v-model="topic.title" :class="{'err':err=='title'}">
    </div>
    <section class="content">
      <div class="user-tabs">
        <div class="item br" :class='{"selected":selectItem === 1}' @click="changeItem(1)">正文</div>
        <div class="item" :class='{"selected":selectItem === 2}' @click="changeItem(2)">预览</div>
      </div>
      <textarea class="md-editor" v-show="selectItem==1" :value="input" @input="update" placeholder="支持Markdown格式" v-model="topic.content" :class="{'err':err=='content'}"></textarea>
      <div v-html="compiledMarkdown" v-show="selectItem==2"></div>
    </section>
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
  import nvHead from '../components/header.vue'
  import marked from 'marked'
  import _ from 'underscore'
  import {mapGetters} from 'vuex'
  import superagent from 'superagent'
  import {API_URL} from '../../constant.js'
  export default {
    data(){
      return {
        selectItem:1,
        input: '',
        topic: {
          tab: 'share',
          title: '',
          content: ''
        },
        err:'',
        tipText:'',
        showModal:true
      }
    },
    computed: {
      ...mapGetters({
          userInfo: 'getUserInfo'
      }),
      compiledMarkdown: function () {
        return marked(this.input, { sanitize: true })
      }
    },
    methods:{
      changeItem(idx){
        this.selectItem = idx
      },
      update: _.debounce(function (e) {
          this.input = e.target.value
        }, 300),
      handlePost(){
        let title = this.topic.title
        let contents = this.topic.content

        if (!title || title.length < 10) {
            this.err = 'title';
            return false;
        }
        if (!contents) {
            this.err = 'content';
            return false;
        }
        superagent.post(`${API_URL}/topics`).send({...this.topic,accesstoken: this.userInfo.token}).end((error,response)=>{
          if (response.status==200) {
            this.$router.push('/list')
          }else{
            console.log('ll')
          }
        })
      }
    },
    components:{
      nvHead
    }
  }
</script>
