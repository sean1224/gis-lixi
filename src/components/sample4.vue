<template>
	<div class="container">

		<div id="map"></div>
		<select id="sel">
			<option value="1">OpenStreetMap地图</option>
			<option value="2">Bing地图</option>
			<option value="3">Stamen地图</option>
			<option value="4">MapQuest地图</option>
		</select>
	</div>
</template>
<script>
import 'ol/ol.css';
import {Map, View,layer} from 'ol';
export default {
	name:'sample4', 
	mounted () {
	  // 创建地图
	      // Open Street Map 地图层
	      var openStreetMapLayer = new ol.layer.Tile({
	      	source: new ol.source.OSM()
	      });

    // Bing地图层
    var bingMapLayer = new ol.layer.Tile({
    	source: new ol.source.BingMaps({
    		key: 'AkjzA7OhS4MIBjutL21bkAop7dc41HSE0CNTR5c6HJy8JKc7U9U9RveWJrylD3XJ',
    		imagerySet: 'Road'
    	})
    });

    // Stamen地图层
    var stamenLayer = new ol.layer.Tile({
    	source: new ol.source.Stamen({
    		layer: 'watercolor'
    	})
    });

    // MapQuest地图层
    var mapQuestLayer = new ol.layer.Tile({
    	source: new ol.source.MapQuest({
    		layer: 'osm'
    	})
    });
    var map = new Map({
    	layers: [
    	openStreetMapLayer
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
