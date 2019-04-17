import React from 'react';
import moment from "moment";
moment.locale('zh-cn');
import { Pagination, Breadcrumb,Select, Row, Col, Input, Button,Icon, Table, message, Spin,Steps,Modal,Checkbox } from 'antd';

const Option = Select.Option;
const Step = Steps.Step;
const CheckboxGroup = Checkbox.Group;
import {Link, hashHistory} from 'react-router';

import $jsonp from '../../utils/service.js';
import api from '../../utils/api.js';

import publicstyle from '../../img/public.less'
import styles from './evalit4.less'

import emppng from "../../img/emp.png"
import styles1 from "../../components/common.less"
import {arrCon1,findEqualTtem,findEqualValueInArray} from "./arrControl.js"

//表格重绘

let self;
function findChangeKEY(chekArry,frmstate){
	var parId=chekArry[0].parId;
	var firstPosition=0;
	var deleteLength=0;
	for(var kk1=0; kk1<frmstate.length; kk1++){
		if(frmstate[kk1].parId==parId){
			firstPosition=kk1;
			break
		}
	}
	for(var kk1=0; kk1<frmstate.length; kk1++){
		if(frmstate[kk1].parId==parId){
			deleteLength+=1;
		}
	}
	return [deleteLength,firstPosition,firstPosition,firstPosition+deleteLength]
}
function includeItem(arr,item){
	var isExist=false;
	for(var i=0;i<arr.length; i++){
		if(arr[i]==item){
			isExist=true;
		}
	}
	return isExist
}


var data1=[
	{
	  "idStr": "90",
	  "id": 90,
	  "parId": 1,
	  "rootId": 90,
	  "companyId": 22,
	  "companyName": "世界金融组织QH",
	  "businessTradeHouseId": 42,
	  "businessTradeHouseName": "11",
	  "value": "中国建设银行股份有限公司丹东六合支行",
	  "bankMoney": 983180666.56,
	  "bankNo": "111111111111111111111111111111111111",
	  "bankLineNo": "105226000225",
	  "bankStatus": 1,
	  "createTime": 1517822891000,
	  "updateTime": 1521192967603,
	  "key": 90,
	  "index": 1
	},
	{
	  "idStr": "107",
	  "id": 107,
	  "rootId": 107,
	  "parId": 1,
	  "companyId": 22,
	  "companyName": "世界金融组织QH",
	  "businessTradeHouseId": 42,
	  "businessTradeHouseName": "11",
	  "value": "中国农业发展银行饶河县支行",
	  "bankMoney": -9900,
	  "bankNo": "11111111111111",
	  "bankLineNo": "203272684350",
	  "bankStatus": 1,
	  "createTime": 1520579609000,
	  "updateTime": 1521167779169,
	  "key": 107,
	  "index": 2
	}
];
  var QixianData=[
	{
	  "id": 1,
	  "parId": 90,
	  "value": "期限<90",
	  "key": 1,
	  "node":"qixian"
	},
	{
		"id": 2,
		"parId": 90,
		"value": "90<=期限<180天",
		"key": 2,
		"node":"qixian"
	  },
	  {
		"id": 3,
		"parId": 90,
		"value": "180<=期限<270天",
		"key": 3,
		"node":"qixian"
	  } 
  ];
  var AmountData=[
	{
	  "id": "1",
	  "parId": 1,
	  "value": "单张<100",
	  "key": "1",
	  "node":"amount"
	},
	{
		"id": "2",
		"parId": 1,
		"value": "100<=单张<500",
		"key": "2",
		"node":"amount"
	},
	{
		"id": "3",
		"parId": 1,
		"value": "500<=单张<1000",
		"key": "3",
		"node":"amount"
	},
	{
		"id": "4",
		"parId": 1,
		"value": "1000<=单张<5000",
		"key": "4",
		"node":"amount"
	},
	{
		"id": "5",
		"parId": 1,
		"value": "5000<=单张<10000",
		"key": "5",
		"node":"amount"
	},
	
  ];
  
var textArr=['轻微瑕疵', '一般瑕疵', '一手','非一手','黑名单','直贴','买断','货款票'];
export default class customerlist extends React.Component {
	constructor(props) {
		super(props);
		self=this;
		this.state = {
			datepicker:[],
			datepickerShow:"",
			current:1,
			total:10,
			loading:true,
			currentStep:3,
			
			isXinzenBank:true,
			endTime:"",
			data1:[],
			QixianData:[],
			AmountData:[],
			withFirstChoose:false,
			haveEditAcceptClassData:false,
			disabled:true,
			haveEditQixianData:false,
			editQixianVisible:false,
			haveEditAmountData:false,
			TYPEDATA:[],
			QIXIANDATA:[],
			AMOUNTDATA:[],
			SHOWTYPEDATA:[],
			SHOWQIXIANDATA:[],
			SHOWAMOUNTData:[],
			deletetempQixianData:[],
			deletetempAmountData:[],
			deleteTempIdData:[],
			addTempIdData:[],
			plainOptions:[{value:"qingweiXiaci",label:"轻微瑕疵"},{value:"yibanXiaci",label:"一般瑕疵"},{value:"yishou",label:"一手"},{value:"feiyishou",label:"非一手"},{value:"heimingdan",label:"黑名单"},{value:"zhitie",label:"直贴"},{value:"maiduan",label:"买断"},{value:"huokuan",label:"货款票"}],
			tempplainOptions1:[{value:"jichujiage",label:"基础价格"}],
			plainOptions1:[
				{
				  "value": "jichujiage",
				  "label": "基础价格"
				},
				{
				  "value": "yishou",
				  "label": "一手"
				},
				{
				  "value": "feiyishou",
				  "label": "非一手"
				},
				{
				  "value": "heimingdan",
				  "label": "黑名单"
				},
				{
				  "value": "zhitie",
				  "label": "直贴"
				}
			  ],
			tdTypedata:[
				{
					"value": "jichujiage",
					"label": "基础价格"
				},
				{
					"value": "yishou",
					"label": "一手"
				},
				{
					"value": "feiyishou",
					"label": "非一手"
				},
				{
					"value": "heimingdan",
					"label": "黑名单"
				},
				{
					"value": "zhitie",
					"label": "直贴"
				}
			],
			plainOptions1Value:["jichujiage","qingweiXiaci","yibanXiaci","yishou","feiyishou","heimingdan","zhitie","maiduan","huokuan"],
			firstTypeMake:false,
			secondTypeMake:false,
			thirdTypeMake:false,
			initData:{
				"qingweiXiaci":["5.1","7.9","11.2","99.2","919.2","19.2","0.2","34.2","129.2","35.2","36.2"],
				"yibanXiaci":["1.1","","1.2"]
			},

			filterObject:{},
			isInConcat:false,
			compareRowArr:[],
			fiColSpan:[],
			seColSpan:[],
			plainOptions1LENGTH:8,
			plainOptions1LENGTH1:2,
			plainOptions1LENGTH2:6,
			allIdWithRowColCount:[],
			isInDevide:false,
			hideInputForChoose:true,
			areaXStartIndex:0,
			areaYStartIndex:0,
			areaXEndIndex:0,
			areaYEndIndex:0,
			allChooseAreaId:[],
			xLength:1,
			yLength:1,

		}
		/*datepicker:[moment(),moment()]*/
	}


	componentWillMount(){
		self.setState({
			data1:self.props.location.state.data1,
			QixianData:self.props.location.state.QixianData,
			AmountData:self.props.location.state.AmountData,
			firstRadioValues:self.props.location.state.firstRadioValues,
			secondRadioValues:self.props.location.state.secondRadioValues,
			thirdRadioValues:self.props.location.state.thirdRadioValues,
			firstTypeText:self.props.location.state.firstTypeText,
			secondTypeText:self.props.location.state.secondTypeText,
			thirdTypeText:self.props.location.state.thirdTypeText,
			typeProduct:self.props.location.state.typeProduct,
			plainOptions1:self.props.location.state.plainOptions1,
			tdTypedata:self.props.location.state.tdTypedata,
			
		},()=>{
			
			var returnArr=self.setInitSpan();
			
			var returnArr1=self.getAllId1();//全体id集合
			var allIdTd=self.getAllIdWithInput();
			console.log("allIdTd",allIdTd[2])
			self.setState({
				allIdTd:allIdTd[0],
				allIdWithRowColCount:allIdTd[1],
				fenzuId:allIdTd[2],
			})
			if(!self.props.location.state.allIdWithRowColCount){
				
			}else{
				self.setState({
					allIdWithRowColCount:self.props.location.state.allIdWithRowColCount
				})
			}

			var typeProduct1=this.state.typeProduct;
			//设置表头伸缩比例开始
			var sdd=typeProduct1.replace(/0/g,"").length;
			self.setState({
				plainOptions1LENGTH1:sdd,
				plainOptions1LENGTH2:self.state.plainOptions1.length+1,
				plainOptions1LENGTH:sdd+self.state.plainOptions1.length+1,
			})
			//设置表头伸缩比例结束
			if(typeProduct1.replace(/0/g,"").length==1){
				var returnArr2=arrCon1(returnArr1);
				var eqiali=findEqualTtem(returnArr2[0]);
				for(var i=0;i<eqiali.length;i++){
					var firstIndex=findEqualValueInArray(returnArr2[0],eqiali[i])[0];
					returnArr1[firstIndex][1]="fi1";
				}
				self.setState({
					compareRowArr:returnArr1
				})
				self.setState({
					fiColSpan:returnArr[0],
					seColSpan:returnArr[1]
				})
			}
			else if(typeProduct1.replace(/0/g,"").length==2){
				var returnArr2=arrCon1(returnArr1);
				var eqiali=findEqualTtem(returnArr2[0]);
				for(var i=0;i<returnArr1.length;i++){	
					returnArr1[i][2]="norm"
				}
				for(var i=0;i<eqiali.length;i++){
					var firstIndex=findEqualValueInArray(returnArr2[0],eqiali[i])[0];
					returnArr1[firstIndex][2]="fi1";
				}
				console.log(returnArr1)
				self.setState({
					compareRowArr:returnArr1
				})
				self.setState({
					fiColSpan:returnArr[0],
					seColSpan:returnArr[1]
				})
			}else{
				var returnArr2=arrCon1(returnArr1);
				var eqiali1=findEqualTtem(returnArr2[0]);
				var eqiali2=findEqualTtem(returnArr2[1]);
				//设置第二项循环的第一个的标志是se1
				for(var i=0;i<returnArr1.length;i++){	
					returnArr1[i][3]="norm"
				}
				for(var i=0;i<eqiali2.length;i++){
					var firstIndex=findEqualValueInArray(returnArr2[1],eqiali2[i])[0];
					returnArr1[firstIndex][3]="se1"
				}
				for(var i=0;i<eqiali1.length;i++){
					var firstIndex=findEqualValueInArray(returnArr2[0],eqiali1[i])[0];
					returnArr1[firstIndex][3]="fi1";
				}
				console.log(returnArr1)
				self.setState({
					compareRowArr:returnArr1
				})
				//设置数组循环的row和col
				self.setState({
					fiColSpan:returnArr[0],
					seColSpan:returnArr[1]
				})
				
			}
		
			self.setState({
				returnArr:returnArr
			})
		})
		console.log(self.props.location.state)
	}
	
	componentDidMount(){
		self.loadData();
		console.log(self.state)
		var pps=self.state.plainOptions1Value;
		let empty1={};
		for(var index1=0; index1<pps.length; index1++){
			empty1[pps[index1]]=[]
		}
		for(var index1=0; index1<pps.length; index1++){
			let obgfd="check-w"+pps[index1];
			self.setState({
				[obgfd]:false
			})
		}
		
		var p1=self.refs;
		console.log(p1)
		//对input的state和check的state进行初始化
		for(var p2 in p1){
			//console.log(p2)
			if(p2.indexOf("io-")>-1){
				self.setState({
					[p2]:""
				})
			}else{
				self.setState({
					[p2]:false
				})
			}
			
		}
		//对列进行分组
		for(var p3 in p1){
			//console.log(p3)
			for(var index1=0; index1<pps.length; index1++){
				if(p3.indexOf("-"+pps[index1])>-1){
					empty1[pps[index1]].push(p3)
				}
			}
		}
		//分组的state
		self.setState({
			filterObject:empty1
		},()=>{
			//console.log(empty1)
			var spdp=self.state.filterObject;
			var initData=self.state.initData;
			//console.log(initData)
			//pps是包括多个扩展参数value的名称
			for(var index=0; index<pps.length; index++){
				var inData=initData[pps[index]];
				if(!inData){}
				else{
					//inData是初始数据对应value的数据
					var qingweiXiaci=spdp[pps[index]];
					//qingweiXiaci是对应表格value的state集合
					//console.log(qingweiXiaci)
					
					for(var index1=0; index1<inData.length; index1++){
						self.setState({
							[qingweiXiaci[index1]]:inData[index1]
						},()=>{
							
						})
					}
				}
				
			}
			//初始化表格数据显示
			//console.log(self.state.filterObject)
		})
		var rightButton=[];
		for(var indx1 in p1){
			if(indx1.indexOf("check-")>-1){
				rightButton.push(indx1)
			}
		}
		console.log(rightButton)
		self.setState({
			rightButton:rightButton
		})
	}
	loadData(){
		
	}
	
	
	next() {
		const currentStep = this.state.currentStep + 1;
		console.log(self.state.allIdWithRowColCount)
		// return
		if(currentStep==4){
			hashHistory.push({
				pathname: "/main/evalit5",
				state:{
					data1:self.state.data1,
					QixianData:self.state.QixianData,
					AmountData:self.state.AmountData,
					firstRadioValues:self.state.firstRadioValues,
					secondRadioValues:self.state.secondRadioValues,
					thirdRadioValues:self.state.thirdRadioValues,
					firstTypeText:self.state.firstTypeText,
					secondTypeText:self.state.secondTypeText,
					thirdTypeText:self.state.thirdTypeText,
					typeProduct:self.state.typeProduct,
					plainOptions1:self.state.plainOptions1,
					tdTypedata:self.state.plainOptions1,
					allIdWithRowColCount:self.state.allIdWithRowColCount,
				  }
			})
		}
		this.setState({ currentStep });
		
	}
	prev() {
		const currentStep = this.state.currentStep - 1;
		console.log(currentStep)
		if(currentStep==2){
			hashHistory.push({
				pathname: "/main/evalit3",
				state:{
					data1:self.props.location.state.data1,
					QixianData:self.props.location.state.QixianData,
					AmountData:self.props.location.state.AmountData,
					firstRadioValues:self.props.location.state.firstRadioValues,
					secondRadioValues:self.props.location.state.secondRadioValues,
					thirdRadioValues:self.props.location.state.thirdRadioValues,
					firstTypeText:self.props.location.state.firstTypeText,
					secondTypeText:self.props.location.state.secondTypeText,
					thirdTypeText:self.props.location.state.thirdTypeText,
					typeProduct:self.props.location.state.typeProduct,
					plainOptions1:self.props.location.state.plainOptions1,
					tdTypedata:self.props.location.state.tdTypedata,
				}
			})
		}
		this.setState({ currentStep });
	}
	
	setInitSpan(){
		var postTypeData=self.state.data1;
		var postQixianData=self.state.QixianData;
		var postAmountData=self.state.AmountData;

		var typeProduct1=this.state.typeProduct;
		var typeProductArr=typeProduct1.split("");
		var blanArr0=[];
		var blanArr1=[];
		var blanArr2=[];
		var returnArr=[];
		if(typeProduct1.replace(/0/g,"").length==1){
			for(var index1=0; index1<postTypeData.length;index1++ ){
				blanArr0.push(1)
			}
			returnArr[0]=blanArr0;
			returnArr[1]=blanArr0;
			return returnArr
		}
		else if(typeProduct1.replace(/0/g,"").length==2){
			for(var index1=0; index1<postTypeData.length;index1++ ){
				let dss=0;
				for(var index2=0; index2<postQixianData.length;index2++ ){
					if(postTypeData[index1].id==postQixianData[index2].parId){
						dss+=1;
					}
				}
				blanArr0.push(dss)
			}
			for(var index1=0; index1<postQixianData.length;index1++ ){
				blanArr1.push(1)
			}
			returnArr[0]=blanArr0;
			returnArr[1]=blanArr1;
			console.log(returnArr)
			return returnArr
		}
		else{
			for(var index1=0; index1<postTypeData.length;index1++ ){
				let dss1=0;
				for(var index2=0; index2<postAmountData.length;index2++ ){
					if(postTypeData[index1].id==postAmountData[index2].rootId){
						dss1+=1;
					}
				}
				blanArr0.push(dss1)
			}
			for(var index1=0; index1<postQixianData.length;index1++ ){
				let dss2=0;
				for(var index2=0; index2<postAmountData.length;index2++ ){
					if(postQixianData[index1].id==postAmountData[index2].parId){
						dss2+=1;
					}
				}
				blanArr1.push(dss2)
			}
			for(var index1=0; index1<postAmountData.length;index1++ ){
				blanArr2.push(1)
			}
			returnArr[0]=blanArr0;
			returnArr[1]=blanArr1;
			returnArr[2]=blanArr2;
			console.log(returnArr)
			return returnArr
		}
		
		
	}
	getAllId1(){
		var postTypeData=self.state.data1;
		var postQixianData=self.state.QixianData;
		var postAmountData=self.state.AmountData;
		
		var typeProduct1=this.state.typeProduct;
		var typeProductArr=typeProduct1.split("");
		var blanArr0=[];
		var blanArr1=[];
		var blanArr2=[];
		var returnArr=[];
		var returnIdArr=[];
		if(typeProduct1.replace(/0/g,"").length==1){
			for(var index1=0; index1<postTypeData.length;index1++ ){
				let dssObj=[postTypeData[index1].id]
				//console.log(dssObj)
				returnIdArr.push(dssObj)
			}
			return returnIdArr
		}
		else if(typeProduct1.replace(/0/g,"").length==2){
			for(var index1=0; index1<postTypeData.length;index1++ ){
				for(var index2=0; index2<postQixianData.length;index2++ ){
					if(postTypeData[index1].id==postQixianData[index2].parId){
						let dssObj=[postTypeData[index1].id,postQixianData[index2].id]
						//console.log(dssObj)
						returnIdArr.push(dssObj)
					}
				}
			}
			console.log(returnIdArr)
			return returnIdArr
		}
		else{
			for(var index1=0; index1<postTypeData.length;index1++ ){
				for(var index2=0; index2<postQixianData.length;index2++ ){
					if(postTypeData[index1].id==postQixianData[index2].parId){
						for(var index3=0; index3<postAmountData.length;index3++ ){
							if(postQixianData[index2].id==postAmountData[index3].parId){
								let dssObj=[postTypeData[index1].id,postQixianData[index2].id,postAmountData[index3].id]
								//console.log(dssObj)
								returnIdArr.push(dssObj)
							}
						}
					}
				}
			}
			console.log(returnIdArr)
			return returnIdArr
		}
		
		
	}
	getAllIdWithInput(){
		var postTypeData=self.state.data1;
		var postQixianData=self.state.QixianData;
		var postAmountData=self.state.AmountData;
		var tdTypedata=self.state.tdTypedata;
		var plainOptions1=self.state.plainOptions1;
		
		var typeProduct1=this.state.typeProduct;
		var typeProductArr=typeProduct1.split("");
		var blanArr0=[];
		var blanArr1=[];
		var blanArr2=[];
		var returnArr=[];
		var returnIdArr=[];
		var returnIdArr1=[];
		var fenzuId=[];
		if(typeProduct1.replace(/0/g,"").length==1){
			for(var index1=0; index1<postTypeData.length;index1++ ){
				let dssObj2=[];
				for(var index2=0; index2<plainOptions1.length;index2++ ){
					let dssObj=[postTypeData[index1].id,plainOptions1[index2].value];
					let dssObj1=[postTypeData[index1].id,plainOptions1[index2].value,1,1];
					dssObj2.push(dssObj)
					console.log(dssObj)
					returnIdArr.push(dssObj)
					returnIdArr1.push(dssObj1)
				}
				fenzuId.push(dssObj2)
			}
			console.log("allUd",returnIdArr)
			return [returnIdArr,returnIdArr1,fenzuId]
		}
		else if(typeProduct1.replace(/0/g,"").length==2){
			for(var index1=0; index1<postTypeData.length;index1++ ){
				for(var index2=0; index2<postQixianData.length;index2++ ){
					if(postTypeData[index1].id==postQixianData[index2].parId){
						let dssObj2=[];
						for(var index3=0; index3<plainOptions1.length;index3++ ){
							let dssObj=[postTypeData[index1].id,postQixianData[index2].id,plainOptions1[index3].value]
							let dssObj1=[postTypeData[index1].id,postQixianData[index2].id,plainOptions1[index3].value,1,1];
							dssObj2.push(dssObj)
							// console.log(dssObj)
							returnIdArr.push(dssObj)
							returnIdArr1.push(dssObj1)
						}
						fenzuId.push(dssObj2)
					}
				}
				
			}
			console.log("allUd",returnIdArr)
			return [returnIdArr,returnIdArr1,fenzuId]
		}
		else{
			for(var index1=0; index1<postTypeData.length;index1++ ){
				for(var index2=0; index2<postQixianData.length;index2++ ){
					if(postTypeData[index1].id==postQixianData[index2].parId){
						for(var index3=0; index3<postAmountData.length;index3++ ){
							if(postQixianData[index2].id==postAmountData[index3].parId){
								let dssObj2=[];
								for(var index4=0; index4<plainOptions1.length;index4++ ){
									let dssObj=[postTypeData[index1].id,postQixianData[index2].id,postAmountData[index3].id,plainOptions1[index4].value]
									let dssObj1=[postTypeData[index1].id,postQixianData[index2].id,postAmountData[index3].id,plainOptions1[index4].value,1,1];
									console.log(dssObj)
									dssObj2.push(dssObj)
									returnIdArr.push(dssObj)
									returnIdArr1.push(dssObj1)
								}
								fenzuId.push(dssObj2)
							}
						}
					}
				}
			}
			console.log("allUd",returnIdArr)
			console.log(returnIdArr)
			return [returnIdArr,returnIdArr1,fenzuId]
		}
		
		
	}
	
	editTable(){
		self.setState({
			disabled:false,
			hideInputForChoose:false
		})
		var p1=this.state;
		let ong1={};
		let length1=0;
		for(var index1 in p1){
			ong1[index1]=p1[index1]
			if(index1.indexOf("io-")==0){
				length1+=1;
			}
		}
		console.log(length1)
		self.setState({
			formerState:ong1
		})
	}
	saveTABLE= (e) => {

		this.setState({
			disabled:true,
			hideInputForChoose:true
		})
		console.log(this.state)

	}
	cancelTABLE = (e) => {
		var p1=this.state;
		var p2=this.state.formerState;
		for(var index1 in p1){
			console.log(index1,index1.indexOf("io-"))
			console.log()
			if(index1.indexOf("io-")==0){
				// console.log(index1)
				this.setState({
					[index1]:""
				},()=>{
					console.log(this.state[index1])
				})
			}
		}
		for(var index2 in p2){
			if(index2.indexOf("io-")==0){
				this.setState({
					[index2]:p2[index2]
				})
			}
		}

		this.setState({
			disabled:true,
			hideInputForChoose:true
		},()=>{
			console.log(this.state)
		})
		

	}
	
	inputChange1=(e)=>{
		console.log("input")
		console.log(e.target)
		var fenzuId=self.state.fenzuId;
		var name1=e.target.name;
		var name2=name1.replace("io-","").split("-");
		var typeProduct1=this.state.typeProduct;
		var p1=self.refs[name1].props;
		console.log(p1.row)
		console.log(p1.col)
		var row=parseInt(p1.row)
		var col=parseInt(p1.col)
		var xIndex=0;
		var yIndex=0;
		var pushARR=[];

		if(typeProduct1.replace(/0/g,"").length==1){
			for(var k1=0;k1<fenzuId.length;k1++){
				for(var k2=0;k2<fenzuId[k1].length;k2++){
					if(fenzuId[k1][k2][0]==name2[0] && fenzuId[k1][k2][1]==name2[1]){
						xIndex=k1;
						yIndex=k2;
					}
				}
			}
			console.log(xIndex,yIndex)
			for(var xIndex1=xIndex;xIndex1<xIndex+row;xIndex1++){
				for(var yIndex1=yIndex;yIndex1<yIndex+col;yIndex1++){
					var arr1=fenzuId[xIndex1][yIndex1];
					var arr2="io-"+arr1[0]+"-"+arr1[1]
					pushARR.push(arr2)
				}
			}
			console.log(pushARR)
		}
		else if(typeProduct1.replace(/0/g,"").length==2){
			for(var k1=0;k1<fenzuId.length;k1++){
				for(var k2=0;k2<fenzuId[k1].length;k2++){
					if(fenzuId[k1][k2][0]==name2[0] && fenzuId[k1][k2][1]==name2[1] && fenzuId[k1][k2][2]==name2[2]){
						xIndex=k1;
						yIndex=k2;
					}
				}
			}
			console.log(xIndex,yIndex)
			for(var xIndex1=xIndex;xIndex1<xIndex+row;xIndex1++){
				for(var yIndex1=yIndex;yIndex1<yIndex+col;yIndex1++){
					var arr1=fenzuId[xIndex1][yIndex1];
					var arr2="io-"+arr1[0]+"-"+arr1[1]+"-"+arr1[2]
					pushARR.push(arr2)
				}
			}
			console.log(pushARR)
			
		}
		else{
			for(var k1=0;k1<fenzuId.length;k1++){
				for(var k2=0;k2<fenzuId[k1].length;k2++){
					if(fenzuId[k1][k2][0]==name2[0] && fenzuId[k1][k2][1]==name2[1] && fenzuId[k1][k2][2]==name2[2] && fenzuId[k1][k2][3]==name2[3]){
						xIndex=k1;
						yIndex=k2;
					}
				}
			}
			console.log(xIndex,yIndex)
			for(var xIndex1=xIndex;xIndex1<xIndex+row;xIndex1++){
				for(var yIndex1=yIndex;yIndex1<yIndex+col;yIndex1++){
					var arr1=fenzuId[xIndex1][yIndex1];
					var arr2="io-"+arr1[0]+"-"+arr1[1]+"-"+arr1[2]+"-"+arr1[3]
					pushARR.push(arr2)
				}
			}
			console.log(pushARR)
			
		}
		for(var k3=0;k3<pushARR.length;k3++){
			this.updateState(pushARR[k3],e.target.value)
		}
	}
	updateState(key, value){
		let data = {}
		data[key] = value;
		self.setState(data)
	}
	onSelectChange=(item,e)=>{
		console.log('checked = ', e.target.checked);
		self.setState({
			["check-w"+item.value]: e.target.checked,
		});
		self.setState({
			pcyyItem:item,
		})
	}
	onSelectChange1=(e)=>{
		this.updateState(e.target.name,e.target.checked)
	}
	inConcat=(e)=>{
		self.setState({
			isInConcat:true,
			isInDevide:false,
			isDiveI:"",
			hideInputForChoose:false,
		})
	}
	cancelInConcat=(e)=>{
		var p1=this.state;
		console.log(p1)
		for(var index1 in p1){
			if(index1.indexOf("check-")==0){
				this.setState({
					[index1]:false
				})
			}
		}
		self.setState({
			isInConcat:false,
			hideInputForChoose:true,
		})
	}
	saveInConcat=(e)=>{
		self.setState({
			isInConcat:false,
			hideInputForChoose:true,
		})
		var p1=this.state;
		console.log(p1)
		var plainOptions1=this.state.plainOptions1;
		var rightButton=this.state.rightButton;
		let istopArr=[]
		let rightButtonArr=[];
		var istopStateArr=[];
		var isrightButtonStateArr=[];
		var istopStateValueArr=[];
		var isrightButtonStateValueArr=[];
		for(var indx1=0;indx1<plainOptions1.length;indx1++){
			var plainOptions1StateValue=self.state["check-w"+plainOptions1[indx1].value]
			istopArr.push(plainOptions1StateValue)
			istopStateArr.push("check-w"+plainOptions1[indx1].value)
			if(plainOptions1StateValue){
				istopStateValueArr.push(plainOptions1[indx1].value)
				//选中plainOptions1的value集合
			}
		}
		for(var indx1=0;indx1<rightButton.length;indx1++){
			var rightButtonStateValue=self.state[rightButton[indx1]]
			rightButtonArr.push(rightButtonStateValue)
			isrightButtonStateArr.push(rightButton[indx1])
			if(rightButtonStateValue){
				isrightButtonStateValueArr.push(rightButton[indx1])
				//选中plainOptions1的value集合
			}
		}

		
		console.log(istopArr)
		console.log(rightButtonArr)
		var istopArrBool=this.isLianxu(istopArr)[1];
		var isrightButtonArrBool=this.isLianxu(rightButtonArr)[1];
		var truetopIndexArr=this.isLianxu(istopArr)[0];
		var truerightButtonIndexArr=this.isLianxu(rightButtonArr)[0];
		if(istopArrBool){
			console.log("top连续")
		}else{
			console.log("top不连续")
		}
		if(isrightButtonArrBool){
			console.log("rightButtonArr连续")
		}else{
			console.log("rightButtonArr不连续")
		}
		
		var isInNet=[];
		var typeProduct1=this.state.typeProduct;
		console.log(istopArrBool && isrightButtonArrBool || istopStateValueArr.length==1 && isrightButtonArrBool)
		if(istopArrBool && isrightButtonArrBool || istopStateValueArr.length==1 && isrightButtonArrBool || istopArrBool && isrightButtonStateValueArr==1){
			
			if(typeProduct1.replace(/0/g,"").length==1){
				var a1=self.state.allIdWithRowColCount;
				console.log(istopStateValueArr)
				
				var istopStateValueArrLength=istopStateValueArr.length;
				var isrightButtonStateValueArrLength=isrightButtonStateValueArr.length;
				for(var index1=0; index1<istopStateValueArr.length;index1++){
					console.log(istopStateValueArr[index1])
					for(var index2=0; index2<isrightButtonStateValueArr.length;index2++){
						var temp=isrightButtonStateValueArr[index2].split("-");
						for(var index3=0; index3<a1.length;index3++){
							if(a1[index3][0]==temp[1] && a1[index3][1]==istopStateValueArr[index1]){
								console.log(a1[index3])
								if(index1==0 && index2==0){
									a1[index3][2]=isrightButtonStateValueArrLength
									a1[index3][3]=istopStateValueArrLength
								}else{
									a1[index3][2]=0
									a1[index3][3]=0
								}
							}
							
						}
					}
					
				}
				self.setState({
					allIdWithRowColCount:a1
				});
			}
			else if(typeProduct1.replace(/0/g,"").length==2){
				
				var a1=self.state.allIdWithRowColCount;
				console.log(istopStateValueArr)
				
				var istopStateValueArrLength=istopStateValueArr.length;
				var isrightButtonStateValueArrLength=isrightButtonStateValueArr.length;
				for(var index1=0; index1<istopStateValueArr.length;index1++){
					console.log(istopStateValueArr[index1])
					for(var index2=0; index2<isrightButtonStateValueArr.length;index2++){
						var temp=isrightButtonStateValueArr[index2].split("-");
						for(var index3=0; index3<a1.length;index3++){
							if(a1[index3][0]==temp[1] && a1[index3][1]==temp[2] && a1[index3][2]==istopStateValueArr[index1]){
								console.log(a1[index3])
								if(index1==0 && index2==0){
									a1[index3][3]=isrightButtonStateValueArrLength
									a1[index3][4]=istopStateValueArrLength
								}else{
									a1[index3][3]=0
									a1[index3][4]=0
								}
							}
							
						}
					}
					
				}
				self.setState({
					allIdWithRowColCount:a1
				});
				
			}else{
				var a1=self.state.allIdWithRowColCount;
				console.log(istopStateValueArr)
				
				var istopStateValueArrLength=istopStateValueArr.length;
				var isrightButtonStateValueArrLength=isrightButtonStateValueArr.length;
				for(var index1=0; index1<istopStateValueArr.length;index1++){
					console.log(istopStateValueArr[index1])
					for(var index2=0; index2<isrightButtonStateValueArr.length;index2++){
						var temp=isrightButtonStateValueArr[index2].split("-");
						for(var index3=0; index3<a1.length;index3++){
							if(a1[index3][0]==temp[1] && a1[index3][1]==temp[2] && a1[index3][2]==temp[3] && a1[index3][3]==istopStateValueArr[index1]){
								console.log(a1[index3])
								if(index1==0 && index2==0){
									a1[index3][4]=isrightButtonStateValueArrLength
									a1[index3][5]=istopStateValueArrLength
								}else{
									a1[index3][4]=0
									a1[index3][5]=0
								}
							}
							
						}
					}
					
				}
				self.setState({
					allIdWithRowColCount:a1
				});
			}
		}
		else if(istopArrBool && !isrightButtonArrBool){
			console.log(truetopIndexArr)
			if(typeProduct1.replace(/0/g,"").length==1){
				var a1=self.state.allIdWithRowColCount;
				console.log(istopStateValueArr)
				console.log(a1)
				var istopStateValueArrLength=istopStateValueArr.length;
				for(var index1=0; index1<istopStateValueArr.length;index1++){
					for(var index2=0; index2<a1.length;index2++){
						if(a1[index2][1]==istopStateValueArr[index1]){
							if(index1==0){
								a1[index2][2]=a1[index2][2]
								a1[index2][3]=istopStateValueArrLength
							}else{
								a1[index2][2]=0
								a1[index2][3]=0
							}
						}
						
					}
				}
				console.log(a1)
				self.setState({
					allIdWithRowColCount:a1
				});
			}
			else if(typeProduct1.replace(/0/g,"").length==2){
				
				var a1=self.state.allIdWithRowColCount;
				console.log(istopStateValueArr)
				console.log(a1)
				var istopStateValueArrLength=istopStateValueArr.length;
				for(var index1=0; index1<istopStateValueArr.length;index1++){
					for(var index2=0; index2<a1.length;index2++){
						if(a1[index2][2]==istopStateValueArr[index1]){
							if(index1==0){
								a1[index2][3]=a1[index2][3]
								a1[index2][4]=istopStateValueArrLength
							}else{
								a1[index2][3]=0
								a1[index2][4]=0
							}
						}
						
					}
				}
				console.log(a1)
				self.setState({
					allIdWithRowColCount:a1
				});
				
			}else{
				var a1=self.state.allIdWithRowColCount;
				console.log(istopStateValueArr)
				console.log(a1)
				var istopStateValueArrLength=istopStateValueArr.length;
				for(var index1=0; index1<istopStateValueArr.length;index1++){
					for(var index2=0; index2<a1.length;index2++){
						if(a1[index2][3]==istopStateValueArr[index1]){
							if(index1==0){
								a1[index2][4]=a1[index2][4]
								a1[index2][5]=istopStateValueArrLength
							}else{
								a1[index2][4]=0
								a1[index2][5]=0
							}
						}
						
					}
				}
				console.log(a1)
				self.setState({
					allIdWithRowColCount:a1
				});
			}
			
		}
		else if(!istopArrBool && isrightButtonArrBool){
			if(typeProduct1.replace(/0/g,"").length==1){
				var a1=self.state.allIdWithRowColCount;
				console.log(isrightButtonStateValueArr)
				console.log(a1)
				var isrightButtonStateValueArrLength=isrightButtonStateValueArr.length;
				for(var index1=0; index1<isrightButtonStateValueArr.length;index1++){
					for(var index2=0; index2<a1.length;index2++){
						var temp=isrightButtonStateValueArr[index1].split("-");
						if(a1[index2][0]==temp[1]){
							if(index1==0){
								a1[index2][2]=isrightButtonStateValueArrLength
								a1[index2][3]=a1[index2][3]
							}else{
								a1[index2][2]=0
								a1[index2][3]=0
							}
						}
						
					}
				}
				console.log(a1)
				self.setState({
					allIdWithRowColCount:a1
				});
			}
			else if(typeProduct1.replace(/0/g,"").length==2){
				
				var a1=self.state.allIdWithRowColCount;
				console.log(isrightButtonStateValueArr)
				console.log(a1)
				var isrightButtonStateValueArrLength=isrightButtonStateValueArr.length;
				for(var index1=0; index1<isrightButtonStateValueArr.length;index1++){
					for(var index2=0; index2<a1.length;index2++){
						var temp=isrightButtonStateValueArr[index1].split("-");
						if(a1[index2][0]==temp[1] && a1[index2][1]==temp[2]){
							if(index1==0){
								a1[index2][3]=isrightButtonStateValueArrLength
								a1[index2][4]=a1[index2][4]
							}else{
								a1[index2][3]=0
								a1[index2][4]=0
							}
						}
						
					}
				}
				console.log(a1)
				self.setState({
					allIdWithRowColCount:a1
				});
			}else{
				var a1=self.state.allIdWithRowColCount;
				console.log(isrightButtonStateValueArr)
				console.log(a1)
				var isrightButtonStateValueArrLength=isrightButtonStateValueArr.length;
				for(var index1=0; index1<isrightButtonStateValueArr.length;index1++){
					for(var index2=0; index2<a1.length;index2++){
						var temp=isrightButtonStateValueArr[index1].split("-");
						if(a1[index2][0]==temp[1] && a1[index2][1]==temp[2] && a1[index2][2]==temp[3]){
							if(index1==0){
								a1[index2][4]=isrightButtonStateValueArrLength
								a1[index2][5]=a1[index2][5]
							}else{
								a1[index2][4]=0
								a1[index2][5]=0
							}
						}
						
					}
				}
				console.log(a1)
				self.setState({
					allIdWithRowColCount:a1
				});
			}
		}else{
			
		}
		
		// for(var index1 in p1){
		// 	if(index1.indexOf("check-")==0){

		// 		this.setState({
		// 			[index1]:false
		// 		})
		// 	}
		// }
		// self.setState({
		// 	isInConcat:false,
		// })
	}
	
	
	
	//根据数组每一项的true或者false返回第一项是indexArr,第二项是是否连续
	isLianxu(arr1){
		var empty=[];
		for(var index1=0;index1<arr1.length; index1++){
			if(arr1[index1]){
				empty.push(index1)
			}
		}
		if(empty.length<2){
			return [empty,false]
		}
		var isLianxuA=true;
		for(var index2=0;index2<empty.length-1; index2++){
			if(empty[index2+1]-empty[index2]==1){
				isLianxuA=[empty,true];
			}else{
				isLianxuA=[empty,false];
				break
			}
		}
		return isLianxuA
	}
	//计算当前少了哪个没选的
	computeClassLabel(){
		var typeProductArr=this.state.typeProduct.split("");
	
		var firstCheck = typeProductArr[0]=="0";
		var secondCheck=typeProductArr[1]=="0";
		var thirdCheck=typeProductArr[2]=="0";
		if(!firstCheck && secondCheck && thirdCheck){
			return styles.widthout23
		}
		else if(firstCheck && !secondCheck && thirdCheck){
			return styles.widthout13
		}
		else if(firstCheck && secondCheck && !thirdCheck){
			return styles.widthout12
		}
		else if(firstCheck && !secondCheck && !thirdCheck){
			return styles.widthout1
		}
		else if(!firstCheck && secondCheck && !thirdCheck){
			return styles.widthout2
		}
		else if(!firstCheck && !secondCheck && thirdCheck){
			return styles.widthout3
		}
		else{
			return styles.zhanwei
		}
		
	}
	renderdata(){
		console.log(self.state.typeProduct)
		console.log(self.state.data1)
		
		console.log(self.state.QixianData)
		console.log(self.state.AmountData)
		var p1=self.refs;
		console.log(p1)
		//对input的state和check的state进行初始化
		for(var p2 in p1){

			if(p2.indexOf("io-")>-1){
				//console.log(self.refs[p2].props.sb)可以由此获取当前input的显示隐藏
			}
		}
		var spdp=self.state.filterObject;
		var pps=self.state.plainOptions1Value;
		//pps是包括多个扩展参数value的名称
		for(var index=0; index<pps.length; index++){
			//inData是初始数据对应value的数据
			var seiT=spdp[pps[index]];
			//qingweiXiaci是对应表格value的state集合
			
			for(var index1=0; index1<seiT.length; index1++){
				console.log(seiT[index1])
				console.log(self.state[seiT[index1]])
			}
			
		}
	}
	//检查只有一个选择的项的合并
	oneCheckFirst(id1){
		var a1=self.state.compareRowArr;
		var retu="";
		for(var i=0;i<a1.length; i++){
			if(a1[i][0]==id1){
				retu=a1[i][1]
			}
		}
		return retu
	}
	//检查只有两个选择的项的合并
	twoCheckFirst(id1,id2){
		var a1=self.state.compareRowArr;
		var retu="";
		for(var i=0;i<a1.length; i++){
			if(a1[i][0]==id1 && a1[i][1]==id2){
				retu=a1[i][2]
			}
		}
		
		return retu
	}
	//检查只有三个选择的项的合并
	thirdCheckFirst(id1,id2,id3){
		var a1=self.state.compareRowArr;
		var retu="";
		for(var i=0;i<a1.length; i++){
			if(a1[i][0]==id1 && a1[i][1]==id2 && a1[i][2]==id3){
				retu=a1[i][3]
			}
		}
		
		return retu
	}
	twoCheckTdRowCol(id1,id2,val){
		var a1=self.state.allIdWithRowColCount;
		var retu1=0;
		var retu2=0;
		for(var i=0;i<a1.length; i++){
			if(a1[i][0]==id1 && a1[i][1]==id2 && a1[i][2]==val){
				retu1=a1[i][3]
				retu2=a1[i][4]
			}
		}
		
		return [retu1,retu2]
	}
	firstCheckTdRowCol(id1,val){
		var a1=self.state.allIdWithRowColCount;
		var retu1=0;
		var retu2=0;
		for(var i=0;i<a1.length; i++){
			if(a1[i][0]==id1 && a1[i][1]==val){
				retu1=a1[i][2]
				retu2=a1[i][3]
			}
		}
		return [retu1,retu2]
	}
	thirdCheckTdRowCol(id1,id2,id3,val){
		var a1=self.state.allIdWithRowColCount;
		var retu1=0;
		var retu2=0;
		for(var i=0;i<a1.length; i++){
			if(a1[i][0]==id1 && a1[i][1]==id2 && a1[i][2]==id3 && a1[i][3]==val){
				retu1=a1[i][4]
				retu2=a1[i][5]
			}
		}
		
		return [retu1,retu2]
	}

	//检查每个单元格是否在选中状态下
	firstCheckArea(id1,val){
		var a1=self.state.allChooseAreaId;
		var retu1="";
		for(var i=0;i<a1.length; i++){
			if(a1[i][0]==id1 && a1[i][1]==val){
				retu1=styles.tdaREA
			}
		}
		return retu1
	}
	twoCheckArea(id1,id2,val){
		var a1=self.state.allChooseAreaId;
		var retu1="";
		for(var i=0;i<a1.length; i++){
			if(a1[i][0]==id1 && a1[i][1]==id2 && a1[i][2]==val){
				retu1=styles.tdaREA
			}
		}
		return retu1
	}
	
	thirdCheckArea(id1,id2,id3,val){
		var a1=self.state.allChooseAreaId;
		var retu1="";
		for(var i=0;i<a1.length; i++){
			if(a1[i][0]==id1 && a1[i][1]==id2 && a1[i][2]==id3 && a1[i][3]==val){
				retu1=styles.tdaREA
			}
		}
		
		return retu1
	}
	//点击拆分
	divideTable=(e)=>{
		console.log(e.target.attributes.name)
		console.log(e.target.attributes)
		console.log(e.target.attributes.name.value)
		var isInDevide=self.state.isInDevide
		for(var p in e.target.attributes.name){
			//console.log(e.target.attributes.name.value,p)
		}
		if(!isInDevide){
			return
		}
		self.setState({
			isDiveI:e.target.attributes.name.value,
			divideCol:e.target.attributes.colspan.value,
			divideRow:e.target.attributes.rowspan.value,
		
		})
	}
	areaSetStart=(e)=>{
		e.preventDefault();
		
		console.log(e.target.attributes.name.value)
		var a1=e.target.attributes.name.value;
		var a2=e.target.attributes.colspan.value;
		var a3=e.target.attributes.rowspan.value;
		console.log(self.state.isDiveI)
		console.log(self.state.divideCol)
		console.log(self.state.divideRow)
		console.log(a1,a2)
		// return
		var fenzuId=self.state.fenzuId;
		var name1=a1;
		var name2=name1.replace("tdio-","").split("-");
		var typeProduct1=this.state.typeProduct;
		var xIndex=0;
		var yIndex=0;
		var pushARR=[];

		if(typeProduct1.replace(/0/g,"").length==1){
			for(var k1=0;k1<fenzuId.length;k1++){
				for(var k2=0;k2<fenzuId[k1].length;k2++){
					if(fenzuId[k1][k2][0]==name2[0] && fenzuId[k1][k2][1]==name2[1]){
						xIndex=k1;
						yIndex=k2;
					}
				}
			}
			
		}
		else if(typeProduct1.replace(/0/g,"").length==2){
			for(var k1=0;k1<fenzuId.length;k1++){
				for(var k2=0;k2<fenzuId[k1].length;k2++){
					if(fenzuId[k1][k2][0]==name2[0] && fenzuId[k1][k2][1]==name2[1] && fenzuId[k1][k2][2]==name2[2]){
						xIndex=k1;
						yIndex=k2;
					}
				}
			}
			console.log(xIndex,yIndex)
		}
		else{
			for(var k1=0;k1<fenzuId.length;k1++){
				for(var k2=0;k2<fenzuId[k1].length;k2++){
					if(fenzuId[k1][k2][0]==name2[0] && fenzuId[k1][k2][1]==name2[1] && fenzuId[k1][k2][2]==name2[2] && fenzuId[k1][k2][3]==name2[3]){
						xIndex=k1;
						yIndex=k2;
					}
				}
			}
		}
		self.setState({
			areaXStartIndex:xIndex,
			areaYStartIndex:yIndex
		})
	}
	areaSetEnd=(e)=>{
		
		console.log(e.target.attributes.name.value)
		var a1=e.target.attributes.name.value;
		var a2=e.target.attributes.colspan.value;
		var a3=e.target.attributes.rowspan.value;

		console.log(a1,a2)
		// return
		var fenzuId=self.state.fenzuId;
		var name1=a1;
		var name2=name1.replace("tdio-","").split("-");
		var name3=name1.replace("tdio-","io-");
		var typeProduct1=this.state.typeProduct;

		var xEndIndex=0;
		var yEndIndex=0;
		var pushARR=[];
		var xStartIndex=self.state.areaXStartIndex;
		var yStartIndex=self.state.areaYStartIndex;

		if(typeProduct1.replace(/0/g,"").length==1){
			for(var k1=0;k1<fenzuId.length;k1++){
				for(var k2=0;k2<fenzuId[k1].length;k2++){
					if(fenzuId[k1][k2][0]==name2[0] && fenzuId[k1][k2][1]==name2[1]){
						xEndIndex=k1;
						yEndIndex=k2;
					}
				}
			}
			if (xStartIndex < xEndIndex) {
                var MinX = xStartIndex;var MaxX = xEndIndex;
            }else {
                var MinX = xEndIndex; var MaxX = xStartIndex;
            };
            if (yStartIndex < yEndIndex) {
                var MinY = yStartIndex; var MaxY = yEndIndex;
            } else {
				var MinY = yEndIndex; var MaxY = yStartIndex;
			}
               
			for(var k1=MinX;k1<=MaxX;k1++){
				for(var k2=MinY;k2<=MaxY;k2++){
					var ong=[];
					var arr1=fenzuId[k1][k2];
					var arr2=arr1[0]+"-"+arr1[1]
					ong=[arr1[0],arr1[1]]
					pushARR.push(ong)
				}
			}
			
		}
		else if(typeProduct1.replace(/0/g,"").length==2){
			
			for(var k1=0;k1<fenzuId.length;k1++){
				for(var k2=0;k2<fenzuId[k1].length;k2++){
					if(fenzuId[k1][k2][0]==name2[0] && fenzuId[k1][k2][1]==name2[1] && fenzuId[k1][k2][2]==name2[2]){
						xEndIndex=k1;
						yEndIndex=k2;
					}
				}
			}
			if (xStartIndex < xEndIndex) {
                var MinX = xStartIndex;var MaxX = xEndIndex;
            }else {
                var MinX = xEndIndex; var MaxX = xStartIndex;
            };
            if (yStartIndex < yEndIndex) {
                var MinY = yStartIndex; var MaxY = yEndIndex;
            } else {
				var MinY = yEndIndex; var MaxY = yStartIndex;
			}
			for(var k1=MinX;k1<=MaxX;k1++){
				for(var k2=MinY;k2<=MaxY;k2++){
					var ong=[];
					var arr1=fenzuId[k1][k2];
					var arr2=arr1[0]+"-"+arr1[1]+"-"+arr1[2]
					ong=[arr1[0],arr1[1],arr1[2]]
					pushARR.push(ong)
				}
			}
			
		}
		else{
			for(var k1=0;k1<fenzuId.length;k1++){
				for(var k2=0;k2<fenzuId[k1].length;k2++){
					if(fenzuId[k1][k2][0]==name2[0] && fenzuId[k1][k2][1]==name2[1] && fenzuId[k1][k2][2]==name2[2] && fenzuId[k1][k2][3]==name2[3]){
						xEndIndex=k1;
						yEndIndex=k2;
					}
				}
			}
			console.log("xEndIndex",xEndIndex,yEndIndex)
			if (xStartIndex < xEndIndex) {
                var MinX = xStartIndex;var MaxX = xEndIndex;
            }else {
                var MinX = xEndIndex; var MaxX = xStartIndex;
            };
            if (yStartIndex < yEndIndex) {
                var MinY = yStartIndex; var MaxY = yEndIndex;
            } else {
				var MinY = yEndIndex; var MaxY = yStartIndex;
			}
			for(var k1=MinX;k1<=MaxX;k1++){
				for(var k2=MinY;k2<=MaxY;k2++){
					var ong=[];
					var arr1=fenzuId[k1][k2];
					var arr2=arr1[0]+"-"+arr1[1]+"-"+arr1[2]+"-"+arr1[3]
					ong=[arr1[0],arr1[1],arr1[2],arr1[3]]
					pushARR.push(ong)
				}
			}

		}
		self.setState({
			areaXEndIndex:xEndIndex,
			areaYEndIndex:yEndIndex
		},()=>{
			console.log(self.state.areaXEndIndex)
			console.log(self.state.areaYEndIndex)
		})
		
		console.log(xEndIndex,yEndIndex,xStartIndex,yStartIndex)
		var riee=[];
		for(var k1=0; k1<self.state.allChooseAreaId.length;k1++){
			riee.push(self.state.allChooseAreaId[k1])
		}
		self.setState({
			allChooseAreaId:pushARR,
			xLength:MaxX-MinX+1,
			yLength:MaxY-MinY+1,
			allChooseAreaIdFormer:riee,
			xLengthFormer:self.state.xLength,
			yLengthFormer:self.state.yLength,
		},()=>{
			console.log(self.state.allChooseAreaId)
		})
		
	}
	saveInConcat1=(e)=>{
		self.setState({
			isInConcat:false,
			hideInputForChoose:true,
			showMenu:false,
		})
		var allChooseAreaId=self.state.allChooseAreaId;
		console.log(allChooseAreaId)
		var xLength=self.state.xLength;
		var yLength=self.state.yLength;
		var typeProduct1=this.state.typeProduct;
		if(typeProduct1.replace(/0/g,"").length==1){
			var a1=self.state.allIdWithRowColCount;
			for(var index1=0; index1<allChooseAreaId.length;index1++){
				for(var index2=0; index2<a1.length;index2++){
					if(a1[index2][0]==allChooseAreaId[index1][0] && a1[index2][1]==allChooseAreaId[index1][1]){
						if(index1==0){
							a1[index2][2]=xLength
							a1[index2][3]=yLength
						}else{
							a1[index2][2]=0
							a1[index2][3]=0
						}
					}
				}
				
			}
			self.setState({
				allIdWithRowColCount:a1
			});
		}
		else if(typeProduct1.replace(/0/g,"").length==2){
			
			var a1=self.state.allIdWithRowColCount;
			for(var index1=0; index1<allChooseAreaId.length;index1++){
				for(var index2=0; index2<a1.length;index2++){
					if(a1[index2][0]==allChooseAreaId[index1][0] && a1[index2][1]==allChooseAreaId[index1][1] && a1[index2][2]==allChooseAreaId[index1][2]){
						if(index1==0){
							a1[index2][3]=xLength
							a1[index2][4]=yLength
						}else{
							a1[index2][3]=0
							a1[index2][4]=0
						}
					}
				}
				
			}
			self.setState({
				allIdWithRowColCount:a1
			});
			
		}else{

			var a1=self.state.allIdWithRowColCount;
			for(var index1=0; index1<allChooseAreaId.length;index1++){
				for(var index2=0; index2<a1.length;index2++){
					if(a1[index2][0]==allChooseAreaId[index1][0] && a1[index2][1]==allChooseAreaId[index1][1] && a1[index2][2]==allChooseAreaId[index1][2] && a1[index2][3]==allChooseAreaId[index1][3]){
						if(index1==0){
							a1[index2][4]=xLength
							a1[index2][5]=yLength
						}else{
							a1[index2][4]=0
							a1[index2][5]=0
						}
					}
				}
				
			}
			self.setState({
				allIdWithRowColCount:a1
			});
		}
		
	}
	//保存拆分
	saveInDevide=(e)=>{
		self.setState({
			isInDevide:false,
			isDiveI:"",
			hideInputForChoose:true,
			showMenu:false
		})
		var a1=self.state.isDiveI;
		var a2=self.state.divideCol;
		var a3=self.state.divideRow;
		console.log(self.state.isDiveI)
		console.log(self.state.divideCol)
		console.log(self.state.divideRow)
		console.log(a1,a2,a3)
		// return
		var fenzuId=self.state.fenzuId;
		var name1=a1;
		var name2=name1.replace("tdio-","").split("-");
		var name3=name1.replace("tdio-","io-");
		console.log(name2)
		var typeProduct1=this.state.typeProduct;
		var p1=self.refs[name1];
		console.log(self.refs)
		console.log(p1)
		console.log(p1)
		var row=parseInt(a3)
		var col=parseInt(a2)
		var xIndex=0;
		var yIndex=0;
		var pushARR=[];

		if(typeProduct1.replace(/0/g,"").length==1){
			for(var k1=0;k1<fenzuId.length;k1++){
				for(var k2=0;k2<fenzuId[k1].length;k2++){
					if(fenzuId[k1][k2][0]==name2[0] && fenzuId[k1][k2][1]==name2[1]){
						xIndex=k1;
						yIndex=k2;
					}
				}
			}
			console.log(xIndex,yIndex)
			for(var xIndex1=xIndex;xIndex1<xIndex+row;xIndex1++){
				for(var yIndex1=yIndex;yIndex1<yIndex+col;yIndex1++){
					var arr1=fenzuId[xIndex1][yIndex1];
					console.log(xIndex1,yIndex1)
					var arr2="io-"+arr1[0]+"-"+arr1[1]
					pushARR.push(arr2)
				}
			}
			
			//console.log(pushARR)
		}
		else if(typeProduct1.replace(/0/g,"").length==2){
			for(var k1=0;k1<fenzuId.length;k1++){
				for(var k2=0;k2<fenzuId[k1].length;k2++){
					if(fenzuId[k1][k2][0]==name2[0] && fenzuId[k1][k2][1]==name2[1] && fenzuId[k1][k2][2]==name2[2]){
						xIndex=k1;
						yIndex=k2;
					}
				}
			}
			console.log(xIndex,yIndex)
			for(var xIndex1=xIndex;xIndex1<xIndex+row;xIndex1++){
				for(var yIndex1=yIndex;yIndex1<yIndex+col;yIndex1++){
					var arr1=fenzuId[xIndex1][yIndex1];
					var arr2="io-"+arr1[0]+"-"+arr1[1]+"-"+arr1[2]
					pushARR.push(arr2)
				}
			}
			console.log(pushARR)
			
		}
		else{
			for(var k1=0;k1<fenzuId.length;k1++){
				for(var k2=0;k2<fenzuId[k1].length;k2++){
					if(fenzuId[k1][k2][0]==name2[0] && fenzuId[k1][k2][1]==name2[1] && fenzuId[k1][k2][2]==name2[2] && fenzuId[k1][k2][3]==name2[3]){
						xIndex=k1;
						yIndex=k2;
					}
				}
			}
			console.log(xIndex,yIndex)
			for(var xIndex1=xIndex;xIndex1<xIndex+row;xIndex1++){
				for(var yIndex1=yIndex;yIndex1<yIndex+col;yIndex1++){
					var arr1=fenzuId[xIndex1][yIndex1];
					var arr2="io-"+arr1[0]+"-"+arr1[1]+"-"+arr1[2]+"-"+arr1[3]
					pushARR.push(arr2)
				}
			}
			console.log(pushARR)
			
		}
		for(var k3=0;k3<pushARR.length;k3++){
			this.updateState(pushARR[k3],self.state[name3])
		}
		if(typeProduct1.replace(/0/g,"").length==1){
			var a1=self.state.allIdWithRowColCount;
			for(var index1=0; index1<pushARR.length;index1++){
				var temp=pushARR[index1].split("-");
				for(var index3=0; index3<a1.length;index3++){
					if(a1[index3][0]==temp[1] && a1[index3][1]==temp[2]){
						console.log(a1[index3])
						if(index1==0){
							a1[index3][2]=1
							a1[index3][3]=1
						}else{
							a1[index3][2]=1
							a1[index3][3]=1
						}
					}
					
				}
				
			}
			self.setState({
				allIdWithRowColCount:a1
			});
		}
		else if(typeProduct1.replace(/0/g,"").length==2){
			
			var a1=self.state.allIdWithRowColCount;
			for(var index1=0; index1<pushARR.length;index1++){
				var temp=pushARR[index1].split("-");
				for(var index3=0; index3<a1.length;index3++){
					if(a1[index3][0]==temp[1] && a1[index3][1]==temp[2] && a1[index3][2]==temp[3]){
						console.log(a1[index3])
						if(index1==0){
							a1[index3][3]=1
							a1[index3][4]=1
						}else{
							a1[index3][3]=1
							a1[index3][4]=1
						}
					}
					
				}
				
			}
			self.setState({
				allIdWithRowColCount:a1
			});
			
		}else{
			var a1=self.state.allIdWithRowColCount;
			for(var index1=0; index1<pushARR.length;index1++){
				var temp=pushARR[index1].split("-");
				for(var index3=0; index3<a1.length;index3++){
					if(a1[index3][0]==temp[1] && a1[index3][1]==temp[2] && a1[index3][2]==temp[3] && a1[index3][3]==temp[4]){
						console.log(a1[index3])
						if(index1==0){
							a1[index3][4]=1
							a1[index3][5]=1
						}else{
							a1[index3][4]=1
							a1[index3][5]=1
						}
					}
					
				}
				
			}
			self.setState({
				allIdWithRowColCount:a1
			});
		}
	}

	inDevide=(e)=>{
		self.setState({
			isInDevide:true,
			hideInputForChoose:false,
			isDiveI:"",
			isInConcat:false,
		})
	}
	cancelInDevide=(e)=>{
		
		self.setState({
			isInDevide:false,
			isDiveI:"",
			hideInputForChoose:true,
			showMenu:false,
		})
	}

	showRight=(e)=>{
		e.preventDefault();
		e.stopPropagation();
		var allChooseAreaId=self.state.allChooseAreaIdFormer;
		var xLengthFormer=self.state.xLengthFormer;
		var yLengthFormer=self.state.yLengthFormer;
		//右键会触发mouseup事件清空选择区域，因此这样做可以正确的选择区域
		self.setState({
			allChooseAreaId:allChooseAreaId,
			xLength:xLengthFormer,
			yLength:yLengthFormer
		})
		console.log(e.target.attributes.name)
		console.log(e.target.attributes)
		console.log(e.target.attributes.name.value)
		var isInDevide=self.state.isInDevide
		for(var p in e.target.attributes.name){
			//console.log(e.target.attributes.name.value,p)
		}
		
		self.setState({
			isDiveI:e.target.attributes.name.value,
			divideCol:e.target.attributes.colspan.value,
			divideRow:e.target.attributes.rowspan.value,
		})
		self.setState({
			showMenu:true
		})
		console.log(e.clientX,e.clientY)
		console.log(e.screenX,e.screenY)
		//获取我们自定义的右键菜单
		var menu=document.querySelector("#menu");

		//根据事件对象中鼠标点击的位置，进行定位
		menu.style.left=e.clientX+'px';
		menu.style.top=e.clientY+'px';

		//改变自定义菜单的宽，让它显示出来
		menu.style.width='125px';
	}
	render() {
return (
	<Spin spinning={false}>


	<Breadcrumb separator=">">
	<Breadcrumb.Item>客户管理</Breadcrumb.Item>
	<Breadcrumb.Item>客户列表</Breadcrumb.Item>
	</Breadcrumb>
	<div className={publicstyle.clearfloat}></div>
	<Button type="primary" onClick={this.renderdata.bind(this)}
	>输出当前data</Button>
	<Steps current={self.state.currentStep}>
		<Step title="定义表格类型" description="" />
		<Step title="选择报价参数" description="（横向的行)" />
		<Step title="选择扩展参数" description="（纵向的列）" />
		<Step title="设定基础价格" description="" />
		<Step title="填写备注信息" description="" />
		<Step title="选择规则说明" description="" />
	</Steps>
		
		
		<Button type="primary" onClick={this.editTable.bind(this)} style={{margin:"10px 0 10px 0",display:this.state.disabled?"inline-block":"none"}}>编辑</Button>
		<Button type="primary" onClick={this.saveTABLE.bind(this)} style={{margin:"10px 20px 10px 0",display:this.state.disabled?"none":"inline-block"}}>保存</Button>
		<Button type="primary" onClick={this.cancelTABLE.bind(this)} style={{margin:"10px 0 10px 0",display:this.state.disabled?"none":"inline-block"}}>取消</Button>
		<Button type="primary" onClick={this.inConcat.bind(this)} style={{margin:"10px 0 10px 20px",display:this.state.isInConcat?"none":"inline-block"}}>选择合并的列</Button>
		<Button type="primary" onClick={this.saveInConcat.bind(this)} style={{margin:"10px 20px 10px 20px",display:this.state.isInConcat?"inline-block":"none"}}>保存</Button>
		<Button type="primary" onClick={this.cancelInConcat.bind(this)} style={{margin:"10px 0 10px 0",display:this.state.isInConcat?"inline-block":"none"}}>取消</Button>
		<Button type="primary" onClick={this.inDevide.bind(this)} style={{margin:"10px 0 10px 20px",display:this.state.isInDevide?"none":"inline-block"}}>选择拆分的列</Button>
		<Button type="primary" onClick={this.saveInDevide.bind(this)} style={{margin:"10px 20px 10px 20px",display:this.state.isInDevide?"inline-block":"none"}}>保存</Button>
		<Button type="primary" onClick={this.cancelInDevide.bind(this)} style={{margin:"10px 0 10px 0",display:this.state.isInDevide?"inline-block":"none"}}>取消</Button>
		
	<div className={styles.boxcontent}>
		
		
		<div className={styles.flexRow+" "+styles.rightBorder}>
			<table id="class2" className={styles.positionAb+" "+
			this.computeClassLabel()}>
			<tbody>
				<tr className={this.computeClassLabel()}>
					<th className={styles.littlepadding} colSpan={this.state.plainOptions1LENGTH} style={{textAlign:"center"}}>
						<span>诚承宝 电子银票报价表</span>
					</th>
				</tr>
				<tr className={this.computeClassLabel()}>
					<th className={styles.littlepadding} colSpan={this.state.plainOptions1LENGTH1} style={{textAlign:"center"}}>
						<span>最近报价时间：表单创建并填写完毕后，由系统自动生成最近报价时间</span>
					</th>
					<th className={styles.littlepadding} colSpan={this.state.plainOptions1LENGTH2} style={{textAlign:"center"}}>
						<span>最低利率</span>
					</th>
				</tr>
				<tr className={this.computeClassLabel()+" "+styles.top1}>
					<td colSpan="1" className={styles.td25+" "+styles.tdborder1+" "+styles.littlepadding} style={{display:this.state.firstRadioValues==""?"none":"table-cell"}}>
						<span>{this.state.firstTypeText}</span>
					</td>
					<td colSpan="1" className={styles.td25+" "+styles.tdborder2+" "+styles.littlepadding} style={{display:this.state.secondRadioValues==""?"none":"table-cell"}}>
						<span>{this.state.secondTypeText}</span>
					</td>
					<td colSpan="1" className={styles.td25+" "+styles.tdborder3+" "+styles.littlepadding} style={{display:this.state.thirdRadioValues==""?"none":"table-cell"}}>
						<span>{this.state.thirdTypeText}</span>
					</td>
					{this.state.plainOptions1.map((item4,index)=>{
						return (
					<td colSpan="1" rowSpan="1" className={styles.littlepadding}>
						<Checkbox checked={this.state["check-w"+item4.value]} onChange={this.onSelectChange.bind(this,item4)} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox>{item4.label}
					</td>)
					
					})}
					<td className={styles.push1td} style={{width:40}}>
						<span>操作</span>
					</td>
				</tr>
{/* 三个都有类别显示 白莲花 */}
{this.state.typeProduct.replace(/0/g,"").length==3 && this.state.disabled?
    this.state.data1.map((item,index)=>{
        return this.state.QixianData.map((item1,index1)=>{
            if(item1.parId==item.id){
                return this.state.AmountData.map((item2,index2)=>{
                if(item2.parId==item1.id){
						var conc1=this.thirdCheckFirst(item.id,item1.id,item2.id);
						//console.log(conc1,item.id,item1.id,item2.id)
                        //console.log(this.state.fiColSpan[index])
                if(conc1=="fi1"){
					return  <tr className={styles.fi1}>	
							<td colSpan="1" rowSpan={this.state.fiColSpan[index]}  className={styles.td10+" "+styles.tdborder+" "+styles.littlepadding}>
								<span>{item.value}</span>
							</td>
							<td colSpan="1" rowSpan={this.state.seColSpan[index1]} className={styles.td20+" "+styles.tdborder+" "+styles.littlepadding}>
							<span>
							{item1.value}</span>
							</td>
							<td className={styles.td20+" "+styles.tdborder+" "+styles.littlepadding}>
							<span>
							{item2.value}</span>
							</td>
							{this.state.tdTypedata.map((item3,index)=>{
								var conc2=this.thirdCheckTdRowCol(item.id,item1.id,item2.id,item3.value);
								var conc21=conc2[0];
								var conc22=conc2[1];
								var displayTd=true
								if(conc21==0 || conc22==0){
									var displayTd=false
								}
								var check11=this.thirdCheckArea(item.id,item1.id,item2.id,item3.value);
								//先要恢复拆分 onClick={this.divideTable.bind(this)}加载td
							return (
								<td onMouseDown={this.areaSetStart.bind(this)} ref={"tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} onMouseUp={this.areaSetEnd.bind(this)}
								onContextMenu={this.showRight.bind(this)} colSpan={conc22} rowSpan={conc21} name={"tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} style={{display:displayTd?"table-cell":"none"}} className={this.state.isDiveI==("tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value)?(styles.littlepadding+" "+styles.isDiveI+" "+check11):styles.littlepadding+" "+check11}>

								{this.state.hideInputForChoose?this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]:<Input type="number" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]} id={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} sb={displayTd} col={conc22} row={conc21} ref={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value}
								style={{display:this.state.hideInputForChoose?"none":"block"}}
								onChange={this.inputChange1.bind(this)} step="0.01"/>}
								
							
								</td>) 
									})}
							<td className={styles.push1td} style={{width:40}}>
							<Checkbox checked={this.state["check-"+item.id+"-"+item1.id+"-"+item2.id]} onChange={this.onSelectChange1.bind(this)} ref={"check-"+item.id+"-"+item1.id+"-"+item2.id} name={"check-"+item.id+"-"+item1.id+"-"+item2.id} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox>
							</td>
							
						</tr>
				}else if(conc1=="se1"){
						return <tr>	
							<td colSpan="1" rowSpan={this.state.seColSpan[index1]} className={styles.td20+" "+styles.tdborder+" "+styles.littlepadding}>
							<span>
							{item1.value}</span>
							</td>
							<td className={styles.td20+" "+styles.tdborder+" "+styles.littlepadding}>
							<span>
							{item2.value}</span>
							</td>
							{this.state.tdTypedata.map((item3,index)=>{
								var conc2=this.thirdCheckTdRowCol(item.id,item1.id,item2.id,item3.value);
								var conc21=conc2[0];
								var conc22=conc2[1];
								var displayTd=true
								if(conc21==0 || conc22==0){
									var displayTd=false
								}
								var check11=this.thirdCheckArea(item.id,item1.id,item2.id,item3.value);
								return  (
									<td onMouseDown={this.areaSetStart.bind(this)} ref={"tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} onMouseUp={this.areaSetEnd.bind(this)}
									onContextMenu={this.showRight.bind(this)} colSpan={conc22} rowSpan={conc21} name={"tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} style={{display:displayTd?"table-cell":"none"}} className={this.state.isDiveI==("tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value)?(styles.littlepadding+" "+styles.isDiveI+" "+check11):styles.littlepadding+" "+check11}>
									{this.state.hideInputForChoose?this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]:<Input type="number" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]} id={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} sb={displayTd} col={conc22} row={conc21} ref={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value}
								style={{display:this.state.hideInputForChoose?"none":"block"}}
								onChange={this.inputChange1.bind(this)} step="0.01"/>}
									</td>)    
									})}
							<td className={styles.push1td} style={{width:40}}>
							<Checkbox checked={this.state["check-"+item.id+"-"+item1.id+"-"+item2.id]} onChange={this.onSelectChange1.bind(this)} ref={"check-"+item.id+"-"+item1.id+"-"+item2.id} name={"check-"+item.id+"-"+item1.id+"-"+item2.id} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox>
							</td>
						</tr>
				}
				else{
						return <tr>	
							<td className={styles.td20+" "+styles.tdborder+" "+styles.littlepadding}>
							<span>
							{item2.value}</span>
							</td>
							{this.state.tdTypedata.map((item3,index)=>{
								var conc2=this.thirdCheckTdRowCol(item.id,item1.id,item2.id,item3.value);
								var conc21=conc2[0];
								var conc22=conc2[1];
								var displayTd=true
								if(conc21==0 || conc22==0){
									var displayTd=false
								}
								var check11=this.thirdCheckArea(item.id,item1.id,item2.id,item3.value);
								return  (
									<td onMouseDown={this.areaSetStart.bind(this)} ref={"tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} onMouseUp={this.areaSetEnd.bind(this)}
									onContextMenu={this.showRight.bind(this)} colSpan={conc22} rowSpan={conc21} name={"tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} style={{display:displayTd?"table-cell":"none"}} className={this.state.isDiveI==("tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value)?(styles.littlepadding+" "+styles.isDiveI+" "+check11):styles.littlepadding+" "+check11}>
									{this.state.hideInputForChoose?this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]:<Input type="number" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]} id={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} sb={displayTd} col={conc22} row={conc21} ref={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value}
								style={{display:this.state.hideInputForChoose?"none":"block"}}
								onChange={this.inputChange1.bind(this)} step="0.01"/>}
									</td>)    
									})}
							<td className={styles.push1td} style={{width:40}}>
							<Checkbox checked={this.state["check-"+item.id+"-"+item1.id+"-"+item2.id]} onChange={this.onSelectChange1.bind(this)} ref={"check-"+item.id+"-"+item1.id+"-"+item2.id} name={"check-"+item.id+"-"+item1.id+"-"+item2.id} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox>
							</td>
						</tr>
				}

                }
             	})
            }
        })
            
    })
:""
}
{/* 三个都有类别显示 白莲花编辑状态 */}
{this.state.typeProduct.replace(/0/g,"").length==3 && !this.state.disabled?
    this.state.data1.map((item,index)=>{
        return this.state.QixianData.map((item1,index1)=>{
            if(item1.parId==item.id){
                return this.state.AmountData.map((item2,index2)=>{
                if(item2.parId==item1.id){
						var conc1=this.thirdCheckFirst(item.id,item1.id,item2.id);
						//console.log(conc1,item.id,item1.id,item2.id)
                        //console.log(this.state.fiColSpan[index])
                if(conc1=="fi1"){
					return  <tr className={styles.fi1}>	
							<td colSpan="1" rowSpan={this.state.fiColSpan[index]}  className={styles.td10+" "+styles.tdborder+" "+styles.littlepadding}>
								<span>{item.value}</span>
							</td>
							<td colSpan="1" rowSpan={this.state.seColSpan[index1]} className={styles.td20+" "+styles.tdborder+" "+styles.littlepadding}>
							<span>
							{item1.value}</span>
							</td>
							<td className={styles.td20+" "+styles.tdborder+" "+styles.littlepadding}>
							<span>
							{item2.value}</span>
							</td>
							{this.state.tdTypedata.map((item3,index)=>{
								var conc2=this.thirdCheckTdRowCol(item.id,item1.id,item2.id,item3.value);
								var conc21=conc2[0];
								var conc22=conc2[1];
								var displayTd=true
								if(conc21==0 || conc22==0){
									var displayTd=false
								}
								var check11=this.thirdCheckArea(item.id,item1.id,item2.id,item3.value);
								//先要恢复拆分 onClick={this.divideTable.bind(this)}加载td
							return (
								<td ref={"tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value}
								onContextMenu={this.showRight.bind(this)} colSpan={conc22} rowSpan={conc21} name={"tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} style={{display:displayTd?"table-cell":"none"}} className={this.state.isDiveI==("tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value)?(styles.littlepadding+" "+styles.isDiveI+" "+check11):styles.littlepadding+" "+check11}>

								{this.state.hideInputForChoose?this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]:<Input type="number" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]} id={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} sb={displayTd} col={conc22} row={conc21} ref={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value}
								style={{display:this.state.hideInputForChoose?"none":"block"}}
								onChange={this.inputChange1.bind(this)} step="0.01"/>}
								
							
								</td>) 
									})}
							<td className={styles.push1td} style={{width:40}}>
							<Checkbox checked={this.state["check-"+item.id+"-"+item1.id+"-"+item2.id]} onChange={this.onSelectChange1.bind(this)} ref={"check-"+item.id+"-"+item1.id+"-"+item2.id} name={"check-"+item.id+"-"+item1.id+"-"+item2.id} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox>
							</td>
							
						</tr>
				}else if(conc1=="se1"){
						return <tr>	
							<td colSpan="1" rowSpan={this.state.seColSpan[index1]} className={styles.td20+" "+styles.tdborder+" "+styles.littlepadding}>
							<span>
							{item1.value}</span>
							</td>
							<td className={styles.td20+" "+styles.tdborder+" "+styles.littlepadding}>
							<span>
							{item2.value}</span>
							</td>
							{this.state.tdTypedata.map((item3,index)=>{
								var conc2=this.thirdCheckTdRowCol(item.id,item1.id,item2.id,item3.value);
								var conc21=conc2[0];
								var conc22=conc2[1];
								var displayTd=true
								if(conc21==0 || conc22==0){
									var displayTd=false
								}
								var check11=this.thirdCheckArea(item.id,item1.id,item2.id,item3.value);
								return  (
									<td ref={"tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value}
									onContextMenu={this.showRight.bind(this)} colSpan={conc22} rowSpan={conc21} name={"tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} style={{display:displayTd?"table-cell":"none"}} className={this.state.isDiveI==("tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value)?(styles.littlepadding+" "+styles.isDiveI+" "+check11):styles.littlepadding+" "+check11}>
									{this.state.hideInputForChoose?this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]:<Input type="number" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]} id={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} sb={displayTd} col={conc22} row={conc21} ref={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value}
								style={{display:this.state.hideInputForChoose?"none":"block"}}
								onChange={this.inputChange1.bind(this)} step="0.01"/>}
									</td>)    
									})}
							<td className={styles.push1td} style={{width:40}}>
							<Checkbox checked={this.state["check-"+item.id+"-"+item1.id+"-"+item2.id]} onChange={this.onSelectChange1.bind(this)} ref={"check-"+item.id+"-"+item1.id+"-"+item2.id} name={"check-"+item.id+"-"+item1.id+"-"+item2.id} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox>
							</td>
						</tr>
				}
				else{
						return <tr>	
							<td className={styles.td20+" "+styles.tdborder+" "+styles.littlepadding}>
							<span>
							{item2.value}</span>
							</td>
							{this.state.tdTypedata.map((item3,index)=>{
								var conc2=this.thirdCheckTdRowCol(item.id,item1.id,item2.id,item3.value);
								var conc21=conc2[0];
								var conc22=conc2[1];
								var displayTd=true
								if(conc21==0 || conc22==0){
									var displayTd=false
								}
								var check11=this.thirdCheckArea(item.id,item1.id,item2.id,item3.value);
								return  (
									<td ref={"tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value}
									onContextMenu={this.showRight.bind(this)} colSpan={conc22} rowSpan={conc21} name={"tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} style={{display:displayTd?"table-cell":"none"}} className={this.state.isDiveI==("tdio-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value)?(styles.littlepadding+" "+styles.isDiveI+" "+check11):styles.littlepadding+" "+check11}>
									{this.state.hideInputForChoose?this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]:<Input type="number" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]} id={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} sb={displayTd} col={conc22} row={conc21} ref={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value}
								style={{display:this.state.hideInputForChoose?"none":"block"}}
								onChange={this.inputChange1.bind(this)} step="0.01"/>}
									</td>)    
									})}
							<td className={styles.push1td} style={{width:40}}>
							<Checkbox checked={this.state["check-"+item.id+"-"+item1.id+"-"+item2.id]} onChange={this.onSelectChange1.bind(this)} ref={"check-"+item.id+"-"+item1.id+"-"+item2.id} name={"check-"+item.id+"-"+item1.id+"-"+item2.id} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox>
							</td>
						</tr>
				}

                }
             	})
            }
        })
            
    })
:""
}
{/* 只有两个类别显示 苏妲己 */}
{this.state.typeProduct.replace(/0/g,"").length==2 && this.state.disabled?	
	this.state.data1.map((item,index)=>{	
		return this.state.QixianData.map((item1,index1)=>{
			if(item1.parId==item.id){
				var conc1=this.twoCheckFirst(item.id,item1.id);
				//console.log(this.state.fiColSpan[index])
		if(conc1=="fi1"){
		return  <tr className={styles.fi1}>	
				<td colSpan="1" rowSpan={this.state.fiColSpan[index]}  className={styles.td25+" "+styles.tdborder+" "+styles.littlepadding}>
					<span>{item.value}</span>
				</td>
				<td className={styles.td25+" "+styles.tdborder+" "+styles.littlepadding}>
				<span>
				{item1.value}</span>
				</td>
				{this.state.tdTypedata.map((item2,index)=>{
					var conc2=this.twoCheckTdRowCol(item.id,item1.id,item2.value);
					var conc21=conc2[0];
					var conc22=conc2[1];
					var displayTd=true
					if(conc21==0 || conc22==0){
						var displayTd=false
					}
					var check11=this.twoCheckArea(item.id,item1.id,item2.value);
				return (
					<td onMouseDown={this.areaSetStart.bind(this)} ref={"tdio-"+item.id+"-"+item1.id+"-"+item2.value} onMouseUp={this.areaSetEnd.bind(this)}
					onContextMenu={this.showRight.bind(this)} colSpan={conc22} rowSpan={conc21} name={"tdio-"+item.id+"-"+item1.id+"-"+item2.value} onClick={this.divideTable.bind(this)} style={{display:displayTd?"table-cell":"none"}} className={this.state.isDiveI==("tdio-"+item.id+"-"+item1.id+"-"+item2.value)?(styles.littlepadding+" "+styles.isDiveI+" "+check11):styles.littlepadding+" "+check11}>
					{this.state.hideInputForChoose?this.state["io-"+item.id+"-"+item1.id+"-"+item2.value]:<Input type="number" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.value]} id={"io-"+item.id+"-"+item1.id+"-"+item2.value} sb={displayTd} col={conc22} row={conc21} ref={"io-"+item.id+"-"+item1.id+"-"+item2.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.value}
					style={{display:this.state.hideInputForChoose?"none":"block"}}
					onChange={this.inputChange1.bind(this)} step="0.01"/>}
					
					</td>)
							
						})}
				<td className={styles.push1td} style={{width:40}}>
				<Checkbox checked={this.state["check-"+item.id+"-"+item1.id]} onChange={this.onSelectChange1.bind(this)} ref={"check-"+item.id+"-"+item1.id} name={"check-"+item.id+"-"+item1.id} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox>
				</td>
				
			</tr>
		}else{
			return <tr>	
				<td className={styles.td25+" "+styles.tdborder+" "+styles.littlepadding}>
				<span>
				{item1.value}</span>
				</td>
				{this.state.tdTypedata.map((item2,index)=>{
					var conc2=this.twoCheckTdRowCol(item.id,item1.id,item2.value);
					var conc21=conc2[0];
					var conc22=conc2[1];
					var displayTd=true
					if(conc21==0 || conc22==0){
						var displayTd=false
					}
					var check11=this.twoCheckArea(item.id,item1.id,item2.value);
					return (
				<td onMouseDown={this.areaSetStart.bind(this)} ref={"tdio-"+item.id+"-"+item1.id+"-"+item2.value} onMouseUp={this.areaSetEnd.bind(this)}
				onContextMenu={this.showRight.bind(this)} colSpan={conc22} rowSpan={conc21} name={"tdio-"+item.id+"-"+item1.id+"-"+item2.value} onClick={this.divideTable.bind(this)} style={{display:displayTd?"table-cell":"none"}} className={this.state.isDiveI==("tdio-"+item.id+"-"+item1.id+"-"+item2.value)?(styles.littlepadding+" "+styles.isDiveI+" "+check11):styles.littlepadding+" "+check11}>
				{this.state.hideInputForChoose?this.state["io-"+item.id+"-"+item1.id+"-"+item2.value]:<Input type="number" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.value]} id={"io-"+item.id+"-"+item1.id+"-"+item2.value} sb={displayTd} col={conc22} row={conc21} ref={"io-"+item.id+"-"+item1.id+"-"+item2.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.value}
					style={{display:this.state.hideInputForChoose?"none":"block"}}
					onChange={this.inputChange1.bind(this)} step="0.01"/>}
				</td>)
							
						})}
				<td className={styles.push1td} style={{width:40}}>
				<Checkbox checked={this.state["check-"+item.id+"-"+item1.id]} onChange={this.onSelectChange1.bind(this)} ref={"check-"+item.id+"-"+item1.id} name={"check-"+item.id+"-"+item1.id} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox>
				</td>
			</tr>
		}
			}
		})
	})
:""
}

{/* 只有两个类别显示 苏妲己 编辑状态 */}
{this.state.typeProduct.replace(/0/g,"").length==2 && !this.state.disabled?	
	this.state.data1.map((item,index)=>{	
		return this.state.QixianData.map((item1,index1)=>{
			if(item1.parId==item.id){
				var conc1=this.twoCheckFirst(item.id,item1.id);
				//console.log(this.state.fiColSpan[index])
		if(conc1=="fi1"){
		return  <tr className={styles.fi1}>	
				<td colSpan="1" rowSpan={this.state.fiColSpan[index]}  className={styles.td25+" "+styles.tdborder+" "+styles.littlepadding}>
					<span>{item.value}</span>
				</td>
				<td className={styles.td25+" "+styles.tdborder+" "+styles.littlepadding}>
				<span>
				{item1.value}</span>
				</td>
				{this.state.tdTypedata.map((item2,index)=>{
					var conc2=this.twoCheckTdRowCol(item.id,item1.id,item2.value);
					var conc21=conc2[0];
					var conc22=conc2[1];
					var displayTd=true
					if(conc21==0 || conc22==0){
						var displayTd=false
					}
					var check11=this.twoCheckArea(item.id,item1.id,item2.value);
				return (
					<td ref={"tdio-"+item.id+"-"+item1.id+"-"+item2.value}
					onContextMenu={this.showRight.bind(this)} colSpan={conc22} rowSpan={conc21} name={"tdio-"+item.id+"-"+item1.id+"-"+item2.value} onClick={this.divideTable.bind(this)} style={{display:displayTd?"table-cell":"none"}} className={this.state.isDiveI==("tdio-"+item.id+"-"+item1.id+"-"+item2.value)?(styles.littlepadding+" "+styles.isDiveI+" "+check11):styles.littlepadding+" "+check11}>
					{this.state.hideInputForChoose?this.state["io-"+item.id+"-"+item1.id+"-"+item2.value]:<Input type="number" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.value]} id={"io-"+item.id+"-"+item1.id+"-"+item2.value} sb={displayTd} col={conc22} row={conc21} ref={"io-"+item.id+"-"+item1.id+"-"+item2.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.value}
					style={{display:this.state.hideInputForChoose?"none":"block"}}
					onChange={this.inputChange1.bind(this)} step="0.01"/>}
					
					</td>)
							
						})}
				<td className={styles.push1td} style={{width:40}}>
				<Checkbox checked={this.state["check-"+item.id+"-"+item1.id]} onChange={this.onSelectChange1.bind(this)} ref={"check-"+item.id+"-"+item1.id} name={"check-"+item.id+"-"+item1.id} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox>
				</td>
				
			</tr>
		}else{
			return <tr>	
				<td className={styles.td25+" "+styles.tdborder+" "+styles.littlepadding}>
				<span>
				{item1.value}</span>
				</td>
				{this.state.tdTypedata.map((item2,index)=>{
					var conc2=this.twoCheckTdRowCol(item.id,item1.id,item2.value);
					var conc21=conc2[0];
					var conc22=conc2[1];
					var displayTd=true
					if(conc21==0 || conc22==0){
						var displayTd=false
					}
					var check11=this.twoCheckArea(item.id,item1.id,item2.value);
					return (
				<td ref={"tdio-"+item.id+"-"+item1.id+"-"+item2.value}
				onContextMenu={this.showRight.bind(this)} colSpan={conc22} rowSpan={conc21} name={"tdio-"+item.id+"-"+item1.id+"-"+item2.value} onClick={this.divideTable.bind(this)} style={{display:displayTd?"table-cell":"none"}} className={this.state.isDiveI==("tdio-"+item.id+"-"+item1.id+"-"+item2.value)?(styles.littlepadding+" "+styles.isDiveI+" "+check11):styles.littlepadding+" "+check11}>
				{this.state.hideInputForChoose?this.state["io-"+item.id+"-"+item1.id+"-"+item2.value]:<Input type="number" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.value]} id={"io-"+item.id+"-"+item1.id+"-"+item2.value} sb={displayTd} col={conc22} row={conc21} ref={"io-"+item.id+"-"+item1.id+"-"+item2.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.value}
					style={{display:this.state.hideInputForChoose?"none":"block"}}
					onChange={this.inputChange1.bind(this)} step="0.01"/>}
				</td>)
							
						})}
				<td className={styles.push1td} style={{width:40}}>
				<Checkbox checked={this.state["check-"+item.id+"-"+item1.id]} onChange={this.onSelectChange1.bind(this)} ref={"check-"+item.id+"-"+item1.id} name={"check-"+item.id+"-"+item1.id} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox>
				</td>
			</tr>
		}
			}
		})
	})
:""
}

{/* 只有一个类别显示 西施*/}
{this.state.typeProduct.replace(/0/g,"").length==1 && this.state.disabled?	
	this.state.data1.map((item,index)=>{	
		return  <tr className={styles.fi1}>	
				<td colSpan="1" rowSpan={this.state.fiColSpan[index]}  className={styles.td25+" "+styles.tdborder+" "+styles.littlepadding}>
					<span>{item.value}</span>
				</td>
				{this.state.tdTypedata.map((item1,index)=>{
					var conc2=this.firstCheckTdRowCol(item.id,item1.value);
					var conc21=conc2[0];
					var conc22=conc2[1];
					var displayTd=true;
					//根据row,col是0隐藏单元格，以及是否hideinput使用右键拆分或者显示input框编辑
					if(conc21==0 || conc22==0){
						var displayTd=false
					}
					//检查当前是否在选中状态
					var check11=this.firstCheckArea(item.id,item1.value);

				return (
					<td onMouseDown={this.areaSetStart.bind(this)} ref={"tdio-"+item.id+"-"+item1.value} onMouseUp={this.areaSetEnd.bind(this)}
					onContextMenu={this.showRight.bind(this)} colSpan={conc22} rowSpan={conc21} name={"tdio-"+item.id+"-"+item1.value} onClick={this.divideTable.bind(this)} style={{display:displayTd?"table-cell":"none"}} className={this.state.isDiveI==("tdio-"+item.id+"-"+item1.value)?(styles.littlepadding+" "+styles.isDiveI+" "+check11):styles.littlepadding+" "+check11}>
					{this.state.hideInputForChoose?this.state["io-"+item.id+"-"+item1.value]:<Input type="number" value={this.state["io-"+item.id+"-"+item1.value]} ref={"io-"+item.id+"-"+item1.value} id={"io-"+item.id+"-"+item1.value} sb={displayTd} col={conc22} row={conc21} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.value}
					style={{display:this.state.hideInputForChoose?"none":"block"}}
                onChange={this.inputChange1.bind(this)} step="0.01"/>}
					</td>)
						})}
				<td className={styles.push1td} style={{width:40}}>
				<Checkbox checked={this.state["check-"+item.id]} onChange={this.onSelectChange1.bind(this)} ref={"check-"+item.id} name={"check-"+item.id} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox>
				</td>
				
			</tr>
		})
	
:""
}

{/* 只有一个类别显示 西施 编辑状态*/}
{this.state.typeProduct.replace(/0/g,"").length==1 && !this.state.disabled?	
	this.state.data1.map((item,index)=>{	
		return  <tr className={styles.fi1}>	
				<td colSpan="1" rowSpan={this.state.fiColSpan[index]}  className={styles.td25+" "+styles.tdborder+" "+styles.littlepadding}>
					<span>{item.value}</span>
				</td>
				{this.state.tdTypedata.map((item1,index)=>{
					var conc2=this.firstCheckTdRowCol(item.id,item1.value);
					var conc21=conc2[0];
					var conc22=conc2[1];
					var displayTd=true;
					//根据row,col是0隐藏单元格，以及是否hideinput使用右键拆分或者显示input框编辑
					if(conc21==0 || conc22==0){
						var displayTd=false
					}
					//检查当前是否在选中状态
					var check11=this.firstCheckArea(item.id,item1.value);

				return (
					<td ref={"tdio-"+item.id+"-"+item1.value}
					onContextMenu={this.showRight.bind(this)} colSpan={conc22} rowSpan={conc21} name={"tdio-"+item.id+"-"+item1.value} onClick={this.divideTable.bind(this)} style={{display:displayTd?"table-cell":"none"}} className={this.state.isDiveI==("tdio-"+item.id+"-"+item1.value)?(styles.littlepadding+" "+styles.isDiveI+" "+check11):styles.littlepadding+" "+check11}>
					{this.state.hideInputForChoose?this.state["io-"+item.id+"-"+item1.value]:<Input type="number" value={this.state["io-"+item.id+"-"+item1.value]} ref={"io-"+item.id+"-"+item1.value} id={"io-"+item.id+"-"+item1.value} sb={displayTd} col={conc22} row={conc21} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.value}
					style={{display:this.state.hideInputForChoose?"none":"block"}}
                onChange={this.inputChange1.bind(this)} step="0.01"/>}
					</td>)
						})}
				<td className={styles.push1td} style={{width:40}}>
				<Checkbox checked={this.state["check-"+item.id]} onChange={this.onSelectChange1.bind(this)} ref={"check-"+item.id} name={"check-"+item.id} style={{display:this.state.isInConcat?"inline-block":"none"}}></Checkbox>
				</td>
				
			</tr>
		})
	
:""
}
			</tbody>
			
			</table>
		</div>
		
	</div>
	<div className={styles.menu1} id="menu" style={{display:this.state.showMenu?"block":"none"}}>
		<div className={styles.menu} onClick={this.saveInDevide.bind(this)}>拆分</div>
		<div className={styles.menu2} onClick={this.saveInConcat1.bind(this)}>合并</div>
	</div>
	<div className={styles.menubg} style={{display:this.state.showMenu?"block":"none"}} onClick={this.cancelInDevide.bind(this)}>
	
	</div>
	<div className={styles.stepAction}>
	{
		this.state.currentStep < 6 - 1
		&&
		<Button type="primary" onClick={() => this.next()}>Next</Button>
		}
		{
		this.state.currentStep === 6 - 1
		&&
		<Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
		}
		{
		this.state.currentStep > 0
		&&
		<Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
			Previous
		</Button>
		}
	</div>
	</Spin>
	

	)
}
}

