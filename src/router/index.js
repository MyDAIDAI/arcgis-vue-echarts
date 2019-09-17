import Vue from 'vue'
import Router from 'vue-router'
import ArcgisMap from '@/components/ArcgisMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ArcgisMap',
      component: ArcgisMap
    }
  ]
})
