/*
 * @Author: lijian 
 * @Date: 2019-05-14 15:21:42 
 * @Last Modified by: lijian
 * @Last Modified time: 2019-05-14 16:25:45
 */

import Vue from 'vue'
import Router from 'vue-router'
import sample1 from '@/components/sample1'
import sample2 from '@/components/sample2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/1',//地图的第一个实例
      name: 'ol-sample1',
      component: sample1
    },
    {
      path: '/2',
      name: 'ol-sample2',
      component: sample2
    }
  ]
})
