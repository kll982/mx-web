import React from 'react';
import moment from "moment";
moment.locale('zh-cn');
import { Pagination, Breadcrumb,Select, Row, Col, Input, DatePicker, Button,Icon, Table, message, Spin,TreeSelect,Tabs } from 'antd';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
import {Link, hashHistory} from 'react-router';


import $jsonp from '../../utils/service';
import $jsonp3 from '../../utils/service3';
import api from '../../utils/api';
import styles from './orderlist.less'
import publicstyle from '../../img/public.less'
import freshfs from "../../img/freshfs.png"

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

function fetchNodeType(nodeType, nodeName) {
	var returnDiv = "";
	if (nodeType == 1) {
		returnDiv = <div><img src={companypng} className={styles1.qicon} />{nodeName}</div>
	}
	else if (nodeType == 2) {
		returnDiv = <div><img src={departmentpng} className={styles1.qicon} />{nodeName}</div>
	}
	else if (nodeType == 3) {
		returnDiv = <div><img src={emppng} className={styles1.qicon} />{nodeName}</div>
	}
	return returnDiv
}

const loop = data => data.map((item) => {
	if (item.children && item.children.length) {
		var ptitle = "";
		ptitle = fetchNodeType(item.nodeType, item.name)

		return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id} value={item.id.toString()}>{loop(item.children)}</TreeSelect.TreeNode>;
	}
	var ptitle = "";
	ptitle = fetchNodeType(item.nodeType, item.name)
	return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id} value={item.id.toString()} />;
	// isLeaf={item.isLeaf}
});


export default class customeppqqrlist extends React.Component {
	constructor(props) {
		super(props);
		self=this;
		this.state = {
			loading:false,
			selectDateTimeShow11:moment().subtract(7, "days"),
			selectDateTimeShow22:moment(),
			selectDateTime11:moment().subtract(7, "days").format("YYYY-MM-DD"),
			selectDateTime22:moment().format("YYYY-MM-DD"),
			selectDateTime1:"",
			selectDateTime2:"",
			selectDateTimeShow1:null,
			selectDateTimeShow2:null,
			mapselection:[],
			treedata2:[],
			departmentId:"",
			departmentCode:"",
			departmentIdText:[],
			selectType:"",
			selectFixStatus:"",
			expandForm: false,

			current: 1,
			total: 30,
			departmentId: "",
			departmentCode: "",

			department: [],
			treedata2: [],
			selectType: "",
			

		}
	}
	componentWillMount(){
		//self.loadData(1, 10);
		self.fetchDepartment();
	}
	componentDidMount(){
		
	}
	fetchDepartment(){
		$jsonp3(self,api.commonFilterData,{}).then((res) => {
			var list=[];
			var post1=res.data.response.msaInfo;
			
			if(post1.nodeType=="3"){
				post1.isLeaf=true
			}else{
				post1.isLeaf=false
			}
			this.loadData(1, 10);
			list[0]=post1;
			this.setState({
				department:list,
				msaInitInfo:post1,
				treedata2:list,
			},()=>{
				console.log(self.state.treedata2)
			});
		});
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
	
	setType = (value) => {
		this.setState({
			selectType:value
		})
	}

	setFixStatus= (value) => {
		this.setState({
			selectFixStatus:value
		})
	}

	trim = (str) => { //删除左右两端的空格
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	queryProfitOfCondition = () => {
		self.loadData(1, 10);
	}
	reset = () => {
		this.setState({
			selectDateTime1:"",
			selectDateTime2:"",
			selectDateTimeShow1:null,
			selectDateTimeShow2:null,
			departmentId:"",
			departmentCode:"",
			departmentIdText:[],
			selectType:"",
			selectFixStatus:"",
	    },() => {
			self.loadData(1,10);
		});
	}
	loadData = (page, pageSize) => {
		self.setState({
			loading: true
		});
		var self1 = self;
		$jsonp3(self, api.orderList, {
			msaId: self.state.departmentId,
			type: self.state.selectType,
			fixStatus: self.state.selectFixStatus,
			startDate: self.state.selectDateTime1,
			endDate: self.state.selectDateTime2,
			// startDate:"",
			// endDate:"",
			pageNum: page,
		}).then((res) => {
			console.log(res)
			var currentItemLength = (res.data.response.pageInfo.pageNum - 1) * (res.data.response.pageInfo.pageSize);
			var resda = res.data.response.list;
			console.log("list", resda);
			var resdatashowing = [];
			for (var k0 = 0; k0 < resda.length; k0++) {
				let obj = {};
				for (let p in resda[k0]) {
					obj[p] = resda[k0][p];

				}
				obj.index = currentItemLength + k0;
				obj.key = resda[k0].id;
				resdatashowing.push(obj);
				if(resda[k0].generalGrade==0 && resda[k0].bigGrade==0 ){
					obj.gradeText="无隐患"
				}else{
					obj.gradeText="有隐患"
				}
				
			}

			self.setState({
				data: resdatashowing,
				page: res.data.response.pageInfo,
				current: res.data.response.pageInfo.pageNum,
				totalPage: res.data.response.pageInfo.pages,
			});

			self.setState({
				loading: false
			});
		});

	}
	onPageChange = (page, pageSize) => {
		self.loadData(page, pageSize);
	}
	toFirst = () => {
		self.loadData(1, this.state.page.pageSize)
	}
	toLast = () => {
		self.loadData(this.state.page.pages, this.state.page.pageSize);
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
	
	
	onTreeLoadData = (treeNode) => {
		return new Promise((resolve) => {
			if (treeNode.props.children) {
				resolve();
				return;
			}
			var msaInitInfo=self.state.msaInitInfo;
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
					if(msaInitInfo.nodeType=="1" && post1[p1].nodeType=="2"){
						post1[p1].isLeaf=true
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
	
	toggleForm = () => {
		this.setState({
		  expandForm: !this.state.expandForm,
		});
	};
	renderSimpleForm() {
		return (
			<Row className={styles.antrow1}>
			<Col span={8}><span style={{paddingRight: 10}}>所属海事局:</span>
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
			<Select value={this.state.selectType} style={{ width: "50%" }} onChange={this.setType}>
				<Option value="">全部</Option>
				<Option value="1">渡口渡船</Option>
				<Option value="2">游览经营</Option>
			</Select>
			</Col>
			
			<Col span={5}><span style={{paddingRight: 10}}>隐患等级:</span>
			<Select value={this.state.selectFixStatus} style={{ width: "50%" }} onChange={this.setFixStatus}>
				<Option value="">全部</Option>
				<Option value="0">无隐患</Option>
				<Option value="1">有隐患</Option>
			</Select>
			</Col>
			<Col span={6}>
					<Button type="primary" onClick={this.queryProfitOfCondition}>查询</Button>
					<Button type="default" style={{marginLeft: 20}} onClick={this.reset}>重置</Button>

					<a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
						展开 <Icon type="down" />
					</a>
			</Col>
		</Row>
		);
	  }
	
	renderAdvancedForm() {
		return (
		  <div>
			<Row className={styles.antrow1}>
				<Col span={8}><span style={{paddingRight: 10}}>所属海事局:</span>
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
				<Select value={this.state.selectType} style={{ width: "50%" }} onChange={this.setType}>
					<Option value="">全部</Option>
					<Option value="1">渡口渡船</Option>
					<Option value="2">游览经营</Option>
				</Select>
				</Col>

				<Col span={11}><span style={{paddingRight: 10}}>隐患等级:</span>
				<Select value={this.state.selectFixStatus} style={{ width: "50%" }} onChange={this.setFixStatus}>
					<Option value="">全部</Option>
					<Option value="0">无隐患</Option>
					<Option value="1">有隐患</Option>
				</Select>
				</Col>
			</Row>
			<Row className={styles.antrow1}>
				<Col span={13}><span style={{paddingRight: 10}}>日期范围:</span>
					<div style={{display:"inline-block",width:"80%"}}>
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
				<Col span={11}>
					<Button type="primary" onClick={this.queryProfitOfCondition}>查询</Button>
					<Button type="default" style={{marginLeft: 20}} onClick={this.reset}>重置</Button>
					<a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
					收起 <Icon type="up" />
					</a>
				</Col>
				
			</Row>
		  </div>
		);
	}
	renderForm() {
		return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
	}

	toPrintDetail = (addoredit, record) => {
		window.open("/ico/examine.html?detailId="+record.id)
	}
	render() {
		const columns = [
		{
			title: '项目',
			dataIndex: 'title',
			key: 'title',

			className: publicstyle.center,
		},
		{
			title: '所属海事局',
			dataIndex: 'msaName',
			key: 'msaName',
			width: "200px",
			className: publicstyle.center,
			render: (text, record, index) => {
				if (!text) { return <span>-</span> }
				else { return <span>{text}</span> }
			},
		},
		
		{
			title: '是否有隐患',
			dataIndex: 'gradeText',
			key: 'gradeText',
			width: "120px",
			className: publicstyle.center,
			render: (text, record, index) => {
				if (text=="无隐患") { return <span>无隐患</span> }
				else { return <span>一般{record.generalGrade} 重大{record.bigGrade}</span> }
			},
		},
		{
			title: '发布时间',
			dataIndex: 'postTime',
			key: 'postTime',
			width: "140px",
			className: publicstyle.center,
			render: (text, record, index) => {
				return moment(text).format("YYYY-MM-DD HH:mm")
			},
		},
		{
			title: '操作',
			key: 'action',
			width: "140px",
			className: publicstyle.center,
			render: (text, record, index) => {
				return <div style={{ textAlign: "center", cursor: "pointer" }}>
						<Button type="primary" style={{ marginRight: 10, marginBottom: 5 }} onClick={this.toPrintDetail.bind(this, "edit", record)}>查看详情</Button>
					</div>

			},
		}];		
{}
		return (
			<Spin spinning={this.state.loading}>
			 <Breadcrumb separator=">">
				<Breadcrumb.Item>统计报表</Breadcrumb.Item>
				<Breadcrumb.Item>检查单统计</Breadcrumb.Item>
			</Breadcrumb>
			<div className={styles.clearfloat}></div>
			{this.renderForm()}
			{this.state.data && this.state.page ? <div><Table columns={columns} dataSource={this.state.data} bordered={true} pagination={false} style={{ textAlign: "center" }} />
			<Button type="primary" className={styles.pageFirst} style={{ display: this.state.page.pages > 0 ? "block" : "none" }} onClick={this.toFirst}>首页</Button>
			<Pagination className={styles.page} style={{ display: this.state.page.pages > 0 ? "block" : "none" }} onChange={this.onPageChange} showFISRT current={this.state.current} pageSize={this.state.page.pageSize} total={this.state.page.total} />
			<Button type="primary" className={styles.pageLast} style={{ display: this.state.page.pages > 0 ? "block" : "none" }} onClick={this.toLast}>末页</Button></div> : <div></div>}
			</Spin>

		)
     }
}
