import React from 'react';
import {Menu, Icon, Switch, Layout} from 'antd';
import {allMenu} from "../utils/menu9.js";
import {Link,hashHistory} from 'react-router';
import con from './index.less';
import logo from "../img/logoandtext.png";
import logotop from "../img/logotop.png";
import aimg1logo from "../img/aimg1logo.png";
import sg from "../img/sg.png";
import kefu from "../img/kefu.png";
import deleteali from "../img/deleteali.png";
import $jsonp from "../utils/service.js";
import api from "../utils/api.js";
import { connect } from 'react-redux';
import store from '../routes/reactredux-reducer.js';
import $ from "jquery";
require("./jquery.cookie.js");
const SubMenu = Menu.SubMenu;
const {Header, Sider, Content} = Layout;

let self1;

Function.prototype.bind = function () {
  var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift();
  return function () {
      return fn.apply(object,
          args.concat(Array.prototype.slice.call(arguments)));
  };
};
function mapStateToProps(state) {
	return {
	  openkeysIntSet: state.count,
	  selectkeysIntSet: state.selectedKeys
	}
}
function mapDispatchToProps(dispatch) {
	return {
		onIncreaseClick1: () => dispatch({ type: 'increase',filter:self1.state.openKeys,selectedKeys:self1.state.selectedKeys}),
    onDereaseClick1: () => dispatch({ type: "decrease",filter:self1.state.openKeys,selectedKeys:self1.state.selectedKeys}),
    onNormalClick1: () => dispatch({ type: "normal",filter:self1.state.openKeys,selectedKeys:self1.state.selectedKeys})
	}
}
//redux结束

var firstMenuArray=["105","101","102","103","106","104"];
var firstMenuArrayShouming=["交易中心","票据估价","库存票据管理","财务管理","客户管理","企业管理"];

var secondMenuArray105=["105100","105101"];
var secondMenuArray105Shouming=["买票交易订单","卖票交易订单"];

var secondMenuArray101=["101101","101100","101103","101102","101104"];
var secondMenuArray101Shouming=["电票估价参数","纸票估价参数","特价票估价参数","银行分类设置","买进机会"];

var secondMenuArray102=["102100","102101","102103","102102","102104"];
var secondMenuArray102Shouming=["票据入库","票据出库","退票入库","库存票据","库存预订"];
var secondMenuArray103=["103100","103101","103102"];
var secondMenuArray103Shouming=["待收账款","待付账款","预收定金"];

var secondMenuArray106=["106100","106101","106102","106103"];
var secondMenuArray106Shouming=["客户列表","客户白名单","客户黑名单","潜在用户管理"];

var secondMenuArray104=["104100","104102","104103","104101","104104"];
var secondMenuArray104Shouming=["基本信息","部门设置","角色权限设置","员工管理","交易户管理"];

function resetmenu(array){
  var empty=[];
  for(var tt=0; tt<array.length; tt++){
    if(array[tt].code.length==3 && array[tt].name !== "工作台"){
      let aside1=array[tt].code;
      if(array[tt].name=="电票交易订单"){array[tt].name="交易中心"}
      var newaff=equalObj(array[tt]);
      
      var newaffchildren=[];
      for(var tt1=0; tt1<array.length; tt1++){
        if(array[tt1].code.length==6 && isContains(array[tt1].code,aside1)){
          newaffchildren.push(array[tt1])
        }
      }
      if(aside1=="105"){ newaffchildren.sort(NumDescSort(secondMenuArray105)); }
      else if(aside1=="101"){ newaffchildren.sort(NumDescSort(secondMenuArray101)); }
      else if(aside1=="102"){ newaffchildren.sort(NumDescSort(secondMenuArray102)); }
      else if(aside1=="103"){ newaffchildren.sort(NumDescSort(secondMenuArray103)); }
      else if(aside1=="106"){ newaffchildren.sort(NumDescSort(secondMenuArray106)); }
      else if(aside1=="104"){ newaffchildren.sort(NumDescSort(secondMenuArray104)); }
      
      newaff.children=newaffchildren;
      empty.push(newaff)
    }
  }
  empty.sort(NumDescSort(firstMenuArray));
  return empty
}
function NumDescSort(compareArray){
  return function(o,p){
    var c=0;
    var d=0;
    for(var tt1=0; tt1<compareArray.length; tt1++){
      if(compareArray[tt1]==o.code){
          c=tt1
      }
    }
    for(var tt1=0; tt1<compareArray.length; tt1++){
        if(compareArray[tt1]==p.code){
            d=tt1
        }
    }
    return c - d;
  }
}
function isContains(str, substr) {
  return str.indexOf(substr) == 0;
}
function equalObj(obg){
  var empt={};
  for(var p in obg){
    empt[p]=obg[p]
  }
  empt.children=[];
  return empt
}
var height100;
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark',
      openKeys:[],
      selectedKeys:[],
      collapsed: false,
      userName:"",
      roleName:"",
      companyName:"",
      userId:"",
      mode: 'inline',
      allMenu:[],
      height100:"",
    }
  }
  
  componentWillMount(){
    self1=this;
    height100 = document.body.clientHeight;
    self1.setState({
      height100:height100+"px !important"
    })
    console.log(this.state.height100)

}
componentDidMount() {
   let self=this;
   let s1= JSON.parse(sessionStorage.getItem("userInfo"));
   let s= JSON.parse(localStorage.getItem("userInfo"));
   let menus=JSON.parse(localStorage.getItem("userMenu"));
   let userId=JSON.parse(localStorage.getItem("userMenu"));
   var isroot=localStorage.getItem("isroot");

   var p11=sessionStorage.getItem("selectedKeys");
   if(!p11){
    sessionStorage.setItem("selectedKeys", JSON.stringify(["main/home"]));
   }

  //  var emptyarray=[];
  //  emptyarray=resetmenu(menus);
  //  var shouyeArray=[{
  //     children:null,code:"1",icon: 'home', id:1,name:"首页",parCode:"1",url:"main/home"
  //  }];
  //  var produceArray=shouyeArray.concat(emptyarray);
  //  var newEnjf={};
  //  for(var suttyindex0=1;suttyindex0<produceArray.length; suttyindex0++){
    
  //    for(var suttyindex01=0;suttyindex01<firstMenuArray.length; suttyindex01++){
  //       if(produceArray[suttyindex0].code==firstMenuArray[suttyindex01]){
  //         var codeitem="code"+firstMenuArray[suttyindex01];
  //         var codeitemValue=["item_"+suttyindex0];
  //         newEnjf[codeitem]=codeitemValue;
  //       }
  //    }
  //  }
  //  sessionStorage.setItem("newEnjf",JSON.stringify(newEnjf))
   var produceArray=allMenu;
   if(!s||!menus){
    // hashHistory.push("/");
  }else{
   self.setState({
    userName:s.name,
    allMenu:menus,
    roleName:isroot=="1"?"root用户":s.roleName,
    companyName:s.departmentName,
    userId:userId,
    alibox:null,
    formerUserstate:s,
    openKeys:JSON.parse(sessionStorage.getItem("openKeys")),
    selectedKeys:JSON.parse(sessionStorage.getItem("selectedKeys"))
  },()=>{
    self1.props.onIncreaseClick1()
    self1.props.onDereaseClick1()

  })
 } 
}

onOpenChange=(e)=>{
  let nextKeys = e.length > 0 ? [e[e.length - 1]] : [];
  sessionStorage.setItem("openKeys", JSON.stringify(nextKeys));
  
  
  this.setState({
    openKeys: nextKeys
  },()=>{
    //self1.props.onIncreaseClick1()
    //self1.props.onDereaseClick1()
    self1.props.onNormalClick1()
  })
}

logout = (e) => {
  var str1=window.location.href;
  var str1Arr1=[];
  str1Arr1=str1.split("#");
  var websitelocation=str1Arr1[0];

  let self=this;
  if(e.key==="logOut"){
   $jsonp(self,api.logout,{

   }).then((res)=>{
    sessionStorage.clear();
    localStorage.clear();
    hashHistory.push("/")
    
   
    // window.location.href=websitelocation;
    // hashHistory.push("/");
  })
 }
 if(e.key==="resetpsd"){
  hashHistory.push("/resetpsd")
}

}

cehcked=(url,urlName)=>{
  var topmenuname="";
  let self=this;
  var aa=this.state.formerUserstate;
	hashHistory.push({
    pathname:url
  });
  
}
cehcked1=(url,urlName)=>{
  var topmenuname="";
  let self=this;
  var aa=this.state.formerUserstate;
	var bb=JSON.parse(localStorage.getItem("userInfo"));
  if(aa.id == bb.id){
    if(url=="main/buybill"){
      localStorage.setItem("buyIsHandleCount1",0)
      self.setState({
        buyIsHandleCount1:0
      })
    }else if(url=="main/sellbill"){
      localStorage.setItem("saleIsHandleCount1",0)
      self.setState({
        saleIsHandleCount1:0
      })
    }
  
    hashHistory.push({
      pathname:url
    });
	}
	else{
		window.location.reload();
	}
  
}
handleSelect=(item, key, selectedKeys)=>{
 
  sessionStorage.setItem("selectedKeys", JSON.stringify(item.keyPath));
  var selectedKeysUpperKey=sessionStorage.getItem("openKeys");
  sessionStorage.setItem("selectedKeysUpperKey", selectedKeysUpperKey);

 this.setState({
   selectedKeys:item.keyPath
 },()=>{
  self1.props.onIncreaseClick1()
  self1.props.onDereaseClick1()
})
  
}



render() {
  const { openkeysIntSet, onIncreaseClick1, onDereaseClick1,onNormalClick1,selectkeysIntSet } = this.props;
  return (
   <Layout className={con.layout1}>
   <Header className={con.header}>
   
   
   <div className={con.logosize}>
   <img src={logotop} className={con.imglogo} />江苏省水路行业安全生产风险管理与隐患治理信息系统

   </div>
   <span className={con.caiwu}>{this.state.roleName}</span>
   <span className={con.systmehome}>{this.state.companyName}</span>
   <Menu
      mode="horizontal"
      className={con.logOut} 
      onClick={this.logout}>
   <SubMenu className={con.username} key="sub1" title={<span><Icon type="user" className={con.sizes}/>{this.state.userName}</span>}>
   <Menu.Item key="logOut">退出</Menu.Item>
   <Menu.Item key="resetpsd">修改密码</Menu.Item>
   </SubMenu>
   </Menu>
   
   </Header>
   <Layout className={con.layout2}>
   <Sider className={con.containAll}>
   <Menu
   theme={this.state.theme}
   onOpenChange={this.onOpenChange}
   openKeys={this.props.openkeysIntSet}
   selectedKeys={this.props.selectkeysIntSet}
   mode={this.state.mode}
   className={con.containcolor}
   onSelect={this.handleSelect.bind(this)}
   >
   {
   this.state.allMenu.map((subMenu,index) => {
      if (subMenu.children && subMenu.children.length) {
        return (
          <SubMenu key={subMenu.url} className={con.itemcolorsize}
          title={<span><Icon type={subMenu.icon}/><span>{subMenu.name}</span></span>}>
          {
            subMenu.children.map((menu,index) => (
              <Menu.Item key={menu.url} className={con.itemcolorsizes}><div onClick={this.cehcked.bind(this, menu.url,menu.name)}>{menu.name}
             
              {menu.url=="main/buybill"&&this.state.buyIsHandleCount1? <span className={con.hongdianxianshi}></span>:""}
              {menu.url=="main/sellbill"&&this.state.saleIsHandleCount1? <span className={con.hongdianxianshi}></span>:""}
             </div></Menu.Item>
              ))
          }
          </SubMenu>
          )
      }
      return (
        <Menu.Item key={subMenu.url} > 
        <div onClick={this.cehcked.bind(this, subMenu.url,subMenu.name)}>
        <Icon type={subMenu.icon}/><span className={con.itemcolorsize}>{subMenu.name}</span>
        </div>
        </Menu.Item>
        )
    })
  }
  </Menu>

  </Sider>
  <Layout>
  <Content className={con.content}>
 
  {this.props.children}
  
  </Content>


  </Layout>


  </Layout>
  <Layout>
  </Layout>

  </Layout>
  );
}
}
const Counter1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
export default Counter1