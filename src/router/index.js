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
 import sample3 from '@/components/sample3'
 import sample4 from '@/components/sample4'
 import sample5 from '@/components/sample5'
 import sample6 from '@/components/sample6'
 import sample7 from '@/components/sample7'
 import sample8 from '@/components/sample8'
 import sample9 from '@/components/sample9'
 import navlist from '@/components/nav'
 import canvasTable from '@/components/canvas'
 Vue.use(Router)

 export default new Router({
  routes: [
  {
      path: '/',//导航
      name: 'nav',
      component: navlist
    },
    {
      path: '/1',//地图的第一个实例
      name: 'ol-sample1',
      component: sample1
    },
    {
      path: '/2',//地圖的第二個實例，加載wms的img圖層
      name: 'ol-sample2',
      component: sample2
    },
    {
      path: '/3',//openlayer中view的應用
      name: 'ol-sample3',
      component: sample3
    },
    {
      path: '/4',//openlayer中source和layer的應用
      name: 'ol-sample4',
      component: sample4
    },
    {
      path: '/5',//openlayer中source和layer的應用
      name: 'ol-sample5',
      component: sample5
    },
    {
      path: '/6',//openlayer中source和layer的應用
      name: 'ol-sample6',
      component: sample6
    },
    {
      path: '/7',//openlayer中source和layer的應用
      name: 'ol-sample7',
      component: sample7
    },
    {
      path: '/8',//openlayer中source和layer的應用
      name: 'ol-sample8',
      component: sample8
    },
    {
      path: '/9',//openlayer中source和layer的應用
      name: 'ol-sample9',
      component: sample9
    },
    {
      path:'/c',//canvas生成echarts表格
      name:'canvasTable',
      component:canvasTable

    }
    ]
  })
