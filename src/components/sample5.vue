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
import 'ol/ol.css';
import {Map, View} from 'ol';
import {
  Tile as TileLayer,
  Image as ImageLayer,
  Vector as VectorLayer
} from "ol/layer";
import { OSM, ImageArcGISRest } from "ol/source";
export default {
  name: 'sample5',
  data () {
    return {
      msg: 'Welcome to Ol',
      map:null
    }
  },
  mounted () {
    this.map = new Map({
     target: "mapc",
     layers: [
       new ImageLayer({
         source: new ImageArcGISRest({
           ratio: 1,
           params: {},
           url:
             "/mapApi/test/test_1/MapServer"
         })
       })
     ],
     view:new View({
       projection: 'EPSG:4326',
       center: [121.256151, 31.328742],
       zoom:18
     })
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
