/**
 * 图标与提示信息
 * author: lijian
 * time: 2019/5/28
 */
<template>
  <div>
    <div id="map">
    </div>
    <button @click='addRegularSize'>
      添加规则形状
    </button>
    <button @click='addText'>
      添加文字
    </button>
    <div id="popup" class="ol-popup" ref='container'>
      <a href="#" ref='closer' id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content" ref='content'></div>
    </div>
  </div>

</template>
<script>
import {Map,View,Feature,Overlay} from 'ol'
import {OSM,Vector as VectorSource} from 'ol/source'
import {Tile,Vector as VectorLayer} from 'ol/layer'
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import {RegularShape,Stroke,Fill,Text} from 'ol/style'
import {toStringHDMS} from 'ol/coordinate'
import {transform} from 'ol/proj'
export default {
  name: "sample6",
  data () {
    return {
      map:null
    }
  },
  methods:{
    addRegularSize:function addRegularSize(){
    this.map.getLayers().item(1).getSource().getFeatures()[0]
      .setStyle(new Style({
        image:  new RegularShape({
          points: 3,    // 顶点数
          radius: 10,    // 图形大小，单位为像素
          stroke: new Stroke({ // 设置边的样式
              color: 'red',
              size: 2
          })
        })
      }));
    },
    addText:function addText(){
      this.map.getLayers().item(1).getSource().getFeatures()[0]
        .setStyle(new Style({
          text:  new Text({
            text: '上海',
            fill:new Fill({
              color: 'red'
            })
          })
        }));
    }
  },
  mounted(){
    var layer=new Tile({source:new OSM()});
    var vectorLayer=new VectorLayer({
      source:new VectorSource()
    });
    var _this=this;
    this.map=new Map({
      target:'map',
      layers:[layer,vectorLayer],
      view:new View({
        center: [0,0],
        zoom:5
      })
    });
    // 创建一个Feature，并设置好在地图上的位置
    var anchor = new Feature({
      geometry: new Point([0, 0])
    });
    // 设置样式，在样式中就可以设置图标
    anchor.setStyle(new Style({
      image: new Icon({
        src: '/pic/flagright2.png',
        scale: .05
      })
    }));
    vectorLayer.getSource().addFeature(anchor);
    // 监听地图层级变化
    this.map.getView().on('change:resolution', function(){
      var style = anchor.getStyle();
      // 重新设置图标的缩放率，基于层级10来做缩放
      style.getImage().setScale(this.getZoom() / 10);
      anchor.setStyle(style);
    })
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
    // 创建一个overlay, 绑定html元素container
    var overlay = new Overlay(({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    }));
    // 监听地图点击事件
    this.map.on('singleclick', function(evt) {
        // 获取当前点击坐标，并设置到HTML元素上去
      var coordinate = evt.coordinate;
      var hdms = toStringHDMS(transform(
          coordinate, 'EPSG:3857', 'EPSG:4326'));
      content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
          '</code>';
      // 设置overlay的位置，从而显示在鼠标点击处
      console.log(overlay.setPosition)
      overlay.set("position","0° 03′ 58″ N 0° 03′ 58″ W");
    });
  }
};
</script>
<style lang="scss" scoped>
$width:1000px;
$height:500px;
#map{
  width:$width;
  height:$height;
  border:solid 1px red;
  margin:100px auto;
}
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
  &:after, &:before {
    top: 100%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  &:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
}

.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
  &:after {
    content: "✖";
  }
}
</style>
