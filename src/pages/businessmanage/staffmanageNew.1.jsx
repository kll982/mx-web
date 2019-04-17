import React from 'react';
import {Link, hashHistory} from 'react-router';
import { Pagination, Breadcrumb, Row, Col, Input,Select, Button,Tag, Table, Spin,Icon, Modal} from 'antd';
import Singlepersonselect from '../../components/singlepersonselect1.jsx'
const Option = Select.Option;
import $jsonp from '../../utils/service.js'
import api from '../../utils/api.js'
import publicstyle from '../../img/public.less'
import styles from './staffmanageNew.less'
import beard from '../../img/Breadcrumbsymbol.jpg'

import companypng from "../../img/company.png"
import departmentpng from "../../img/department.png"
import emppng from "../../img/emp.png"
import styles1 from "../../components/common.less"

let self;
var jobstatusArray=['全部','离职','停职', '在职'];
var jobstatusArr=['',-1,0,1];

function e2(arr,items,key){
	if(items.children && items.children.length > 0){
		items.children.map((itemss,indexss) => { 
		  if(itemss.id == key){
		      arr.push(itemss);
		  }
		  e2(arr,itemss,key);
		})
	}
}

function e1(arr,key,departsArr){
  departsArr.map((item,index) => {
    if(item.id == key){
      arr.push(item);
    }
    e2(arr,item,key);
  })
}

function e4(arr,items,key){
	if(items.children && items.children.length > 0){
		items.children.map((itemss,indexss) => {
		  if(itemss.id == key){
		      arr.push(items);
		  }
		  e4(arr,itemss,key);
		})
	}
}

function e3(arr,key,departsArr){
  departsArr.map((item,index) => {
    if(item.id == key){
      arr.push(item);
    }
    e4(arr,item,key);
  })
}

function findCompanyLoop(arr,items,key,departsArr){
	if(items.children && items.children.length > 0){
		items.children.map((itemss,indexss) => {
		  if(itemss.id == key){
					
					if(itemss.nodeType==1){
						arr.push(itemss);
					}
					else{
						findCompanyLoop(arr,itemss,key,departsArr);
					}
		  }
		  findCompanyLoop(arr,itemss,key,departsArr);
		})
	}
}

function findCompany(arr,key,departsArr){
  departsArr.map((item,index) => {
		arr.push(item);
    if(item.id == key){
     
    }
    findCompanyLoop(arr,item,key,departsArr);
  })
}


export default class Employeemanage extends React.Component {
	constructor(props) {
	    super(props);
	    self=this;
	    this.state = {
	      current:1,
	      total:30,
	      accountname:"",
	      name:"",
	      departmentId:"",
	      departmentCode:"",
	      roleId:"",
	      jobStatus:"",
	      loading:true,
	      options1:[],
	      role:[],
	      department:[],
	      jobStatusText:"全部",
	      roleIdText:"",
				departmentIdText:[],

				treedata1:[],
				treedata2:[],
				expandForm: false,
	    }
	}
	componentWillMount(){

	      this.fetchDepartment();
	      this.fetchRole();
	      if(self.props.location.state && self.props.location.state.current){
	      	var quer=self.props.location.state;
	      	this.setState({
	      	current:quer.current,
					accountname:quer.account,
			    name: quer.name,
			    departmentId: quer.departmentId,
					departmentCode: quer.departmentCode,
					roleId: quer.roleId,

			    jobStatus: quer.jobStatus,
			    jobStatusText:quer.jobStatusText
	      	},() => {
	      		self.loadData(quer.current-0,10)
	      	});
		    
	      }else{
	      	this.loadData(1,10);
	      }

	      
		
	}
	componentDidMount(){
		
	}
	reset = () => {
		this.setState({
			accountname:"",
			name:"",
			departmentId:"",
			departmentCode:"",
			roleId:"",
			jobStatus:"",
			jobStatusText:"全部",
			roleIdText:"",
			departmentIdText:[],

	    },() => self.loadData(1,10));

	}

	fetchDepartment(){
		$jsonp(self,api.getAllCompanyDepartmentTreeInUse,{}).then((res) => {
			console.log("tree",res);
			var list=res.data.response.companyDepartmentList;
			sessionStorage.setItem("getAllDepartment", JSON.stringify(list));
			console.log(list)
			this.setState({
				department:list,
				treedata2:list,
			});
			if(self.props.location.state && self.props.location.state.departmentId){
				var arr1=[];
				e1(arr1,self.props.location.state.departmentId,list);
				if(!arr1){}
				else{
					this.setState({
						departmentIdText:<div><img src={departmentpng} className={styles1.qicon}/>{arr1[0].name}</div>
					});
				}
			}
			
			

		});
	}
	fetchRole(){
		 $jsonp(self,api.getAll,{}).then((res) => {
			console.log(res);
			var list=res.data.response.allRoleList;
			sessionStorage.setItem("getAllRole",JSON.stringify(list));
			self.setState({
				role:list
			});
			var options1 = list.map((domain) => {
				return <Option key={domain.id} value={domain.name}>{domain.name}</Option>;
			});
			
			self.setState({
				options1,
			});
			if(self.props.location.state && self.props.location.state.current){
				for(var k0=0; k0<list.length; k0++){
					if(self.props.location.state.roleId == list[k0].id){
						self.setState({
							roleIdText: list[k0].name
						});
					}
				}
				
			}

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

	setAccountname = (e) => {
		var value=e.target.value;
		value=value.replace(/[^\d-]/g, ""); 
		if(value.length>11){
			return
		}
	  this.setState({
		 accountname:value
	  })
	}
	setPersonname = (e) => {
		var value=e.target.value;
		if(value.length>50){
			return
		}
	  this.setState({
		 name:value
	  })
	}

	setrole = (value) => {

		for(var k0=0; k0<this.state.role.length; k0++){
			if(this.state.role[k0].name == value){
				console.log(this.state.role[k0])
				this.setState({
					roleId:this.state.role[k0].id,
					roleIdText:value
				});
			}
		}
	}
	setjobStatus = (value) => {
		
	
		for(var k0=0; k0<jobstatusArray.length; k0++){
			if(jobstatusArray[k0] == value){
				this.setState({
					jobStatus:jobstatusArr[k0],
					jobStatusText:value
				});
			}
		}
	}
	trim=(str)=>{ //删除左右两端的空格
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	queryProfitOfCondition = () => {
		

		self.loadData(1,10);
	}


	loadData = (page,pageSize) => {
		self.setState({
	      loading: true
		});
		var self1=self;
	    $jsonp(self,api.getCompanyEmployeeByPage,{
			pageNo: page,
			pageSize: pageSize,
			account: self.trim(self.state.accountname),
		    name: self.trim(self.state.name),
		    departmentId: self.state.departmentId,
		    code:self.state.departmentCode,
		    roleId: self.state.roleId,
		    jobStatus: self.state.jobStatus,
		  }).then((res) => {
					console.log("list",res);
					var currentItemLength=(res.data.response.page.pageNum-1)*(res.data.response.page.pageSize);
					var resda=res.data.response.companyEmployeeList;
					var resdatashowing=[];
					for(var k0 =0; k0< resda.length; k0++){
							let obj={};
							for(let p in resda[k0]){
								obj[p]=resda[k0][p];
							
							}
							obj.index=currentItemLength+k0;
							obj.key=resda[k0].id;
							resdatashowing.push(obj);
					}
					self.setState({
						data:resdatashowing,
						page:res.data.response.page,
						current: res.data.response.page.pageNum,
						totalPage: res.data.response.page.pages,
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
	    self.loadData(1,this.state.page.pageSize)
	}
	toLast = () => {
	  self.loadData(this.state.page.pages, this.state.page.pageSize);
	}

	
	edit = (addoredit, record) => {
		if(addoredit == "edit"){
			sessionStorage.setItem("staffmanage", JSON.stringify(record));
		}
		
		hashHistory.push({
	      pathname: '/main/addstaff',
	      state:{
	      	top:addoredit,
	      	current:self.state.current,
					account:self.state.accountname,
		    	name: self.state.name,
		    	departmentId: self.state.departmentId,
					departmentCode: self.state.departmentCode,
		    	roleId: self.state.roleId,
					jobStatus: self.state.jobStatus,
					jobStatusText: self.state.jobStatusText
	      }
	  })
		
	    
	}

	stop = (record, argu) => {
		console.log(record.id);
		console.log(record);
		var statusargu;
		if(argu == 1){ statusargu="复职"+record.name }
		else if(argu == 0){ statusargu="停职"+record.name }
		else if(argu == -1){ statusargu="离职"+record.name }
		Modal.confirm({
			content:`确定${statusargu}？`,
			onOk:function(){
				$jsonp(self,api.upDateJobStatus,{
					id:record.id,
					account:record.account,
					jobStatus:argu,
				}).then((res) => {
					self.loadData(self.state.current-0,10);
				});
			}
		});
		
	}

	renderSimpleForm() {
    return (
      <Row className={styles.antrow1}>
			      <Col span={8}><span style={{paddingRight: 10}}>账&nbsp;&nbsp;户&nbsp;&nbsp;名:</span>
			      	<Input type="text" style={{width: "50%"}} onChange={this.setAccountname} value={this.state.accountname}/>
			      </Col>
			      <Col span={8}><span style={{paddingRight: 10}}>员工姓名:</span>
			      	<Input type="text" style={{width: "50%"}} onChange={this.setPersonname} value={this.state.name}/>
			      </Col>
						<Col span={8}>
							<Button type="primary" className={publicstyle.button} onClick={this.queryProfitOfCondition}>查询</Button>
							<Button type="default" className={publicstyle.cancelbutton} style={{marginLeft:"20px"}} onClick={this.reset}>重置</Button>
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
					<Col span={8}><span style={{paddingRight: 10}}>账&nbsp;&nbsp;户&nbsp;&nbsp;名:</span>
						<Input type="text" style={{width: "50%"}} onChange={this.setAccountname} value={this.state.accountname}/>
					</Col>
					<Col span={8}><span style={{paddingRight: 10}}>员工姓名:</span>
						<Input type="text" style={{width: "50%"}} onChange={this.setPersonname} value={this.state.name}/>
					</Col>
					<Col span={8}><span style={{paddingRight: 10}}>员工状态:</span>
						<Select value={this.state.jobStatusText} style={{ width: "50%" }} placeholder="请选择状态" onChange={this.setjobStatus}>
						<Option value="全部">全部</Option>
						<Option value="离职">离职</Option>
						<Option value="停职">停职</Option>
						<Option value="在职">在职</Option>
					</Select>
				</Col>
					
				
					
			</Row>
			<Row className={styles.antrow1}>
				<Col span={8}><span style={{paddingRight: 10}}>所属角色:</span>
				{this.state.role.length>0?<Select value={this.state.roleIdText} style={{ width: "50%" }} placeholder="请选择角色" onChange={this.setrole}>{this.state.options1}</Select>:<Select style={{ width: "50%" }}></Select>}
				</Col>					
				<Col span={8}><span style={{paddingRight: 10}}>所属部门:</span>
					<Singlepersonselect onChange={this.setDepartmentid} value={this.state.departmentIdText} multiple={false} personData={this.state.treedata2} className={styles.singleSelect} />
				</Col>
				<Col span={8}>
					<Button type="primary" className={publicstyle.button} onClick={this.queryProfitOfCondition}>查询</Button>
					<Button type="default" className={publicstyle.cancelbutton} style={{marginLeft:"20px"}} onClick={this.reset}>重置</Button>
					<a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
					收起 <Icon type="up" />
					</a>
				</Col>
			
			</Row>
		</div>
    );
  }
	toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
	};
	renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }
	render() {
		const columns = [{
		  title: '员工编号',
		  dataIndex: 'index',
		  key: 'index',
			className:publicstyle.center,
			width:"100px",
		  render: (text) => { return <span>{text+1}</span> }
		},
		{
		  title: '手机号',
		  dataIndex: 'account',
		  key: 'account',
		  width:"130px",
		  className:publicstyle.center
		}, {
		  title: '员工姓名',
		  dataIndex: 'name',
			key: 'name',
			width:"150px",
		  className:publicstyle.center,
		}, 
		{
		  title: '所在部门',
		  dataIndex: 'departmentName',
		  key: 'departmentName',
		  className:publicstyle.center,
		},
	  {
		  title: '系统角色',
		  dataIndex: 'roleName',
		  key: 'roleName',
		  className:publicstyle.center,
		}, {
		  title: '员工状态',
		  dataIndex: 'jobStatus',
			key: 'jobStatus',
			width:"100px",
		  className:publicstyle.center,
		  render: (text) => {
		  	if( text == -1){ return <div><Tag color="red">离职</Tag></div> }
		  	else if( text == 0){ return <div><Tag color="orange">停职</Tag></div> }
		  	else if( text == 1){ return <div><Tag color="blue">在职</Tag></div> } 
		  	else if( text == 2){ return <div><Tag color="orange">等待</Tag></div> } 
		  	else if( text == 3){ return <div><Tag color="orange">拒绝</Tag></div> }
		  }
		},  {
		  title: '操作',
		  key: 'action',
			className:publicstyle.center,
			width:"300px",
		  render: (text, record, index) => {
		  	if(record.jobStatus == -1){
		    	return <div></div>   
		    }
		    else if(record.jobStatus == 0){
		    	return <div style={{textAlign:"center", cursor:"pointer"}}>
						<Button type="primary" style={{marginRight:10}} onClick={this.edit.bind(this,"edit",record)}>编辑</Button>
						<Button type="primary" style={{marginRight:10}} onClick={this.stop.bind(this,record,1)}>复职</Button>
						<Button type="danger" onClick={this.stop.bind(this,record,-1)}>离职</Button>
		    	</div>
		    }
		    else if(record.jobStatus == 1){
		    	return <div style={{textAlign:"center", cursor:"pointer"}}>
						<Button type="primary" style={{marginRight:10}} onClick={this.edit.bind(this,"edit",record)}>编辑</Button>
						<Button type="danger" className={styles.orange} style={{marginRight:10}} onClick={this.stop.bind(this,record,0)}>停职</Button>
						<Button type="danger" onClick={this.stop.bind(this,record,-1)}>离职</Button>
		    	</div>   
		    }
		    
		  },
		}];
{}
		
		return (
			 <Spin spinning={this.state.loading}>
				  <Breadcrumb separator=">">
				   <Breadcrumb.Item>系统管理</Breadcrumb.Item>
				    <Breadcrumb.Item>员工管理</Breadcrumb.Item>
				    
				  </Breadcrumb>
				  <div className={publicstyle.clearfloat}></div>

			 
			    <Row className={styles.antrow1}>
			    	<Col>
			    		<Button type="primary" className={publicstyle.button} onClick={this.edit.bind(this,"add")}><Icon type="plus"/>新增员工</Button>
			    	</Col>
			    </Row>
					{this.renderForm()}
			    {/* <Row className={styles.antrow1}>
			      <Col span={8}><span style={{paddingRight: 10}}>账&nbsp;&nbsp;户&nbsp;&nbsp;名:</span>
			      	<Input type="text" style={{width: "50%"}} onChange={this.setAccountname} value={this.state.accountname}/>
			      </Col>
			      <Col span={8}><span style={{paddingRight: 10}}>员工姓名:</span>
			      	<Input type="text" style={{width: "50%"}} onChange={this.setPersonname} value={this.state.name}/>
			      </Col>
						<Col span={8}><span style={{paddingRight: 10}}>员工状态:</span>
			     	 <Select value={this.state.jobStatusText} style={{ width: "50%" }} placeholder="请选择状态" onChange={this.setjobStatus}>
							<Option value="全部">全部</Option>
				      <Option value="离职">离职</Option>
				      <Option value="停职">停职</Option>
				      <Option value="在职">在职</Option>
				    </Select>
				  </Col>
			      
			     
			      
			    </Row>
			    <Row className={styles.antrow1}>
				  <Col span={8}><span style={{paddingRight: 10}}>所属角色:</span>
				  {this.state.role.length>0?<Select value={this.state.roleIdText} style={{ width: "50%" }} placeholder="请选择角色" onChange={this.setrole}>{this.state.options1}</Select>:<Select style={{ width: "50%" }}></Select>}
				  </Col>					
					<Col span={8}><span style={{paddingRight: 10}}>所属部门:</span>
						<Singlepersonselect onChange={this.setDepartmentid} value={this.state.departmentIdText} multiple={false} personData={this.state.treedata2} className={styles.singleSelect} />
					</Col>
					<Col span={8}>
						<Button type="primary" className={publicstyle.button} onClick={this.queryProfitOfCondition}>查询</Button>
						<Button type="default" className={publicstyle.cancelbutton} style={{marginLeft:"20px"}} onClick={this.reset}>重置</Button>
					</Col>
				  
			    </Row> */}
			    {this.state.data && this.state.page ? <div><Table columns={columns} dataSource={this.state.data} bordered={true} pagination={false} style={{textAlign:"center"}}/>
			     <Button type="primary" className={styles.pageFirst} style={{display:this.state.page.pages>0?"block":"none"}} onClick={this.toFirst}>首页</Button>
			     <Pagination className={styles.page} style={{display:this.state.page.pages>0?"block":"none"}} onChange={this.onPageChange} showFISRT current={this.state.current} pageSize={this.state.page.pageSize} total={this.state.page.total} />
    			 <Button type="primary" className={styles.pageLast} style={{display:this.state.page.pages>0?"block":"none"}} onClick={this.toLast}>末页</Button></div>: <div></div>}
			   

	    		
			</Spin>

		)
	}
}