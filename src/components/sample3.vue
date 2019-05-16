/*
* @Author: unknown 
* @Date: 2019-05-14 15:54:30 
* @Last Modified by: lijian
* @Last Modified time: 2019-05-15 14:34:06
* @description: ol.view的應用
*/
<template>
	<div>
		<div id='map'></div>
		<input type="button" @click='moveToLeft()' value='左移'> 
		<input type="button" @click='moveToTop()' value='上移'>
		<input type="button" @click='moveToMax()' value='放大'>
		<input type="button" @click='moveToBJ()' value='移动到合肥'> 
		<input type="button" @click='fitToChengdu()' value='移动到成都并自适应显示'> 
	</div>
</template>
<script>
import 'ol/ol.css'; 
import {Map, View} from 'ol'; 
import {Tile} from 'ol/layer'; 
import {transform} from 'ol/proj'
import OSM from 'ol/source/OSM';  
export default{
	name:'sample3',
	data () {
		return {map:{}}
	},
	methods:{
		moveToLeft(){
			let view = this.map.getView(); 
			let mapCenter = view.getCenter();
      // 让地图中心的x值增加，即可使得地图向左移动，增加的值根据效果可自由设定
      mapCenter[0] += 50000;
      view.setCenter(mapCenter);
      this.map.render();
		},
		moveToTop(){
			let view = this.map.getView();
			let mapCenter=view.getCenter();
			mapCenter[1]+=50000;
			view.setCenter(mapCenter);
			this.map.render();
		},
		moveToMax(){
			let view = this.map.getView();
			view.setZoom(view.getZoom()+1);
		},
		moveToBJ(){
			let view = this.map.getView();
			let viewCenter=transform([117.215761,31.801256],'EPSG:4326','EPSG:3857');
			view.setCenter(viewCenter);
		},
		//定位到成都并最大化显示
		fitToChengdu(){
			//fit(extent,size),extent是要显示的经纬度范围，size为在显示区域的长宽数组
			this.map.getView().fit([104, 30.6, 104.12, 30.74], this.map.getSize());
		}
	},
	mounted () { 
		  this.map = new Map({
			layers:[
			new Tile({source: new OSM()})
			],
			view: new View({
				// 设置北京为地图中心，此处进行坐标转换， 把EPSG:4326的坐标，转换为EPSG:3857坐标，因为ol默认使用的是EPSG:3857坐标
				center: transform([116.41, 39.90], 'EPSG:4326', 'EPSG:3857'),
				projection:'EPSG:3857',
				zoom: 10,
				// 限制地图缩放最大级别为14，最小级别为10
        minZoom: 10,
        maxZoom: 14
			}),
			target: 'map'
		}) 
	}
};
</script>
<style lang='scss' scoped>
#map{
	width:500px;
	height: 250px;
	border:solid 1px red;
	margin: 50px auto;
}
</style>