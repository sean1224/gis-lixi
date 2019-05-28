/**
 * 图标与提示信息
 * author: lijian
 * time: 2019/5/28
 */
<template>
  <div id="map">
  </div>
</template>
<script>
import {Map,View,Feature} from 'ol'
import {OSM} from 'ol/source'
import {Tile} from 'ol/layer'
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
export default {
  name: "sample6",
  mounted(){
    var map=new Map({
      target:'map',
      layers:[new Tile({
        source:new OSM()
      })],
      view:new View({
        center: [0,0],
        zoom:0
      })
    });
    // 创建一个Feature，并设置好在地图上的位置
    var anchor = new Feature({
      geometry: new Point([0, 0])
    });
    // 设置样式，在样式中就可以设置图标
    anchor.setStyle(new Style({
      image: new Icon({
        src: '/pic/flagright.jpg'
      })
    }));
    console.log(map.getLayers().item(0).getSource().addFeature());
  }
}
</script>
<style lang="scss" scoped>
$width:500px;
$height:250px;
#map{
  width:$width;
  height:$height;
  border:solid 1px red;
  margin:100px auto;
}
</style>
