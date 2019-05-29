/**
 * 所有的事件包含
 * singleclick
 * dblclick
 * click
 * pointermove
 * pointerdrag
 * moveend
 */
<template>
  <div class="123">
    <div id="map">

    </div>
    <button type="button" name="button" @click='unBindClick'>解除MAP单击绑定</button>
  </div>
</template>
<script>
import 'ol/ol.css';
import {Map, View,Feature} from 'ol';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import {Vector as VectorLayer} from 'ol/layer'
import {Vector as VectorSource} from 'ol/source'
import OSM from 'ol/source/OSM';
import {unByKey} from 'ol/Observable'
import {Style,Circle,Fill,Icon} from 'ol/style'
export default {
  name: "sample7",
  data () {
    return {
      map:null,
      clickMethod:null
    }
  },
  methods:{
    unBindClick:function(){
      unByKey(this.clickMethod);
    }
  },
  mounted(){
    //存储this指针
    var _this=this;
    //创建矢量图层
    var vectorLayer=new VectorLayer({
        source:new VectorSource()
    })
    var feature1=new Feature({
       geometry: new Point([0, 0])
    })
    feature1.setStyle(new Style({
      image:new Circle({
        radius:50,
        fill:new Fill({
          color:'red'
        })
      })
    }))
    vectorLayer.getSource().addFeature(feature1);
    //最重要的地图对象
    this.map=new Map({
      //让id为map 的div做为地图的容器
      target: 'map',
      //添加地图图层，可添加多个，这里添加的是open street map的瓦片图层
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      //定义视图，只能有一个
      view: new View({
        center: [0, 0],//定义地图显示中心为经度为0，纬度也为0
        zoom: 5//定义地图的显示层级为0
      })
    });
    this.clickMethod = this.map.on('singleclick', function(event){
      alert('点击事件触发弹框');
    })
    // // 为地图注册鼠标移动事件的监听
    this.map.on('pointermove', function(event){
        _this.map.forEachFeatureAtPixel(event.pixel, function(feature){
            feature.dispatchEvent({type: 'mousemove', event: event});
        });
    });
    //
    // // 为feature1注册自定义事件mousemove的监听
    feature1.on('mousemove', function(event){
        // 修改feature的样式为半径100像素的园，用蓝色填充
        console.log('移入该要素')
    });
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
