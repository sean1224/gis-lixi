<template>
	<div class='container'>
		<ul>
			<li><router-link to='/1'>地图的第一个实例</router-link> </li>
			<li><router-link to='/2'>加载WMS（web map service）图片</router-link> </li>
			<li><router-link to='/3'>view的應用</router-link> </li>
			<li><router-link to='/4'>source和layer的應用</router-link> </li>
			<li><router-link to='/5'>设置矢量图层的捕捉容差(未完成)</router-link> </li>
			<li><router-link to='/6'>图标与提示信息(popup未实现)</router-link> </li>
			<li><router-link to='/7'>事件</router-link> </li>
			<li><router-link to='/edit'>在线编辑(arcgis api)</router-link> </li>
		</ul>
	</div>
</template>
<script>
export default{
	name:'navlist'
};
</script>
<style lang='scss' scoped>
.container{
	width: 100%;
	height: 500px;
	text-align: center;
}
.container ul,.container li{
	list-style: none;
}
</style>
