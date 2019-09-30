<template>
  <div class="editContainer">
    <div class="left">
      <input type="text" v-model="inputValue" />
      <button id="search" @click="handleClickFind">查找</button>
      <div class="container">
        <ul>
          <li v-for="(item,index) in featureList" :key="index">
            <div>
              <span @click.prevent="handleClickFeatureLayer(item)">{{item.attributes.OBJECTID}}</span>
              <span>{{item.attributes.NAME}}</span>
              <span>{{item.attributes.CITY}}</span>
            </div>
          </li>
          <div>
            <ul>
              <li v-for="(value,name) in currentNewGraphic.attributes" :key="name">
                <label :for="name">{{name}}</label>
                <input :name="name" type="text" :value="value" readonly/>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
    <div class="center">
      <div id="map"></div>
    </div>
    <div class="right">
      <div>
        <button @click="handleClickBtnDraw">绘制多边形</button>
        <button @click="handleClickBtnClear">清除多边形</button>
        <button @click="handleClickBtnSubmit">提交多边形</button>
      </div>
      <hr>
      <div>
        <button @click="handleClickBtnDelete">删除要素</button>
        <button @click="handleClickBtnClearSel">清除选择</button>
      </div>
      <hr>
      <div>
        <!-- <button @click="handleClickBtnAlterAttr">修改属性</button> -->
      </div>
      <hr>
      <form method="post" v-show="Object.keys(currentGraphic.attributes).length">
        <ul>
          <li v-for="(value,name) in currentGraphic.attributes" :key="name">
            <label :for="name">{{name}}</label>
            <input :name="name" type="text" :value="value"/>
          </li>
        </ul>
        <button @click="handleSubmitForm" type="button">提交</button>
        <button type="reset">重置</button>
      </form>
      <hr>
    </div>
  </div>
</template>
<script>
import esriLoader from "esri-loader";
export default {
  name: "editOnline",
  data() {
    return {
      // 查询值
      inputValue: "",
      // 查询路由
      url: {
        dojo: "http://localhost:8080/arcgis_js_api/library/4.11/dojo/dojo.js",
        featureLayer:
          "http://43.254.226.73:6080/arcgis/rest/services/WATER/test1/FeatureServer/0"
      },
      // 要素列表
      featureList: [],

      Map: null,
      MapView: null,
      FeatureLayer: null,
      QueryTask: null,
      Query: null,
      Draw: null,
      Graphic: null,

      currentMap: null,
      currentView: null,
      currentFeatureLayer: null,
      currentGraphic: {"attributes":{}},
      currentNewGraphic: {"attributes":{}},
      currentHighLight: null
    };
  },
  mounted() {
    esriLoader
      .loadModules(
        [
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/FeatureLayer",
          "esri/tasks/QueryTask",
          "esri/tasks/support/Query",
          "esri/views/draw/Draw",
          "esri/Graphic"
        ],
        { url: this.url.dojo }
      )
      .then(([Map, MapView, FeatureLayer, QueryTask, Query, Draw, Graphic]) => {
        this.Map = Map;
        this.MapView = MapView;
        this.QueryTask = QueryTask;
        this.Query = Query;
        this.Draw = Draw;
        this.Graphic = Graphic;

        this.FeatureLayer = FeatureLayer;
        this.initMap();
        this.addFeatureLayer();
      })
      .catch(error => console.log(error));
  },
  methods: {
    /**
     * 初始化底图
     */
    initMap() {
      let _this = this;
      // 初始化地图
      this.currentMap = new this.Map({
        basemap: "streets"
      });
      // 初始化视图
      this.currentView = new this.MapView({
        map: _this.currentMap,
        container: "map",
        center: [121, 31],
        zoom: 10,
        highlightOptions: {
          color: "orange"
        }
      });
      this.currentView.on("click",event => {
          /**
           * hitTest
           * @param event 点击对象
           * @return Promise 返回点击的graphic
           */
          this.currentView.hitTest(event)
          .then(response => {
            if (response.results.length) {
              // 遍历点击的graphic数组
              response.results.forEach(item => {
                let graphic = item.graphic;
                this.currentView.whenLayerView(graphic.layer).then(layerView =>{
                  // 如果view中存在高亮，则取消
                  if(this.currentHighLight){
                    this.currentHighLight.remove(); 
                  }
                  // 如果不存在高亮，则保存选择的graphic并高亮显示
                  this.currentGraphic = graphic;
                  this.currentHighLight = layerView.highlight(graphic);
                });
              })
            }
          })
          .catch(error => {
            console.log(error.message)
          })
      })
      // 清除logo
      this.currentView.ui.remove("attribution");
    },
    /**
     * 添加要素图层
     */
    addFeatureLayer() {
      this.currentFeatureLayer = new this.FeatureLayer({
        // URL to the service
        url: this.url.featureLayer,
        outFields:["*"]
      });
      this.currentMap.add(this.currentFeatureLayer);
    },
    /**
     * 查找要素
     */
    searchByAttr(name) {
      // 初始化查询任务
      var queryTask = new this.QueryTask({
        url: this.url.featureLayer
      });
      // 初始化查询参数
      var query = new this.Query();
      query.returnGeometry = true;
      query.outFields = ["*"];
      query.where = `OBJECTID like '%${name}%'`;

      // 执行查询结果
      queryTask
        .execute(query)
        .then(results => {
          console.log(results.features);
          this.featureList = results.features;
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    /**点击查询 */
    handleClickFind() {
      this.searchByAttr(this.inputValue);
    },
    /**
     * 点击绘制多边形
     */
    handleClickBtnDraw() {
      let _this = this;
      this.currentView.graphics.removeAll();

      var draw = new this.Draw({
        view: this.currentView
      });

      // 创建多边形绘制
      const action = draw.create("polygon");

      // 聚焦视图
      this.currentView.focus();

      // 要素绘制时绑定事件
      action.on(
        [
          "vertex-add",
          "vertex-remove",
          "cursor-update",
          "redo",
          "undo",
          "draw-complete"
        ],
        updateVertices
      );

      // 更新节点
      function updateVertices(event) {
        if (event.vertices.length > 1) {
          const result = createGraphic(event);
        }
      }

      // 创建草图
      function createGraphic(event) {
        const vertices = event.vertices;
        _this.currentView.graphics.removeAll();
        const graphic = new _this.Graphic({
          geometry: {
            type: "polygon",
            rings: vertices,
            spatialReference: _this.currentView.spatialReference
          },
          symbol: {
            type: "simple-line",
            color: [4, 90, 141],
            width: 2,
            cap: "round",
            join: "round"
          }
        });
        _this.currentView.graphics.add(graphic);
      }
    },
    /**
     * 清除视图graphics
     */
    handleClickBtnClear(){
      this.currentView.graphics.removeAll();
    },
    /**
     * 提交绘制多边形
     */
    handleClickBtnSubmit(){
      // 获取view中graphics
      let params = {
        addFeatures: this.currentView.graphics.items
      }
      this.currentFeatureLayer
      .applyEdits(params)
      .then(editsResult => {
        console.log(editsResult)
      })
      .catch(error => {
        console.log(error.message)
      })
    },
    /**
     * 提交删除多边形
     */
    handleClickBtnDelete(){
      // 删除选择的要素
      if(this.currentGraphic){
        let params = {
          deleteFeatures: [this.currentGraphic]
        }
        this.currentFeatureLayer
        .applyEdits(params)
        .then(editsResult => {
          console.log(editsResult)
        })
        .catch(error => {
          console.log(error.message)
        })
      }
    },
    /**
     * 清除要素选择
     */
    handleClickBtnClearSel(){
      if(this.currentHighLight){
        this.currentHighLight.remove();
      }
    },
    /**
     * 修改要素属性
     */
    handleClickBtnAlterAttr(){
      console.log(this.currentGraphic)
    },
    /**
     * 提交表单
     * [{"geometry":{"spatialReference":{"latestWkid":3857,"wkid":102100},
     * "rings":[[[13465377.912401905,3645345.9605211676],[13464521.81675204,3640943.1895580785],
     * [13473449.660722684,3639230.9982583513]]]},"attributes":{}}]
     */
    handleSubmitForm(){
      let OBJECTID = document.forms[0].elements["OBJECTID"].value;
      let NAME = document.forms[0].elements["NAME"].value;
      let CITY = document.forms[0].elements["CITY"].value;
      
      let geometry = this.currentGraphic.geometry;
      let attributes = this.currentGraphic.attributes;

      // let str = "";
      // // 递归获取数组的字符串
      // function getStr(array){
      //   str += "[";
      //   array.forEach((value,index) => {
      //     if(value instanceof Array){
      //       if(index && index < array.length){
      //         str += ",";
      //       }
      //       getStr(value)
      //     }
      //     else{
      //       if(index == array.length - 1){
      //         str += value;
      //       }
      //       else{
      //         str += (value.toString() + ",")
      //       }
      //     }
      //   })
      //   str += "]";
      // }
      // 转换字符串
      // getStr(geometry.rings);
      // let formText = 
      // `[{"geometry":{"rings":${str}},"attributes":{
      //     "OBJECTID":${OBJECTID},
      //     "NAME":"${NAME}",
      //     "CITY":"${CITY}"
      //   }}]`;
      
      this.currentFeatureLayer.applyEdits({
        updateFeatures:[{
          "geometry": geometry,
          "attributes":{
            "OBJECTID": attributes.OBJECTID,
            "NAME": NAME,
            "CITY": CITY
          }
        }]
      })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error.message)
      })
    

    },
    /**
     * 点击图层
     */
    handleClickFeatureLayer(graphic){
      this.currentNewGraphic = graphic;
    }
  }
};
</script>
<style lang="scss" scoped>
.editContainer {
  width: 1110px;
  height: 500px;
  border: solid 1px;
  overflow: hidden;
  box-sizing: border-box;
  text-align: left;
  .left {
    float: left;
    width: 200px;
    height: 500px;
    .container {
      li {
        line-height: 30px;
        &:hover {
          background: #eee;
        }
      }
    }
  }
  .center {
    float: left;
    width: 700px;
    height: 100%;
    border: solid 1px;
    #map {
      width: 100%;
      height: 600px;
    }
  }
  .right {
    float: left;
    width: 200px;
    height: 100%;
  }
}
</style>