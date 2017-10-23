import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers';
import store from './vuex/user';
require('./assets/style/topic-content.styl')
require('../style.styl')
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes
});
// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (sessionStorage.user) {
    store.dispatch('setUserInfo', JSON.parse(sessionStorage.user));
}

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
    // 处理左侧滚动不影响右边
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.userInfo.userId) {
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next();
    }
});

new Vue({
    router,
    store
}).$mount('#app');
