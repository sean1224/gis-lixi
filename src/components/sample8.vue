/**
 * 地图的交互
 *
 */
<template>
  <div>
    <div id="map">
    </div>
    <button type="button" name="button" @click='openChooseItem'>选择要素</button>
    <button type="button" name="button" @click='cancelOpenChooseItem'>取消选择要素</button>
  </div>

</template>
<script>
import {Map, View,Feature} from 'ol';
import {Tile as TileLayer,Vector as VectorLayer} from 'ol/layer';
import {OSM,Vector as VectorSource} from 'ol/source';
import {Point} from 'ol/geom'
import {transform,projection} from 'ol/proj'
// import projection from 'ol/proj/projection'
import {defaults as defaultInteractions} from 'ol/interaction'
import {RegularShape,Circle,Style,Fill} from 'ol/style'
import {Select} from 'ol/interaction'
import {pointerMove} from 'ol/events/condition'
export default {
  name: "sample8",
  data: () => ({
    map:null,
    vectorLayer1:null,
    clickSelect:null
  }),
  methods:{
    openChooseItem:function(){
      // 添加一个用于选择Feature的交互方式
      var _this=this;
      this.clickSelect=new Select({
          //设置选择的方式
          // condition: pointerMove,
          // 设置选中后的style
          style: new Style({
              image: new Circle({
                  radius: 10,
                  fill: new Fill({
                      color: 'blue'
                  })
              })
          }),
          filter: function(feature, layer){  
              return layer === _this.vectorLayer1;
          }
          //设置选择的要素或是图层
      })
      this.map.addInteraction(this.clickSelect);
    },
    cancelOpenChooseItem:function(){
      var _this=this; 
      this.clickSelect.getFeatures().clear();
    }
  },
  mounted(){
    //初始化map对象
    var vectorLayer=new VectorLayer({
      source:new VectorSource(),
      style:new Style({
        image:new RegularShape({
                points: 5,
                radius1: 20,
                radius2: 10,
                fill: new Fill({
                    color: 'red'
                })
            })
      })
    });
    this.vectorLayer1 = new VectorLayer({
      source:new VectorSource(),
      style:new Style({
        image:new Circle({
                radius:10,
                fill: new Fill({
                    color: 'red'
                })
            })
      })
    })
    this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          vectorLayer,
          this.vectorLayer1
        ],
        view: new View({
          center: transform(
              [104, 30], 'EPSG:4326', 'EPSG:3857'),
          zoom: 10
        })
    });
    // 在地图上添加一个圆
    var circle = new Feature({
        geometry: new Point(transform(
              [104, 30], 'EPSG:4326', 'EPSG:3857'))
    })   
    vectorLayer.getSource().addFeature(circle);
    var circle1 = new Feature({
        geometry: new Point(transform(
              [104.08, 30.06], 'EPSG:4326', 'EPSG:3857'))
    }) 
    this.vectorLayer1.getSource().addFeature(circle1);
  }
};
</script>
<style lang="scss" scoped>
$width:800px;
$height:400px;
#map{
  width:$width;
  height:$height;
  margin:100px auto;
}
</style>
