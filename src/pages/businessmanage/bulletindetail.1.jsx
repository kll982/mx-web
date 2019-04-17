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
import styles from "./bulletindetail.less"
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
        artData:blank1Data,
        top:"add"
      },()=>{
        self.resetData(self.state.artData)
      })
    }
    
  }
  sete=()=>{
    // setTimeout(function(){
        //   self.setState({
        //     articleTitle:"1111111111",
        //     sortIndex:1,
        //     artData:[{textContent:"",imgSrc:"",type:1},{textContent:"11111111",imgSrc:"",type:1},{textContent:"",imgSrc:'https://ccb-piaoju.oss-cn-shenzhen.aliyuncs.com/ticket_pic/2018-06-05/7712585275105771521528204989148.png?x-oss-process=image/watermark,image_bG9nby9weWEtd2F0ZXIucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfOTA,,t_90,g_center',type:2}],
        //   },()=>{
        //     console.log(self.state.artData)
        //     self.resetData(self.state.artData)
        //   })
        // },1000)
  }
  componentDidMount() {
    console.log(self.state.artData)
  }
  producthtml = () => {
    console.log(self.refs.editor.innerHTML)
  }

  chooseImage = (index,e) => {

    var file=e.target.files;
		var value=e.target.value;
		
    var time = new Date();
    var times = time.getTime();
    console.log(file);
    // self.setState({
    //   currentAddImgUrl: 'https://ccb-piaoju.oss-cn-shenzhen.aliyuncs.com/ticket_pic/2018-06-05/7712585275105771521528204989148.png?x-oss-process=image/watermark,image_bG9nby9weWEtd2F0ZXIucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfOTA,,t_90,g_center'
    // },()=>{
    //   var artData=self.state.artData;
    //   var setValue=self.state.currentAddImgUrl;
    //   var newValue={textContent:"",imgSrc:setValue,type:2};
    //   artData.splice(index+1,0,newValue);
    //   this.setState({
    //     artData: artData,
    //     newAddItem:"",
    //     focusItem:"",
    //   },()=>{
    //     console.log(self.state.artData)
    //     this.resetData(artData)
    //   })
    // })
    // return
    $jsonp(self, api.getOssTicketSign, {
    }).then((res) => {

      var dir = res.data.dir;
      var host = res.data.host;
      var id = res.data.id;
      var bucket = host.split("//")[1].split(".")[0];
      var endpoint = host.split("//")[0] + "//" + host.split(".")[1] + "." + host.split(".")[2] + "." + host.split(".")[3];
      var stsToken = {
        "RequestId": res.data.response.requestId,
        "AssumedRoleUser": {
          "AssumedRoleId": res.data.response.assumedRoleUser.assumedRoleId,
          "Arn": res.data.response.assumedRoleUser.arn
        },
        "Credentials": {
          "AccessKeySecret": res.data.response.credentials.accessKeySecret,
          "AccessKeyId": res.data.response.credentials.accessKeyId,
          "Expiration": res.data.response.credentials.expiration,
          "SecurityToken": res.data.response.credentials.securityToken
        }
      };
      var ossUpload = new OssUpload({
        bucket: bucket,
        endpoint: endpoint,
        chunkSize: 104857600,
        concurrency: 4,
        stsToken: stsToken,
      });

      ossUpload.upload({
        file: file[0],
        key: dir + "/" + id + times + ".png",
        maxRetry: 3,
        headers: {
          'CacheControl': 'public',
          'Expires': '',
          'ContentEncoding': '',
          'ContentDisposition': '',
          'ServerSideEncryption': ''
        },
        onprogress: function (evt) {
          let percent = self.state.cpercent + 10;
          if (percent > 100) {
            percent = 100;
          }
          self.setState({
            cpercent: percent
          })
        },
        onerror: function (evt) {
          message.warning('上传失败');
        },
        oncomplete: function (res) {
          message.success('上传成功');
          console.log('上传成功');
          self.setState({
            currentAddImgUrl: host + "/" + dir + "/" + id + times + ".png"
          },()=>{
            var artData=self.state.artData;
            var setValue=self.state.currentAddImgUrl;
            var newValue={textContent:"",imgSrc:setValue,type:2};
            artData.splice(index+1,0,newValue);
            self.setState({
              artData: artData,
              newAddItem:"",
              focusItem:"",
            },()=>{
              console.log(self.state.artData)
              self.resetData(artData)
            })
          })

        }
      });

    })


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
		value=value.replace(/[^\d-]/g, ""); 
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
  Modal.confirm({
    content:"确定取消本次操作",
    onOk:function(){
      hashHistory.push({
        pathname: '/main/bulletin'
      });
    }
  });
}
  render() {

    return (
      <div>
        <Breadcrumb separator=">" style={{ textAlign: "left" }}>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="main/bulletin">快报管理</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{this.state.top == "add" ? "新增快报" : "编辑快报"}</Breadcrumb.Item>
        </Breadcrumb>
        <div className={publicstyle.clearfloat}></div>
        <div className={styles.setdepart}>
			    	<Button type="primary" className={publicstyle.button+" "+styles.button} onClick={this.save.bind(this)}>保存</Button>
            <Button type="primary" className={publicstyle.button+" "+styles.button} onClick={this.back.bind(this)}>取消</Button>
			  </div>
        <div className={styles.container}>

        <div className={styles.articleTitle}>
          <Input type="text" className={styles.articleTitleInput} onChange={this.setArticleTitle.bind(this)} placeholder="请输入标题" value={this.state.articleTitle} />
          <Input type="number" className={styles.articleSortIndex} onChange={this.setSortIndex.bind(this)} placeholder="请输入排序位置" value={this.state.sortIndex} />
        </div>
       
        {this.state.artData.length>0?this.state.artData.map((item,index)=>{
          return (
            <div>
              <div className={styles.imgContainer} style={{display:index==0?"none":item.type==1?"none":"block"}}>
                <img src={item.imgSrc} className={styles.imgCenter} alt=""/>
                <Icon type="delete" className={styles.deleteWord} onClick={this.deleteImg.bind(this,index)} name={"delete-editImg-"+index}/>
              </div>
              
              <div className={styles.wordContainer} style={{display:index==0?"none":item.type==2?"none":"block"}}>
                <TextArea placeholder="请输入文本" autosize={{ minRows: 4}} value={this.state["editText-"+index]} name={"editText-"+index} onKeyDown={this.setKeyDown.bind(this)} onFocus={this.setCurrentEdit.bind(this)} onChange={this.setEditTextArea.bind(this)} className={styles.box}/>
                <Icon type="delete" className={styles.deleteWord} onClick={this.deleteWord.bind(this,index)} name={"delete-editText-"+index}/>
                <Icon type="close-circle-o" name={"cancel-editText-"+index} style={{display:this.state.focusItem=="editText-"+index?"block":"none"}} onClick={this.cancelWordEdit.bind(this,index)} className={styles.cancelWord} />
                <Icon type="check-circle-o" name={"save-editText-"+index} style={{display:this.state.focusItem=="editText-"+index?"block":"none"}} onClick={this.saveWordEdit.bind(this,index)} className={styles.saveWord} />
              </div>
              <div className={styles.plusBox}>
                <div className={styles.wordedit} name={"open-addText-"+index} onClick={this.openWord.bind(this,index)}>
                  <Icon className={styles.wordPlus} type="plus-circle-o" name={"open-addText-"+index} onClick={this.openWord.bind(this,index)}/>
                  文字</div>
                <div className={styles.imgedit}>
                    <Input type="file" id="postfile1" className={styles.suudj} onChange={this.chooseImage.bind(this,index)} ref="uploadimage" />
                    <Icon className={styles.imgPlus} type="plus-circle-o" />图片
                </div>
              </div>
              <div className={styles.wordContainer} style={{display:this.state.newAddItem=="addText-"+index?"block":"none"}}>
                <TextArea placeholder="请输入文本" autosize={{ minRows: 4}} value={this.state["addText-"+index]} name={"addText-"+index} onKeyDown={this.setKeyDown.bind(this)} onChange={this.setAddTextArea.bind(this)} className={styles.box}/>
                <Icon type="close-circle-o" name={"cancel-addText-"+index} onClick={this.cancelWordAdd.bind(this,index)} className={styles.cancelWord} />
                <Icon type="check-circle-o" name={"save-addText-"+index} onClick={this.saveWordAdd.bind(this,index)} className={styles.saveWord} />
              </div>
              
        </div>
          )
          
        }):""}
         
        </div>

       
        {/* <div className={styles.editorBody}
          contentEditable="true"
          spellCheck="false"
          ref="editor"
          style={{ "height": "2000px", "backgroundColor": "#fff", "padding": "0 10px" }}>
        </div>
        <TextArea placeholder="请输入文本" autosize={{ minRows: 4, maxRows: 7 }} value={this.state.textAlignc} onChange={this.setCompanyname} className={styles.box}/> <p className={styles.para1} dangerouslySetInnerHTML={{__html: "<p>爱死费崇政</p>"}}></p><Button type="primary" style={{display:"none"}} size="large" className={styles.proArt} onClick={this.producthtml.bind(this)} loading={this.state.loading}>
          生成html
        </Button>*/}
      </div>
    );
  }
}
