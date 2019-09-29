<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'ol/ol.css';
import {Map, View} from 'ol';
import {Image as ImageLayer,Tile as TileLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import ImageWMS from 'ol/source/ImageWMS.js';
export default {
  name: 'App'
};

</script>

<style>
@import url('http://localhost:8080/arcgis_js_api/library/4.11/esri/themes/light/main.css');
@import'./assets/css/public.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  /* margin-top: 60px; */
}
</style>
