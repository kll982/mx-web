import React from 'react';
import {Breadcrumb, Row, Col, Form, Select, Input, Button, message, Icon, TreeSelect} from 'antd';
import {Link, hashHistory} from 'react-router';
import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import api from '../../utils/api.js';

import beard from '../../img/Breadcrumbsymbol.jpg'
import publicstyle from '../../img/public.less'
import styles from './addstaffNew.less'
import Singlepersonselect from '../../components/singlepersonselect1.jsx'
import companypng from "../../img/company.png"
import departmentpng from "../../img/department.png"
import emppng from "../../img/emp.png"
import styles1 from "../../components/common.less"
import styles2 from "../admin/index.less";
import stylez from '../../container/index.less';

const Option = Select.Option;
const FormItem = Form.Item;
let self;

function e0(arr, items, key) {
	if (items.children && items.children.length > 0) {
		items.children.map((itemss, indexss) => {
			if (itemss.id == key) {
				arr.push(itemss);
			}
			e0(arr, itemss, key);
		})
	}
}

function e1(arr, key, departsArr) {
	departsArr.map((item, index) => {
		if (item.id == key) {
			arr.push(item);
		}
		e0(arr, item, key);
	})
}
function fetchNodeType(nodeType,nodeName){
	var returnDiv="";
	if(nodeType==1){
		returnDiv=<div><img src={companypng} className={styles1.qicon}/>{nodeName}</div>
	}
	else if(nodeType==2){
		returnDiv=<div><img src={departmentpng} className={styles1.qicon}/>{nodeName}</div>
	}
	else if(nodeType==3){
		returnDiv=<div><img src={emppng} className={styles1.qicon}/>{nodeName}</div>
	}
	return returnDiv
}
const loop = data => data.map((item) => {
    if (item.children && item.children.length) {
        var ptitle = "";
        ptitle = fetchNodeType(item.nodeType, item.name)
        return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id}
                                    value={item.id.toString() + "=" + item.nodeType}>{loop(item.children)}</TreeSelect.TreeNode>;
    }
    var ptitle = "";
    ptitle = fetchNodeType(item.nodeType, item.name)
    return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id}
                                value={item.id.toString() + "=" + item.nodeType}/>;
});

class Addstaff extends React.Component {
	constructor(props) {
		super(props);
		self = this;
		this.state = {
			loading: false,
			validateStatus3: "",
			personData: [],
			showErrorText1: "",
			showErrorText2: "",
			departmentNameUpdate: "",
		}
	}

	componentWillMount() {

		this.fetchRole();
		this.fetchDepartment1();

		if (self.props.location.state.top == "edit") {
			var staffmanage = JSON.parse(sessionStorage.getItem("staffmanage"));
			this.setState({ staffmanage });
			
			this.setState({
				account: staffmanage.account,
				mobile: staffmanage.mobile,
				name: staffmanage.name,
				email: staffmanage.email,
				departmentId: staffmanage.departmentId,
                departmentName: <div><img src={departmentpng} className={styles1.qicon}/>{staffmanage.departmentName}
                </div>,
				departmentNameUpdate: staffmanage.departmentName,
				roleName: staffmanage.roleName,
				roleId: staffmanage.roleId,
				disabled: true,
				nodeType:staffmanage.nodeType,
			});
		}
		if (self.props.location.state.top == "add") {
			this.setState({
				account: "",
				mobile:"",
				name: "",
				email: "",
				roleName: "",
				roleId: "",
				disabled: false,
			});
		}
	}

	fetchRole() {
		//api.getAll
		$jsonp(self, api.getAllRoleForEmployee, {}).then((res) => {
			var list = res.data.response.allRoleList;
			var role = [];
			for(var i in list){
				if(list[i].roleLevel>=this.state.nodeType){
					role.push(list[i])
				}
			}
			self.setState({
				rolelist: role
			});
			var options1 = self.state.rolelist.map((domain) => {
				return <Option key={domain.id} value={domain.name}>{domain.name}</Option>;
			});
			self.setState({ options1 });
		});
	}


	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				var roleIdd = "";
				var arr1 = [];
				for (var k0 = 0; k0 < this.state.rolelist.length; k0++) {
					if (this.state.rolelist[k0].name == values.addRoleName) {
						roleIdd = this.state.rolelist[k0];
					}
				}
				if (!this.state.departmentId || this.state.departmentId.length == 0) {
					this.setState({
						showErrorText1: "请选择海事局"
					})
					return
				}
				var isNormalAccount=/[a-zA-Z][a-zA-Z0-9_]{2,15}/g;
				var isNormalAccount1=isNormalAccount.test(e.target.value);
				if(!isNormalAccount1){
					message.warning("用户名必须字母开头，长度3-16，允许字母数字下划线");
					return
				}
				self.setState({
					loading: true
				})
				
				if (self.props.location.state.top == "add") {
					$jsonp(self, api.addCompanyEmployee, {
						account: values.addAccount,
						mobile: values.addMobile,
						name: values.addName,
						departmentId: this.state.departmentId,
						departmentName: this.state.departmentNameUpdate,
						roleId: roleIdd.id,
					}).then((res) => {
						hashHistory.push({
							pathname: '/main/staffmanage',
							state: {
								current: ""
							}
						})
					}).catch((error) => {
						self.setState({
							loading: false
						})
					})
				}
				else {
					$jsonp(self, api.upDateCompanyEmployee, {
						id: this.state.staffmanage.id,
						account: values.addAccount,
						mobile: values.addMobile,
						name: values.addName,
						departmentId: this.state.departmentId,
						departmentName: this.state.departmentNameUpdate,
						roleId: roleIdd.id,
					}).then((res) => {
						var eeee = self.props.location.state;
						hashHistory.push({
							pathname: '/main/staffmanage',
							state: {
								current: eeee.current,
								account: eeee.account,
								mobile: eeee.mobile,
								name: eeee.name,
								departmentId: eeee.departmentId,
								departmentCode: eeee.departmentCode,
								roleId: eeee.roleId,
								jobStatus: eeee.jobStatus,
								jobStatusText: eeee.jobStatusText,
								expandForm: eeee.expandForm,
							}
						})
					}).catch((error) => {
						self.setState({
							loading: false
						})
					});
				}
			}
		});
	}
	setChange = (val) => {
		var value = val.split("=")[0];
		var msaLevel = val.split("=")[1];
		var arr1 = [];
		e1(arr1, value, this.state.personData);
		if (!val) {
			this.setState({
				validateStatus3: "error",
				departmentId: "",
				departmentName: "",
				departmentNameUpdate: "",
			})
		}
		else {
			if ((arr1.length > 0)) {
				this.setState({
					showErrorText1: ""
				})
				var depatname=fetchNodeType(arr1[0].nodeType,arr1[0].name)
				this.setState({
					validateStatus3: "success",
					departmentId: value,
					departmentName: depatname,
					departmentNameUpdate: arr1[0].name,
				})

			}
			this.setState({
				nodeType:msaLevel
			})
		}
		self.fetchRole()
	}
	setAccountname = (e) => {
		if (e.target.value !== "") {
			var specialText=/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\s]/g;
			var isNormalAccount=/[a-zA-Z][a-zA-Z0-9_]{2,15}/g;
			if(specialText.test(e.target.value)){
				message.warning("用户名包含非法字符");
				this.setState({
					validateStatus1: "error"
				})
			}
			var isNormalAccount1=isNormalAccount.test(e.target.value);
			if(!isNormalAccount1){
				message.warning("用户名必须字母开头，长度3-16，允许字母数字下划线");
				this.setState({
					validateStatus1: "error"
				})	
			}
			if(specialText.test(e.target.value) || !isNormalAccount1){}
			else {
				this.setState({
					validateStatus1: "success"
				})
			}
		} else {
			this.setState({
				validateStatus1: "error"
			})
		}
	}
	setMobilename = (e) => {
		if (e.target.value !== "") {
			if (!(/^1[0-9]{10}$/.test(e.target.value))) {
				this.setState({
					validateStatus0: "error"
				})
			}
			else {
				this.setState({
					validateStatus0: "success"
				})
			}
		} else {
			this.setState({
				validateStatus0: "error"
			})
		}
	}
	
	setRole = (value) => {
		if (!value) {
			this.setState({
				validateStatus4: "error"
			})
		}
		else {
			this.setState({
				validateStatus4: "success"
			})
		}
	}
	cancel = () => {
		var eeee = self.props.location.state;
		hashHistory.push({
			pathname: '/main/staffmanage',
			state: {
				current: eeee.current,
				account: eeee.account,
				mobile: eeee.mobile,
				name: eeee.name,
				departmentId: eeee.departmentId,
				departmentCode: eeee.departmentCode,
				roleId: eeee.roleId,
				jobStatus: eeee.jobStatus,
				jobStatusText: eeee.jobStatusText,
				expandForm: eeee.expandForm,
			}
		})
	}
	
	fetchDepartment1(){
		$jsonp3(self,api.commonFilterData,{}).then((res) => {
			var list=[];
			var post1=res.data.response.msaInfo;
			
			if(post1.nodeType=="3"){
				post1.isLeaf=true
			}else{
				post1.isLeaf=false
			}
			list[0]=post1;
			if(self.props.location.state.top == "add"){
				//根据是否是新增初始化选择
				var returnDiv=fetchNodeType(post1.nodeType,post1.name);
				this.setState({
					departmentName:returnDiv,
					departmentId: post1.id,
					departmentNameUpdate: post1.name,
				});
			}
			this.setState({
				department:list,
				msaInitInfo:post1,
				personData:list,
			},()=>{
			});
		});
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
					department:[...this.state.personData],
					personData:[...this.state.personData],
				},()=>{
				});

				resolve();
				
			});
			
		});
    }
    back() {
        window.history.back();
    }

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 7 },
			wrapperCol: { span: 17 },
		};
		return (
			<div className={stylez.wrapPadding}>

                <Breadcrumb separator=">" style={{textAlign: "left"}}>
                    <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="main/staffmanage">账号管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{self.props.location.state.top == "add" ? "新增账号" : "编辑账号"}</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} className={styles2.returnbackbutton}
                        style={{marginTop: 15}}>返回</Button>
                <div className={publicstyle.clearfloat}></div>
                <Form onSubmit={this.handleSubmit} className={styles.addstaff}>

                    <FormItem label="手&nbsp;机&nbsp;号&nbsp;：" {...formItemLayout}
                              validateStatus={this.state.validateStatus0} hasFeedback>
                        {getFieldDecorator('addMobile', {
                            rules: [{required: true, message: '输入不能是空'}],
                            initialValue: this.state.mobile
                        })(
                            <Input type="text" onChange={this.setMobilename} disabled={this.state.disabled}/>
                        )}
                    </FormItem>
                    <FormItem label="用&nbsp;户&nbsp;名&nbsp;：" {...formItemLayout}
                              validateStatus={this.state.validateStatus1} hasFeedback>
                        {getFieldDecorator('addAccount', {
                            rules: [{required: true, message: '输入不能是空'}],
                            initialValue: this.state.account
                        })(
                            <Input type="text" onChange={this.setAccountname}/>
                        )}
                    </FormItem>
                    <FormItem label="人员姓名：" {...formItemLayout} hasFeedback>
                        {getFieldDecorator('addName', {
                            rules: [{required: true, message: '输入不能是空'}],
                            initialValue: this.state.name
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>




					<FormItem label="" {...formItemLayout} validateStatus={this.state.validateStatus3} hasFeedback >
						<span className={styles.bitian + " " + styles.bitian2}><i></i>所在部门：</span>
						{/* <Singlepersonselect value={this.state.departmentName} onChange={this.setChange} multiple={false} personData={this.state.personData} /> */}
						<TreeSelect
					 	loadData={this.onTreeLoadData}
						showSearch
						treeNodeFilterProp="pops"
						
						value={this.state.departmentName?this.state.departmentName:""}
						dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
						placeholder="请选择"
						allowClear
						multiple={false}
						dropdownMatchSelectWidth={false}
						onChange={this.setChange}
                            style={{width:245}}
						>
						{loop(this.state.personData)}

					</TreeSelect>
						<label className={styles.xuanzeTishi}>{this.state.showErrorText1}</label>
					</FormItem>


					<FormItem label="系统角色：" {...formItemLayout} validateStatus={this.state.validateStatus4} hasFeedback>
						{getFieldDecorator('addRoleName', {
							rules: [{ required: true, message: '输入不能是空' }],
							initialValue: this.state.roleName
						})(
							<Select className={styles.selectrole} onChange={this.setRole}>
								{this.state.options1}
							</Select>
							)}
					</FormItem>
                    <div className={styles.tooltip}
                         style={{display: self.props.location.state.top == "add" ? "block" : "none"}}>
						<Icon className={styles.tup1} type="exclamation-circle-o" />新增人员的默认密码: 123456789
							</div>
					<FormItem>
                        <Button type="primary" size="large" htmlType="submit"
                                className={publicstyle.button + " " + styles.button} loading={this.state.loading}>
							保存
			          </Button>
						<Button size="large" className={publicstyle.button + " " + styles.button} onClick={this.cancel}>
							取消
			          </Button>

					</FormItem>
				</Form>

			</div>

		)
	}
}
const AddstaffForm = Form.create()(Addstaff);
export default AddstaffForm;

