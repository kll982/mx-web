import React from 'react';
import moment from "moment";
moment.locale('zh-cn');
import { Pagination, Breadcrumb,Select, Row, Col, Input, DatePicker, Button,Icon, Table, message, Spin,TreeSelect,Tabs } from 'antd';
import Singlepersonselect from '../../components/singlepersonselectload.jsx'
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
import {Link, hashHistory} from 'react-router';
import {Map, Marker, NavigationControl, MapTypeControl, ScaleControl, OverviewMapControl, PanoramaControl, InfoWindow,MarkerList,PointLabel} from 'react-bmap';

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import api from '../../utils/api.js';
import styles from './echarts.less'
import freshfs from "../../img/freshfs.png"
import ReactEcharts from 'echarts-for-react';
import styles1 from '../../components/common.less';
import companypng from "../../img/company.png"
import departmentpng from "../../img/department.png"
import emppng from "../../img/emp.png"

let self;
function e0(arr,items,key){
	if(items.children && items.children.length > 0){
		items.children.map((itemss,indexss) => {
		  if(itemss.id == key){
		      arr.push(itemss);
		  }
		  e0(arr,itemss,key);
		})
	}
}

function e1(arr,key,departsArr){
  departsArr.map((item,index) => {
    if(item.id == key){
      arr.push(item);
    }
    e0(arr,item,key);
  })
}
var fakeDat={
	"response": {
		"list": [{
				"id": 5,
				"orderSortId": 1,
				"orderId": 1,
				"userId": 3,
				"msaId": 24,
				"sortId": 1,
				"sortName": "渡口",
				"itemId": 5,
				"itemName": "是否建立安全管理管理责任制，相关负责人及船员是否熟悉安全责任及安全管理制度",
				"orderNum": 4,
				"checkValue": "2",
				"grade": "1",
				"description": "测试现场问题1",
				"dealMeasureId": 1,
				"dealMeasure": "责令改正",
				"dealResultId": 1,
				"dealResult": "事故隐患当场纠正",
				"lng": 119.389887,
				"lat": 32.236635,
				"location": null,
				"deadLine": null,
				"deadLineTime": null,
				"fixStatus": "0",
				"createTime": 1526615624000,
				"recheckList": null,
				"picList": null,
				"pics": null,
				"companyId": 190,
				"postTime": 1526641965000,
				"msaName": "高邮市地方海事处",
				"companyName": "二里铺",
				"type": "1"
			},
			{
				"id": 7,
				"orderSortId": 2,
				"orderId": 1,
				"userId": 3,
				"msaId": 24,
				"sortId": 2,
				"sortName": "渡船",
				"itemId": 7,
				"itemName": "船舶登记证书、船舶检验证书是否齐全有效",
				"orderNum": 0,
				"checkValue": "2",
				"grade": "1",
				"description": "测试现场问题2",
				"dealMeasureId": 5,
				"dealMeasure": "行政处罚",
				"dealResultId": 1,
				"dealResult": "事故隐患当场纠正",
				"lng": 119.395995,
				"lat": 32.22344,
				"location": null,
				"deadLine": null,
				"deadLineTime": null,
				"fixStatus": "0",
				"createTime": 1526615624000,
				"recheckList": null,
				"picList": null,
				"pics": null,
				"companyId": 190,
				"postTime": 1526641965000,
				"msaName": "高邮市地方海事处",
				"companyName": "二里铺",
				"type": "1"
			},
			{
				"id": 63,
				"orderSortId": 11,
				"orderId": 2,
				"userId": 3,
				"msaId": 24,
				"sortId": 2,
				"sortName": "渡船",
				"itemId": 13,
				"itemName": "其他必要的安全设施和应急安全设备是否运行完好",
				"orderNum": 6,
				"checkValue": "2",
				"grade": "1",
				"description": "现场问题3",
				"dealMeasureId": 2,
				"dealMeasure": "责令离岗",
				"dealResultId": 2,
				"dealResult": "事故隐患限期改正",
				"lng": 119.241199,
				"lat": 32.215986,
				"location": null,
				"deadLine": 7,
				"deadLineTime": 1527264000000,
				"fixStatus": "0",
				"createTime": 1526645991000,
				"recheckList": null,
				"picList": null,
				"pics": null,
				"companyId": 188,
				"postTime": 1526648197000,
				"msaName": "高邮市地方海事处",
				"companyName": "南门",
				"type": "1"
			},
			{
				"id": 592,
				"orderSortId": 108,
				"orderId": 27,
				"userId": 4,
				"msaId": 22,
				"sortId": 1,
				"sortName": "渡口",
				"itemId": 1,
				"itemName": "码头、坡道和候渡场所等渡口设施是否符合要求",
				"orderNum": 0,
				"checkValue": "2",
				"grade": "0",
				"description": null,
				"dealMeasureId": null,
				"dealMeasure": null,
				"dealResultId": null,
				"dealResult": null,
				"lng": 119.891141,
				"lat": 31.636897,
				"location": null,
				"deadLine": null,
				"deadLineTime": null,
				"fixStatus": "0",
				"createTime": 1526824204000,
				"recheckList": null,
				"picList": null,
				"pics": null,
				"companyId": 194,
				"postTime": 1526824296000,
				"msaName": "扬州市城区地方海事处",
				"companyName": "翟家湾",
				"type": "1"
			},
			{
				"id": 913,
				"orderSortId": 165,
				"orderId": 38,
				"userId": 1,
				"msaId": 62,
				"sortId": 1,
				"sortName": "渡口",
				"itemId": 2,
				"itemName": "渡口标志、标牌是否齐全，信息是否及时更新",
				"orderNum": 1,
				"checkValue": "2",
				"grade": "0",
				"description": null,
				"dealMeasureId": null,
				"dealMeasure": null,
				"dealResultId": null,
				"dealResult": null,
				"lng": 119.916438,
				"lat": 31.232662,
				"location": null,
				"deadLine": null,
				"deadLineTime": null,
				"fixStatus": "0",
				"createTime": 1526872091000,
				"recheckList": null,
				"picList": null,
				"pics": null,
				"companyId": 181,
				"postTime": 1526872772000,
				"msaName": "灌南县地方海事处",
				"companyName": "一帆河",
				"type": "1"
			},
			{
				"id": 956,
				"orderSortId": 173,
				"orderId": 40,
				"userId": 1,
				"msaId": 62,
				"sortId": 1,
				"sortName": "渡口",
				"itemId": 1,
				"itemName": "码头、坡道和候渡场所等渡口设施是否符合要求",
				"orderNum": 0,
				"checkValue": "2",
				"grade": "0",
				"description": null,
				"dealMeasureId": null,
				"dealMeasure": null,
				"dealResultId": null,
				"dealResult": null,
				"lng": 120.217693,
				"lat": 30.971445,
				"location": null,
				"deadLine": null,
				"deadLineTime": null,
				"fixStatus": "0",
				"createTime": 1526885838000,
				"recheckList": null,
				"picList": null,
				"pics": null,
				"companyId": 181,
				"postTime": 1526886000000,
				"msaName": "灌南县地方海事处",
				"companyName": "一帆河",
				"type": "1"
			},
			{
				"id": 1050,
				"orderSortId": 190,
				"orderId": 44,
				"userId": 1,
				"msaId": 52,
				"sortId": 1,
				"sortName": "渡口",
				"itemId": 1,
				"itemName": "码头、坡道和候渡场所等渡口设施是否符合要求",
				"orderNum": 0,
				"checkValue": "2",
				"grade": "1",
				"description": "这是一般",
				"dealMeasureId": 1,
				"dealMeasure": "责令改正",
				"dealResultId": 2,
				"dealResult": "事故隐患限期改正",
				"lng": 120.624733,
				"lat": 30.399008,
				"location": "位置",
				"deadLine": 15,
				"deadLineTime": 1528214400000,
				"fixStatus": "1",
				"createTime": 1526889047000,
				"recheckList": null,
				"picList": null,
				"pics": null,
				"companyId": 54,
				"postTime": 1526889142000,
				"msaName": "东台市地方海事处",
				"companyName": "万陆",
				"type": "1"
			},
			{
				"id": 1053,
				"orderSortId": 190,
				"orderId": 44,
				"userId": 1,
				"msaId": 52,
				"sortId": 1,
				"sortName": "渡口",
				"itemId": 4,
				"itemName": "是否配备专职或兼职的渡口工作人员",
				"orderNum": 3,
				"checkValue": "2",
				"grade": "2",
				"description": "这是重大的",
				"dealMeasureId": 2,
				"dealMeasure": "责令离岗",
				"dealResultId": 1,
				"dealResult": "事故隐患当场纠正",
				"lng": null,
				"lat": null,
				"location": "位置",
				"deadLine": null,
				"deadLineTime": null,
				"fixStatus": "1",
				"createTime": 1526889047000,
				"recheckList": null,
				"picList": null,
				"pics": null,
				"companyId": 54,
				"postTime": 1526889142000,
				"msaName": "东台市地方海事处",
				"companyName": "万陆",
				"type": "1"
			},
			{
				"id": 1216,
				"orderSortId": 219,
				"orderId": 48,
				"userId": 4,
				"msaId": 22,
				"sortId": 1,
				"sortName": "渡口",
				"itemId": 1,
				"itemName": "码头、坡道和候渡场所等渡口设施是否符合要求",
				"orderNum": 0,
				"checkValue": "2",
				"grade": "1",
				"description": "一般问题",
				"dealMeasureId": 1,
				"dealMeasure": "责令改正",
				"dealResultId": 2,
				"dealResult": "事故隐患限期改正",
				"lng": 115.563582,
				"lat": 27.00125,
				"location": null,
				"deadLine": 7,
				"deadLineTime": 1527609600000,
				"fixStatus": "1",
				"createTime": 1526975916000,
				"recheckList": null,
				"picList": null,
				"pics": null,
				"companyId": 194,
				"postTime": 1526976060000,
				"msaName": "扬州市城区地方海事处",
				"companyName": "翟家湾",
				"type": "1"
			},
			{
				"id": 1217,
				"orderSortId": 219,
				"orderId": 48,
				"userId": 4,
				"msaId": 22,
				"sortId": 1,
				"sortName": "渡口",
				"itemId": 2,
				"itemName": "渡口标志、标牌是否齐全，信息是否及时更新",
				"orderNum": 1,
				"checkValue": "2",
				"grade": "2",
				"description": "重大问题",
				"dealMeasureId": 5,
				"dealMeasure": "行政处罚",
				"dealResultId": 3,
				"dealResult": "存在重大隐患",
				"lng": 115.563582,
				"lat": 27.00125,
				"location": null,
				"deadLine": null,
				"deadLineTime": null,
				"fixStatus": "1",
				"createTime": 1526975916000,
				"recheckList": null,
				"picList": null,
				"pics": null,
				"companyId": 194,
				"postTime": 1526976060000,
				"msaName": "扬州市城区地方海事处",
				"companyName": "翟家湾",
				"type": "1"
			}
		]
	},
	"time": 1527163350872
};
var fakeDat1={
	"lineSeries": [
	  {
		"data": [
		  0,
		  0,
		  1,
		  0,
		  0,
		  0,
		  0,
		  0,
		  1,
		  0,
		  0,
		  0,
		  0,
		  0
		],
		"name": "一般"
	  },
	  {
		"data": [
		  0,
		  0,
		  1,
		  0,
		  0,
		  0,
		  0,
		  0,
		  1,
		  0,
		  0,
		  0,
		  0,
		  0
		],
		"name": "重大"
	  }
	],
	"xAxis": [
	  "南京",
	  "镇江",
	  "扬州",
	  "苏州",
	  "无锡",
	  "常州",
	  "徐州",
	  "淮安",
	  "盐城",
	  "连云港",
	  "南通",
	  "泰州",
	  "宿迁",
	  "11133"
	],
	"legend": [
	  "一般",
	  "重大"
	],
	"pieSeries": [
	  {
		"name": "南京",
		"value": 0
	  },
	  {
		"name": "镇江",
		"value": 0
	  },
	  {
		"name": "扬州",
		"value": 3
	  },
	  {
		"name": "苏州",
		"value": 0
	  },
	  {
		"name": "无锡",
		"value": 0
	  },
	  {
		"name": "常州",
		"value": 0
	  },
	  {
		"name": "徐州",
		"value": 0
	  },
	  {
		"name": "淮安",
		"value": 0
	  },
	  {
		"name": "盐城",
		"value": 2
	  },
	  {
		"name": "连云港",
		"value": 2
	  },
	  {
		"name": "南通",
		"value": 0
	  },
	  {
		"name": "泰州",
		"value": 0
	  },
	  {
		"name": "宿迁",
		"value": 0
	  },
	  {
		"name": "11133",
		"value": 0
	  }
	]
  }
export default class customeppqqrlist extends React.Component {
	constructor(props) {
		super(props);
		self=this;
		this.state = {
			loading:false,
			selectYearTime1:"",
			selectYearTime2:"",
			selectMonthTimeShow1:null,
			selectMonthTimeShow2:null,
			selectMonthTime1:"",
			selectMonthTime2:"",
			selectDateTimeShow1:moment().subtract(7, "days"),
			selectDateTimeShow2:moment(),
			selectDateTime1:moment().subtract(7, "days").format("YYYY-MM-DD"),
			selectDateTime2:moment().format("YYYY-MM-DD"),
			mapselection:[],
			treedata2:[],
			departmentId:"",
			departmentCode:"",
			departmentIdText:[],
			selectUnitType:"",
			selectGrade:"",
			selectFixStatus:"1",
			selectDateType:"day",
			markers:[],
			showInfoWindowTitle:"",
			showInfoWindowContent:"",
			showInfoWindowlng:"",
			showInfoWindowlat:"",
			dataPie:"",
			dataBar:"",
			dataLine:"",
			chartStartTime:"",
			chartEndTime:"",
			fetchParId:1,
			tabClickChangeActiveIndex:1
		}
	}
	componentWillMount(){
		self.loadData(1, 10);
		self.getTime();
		self.fetchDepartment();
		var a1=document.body.clientWidth||document.body.scrollWidth;
		console.log(a1)
		console.log(document.body.clientWidth)
		console.log(document.body.scrollWidth)
		self.setState({
			widthwidow:a1-220+"px",
			widthwidow1:a1-250+"px"
		})
	}
	
	componentDidMount(){
		
	}
	fetchDepartment(){
		$jsonp3(self,api.commonFilterData,{}).then((res) => {
			console.log("rootTree",res.data.response.msaInfo);
			var list=[];
			var post1=res.data.response.msaInfo;
			
			if(post1.nodeType=="3"){
				post1.isLeaf=true
			}else{
				post1.isLeaf=false
			}
			list[0]=post1;
			this.setState({
				department:list,
				treedata2:list,
				fetchParId:post1.id
			},()=>{
				console.log(self.state.treedata2)
			});
		});
	}
	getTime=()=>{
		var a1=moment().format("YYYY");
		var a2=parseFloat(a1);
		var a3=a2-100;
		var a4=a2;
		var arr=[];
		for(var index=a4;index>a3;index--){
			var onj={value:index+"",name:index}
			arr.push(onj)
		}
		self.setState({
			mapselection:arr
		})
		console.log(a1)
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
	onChartClick=(params)=>{
		console.log(params)
	}
	onChartLegendselectchanged=()=>{
		console.log(22)
	}
	//根据页号获取数据的方法
	loadData = (page,pageSize) => {
		var selectDateType=self.state.selectDateType;
		if(selectDateType=="day"){
			var startTime=self.state.selectDateTime1;
			var endTime=self.state.selectDateTime2;
			if(!startTime && !endTime){
				startTime=moment().subtract(7, "days").format("YYYY-MM-DD")
				endTime=moment().format("YYYY-MM-DD")
			}
		}else if(selectDateType=="month"){
			var startTime=self.state.selectMonthTime1;
			var endTime=self.state.selectMonthTime2;
			if(!startTime){
				message.info("请选择开始月份")
				return
			}
			if(!endTime){
				message.info("请选择结束月份")
				return
			}
		}else{
			var startTime=self.state.selectYearTime1;
			var endTime=self.state.selectYearTime2;
			if(!startTime){
				message.info("请选择开始年份")
				return
			}
			if(!endTime){
				message.info("请选择结束年份")
				return
			}
			if(parseInt(startTime)>parseInt(endTime)){
				message.info("开始年份不能大于结束年份")
				return
			}
		}
		self.setState({
			dataLine:"",
			dataBar:"",
			dataPie:"",
		})
		$jsonp3(self,api.trouble4Map,{
			msaId:this.state.departmentId,
			type:this.state.selectUnitType,
			grade:this.state.selectGrade,
			fixStatus:this.state.selectFixStatus,
			startDate:startTime,
			endDate: endTime,
			dateType:self.state.selectDateType,
		}).then((res) => {
			console.log(res);
			self.setState({
				chartStartTime:startTime,
				chartEndTime:endTime
			})
			var list=res.data.response.list
			console.log(list)
			
			if(list.length>0){
				var showContent=<div>
				海事部门:{list[0].msaName}<br/>分类：{list[0].sortName}<br/>检查项名称：{list[0].itemName}<br/>隐患等级：{list[0].grade=="2"?"重大":list[0].grade=="1"?"一般":"无隐患"}</div>;
				var d1=list[0].grade=="2"?"重大":list[0].grade=="1"?"一般":"无隐患";
				var showContent="<div>海事部门："+list[0].msaName+"<br/>分类："+list[0].sortName+"<br/>检查项名称："+list[0].itemName+"<br/>隐患等级："+d1+"</div>";
				self.setState({
					markers:list,
					showInfoWindowTitle:list[0].companyName,
					showInfoWindowContent:showContent,
					showInfoWindowlng:list[0].lng,
					showInfoWindowlat:list[0].lat,
				})
			}else{
				self.setState({
					markers:[],
					showInfoWindowTitle:"",
					showInfoWindowContent:"",
					showInfoWindowlng:"",
					showInfoWindowlat:"",
				})
			}
			

		});

	}
	loadData1 = (page,pageSize) => {
		var selectDateType=self.state.selectDateType;
		if(selectDateType=="day"){
			var startTime=self.state.selectDateTime1;
			var endTime=self.state.selectDateTime2;
			if(!startTime && !endTime){
				startTime=moment().subtract(7, "days").format("YYYY-MM-DD")
				endTime=moment().format("YYYY-MM-DD")
			}
		}else if(selectDateType=="month"){
			var startTime=self.state.selectMonthTime1;
			var endTime=self.state.selectMonthTime2;
			if(!startTime){
				message.info("请选择开始月份")
				return
			}
			if(!endTime){
				message.info("请选择结束月份")
				return
			}
		}else{
			var startTime=self.state.selectYearTime1;
			var endTime=self.state.selectYearTime2;
			if(!startTime){
				message.info("请选择开始年份")
				return
			}
			if(!endTime){
				message.info("请选择结束年份")
				return
			}
			if(parseInt(startTime)>parseInt(endTime)){
				message.info("开始年份不能大于结束年份")
				return
			}
		}
		self.setState({
			dataLine:"",
			dataBar:"",
			dataPie:"",
			loading:true,
		})
		$jsonp3(self,api.troubleOfMsa,{
			msaId:this.state.departmentId,
			type:this.state.selectUnitType,
			grade:this.state.selectGrade,
			fixStatus:this.state.selectFixStatus,
			startDate:startTime,
			endDate: endTime,
			dateType:self.state.selectDateType,
		}).then((res) => {
			console.log(res);
			self.setState({
				loading:false,
			})
			self.setState({
				chartStartTime:startTime,
				chartEndTime:endTime
			})
			console.log(res.data.response);
			var list=res.data.response.list;
			console.log(list)
			var legend=res.data.response.legend;
			var data1=res.data.response.lineSeries;
			var lineSeriesData=[];
			for(var k1=0;k1<data1.length;k1++){
				var temp1={
					name: data1[k1].name,
					type: 'line',
					data: data1[k1].data,
					markPoint: {
						data: [{
								type: 'max',
								name: '最大值'
							},
							{
								type: 'min',
								name: '最小值'
							}
						]
					},
					markLine: {
						data: [{
							type: 'average',
							name: '平均值'
						}]
					}
				}
				lineSeriesData.push(temp1)
			}
			
			var option = {
				title: {
					text: self.state.chartStartTime+"-"+self.state.chartEndTime+'隐患数量统计',
					textStyle:{
						color:"#108ee9"
					}
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				toolbox: {
					feature: {
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				legend: {
					data:res.data.response.legend
				},
				xAxis: {
					data: res.data.response.xAxis,
					axisPointer: {
						type: 'shadow'
					}
				},
				yAxis: {
					name: '数量'
				},
				series: lineSeriesData
			};
			self.setState({
				dataLine:option
			})
			var data1=res.data.response.lineSeries;
			var barSeriesData=[];
			for(var k2=0;k2<data1.length;k2++){
				var temp1={
					name: data1[k2].name,
					type: 'bar',
					data: data1[k2].data,
					markPoint: {
						data: [{
								type: 'max',
								name: '最大值'
							},
							{
								type: 'min',
								name: '最小值'
							}
						]
					},
					markLine: {
						data: [{
							type: 'average',
							name: '平均值'
						}]
					}
				}
				barSeriesData.push(temp1)
			}
			var option1 = {
				title: {
					text: self.state.chartStartTime+"-"+self.state.chartEndTime+'隐患数量统计',
					textStyle:{
						color:"#108ee9"
					}
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				toolbox: {
					feature: {
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				legend: {
					data:res.data.response.legend
				},
				xAxis: {
					data: res.data.response.xAxis,
					axisPointer: {
						type: 'shadow'
					}
				},
				yAxis: {
					name: '数量'
				},
				series: barSeriesData
			};
			console.log(option1)
			self.setState({
				dataBar:option1
			})
			//饼图
			var datapie=res.data.response.pieSeries;
			var pieSeriesData=[];
			for(var k2=0;k2<datapie.length;k2++){
				// if(datapie[k2].value==0){}
				// else{
					
				// }
				pieSeriesData.push(datapie[k2])
			}
			var option2 = {
				title: {
					text: self.state.chartStartTime+"-"+self.state.chartEndTime+'隐患数量统计',
					subtext: '',
					x: 'center',
					textStyle:{
						color:"#108ee9"
					}
					
				},
				legend: {
					orient: 'vertical',
					x: 'right',
					data: res.data.response.legend
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				series: [{
					name: '区域',
					type: 'pie',
					radius: '55%',
					center: ['50%', '50%'],
					avoidLabelOverlap: false,
					data: pieSeriesData.sort(function (a, b) { return a.value - b.value; }),
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
					animationType: 'scale',
					animationEasing: 'elasticOut',
				}]
			};
			self.setState({
				dataPie:option2
			})
			

		}).catch((err)=>{
			self.setState({
				loading:false,
			})
		});

	}
	//查询第三种
	loadData2 = (page,pageSize) => {
		var selectDateType=self.state.selectDateType;
		if(selectDateType=="day"){
			var startTime=self.state.selectDateTime1;
			var endTime=self.state.selectDateTime2;
			if(!startTime && !endTime){
				startTime=moment().subtract(7, "days").format("YYYY-MM-DD")
				endTime=moment().format("YYYY-MM-DD")
			}
		}else if(selectDateType=="month"){
			var startTime=self.state.selectMonthTime1;
			var endTime=self.state.selectMonthTime2;
			if(!startTime){
				message.info("请选择开始月份")
				return
			}
			if(!endTime){
				message.info("请选择结束月份")
				return
			}
		}else{
			var startTime=self.state.selectYearTime1;
			var endTime=self.state.selectYearTime2;
			if(!startTime){
				message.info("请选择开始年份")
				return
			}
			if(!endTime){
				message.info("请选择结束年份")
				return
			}
			if(parseInt(startTime)>parseInt(endTime)){
				message.info("开始年份不能大于结束年份")
				return
			}
		}
		self.setState({
			dataLine:"",
			dataBar:"",
			dataPie:"",
			loading:true,
		})
		$jsonp3(self,api.troubleOfMsaPreDay,{
			msaId:this.state.departmentId,
			type:this.state.selectUnitType,
			grade:this.state.selectGrade,
			fixStatus:this.state.selectFixStatus,
			startDate:startTime,
			endDate: endTime,
			dateType:self.state.selectDateType,
		}).then((res) => {
			self.setState({
				loading:false,
			})
			self.setState({
				chartStartTime:startTime,
				chartEndTime:endTime
			})
			console.log(res);
			console.log(res.data.response);
			var legend=res.data.response.legend;
			var data1=res.data.response.lineSeries;
			var lineSeriesData=[];
			for(var k1=0;k1<data1.length;k1++){
				var temp1={
					name: data1[k1].name,
					type: 'line',
					data: data1[k1].data,
					markPoint: {
						data: [{
								type: 'max',
								name: '最大值'
							},
							{
								type: 'min',
								name: '最小值'
							}
						]
					},
					markLine: {
						data: [{
							type: 'average',
							name: '平均值'
						}]
					}
				}
				lineSeriesData.push(temp1)
			}
			
			var option = {
				title: {
					text: self.state.chartStartTime+"-"+self.state.chartEndTime+'隐患数量统计',
					top:"0px",
					textStyle:{
						color:"#108ee9"
					}
				},
				grid:{
					top:"100px",
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				toolbox: {
					feature: {
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				legend: {
					data:res.data.response.legend,
					top:"20px",
				},
				xAxis: {
					data: res.data.response.xAxis,
					axisPointer: {
						type: 'shadow'
					}
				},
				yAxis: {
					name: '数量'
				},
				series: lineSeriesData
			};
			self.setState({
				dataLine:option
			})
			var data1=res.data.response.lineSeries;
			var barSeriesData=[];
			for(var k2=0;k2<data1.length;k2++){
				var temp1={
					name: data1[k2].name,
					type: 'bar',
					data: data1[k2].data,
					markPoint: {
						data: [{
								type: 'max',
								name: '最大值'
							},
							{
								type: 'min',
								name: '最小值'
							}
						]
					},
					markLine: {
						data: [{
							type: 'average',
							name: '平均值'
						}]
					}
				}
				barSeriesData.push(temp1)
			}
			var option1 = {
				title: {
					text: self.state.chartStartTime+"-"+self.state.chartEndTime+'隐患数量统计',
					textStyle:{
						color:"#108ee9"
					}
				},
				grid:{
					top:"100px",
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				toolbox: {
					feature: {
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				legend: {
					data:res.data.response.legend,
					top:"20px",
				},
				xAxis: {
					data: res.data.response.xAxis,
					axisPointer: {
						type: 'shadow'
					}
				},
				yAxis: {
					name: '数量'
				},
				series: barSeriesData
			};
			console.log(option1)
			self.setState({
				dataBar:option1
			})
			
			console.log(res)
			
			

		}).catch((err)=>{
			self.setState({
				loading:false,
			})
		});
	}

	selectDateChange1= (date, dateString) => {
		
		let self=this
        this.setState({
		   selectDateTime1: dateString,
		   selectDateTimeShow1: date
        })
	}
	selectDateChange2= (date, dateString) => {

		let self=this
        this.setState({
			selectDateTime2: dateString,
			selectDateTimeShow2: date
        })
	}
	selectMonthChange1= (date, dateString) => {
		
		let self=this
        this.setState({
		  selectMonthTime1: dateString,
		  selectMonthTimeShow1: date
		})
	}
	selectMonthChange2= (date, dateString) => {
		console.log(date,dateString)
		let self=this
        this.setState({
		  selectMonthTime2: dateString,
		  selectMonthTimeShow2: date
        })
	}
	setYearTime1=(value)=>{
		this.setState({
			selectYearTime1:value
		})
	}
	setYearTime2=(value)=>{
		this.setState({
			selectYearTime2:value
		})
	}
	setUnitType = (value) => {
		this.setState({
			selectUnitType:value
		})
	}
	setGrade = (value) => {
		this.setState({
			selectGrade:value
		})
	}
	setFixStatus= (value) => {
		this.setState({
			selectFixStatus:value
		})
	}
	setDateType= (value) => {
		
		this.setState({
			selectDateType:value
		},()=>{
			console.log(self.state.selectDateType)
		})
	}
	queryProfitOfCondition = () => {
		if(self.state.tabClickChangeActiveIndex==1){
			self.loadData(1,10);
		}
		else if(self.state.tabClickChangeActiveIndex==2){
			self.loadData1(1,10);
		}
		else if(self.state.tabClickChangeActiveIndex==3){
			self.loadData2(1,10);
		}
	}
	queryProfitOfCondition1 = () => {
		self.loadData1(1,10);
	}
	queryProfitOfCondition2 = () => {
		self.loadData2(1,10);
	}
	reset = () => {
		this.setState({
			selectYearTime1:"",
			selectYearTime2:"",
			selectMonthTimeShow1:null,
			selectMonthTimeShow2:null,
			selectMonthTime1:"",
			selectMonthTime2:"",
			selectDateTimeShow1:null,
			selectDateTimeShow2:null,
			selectDateTime1:"",
			selectDateTime2:"",
			departmentId:"",
			departmentCode:"",
			departmentIdText:[],
			selectUnitType:"",
			selectGrade:"",
			selectFixStatus:"",
			selectDateType:"day",
	    },() => {
			if(self.state.tabClickChangeActiveIndex==1){
				self.loadData(1,10);
			}
			else if(self.state.tabClickChangeActiveIndex==2){
				self.loadData1(1,10);
			}
			else if(self.state.tabClickChangeActiveIndex==3){
				self.loadData2(1,10);
			}
			
		});
	}
	disabledStartDate = (startValue) => {
		const endValue = this.state.selectDateTimeShow2;
		if (!startValue) {
			return false;
		}
		if(!endValue){
			return false
		}
		return startValue.valueOf() > endValue.valueOf();

	}

	disabledEndDate = (endValue) => {
		const startValue = this.state.selectDateTimeShow1;
		if (!endValue) {
			return false;
		}
		if(!startValue){
			return false
		}
		return endValue.valueOf() <= startValue.valueOf();
	}
	disabledStartMonth = (startValue) => {
		const endValue = this.state.selectMonthTimeShow2;
		if (!startValue) {
			return false;
		}
		if(!endValue){
			return false
		}
		return startValue.valueOf() > endValue.valueOf();
	}
	disabledEndMonth = (endValue) => {
		const startValue = this.state.selectMonthTimeShow1;
		if (!endValue) {
			return false;
		}
		if(!startValue){
			return false
		}
		return endValue.valueOf() <= startValue.valueOf();
	}
	clickit=(item,index)=>{
		console.log(item,index)

		var d1=item.grade=="2"?"重大":item.grade=="1"?"一般":"无隐患";
		var showContent="<div>海事部门："+item.msaName+"<br/>分类："+item.sortName+"<br/>检查项名称："+item.itemName+"<br/>隐患等级："+d1+"</div>";
		self.setState({
			showInfoWindowTitle:item.companyName,
			showInfoWindowContent:showContent,
			showInfoWindow:true,
			showInfoWindowlng:item.lng,
			showInfoWindowlat:item.lat,
		})
		
	}
	showInfo(e){
		alert(e.point.lng + ", " + e.point.lat);
	}
	
	onTreeLoadData = (treeNode) => {
		return new Promise((resolve) => {
			if (treeNode.props.children) {
				resolve();
				return;
			}
			$jsonp3(self,api.getChildByParId,{
				id:treeNode.props.dataRef.id
			}).then((res) => {
				console.log("childTree1",res);
				var post1=res.data.response.childDepts;
				for(var p1=0;p1<post1.length;p1++){
					if(post1[p1].nodeType=="3"){
						post1[p1].isLeaf=true
					}else{
						post1[p1].isLeaf=false
					}
				}
				treeNode.props.dataRef.children=post1
				self.setState({
					department:[...this.state.treedata2],
					treedata2:[...this.state.treedata2],
				},()=>{
					console.log(self.state.treedata2)
				});

				resolve();
				
			});
			
		});
	
	}
	changeTabActive=(key)=>{
		self.setState({
			tabClickChangeActiveIndex:key
		},()=>{
			if(self.state.tabClickChangeActiveIndex==1){
				self.loadData(1,10);
			}
			else if(self.state.tabClickChangeActiveIndex==2){
				self.loadData1(1,10);
			}
			else if(self.state.tabClickChangeActiveIndex==3){
				self.loadData2(1,10);
			}
			
		})
	}
	
	render() {
		let onEvents = {
			'click': this.onChartClick,
			'legendselectchanged': this.onChartLegendselectchanged
		}
		const loop = data => data.map((item) => {
			if (item.children && item.children.length) {
			  var ptitle="";
			  if(item.nodeType==1){
				   ptitle=<span><img src={companypng} className={styles1.qicon}/>{item.name}</span>;
			  }else if(item.nodeType==2){
				   ptitle=<span><img src={departmentpng} className={styles1.qicon}/>{item.name}</span>;
			  }else if(item.nodeType==3){
				   ptitle=<span><img src={emppng} className={styles1.qicon}/>{item.name}</span>;
			 }
			  return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id} value={item.id.toString()}>{loop(item.children)}</TreeSelect.TreeNode>;
			}
			var ptitle="";
			  if(item.nodeType==1){
				  ptitle=<span><img src={companypng} className={styles1.qicon}/>{item.name}</span>;
			  }else if(item.nodeType==2){
				  ptitle=<span><img src={departmentpng} className={styles1.qicon}/>{item.name}</span>;
			  }else if(item.nodeType==3){
				  ptitle=<span><img src={emppng} className={styles1.qicon}/>{item.name}</span>;
			  }
			return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id} value={item.id.toString()}/>;
			// isLeaf={item.isLeaf}
		  });
		return (
			<Spin spinning={this.state.loading}>
			 <Breadcrumb separator=">">
				<Breadcrumb.Item>统计报表</Breadcrumb.Item>
				<Breadcrumb.Item>隐患区域统计</Breadcrumb.Item>
			</Breadcrumb>
			<div className={styles.clearfloat}></div>
			<Row className={styles.antrow1}>
				<Col span={8}><span style={{paddingRight: 10}}>所属海事局:</span>
					{/* <Singlepersonselect onChange={this.setDepartmentid} value={this.state.departmentIdText} multiple={false} personData={this.state.treedata2} className={styles.singleSelect} /> */}

					<TreeSelect
					 	loadData={this.onTreeLoadData}
						showSearch
						treeNodeFilterProp="pops"
						className={styles.singleSelect}
						value={this.state.departmentIdText?this.state.departmentIdText:""}
						dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
						placeholder="请选择"
						allowClear
						dropdownMatchSelectWidth={false}

						onChange={this.setDepartmentid}
						>
						{loop(this.state.treedata2)}

					</TreeSelect>
				</Col>
				<Col span={5}><span style={{paddingRight: 10}}>分类</span>
				<Select value={this.state.selectUnitType} style={{ width: "50%" }} onChange={this.setUnitType}>
					<Option value="">全部</Option>
					<Option value="1">渡口渡船</Option>
					<Option value="2">游览经营</Option>
				</Select>
				</Col>
				
				<Col span={5}><span style={{paddingRight: 10}}>隐患等级:</span>
				<Select value={this.state.selectGrade} style={{ width: "50%" }} onChange={this.setGrade}>
					<Option value="">全部</Option>
					<Option value="1">一般</Option>
					<Option value="2">重大</Option>
				</Select>
				</Col>
				<Col span={6}><span style={{paddingRight: 10}}>解决与否:</span>
				<Select value={this.state.selectFixStatus} style={{ width: "50%" }} onChange={this.setFixStatus}>
					<Option value="">全部</Option>
					<Option value="1">未解决</Option>
					<Option value="0">已解决</Option>
				</Select>
				</Col>
			</Row>
			<Row className={styles.antrow1}>
				<Col span={8}><span style={{paddingRight: 10}}>查询类型:</span>
				<Select value={this.state.selectDateType} style={{ width: "50%" }} onChange={this.setDateType}>
					<Option value="day">按日查询</Option>
					<Option value="month">按月查询</Option>
					<Option value="year">按年查询</Option>
					
				</Select>
				</Col>
				
				<Col span={10}><span style={{paddingRight: 10}}>日期范围:</span>
					<div style={{display:this.state.selectDateType=="year"?"inline-block":"none",width:"80%"}}>
					<Select value={this.state.selectYearTime1} placeholder="开始年份" style={{ width: "45%" }} onChange={this.setYearTime1.bind(this)}>
								{this.state.mapselection.map((item,index)=>{
									return <Option value={item.value}>{item.name}</Option>
								})}
					</Select>
					<Select value={this.state.selectYearTime2} placeholder="结束年份" style={{ width: "45%",marginLeft:"10px" }} onChange={this.setYearTime2.bind(this)}>
								{this.state.mapselection.map((item,index)=>{
									return <Option value={item.value}>{item.name}</Option>
								})}
					</Select>
					</div>
					<div style={{display:this.state.selectDateType=="month"?"inline-block":"none",width:"80%"}}>
					<MonthPicker format="YYYY-MM" value={this.state.selectMonthTimeShow1}   onChange={this.selectMonthChange1} disabledDate={this.disabledStartMonth} style={{width:"45%"}} placeholder="开始月份" />
					<MonthPicker format="YYYY-MM" value={this.state.selectMonthTimeShow2} onChange={this.selectMonthChange2} disabledDate={this.disabledEndMonth} style={{width:"45%",marginLeft:"10px"}} placeholder="结束月份" />
					</div>
					<div style={{display:this.state.selectDateType=="day"?"inline-block":"none",width:"80%"}}>
					<DatePicker
						size="large"
						format="YYYY-MM-DD"
						placeholder={'开始日期'}
						disabledDate={this.disabledStartDate}
						value={this.state.selectDateTimeShow1}
						onOk={this.timeOk}
						style={{width:"45%"}}
						onChange={this.selectDateChange1} />
					<DatePicker
						size="large"
						format="YYYY-MM-DD"
						placeholder={"结束日期"}
						value={this.state.selectDateTimeShow2}
						disabledDate={this.disabledEndDate}
						onOk={this.timeOk}
						style={{width:"45%",marginLeft:"10px"}}
						onChange={this.selectDateChange2} />
					</div>
				</Col>
				<Col span={6}>
					<Button type="primary" onClick={this.queryProfitOfCondition}>查询</Button>
					{/* <Button type="primary" style={{marginLeft: 20}} onClick={this.queryProfitOfCondition1}>查询不同区域不同等级隐患数量统计</Button>
					<Button type="primary" style={{marginLeft: 20}} onClick={this.queryProfitOfCondition2}>查询每天不同区域不同等级隐患数量统计</Button> */}
					<Button type="default" style={{marginLeft: 20}} onClick={this.reset}>重置</Button>
				</Col>
				
			</Row>


			<Tabs defaultActiveKey={this.state.tabClickChangeActiveIndex+""} onChange={this.changeTabActive.bind(this)}>
			<Tabs.TabPane tab={<em className={styles.is00}>查询水域地图异常点</em>} key="1">
			<div>
			<div className={styles.titlr}>{self.state.chartStartTime+"-"+self.state.chartEndTime+'水域地图异常点'}</div>
			{this.state.markers.length>0?<Map center = {{
						lng: this.state.markers[0].lng,
						lat: this.state.markers[0].lat,
					}}
					style={{
						height:'700px',
						width:this.state.widthwidow,
						display:this.state.markers.length>0?"block":"none"
					}}
					zoom = '8' 
					>
					{this.state.markers.map((marker, index) => {
						if(marker.grade=="2"){
							var icon = styles.amapSimpleMarkerStylered;
						}else if(marker.grade=="1"){
							var icon = styles.amapSimpleMarkerStyleorange;
						}else{
							var icon = styles.amapSimpleMarkerStyleblue;
						}
						return <Marker icon={icon} position={{lng: marker.lng, lat: marker.lat}}>
						<div onClick={this.clickit.bind(this,marker,index)} className={styles.amapSimpleMarker+" "+styles.amapSimpleMarkerFreshstyle+" "+icon}><div className={styles.amapSimpleMarkericon}></div><div  className={styles.amapSimpleMarkerlabel} style={{color: "rgb(255, 255, 255)"}}>{index}</div>
						</div>
						</Marker>
						
					})}
					<NavigationControl/>
					
					<ScaleControl />
					<OverviewMapControl />
					<InfoWindow position={{lng: this.state.showInfoWindowlng, lat: this.state.showInfoWindowlat}} text={this.state.showInfoWindowContent} title={this.state.showInfoWindowTitle}/>
				</Map>:<Map center = {{
						lng:118.78
						,lat:32.04
					}}
					style={{
						height:'700px',
						width:this.state.widthwidow,
					}}
					zoom = '8' 
					>
					<NavigationControl/>

					<ScaleControl />
					<OverviewMapControl />
					
				</Map>}
			
			
			</div>
			</Tabs.TabPane>
			<Tabs.TabPane tab={<em className={styles.is00}>查询不同区域不同等级隐患数量统计</em>} key="2">
			{!this.state.dataLine?"":<ReactEcharts option={this.state.dataLine} onEvents={onEvents} style={{width:this.state.widthwidow1,height: 500}} />}
			{!this.state.dataPie?"":<ReactEcharts option={this.state.dataPie} onEvents={onEvents} style={{width:this.state.widthwidow1,height: 500}} />}
			{!this.state.dataBar?"":<ReactEcharts option={this.state.dataBar} onEvents={onEvents} style={{width:this.state.widthwidow1,height: 500,paddingBottom:"20px",boxSizing:"content-box"}} />}
			</Tabs.TabPane>
			<Tabs.TabPane tab={<em className={styles.is00}>查询每天不同区域不同等级隐患数量统计</em>} key="3">
			{!this.state.dataLine?"":<ReactEcharts option={this.state.dataLine} onEvents={onEvents} style={{width:this.state.widthwidow1,height: 500}} />}
			{!this.state.dataPie?"":<ReactEcharts option={this.state.dataPie} onEvents={onEvents} style={{width:this.state.widthwidow1,height: 500}} />}
			{!this.state.dataBar?"":<ReactEcharts option={this.state.dataBar} onEvents={onEvents} style={{width:this.state.widthwidow1,height: 500,paddingBottom:"20px",boxSizing:"content-box"}} />}
			</Tabs.TabPane>
			</Tabs>
		
			</Spin>

		)
     }
}
