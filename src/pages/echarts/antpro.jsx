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



const visitData = [
  {
    x: "2017-09-01",
    y: 100
  },
  {
    x: "2017-09-02",
    y: 120
  },
  {
    x: "2017-09-03",
    y: 88
  },
  {
    x: "2017-09-04",
    y: 65
  }
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
			provinceMap:"",
			optionMap:"",

		}
		/*datepicker:[moment(),moment()]*/
	}


	componentWillMount(){

		self.loadData(0, 10);
		  
	}
	componentDidMount(){}
	
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
	
	
	onChartClick=()=>{
		console.log(11)
	}
	
	render() {

		return (
			<Spin spinning={this.state.loading}>
				<Button type="primary">11</Button>
			</Spin>

		)
     }
}
