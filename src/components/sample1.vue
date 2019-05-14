/*
 * @Author: lijian 
 * @Date: 2019-05-14 15:38:40 
 * @Last Modified by: lijian
 * @Last Modified time: 2019-05-14 15:54:14
 * @description: 地图的第一个实例
 */

<template> 
  <div id="map"></div>
</template> 
<script>
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
export default {
  name: '',
  data () {
    return {
      msg: 'Welcome to Ol'
    }
  },
  mounted () {
    //最重要的地图对象
    const map = new Map({
    //让id为map 的div做为地图的容器
    target: 'map',
    //添加地图图层，可添加多个，这里添加的是open street map的瓦片图层
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    //定义视图，只能有一个
    view: new View({
      center: [0, 0],//定义地图显示中心为经度为0，纬度也为0
      zoom: 0//定义地图的显示层级为0
    })
  });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
#map{
  width: 400px;
  height: 250px;
  margin:100px auto;
  border:solid 1px red;
}
</style>
