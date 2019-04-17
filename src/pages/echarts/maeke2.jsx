import React from 'react';
import moment from "moment";
moment.locale('zh-cn');
import { Pagination, Breadcrumb,Select, Row, Col, Input, DatePicker, Button,Icon, Table, message, Spin } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
import {Link, hashHistory} from 'react-router';
import { Map, MarkerList,Marker,PointLabel, NavigationControl, MapTypeControl, ScaleControl, OverviewMapControl, PanoramaControl,InfoWindow } from 'react-bmap';


import $jsonp from '../../utils/service.js';
import api from '../../utils/api.js';
import styles from './echarts.less'

import ReactEcharts from 'echarts-for-react';

// 引入 ECharts 主模块

var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

let self;
var markerData = [
    {
        text: "长沙大道",
        location: "113.22183,28.191712"
    },
    {
        text: "机场高速",
        location: "113.057565,28.175208"
    },
    {
        text: "梅溪湖隧道",
        location: "112.892215,28.176181"
    },
    {
        text: "长沙大道",
        location: "113.022513,28.175952"
    },
    {
        text: "机场高速",
        location: "113.217251,28.191288"
    },
    {
        text: "长张高速",
        location: "112.861765,28.239533"
    },
    {
        text: "浏阳河大桥",
        location: "113.118219,28.179502"
    },
    {
        text: "三环线",
        location: "113.184336,28.123098"
    },
    {
        text: "长张高速",
        location: "112.566241,28.329692"
    },
    {
        text: "长沙绕城高速",
        location: "113.184336,28.123098"
    }
];
var markers = [
    {
        lng: 116.402544,
        lat: 39.928216
    },
    {
        lng: 119.0874,
        lat: 36.665582
    },
    {
        lng: 112.538537,
        lat: 37.874899
    },
    {
        lng: 114.501011,
        lat: 33.920864
    },
    {
        lng: 109.210063,
        lat: 34.339622
    },
    {
        lng: 99.430831,
        lat: 38.211366
    },
    {
        lng: 89.430831,
        lat: 33.311366
    },
    {
        lng: 99.430831,
        lat: 32.511366
    },
    {
        lng: 79.430831,
        lat: 35.611366
    },
    {
        lng: 83.430831,
        lat: 39.711366
    },
];

var citylist = [{"text":"哈尔滨","location":"14086790.68,5718671.60","count":4},{"text":"长春","location":"13951842.48,5408037.28","count":4},{"text":"大连","location":"13538978.63,4683030.35","count":4},{"text":"济南","location":"13024668.93,4367677.68","count":3},{"text":"沈阳","location":"13741313.13,5104005.77","count":3},{"text":"北京","location":"12959238.56,4825347.47","count":3},{"text":"上海","location":"13523265.31,3641114.64","count":3},{"text":"重庆","location":"11862018.46,3427244.19","count":3},{"text":"温州","location":"13437062.10,3228868.44","count":3},{"text":"广州","location":"12609384.20,2631450.58","count":3},{"text":"成都","location":"11585280.82,3555907.48","count":3},{"text":"长沙","location":"12573153.72,3258106.27","count":3},{"text":"贵阳","location":"11870885.18,3060812.20","count":3},{"text":"杭州","location":"13376484.03,3517857.39","count":3},{"text":"石家庄","location":"12748538.99,4559724.44","count":3},{"text":"武汉","location":"12725273.29,3558757.28","count":3},{"text":"合肥","location":"13050732.25,3717865.48","count":3},{"text":"西安","location":"12127979.30,4051219.02","count":3},{"text":"嘉兴","location":"13443315.62,3578394.42","count":3},{"text":"青岛","location":"13401837.54,4285189.34","count":3},{"text":"南宁","location":"12064197.51,2593908.90","count":3},{"text":"福州","location":"13280886.83,2990092.74","count":2},{"text":"天津","location":"13047444.58,4707506.67","count":2},{"text":"汕头","location":"12989872.35,2658432.29","count":2},{"text":"昆明","location":"11448183.93,2843599.61","count":2},{"text":"南京","location":"13225221.26,3748918.53","count":2},{"text":"惠州","location":"12737687.42,2629176.06","count":2},{"text":"海口","location":"12268256.50,2264181.59","count":2},{"text":"郑州","location":"12649521.59,4105848.27","count":2},{"text":"深圳","location":"12697919.69,2560977.31","count":2},{"text":"金华","location":"13319970.32,3365439.56","count":2},{"text":"乌鲁木齐","location":"9754288.85,5409732.61","count":2},{"text":"佛山","location":"12593536.51,2618504.74","count":2},{"text":"无锡","location":"13393990.44,3674896.25","count":2},{"text":"徐州","location":"13057066.72,4032808.36","count":2},{"text":"东莞","location":"12663646.09,2618419.30","count":2},{"text":"呼和浩特","location":"12441036.70,4961658.65","count":2},{"text":"宁波","location":"13531775.58,3466675.15","count":2},{"text":"常州","location":"13356273.65,3716551.52","count":2},{"text":"洛阳","location":"12519129.85,4088448.61","count":2},{"text":"苏州","location":"13424120.33,3649961.01","count":2},{"text":"南昌","location":"12898120.55,3315255.29","count":2},{"text":"烟台","location":"13520391.89,4478567.99","count":2},{"text":"扬州","location":"13293818.84,3792807.67","count":2},{"text":"厦门","location":"13146520.15,2794850.59","count":2},{"text":"太原","location":"12529930.90,4535569.28","count":2},{"text":"潍坊","location":"13265880.80,4373425.72","count":2},{"text":"泉州","location":"13211798.77,2842902.63","count":2},{"text":"南通","location":"13458706.40,3738531.15","count":2}];


export default class fakse extends React.Component {
	constructor(props) {
		super(props);
		self=this;
		this.state = {
			datepicker:[],
			datepickerShow:"",
			current:1,
			total:10,
			loading:false,
			selectCompanyName:"",
			selectCompanyTelphone: "",
			selectContactor: "",
			selectCompanyType:5,
			selectCompanyTypeText:"不限",
			selectCustomJoinTime:"不限",
			selectCustomJoinTimeType:0,
			startTime:"",
			endTime:"",
			optionMap:"",

		}
		/*datepicker:[moment(),moment()]*/
	}


	componentWillMount(){
		self.loadData(0, 10);
		  
	}
	componentDidMount(){
		

		var BMap = window.BMap
		var map = new BMap.Map("allmap");
		var a1=document.getElementById("allmap")
		var point = new BMap.Point(116.404, 39.915);
		map.centerAndZoom(point, 15);
		
		//创建小狐狸
		var pt = new BMap.Point(116.417, 39.909);
		var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
		
		map.addEventListener("dragend",function(){
			console.log(11)
		});
		
		var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
		map.addOverlay(marker2); 
		// map.addEventListener("tilesloaded",function(){alert("地图加载完毕");});
	}
	
	setInit1(){
		var BMap = window.BMap
		var map = new BMap.Map("allmap"); // 创建Map实例
		map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设    置中心点坐标和地图级别
		map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
		map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
		map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
	}
	//根据页号获取数据的方法
	loadData = (page,pageSize) => {
		return
		$jsonp(self,api.queryCustomer,{
			pageNo:page,
			pageSize:pageSize,
			customerCompanyName:"",
			customerPhone: "",
			customerContacterName: "",
			customerStatus: self.state.selectCompanyType,
			timeStatus:self.state.selectCustomJoinTimeType,
			timeBegin:self.state.startTime,			
			timeEnd:self.state.endTime,
		}).then((res) => {
			console.log(res);

		});

	}
	
	
	onChartClick=(params)=>{
		console.log(params)
	}

	
	
	
	render() {
		let onEvents = {
			'click': this.onChartClick,
		}
		
		const mapEvents = {
			created: (mapInstance) => {

			},
			click: () => {
				console.log('You clicked map');
			},
			
		};

	
		return (
			<Spin spinning={this.state.loading}>
				
				
				<div
				id='allmap'
				style={{
					height:'500px',
					width:"1000px"
				}} />
				<Map
					center={{lng: 116.402544, lat: 39.928216}} 
					zoom="12">
					<Marker position={{lng: 116.402544, lat: 39.928216}} >
					<div style={{background:"red"}}>A MARKER</div>
					</Marker>
				</Map>

				
				<Map center={{lng: 116.402544, lat: 39.928216}} zoom="12">
					<Marker position={{lng: 116.402544, lat: 39.928216}} />
					<NavigationControl />
					<InfoWindow position={{lng: 116.402544, lat: 39.928216}} text="内容" title="标题"/>
				</Map>
			
				
			</Spin>

		)
     }
}
