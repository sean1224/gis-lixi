<template>
    <div class="editContainer">
        <div class="left">
            <input type="text" v-model="inputValue"/>
            <button id="search">查找</button>
        </div>
        <div class="right">
            <div id="map"></div>
        </div>
    </div>
</template>
<script>
import esriLoader from "esri-loader"
export default {
    name: 'editOnline',
    data () {
        return {
            inputValue: '',

            Map: null,
            MapView: null,

            currentMap: null,
            currentView: null
        }
    },
    mounted(){
      const options = { 
        url: 'http://localhost:8080/arcgis_js_api/library/4.10/dojo/dojo.js'
      }
      esriLoader.loadModules([
          'esri/Map',
          'esri/views/MapView',
      ],options)
      .then(([Map,MapView])=>{
          this.Map=Map;
          this.MapView=MapView;
          this.initMap();
      })
      .catch(error => console.log(error))
    },
    methods:{
        initMap(){
          let _this = this; 
          // 初始化地图
          this.currentMap = new this.Map({
            basemap: 'streets'
          });
          this.currentView = new this.MapView({
            map: _this.currentMap,
            container: "map",
            center: [121.256151, 31.328742],
            zoom: 18
          });
          this.currentView.ui.remove("attribution");
        }
    }
}
</script>
<style lang="scss" scoped>
.editContainer{
    width: 100vw;
    border: solid 1px;
    overflow: hidden;
    text-align: left;
    .left{
        width:100%;
    }
    .right{
        width: 100%;
        #map{
            width: 800px;
            height: 600px;
        }
    }
}
</style>