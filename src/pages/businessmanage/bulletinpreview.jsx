import React, { Component } from 'react';
import moment from 'moment'
moment.locale('zh-cn');
import { Breadcrumb, Input, Button, message,Modal, Radio, Icon } from 'antd';
import { Link, hashHistory } from 'react-router';
const { TextArea } = Input;
import $jsonp from '../../utils/service.js';
import $jsonppost from '../../utils/service2.js';
import $jsonp3 from '../../utils/service3.js';

import api from '../../utils/api.js';

import publicstyle from '../../img/public.less'
import styles from "./bulletinpreview.less"
import $ from 'jquery'
/*import "./aliyun-min-sdk.js";
import "./oss-js-upload.js";*/
require("../bannermanage/aliyun-min-sdk.js");
require("../bannermanage/oss-js-upload.js");

let self;
const blank1Data=[{textContent:"",imgSrc:"",type:1}];

export default class home extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      articleTitle: "",
      isEnterClick:false,
      focusItem:"",
      updateId:"",
      sortIndex:0,
      artData:blank1Data,
    }
  }
  componentWillMount() {
    if(self.props.location.state){
      if(self.props.location.state.top == "edit"){
        $jsonp3(self,api.articleDetail4Manage,{
          id:self.props.location.state.updateId,
        }).then((res) => {
          console.log(res)
          var list=res.data.response.info;
          var contentList=list.contentList;
          var retdta=[];
          for(var k1=0; k1<contentList.length;k1++){
            var ibg={};
            ibg.textContent=!contentList[k1].textContent?"":contentList[k1].textContent;
            ibg.imgSrc=!contentList[k1].imageUrl?"":contentList[k1].imageUrl;
            ibg.type=contentList[k1].type;
            retdta.push(ibg)
          }
          retdta.unshift({textContent:"",imgSrc:"",type:1})
          console.log(retdta)
          self.setState({
            articleTitle:list.title,
            sortIndex:list.sortIndex,
            artData:retdta,
            time:moment(list.createTime).format('YYYY-MM-DD'),
            department:!list.author.msaName?"":list.author.msaName,
            top:"edit"
          },()=>{
            console.log(self.state.artData)
            self.resetData(self.state.artData)
          })
        }).catch((error)=>{
          
          self.setState({
            articleTitle:"",
            sortIndex:0,
            artData:blank1Data,
            department:"",
            top:"edit"
          },()=>{
            self.resetData(self.state.artData)
          })
        })
        self.setState({
          updateId:self.props.location.state.updateId,
        })
      }
      else{
        self.setState({
          updateId:"",
          sortIndex:0,
          articleTitle:"",
          department:"",
          artData:blank1Data,
          top:"add"
        },()=>{
          self.resetData(self.state.artData)
        })
      }
    }
    else{
      self.setState({
        updateId:"",
        sortIndex:0,
        articleTitle:"",
        department:"",
        artData:blank1Data,
        top:"add"
      },()=>{
        self.resetData(self.state.artData)
      })
    }
    
  }
  sete=()=>{
    
  }
  componentDidMount() {
    console.log(self.state.artData)
  }
  producthtml = () => {
    console.log(self.refs.editor.innerHTML)
  }

  setArticleTitle = (e) => {
    var value = e.target.value;
    if (value.length > 50) {
      return
    }
    this.setState({
      articleTitle: value
    })
  }
  setSortIndex = (e) => {
    var value=e.target.value;
		value=value.replace(/[^\d]/g, ""); 
		if(value.length>11){
			return
		}else if(value<0){
      return
    }
	  this.setState({
      sortIndex:value
	  })

  }
  resetData=(data)=>{
    console.log(data)
    var k1=0;
    var k2=0;
    for(var i=0;i<data.length;i++){
      self.setState({
        ["editText-"+i]:data[i].textContent,
        ["addText-"+i]:"",
      })
    }
  }
  openWord = (index,e) => {
    console.log(e.target)
    var name1=e.target.attributes.name.value;
    console.log(name1)
    var name2=name1.replace("open-","")
    console.log(name1,name2)
    var artData=self.state.artData;
    this.setState({
      newAddItem: name2,
      focusItem:"",
    })
  }
  cancelWordAdd= (index,e) => {
    var artData=self.state.artData;
    this.setState({
      newAddItem:"",
      focusItem:"",
    })
    this.resetData(artData)
    return
    var name1=e.target.attributes.name.value;
    var name2=name1.replace("cancel-","")
    console.log(name1)
    
    this.setState({
      artData: artData,
      newAddItem:"",
      focusItem:"",
    },()=>{
      this.resetData(artData)
    })
  }
  saveWordAdd= (index,e) => {
    var artData=self.state.artData;
    var name1=e.target.attributes.name.value;
    var name2=name1.replace("save-","")
    console.log(name1);
    var setValue=self.state[name2];
    if(!setValue){
      message.info("请输入文字")
      return
    }
    //var newData=blank1Data;
    var newValue={textContent:setValue,imgSrc:"",type:1};
    
    artData.splice(index+1,0,newValue);
   // var neww1=newData.concat(artData);
    this.setState({
      artData: artData,
      newAddItem:"",
      focusItem:"",
    },()=>{
      console.log(self.state.artData)
      this.resetData(artData)
    })
  }
  cancelWordEdit= (index,e) => {
    var artData=self.state.artData;
    console.log(index,"cancel")
    this.setState({
      newAddItem:"",
      focusItem:"",
    })
    this.resetData(artData)
  }
  saveWordEdit= (index,e) => {
    var artData=self.state.artData;
    var name1=e.target.attributes.name.value;
    var name2=name1.replace("save-","")
    console.log(name1);
    var setValue=self.state[name2];
    if(!setValue){
      message.info("请输入文字")
      return
    }
    //var newData=blank1Data;
    var newValue={textContent:setValue,imgSrc:"",type:1};
    artData.splice(index,1,newValue);
    this.setState({
      artData: artData,
      newAddItem:"",
      focusItem:"",
    },()=>{
      console.log(self.state.artData)
      this.resetData(artData)
    })

  }
  deleteWord= (index,e) => {
    var artData=self.state.artData;
    artData.splice(index,1);
    this.setState({
      artData: artData
    },()=>{
      console.log(self.state.artData)
      this.resetData(artData)
    })
  }
  deleteImg = (index,e) => {
    var artData=self.state.artData;
    artData.splice(index,1);
    this.setState({
      artData: artData
    },()=>{
      console.log(self.state.artData)
      this.resetData(artData)
    })
  }
  //设置textarea事件
  setAddTextArea=(e)=>{
    var name1=e.target.name;
    console.log(name1)
    if(self.state.isEnterClick){
    }else{
      self.setState({
        [name1]: e.target.value,
        currentEdit:name1
      });
    }
  }
  setEditTextArea=(e)=>{
    var name1=e.target.name;
    console.log(name1)
    if(self.state.isEnterClick){
    }else{
      self.setState({
        [name1]: e.target.value,
      });
    }
  }
  setKeyDown=(e)=>{
    var code;  
    if (!e) var  e = window.event;  
    if (e.keyCode) code = e.keyCode;  
    else if (e.which) code = e.which;  
    console.log(code)
    var b1=false;
    if(code==13 && window.event){  
        e.returnValue = false;  
        b1=true;
    }else if(code==13){  
        e.preventDefault();
        b1=true;
    }else{
      b1=false;
    }
    self.setState({
      isEnterClick:b1
    })
  }
  setCurrentEdit=(e)=>{
    var name1=e.target.name;
    console.log(name1)
    self.setState({
      focusItem:name1,
      newAddItem:"",
    });
  }
  setBlurCurrentEdit=(e)=>{
    self.setState({
      focusItem:"",
    });
  }
  save = () => {
    let self=this;
    var title1=self.state.articleTitle;
    var artData=self.state.artData;
    if(!self.state.articleTitle){
      message.info("请输入快报标题")
      return
    }else if(artData.length==1){
      message.info("请输入快报内容")
      return
    }
    var sendData=[];
    for(var i=0;i<artData.length;i++){
      var ong={};
      if(i!==0){
        if(artData[i].type==1){
          ong.textContent=artData[i].textContent
          ong.type=1
          sendData.push(ong)
        }else{
          ong.imageUrl=artData[i].imgSrc
          ong.type=2
          sendData.push(ong)
        }
      }
    }
    $jsonppost(self,api.articleSave,{
      id:self.state.updateId,
      title:self.state.articleTitle,
      content:JSON.stringify(sendData),
      sortIndex:self.state.sortIndex,
    }).then((res)=>{
      if(self.state.top=="add"){
        var text1="添加成功";}
      else{
        var text1="修改成功";
      }
      Modal.success({
        content:"快报"+self.state.articleTitle+text1,
        onOk:function(){
          hashHistory.push({
            pathname: '/main/bulletin'
          });
        }
      })
      
    })
    


}

back = () => {
  hashHistory.push({
    pathname: '/main/bulletin'
  });
}
toEdit = () => {
  hashHistory.push({
    pathname: '/main/bulletindetail',
    state:{
      updateId:self.state.updateId,
      top:"edit",
    }
  });
}
  render() {

    return (
      <div>
        <Breadcrumb separator=">" style={{ textAlign: "left" }}>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="main/bulletin">快报管理</Link></Breadcrumb.Item>
          <Breadcrumb.Item>预览快报</Breadcrumb.Item>
        </Breadcrumb>
        <div className={publicstyle.clearfloat}></div>
        <div className={styles.setdepart}>
			    	<Button type="primary" className={publicstyle.button+" "+styles.button} onClick={this.toEdit.bind(this)}>编辑</Button>
            <Button type="primary" className={publicstyle.button+" "+styles.button} onClick={this.back.bind(this)}>返回</Button>
			  </div>
        <div className={styles.container}>
        <div className={styles.articleTitle}>
         <div className={styles.articleTitleInput}>{this.state.articleTitle}</div>
         <div className={styles.time}>
          <div className={styles.timeleft}>{this.state.department}</div>
          <div className={styles.timeright}>{this.state.time}</div>
         </div>
        </div>
       
        {this.state.artData.length>0?this.state.artData.map((item,index)=>{
          return (
            <div>
              <div className={styles.imgContainer} style={{display:index==0?"none":item.type==1?"none":"block"}}>
                <img src={item.imgSrc} className={styles.imgCenter} alt=""/>
              </div>
              <div className={styles.wordContainer} style={{display:index==0?"none":item.type==2?"none":"block"}}>
                <p className={styles.box1}>{this.state["editText-"+index]}</p>
              </div>
              
        </div>
          )
          
        }):""}
         
        </div>

     
      </div>
    );
  }
}
