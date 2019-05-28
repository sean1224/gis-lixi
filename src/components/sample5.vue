/*
 * @Author: lijian
 * @Date: 2019-05-14 15:38:40
 * @Last Modified by: lijian
 * @Last Modified time: 2019-05-14 15:54:14
 * @description: 设置矢量地图的捕捉容差
 */

<template>
  <div id="mapc"></div>
</template>
<script>
import {Map, View} from 'ol';
import {
  Tile as TileLayer,
  Vector as VectorLayer
} from "ol/layer";
import {Style,Stroke} from 'ol/style'
import OSM from "ol/source/OSM";
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import {transform} from 'ol/proj'
import {unByKey} from 'ol/Observable'
export default {
  name: 'sample5',
  data () {
    return {
      msg: 'Welcome to Ol',
      map:null
    }
  },
  methods:{
    clickPoint:function(e){
      alert(e);
    }
  },
  mounted () {
    //生成raster图层
    let raster=new TileLayer({
      source:new OSM()
    });
    //生成vector图层
    let vector=new VectorLayer({
      source :new VectorSource({
        url:'/api/Shanghai.geojson',
        format:new GeoJSON()
      }),
      style: new Style({
          stroke: new Stroke({
              color: 'red',
              size: 3
          })
      })
    });
    // 因为是异步加载，所以要采用事件监听的方式来判定是否加载完成
    let listenerKey = vector.getSource().on('change', function(){
        if (vector.getSource().getState() === 'ready') {    // 判定是否加载完成
            console.log('vector图层加载成功');
            unByKey(listenerKey); // 注销监听器
        }
        else{
          console.log('vector图层加载失败')
        }
    });
    this.map = new Map({
     target: "mapc",
     layers: [vector],
     view:new View({
       projection:'EPSG:4326',
       center: [121.472644,31.231706],
       zoom:9
     })
   });
   //map对象绑定click事件
   let _this=this;
   this.map.on('click',function(e){
     _this.clickPoint(e);
   });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
#mapc{
  width: 800px;
  height: 500px;
  margin:100px auto;
  border:solid 1px red;
}
</style>
