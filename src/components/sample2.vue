/*
 * @Author: unknown 
 * @Date: 2019-05-14 15:54:30 
 * @Last Modified by: lijian
 * @Last Modified time: 2019-05-14 17:27:41
 * @description: ol的第二个实例,加载WMS（web map service）图片

 */

<template>
    <div id='map'></div>
</template>
<script>
import 'ol/ol.css';
import {Map, View} from 'ol';
import {Image as ImageLayer,Tile as TileLayer} from 'ol/layer';
import OSM from 'ol/source/OSM'; 
import ImageWMS from 'ol/source/ImageWMS.js';
export default {
    name: 'sample2',
    mounted () {
        const map = new Map({
            target: 'map',
            layers:[
                new TileLayer({
                    source: new OSM()
                }),
                new ImageLayer({
                    extent: [-13884991, 2870341, -7455066, 6338219],//设置地图的边界，超出范围则不渲染
                    source: new ImageWMS({
                        url: 'https://ahocevar.com/geoserver/wms',
                        params: {'LAYERS': 'topp:states'},
                        ratio: 1,// 比例，值大于一，
                        serverType: 'geoserver'// WMS服务类型
                    })
                })
            ],
            view: new View({
                 center: [-6655.5402445057125, 6709968.258934638],
                 zoom: 13
            })
        })    
    }
}
</script>
<style lang='scss'>
#map{
  width: 400px;
  height: 250px;
  margin:100px auto;
  border:solid 1px red;
}
</style>


