<template>
  <div class="tabs is-centered is-fullwidth tab-position">
    <ul>
      <template v-for="item in list">
        <li :class="{ 'is-active': item.path == $route.path }">
          <router-link :to="item.path">
            <span class="icon is-small"><i class="fa fa-2x" :class="[ item.icon ]"></i></span>
            <span>{{ item.title }}</span>
            <div class="" v-if="item.path == '/my/messages' && count > 0">{{ count }}</div>
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      list:[
        {
          title: '首页',
          path: '/',
          icon: 'fa-home'
        },
        {
          title: '发表',
          path: '/topic/create',
          icon: 'fa-paper-plane-o'
        },
        {
          title: '消息',
          path: '/my/messages',
          icon: 'fa-comment-o'
        },
        {
          title: '我的',
          path: '/my/home',
          icon: 'fa-user-o'
        }
      ]
    }
  }
}
</script>

<style>
  .tab-position {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
