<style lang="stylus" scoped>
.scroll-top
  position fixed
  top 50%
  right 10px
  color #34495e
  border-radius 50%
  .icon-gotop
    font-size 50px
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
<template>
  <div class="scroll-top">
    <transition name="fade">
      <div  v-show="show" class="iconfont icon-gotop" @click="goTop"></div>
    </transition>
  </div>

</template>

<script>
  import $ from 'webpack-zepto'
  export default {
    replace: true,
    data() {
      return {
        show: false
      }
    },
    mounted() {
      $(window).on('scroll', ()=>{
        if($(window).scrollTop()>100){
          this.show = true;
        }else {
          this.show = false;
        }
      })
    },
    beforeDestory() {
      $(window).off('scroll');
    },
    methods: {
      goTop() {
       var animation = setInterval(()=>{
        window.scrollBy(0,-100)
        if ($('body').scrollTop()===0) {
          clearInterval(animation)
        }
      },4)

        this.show = false
      }
    }
  }

</script>

<style lang="styl">

</style>
