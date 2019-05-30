/**
 * 地图的交互
 *
 */
<template>
  <div>
    <div id="map">
    </div>
    <button type="button" name="button" @click='openChooseItem'></button>
  </div>

</template>
<script>
import {Map, View,Feature} from 'ol';
import {Tile as TileLayer,Vector as VectorLayer} from 'ol/layer';
import {OSM,Vector as VectorSource} from 'ol/source';
import {Point} from 'ol/geom'
import {transform} from 'ol/proj'
import {defaults as defaultInteractions} from 'ol/interaction'
export default {
  name: "sample8",
  data: () => ({
    map:null
  }),
  methods:{
    openChooseItem:function(){
      // 添加一个用于选择Feature的交互方式
      this.map.addInteraction(new ol.interaction.Select({
          // 设置选中后的style
          style: new ol.style.Style({
              image: new ol.style.Circle({
                  radius: 10,
                  fill: new ol.style.Fill({
                      color: 'blue'
                  })
              })
          })
      }));
    }
  },
  mounted(){
    //初始化map对象
    var vectorLayer=new VectorLayer({
      source:new VectorSource()
    })
    this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          vectorLayer
        ],
        view: new View({
          center: [0, 0],
          zoom: 5
        })
    });
    // 在地图上添加一个圆
    var circle = new Feature({
        geometry: new Point(transform(
              [0, 0], 'EPSG:4326', 'EPSG:3857')),
        style:new Style({
          color:'red',
          scale:5
        })
    })
    // 此处不再为feature设置style
    vectorLayer.getSource().addFeature(circle);
  }
}
</script>
<style lang="scss" scoped>
$width:1000px;
$height:500px;
#map{
  width:$width;
  height:$height;
  margin:100px auto;
}
</style>
