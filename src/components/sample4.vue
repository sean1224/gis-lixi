/*
* @Author: lijian
* @Date: 2019-05-27 15:54:30
* @Last Modified by: lijian
* @Last Modified time: 2019-05-27 14:34:06
* @description: source 和layer的应用
*/
<template>
	<div class="container">

		<div id="map"></div>
		<div @click='openStreetMap'>OpenStreetMap地图</div>
		<div @click='bingMap'>Bing地图</div>
		<div @click='stamenMap'>Stamen地图</div>
		<div @click='clickstaticMap'>静态地图</div>
	</div>
</template>
<script>
import {Map, View} from 'ol';
import {Tile as TileLayer,Image as ImageLayer} from "ol/layer";
import {BingMaps,OSM,Stamen,MapQuest,ImageStatic} from 'ol/source';
import {transform,Projection} from 'ol/proj'
import {getCenter} from 'ol/extent'
export default {
	name:'sample4',
	data () {
		return {
			map:null,
			openStreetMapLayer:null,
			bingMapLayer:null,
			stamenLayer:null
		}
	},
	methods:{
 		openStreetMap:function(){
			this.map.removeLayer(this.map.getLayers().item(0));
			this.map.addLayer(this.openStreetMapLayer);
		},
		bingMap:function(){
			this.map.removeLayer(this.map.getLayers().item(0));
			this.map.addLayer(this.bingMapLayer);
		},
		stamenMap:function(){
			this.map.removeLayer(this.map.getLayers().item(0));
			this.map.addLayer(this.stamenLayer);
		},
		clickstaticMap:function(){
			//静态地图
			// // 地图设置中心，设置到成都，在本地离线地图 offlineMapTiles刚好有一张zoom为4的成都瓦片
			// var center = transform([104.06667, 30.66667], 'EPSG:4326', 'EPSG:3857');
			// // 计算熊猫基地地图映射到地图上的范围，图片像素为 1209*826，保持比例的情况下，把分辨率放大一些
			// var extent = [center[0]- 1209*10/2, center[1]-826*10/2, center[0]+1209*10/2, center[1]+826*10/2];
			var _extent = [0, 0, 1209, 826];
      var projection = new Projection({
        code: 'xkcd-image',
        units: 'pixels',
        extent: _extent
      });
      var view=new View({
          projection: projection,
          center: getCenter(_extent),
          zoom: 1
        })
			//定义静态图层
			var staticMap=new ImageLayer({
					source:new ImageStatic({
						url:'/pic/wildzoo.jpg',
						imageExtent:_extent,
						projection:projection
					})
			});
			//添加原始图层，新增静态图层
			this.map.removeLayer(this.map.getLayers().item(0))
			this.map.addLayer(staticMap)
			this.map.setView(view)
		}
	},
	mounted () {
	  // 创建地图
    // Open Street Map 地图层
    this.openStreetMapLayer = new TileLayer({
    	source: new OSM()
    });

    // Bing地图层
    this.bingMapLayer = new TileLayer({
    	source: new BingMaps({
    		key: 'AkjzA7OhS4MIBjutL21bkAop7dc41HSE0CNTR5c6HJy8JKc7U9U9RveWJrylD3XJ',
    		imagerySet: 'Road'
    	})
    });

    // Stamen地图层
    this.stamenLayer = new TileLayer({
    	source: new Stamen({
    		layer: 'watercolor'
    	})
    });

    this.map = new Map({
    	layers: [
    	  this.openStreetMapLayer
    	],
    	view: new View({
            // 设置成都为地图中心
            center: [104.06, 30.67],
            projection: 'EPSG:4326',
            zoom: 10
          }),
    	target: 'map'
    });
  }
};
</script>
<style scoped>
#map{
	width:500px;
	height: 250px;
	border:solid 1px red;
	margin: 50px auto;
}
</style>
