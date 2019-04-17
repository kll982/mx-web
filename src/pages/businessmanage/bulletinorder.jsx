import React from 'react';
import { Breadcrumb, Input, Button, Table,Select,Spin, message, Modal,Tree} from 'antd';
import {Link, hashHistory} from 'react-router';
const Option = Select.Option;
const { TextArea } = Input;
import $ from 'jquery'

import beard from '../../img/Breadcrumbsymbol.jpg'
import publicstyle from '../../img/public.less'
import styles from './bulletinorder.less'
import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from '../../utils/api.js';

import companypng from "../../img/company.png"
import departmentpng from "../../img/department.png"
import emppng from "../../img/emp.png"
const TreeNode = Tree.TreeNode;
import Container from './bulletinContainer';

let self;
let arr4=[];
var arr5={};
let arr0=[];
let arr9=[];

function e0(arr,items,key){
	if(items.children.length > 0){
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

export default class departmentset extends React.Component {
	constructor(props) {
	    super(props);
	    self=this;
	    this.changedata=[];
	    this.state={
	    	visible:false,
	    	loading:true,
	    	buttondisabled:false,
	    	value: undefined,	
	    	addHighDeprtment:"",
	    	addLowDeprtment:"",
	    	addLocation:"",
	    	addDescription:"",
	    	stopArr:{},
	    	dragable:true,
	    	data:[],
	    	editing:false
    	
    		
	    }
	    
	}
 
	componentWillMount(){
		self.setState({
			loading:false,
		})
		self.setState({
			data:[{type:"1",id:1,title:"111"},{type:"2",id:2,title:"qwweee"}]
		})
		$jsonp3(self, api.articleList4Manage, {
			title: self.trim(self.state.title),
		  }).then((res) => {
			console.log("list", res);
			var resda = res.data.response.list;
			for(var k1=0;k1<resda.length;k1++){
			  resda[k1].key=resda[k1].id;
			  resda[k1].index=k1+1;
			}
			self.setState({
			  data: resda,
			},()=>{
			  console.log(self.state.data)
			});
			self.setState({
			  loading: false
			});
		  });
		  return
		$jsonp(self,api.getAllCompanyDepartmentTree,{}).then((res) => {
			console.log(res);
			var departArr=res.data.response.MsaInfoList;
			self.setState({
				departArr:res.data.response.MsaInfoList
			});
			self.setState({
				loading:false,
			})
			var ee=JSON.stringify(departArr[0].children);
			var ee1=JSON.parse(ee);
			if (ee1){
				 ee1.map(( item,index) => {
				 	item.children="";
				 	item.key=index;
				 });
				 var data=ee1;
			}else{
				var data=[];
			}
			self.setState({
				data,
				departArr,
				selectedKeys:departArr[0].id
			});

		})

	}
	showTree1(){
		$jsonp(self,api.getAllCompanyDepartmentTree,{}).then((res) => {
			console.log(res);
			this.setState({
				departArr:res.data.response.MsaInfoList
			});

		})
	}
	componentDidMount(){
		  
	}
	onSelect = (selectedKeys, info) => {
	    console.log('selected', selectedKeys, info);
	    this.changedata=[];
	    if(selectedKeys.length == 0){
	    	this.setState({
		    	buttondisabled:true,
		    	data:[]
		    })
		    return
	    }
	    else{
	    	this.setState({
		    	buttondisabled:false
		    })
	    }
	    var arr1=[];
    	e1(arr1,selectedKeys[0],this.state.departArr);
	    var ee=JSON.stringify(arr1[0].children);
		var ee1=JSON.parse(ee);
		if (ee1){
			 ee1.map(( item) => {
			 	item.children="";
			 });
			 var data=ee1;
		}else{
			var data=[];
		}
		this.setState({
			data,
			arr1,
			selectedKeys
		})

	}
	

    edit = (selectedKeys) => {
    	this.setState({
    		dragable:true,
    		editing:true
    	})
    }
    save =(selectedKeys) => {
    	if(this.changedata.length == 0) {
    		Modal.success({
				content:"保存该部门排序成功"
			});
    		return this.setState({dragable:false, editing:false})
    	}
    	for( var k0 = 0;k0<this.changedata.length; k0++){
    		this.changedata[k0].orderNum = k0 + 1;
    	}
    	console.log(this.changedata);
    	/*
    		$jsonppost(self,api.companysort,{
	  			jsonString:JSON.stringify(this.changedata)
	  		}).then((res) => {
	  			console.log(res);
	  			this.showTree1();
	  			this.setState({data:this.changedata,editing:false,dragable:false})
	  		})
    	 */

  		$.ajax({
			url: api.articleSort,
		 	type: "post",
		 	xhrFields: {
		 		withCredentials: true
		 	},
		 	data: {
		 		jsonString:JSON.stringify(this.changedata)
		 	},
		 	success: function (res) {
				console.log(res);
		 		if(res.code==200){
		 			Modal.success({
	  					content:"保存该部门排序成功"
	  				});
		 			self.showTree1();
	  				self.setState({data:self.changedata,editing:false,dragable:false})

		 		}else if(res.code==500){
		 			self.setState({
		 				loading:false
		 			})
		 			message.info(res.message)
		 		}else if(res.code==600){
		 			self.setState({
		 				loading:false
					})
		 			Modal.info({
		 				title:"提示",
						content:"您还未登录",
						okText:"去登录",
		 				onOk:function(){
							hashHistory.push("/")
						}
		 			})
				}else if(res.code==700) {
					message.info("权限不足")
		 			self.setState({
		 				loading:false
					})
		 		}else{
					message.info("网络错误")
		 			self.setState({
		 				loading:false
					})
		 		}
		 	},
		 	error: function (error) {

		 	}
		})
    }
    cancel =() => {
    	Modal.confirm({
			content:"确定取消本次操作",
			onOk:function(){
				self.setState({editing:false,dragable:false})
			}
		});
    }
    back = () => {
    	hashHistory.push({
	      pathname: '/main/bulletin'
	    });
    }

    setGunDong1 = (changedata) => {
    	this.changedata=changedata;
    }
	
   
   

   
	
	
	render() {
		const loop = data => data.map((item) => {
			if (item.children && item.children.length) {
				var ptitle="";
				var itemName=item.name;
				if(itemName.length>25){itemName=itemName.substring(0,25)+"...";}
				if(item.nodeType==1){
					ptitle=<span><img src={companypng} className={styles.qicon}/>{itemName}</span>;
				}else if(item.nodeType==2){
					ptitle=<span><img src={departmentpng} className={styles.qicon}/>{itemName}</span>;
				}else if(item.nodeType==3){
					ptitle=<span><img src={emppng} className={styles.qicon}/>{itemName}</span>;
				}
				return <TreeNode title={ptitle} key={item.id}>{loop(item.children)}</TreeNode>;
			}
			var ptitle="";
			var itemName=item.name;
			if(itemName.length>25){itemName=itemName.substring(0,25)+"...";}
			if(item.nodeType==1){
				ptitle=<span><img src={companypng} className={styles.qicon}/>{itemName}</span>;
			}else if(item.nodeType==2){
				ptitle=<span><img src={departmentpng} className={styles.qicon}/>{itemName}</span>;
			}else if(item.nodeType==3){
				ptitle=<span><img src={emppng} className={styles.qicon}/>{itemName}</span>;
			}
			return <TreeNode title={ptitle} key={item.id} value={item.id.toString()}/>;
	    });
		return (
			<Spin spinning={this.state.loading}>
			<div>
			  <Breadcrumb separator=">">
			    <Breadcrumb.Item>系统管理</Breadcrumb.Item>
			    <Breadcrumb.Item><Link to="main/departmentset">部门管理</Link></Breadcrumb.Item>
			    <Breadcrumb.Item>部门排序</Breadcrumb.Item>
			  </Breadcrumb>
			  <div className={publicstyle.clearfloat}></div>
			  
			  
			   <div className={styles.setdepart}>
					<Button type="primary" className={publicstyle.button+" "+styles.button} onClick={this.save.bind(this,this.state.selectedKeys)} disabled={this.state.buttondisabled}>保存</Button>
			    	<Button type="primary" className={publicstyle.button+" "+styles.button} onClick={this.back.bind(this,this.state.selectedKeys)}>返回</Button>
			    </div>
			   
			    
			    <div style={{display:"flex",marginTop:"20px"}}>
			    	{this.state.departArr?
					     <Tree
	                		defaultExpandAll
					        defaultSelectedKeys={[this.state.departArr[0].id.toString()]}
					        onSelect={this.onSelect}				      
					        className={styles.tree}
	               
	              		  >
			             {loop(this.state.departArr)}
			            </Tree>:""}
			            <div className={styles.table}>
			            {this.state.data.length>0?<Container key={this.state.random1} data={this.state.data} dragable={this.state.dragable} setGunDong1={this.setGunDong1.bind(this)}/>:<div style={{padding:"20px 10px",fontSize:"20px",textAlign:"center"}}>暂无部门</div>}
			            </div>
			    </div>
			</div>
			</Spin>

		)
	}
}
