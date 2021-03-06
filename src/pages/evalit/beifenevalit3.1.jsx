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
import styles from './evalit3.less'

import emppng from "../../img/emp.png"
import styles1 from "../../components/common.less"



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
			currentStep:2,
			
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
				  "label": "基础价格",
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
			plainOptions1Value:["jichujiage","qingweiXiaci","yibanXiaci","yishou","feiyishou"],
			firstTypeMake:false,
			secondTypeMake:false,
			thirdTypeMake:false,
			filteryibanXiaciData:["5.1","7.9","11.2","99.2","919.2","19.2","0.2","34.2","129.2","35.2","36.2"],
			filterqingweiXiaciData:["1.1","","1.2"],
			
			filterObject:{},
			plainOptions1LENGTH:8,
			plainOptions1LENGTH1:2,
			plainOptions1LENGTH2:6,
			typeProduct:"",

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
		},()=>{
			
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
		
		var p1=self.refs;
		console.log(p1)
		for(var p2 in p1){
			//console.log(p2)
			self.setState({
				[p2]:""
			})
		}
		for(var p3 in p1){
			//console.log(p3)
			for(var index1=0; index1<pps.length; index1++){
				if(p3.indexOf("-"+pps[index1])>-1){
					empty1[pps[index1]].push(p3)
				}
			}
		}
		self.setState({
			filterObject:empty1
		},()=>{
			var filterqingweiXiaciData=self.state.filterqingweiXiaciData;
			var spdp=self.state.filterObject;
			var qingweiXiaci=spdp["qingweiXiaci"];
			for(var index1=0; index1<filterqingweiXiaciData.length; index1++){
				self.setState({
					[qingweiXiaci[index1]]:filterqingweiXiaciData[index1]
				})
			}

			var filteryibanXiaciData=self.state.filteryibanXiaciData;
			var spdp=self.state.filterObject;
			var yibanXiaci=spdp["yibanXiaci"];
			for(var index1=0; index1<filteryibanXiaciData.length; index1++){
				self.setState({
					[yibanXiaci[index1]]:filteryibanXiaciData[index1]
				})
			}
			//console.log(self.state.filterObject)
		})
	}
	loadData(){
		
	}
	next() {
		const currentStep = this.state.currentStep + 1;
		if(currentStep==3){
			hashHistory.push({
				pathname: "/main/evalit4",
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
				  }
			})
		}
		this.setState({ currentStep });
	  }
	  prev() {
		const currentStep = this.state.currentStep - 1;
		if(currentStep==1){
			hashHistory.push({
				pathname: "/main/evalit",
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
				}
			})
		}
		this.setState({ currentStep });
	  }
	  onCheckChange=(checkedValues) =>{
		console.log('checked = ', checkedValues);
		self.setState({
			checkedValues:checkedValues,
		})
		var ppscheckedValues=checkedValues;
		var ppsplainOptions=this.state.plainOptions;
		let empty1=[{value:"jichujiage",label:"基础价格"}];

		for(var index1=0; index1<ppscheckedValues.length; index1++){
			for(var index2=0; index2<ppsplainOptions.length; index2++){
				if(ppsplainOptions[index2].value==ppscheckedValues[index1]){
					empty1.push(ppsplainOptions[index2])
				}
			}
		}
		self.setState({
			plainOptions1:empty1,
			tdTypedata:empty1
		},()=>{
			var typeProduct1=this.state.typeProduct;
			var sdd=typeProduct1.replace(/0/g,"").length;
			self.setState({
				plainOptions1LENGTH1:sdd,
				plainOptions1LENGTH2:self.state.plainOptions1.length+1,
				plainOptions1LENGTH:sdd+self.state.plainOptions1.length+1,
			})
		})
		
	}
	
	
	editTable(){
		self.setState({
			disabled:false,
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
			disabled:true
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
			disabled:true
		},()=>{
			console.log(this.state)
		})
		

	}
	inputChange1=(e)=>{
		this.updateState(e.target.name,e.target.value)
	}
	updateState(key, value){
		let data = {}
		data[key] = value;
		self.setState(data)
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
	
	
	render() {
		
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
		<Step title="选择扩展参数" description="（纵向的列）" />
		<Step title="设定基础价格" description="" />
		<Step title="填写备注信息" description="" />
		<Step title="选择规则说明" description="" />
	</Steps>
		<CheckboxGroup options={this.state.plainOptions} defaultValue={[]} onChange={this.onCheckChange.bind(this)} />
		
		<Button type="primary" onClick={this.editTable.bind(this)} style={{margin:"10px 0 10px 0",display:this.state.disabled?"inline-block":"none"}}>编辑</Button>
		<Button type="primary" onClick={this.saveTABLE.bind(this)} style={{margin:"10px 20px 10px 0",display:this.state.disabled?"none":"inline-block"}}>保存</Button>
		<Button type="primary" onClick={this.cancelTABLE.bind(this)} style={{margin:"10px 0 10px 0",display:this.state.disabled?"none":"inline-block"}}>取消</Button>
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
			<div className={styles.info10+" "+styles.number1}><span style={{display:this.state.firstRadioValues==""?"none":"block"}}>{this.state.firstTypeText}</span>
			</div>
			<div className={styles.info20+" "+styles.number2}><span style={{display:this.state.secondRadioValues==""?"none":"block"}}>{this.state.secondTypeText}</span>
			</div>
			<div className={styles.info20+" "+styles.number3}><span style={{display:this.state.thirdRadioValues==""?"none":"block"}}>{this.state.thirdTypeText}</span>
			</div>
			<div className={styles.rightBorder+" "+styles.info50} style={{padding:0}}>
			{this.state.plainOptions1.map((item4,index)=>{
				return (
					<div className={styles.push1+" "+styles.flexFullItem}>{item4.label}</div>
				)
			})}
				
			</div>
		</div>
		<div className={styles.flexRow+" "+styles.rightBorder}>
			<div className={styles.info10}>
				<span></span>
			</div>
			<div className={styles.info20}>
				<span></span>
			</div>
			<div className={styles.info20}>
				<span></span>
			</div>
			<div className={styles.info50}><span></span>
			</div>
			{/* 类别显示 */}
			
			<div className={styles.positionAb} style={{display:"none"}}>{
					this.state.data1.map((item,index)=>{
						return <div className={styles.flexTableRow+" "+styles.tableBorder}>
							<div className={styles.table10+" "+styles.tableLarge1}>
								<span>{item.value}</span>
							</div>
							{/* 期限显示 */}
							{this.state.QixianData.length>0?
								<div className={styles.table20+" "+styles.tableMiddle1+" "+styles.flexTableColumn+" "+styles.tableMiddle1Margin}>
									{this.state.QixianData.map((item1,index)=>{
									if(item1.parId==item.id){
										return (
					<div className={styles.flexTableRow+" "+styles.tableBorder}>
							<div className={styles.table20+" "+styles.tableLarge2}>
								<span>{item1.value}</span>
							</div>
							{/* 金额显示 */}
							{this.state.AmountData.length>0?
								<div className={styles.tableMiddle2+" "+styles.flexTableColumn}>
									{this.state.AmountData.map((item2,index)=>{
										
									if(item2.parId==item1.id){
										return <div className={styles.aligncenter+" "+styles.tableBorder+" "+styles.flexTableRow}>
											<span className={styles.tableMiddle31}>{item2.value}</span>
											<span className={styles.rightBorder+" "+styles.tableMiddle32}
											>
											{this.state.plainOptions1.map((item3,index)=>{
												return (
											<div className={styles.push1+" "+styles.flexFullItem}>
											<Input type="number" id="4" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]} ref={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value}
									onChange={this.inputChange1.bind(this)} step="0.01"/></div>
												)
												
											})}
				
				
											</span>
										    
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
			</div>

			{/* 三个都有类别显示 白莲花 */}
			{this.state.typeProduct.replace(/0/g,"").length==3?
			<div id="class1" className={styles.positionAb+" "+
			this.computeClassLabel()}>{
					this.state.data1.map((item,index)=>{
						return <div className={styles.flexTableRow+" "+styles.tableBorder}>
							<div className={styles.table10+" "+styles.tableLarge1}>
								<span>{item.value}</span>
							</div>
							{/* 期限显示 */}
							{this.state.QixianData.length>0?
								<div className={styles.table20+" "+styles.tableMiddle1+" "+styles.flexTableColumn+" "+styles.tableMiddle1Margin}>
									{this.state.QixianData.map((item1,index)=>{
									if(item1.parId==item.id){
										return (
					<div className={styles.flexTableRow+" "+styles.tableBorder}>
							<div className={styles.table20+" "+styles.tableLarge2}>
								<span>{item1.value}</span>
							</div>
							{/* 金额显示 */}
							{this.state.AmountData.length>0?
								<div className={styles.tableMiddle2+" "+styles.flexTableColumn}>
									{this.state.AmountData.map((item2,index)=>{
										// console.log(item2.parId==item1.id,item2.parId,item1.id)
									if(item2.parId==item1.id){
										return <div className={styles.aligncenter+" "+styles.tableBorder+" "+styles.flexTableRow}>
											<span className={styles.tableMiddle31}>{item2.value}</span>
											<span className={styles.rightBorder+" "+styles.tableMiddle32}>
											{this.state.plainOptions1.map((item3,index)=>{
												return (
											<div className={styles.push1+" "+styles.flexFullItem}>
											<Input type="number" id="4" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value]} ref={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+item3.value}
									onChange={this.inputChange1.bind(this)} step="0.01"/></div>
												)
												
											})}
											</span>
										    
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
			{this.state.typeProduct.replace(/0/g,"").length==2?
			<div id="class2" className={styles.positionAb+" "+
			this.computeClassLabel()}>
			{
					this.state.data1.map((item,index)=>{
						return <div className={styles.flexTableRow+" "+styles.tableBorder}>
							<div className={styles.table10+" "+styles.tableLarge1}>
								<span>{item.value}</span>
							</div>
							{/* 期限显示 */}
							
							{this.state.QixianData.length>0?
								<div className={styles.tableMiddle2+" "+styles.flexTableColumn}>
									{this.state.QixianData.map((item1,index)=>{
										
									if(item1.parId==item.id){
										return <div className={styles.aligncenter+" "+styles.tableBorder+" "+styles.flexTableRow}>
											<span className={styles.tableMiddle31}>{item1.value}</span>
											<span className={styles.rightBorder+" "+styles.tableMiddle32}>
											{this.state.plainOptions1.map((item2,index)=>{
												return (
											<div className={styles.push1+" "+styles.flexFullItem}>
											<Input type="number" id="4" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.value]} ref={"io-"+item.id+"-"+item1.id+"-"+item2.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.value}
									onChange={this.inputChange1.bind(this)} step="0.01"/></div>
												)
												
											})}
											</span>
											
										    
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
			{this.state.typeProduct.replace(/0/g,"").length==1?
			<div id="class3" className={styles.positionAb+" "+
			this.computeClassLabel()}>
			{console.log(this.state.typeProduct.replace(/0/g,""))}
			{this.state.data1.length>0?
				<div className={styles.tableMiddle2+" "+styles.flexTableColumn}>
					{this.state.data1.map((item,index)=>{
						return <div className={styles.aligncenter+" "+styles.tableBorder+" "+styles.flexTableRow}>
							<span className={styles.tableMiddle31}>{item.value}</span>
							<span className={styles.tableMiddle32}>
							{this.state.plainOptions1.map((item1,index)=>{
											return (
										<div className={styles.push1+" "+styles.flexFullItem}>
										<Input type="number" id="4" value={this.state["io-"+item.id+"-"+item1.value]} ref={"io-"+item.id+item1.value} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.value}
								onChange={this.inputChange1.bind(this)} step="0.01"/></div>
											)
											
										})}
							</span>
							
							
						</div>
						})}
				</div>
			:""}
			</div>:""
			}
			
			
		</div>
		
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

{/* <div className={styles.push1+" "+styles.flexFullItem}>
				<Input type="number" id="4" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+"shabi"]} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+"shabi"}
        onChange={this.inputChange1.bind(this)} step="0.01"/></div>
				<div className={styles.push1+" "+styles.flexFullItem}>
				<Input type="number" id="4" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+"game"]} disabled={this.state.disabled} name={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+"game"}
        onChange={this.inputChange1.bind(this)} step="0.01"/></div>
				<div className={styles.push1+" "+styles.flexFullItem}>
				<Input type="number" id="4" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+"phone"]} disabled={this.state.disabled}
        onChange={this.inputChange1.bind(this)} name={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+"phone"} step="0.01"/></div>
				<div className={styles.push1+" "+styles.flexFullItem}>
				<Input type="number" value={this.state["io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+"pc"]} name={"io-"+item.id+"-"+item1.id+"-"+item2.id+"-"+"pc"} id="4" disabled={this.state.disabled}
        onChange={this.inputChange1.bind(this)} step="0.01"/></div> */}