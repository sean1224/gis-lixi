/*地图控件的操作*
ol.control.Attribution: 右下角的地图信息控件
ol.control.FullScreen: 全屏控件
ol.control.MousePosition: 鼠标位置控件
ol.control.OverviewMap: 鸟瞰图控件
ol.control.Rotate: 指北针控件
ol.control.ScaleLine: 比例尺控件
ol.control.Zoom: 缩放按钮控件
ol.control.ZoomSlider: 缩放滚动条控件
ol.control.ZoomToExtent: 放大到设定区域控件
 */
<template>
    <div id='map'> 
    </div>
</template>
<script> 
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {defaults,FullScreen,MousePosition,OverviewMap,ScaleLine,ZoomSlider,ZoomToExtent} from 'ol/control'
export default {
  name: 'sample9',
  data () {
    return {
      msg: 'Welcome to Ol'
    }
  },
  mounted () {
    //最重要的地图对象
    const map = new Map({
    // 设置地图控件，默认的三个控件都不显示
    controls: defaults().extend([
        new FullScreen(),
        new MousePosition(),
        new OverviewMap(),
        new ScaleLine(),
        new ZoomSlider(),
        new ZoomToExtent()
    ]),
    //让id为map 的div做为地图的容器
    target: 'map',
    //添加地图图层，可添加多个，这里添加的是open street map的瓦片图层
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    //定义视图，只能有一个
    view: new View({
      center: [0, 0],//定义地图显示中心为经度为0，纬度也为0
      zoom: 5//定义地图的显示层级为0
    })
  });
  }
};
</script>
<style lang='scss' scoped>
$width:600px;
$height:300px;
#map{
    width:$width;
    height:$height;
    margin:50px auto;
}
</style>


