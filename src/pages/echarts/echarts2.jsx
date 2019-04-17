import React from 'react';
import moment from "moment";
moment.locale('zh-cn');
import { Pagination, Breadcrumb,Select, Row, Col, Input, DatePicker, Button,Icon, Table, message, Spin } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
import {Link, hashHistory} from 'react-router';
import {Map, Marker, NavigationControl, InfoWindow,MarkerList,PointLabel} from 'react-bmap';

import $jsonp from '../../utils/service.js';
import api from '../../utils/api.js';
import styles from './echarts.less'

import ReactEcharts from 'echarts-for-react';

import 'echarts/map/js/china.js';
import 'echarts/map/js/province/anhui.js';
import 'echarts/map/js/province/aomen.js';
import 'echarts/map/js/province/beijing.js';
import 'echarts/map/js/province/chongqing.js';
import 'echarts/map/js/province/fujian.js';
import 'echarts/map/js/province/gansu.js';
import 'echarts/map/js/province/guangdong.js';
import 'echarts/map/js/province/guangxi.js';
import 'echarts/map/js/province/guizhou.js';
import 'echarts/map/js/province/hainan.js';
import 'echarts/map/js/province/hebei.js';
import 'echarts/map/js/province/heilongjiang.js';
import 'echarts/map/js/province/henan.js';
import 'echarts/map/js/province/hubei.js';
import 'echarts/map/js/province/hunan.js';
import 'echarts/map/js/province/jiangsu.js';
import 'echarts/map/js/province/jiangxi.js';
import 'echarts/map/js/province/jilin.js';
import 'echarts/map/js/province/liaoning.js';
import 'echarts/map/js/province/neimenggu.js';
import 'echarts/map/js/province/ningxia.js';
import 'echarts/map/js/province/qinghai.js';
import 'echarts/map/js/province/shandong.js';
import 'echarts/map/js/province/shanghai.js';
import 'echarts/map/js/province/shanxi.js';
import 'echarts/map/js/province/shanxi1.js';
import 'echarts/map/js/province/sichuan.js';
import 'echarts/map/js/province/taiwan.js';
import 'echarts/map/js/province/tianjin.js';
import 'echarts/map/js/province/xianggang.js';
import 'echarts/map/js/province/xinjiang.js';
import 'echarts/map/js/province/xizang.js';
import 'echarts/map/js/province/yunnan.js';
import 'echarts/map/js/province/zhejiang.js';

// 引入 ECharts 主模块

var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');


var ecConfig = require('./config');
let self;
let optionMain="";
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
var citylist = [{"text":"哈尔滨","location":"14086790.68,5718671.60","count":4},{"text":"长春","location":"13951842.48,5408037.28","count":4},{"text":"大连","location":"13538978.63,4683030.35","count":4},{"text":"济南","location":"13024668.93,4367677.68","count":3},{"text":"沈阳","location":"13741313.13,5104005.77","count":3},{"text":"北京","location":"12959238.56,4825347.47","count":3},{"text":"上海","location":"13523265.31,3641114.64","count":3},{"text":"重庆","location":"11862018.46,3427244.19","count":3},{"text":"温州","location":"13437062.10,3228868.44","count":3},{"text":"广州","location":"12609384.20,2631450.58","count":3},{"text":"成都","location":"11585280.82,3555907.48","count":3},{"text":"长沙","location":"12573153.72,3258106.27","count":3},{"text":"贵阳","location":"11870885.18,3060812.20","count":3},{"text":"杭州","location":"13376484.03,3517857.39","count":3},{"text":"石家庄","location":"12748538.99,4559724.44","count":3},{"text":"武汉","location":"12725273.29,3558757.28","count":3},{"text":"合肥","location":"13050732.25,3717865.48","count":3},{"text":"西安","location":"12127979.30,4051219.02","count":3},{"text":"嘉兴","location":"13443315.62,3578394.42","count":3},{"text":"青岛","location":"13401837.54,4285189.34","count":3},{"text":"南宁","location":"12064197.51,2593908.90","count":3},{"text":"福州","location":"13280886.83,2990092.74","count":2},{"text":"天津","location":"13047444.58,4707506.67","count":2},{"text":"汕头","location":"12989872.35,2658432.29","count":2},{"text":"昆明","location":"11448183.93,2843599.61","count":2},{"text":"南京","location":"13225221.26,3748918.53","count":2},{"text":"惠州","location":"12737687.42,2629176.06","count":2},{"text":"海口","location":"12268256.50,2264181.59","count":2},{"text":"郑州","location":"12649521.59,4105848.27","count":2},{"text":"深圳","location":"12697919.69,2560977.31","count":2},{"text":"金华","location":"13319970.32,3365439.56","count":2},{"text":"乌鲁木齐","location":"9754288.85,5409732.61","count":2},{"text":"佛山","location":"12593536.51,2618504.74","count":2},{"text":"无锡","location":"13393990.44,3674896.25","count":2},{"text":"徐州","location":"13057066.72,4032808.36","count":2},{"text":"东莞","location":"12663646.09,2618419.30","count":2},{"text":"呼和浩特","location":"12441036.70,4961658.65","count":2},{"text":"宁波","location":"13531775.58,3466675.15","count":2},{"text":"常州","location":"13356273.65,3716551.52","count":2},{"text":"洛阳","location":"12519129.85,4088448.61","count":2},{"text":"苏州","location":"13424120.33,3649961.01","count":2},{"text":"南昌","location":"12898120.55,3315255.29","count":2},{"text":"烟台","location":"13520391.89,4478567.99","count":2},{"text":"扬州","location":"13293818.84,3792807.67","count":2},{"text":"厦门","location":"13146520.15,2794850.59","count":2},{"text":"太原","location":"12529930.90,4535569.28","count":2},{"text":"潍坊","location":"13265880.80,4373425.72","count":2},{"text":"泉州","location":"13211798.77,2842902.63","count":2},{"text":"南通","location":"13458706.40,3738531.15","count":2}];
var simpleMapStyle = {
    styleJson: [
        {
            "featureType": "all",
            "elementType": "all",
            "stylers": {
                "lightness": 41,
                "saturation": -70
            }
        }
    ]
}

export default class customerlist extends React.Component {
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
			provinceMap:"",
			optionMap:"",

		}
		/*datepicker:[moment(),moment()]*/
	}


	componentWillMount(){

		self.loadData(0, 10);
		
		  
	}
	componentDidMount(){
		self.getOption2();
		self.getMapSelected();
		self.initMain4();
		var myChart = echarts.init(document.getElementById('main'));
		var option = {
			title : {
				text: 'iphone销量',
				subtext: '纯属虚构',
				left: 'center'
			},
			tooltip : {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data:['iphone3','iphone4','iphone5']
			},
			visualMap: {
				min: 0,
				max: 2500,
				left: 'left',
				top: 'bottom',
				text:['高','低'],           // 文本，默认为数值文本
				calculable : true
			},
			toolbox: {
				show: true,
				orient : 'vertical',
				left: 'right',
				top: 'center',
				feature : {
					mark : {show: true},
					dataView : {show: true, readOnly: false},
					restore : {show: true},
					saveAsImage : {show: true}
				}
			},
			series : [
				{
					name: 'iphone3',
					type: 'map',
					mapType: 'china',
					roam: false,
					label: {
						normal: {
							show: false
						},
						emphasis: {
							show: true
						}
					},
					data:[
						{name: '北京',value: Math.round(Math.random()*1000)},
						{name: '天津',value: Math.round(Math.random()*1000)},
						{name: '上海',value: Math.round(Math.random()*1000)},
						{name: '重庆',value: Math.round(Math.random()*1000)},
						{name: '河北',value: Math.round(Math.random()*1000)},
						{name: '河南',value: Math.round(Math.random()*1000)},
						{name: '云南',value: Math.round(Math.random()*1000)},
						{name: '辽宁',value: Math.round(Math.random()*1000)},
						{name: '黑龙江',value: Math.round(Math.random()*1000)},
						{name: '湖南',value: Math.round(Math.random()*1000)},
						{name: '安徽',value: Math.round(Math.random()*1000)},
						{name: '山东',value: Math.round(Math.random()*1000)},
						{name: '新疆',value: Math.round(Math.random()*1000)},
						{name: '江苏',value: Math.round(Math.random()*1000)},
						{name: '浙江',value: Math.round(Math.random()*1000)},
						{name: '江西',value: Math.round(Math.random()*1000)},
						{name: '湖北',value: Math.round(Math.random()*1000)},
						{name: '广西',value: Math.round(Math.random()*1000)},
						{name: '甘肃',value: Math.round(Math.random()*1000)},
						{name: '山西',value: Math.round(Math.random()*1000)},
						{name: '内蒙古',value: Math.round(Math.random()*1000)},
						{name: '陕西',value: Math.round(Math.random()*1000)},
						{name: '吉林',value: Math.round(Math.random()*1000)},
						{name: '福建',value: Math.round(Math.random()*1000)},
						{name: '贵州',value: Math.round(Math.random()*1000)},
						{name: '广东',value: Math.round(Math.random()*1000)},
						{name: '青海',value: Math.round(Math.random()*1000)},
						{name: '西藏',value: Math.round(Math.random()*1000)},
						{name: '四川',value: Math.round(Math.random()*1000)},
						{name: '宁夏',value: Math.round(Math.random()*1000)},
						{name: '海南',value: Math.round(Math.random()*1000)},
						{name: '台湾',value: Math.round(Math.random()*1000)},
						{name: '香港',value: Math.round(Math.random()*1000)},
						{name: '澳门',value: Math.round(Math.random()*1000)}
					]
				},
				{
					name: 'iphone4',
					type: 'map',
					mapType: 'china',
					label: {
						normal: {
							show: false
						},
						emphasis: {
							show: true
						}
					},
					data:[
						{name: '北京',value: Math.round(Math.random()*1000)},
						{name: '天津',value: Math.round(Math.random()*1000)},
						{name: '上海',value: Math.round(Math.random()*1000)},
						{name: '重庆',value: Math.round(Math.random()*1000)},
						{name: '河北',value: Math.round(Math.random()*1000)},
						{name: '安徽',value: Math.round(Math.random()*1000)},
						{name: '新疆',value: Math.round(Math.random()*1000)},
						{name: '浙江',value: Math.round(Math.random()*1000)},
						{name: '江西',value: Math.round(Math.random()*1000)},
						{name: '山西',value: Math.round(Math.random()*1000)},
						{name: '内蒙古',value: Math.round(Math.random()*1000)},
						{name: '吉林',value: Math.round(Math.random()*1000)},
						{name: '福建',value: Math.round(Math.random()*1000)},
						{name: '广东',value: Math.round(Math.random()*1000)},
						{name: '西藏',value: Math.round(Math.random()*1000)},
						{name: '四川',value: Math.round(Math.random()*1000)},
						{name: '宁夏',value: Math.round(Math.random()*1000)},
						{name: '香港',value: Math.round(Math.random()*1000)},
						{name: '澳门',value: Math.round(Math.random()*1000)}
					]
				},
				{
					name: 'iphone5',
					type: 'map',
					mapType: 'china',
					label: {
						normal: {
							show: false
						},
						emphasis: {
							show: true
						}
					},
					data:[
						{name: '北京',value: Math.round(Math.random()*1000)},
						{name: '天津',value: Math.round(Math.random()*1000)},
						{name: '上海',value: Math.round(Math.random()*1000)},
						{name: '广东',value: Math.round(Math.random()*1000)},
						{name: '台湾',value: Math.round(Math.random()*1000)},
						{name: '香港',value: Math.round(Math.random()*1000)},
						{name: '澳门',value: Math.round(Math.random()*1000)}
					]
				}
			]
		};
		var option1={
			title: {
				text: 'ECharts 入门示例'
			},
			tooltip: {},
			xAxis: {
				data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
			},
			yAxis: {},
			series: [{
				name: '销量',
				type: 'bar',
				data: [5, 20, 36, 10, 10, 20]
			}]
		}
		myChart.setOption(option);
		
		myChart.on('click', function (params) {
			var city = params.name;
			console.log(city)
			const option11 = {
				title: {
					text: 'iphone销量',
					subtext: '纯属虚构',
					left: 'center'
				},
				tooltip : {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data:['iphone3','iphone4','iphone5']
				},
				
				toolbox: {
					show: true,
					orient : 'vertical',
					left: 'right',
					top: 'center',
					feature : {
						mark : {show: true},
						dataView : {show: true, readOnly: false},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				series: [
					{
						name: 'iphone4',
						type: 'map',
						mapType: city,
						roam: false,
						label: {
							normal: {
								show: true
							},
							emphasis: {
								show: true
							}
						},
						data:[
							
						]
					}
				]
			};
			self.setState({
				provinceMap:option11
			})

			
		});
	}
	
	//根据页号获取数据的方法
	loadData = (page,pageSize) => {

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
	getOption=()=>{
		const option = {
			title: {
				text: 'ECharts 入门示例'
			},
			legend: {
				x:'right',
				selectedMode:false,
				data:['销量','拉车']
			},
			visualMap: {
				min: 0,
				max: 2500,
				left: 'left',
				top: 'bottom',
				text:['高','低'],           // 文本，默认为数值文本
				calculable : true
			},
			tooltip: {},
			xAxis: {
				data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
			},
			yAxis: {},
			series: [{
				name: '销量',
				type: 'bar',
				label: {
					normal: {
						show: false
					},
					emphasis: {
						show: true
					}
				},
				data: [23, 11, 22, 3, 7, 9]
			},{
				name: '拉车',
				type: 'bar',
				label: {
					normal: {
						show: false
					},
					emphasis: {
						show: true
					}
				},
				data: [5, 20, 36, 10, 10, 20]
			}]
		}
		return option
	}
	getOption1=()=>{
		var option4 = {
			title : {
				text: 'iphone销量',
				subtext: '纯属虚构',
				left: 'center'
			},
			tooltip : {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data:['iphone3','iphone4','iphone5']
			},
			visualMap: {
				min: 0,
				max: 2500,
				left: 'left',
				top: 'bottom',
				text:['高','低'],           // 文本，默认为数值文本
				calculable : true
			},
			toolbox: {
				show: true,
				orient : 'vertical',
				left: 'right',
				top: 'center',
				feature : {
					mark : {show: true},
					dataView : {show: true, readOnly: false},
					restore : {show: true},
					saveAsImage : {show: true}
				}
			},
			series : [
				{
					name: 'iphone3',
					type: 'map',
					mapType: 'china',
					roam: false,
					label: {
						normal: {
							show: false
						},
						emphasis: {
							show: true
						}
					},
					data:[
						{name: '北京',value: Math.round(Math.random()*1000)},
						{name: '天津',value: Math.round(Math.random()*1000)},
						{name: '上海',value: Math.round(Math.random()*1000)},
						{name: '重庆',value: Math.round(Math.random()*1000)},
						{name: '河北',value: Math.round(Math.random()*1000)},
						{name: '河南',value: Math.round(Math.random()*1000)},
						{name: '云南',value: Math.round(Math.random()*1000)},
						{name: '辽宁',value: Math.round(Math.random()*1000)},
						{name: '黑龙江',value: Math.round(Math.random()*1000)},
						{name: '湖南',value: Math.round(Math.random()*1000)},
						{name: '安徽',value: Math.round(Math.random()*1000)},
						{name: '山东',value: Math.round(Math.random()*1000)},
						{name: '新疆',value: Math.round(Math.random()*1000)},
						{name: '江苏',value: Math.round(Math.random()*1000)},
						{name: '浙江',value: Math.round(Math.random()*1000)},
						{name: '江西',value: Math.round(Math.random()*1000)},
						{name: '湖北',value: Math.round(Math.random()*1000)},
						{name: '广西',value: Math.round(Math.random()*1000)},
						{name: '甘肃',value: Math.round(Math.random()*1000)},
						{name: '山西',value: Math.round(Math.random()*1000)},
						{name: '内蒙古',value: Math.round(Math.random()*1000)},
						{name: '陕西',value: Math.round(Math.random()*1000)},
						{name: '吉林',value: Math.round(Math.random()*1000)},
						{name: '福建',value: Math.round(Math.random()*1000)},
						{name: '贵州',value: Math.round(Math.random()*1000)},
						{name: '广东',value: Math.round(Math.random()*1000)},
						{name: '青海',value: Math.round(Math.random()*1000)},
						{name: '西藏',value: Math.round(Math.random()*1000)},
						{name: '四川',value: Math.round(Math.random()*1000)},
						{name: '宁夏',value: Math.round(Math.random()*1000)},
						{name: '海南',value: Math.round(Math.random()*1000)},
						{name: '台湾',value: Math.round(Math.random()*1000)},
						{name: '香港',value: Math.round(Math.random()*1000)},
						{name: '澳门',value: Math.round(Math.random()*1000)}
					]
				},
				{
					name: 'iphone4',
					type: 'map',
					mapType: 'china',
					label: {
						normal: {
							show: false
						},
						emphasis: {
							show: true
						}
					},
					data:[
						{name: '北京',value: Math.round(Math.random()*1000)},
						{name: '天津',value: Math.round(Math.random()*1000)},
						{name: '上海',value: Math.round(Math.random()*1000)},
						{name: '重庆',value: Math.round(Math.random()*1000)},
						{name: '河北',value: Math.round(Math.random()*1000)},
						{name: '安徽',value: Math.round(Math.random()*1000)},
						{name: '新疆',value: Math.round(Math.random()*1000)},
						{name: '浙江',value: Math.round(Math.random()*1000)},
						{name: '江西',value: Math.round(Math.random()*1000)},
						{name: '山西',value: Math.round(Math.random()*1000)},
						{name: '内蒙古',value: Math.round(Math.random()*1000)},
						{name: '吉林',value: Math.round(Math.random()*1000)},
						{name: '福建',value: Math.round(Math.random()*1000)},
						{name: '广东',value: Math.round(Math.random()*1000)},
						{name: '西藏',value: Math.round(Math.random()*1000)},
						{name: '四川',value: Math.round(Math.random()*1000)},
						{name: '宁夏',value: Math.round(Math.random()*1000)},
						{name: '香港',value: Math.round(Math.random()*1000)},
						{name: '澳门',value: Math.round(Math.random()*1000)}
					]
				},
				{
					name: 'iphone5',
					type: 'map',
					mapType: 'china',
					label: {
						normal: {
							show: false
						},
						emphasis: {
							show: true
						}
					},
					data:[
						{name: '北京',value: Math.round(Math.random()*1000)},
						{name: '天津',value: Math.round(Math.random()*1000)},
						{name: '上海',value: Math.round(Math.random()*1000)},
						{name: '广东',value: Math.round(Math.random()*1000)},
						{name: '台湾',value: Math.round(Math.random()*1000)},
						{name: '香港',value: Math.round(Math.random()*1000)},
						{name: '澳门',value: Math.round(Math.random()*1000)}
					]
				}
			]
		};
		
		return option4
	}
	getOption2=()=>{
		const option = {
			title: {
				text: 'iphone销量',
				subtext: '纯属虚构',
				left: 'center'
			},
			tooltip : {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data:['iphone3','iphone4','iphone5']
			},
			
			toolbox: {
				show: true,
				orient : 'vertical',
				left: 'right',
				top: 'center',
				feature : {
					mark : {show: true},
					dataView : {show: true, readOnly: false},
					restore : {show: true},
					saveAsImage : {show: true}
				}
			},
			series: [
				{
					name: 'iphone3',
					type: 'map',
					mapType: '上海',
					roam: false,
					label: {
						normal: {
							show: true
						},
						emphasis: {
							show: true
						}
					},
					data:[
						{name: '北京',value: Math.round(Math.random()*1000)},
						{name: '天津',value: Math.round(Math.random()*1000)},
						{name: '上海',value: Math.round(Math.random()*1000)},
						{name: '广东',value: Math.round(Math.random()*1000)},
						{name: '台湾',value: Math.round(Math.random()*1000)},
						{name: '香港',value: Math.round(Math.random()*1000)},
						{name: '澳门',value: Math.round(Math.random()*1000)}
					]
				},
				{
					name: 'iphone4',
					type: 'map',
					mapType: '湖北',
					roam: false,
					label: {
						normal: {
							show: true
						},
						emphasis: {
							show: true
						}
					},
					data:[
						{name: '黄石市',value: Math.round(Math.random()*1000)},
						{name: '十堰市',value: Math.round(Math.random()*1000)},
						{name: '宜昌市',value: Math.round(Math.random()*1000)},
						{name: '襄阳市',value: Math.round(Math.random()*1000)},
						{name: '鄂州市',value: Math.round(Math.random()*1000)},
						{name: '荆门市',value: Math.round(Math.random()*1000)},
						{name: '孝感市',value: Math.round(Math.random()*1000)}
					]
				}
			]
		};
		return option
	}

	getMultiple=()=>{
		var colors = ['#5793f3', '#d14a61', '#675bba'];

		var	option = {
				color: colors,

				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				grid: {
					right: '20%'
				},
				toolbox: {
					feature: {
						dataView: {show: true, readOnly: false},
						restore: {show: true},
						saveAsImage: {show: true}
					}
				},
				legend: {
					data:['蒸发量','降水量','平均温度']
				},
				xAxis: [
					{
						type: 'category',
						axisTick: {
							alignWithLabel: true
						},
						data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					}
				],
				yAxis: [
					{
						type: 'value',
						name: '蒸发量',
						min: 0,
						max: 250,
						position: 'right',
						axisLine: {
							lineStyle: {
								color: colors[0]
							}
						},
						axisLabel: {
							formatter: '{value} ml'
						}
					},
					{
						type: 'value',
						name: '降水量',
						min: 0,
						max: 250,
						position: 'right',
						offset: 80,
						axisLine: {
							lineStyle: {
								color: colors[1]
							}
						},
						axisLabel: {
							formatter: '{value} ml'
						}
					},
					{
						type: 'value',
						name: '温度',
						min: 0,
						max: 25,
						position: 'left',
						axisLine: {
							lineStyle: {
								color: colors[2]
							}
						},
						axisLabel: {
							formatter: '{value} °C'
						}
					}
				],
				series: [
					{
						name:'蒸发量',
						type:'bar',
						data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
					},
					{
						name:'降水量',
						type:'bar',
						yAxisIndex: 1,
						data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
					},
					{
						name:'平均温度',
						type:'line',
						yAxisIndex: 2,
						data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
					}
				]
			};
			return option
	}
	getMapSelected=()=>{
		var option1 = {
			title : {
				text: '2011全国GDP（亿元）',
				subtext: '数据来自国家统计局'
			},
			tooltip : {
				trigger: 'item'
			},
			legend: {
				x:'right',
				y:'top',
				selectedMode:false,
				data:['北京','上海','广东']
			},
			dataRange: {
				orient: 'horizontal',
				min: 0,
				max: 55000,
				text:['高','低'],           // 文本，默认为数值文本
				splitNumber:0
			},
			toolbox: {
				show : true,
				orient: 'vertical',
				x:'right',
				y:'center',
				feature : {
					mark : {show: true},
					dataView : {show: true, readOnly: false}
				}
			},
			series : [
				{
					name: '2011全国GDP分布',
					type: 'map',
					mapType: 'china',
					mapLocation: {
						x: 'left'
					},
					
					selectedMode : 'multiple',
					itemStyle:{
						normal:{label:{show:true}},
						emphasis:{label:{show:true}}
					},
					data:[
						{name:'西藏', value:605.83},
						{name:'青海', value:1670.44},
						{name:'宁夏', value:2102.21},
						{name:'海南', value:2522.66},
						{name:'甘肃', value:5020.37},
						{name:'贵州', value:5701.84},
						{name:'新疆', value:6610.05},
						{name:'云南', value:8893.12},
						{name:'重庆', value:10011.37},
						{name:'吉林', value:10568.83},
						{name:'山西', value:11237.55},
						{name:'天津', value:11307.28},
						{name:'江西', value:11702.82},
						{name:'广西', value:11720.87},
						{name:'陕西', value:12512.3},
						{name:'黑龙江', value:12582},
						{name:'内蒙古', value:14359.88},
						{name:'安徽', value:15300.65},
						{name:'北京', value:16251.93, selected:true},
						{name:'福建', value:17560.18},
						{name:'上海', value:19195.69, selected:true},
						{name:'湖北', value:19632.26},
						{name:'湖南', value:19669.56},
						{name:'四川', value:21026.68},
						{name:'辽宁', value:22226.7},
						{name:'河北', value:24515.76},
						{name:'河南', value:26931.03},
						{name:'浙江', value:32318.85},
						{name:'山东', value:45361.85},
						{name:'江苏', value:49110.27},
						{name:'广东', value:53210.28, selected:true}
					]
				},
				{
					name:'2011全国GDP对比',
					type:'pie',
					roseType : 'area',
					center: [document.getElementById('main2').offsetWidth - 250, 225],
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					
					radius: [30, 120],
					data:[
						{name: '北京', value: 16251.93},
						{name: '上海', value: 19195.69},
						{name: '广东', value: 53210.28}
					]
				}
			],
			animation: false
		};
		self.setState({
			optionMap:option1
		},()=>{
			console.log(self.state.optionMap)
		})
		
	}
	onChartClick=()=>{
		console.log(11)
	}
	onChartLegendselectchanged=()=>{
		console.log(22)
	}
	onChartmapSelected=(param)=>{
		var selected = param.batch[0].selected;
		console.log(param)
		var option=self.state.optionMap
		var mapSeries = option.series[0];
		var data = [];
		var legendData = [];
		var name;
		for (var p = 0, len = mapSeries.data.length; p < len; p++) {
			name = mapSeries.data[p].name;
			//mapSeries.data[p].selected = selected[name];
			if (selected[name]) {
				data.push({
					name: name,
					value: mapSeries.data[p].value
				});
				legendData.push(name);
			}
		}
		option.legend.data = legendData;
		option.series[1].data = data;
		self.setState({
			optionMap:option
		},()=>{
			console.log(self.state.optionMap)
		})
		
	}
	initMain4=()=>{
		var myChart = echarts.init(document.getElementById('main3'));
		optionMain = {
			title : {
				text: '2011全国GDP（亿元）',
				subtext: '数据来自国家统计局'
			},
			tooltip : {
				trigger: 'item'
			},
			legend: {
				x:'right',
				selectedMode:false,
				data:['北京','上海','广东']
			},
			dataRange: {
				orient: 'horizontal',
				min: 0,
				max: 55000,
				text:['高','低'],           // 文本，默认为数值文本
				splitNumber:0
			},
			toolbox: {
				show : true,
				orient: 'vertical',
				x:'right',
				y:'center',
				feature : {
					mark : {show: true},
					dataView : {show: true, readOnly: false}
				}
			},
			series : [
				{
					name: '2011全国GDP分布',
					type: 'map',
					mapType: 'china',
					mapLocation: {
						x: 'left'
					},
					selectedMode : 'multiple',
					itemStyle:{
						normal:{label:{show:true}},
						emphasis:{label:{show:true}}
					},
					data:[
						{name:'西藏', value:605.83},
						{name:'青海', value:1670.44},
						{name:'宁夏', value:2102.21},
						{name:'海南', value:2522.66},
						{name:'甘肃', value:5020.37},
						{name:'贵州', value:5701.84},
						{name:'新疆', value:6610.05},
						{name:'云南', value:8893.12},
						{name:'重庆', value:10011.37},
						{name:'吉林', value:10568.83},
						{name:'山西', value:11237.55},
						{name:'天津', value:11307.28},
						{name:'江西', value:11702.82},
						{name:'广西', value:11720.87},
						{name:'陕西', value:12512.3},
						{name:'黑龙江', value:12582},
						{name:'内蒙古', value:14359.88},
						{name:'安徽', value:15300.65},
						{name:'北京', value:16251.93, selected:true},
						{name:'福建', value:17560.18},
						{name:'上海', value:19195.69, selected:true},
						{name:'湖北', value:19632.26},
						{name:'湖南', value:19669.56},
						{name:'四川', value:21026.68},
						{name:'辽宁', value:22226.7},
						{name:'河北', value:24515.76},
						{name:'河南', value:26931.03},
						{name:'浙江', value:32318.85},
						{name:'山东', value:45361.85},
						{name:'江苏', value:49110.27},
						{name:'广东', value:53210.28, selected:true}
					]
				},
				{
					name:'2011全国GDP对比',
					type:'pie',
					roseType : 'area',
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					center: [document.getElementById('main3').offsetWidth - 250, 225],
					radius: [30, 120],
					data:[
						{name: '北京', value: 16251.93},
						{name: '上海', value: 19195.69},
						{name: '广东', value: 53210.28}
					]
				}
			],
			animation: false
		};
		myChart.setOption(optionMain);
		myChart.on('mapselectchanged', function (param){
			var selected = param.batch[0].selected;
			console.log(selected)
			
			console.log(param);
			var mapSeries = optionMain.series[0];
			for (var p1 in selected) {
				var value1 = selected[p1];
				//mapSeries.data[p].selected = selected[name];
				if (value1) {
					console.log(p1,value1)
					
					
				}
			}

			var data = [];
			var legendData = [];
			var a0data=[];
			var name;
			for (var p = 0, len = mapSeries.data.length; p < len; p++) {
				name = mapSeries.data[p].name;
				//mapSeries.data[p].selected = selected[name];
				if (selected[name]) {
					
					console.log(selected[name],name)
					data.push({
						name: name,
						value: mapSeries.data[p].value
					});
					legendData.push(name);
					a0data.push({
						name: name,
						value: mapSeries.data[p].value,
						selected:true,
					})
				}else{
					a0data.push({
						name: name,
						value: mapSeries.data[p].value,
					})
				}
			}
			optionMain.legend.data = legendData;
			optionMain.series[1].data = data;
			optionMain.series[0].data = a0data;
			console.log(optionMain.series[1].data)
			
			myChart.setOption(optionMain, true);
		})
	}
	
	render() {
		let onEvents = {
			'click': this.onChartClick,
			'legendselectchanged': this.onChartLegendselectchanged
		}
		let onEvents1 = {
			'legendselectchanged': this.onChartLegendselectchanged,
			'mapselectchanged': this.onChartmapSelected,
		}
		const mapEvents = {
			created: (mapInstance) => {
				console.log(mapInstance);
			},
			click: () => {
				console.log('You clicked map');
			},
			
		};
		const renderMarker = (extData) => {
			return <div style={styleA}>{extData.myLabel}</div>
		}
		const renderMarkerHover = (extData) => {
			return <div style={styleB}>{extData.myLabel}</div>
		}
		const markerEvents = {
			mouseover(e, marker){
				// 鼠标移入该标记时，使用 renderMarkerHover 渲染外观
				marker.render(renderMarkerHover);
			},
			mouseout(e, marker){
				// 鼠标移出该标记时，使用 renderMarker 渲染外观
				marker.render(renderMarker);
			}
		}
		  
		
		return (
			<Spin spinning={this.state.loading}>
				<Map center={{lng: 116.402544, lat: 39.928216}} events={mapEvents} zoom="12">
					<Marker position={{lng: 116.402544, lat: 39.928216}} />
					<Marker position={{lng: 117, lat: 39 }} >
					A
					</Marker>
					<Marker position={{lng: 122, lat: 35 }} >
					<div style={{background:"yellow"}}>B</div>
					</Marker>
					
					<NavigationControl />
					<InfoWindow position={{lng: 116.402544, lat: 39.928216}} text="内容" title="标题"/>
				</Map>
				<Map center={{
						lng: 105.403119,
						lat: 38.028658
					}}
					zoom='5' >
					<MarkerList data={markerData}
					fillStyle="#ff3333" 
					animation={true} 
					isShowShadow={false} 
					multiple={true} 
					autoViewport={true}/>
					 <MarkerList 
						data={citylist} 
						onClick={(item)=>{
							console.log(item);
						}} 
						splitList={{
							4: '#d53938',
							3: '#fe6261',
							2: '#ffb02d',
							1: '#80db69'
						}} 
						coordType="bd09mc" 
						isShowShadow={false} 
						animation={true} 
						multiple={true} 
						autoViewport={true}
					/>
				</Map>
				<Map center = {{
					lng: 116.404556,
					lat: 39.91582
				}} 
				style={{
					height: '500px'
				}} 
				zoom = '12' 
				mapStyle={simpleMapStyle}>
				<PointLabel data={[
					{
						name: '阜成门',
						index: 1,
						color: 'red',
						isShowNumber: true,
						numberDirection: 'right',
						point: {
							lng: 116.35629191343,
							lat: 39.923656708429
						}
					},
					{
						name: '东大桥',
						index: 2,
						color: 'red',
						point: {
							lng: 116.45165158593,
							lat: 39.922979382266
						}
					},
					{
						name: '复兴门',
						index: 3,
						color: 'red',
						point: {
							lng: 116.3566138544,
							lat: 39.907146730611
						}
					},
					{
						name: '国贸',
						index: 4,
						color: 'red',
						point: {
							lng: 116.46007926258,
							lat: 39.908464623343
						}
					},
					{
						name: '青年路',
						index: 5,
						color: 'red',
						point: {
							lng: 116.5174653022,
							lat: 39.923132911536
						}
					},
					{
						name: '宋家庄',
						index: 6,
						color: 'red',
						point: {
							lng: 116.4283725021,
							lat: 39.84602609593
						}
					},
					{
						name: '西直门',
						index: 7,
						color: 'red',
						point: {
							lng: 116.3555775438,
							lat: 39.940171435273
						}
					},
					{
						name: '苏州街',
						index: 8,
						color: 'red',
						point: {
							lng: 116.30623351961,
							lat: 39.975748497825
						}
					},
					{
						name: '团结湖',
						index: 9,
						color: 'red',
						point: {
							lng: 116.46174509945,
							lat: 39.933704360624
						}
					},
					{
						name: '人民大学',
						index: 10,
						color: 'rgb(51, 153, 255)',
						point: {
							lng: 116.32148092791,
							lat: 39.967049268766
						}
					}
				]}
				changePosition={(point, index) => {
					console.log(point, index);
				}}
				/>
			</Map>
				<Map
					center={{lng: 116.402544, lat: 39.928216}} 
					zoom="12"
				>
				
					
					<Marker position={{lng: 116.402544, lat: 39.928216}} >
					<div style={{background:"red"}}>A MARKER</div>
					
					</Marker>
				</Map>
				<div id="main" style={{ height: 700 }}></div>
				{!this.state.provinceMap?"":<ReactEcharts option={this.state.provinceMap} style={{height: 500}} />}
				<ReactEcharts option={this.getOption()} onEvents={onEvents} style={{height: 500}} />
				<ReactEcharts option={this.getOption1()} style={{height: 500}} />
				<ReactEcharts option={this.getOption2()} style={{height: 500}} />
				<ReactEcharts option={this.getMultiple()} onEvents={onEvents} style={{height: 500}} />
				<div id="main2" style={{width:1000}}>
				{!this.state.optionMap?"":<ReactEcharts option={this.state.optionMap} onEvents={onEvents1} className={styles.main2} style={{width:1000, height: 400}} />}
				</div>
				<div id="main3" style={{ width: 1000,height: 400 }}></div>
			</Spin>

		)
     }
}
