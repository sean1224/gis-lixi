<template>
  <canvas
    id="canvas"
    width="1800px"
    height="800px"
    style="border: 1px solid #ebebed;width: 900px;height: 400px;box-sizing:border-box"
  ></canvas>
</template>
<script>
import axios from "axios";
export default {
  name: "canvasChart",
  data() {
    return { 
      config: {
          scale:2,
        width: 1800,
        height: 800,
        Left: 70,
        Top: 90,
        Right: 30,
        Bottom: 60,
        color: ["#5266d7"],
        yLine: {
          splitcount: 8,
          data: []
        },
        xLine: {
          splitcount: 9,
          data: []
        } 
      },
      res:null//保存管网点数据
    };
  },
  methods: {
    getContext:()=>{
        let canvas=document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        return ctx;
    },
    /*
    *画出管道
    *data 保存的点数据
    *perX x轴单元长度
    *perY y轴单元长度
    */
    drawpipeNetwork:function(data,perX,perY){  
        var ctx = this.getContext();
        var config=this.config;   
        ctx.beginPath();
        ctx.lineWidth = '60'; 
        // //创建一个从(150,0)到(250,0)的渐变
        // var gradient = ctx.createLinearGradient(0,0,0,800);
        // //添加两种颜色
        // gradient.addColorStop(0, "white");
        // gradient.addColorStop(0.3, "red");
        // gradient.addColorStop(1, '#ccc');
        ctx.strokeStyle = '#ccc'; 
        //函数纵坐标减去30是stroke宽度为60
        ctx.moveTo(data[0].x*perX+config.Left,(config.height-config.Bottom-(data[0].y-1)*perY)-30)  
        data.forEach(function(item){  
          ctx.lineTo(item.x*perX+config.Left,(config.height-config.Bottom-(item.y-1)*perY)-30) 
        }); 
        ctx.stroke();
        ctx.closePath();
    },
    /*
    *画出最低水位
    *data 保存的点数据
    *perX x轴单元长度
    *perY y轴单元长度
    */
    drawLowLine:function(data,perX,perY){
        var ctx = this.getContext();
        var config=this.config;   
        ctx.beginPath();
        ctx.lineWidth = '2';  
        ctx.strokeStyle = 'blue';  
        ctx.moveTo(data[0].x*perX+config.Left,(config.height-config.Bottom-(data[0].y-1)*perY))  
        data.forEach(function(item){   
          ctx.lineTo(item.x*perX+config.Left,(config.height-config.Bottom-(item.y-1)*perY)) 
        }); 
        ctx.stroke();
        ctx.closePath();
    },
    /*
    *画出最高水位
    *data 保存的点数据
    *perX x轴单元长度
    *perY y轴单元长度
    */
    drawHighLine:function(data,perX,perY){
        var ctx = this.getContext();
        var config=this.config;   
        ctx.beginPath();
        ctx.lineWidth = '2';  
        ctx.strokeStyle = 'red';  
        ctx.moveTo(data[0].x*perX+config.Left,(config.height-config.Bottom-(data[0].y-1+parseFloat(data[0]["maxDepth"]))*perY))   
        data.forEach(function(item){    
          ctx.lineTo(item.x*perX+config.Left,(config.height-config.Bottom-parseFloat(item.y-1+parseFloat(item["maxDepth"]))*perY)) 
        }); 
        ctx.stroke();
        ctx.closePath();
    },
    /*
    *画出坐标X轴
    *@color 颜色
    *@splitcount 分割单元数
    *@linewidth 线宽
    *@data x轴数据源
    */
    drawBackLineY:function(color, splitcount, linewidth, data) {
        var config = this.config;
        var len = Math.floor((config.height - config.Top - config.Bottom)/splitcount); 
        var start = config.Top;
        for (var i = 0; i <= splitcount; i++) {
            var point = start+len*i; 
            this.drawLine(config.Left, point, (config.width/2*config.scale - config.Right), point, color, linewidth);
            this.drawText(data[splitcount-i], 30, point, 'normal 22px Arial', '#605d68');
        } 
    },
    /*
    *画出坐标Y轴
    *@color 颜色
    *@splitcount 分割单元数
    *@linewidth 线宽
    *@data y轴数据源
    */
    drawBackLineX:function(color, splitcount, linewidth, data) {
        var config =this.config; 
        var len = Math.floor((config.width - config.Left - config.Right)/splitcount);
        var start = config.Left; 
        for (var i = 0; i <= splitcount; i++) {
            var point = start+len*i;
            this.drawLine(point, config.Top,point,(config.height/2*config.scale  - config.Bottom), color, linewidth);
            this.drawText(data[i],point-30, config.height-20, 'normal 22px Arial', '#605d68');
        } 
    },
    /*
    *画线
    *@startX 起始点x轴坐标
    *@startY 起始点y轴坐标
    *@endX 起始点x轴坐标
    *@endY 起始点y轴坐标
    *@color 线条颜色
    *@width 线条宽度
    *@lineJoin 线条连接选项
    */
    drawLine:function(startX, startY, endX, endY, color, width, lineJoin) {
        var ctx = this.getContext();
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        if(color){
            ctx.strokeStyle = color
        }

        if(width){
            ctx.lineWidth = width*this.config.scale;
        }

        if(lineJoin){
            ctx.lineJoin = lineJoin;
        }
        
        ctx.closePath();
        ctx.stroke(); 
    },
    /*
    *写字函数
    *@text 字的内容
    *@x 横坐标
    *@y 纵坐标
    *@font 字体
    *@color 字体颜色
    */
    drawText:function(text, x, y, font, color) {
        var ctx =this.getContext();
        ctx.font= font;
        ctx.fillStyle= color;
        ctx.fillText(text, x, y);
    },
    /*
    *获取x轴纵坐标的标注数组
    *@value 纵坐标的最大值
    *@splitMount 分割数目
    *@fixed 小数点位数
    */
    getAxiasItem:function(value,splitMount,fixed){
        let res=[];
        let i=0;
        do{
          res.push((value/splitMount*i).toFixed(fixed));
          i++;
        }
        while(i<=splitMount);
        return res;
    },
    /*
    *绘制图例
    *@text 图例内容
    *@x 放置横坐标
    *@y 放置纵坐标
    *@color 图例颜色
    *@linewidth 图例宽度
    */
    drawItem:function(text,x,y, color, linewidth) { 
      this.drawText(text, x, y, 'normal 22px Arial', '#605d68');
      this.drawLine(x+70, y-5,x+120, y-5, color, linewidth);
    }
  },
  created() {
    let _this = this;
    axios
      .get("/api/linePoint.json")
      .then(res => {
        if (res.status == 200) {
          //使用变量保存下来接口中的点和线的数据
          let pointData = res.data.pointData;
          let lineData = res.data.lineData; 
          //遍历点的数据获取管网对应各点的坐标参数，保存在数组arr中
          let arr = [];
          let lenX = 0;//x轴长度
          let lenY= 0;//y轴长度 
          if (pointData.length != 0) {
            for (let i = 0; i < pointData.length; i++) {
              //获取x轴长度
              if (i > 0) {
                lenX += lineData[i - 1]["长度"];
              }
              //获取y轴长度
              if(pointData[i]["内底标高"]>lenY){
                  lenY=pointData[i]["内底标高"]
              }
              arr.push({
                x: lenX,
                y: pointData[i]["内底标高"],
                minDepth: pointData[i]["初始深度"],
                maxDepth: pointData[i]["最大深度"]
              });
            } 
            _this.res=arr;  
            //   画出坐标轴
            let config = this.config; 
            this.drawText('水管剖面图', 850, 40, 'normal 26px Arial', '#605d68');
            this.drawItem('水管',config.width-150,50,'#ccc','1');
            this.drawItem('高水位',config.width-300,50,'red','1');
            this.drawItem('低水位',config.width-450,50,'blue','1');
            this.drawBackLineY('#ccc', config.yLine.splitcount, 1, [1,2,3,4,5,6,7,8,9]);
            this.drawBackLineX('#ccc',config.xLine.splitcount,1,this.getAxiasItem(lenX,10,0)); 
            this.drawpipeNetwork(this.res,((config.width-config.Left-config.Right)/lenX).toFixed(2),((config.height-config.Bottom-config.Top)/8).toFixed(4));
            this.drawLowLine(this.res,((config.width-config.Left-config.Right)/lenX).toFixed(2),((config.height-config.Bottom-config.Top)/8).toFixed(4));
            this.drawHighLine(this.res,((config.width-config.Left-config.Right)/lenX).toFixed(2),((config.height-config.Bottom-config.Top)/8).toFixed(4));
          }
        }
      })
      .catch(error => console.log(error));
  },
  mounted () {
  }
};
</script>
<style>
</style>


