import React from 'react';
import moment from "moment";
moment.locale('zh-cn');
import { Breadcrumb, Row, Col,Select, Input,DatePicker, Button,message, Icon} from 'antd';
const Option = Select.Option;
import {Link, hashHistory} from 'react-router';

import $jsonp from '../../utils/service.js';
import api from '../../utils/api.js';

import beard from '../../img/Breadcrumbsymbol.jpg'
import publicstyle from '../../img/public.less'
import styles from './addcompanyNew.less'
import Singlepersonselect from '../../components/singlepersonselect1.jsx'
import companypng from "../../img/company.png"
import departmentpng from "../../img/department.png"
import emppng from "../../img/emp.png"
import styles1 from "../../components/common.less"

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

class Addstaff extends React.Component {
	constructor(props) {
	    super(props);
	    self=this;
	    this.state = {
	      loading:false,
				personData:[],
				personData1:[],
				showErrorText1:"",
			
				name:"",
				unit:"",
				operator:"",
				operatorPhone:"",
				town:"",
				townManager:"",
				townManagerPhone:"",
				selectType:"1",
				terminalTime1:"",
				terminalTimeShow1:"",
		
	    }
	}

	componentWillMount(){

		this.fetchDepartment();

	 	if(self.props.location.state.top == "edit"){
	 		var staffmanage=JSON.parse(sessionStorage.getItem("staffmanage"));
	 		this.setState({staffmanage});
	 		console.log(staffmanage);
			 self.setState({
				departmentId:staffmanage.msaId,
				departmentName:<div><img src={departmentpng} className={styles1.qicon}/>{staffmanage.msaName}</div>,
				showStatus:true,
			 })
			$jsonp(self,api.getCompanyInfoById,{
				id:staffmanage.id,
			}).then((res) => {
				console.log(res)
				var list=res.data.response.info
				self.setState({
					name:list.name,
					unit:!list.unit?"":list.unit,
					operator:!list.operator?"":list.operator,
					operatorPhone:!list.operatorPhone?"":list.operatorPhone,
					town:!list.town?"":list.town,
					townManager:!list.townManager?"":list.townManager,
					townManagerPhone:!list.townManagerPhone?"":list.townManagerPhone,
					selectType:!list.type?"1":list.type,
					selectStatus:list.status,
					terminalTime1:!list.recordTime?"":moment(list.recordTime).format('YYYY-MM-DD'),
					terminalTimeShow1:!list.recordTime?"":moment(list.recordTime),
					
				 });
		}).catch((error)=>{
		
		})
	 		// this.setState({

			 
			//   departmentId:staffmanage.msaId,
			// 	departmentName:<div><img src={departmentpng} className={styles1.qicon}/>{staffmanage.msaName}</div>,
			// 	showStatus:true,
			
			// 	name:staffmanage.name,
			// 	unit:!staffmanage.unit?"":staffmanage.unit,
			// 	operator:!staffmanage.operator?"":staffmanage.operator,
			// 	operatorPhone:!staffmanage.operatorPhone?"":staffmanage.operatorPhone,
			// 	town:!staffmanage.town?"":staffmanage.town,
			// 	townManager:!staffmanage.townManager?"":staffmanage.townManager,
			// 	townManagerPhone:!staffmanage.townManagerPhone?"":staffmanage.townManagerPhone,
			// 	selectType:!staffmanage.type?"1":staffmanage.type,
			// 	selectStatus:staffmanage.status,
			// 	terminalTime1:!staffmanage.recordTime?"":moment(staffmanage.recordTime).format('YYYY-MM-DD'),
			// 	terminalTimeShow1:!staffmanage.recordTime?"":moment(staffmanage.recordTime),
				
			//  });
			
	 	}
	 	if(self.props.location.state.top == "add"){
	 		this.setState({
			  
			  departmentId:"",
				departmentName:"",
				showStatus:false,
				name:"",
				unit:"",
				operator:"",
				operatorPhone:"",
				town:"",
				townManager:"",
				townManagerPhone:"",
				selectType:"1",
				terminalTime1:"",
				terminalTimeShow1:"",
				selectStatus:"1"
		 	});
			
	 	}	
	}

	fetchDepartment(){
		$jsonp(self,api.getAllCompanyDepartmentTreeInUse,{}).then((res) => {
			console.log(res);
			var list=res.data.response.companyDepartmentList;
			this.setState({
				personData:list,
				personData1:list,
			});
			
		});
	}

	handleSubmit = (e) => {
		
		
		var roleIdd="";
		var arr1=[];
		console.log(this.state.departmentId);
		var name=!self.state.name?"":self.state.name;
		var unit=!self.state.unit?"":self.state.unit;
		var operator=!self.state.operator?"":self.state.operator;
		var operatorPhone=!self.state.operatorPhone?"":self.state.operatorPhone;
		var town=!self.state.town?"":self.state.town;
		var townManager=!self.state.townManager?"":self.state.townManager;
		var townManagerPhone=!self.state.townManagerPhone?"":self.state.townManagerPhone;
		var selectType=!self.state.selectType?"1":self.state.selectType;
		var selectStatus=self.state.selectStatus;
		
		if(!self.state.name){
			message.info("请填写公司名称");
			return
		}
	
		if(!self.state.departmentId || this.state.departmentId.length==0){
			message.info("请选择所属海事局");
			return
		}

		e1(arr1,this.state.departmentId,this.state.personData);
		if(arr1.length==0){
			return
		}
		console.log(arr1)
		self.setState({
			loading:true
		})
		
		if(self.props.location.state.top == "add"){
				$jsonp(self,api.addCompanyInfo,{
						msaId:this.state.departmentId,
						name:name,
						unit:unit,
						operator:operator,
						operatorPhone:operatorPhone,
						town:town,
						townManager:townManager,
						townManagerPhone:townManagerPhone,
						recordTime:self.state.terminalTime1,
						type:selectType,
					}).then((res) => {
						console.log(res);

						hashHistory.push({
								pathname: '/main/companymanage',
								state:{
									current:""
								}
						})
				}).catch((error)=>{
					console.log(error)
					self.setState({
						loading:false
					})
				})
		}
		else{
				$jsonp(self,api.updateCompanyInfo1,{
							id:this.state.staffmanage.id,
							msaId:this.state.departmentId,
							name:name,
							unit:unit,
							operator:operator,
							operatorPhone:operatorPhone,
							town:town,
							townManager:townManager,
							townManagerPhone:townManagerPhone,
							recordTime:self.state.terminalTime1,
							type:selectType,
							status:selectStatus
				}).then((res) => {
					console.log(res);
					var eeee=self.props.location.state;
					hashHistory.push({
							pathname: '/main/companymanage',
							state:{
								current:eeee.current,
								name: eeee.name,
								departmentId: eeee.departmentId,
								departmentCode: eeee.departmentCode,
							}
					})
					
				}).catch((error)=>{
					self.setState({
						loading:false
					})
				});
			}

			 
	 }
	
	
	
	
	setChange1 = (value) => {
		console.log(value)
		var arr1=[];
		e1(arr1,value,this.state.personData);
		console.log(arr1);
		if(!value){
			this.setState({
				departmentId:"",
				departmentName:"",
			})
		}
		else{
			if((arr1.length>0)){
				this.setState({
					showErrorText1:""
				})
				if(arr1[0].nodeType==1){
					var depatname=<div><img src={companypng} className={styles1.qicon}/>{arr1[0].name}</div>;
				}else if(arr1[0].nodeType==2){
					var depatname=<div><img src={departmentpng} className={styles1.qicon}/>{arr1[0].name}</div>;
				}else if(arr1[0].nodeType==3){
					var depatname=<div><img src={emppng} className={styles1.qicon}/>{arr1[0].name}</div>;
				}
				this.setState({
					departmentId:value,
					departmentName:depatname,
				})
			
			}
			
		}
	}
	cancel = () => {
		var eeee=self.props.location.state;
		hashHistory.push({
	      pathname: '/main/companymanage',
	      state:{
	      current:eeee.current,
				name: eeee.name,
		    departmentId: eeee.departmentId,
		    departmentCode: eeee.departmentCode,

			}
			
		})
	}
	//设置新增票据承兑方简称
	setCompanytName = (e) => {
		var value=e.target.value;
		if(value.length>=50){
			return
		}
		this.setState({
			name:value
		})
	}
	setUnit = (e) => {
		var value=e.target.value;
		if(value.length>=50){
			return
		}
		this.setState({
			unit:value
		})
	}
	setOperator = (e) => {
		var value=e.target.value;
		if(value.length>=50){
			return
		}
		this.setState({
			operator:value
		})
	}
	setOperatorPhone = (e) => {
		var value=e.target.value;
		value=value.replace(/[^\d-]/g, ""); 
		if(value.length>11){
			return
		}
		this.setState({
			operatorPhone:value
		})

	}
	setTown = (e) => {
		var value=e.target.value;
		if(value.length>=50){
			return
		}
		this.setState({
			town:value
		})
	}
	setTownManager = (e) => {
		var value=e.target.value;
		if(value.length>=50){
			return
		}
		this.setState({
			townManager:value
		})
	}
	setTownManagerPhone = (e) => {
		var value=e.target.value;
		value=value.replace(/[^\d-]/g, ""); 
		if(value.length>11){
			return
		}
		this.setState({
			townManagerPhone:value
		})

	}
	timeChange1= (date, dateString) => {
		console.log(date,dateString)
		let self=this
		this.setState({
			terminalTime1: dateString,
			terminalTimeShow1: date
		})
	}
	setType = (value) => {
		this.setState({
			selectType:value
		})
	}	
	setStatus = (value) => {
		this.setState({
			selectStatus:value
		})
	}	
	
	render() {

		return (
			<div>
			  
			  <Breadcrumb separator=">" style={{textAlign:"left"}}>
			    <Breadcrumb.Item>系统管理</Breadcrumb.Item>
			    <Breadcrumb.Item><Link to="main/staffmanage">公司管理</Link></Breadcrumb.Item>
			    <Breadcrumb.Item>{self.props.location.state.top == "add"?"新增公司":"编辑公司"}</Breadcrumb.Item>
			  </Breadcrumb>
			  <div className={publicstyle.clearfloat}></div>
			  
		<div className={styles.form1}>
			<dl className={styles.formitem1}>
				<span className={styles.bitian}><i></i>公司名称：</span>
				<Input
					value={this.state.name}
					onChange={this.setCompanytName.bind(this)}
					placeholder="请输入公司名称"
					/>
			</dl>
			<dl className={styles.formitem1}>
				<span className={styles.bitian}><i></i>所属海事局：</span>
				<Singlepersonselect value={this.state.departmentName} onChange={this.setChange1} multiple={false} className={styles.singleSelect} personData={this.state.personData1}/>
				<label className={styles.xuanzeTishi}>{this.state.showErrorText1}</label>
			</dl>
			
			<dl className={styles.formitem1}>
				<span><i></i>游览经营单位：</span>
				<Input
					value={this.state.unit}
					onChange={this.setUnit.bind(this)}
					placeholder="请输入游览经营单位"
					/>
			</dl>
			<dl className={styles.formitem1}>
				<span><i></i>运营人：</span>
				<Input
					value={this.state.operator}
					onChange={this.setOperator.bind(this)}
					placeholder="请输入运营人"
					/>
			</dl>
			<dl className={styles.formitem1}>
				<span><i></i>运营人手机号：</span>
				<Input
					value={this.state.operatorPhone}
					onChange={this.setOperatorPhone.bind(this)}
					placeholder="请输入运营人手机号"
					/>
			</dl>
			<dl className={styles.formitem1}>
				<span><i></i>所在乡镇：</span>
				<Input
					value={this.state.town}
					onChange={this.setTown.bind(this)}
					placeholder="请输入所在乡镇"
					/>
			</dl>

			<dl className={styles.formitem1}>
				<span><i></i>乡镇负责人：</span>
				<Input
					value={this.state.townManager}
					onChange={this.setTownManager.bind(this)}
					placeholder="请输入乡镇负责人"
					/>
			</dl>
			<dl className={styles.formitem1}>
				<span><i></i>乡镇负责人手机号：</span>
				<Input
					value={this.state.townManagerPhone}
					onChange={this.setTownManagerPhone.bind(this)}
					placeholder="请输入乡镇负责人手机号"
					/>
			</dl>
			
			<dl className={styles.formitem1}>
				<span><i></i>游览经营项目备案时间：</span>
				<DatePicker showTime
					size="large"
					format="YYYY-MM-DD"
					placeholder={'游览经营项目备案时间'}
					value={this.state.terminalTimeShow1}
					onOk={this.timeOk}
					style={{width:"170px"}}
					onChange={this.timeChange1} />
			</dl>
			<dl className={styles.formitem1}>
				<span className={styles.bitian}><i></i>游览经营项目类型：</span>
				<Select className={styles.selectrole} value={this.state.selectType}onChange={this.setType}>
					<Option value="1">渡口渡船</Option>
					<Option value="2">游览经营</Option>
				</Select>
			</dl>

			<dl className={styles.formitem1} style={{display:this.state.showStatus?"block":"none"}}>
				<span className={styles.bitian}><i></i>游览经营项目状态：</span>
				<Select className={styles.selectrole} value={this.state.selectStatus} onChange={this.setStatus}>
					<Option value="0">无效</Option>
					<Option value="1">有效</Option>
				</Select>
			</dl>
		
			<dl className={styles.formitem1}>
					<Button type="primary" size="large" className={publicstyle.button+" "+styles.button} onClick={this.handleSubmit.bind(this)} loading={this.state.loading}>
							保存
						</Button>
						<Button size="large" className={publicstyle.button+" "+styles.button} onClick={this.cancel}>
							取消
					</Button>
			</dl>
		
		</div>
 
			   
			</div>

		)
	}
}
export default Addstaff;

