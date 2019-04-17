import React from 'react';
import moment from "moment";
moment.locale('zh-cn');
import { Pagination, Breadcrumb,Select, Row, Col, Input, Button,Icon, Table, message, Spin,Steps,Modal,Radio } from 'antd';

const Option = Select.Option;
const Step = Steps.Step;

const RadioGroup = Radio.Group;
import {Link, hashHistory} from 'react-router';

import $jsonp from '../../utils/service.js';
import api from '../../utils/api.js';

import publicstyle from '../../img/public.less'
import styles from './evalit2.less'

import emppng from "../../img/emp.png"
import styles1 from "../../components/common.less"



let self;
function findChangeKEY(chekArry,frmstate){
	var parId=chekArry[0].parId;
	var firstPosition=0;
	var deleteLength=0;
	//获取弹窗的table的parId的在列表里的初始位置
	for(var kk1=0; kk1<frmstate.length; kk1++){
		if(frmstate[kk1].parId==parId){
			firstPosition=kk1;
			break
		}
	}
	//获取弹窗的table的更新长度
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
	  "value": "中国建设银行股份有限公司丹东六合支行",
	  "paramv1": "111111111111111111111111111111111111",
	  "paramv2": "105226000225",
	  "paramv3": "世界金融组织QH",
	  "node":"leibie",
	  "key": 90,
	  "index": 1
	},
	{
	  "idStr": "107",
	  "id": 107,
	  "rootId": 107,
	  "parId": 1,
	  "value": "fakerrrrrrrrrrr",
	  "paramv1": "111111111111111111111111111111111111",
	  "paramv2": "105226000225",
	  "paramv3": "奥德赛匹配",
	  "node":"leibie",
	  "key": 107,
	  "index": 2
	}
];
  var QixianData=[
	{
	  "id": 1,
	  "parId": 90,
	  "value": "期限<90",
	  "paramv1": "111111111111111111111111111111111111",
	  "paramv2": "105226000225",
	  "paramv3": "奥德赛匹配",
	  "key": 1,
	  "node":"qixian"
	},
	{
		"id": 2,
		"parId": 90,
		"value": "90<=期限<180天",
		"paramv1": "111111111111111111111111111111111111",
		"paramv2": "105226000225",
		"paramv3": "奥德赛匹配",
		"key": 2,
		"node":"qixian"
	  },
	  {
		"id": 3,
		"parId": 90,
		"value": "180<=期限<270天",
		"paramv1": "111111111111111111111111111111111111",
		"paramv2": "105226000225",
		"paramv3": "奥德赛匹配",
		"key": 3,
		"node":"qixian"
	  } 
  ];
  var AmountData=[
	{
	  "id": "1",
	  "parId": 1,
	  "value": "单张<100",
	  "paramv1": "111111111111111111111111111111111111",
	  "paramv2": "105226000225",
	  "paramv3": "奥德赛匹配",
	  "key": "1",
	  "node":"amount"
	},
	{
		"id": "2",
		"parId": 1,
		"value": "100<=单张<500",
		"paramv1": "111111111111111111111111111111111111",
	  "paramv2": "105226000225",
	  "paramv3": "奥德赛匹配",
		"key": "2",
		"node":"amount"
	},
	{
		"id": "3",
		"parId": 1,
		"value": "500<=单张<1000",
		"paramv1": "111111111111111111111111111111111111",
	  "paramv2": "105226000225",
	  "paramv3": "奥德赛匹配",
		"key": "3",
		"node":"amount"
	},
	{
		"id": "4",
		"parId": 1,
		"value": "1000<=单张<5000",
		"paramv1": "111111111111111111111111111111111111",
	  "paramv2": "105226000225",
	  "paramv3": "奥德赛匹配",
		"key": "4",
		"node":"amount"
	},
	{
		"id": "5",
		"parId": 1,
		"value": "5000<=单张<10000",
		"paramv1": "111111111111111111111111111111111111",
	  "paramv2": "105226000225",
	  "paramv3": "奥德赛匹配",
		"key": "5",
		"node":"amount"
	},
	
  ];
 var tempdata1=[{
	"id": 90,
	"parId": 1,
	"rootId": 90,
	"node":"leibie",
	"key": 90,
	"index": 1,
	"value": "中国建设银行股份有限公司丹东六合支行",
  },
  {
	"idStr": "107",
	"id": 107,
	"rootId": 107,
	"parId": 1,
	"value": "中国建设银行股份有限公司丹东六合支行",
	"key": 107,
	"index": 2
  }];

export default class customerlist extends React.Component {
	constructor(props) {
		super(props);
		self=this;
		this.state = {

			loading:true,
			currentStep:1,
			firstClickVisible:false,
			isXinzenBank:true,
			data1:[],
			QixianData:[],
			AmountData:[],
			withFirstChoose:false,
			haveEditAcceptClassData:false,
			
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
			plainOptions:['承兑方类型', '票据期限区间', '票面金额区间'],
			firstTypeMake:false,
			secondTypeMake:false,
			thirdTypeMake:false,
			firstTypeText:"承兑方类别",
			secondTypeText:"票据期限",
			thirdTypeText:"票面金额（万元）",
			firstRadioValues:"",
			secondRadioValues:"",
			thirdRadioValues:"",
			firstTypeChoose:false,
			secondTypeChoose:false,
			thirdTypeChoose:false,
			firstTypeButtonText:"选择承兑方类别",
			secondTypeButtonText:"选择票据期限",
			thirdTypeButtonText:"选择票面金额",
			totalRadioValue:[],

			firstTypeChoose:true,
			secondTypeChoose:true,
			thirdTypeChoose:true,
			firstTypeButtonText:"选择票据期限",
			secondTypeButtonText:"选择承兑方类别",
			thirdTypeButtonText:"",
			firstRadioValues:"票据期限区间",
			secondRadioValues:"选择票据期限",
			thirdRadioValues:"",
			firstTypeText:"票据期限",
			secondTypeText:"承兑方类别",
			thirdTypeText:""
		}
		/*datepicker:[moment(),moment()]*/
	}

	fggd(){

		//乱序
		var e1={
			firstTypeChoose:true,
			secondTypeChoose:true,
			thirdTypeChoose:true,
			firstTypeButtonText:"选择票据期限",
			secondTypeButtonText:"选择承兑方类别",
			thirdTypeButtonText:"选择票面金额",
			firstRadioValues:"票据期限区间",
			secondRadioValues:"承兑方类型",
			thirdRadioValues:"票面金额区间",
			firstTypeText:"票据期限",
			secondTypeText:"承兑方类别",
			thirdTypeText:"票面金额（万元）"
		}

		//少第三个
		var e1={firstTypeChoose:true,
			secondTypeChoose:true,
			thirdTypeChoose:true,
			firstTypeButtonText:"选择承兑方类别",
			secondTypeButtonText:"选择票据期限",
			thirdTypeButtonText:"",
			firstRadioValues:"承兑方类型",
			secondRadioValues:"票据期限区间",
			thirdRadioValues:"",
			firstTypeText:"承兑方类别",
			secondTypeText:"票据期限",
			thirdTypeText:"",};
		//少第二个
		var e1={firstTypeChoose:true,
			secondTypeChoose:true,
			thirdTypeChoose:true,
			firstTypeButtonText:"选择承兑方类别",
			secondTypeButtonText:"",
			thirdTypeButtonText:"选择票面金额",
			firstRadioValues:"承兑方类型",
			secondRadioValues:"",
			thirdRadioValues:"票面金额区间",
			firstTypeText:"承兑方类别",
			secondTypeText:"",
			thirdTypeText:"票面金额（万元）",};
			//少第二三个
		var e1={firstTypeChoose:true,
				secondTypeChoose:true,
				thirdTypeChoose:true,
				firstTypeButtonText:"选择承兑方类别",
				secondTypeButtonText:"",
				thirdTypeButtonText:"",
				firstRadioValues:"承兑方类型",
				secondRadioValues:"",
				thirdRadioValues:"",
				firstTypeText:"承兑方类别",
				secondTypeText:"",
				thirdTypeText:"",};
				//少第一二个
		var e1={firstTypeChoose:true,
			secondTypeChoose:true,
			thirdTypeChoose:true,
			firstTypeButtonText:"",
			secondTypeButtonText:"",
			thirdTypeButtonText:"选择票面金额",
			firstRadioValues:"",
			secondRadioValues:"",
			thirdRadioValues:"票面金额区间",
			firstTypeText:"",
			secondTypeText:"",
			thirdTypeText:"票面金额（万元）",};
		var e1={firstTypeChoose:true,
			secondTypeChoose:true,
			thirdTypeChoose:true,
			firstTypeButtonText:"",
			secondTypeButtonText:"",
			thirdTypeButtonText:"选择票面金额",
			firstRadioValues:"",
			secondRadioValues:"",
			thirdRadioValues:"票面金额区间",
			firstTypeText:"",
			secondTypeText:"",
			thirdTypeText:"票面金额（万元）",};

	}
	componentWillMount(){
		//firstRadioValues,secondRadioValues,thirdRadioValues是和plainOptions对应的数据
		//firstTypeButtonText是在firstRadioValues的基础上添加了选择俩字显示button字符
		//firstTypeText用来显示表头名称
		//firstTypeChoose,secondTypeChoose,thirdTypeChoose都是true，才是都选择的标志
		  
	}
	componentDidMount(){}
	typeProduct(){
		var plainS0="";
		var plainS1=this.state.plainOptions[0];
		var plainS2=this.state.plainOptions[1];
		var plainS3=this.state.plainOptions[2];
		var plainArr=[plainS0,plainS1,plainS2,plainS3];
		var firstRadioValues=self.state.firstRadioValues;
		var secondRadioValues=self.state.secondRadioValues;
		var thirdRadioValues=self.state.thirdRadioValues;
		var returnfirstRadioValues="";
		var returnsecondRadioValues="";
		var returnthirdRadioValues="";
		for(var index1=0; index1<plainArr.length; index1++){
			if(plainArr[index1]==firstRadioValues){
				returnfirstRadioValues=index1
			}
		}
		for(var index1=0; index1<plainArr.length; index1++){
			if(plainArr[index1]==secondRadioValues){
				returnsecondRadioValues=index1
			}
		}
		for(var index1=0; index1<plainArr.length; index1++){
			if(plainArr[index1]==thirdRadioValues){
				returnthirdRadioValues=index1
			}
		}
		var rerturnvalue=returnfirstRadioValues+""+returnsecondRadioValues+""+returnthirdRadioValues;
		console.log(rerturnvalue)
		
		return rerturnvalue
	}
	chooseBaojia=(param)=>{
		self.setState({
			firstClickVisible:true,
			position:param
		})
	}
	saveBaojia=()=>{
		var totalRadioValue=self.state.totalRadioValue;
		self.setState({
			firstClickVisible:false,
		})
		var position=self.state.position;
		if(position==1){
			var radio1="firstTypeText";
			var radio2="firstRadioValues";
			var radio3="firstTypeChoose";
			var radio4="firstTypeButtonText";
		}else if(position==2){
			var radio1="secondTypeText";
			var radio2="secondRadioValues";
			var radio3="secondTypeChoose";
			var radio4="secondTypeButtonText";
		}else if(position==3){
			var radio1="thirdTypeText";
			var radio2="thirdRadioValues";
			var radio3="thirdTypeChoose";
			var radio4="thirdTypeButtonText";
		}
		
		if(!self.state[radio2]){
			
		}else{
			if(includeItem(totalRadioValue,self.state[radio2])){
				message.info("已选择"+self.state[radio2]+"!不能重复选择")
				return
			}else{
				totalRadioValue.push(self.state[radio2])
				self.setState({
					totalRadioValue:totalRadioValue
				})
			}
		}
		self.setState({
			[radio4]:"选择"+self.state[radio2],
		},()=>{
			console.log(self.state[radio4])
		})

		if(!self.state[radio2]){
			var radioValue=""
		}else if(self.state[radio2]==self.state.plainOptions[0]){
			var radioValue="承兑方类别"
		}else if(self.state[radio2]==self.state.plainOptions[1]){
			var radioValue="票据期限"
		}else if(self.state[radio2]==self.state.plainOptions[2]){
			var radioValue="票面金额（万元）"
		}
		//设置列头
		self.setState({
			[radio1]:radioValue,
		},()=>{
			console.log(self.state[radio1])
		})
		self.setState({
			[radio3]:true,
		})
		console.log(self.state)
	}
	cancelBaojia=()=>{
		self.setState({
			firstClickVisible:false,
		})
	}
	
	onRadioChange=(e) =>{
		console.log('checked = ', e.target.value);
		var checkedValues=[e.target.value];
		console.log(checkedValues)
		var position=self.state.position;

		if(position==1){
			var radio1="firstTypeText";
			var radio2="firstRadioValues";
		}else if(position==2){
			var radio1="secondTypeText";
			var radio2="secondRadioValues";
		}else if(position==3){
			var radio1="thirdTypeText";
			var radio2="thirdRadioValues";
		}
		
		self.setState({
			[radio2]:e.target.value,
		})
	}
	//生成票据期限空数据
	blankTheArray=(rootArray)=>{
		var qixianData1=[];
		var qixianData2=[];

		console.log(qixianData1)
		for(let index1=0; index1<rootArray.length;index1++){
			let tempObj={
				"id": 1,
				"parId": 90,
				"value": "",
				"key": 1,
				"node":"qixian",
			};
			tempObj.id=index1+1;
			tempObj.key=index1+1;
			tempObj.parId=rootArray[index1].id;
			tempObj.rootId=rootArray[index1].rootId;
			console.log(tempObj)
			qixianData2.push(tempObj)
		}

		return qixianData2
	}
	//生成票据金额空数据
	blankAmountTheArray=(rootArray)=>{
		var qixianData1=[];
		var qixianData2=[];

		console.log(qixianData1)
		for(let index1=0; index1<rootArray.length;index1++){
			let tempObj={
				"id": 1,
				"parId": 90,
				"value": "",
				"key": 1,
				"node":"amount",
			};
			tempObj.id=index1+1;
			tempObj.key=index1+1;
			tempObj.parId=rootArray[index1].id;
			tempObj.rootId=rootArray[index1].rootId;
			console.log(tempObj)
			qixianData2.push(tempObj)
		}

		return qixianData2
	}
	//生成树级数据
	productArray=(templateArray,rootArray)=>{
		var qixianData1=[];
		var qixianData2=[];
		for(var index3=0; index3<templateArray.length;index3++){
			qixianData1.push(templateArray[index3])	
		}
		console.log(qixianData1)
		for(let index1=0; index1<rootArray.length;index1++){
			for(let index2=0; index2<qixianData1.length;index2++){
				let tempObj={};
				for(var idq in qixianData1[index2]){
					tempObj[idq]=qixianData1[index2][idq]
				}
				tempObj.id=index2+index1*(qixianData1.length)+1;
				tempObj.key=index2+index1*(qixianData1.length)+1;
				tempObj.parId=rootArray[index1].id;
				tempObj.rootId=rootArray[index1].rootId;
				console.log(tempObj)
				qixianData2.push(tempObj)
			}
		}

		return qixianData2
	}

	ishaveAllChoose=()=>{
		var firstTypeChoose=self.state.firstTypeChoose;
		var secondTypeChoose=self.state.secondTypeChoose;
		var thirdTypeChoose=self.state.thirdTypeChoose;
		if(firstTypeChoose && secondTypeChoose && thirdTypeChoose){
			return true
		}else{
			return false
		}
	}
	//真的选择类别
	trueAcceptClass = (param) => {
		self.setState({editBankVisible:true,prAcceptPosition:param})
	}
	//真的选择期限
	trueQixian= (param) => {
		self.setState({editQixianVisible:true,prQixianPosition:param})
	}
	//真的选择金额
	trueAmount= (param) => {
		self.setState({editAmountVisible:true,prAmountPosition:param})
	}
	//当前位置1，根据当前显示的节点显示打开哪个弹窗
	chooseAcceptClass = () => {
		if(!this.ishaveAllChoose()){
			message.info("请全部选择数据")
			return
		}
		var typeProduct1=this.typeProduct();
		var typeProductArr=typeProduct1.split("")
		console.log(typeProductArr[0])
		if(typeProductArr[0]=="1"){
			this.trueAcceptClass.call(this,1)
		}else if(typeProductArr[0]=="2"){
			this.trueQixian.call(this,1)
		}else if(typeProductArr[0]=="3"){
			this.trueAmount.call(this,1)
		}
	}
	//当前位置2，根据当前显示的节点显示打开哪个弹窗，
	chooseQixian= () => {
		if(!this.ishaveAllChoose()){
			message.info("请全部选择数据")
			return
		}
		var typeProduct1=this.typeProduct();
		var typeProductArr=typeProduct1.split("")
		if(typeProductArr[1]=="1"){
			if(typeProductArr[0]=="0"){
				this.trueAcceptClass.call(this,2)
			}else{
				var postTypeData=self.state.data1;
				if(postTypeData.length==0){
					message.info("请选择前一项")
				}else{
					this.trueAcceptClass.call(this,2)
				}
			}
			
		}else if(typeProductArr[1]=="2"){
			if(typeProductArr[0]=="0"){
				this.trueQixian.call(this,2)
			}else{
				var postTypeData=self.state.data1;
				if(postTypeData.length==0){
					message.info("请选择前一项")
				}else{
					this.trueQixian.call(this,2)
				}
			}
			
		}else if(typeProductArr[1]=="3"){
			
			if(typeProductArr[0]=="0"){
				this.trueAmount.call(this,2)
			}else{
				var postTypeData=self.state.data1;
				console.log(postTypeData)
				if(postTypeData.length==0){
					message.info("请选择前一项")
				}else{
					this.trueAmount.call(this,2)
				}
			}
		}
	}
	//当前位置3，根据当前显示的节点显示打开哪个弹窗
	chooseAmount= () => {
		if(!this.ishaveAllChoose()){
			message.info("请全部选择数据")
			return
		}
		var typeProduct1=this.typeProduct();
		var typeProductArr=typeProduct1.split("")
		var postQixianData=self.state.QixianData;
		var postTypeData=self.state.data1;
		if(typeProductArr[2]=="1"){
			if(typeProduct1 =="231" || typeProduct1 =="321"){
				if(postTypeData.length==0 ||  postQixianData.length==0){
					message.info("请选择前一项")
				}else{
					this.trueAcceptClass.call(this,3)
				}
			}
			else if(typeProduct1 =="201" || typeProduct1 =="301"){
				
				if(postTypeData.length == 0){
					message.info("请选择前一项")
				}else{
					this.trueAcceptClass.call(this,3)
				}
			}else if(typeProduct1 =="021" || typeProduct1 =="031"){
				if(postQixianData.length == 0){
					message.info("请选择前一项")
				}else{
					this.trueAcceptClass.call(this,3)
				}
			}else{
				this.trueAcceptClass.call(this,3)
			}
			
		}else if(typeProductArr[2]=="2"){
			if(typeProduct1 =="132" || typeProduct1 =="312"){
				if(postTypeData.length==0 ||  postQixianData.length==0){
					message.info("请选择前一项")
				}else{
					this.trueQixian.call(this,3)
				}
			}
			else if(typeProduct1 =="102" || typeProduct1 =="302"){
				
				if(postTypeData.length == 0){
					message.info("请选择前一项")
				}else{
					this.trueQixian.call(this,3)
				}
			}else if(typeProduct1 =="012" || typeProduct1 =="032"){
				if(postQixianData.length == 0){
					message.info("请选择前一项")
				}else{
					this.trueQixian.call(this,3)
				}
			}else{
				this.trueQixian.call(this,3)
			}
			
		}else if(typeProductArr[2]=="3"){
			if(typeProduct1 =="123" || typeProduct1 =="213"){
				if(postTypeData.length==0 ||  postQixianData.length==0){
					message.info("请选择前一项")
				}else{
					this.trueAmount.call(this,3)
				}
			}
			else if(typeProduct1 =="103" || typeProduct1 =="203"){
				
				if(postTypeData.length == 0){
					message.info("请选择前一项")
				}else{
					this.trueAmount.call(this,3)
				}
			}else if(typeProduct1 =="013" || typeProduct1 =="023"){
				if(postQixianData.length == 0){
					message.info("请选择前一项")
				}else{
					this.trueAmount.call(this,3)
				}
			}else{
				this.trueAmount.call(this,3)
			}

		}
		
		
	}
	//关闭添加承兑方类别
	cancelLeibie=(e)=>{
		this.setState({
			editBankVisible:false,
		});
	}
	//保存修改承兑方类别
	trueSaveLeibie=(e)=>{
		self.setState({
			data1:data1
		},()=>{
			console.log(self.state.data1)

		})
		var typeProduct1=this.typeProduct();
		if(typeProduct1=="100"){
			var postQixianData=this.blankTheArray(data1)
			self.setState({
				QixianData:postQixianData
			},()=>{
				console.log(self.state.QixianData)
			})
			var AmountData1=this.blankAmountTheArray(postQixianData)
			this.setState({
				AmountData:AmountData1,
			},()=>{
				console.log(this.state.AmountData)
			});
		}
		this.setState({
			editBankVisible:false,
			haveEditAcceptClassData:true,
			withFirstChoose:true,
		});
	}
	//关闭添加真正的票据期限
	cancelQixian=(e)=>{
		this.setState({
			editQixianVisible:false,
		});
	}
	//真正的票据期限保存修改，可能从123位置点击打开，需要判断当前打开位置
	trueSaveQixian=(e)=>{
		var postTypeData=self.state.data1;
		var postQixianData=self.state.QixianData;
		
		var prQixianPosition=self.state.prQixianPosition;
		
		var typeProduct1=this.typeProduct();
		var typeProductArr=typeProduct1.split("")
		if(prQixianPosition==1){
			this.setState({
				editQixianVisible:false,
				withFirstChoose:true,
				haveEditAcceptClassData:true,
				data1:data1
			},()=>{
				console.log(self.state.data1)
			});
		}else if(prQixianPosition==2){
			var qixianData2=this.productArray(QixianData,postTypeData)
			this.setState({
				editQixianVisible:false,
				withFirstChoose:true,
				haveEditQixianData:true,
				QixianData:qixianData2,
			},()=>{
				console.log(this.state.QixianData)
			});
		}else if(prQixianPosition==3){
			var AmountData1=this.productArray(AmountData,postQixianData)
			this.setState({
				editQixianVisible:false,
				haveEditAmountData:true,
				withFirstChoose:true,
				AmountData:AmountData1,
			},()=>{
				console.log(this.state.AmountData)
			});
		}
		

		
		if(typeProduct1=="23" || typeProduct1=="2"){
			  postTypeData=[{
				"idStr": "9999",
				"id":9999,
				"parId": 1,
				"rootId": 90,
				"paramv1": "111111111111111111111111111111111111",
				"paramv2": "105226000225",
				"paramv3": "世界金融组织QH",
				"key": 9999,
				"index": 9999
			  }]
			  self.setState({
				data1:postTypeData
			  })
		}
		var qixianData2=this.productArray(QixianData,postTypeData)
		//只有票据期限
		if(typeProduct1=="2" || typeProduct1=="12"){

			var AmountData1=this.blankAmountTheArray(qixianData2)
			this.setState({
				AmountData:AmountData1,
			},()=>{
				console.log(this.state.AmountData)
			});
		}
		console.log(qixianData2)
		this.setState({
			
			editQixianVisible:false,
			withFirstChoose:true,
			haveEditQixianData:true,
			QixianData:qixianData2,
		},()=>{
			console.log(this.state.QixianData)
		});

	}
	//关闭添加票面金额
	cancelAmount=(e)=>{
		this.setState({
			editAmountVisible:false,
		});
	}
	//保存修改票面金额
	trueSaveAmount=(e)=>{
		var postQixianData=self.state.QixianData;
		var postTypeData=self.state.data1;
		var typeProduct1=this.typeProduct();
		if(typeProduct1=="3"){
			postTypeData=[{
				"idStr": "9999",
				"id":9999,
				"parId": 1,
				"rootId": 90,
				"companyId": 22,
				"paramv3": "世界金融组织QH",
				"businessTradeHouseId": 42,
				"businessTradeHouseName": "11",
				"value": "",
				"bankMoney": 983180666.56,
				"paramv1": "111111111111111111111111111111111111",
				"paramv2": "105226000225",
				"bankStatus": 1,
				"createTime": 1517822891000,
				"updateTime": 1521192967603,
				"key": 9999,
				"index": 9999
			}]
			self.setState({
				data1:postTypeData
			})
			postQixianData=[{
				"id": 9999,
				"parId": 9999,
				"rootId": 90,
				"node": "qixian",
				"key": 9999,
				"value": "",
			}]
			self.setState({
				QixianData:postQixianData
			},()=>{
				console.log(self.state.QixianData)
			})
		}
		if(typeProduct1=="13"){
			postQixianData=this.blankTheArray(postTypeData)
			self.setState({
				QixianData:postQixianData
			},()=>{
				console.log(self.state.QixianData)
			})
		}
		var AmountData1=this.productArray(AmountData,postQixianData)

		this.setState({
			editAmountVisible:false,
			haveEditAmountData:true,
			withFirstChoose:true,
			AmountData:AmountData1,
		},()=>{
			console.log(this.state.AmountData)
		});
		
	}
	reOrderByParId=(arr)=>{
		var map = {},
			dest = [];
		for(var i = 0; i < arr.length; i++){
			var ai = arr[i];
			if(!map[ai.parId]){
				dest.push({
					parId: ai.parId,
					data: [ai]
				});
				map[ai.parId] = ai;
			}else{
				for(var j = 0; j < dest.length; j++){
					var dj = dest[j];
					if(dj.parId == ai.parId){
						dj.data.push(ai);
						break;
					}
				}
			}
		}
		return dest
	}
	next() {
		const currentStep = this.state.currentStep + 1;
		if(currentStep==2){
			hashHistory.push({
				pathname: "/main/evalit3",
				state:{
					data1:self.state.data1,
					QixianData:self.state.QixianData,
					AmountData:self.state.AmountData,
					firstTypeMake:self.state.firstTypeMake,
					secondTypeMake:self.state.secondTypeMake,
					thirdTypeMake:self.state.thirdTypeMake,
				  }
			})
		}
		this.setState({ currentStep });
	}
	prev() {
		const currentStep = this.state.currentStep - 1;
		this.setState({ currentStep });
	}
	
	editTheType1= (item) => {
		var qixianData2=self.state.data1;
		
		console.log(qixianData2)
		var qixianData3=this.reOrderByParId(qixianData2);
		self.setState({
			TYPEDATA:qixianData3
		})
		var ee1=qixianData3;
		var tempArr=[];
		console.log(ee1)
		console.log(item,item.parId)
		for(var index1=0;index1<ee1.length;index1++){
			if(item.parId==ee1[index1].parId){
				tempArr=ee1[index1]
			}
		}
		console.log(tempArr)
		self.setState({
			SHOWTYPEDATA:tempArr.data,
			deleteTempIdData:[],
			addTempIdData:[],
		})
		
		self.setState({editVisible:true,
			pcyyd1:item.value,
			pcyyItem:item,
			pcyydId:item.id,
			pcyydType:1})
		
	}
	editTheType2= (item) => {
		var qixianData2=self.state.QixianData;
		
		console.log(qixianData2)
		var qixianData3=this.reOrderByParId(qixianData2);
		console.log(qixianData3)
		self.setState({
			QIXIANDATA:qixianData3
		})
		var ee1=qixianData3;
		var tempArr=[];
		console.log("QIXIANDATA",ee1)
		console.log(item,item.parId)
		for(var index1=0;index1<ee1.length;index1++){
			if(item.parId==ee1[index1].parId){
				tempArr=ee1[index1]
			}
		}
		console.log("QIXIANDATAtempArr",tempArr)
		self.setState({
			SHOWQIXIANDATA:tempArr.data
		})
		self.setState({
			editVisible:true,
			pcyyd2:item.value,
			pcyyItem:item,
			pcyydId:item.id,
			pcyydType:2})
	}
	editTheType3= (item) => {
		var typeProduct1=this.typeProduct();
		if(typeProduct1 =="1" || typeProduct1=="2" || typeProduct1=="12"){
			return
		}
		var qixianData2=self.state.AmountData;
		var qixianData3=this.reOrderByParId(qixianData2);
		console.log(qixianData3)
		self.setState({
			AMOUNTDATA:qixianData3
		})
		var ee1=qixianData3;
		var ee1=qixianData3;
		var tempArr=[];
		console.log(ee1)
		console.log(item,item.parId)
		for(var index1=0;index1<ee1.length;index1++){
			if(item.parId==ee1[index1].parId){
				tempArr=ee1[index1]
			}
		}
		console.log(tempArr)
		self.setState({
			SHOWAMOUNTDATA:tempArr.data
		})
		self.setState({editVisible:true,
			pcyyd3:item.value,
			pcyyItem:item,
			pcyydId:item.id,
			pcyydType:3})
	}
	deleteType1= (item) => {
		var deleteTempIdData=self.state.deleteTempIdData;
		var dd=self.state.SHOWTYPEDATA;
		for(var pp=0;pp<dd.length; pp++){
			if(item.id==dd[pp].id){
				dd.splice(pp,1)
			}
		}
		self.setState({
			SHOWTYPEDATA:dd
		})
		deleteTempIdData.push(item)
		self.setState({
			deleteTempIdData:deleteTempIdData
		})
	}
	deleteType2= (item) => {

		var dd=self.state.SHOWQIXIANDATA;
		for(var pp=0;pp<dd.length; pp++){
			if(item.id==dd[pp].id){
				dd.splice(pp,1)
			}
		}
		self.setState({
			SHOWQIXIANDATA:dd
		})
	}
	deleteType3= (item) => {
		var dd=self.state.SHOWAMOUNTDATA;
		for(var pp=0;pp<dd.length; pp++){
			if(item.id==dd[pp].id){
				dd.splice(pp,1)
			}
		}
		self.setState({
			SHOWAMOUNTDATA:dd
		})
	}
	
	editpcyyd1= (e) => {
		var value=e.target.value;
		if(value.length>50){
			return
		}
		this.setState({
			pcyyd1:value
		})

	}
	editpcyyd2= (e) => {
		var value=e.target.value;
		if(value.length>50){
			return
		}
		this.setState({
			pcyyd2:value
		})

	}
	editpcyyd3= (e) => {
		var value=e.target.value;
		if(value.length>50){
			return
		}
		this.setState({
			pcyyd3:value
		})

	}
	addTypeOnfocus1= (e) => {
		var value=e.target.value;
		if(value.length>50){
			return
		}
		this.setState({
			addType1:value
		})

	}
	addTypeOnfocus2= (e) => {
		var value=e.target.value;
		if(value.length>50){
			return
		}
		this.setState({
			addType2:value
		})

	}
	addTypeOnfocus3= (e) => {
		var value=e.target.value;
		if(value.length>50){
			return
		}
		this.setState({
			addType3:value
		})

	}
	saveSHOWTYPEDATA= (e) => {

		var SHOWTYPEDATA=self.state.SHOWTYPEDATA;
		var addid=this.addId(1);
		console.log(addid)
		var addObj={
			"idStr": addid+"",
			"id": addid,
			"parId": self.state.pcyyItem.parId,
			"rootId": self.state.pcyyItem.rootId,
			"value": self.state.addType1,
			"paramv1": "111111111111111111111111111111111111",
			"paramv2": "105226000225",
			"paramv3": "世界金融组织QH",
			"key": addid,
			"index": addid
		};
		SHOWTYPEDATA.push(addObj)
		this.setState({
			SHOWTYPEDATA:SHOWTYPEDATA
		})

	}
	saveSHOWQIXIANDATA= (e) => {
	
		var SHOWQIXIANDATA=self.state.SHOWQIXIANDATA;
		var addid=this.addId(1);
		console.log(addid)
		var addObj={
			"id": addid,
			"parId": self.state.pcyyItem.parId,
			"rootId": self.state.pcyyItem.rootId,
			"node": "qixian",
			"key": addid,
			"value": self.state.addType2,
		};

		SHOWQIXIANDATA.push(addObj)
		this.setState({
			SHOWQIXIANDATA:SHOWQIXIANDATA
		})

	}
	saveSHOWAMOUNTDATA= (e) => {
	
		var SHOWAMOUNTDATA=self.state.SHOWAMOUNTDATA;
		var addid=this.addId(1);
		console.log(addid)
		var addObj={
			"id": addid,
			"parId": self.state.pcyyItem.parId,
			"rootId": self.state.pcyyItem.rootId,
			"node": "amount",
			"key": addid,
			"value": self.state.addType3,
		};

		SHOWAMOUNTDATA.push(addObj)
		this.setState({
			SHOWAMOUNTDATA:SHOWAMOUNTDATA
		})

	}
	//生成新增的id
	addId=(param1)=>{
		let self=this;
		var randomNum=Math.random();
		console.log(randomNum)
		var addId1=parseInt(randomNum*10000);
		console.log(addId1)
		if(addId1==0){addId1=1;}
		if(param1==1){
			var sjdjdj=self.state.data1;
			var SHOWTYPEDATA=self.state.SHOWTYPEDATA;
			for(var index1=0;index1<sjdjdj.length;index1++){
				if(addId1==sjdjdj[index1].id){
					return this.addId(1)
				}else{
					for(var index2=0;index2<SHOWTYPEDATA.length;index2++){
						if(addId1==SHOWTYPEDATA[index2].id){
							return this.addId(1)
						}else{
							return addId1
						}
					}
					return addId1
				}
			}
			
			
		}else if(param1==2){
			var sjdjdj=self.state.QixianData;
			var SHOWQIXIANDATA=self.state.SHOWQIXIANDATA;
			for(var index1=0;index1<sjdjdj.length;index1++){
				if(addId1==sjdjdj[index1].id){
					return this.addId(1)
				}else{
					for(var index2=0;index2<SHOWQIXIANDATA.length;index2++){
						if(addId1==SHOWQIXIANDATA[index2].id){
							return this.addId(1)
						}else{
							return addId1
						}
					}
					return addId1
				}
			}
			
		}else if(self.state.pcyydType==3){
			var sjdjdj=self.state.AmountData;
			var SHOWAMOUNTDATA=self.state.SHOWAMOUNTDATA;
			for(var index1=0;index1<sjdjdj.length;index1++){
				if(addId1==sjdjdj[index1].id){
					return this.addId(1)
				}else{
					for(var index2=0;index2<SHOWAMOUNTDATA.length;index2++){
						if(addId1==SHOWAMOUNTDATA[index2].id){
							return this.addId(1)
						}else{
							return addId1
						}
					}
					return addId1
				}
			}
		}

	}
	
	saveTheChange= (e) => {
		let self=this;
		
		if(self.state.pcyydType==1){
			var sjdjdj=self.state.data1;
			var SHOWTYPEDATA=self.state.SHOWTYPEDATA;
			var deleteTempIdData=self.state.deleteTempIdData;
			for(var index3=0; index3<sjdjdj.length;index3++){
				if(sjdjdj[index3].id==self.state.pcyydId){
					sjdjdj[index3].value=self.state.pcyyd1
				}
			}
			var newsjdjdj=[];
			var peooe=findChangeKEY(SHOWTYPEDATA,sjdjdj)
			//小于开始位置保留，大于等于结束位置保留
			for(var index3=0; index3<sjdjdj.length;index3++){
				if(index3<peooe[2]){
					newsjdjdj.push(sjdjdj[index3])
				}
			}
			for(var index4=0;index4<SHOWTYPEDATA.length;index4++){
				newsjdjdj.push(SHOWTYPEDATA[index4])
			}
			for(var index3=0; index3<sjdjdj.length;index3++){
				if(index3>=peooe[3]){
					newsjdjdj.push(sjdjdj[index3])
				}
			}
			console.log(newsjdjdj)
			self.setState({
				data1:newsjdjdj,
				editVisible:false
			})
		}else if(self.state.pcyydType==2){

			var sjdjdj=self.state.QixianData;
			var SHOWQIXIANDATA=self.state.SHOWQIXIANDATA;
			
			for(var index3=0; index3<sjdjdj.length;index3++){
				if(sjdjdj[index3].id==self.state.pcyydId){
					sjdjdj[index3].value=self.state.pcyyd2
				}
			}
			var newsjdjdj=[];
			var peooe=findChangeKEY(SHOWQIXIANDATA,sjdjdj)
			//小于开始位置保留，大于等于结束位置保留
			for(var index3=0; index3<sjdjdj.length;index3++){
				if(index3<peooe[2]){
					newsjdjdj.push(sjdjdj[index3])
				}
			}
			for(var index4=0;index4<SHOWQIXIANDATA.length;index4++){
				newsjdjdj.push(SHOWQIXIANDATA[index4])
			}
			for(var index3=0; index3<sjdjdj.length;index3++){
				if(index3>=peooe[3]){
					newsjdjdj.push(sjdjdj[index3])
				}
			}
			
			self.setState({
				QixianData:newsjdjdj,
				editVisible:false
			})
		}else if(self.state.pcyydType==3){
			var sjdjdj=self.state.AmountData;
			var SHOWAMOUNTDATA=self.state.SHOWAMOUNTDATA;
			
			for(var index3=0; index3<sjdjdj.length;index3++){
				if(sjdjdj[index3].id==self.state.pcyydId){
					sjdjdj[index3].value=self.state.pcyyd3
				}
			}
			var newsjdjdj=[];
			var peooe=findChangeKEY(SHOWAMOUNTDATA,sjdjdj)
			//小于开始位置保留，大于等于结束位置保留
			for(var index3=0; index3<sjdjdj.length;index3++){
				if(index3<peooe[2]){
					newsjdjdj.push(sjdjdj[index3])
				}
			}
			for(var index4=0;index4<SHOWAMOUNTDATA.length;index4++){
				newsjdjdj.push(SHOWAMOUNTDATA[index4])
			}
			for(var index3=0; index3<sjdjdj.length;index3++){
				if(index3>=peooe[3]){
					newsjdjdj.push(sjdjdj[index3])
				}
			}
			
			self.setState({
				AmountData:newsjdjdj,
				editVisible:false
			})
		}
		
	}
	cancelTheChange= (e) => {
		self.setState({
			editVisible:false
		})
	}
	
	
	deleteAcceptClass=(record)=>{
		var dd=self.state.data1;
		for(var pp=0;pp<dd.length; pp++){
			if(record.id==dd[pp].id){
				dd.splice(pp,1)
			}
		}
		self.setState({
			data1:dd
		})
	}
	//计算当前少了哪个没选的
	computeClassLabel(){
		var firstCheck=this.state.firstTypeChoose && this.state.firstRadioValues =="";
		var secondCheck=this.state.secondTypeChoose && this.state.secondRadioValues =="";
		var thirdCheck=this.state.thirdTypeChoose && this.state.thirdRadioValues =="";
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
	
	
	render() {
		const columns1 = [{
				title: '序号',
				dataIndex: 'index',
				key: 'index',
				width:"70px",
				className:publicstyle.center
			},{
				title: '类别名称',
				dataIndex: 'paramv1',
				key: 'paramv1',
				width:"200px",
				className:publicstyle.center
			}, {
				title: '承兑方类型',
				dataIndex: 'value',
				key: 'value',
				width:"200px",
				className:publicstyle.center
			},
			{
				title: '承兑方明细',
				dataIndex: 'paramv2',
				key: 'paramv2',
				width:"100px",
				className:publicstyle.center
			},
			{
				title: '操作',
				key: '',
				className:publicstyle.center,
				render: (text, record, index) => {
					return <span>
					<Button type="primary" onClick={this.deleteAcceptClass.bind(this, record,"edit")}
					style={{cursor: "pointer",marginRight:"20px"}}>删除
					</Button>
					
					</span>
					

				},
			}];

		const showTYPEcolumns = [{
				title: '序号',
				dataIndex: 'index',
				key: 'index',
				width:"70px",
				className:publicstyle.center
			},{
				title: '类别名称',
				dataIndex: 'paramv1',
				key: 'paramv1',
				width:"200px",
				className:publicstyle.center
			}, {
				title: '承兑方类型',
				dataIndex: 'value',
				key: 'value',
				width:"200px",
				className:publicstyle.center
			},
			{
				title: '承兑方明细',
				dataIndex: 'paramv2',
				key: 'paramv2',
				width:"100px",
				className:publicstyle.center
			},
			{
				title: '操作',
				key: '',
				className:publicstyle.center,
				render: (text, record, index) => {
					return <span>
					<Button type="primary" onClick={this.deleteType1.bind(this, record)}
					style={{cursor: "pointer",marginRight:"20px"}}>删除
					</Button>
					</span>
					

				},
			}];

		
		const showQIXIANcolumns = [{
				title: '期限',
				dataIndex: 'value',
				key: 'value',
				width:"200px",
				className:publicstyle.center
			},
			{
				title: '操作',
				key: '',
				className:publicstyle.center,
				render: (text, record, index) => {
					return <span>
					<Button type="primary" onClick={this.deleteType2.bind(this,record)} style={{width :"50%"}}>删除</Button>
					</span>
					

				},
			}];
		const showAMOUNTcolumns = [{
				title: '金额',
				dataIndex: 'value',
				key: 'value',
				width:"200px",
				className:publicstyle.center
			},
			{
				title: '操作',
				key: '',
				className:publicstyle.center,
				render: (text, record, index) => {
					return <span>
					<Button type="primary" onClick={this.deleteType3.bind(this,record)} style={{width :"50%"}}>删除</Button>
					</span>
				},
			}];
{}
return (
	<Spin spinning={false}>


	<Breadcrumb separator=">">
	<Breadcrumb.Item>客户管理</Breadcrumb.Item>
	<Breadcrumb.Item>客户列表</Breadcrumb.Item>
	</Breadcrumb>
	<div className={publicstyle.clearfloat}></div>
	
	<Steps current={self.state.currentStep}>
		<Step title="定义表格类型" description="" />
		<Step title="选择报价参数" description="（横向的行)" />
		<Step title="设定基础价格" description="" />
		<Step title="选择扩展参数" description="（纵向的列）" />
		<Step title="填写备注信息" description="" />
		<Step title="选择规则说明" description="" />
	</Steps>
		
	<div className={styles.boxcontent}>
		<div className={styles.info1}>
			<div className={styles.info100}><span style={{display:"block"}}>诚承宝 电子银票报价表</span>
			</div>
			<div className={styles.flexRow+" "+styles.rightBorder}>
			<div className={styles.info50}><span>最近报价时间：表单创建并填写完毕后，由系统自动生成最近报价时间</span>
			</div>
			<div className={styles.info50}><span>最低利率</span>
			</div>
			</div>
		</div>
		<div className={styles.flexRow+" "+styles.rightBorder+" "+
		this.computeClassLabel()}>
			<div className={styles.info10+" "+styles.number1}><span style={{display:this.state.firstTypeChoose?"block":"none"}}>{this.state.firstTypeText}</span>
			<Button type="primary" onClick={this.chooseBaojia.bind(this,1)}
					style={{cursor: "pointer",display:this.state.firstTypeChoose?"none":"block"}}>选择报价参数
			</Button>
			</div>
			<div className={styles.info20+" "+styles.number2}><span style={{display:this.state.secondTypeChoose?"block":"none"}}>{this.state.secondTypeText}</span>
			<Button type="primary" onClick={this.chooseBaojia.bind(this,2)}
					style={{cursor: "pointer",display:this.state.secondTypeChoose?"none":"block"}}>选择报价参数
			</Button>
			</div>
			<div className={styles.info20+" "+styles.number3}><span style={{display:this.state.thirdTypeChoose?"block":"none"}}>{this.state.thirdTypeText}</span>
			<Button type="primary" onClick={this.chooseBaojia.bind(this,3)}
					style={{cursor: "pointer",display:this.state.thirdTypeChoose?"none":"block"}}>选择报价参数
			</Button>
			</div>
			<div className={styles.info50}><span></span>
			</div>
		</div>
		<div className={styles.flexRow+" "+styles.rightBorder+" "+
		this.computeClassLabel()}>
			<div className={styles.info10+" "+styles.number1}>
				{this.state.firstTypeChoose?(!this.state.haveEditAcceptClassData)?<Button type="primary" onClick={this.chooseAcceptClass.bind(this)}
					style={{cursor: "pointer",position:"relative",zIndex:20,display:!this.state.firstTypeText?"none":"block"}}>{this.state.firstTypeButtonText}
					</Button>:<span></span>:<span></span>
				}
				
			</div>
			<div className={styles.info20+" "+styles.number2}>
				{this.state.secondTypeChoose?(!this.state.haveEditQixianData)?<Button type="primary" onClick={this.chooseQixian.bind(this)}
					style={{cursor: "pointer",position:"relative",zIndex:20,display:!this.state.secondTypeText?"none":"block"}}>{this.state.secondTypeButtonText}
					</Button>:<span></span>:<span></span>
				}
			</div>
			<div className={styles.info20+" "+styles.number3}>
				{this.state.thirdTypeChoose?(!this.state.haveEditAmountData)?			<Button type="primary" onClick={this.chooseAmount.bind(this)}
					style={{cursor: "pointer",position:"relative",zIndex:20,display:!this.state.thirdTypeText?"none":"block"}}>{this.state.thirdTypeButtonText}
					</Button>:<span></span>:<span></span>
				}
			</div>
			<div className={styles.info50}><span></span>
			</div>
			{/* 三个都有类别显示 白莲花 */}
			{this.state.withFirstChoose && this.typeProduct().replace(/0/g,"").length==3?
			<div id="class1" className={styles.positionAb+" "+
			this.computeClassLabel()} style={{display:this.typeProduct().replace(/0/g,"").length==3?"block":"none"}}>{
					this.state.data1.map((item,index)=>{
						return <div className={styles.flexTableRow+" "+styles.tableBorder}>
							<div className={styles.table10+" "+styles.tableLarge1}>
								<span onClick={this.editTheType1.bind(this, item)}>{item.value}</span>
							</div>
							{/* 期限显示 */}
							{this.state.QixianData.length>0?
								<div className={styles.table20+" "+styles.tableMiddle1+" "+styles.flexTableColumn+" "+styles.tableMiddle1Margin}>
									{this.state.QixianData.map((item1,index)=>{
									if(item1.parId==item.id){
										return (
					<div className={styles.flexTableRow+" "+styles.tableBorder}>
							<div className={styles.table20+" "+styles.tableLarge2}>
								<span onClick={this.editTheType2.bind(this, item1)}>{item1.value}</span>
							</div>
							{/* 金额显示 */}
							{this.state.AmountData.length>0?
								<div className={styles.tableMiddle2+" "+styles.flexTableColumn}>
									{this.state.AmountData.map((item2,index)=>{
										console.log(item2.parId==item1.id,item2.parId,item1.id)
									if(item2.parId==item1.id){
										return <div className={styles.aligncenter+" "+styles.tableBorder+" "+styles.flexTableRow}>
											<span className={styles.tableMiddle31} onClick={this.editTheType3.bind(this, item2)}>{item2.value}</span>
											<span className={styles.tableMiddle32}></span>
										    
										</div>
										}})}
								</div>
							:""}
							
							
						</div>)
										}})}
								</div>
							:""}
							
							
							
						</div>
					})
				}
			</div>:""
			}
			{/* 只有两个类别显示 苏妲己 */}
			{this.state.withFirstChoose && this.typeProduct().replace(/0/g,"").length==2?
			<div id="class2" className={styles.positionAb+" "+
			this.computeClassLabel()} style={{display:this.typeProduct().replace(/0/g,"").length==2?"block":"none"}}>
			{console.log(this.typeProduct().replace(/0/g,""))}
			{
					this.state.data1.map((item,index)=>{
						return <div className={styles.flexTableRow+" "+styles.tableBorder}>
							<div className={styles.table10+" "+styles.tableLarge1}>
								<span onClick={this.editTheType1.bind(this, item)}>{item.value}</span>
							</div>
							{/* 期限显示 */}
							
							{this.state.QixianData.length>0?
								<div className={styles.tableMiddle2+" "+styles.flexTableColumn}>
									{this.state.QixianData.map((item1,index)=>{
										console.log(item1.parId==item.id,item1.parId,item.id)
									if(item1.parId==item.id){
										return <div className={styles.aligncenter+" "+styles.tableBorder+" "+styles.flexTableRow}>
											<span className={styles.tableMiddle31} onClick={this.editTheType3.bind(this, item1)}>{item1.value}</span>
											<span className={styles.tableMiddle32}></span>
										    
										</div>
										}})}
								</div>
							:""}
							
							
						</div>
					})
				}
			</div>:""
			}
			{/* 只有一个类别显示 西施*/}
			{this.state.withFirstChoose && this.typeProduct().replace(/0/g,"").length==1?
			<div id="class3" className={styles.positionAb+" "+
			this.computeClassLabel()} style={{display:this.typeProduct().replace(/0/g,"").length==1?"block":"none"}}>
			{this.state.data1.length>0?
				<div className={styles.tableMiddle2+" "+styles.flexTableColumn}>
					{this.state.data1.map((item1,index)=>{
						return <div className={styles.aligncenter+" "+styles.tableBorder+" "+styles.flexTableRow}>
							<span className={styles.tableMiddle31} onClick={this.editTheType3.bind(this, item1)}>{item1.value}</span>
							<span className={styles.tableMiddle32}></span>
							
						</div>
						})}
				</div>
			:""}
			</div>:""
			}
			

			
		</div>
		
	</div>
	<Modal title={self.state.isXinzenBank==true?"新增承兑方类别":"编辑承兑方类别"} visible={this.state.editBankVisible}
		onOk={this.cancelLeibie.bind(this)} onCancel={this.cancelLeibie.bind(this)} okText="确定" cancelText="取消"
		className={styles.modalin1}
		footer={[<Button type="primary" loading={this.state.loading4} onClick={this.trueSaveLeibie.bind(this)} style={{marginRight: "10px"}}>确定</Button>]}
		>
		<div>{this.state.data1.length}</div>
		{this.state.data1 && this.state.data1.length>0?
			<div>
			<Table columns={columns1} dataSource={this.state.data1} bordered={true} pagination={false}/></div>
			:<p className={styles.nodata}><Icon type="frown-o" />&ensp;暂无数据</p>
			
		}
	</Modal>
	<Modal title={self.state.isQixian==true?"新增票面期限区间":"编辑票面期限区间"} visible={this.state.editQixianVisible}
		onOk={this.cancelQixian.bind(this)} onCancel={this.cancelQixian.bind(this)} okText="确定" cancelText="取消"
		className={styles.modalin1}
		footer={[<Button type="primary" loading={this.state.loading4} onClick={this.trueSaveQixian.bind(this)} style={{marginRight: "10px"}}>确定</Button>]}
		>
		{this.state.data1 && this.state.data1.length>0?
			<div>
			<Table columns={columns1} dataSource={this.state.data1} bordered={true} pagination={false}/></div>
			:<p className={styles.nodata}><Icon type="frown-o" />&ensp;暂无数据</p>
			
		}
	</Modal>
	<Modal title={self.state.isAmount==true?"新增票面金额区间":"编辑票面金额区间"} visible={this.state.editAmountVisible}
		onOk={this.cancelAmount.bind(this)} onCancel={this.cancelAmount.bind(this)} okText="确定" cancelText="取消"
		className={styles.modalin1}
		footer={[<Button type="primary" loading={this.state.loading4} onClick={this.trueSaveAmount.bind(this)} style={{marginRight: "10px"}}>确定</Button>]}
		>
		{this.state.data1 && this.state.data1.length>0?
			<div>
			<Table columns={columns1} dataSource={this.state.data1} bordered={true} pagination={false}/></div>
			:<p className={styles.nodata}><Icon type="frown-o" />&ensp;暂无数据</p>
			
		}
	</Modal>
	<Modal title="编辑承兑方类别" visible={this.state.editVisible}
		onOk={this.cancelTheChange.bind(this)} onCancel={this.cancelTheChange.bind(this)} okText="确定" cancelText="取消"
		className={styles.modalin1}
		footer={[<Button type="primary" onClick={this.saveTheChange.bind(this)} style={{marginRight: "10px"}}>确定</Button>]}
		>
	<div style={{display:this.state.pcyydType==1?"block":"none"}}>
		<Input type="text" value={this.state.addType1} style={{width :"50%"}}  placeholder="" onChange={this.addTypeOnfocus1.bind(this)}/>
		<Button type="primary" loading={this.state.loading4} onClick={this.saveSHOWTYPEDATA.bind(this)} style={{display :"block"}}>保存</Button>
		<Input type="text" value={this.state.pcyyd1} style={{width :"50%"}}  placeholder="" onChange={this.editpcyyd1.bind(this)}/>
		{this.state.SHOWTYPEDATA && this.state.SHOWTYPEDATA.length>0?
			<div>
			<Table columns={showTYPEcolumns} dataSource={this.state.SHOWTYPEDATA} bordered={true} pagination={false}/></div>
			:<p className={styles.nodata}><Icon type="frown-o" />&ensp;暂无数据</p>
		}
	</div>
	<div style={{display:this.state.pcyydType==2?"block":"none"}}>
		<Input type="text" value={this.state.addType2} style={{width :"50%"}}  placeholder="" onChange={this.addTypeOnfocus2.bind(this)}/>
		<Button type="primary" loading={this.state.loading4} onClick={this.saveSHOWQIXIANDATA.bind(this)} style={{display :"block"}}>保存</Button>
		<Input type="text" value={this.state.pcyyd2} style={{width :"50%"}}  placeholder="" onChange={this.editpcyyd2.bind(this)}/>
		{this.state.SHOWQIXIANDATA && this.state.SHOWQIXIANDATA.length>0?
			<div>
			<Table columns={showQIXIANcolumns} dataSource={this.state.SHOWQIXIANDATA} bordered={true} pagination={false}/></div>
			:<p className={styles.nodata}><Icon type="frown-o" />&ensp;暂无数据</p>
		}
	</div>
	<div style={{display:this.state.pcyydType==3?"block":"none"}}>
		<Input type="text" value={this.state.addType3} style={{width :"50%"}}  placeholder="" onChange={this.addTypeOnfocus3.bind(this)}/>
		<Button type="primary" loading={this.state.loading4} onClick={this.saveSHOWAMOUNTDATA.bind(this)} style={{display :"block"}}>保存</Button>
		<Input type="text" value={this.state.pcyyd3} style={{width :"50%"}}  placeholder="" onChange={this.editpcyyd3.bind(this)}/>
		{this.state.SHOWAMOUNTDATA && this.state.SHOWAMOUNTDATA.length>0?
			<div>
			<Table columns={showAMOUNTcolumns} dataSource={this.state.SHOWAMOUNTDATA} bordered={true} pagination={false}/></div>
			:<p className={styles.nodata}><Icon type="frown-o" />&ensp;暂无数据</p>
		}
	</div>

	</Modal>
	<Modal title={"选择报价参数"} visible={this.state.firstClickVisible}
		onOk={this.cancelBaojia.bind(this)} onCancel={this.cancelBaojia.bind(this)} okText="确定" cancelText="取消"
		className={styles.modalin1}
		footer={[<Button type="primary" onClick={this.saveBaojia.bind(this)} style={{marginRight: "10px"}}>确定</Button>]}
		>
		<RadioGroup style={{display:this.state.position==1?"block":"none"}} options={this.state.plainOptions} value={this.state.firstRadioValues} onChange={this.onRadioChange.bind(this)}/>
		<RadioGroup style={{display:this.state.position==2?"block":"none"}} options={this.state.plainOptions} value={this.state.secondRadioValues} onChange={this.onRadioChange.bind(this)}/>
		<RadioGroup style={{display:this.state.position==3?"block":"none"}} options={this.state.plainOptions} value={this.state.thirdRadioValues} onChange={this.onRadioChange.bind(this)}/>
	</Modal>
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
