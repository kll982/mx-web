import React from 'react';
import moment from "moment";
moment.locale('zh-cn');
import { Pagination, Breadcrumb,Select, Row, Col, Input, DatePicker, Button,Icon, Table, message, Spin } from 'antd';
import Singlepersonselect from '../../components/singlepersonselect1.jsx'
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
import {Link, hashHistory} from 'react-router';
import {Map, Marker, NavigationControl, InfoWindow,MarkerList,PointLabel} from 'react-bmap';

import $jsonp from '../../utils/service.js';
import api from '../../utils/api.js';
import styles from './echarts.less'
import freshfs from "../../img/freshfs.png"
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
var markers = [
    {
        lng: 116.402544,
		lat: 39.928216,
		text:"厦门",
		title:"长沙大道"
	},
    {
        lng: 119.0874,
		lat: 36.665582,
		text:"西安",
		title:"长沙大道",
    },
    {
        lng: 112.538537,
		lat: 37.874899,
		text:"南通",
		title:"浏阳河大桥",
    },
    {
        lng: 114.501011,
		lat: 33.920864,
		text:"潍坊",
		title:"机场高速",
    },
    {
        lng: 109.210063,
		lat: 34.339622,
		text:"烟台",
		title:"长沙绕城高速",
    },
    {
        lng: 99.430831,
		lat: 38.211366,
		text:"南宁",
		title:"三环线",
    },
    {
        lng: 89.430831,
		lat: 33.311366,
		text:"温州",
		title:"梅溪湖隧道",
    },
    {
        lng: 99.430831,
		lat: 32.511366,
		text:"东莞",
		title:"轨道场高速",
    },
    {
        lng: 79.430831,
		lat: 35.611366,
		text:"佛山",
		title:"大沙发哈哈",
    },
    {
        lng: 83.430831,
		lat: 39.711366,
		text:"深圳",
		title:"武器库接任务二级",
	},
];

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
			optionMap:"",
			showInfoWindowTitle:markers[0].title,
			showInfoWindowContent:markers[0].text,
			showInfoWindowlng:markers[0].lng,
			showInfoWindowlat:markers[0].lat,
			selectTerminalTimeShow0:"",
			selectTerminalTimeShow1:"",
			selectTerminalTimeShow2:"",
			selectTerminalTime0:"",
			selectTerminalTime1:"",
			selectTerminalTime2:"",
			mapselection:[],
			

		}
		/*datepicker:[moment(),moment()]*/
	}


	componentWillMount(){
		self.loadData(0, 10);
		self.getTime();
		var a1=document.body.clientWidth||document.body.scrollWidth;
		console.log(a1)
		console.log(document.body.clientWidth)
		console.log(document.body.scrollWidth)
		self.setState({
			widthwidow:a1-200+"px"
		})
	}
	getTime=()=>{
		var a1=moment().format("YYYY");
		var a2=parseFloat(a1);
		var a3=a2-100;
		var a4=a2;
		var arr=[];
		for(var index=a4;index>a3;index--){
			var onj={value:index,name:index}
			arr.push(onj)
		}
		self.setState({
			mapselection:arr
		})
		console.log(a1)
	}
	componentDidMount(){
		self.getOption2();
		self.getOption();
	}
	setDepartmentid = (value) => {
		console.log(value);
		if(!value){
			this.setState({ departmentId:"", departmentCode:"", departmentIdText:[] })
		}
		else{
		
			var arr1=[];
			e1(arr1, value, this.state.department);
			if(!arr1){
				this.setState({ departmentId:value,departmentIdText:value });
				return
			}
			if(arr1.length>0){
				this.setState({ departmentId:value,departmentIdText:value });
				this.setState({
					departmentCode:arr1[0].code, 
				});
			}
		
		}		
		
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
		self.setState({
			baroption:option
		})
	}
	
	getOption2=()=>{
		var option = {
			tooltip : {
				trigger: 'axis'
			},
			legend: {
				data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
			},
			toolbox: {
				show : true,
				feature : {
					mark : {show: true},
					dataView : {show: true, readOnly: false},
					magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
					restore : {show: true},
					saveAsImage : {show: true}
				}
			},
			calculable : true,
			xAxis : [
				{
					type : 'category',
					boundaryGap : false,
					data : ['周一','周二','周三','周四','周五','周六','周日']
				}
			],
			yAxis : [
				{
					type : 'value'
				}
			],
			series : [
				{
					name:'邮件营销',
					type:'line',
					stack: '总量',
					data:[120, 132, 101, 134, 90, 230, 210]
				},
				{
					name:'联盟广告',
					type:'line',
					stack: '总量',
					data:[220, 182, 191, 234, 290, 330, 310]
				},
				{
					name:'视频广告',
					type:'line',
					stack: '总量',
					data:[150, 232, 201, 154, 190, 330, 410]
				},
				{
					name:'直接访问',
					type:'line',
					stack: '总量',
					data:[320, 332, 301, 334, 390, 330, 320]
				},
				{
					name:'搜索引擎',
					type:'line',
					stack: '总量',
					data:[820, 932, 901, 934, 1290, 1330, 1320]
				}
			]
		};
		self.setState({
			areaOption:option
		})
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
	
	onChartClick=(params)=>{
		console.log(params)
		
	}
	onChartLegendselectchanged=()=>{
		console.log(22)
	}
	clickit=(item,index)=>{
		console.log(item,index)
		self.setState({
			showInfoWindowTitle:item.title,
			showInfoWindowContent:item.text,
			showInfoWindow:true,
			showInfoWindowlng:item.lng,
			showInfoWindowlat:item.lat,
		})
		
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
	selectTimeChange2= (date, dateString) => {
		console.log(date,dateString)
		let self=this
        this.setState({
		   selectTerminalTime2: dateString,
		   selectTerminalTimeShow2: date
        })
	}
	onMonthChange= (date, dateString) => {
		console.log(date,dateString)
		let self=this
        this.setState({
		   selectTerminalTime2: dateString,
		   selectTerminalTimeShow2: date
        })
	}
	selectTimeChange1= (date, dateString) => {
		console.log(date,dateString)
		let self=this
        this.setState({
		  selectTerminalTime1: dateString,
		  selectTerminalTimeShow1: date
        })
	}
	selectTimeChange0= (date, dateString) => {
		console.log(date,dateString)
		let self=this
        this.setState({
		  selectTerminalTime0: dateString,
		  selectTerminalTimeShow0: date
		})
		return false
	}
	
	disabledEndDate = (endValue) => {
		let p2=self.testInput;
		console.log(p2)
		setTimeout(function(){
				if(document.getElementsByClassName("ant-calendar-month-panel-year-select")[0]){
						document.getElementsByClassName("ant-calendar-month-panel-year-select")[0].click()
						
						var dd=document.getElementsByClassName("ant-calendar-year-panel-cell")
						for(var pp1=0; pp1<dd.length; pp1++){
							dd[pp1].addEventListener("click",function(e){
								e.stopPropagation()
							})
						}
				}
		},10)
		
		
		return false

	}
	getTicketType=(value)=>{
		this.setState({
			selectTicketTypeText:value
		})

	}
	//设置客户类型
	setCompanyType = (value) => {
		console.log(a1)
		this.setState({
			selectCompanyType:a1
		})
	}
	getArray=(data,id,changeCHildren)=>{
        for (var i in data) {
            console.log('i',i);
            console.log('datai',data[i].children);
            if (data[i].id == id) {
				console.log(data[i]);
				data[i].children=changeCHildren
                break;
            } else {
                self.getArray(data[i].children, id,changeCHildren);
            }
		}
		// console.log(treeNode.props.dataRef)
		// var id1=treeNode.props.dataRef.id;
		// var a1=self.state.treedata2;
		// console.log(post1)
		// self.getArray(a1,id1,post1);
		// console.log("a1",a1)
    }
	render() {
		let onEvents = {
			'click': this.onChartClick,
			'legendselectchanged': this.onChartLegendselectchanged
		}
		const mapEvents = {
			created: (mapInstance) => {
				console.log(mapInstance);
			},
			click: () => {
				console.log('You clicked map');
			},
			
		};
		const mapEvents1 = {
			click: (e) => {
				console.log(e);
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
		  
{}		
		return (
			<Spin spinning={this.state.loading}>
			<Row className={styles.antrow1}>
			<Col span={8}><span style={{paddingRight: 10}}>所属海事局:</span>
				<Singlepersonselect onChange={this.setDepartmentid} value={this.state.departmentIdText} multiple={false} personData={this.state.treedata2} className={styles.singleSelect} />
			</Col>
			<Col span={8}><span style={{paddingRight: 10,width:87,display:"inline-block"}}>客&nbsp;&nbsp;户&nbsp;&nbsp;电&nbsp;&nbsp;话:</span>
			<Input type="text" style={{width: "50%"}} onChange={this.setCompanyTelphone} value={this.state.selectCompanyTelphone}/></Col>
			
			<Col span={8}><span style={{paddingRight: 10}}>客 户 状 态:</span>
			<Select value={this.state.selectCompanyType} style={{ width: "50%" }} onChange={this.setCompanyType}>
			<Option value="1">渡口渡船</Option>
			<Option value="2">游览经营</Option>
			</Select>
			</Col>

			</Row>
				<Select value={this.state.selectTicketTypeText} style={{ width: "50%" }} onChange={this.getTicketType.bind(this)}>
							{this.state.mapselection.map((item,index)=>{
								return <Option value={item.value}>{item.name}</Option>
							})}
				</Select>
				<MonthPicker ref={(input) => this.testInput = input}  mode="year" format="YYYY" value={this.state.selectTerminalTimeShow0} onOpenChange={this.disabledEndDate} onChange={this.selectTimeChange0} placeholder="Select month" />
				<MonthPicker format="YYYY-MM" value={this.state.selectTerminalTimeShow1} onChange={this.selectTimeChange1} placeholder="Select month" />
				<DatePicker
					size="large"
					format="YYYY-MM-DD"
					placeholder={this.state.terminalDateActive==2?'开始日期':"结束日期"}
					value={this.state.selectTerminalTimeShow2}
					onOk={this.timeOk}
					style={{width:"100px"}}
					onChange={this.selectTimeChange2} />
				<div id="main2" style={{width:1000}}>
				{!this.state.baroption?"":<ReactEcharts option={this.state.baroption} onEvents={onEvents} style={{width:1000,height: 500}} />}
				</div>
				<div id="main3" style={{width:1000}}>
				{!this.state.areaOption?"":<ReactEcharts option={this.state.areaOption} onEvents={onEvents} style={{width:1000,height: 500}} />}
				</div>
	
				<ReactEcharts option={this.getMultiple()} onEvents={onEvents} style={{height: 500}} />
				<Map center={{lng: 116.402544, lat: 39.928216}} events={mapEvents} zoom="12" style={{
						height:'500px',
						width:this.state.widthwidow,
					}}>
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
					style={{
						height:'500px',
						width:this.state.widthwidow,
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
		
					zoom = '12' 
					style={{
						height:'500px',
						width:this.state.widthwidow,
					}}
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
					style={{
						height:'500px',
						width:this.state.widthwidow,
					}}>
					<Marker position={{lng: 116.402544, lat: 39.928216}} >
					<div style={{background:"red"}}>A MARKER</div>
					</Marker>
				</Map>
				<Map center = {{
						lng: 105.403119,
						lat: 38.028658
					}}
					style={{
						height:'500px',
						width:this.state.widthwidow,
					}}
					zoom = '5' 
					mapStyle={simpleMapStyle}>
					{markers.map((marker, index) => {
						var icon = "red" + (index + 1);
						if(index%7==0){
							var icon = "red" + (index + 1);
						}else if(index%7==1){
							var icon = "simple_blue";
						}else if(index%7==2){
							var icon = "loc_blue";
						}else if(index%7==3){
							var icon = "loc_red";
						}else if(index%7==4){
							var icon = "start";
						}else if(index%7==5){
							var icon = "end";
						}else if(index%7==5){
							var icon = "simple_red";
						}
						return <Marker icon={icon} position={{lng: marker.lng, lat: marker.lat}} {...marker} />
						
					})}
				</Map>
				
				<Map center = {{
						lng: 105.403119,
						lat: 38.028658
					}}
					style={{
						height:'500px',
						width:this.state.widthwidow,
					}}
					zoom = '5' 
					mapStyle={simpleMapStyle}>
					{markers.map((marker, index) => {
						var icon = "red" + (index + 1);
						if(index%4==0){
							var icon = styles.amapSimpleMarkerStylegreen;
						}else if(index%4==1){
							var icon = styles.amapSimpleMarkerStyleorange;
						}else if(index%4==2){
							var icon = styles.amapSimpleMarkerStyleblue;
						}else if(index%4==3){
							var icon = styles.amapSimpleMarkerStylered;
						
						}
						
						
						return <Marker icon={icon} position={{lng: marker.lng, lat: marker.lat}}>
						<div onClick={this.clickit.bind(this,marker,index)} className={styles.amapSimpleMarker+" "+styles.amapSimpleMarkerFreshstyle+" "+icon}><div className={styles.amapSimpleMarkericon}></div><div  className={styles.amapSimpleMarkerlabel} style={{color: "rgb(255, 255, 255)"}}>{index}</div>
						</div>
						</Marker>
						
					})}
					<InfoWindow position={{lng: this.state.showInfoWindowlng, lat: this.state.showInfoWindowlat}} text={this.state.showInfoWindowContent} title={this.state.showInfoWindowTitle}/>
				</Map>
				
				
				
			</Spin>

		)
     }
}
