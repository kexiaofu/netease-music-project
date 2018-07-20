import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import neteaseMusicList from '@/views/neteaseMusicList';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'netease-music-list',
      component: neteaseMusicList
    }
  ]
})
