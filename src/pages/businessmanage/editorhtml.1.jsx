import React, { Component } from 'react';
import moment from 'moment'
moment.locale('zh-cn');
import { Breadcrumb, Input, Button,message,Radio} from 'antd';
import {Link,hashHistory} from 'react-router';
import ColorPicker from 'react-color'
import MyPicker from './MyPicker'
import $jsonp from '../../utils/service.js';
import api from '../../utils/api.js';

import publicstyle from '../../img/public.less'
import styles from "./editorhtml.less"
import $ from 'jquery'
/*import "./aliyun-min-sdk.js";
import "./oss-js-upload.js";*/
require("../bannermanage/aliyun-min-sdk.js");
require("../bannermanage/oss-js-upload.js");

let self;


export default class home extends React.Component {
  constructor(props){
    super(props);
    self=this;
    this.state={
      hex:"orange",
      articleTitle:"",
      html: '<p><br></p>',
      selectedRange: '',
      colorform:"foreColor",
      selectedFontsize:2,
      selectedFontfamily:"微软雅黑",
      imglocation:"",
      widthIMAGEE:"",
      heightIMAGEE:"",
      kexi:"",
      options:[  
        { text: '12px', value: '1' },  
        { text: '14px', value: '2' },  
        { text: '16px', value: '3' },  
        { text: '18px', value: '4' },  
        { text: '24px', value: '5' },  
        { text: '32px', value: '6' },
        { text: '48px', value: '7' },
      ],
      optionsFontfamily:[  
        { text: '微软雅黑'},  
        { text: '宋体'}
      ]
    }
  }
  componentWillMount(){

  }
  componentDidMount(){
    self.refs.editor.innerHTML='<h2><font color="#ccff99">1111111111111111</font></h2>'
  }
   producthtml =() => {
      console.log(self.refs.editor.innerHTML)
    }
    restoreSelection =()=> {
      var selection = window.getSelection()
      if (this.selectedRange) {
        try {
          selection.removeAllRanges() /*清空所有Range对象*/
        } catch (ex) {
          /*IE*/
          document.body.createTextRange().select()
          document.selection.empty()
        }
        /*恢复保存的范围*/
        selection.addRange(this.selectedRange)
      }
    }
  iconClick = ( type, dropType,event) => {
      event.preventDefault()
      self.refs.editor.focus();
      console.log(type)
     
      // 恢复光标
      self.restoreSelection()
      // 修改所选区域的样式
      self.changeStyle(type)
      /*self.$nextTick(() => {
        if (dropType) {
         // type = dropType
        }
        
        console.log(self.refs.editor.innerHTML)
        if (type === 'clear') {
          
          
        }
      })*/
  }
   changeStyle=(type) =>{
     if(type.indexOf("#")==0 && type.length==7){
      if(self.state.colorform == 'foreColor'){
          document.execCommand("ForeColor",false,type);
      }
      else{
          document.execCommand("BackColor",false,type);
      }
     }
      switch (type) {
        case 'bold':
          document.execCommand('bold', false)
          break
        case 'underline':
          document.execCommand('underline', false)
          break
        case 'strike':
          document.execCommand('strikeThrough', false)
          break
        case 'italic':
          document.execCommand('italic', false)
          break
        case 'clear':
          document.execCommand('removeFormat', false);
          var a = self.getSelect();
          if (a.startOffset === a.endOffset) {
            document.execCommand('insertHTML', false, '&nbsp')
            // return false
          }
          break
        case 'chooseAll':
          document.execCommand("selectAll",false)
          break
        case 'delete':
          document.execCommand("Delete",false,null)
          break
        case 'unorderedlist':
          document.execCommand('insertUnorderedList', false)
          break
        case 'orderedlist':
          document.execCommand('insertorderedList', false)
          break
        // 本地图片
        case 'localImg':
          console.log(1)
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'p':
        case 'pre':
        case 'blockquote':
          document.execCommand('formatBlock', false, type);
          break
        case 'justifyCenter':
        case 'justifyFull':
        case 'justifyLeft':
        case 'justifyRight':
          document.execCommand(type, false)
          break
        case 'rgb(0, 0, 0)':
        case 'rgb(255, 0, 0)':
        case 'rgb(0, 255, 0)':
        case 'rgb(0, 0, 255)':
        case 'rgb(255, 0, 255)':
        case 'rgb(255, 255, 0)':
        case 'rgb(0, 255, 255)':
        case 'rgb(255, 255, 255)':
        case 'rgb(255, 255, 0)':
        case 'rgb(102, 102, 153)':
        case 'rgb(51, 51, 102)':
        case 'rgb(102, 51, 0)':
        case 'rgb(204, 255, 255)':
        case 'rgb(204, 255, 153)':
        case 'rgb(0, 153, 0)':
        case 'rgb(153, 0, 0)':
        case 'rgb(0, 0, 153)':
        {
          console.log(self.state.colorform)
          if(self.state.colorform == 'foreColor'){
              document.execCommand("ForeColor",false,type);
          }
          else{
              console.log(1111)
              document.execCommand("BackColor",false,type);
          }
          }
          break
        case 'image':
          self.chooseImage(self);   
          break
        case 'image1':
          {
          var theObj='<img src="'+self.state.imglocation+'" align="center" height="auto" className="ImguPLOAD" style="display:block; margin:10px auto;max-width: 100%;"';
          document.execCommand('InsertImage',0,self.state.imglocation);
          var reg=new RegExp('<img src="'+self.state.imglocation+'"','g');
          self.refs.editor.innerHTML=self.refs.editor.innerHTML.replace(reg,theObj);
          /*self.contextmenu();*/
          }
          break
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
          {
          document.execCommand('FontSize', false, type)
          }
          break
        case '微软雅黑':
        case '宋体':
          {
          document.execCommand('FontName', false, type)
          }
          break
        case 'linkurl':
          {
          var linkurl=prompt("请输入url","");
          document.execCommand("CreateLink","false", linkurl);
          }
          break
        default:
          console.log('none')
      }
  }

  iconClick1 =(value) =>{
    console.log(`selected ${value}`);
  }
  chooseImage=(boj)=>{
        var self=boj;
       var doco1=self.refs.uploadimage.files;
       var doco=self.refs.uploadimage.files[0];

        var file=doco1;
        var time=new Date();
        var times=time.getTime();
        console.log(file);
        $.ajax({

          url: "http://bm-t.jinbill.com/oss/getOssSTSPackageTicketSign",
          dataType: 'jsonp',
          type:"get",
          data: {},
          success: (res) => {
              console.log(res)
              let dir=res.data.dir;
              let host=res.data.host;
              let id=res.data.id;
              let bucket=host.split("//")[1].split(".")[0];
              let endpoint=host.split("//")[0]+"//"+host.split(".")[1]+"."+host.split(".")[2]+"."+host.split(".")[3];
              var stsToken={
                "RequestId": res.data.response.requestId,
                "AssumedRoleUser": {
                  "AssumedRoleId": res.data.response.assumedRoleUser.assumedRoleId,
                  "Arn": res.data.response.assumedRoleUser.arn
                },
                "Credentials": {
                  "AccessKeySecret":res.data.response.credentials.accessKeySecret,
                  "AccessKeyId":res.data.response.credentials.accessKeyId,
                  "Expiration": res.data.response.credentials.expiration,
                  "SecurityToken": res.data.response.credentials.securityToken
                }
              };
              for(let i=0;i<file.length;i++){
                console.log(file[i])
                var init = function () {
                  var ossUpload = new OssUpload({
                    bucket: bucket,
                    endpoint: endpoint,
                    chunkSize: 1048576,
                    concurrency: 4,
                    stsToken:stsToken,
                  });
                  ossUpload.upload({
                    file: file[i],
                    key: dir+"/"+id+times+i+".png",
                    maxRetry: 3,
                    headers: {
                      'CacheControl': 'public',
                      'Expires': '',
                      'ContentEncoding': '',
                      'ContentDisposition': '',
                      'ServerSideEncryption': ''
                    },
                    onprogress: function (evt) {
                    },
                    onerror: function (evt) {

                    },
                    oncomplete: function (res) {

                      var path="";
                      path=host+"/"+dir+"/"+id+times+i+".png";
                      console.log(path)
                      var theObj='<img src="'+path+'" align="center" height="auto" class="ImguPLOAD" style="display:block; margin:10px auto;max-width: 100%;"';
                      document.execCommand('InsertImage',0,path);
                      var reg=new RegExp('<img src="'+path+'"','g');

                      self.refs.editor.innerHTML=self.refs.editor.innerHTML.replace(reg,theObj);
                      

                    }
                  });

                };

                init();
              }

           },
           error:(res)=>{
            
           }
         
       });
  }

  onURLPATH=(e) =>  {
    this.setState({
      imglocation:e.target.value
    })
  }
  setWIdthImg=(e) =>  {
    this.setState({
      widthIMAGEE:e.target.value
    })
  }
   setHeightImg=(e) =>  {
    this.setState({
      heightIMAGEE:e.target.value
    })
  }
   changeColorDirection1=(colorDirection)=>{
    this.colorform=colorDirection;
    console.log(colorDirection)
    this.setState({
      colorform:colorDirection
    })
  }
  
  changeColorDirection = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      colorform: e.target.value,
    });
  }
  // 获取选中
  getSelect=()=> {
      if (window.getSelection) {
        /*主流的浏览器，包括chrome、Mozilla、Safari*/
        var sel = window.getSelection()
        if (sel.rangeCount > 0) {
          return sel.getRangeAt(0)
        }
      } else if (document.selection) {
        /*IE下的处理*/
        return document.selection.createRange()
      }
      return null
  }
  toAnother=()=>{
   console.log(1111)
  }
   clickfile =()=>{
      self.refs.uploadimage.click();
    }
   setArticleTitle = (e) => {
      var value=e.target.value;
      if(value.length>50){
        return
      }
      this.setState({
        articleTitle:value
      })
  }
  handleChooseClick(event) {
    self.iconClick(self.state.hex, 'color',event)
  }
  handleColorChange({hex}) {
    console.log(hex)
    self.setState({ hex: hex },()=>{
      console.log(hex)
    });
  }
  render() {
    
    return (
      <div>
        <Breadcrumb separator=">" style={{textAlign:"left"}}>
			    <Breadcrumb.Item>系统管理</Breadcrumb.Item>
			    <Breadcrumb.Item><Link to="main/staffmanage">快报管理</Link></Breadcrumb.Item>
			    <Breadcrumb.Item>{self.state.top == "add"?"新增快报":"编辑快报"}</Breadcrumb.Item>
			  </Breadcrumb>
			  <div className={publicstyle.clearfloat}></div>
        <div className={styles.App}><span style={{paddingRight: 10}}>文章标题:</span>
           <Input type="text" style={{width: "60%"}} onChange={this.setArticleTitle.bind(this)} value={this.state.articleTitle}/>
			  </div>
        
        <MyPicker
            color={this.state.hex}
            onChangeComplete={ this.handleColorChange.bind(this) }
          />
      <Button type="primary" size="large" style={{margin:"10px auto"}} onClick={ this.handleChooseClick.bind(this)}>
        选择颜色
        </Button>
       
         <ul className={styles.sssss}>
            <li>
              <a href="#"  onClick={this.iconClick.bind(this, 'justifyCenter', 'alignjustify')}>
                <i className="iconfont icon-aligncenter"></i>
                <span>居中</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={this.iconClick.bind(this, 'justifyLeft', 'alignjustify')}>
                <i className="iconfont icon-alignleft"></i>
                <span>左对齐</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={this.iconClick.bind(this, 'justifyRight', 'alignjustify')}>
                <i className="iconfont icon-alignright"></i>
                <span>右对齐</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={this.iconClick.bind(this, 'justifyFull', 'alignjustify')}>
                <i className="iconfont icon-alignjustify"></i>
                <span>默认对齐</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={this.iconClick.bind(this, 'linkurl', 'style')}><span>超链接</span></a>
            </li>
          </ul>
        <ul className={styles.sssss}>
          <li>
            <a href="#" onClick={this.iconClick.bind(this, 'clear', 'clear')}><span>清除样式</span></a>
          </li>
          <li>
            <a href="#" onClick={this.iconClick.bind(this, 'chooseAll', 'clear')}><span>全选</span></a>
          </li>
          <li>
            <a href="#" onClick={this.iconClick.bind(this, 'delete', 'clear')}><span>删除</span></a>
          </li>
        </ul>
         <ul className={styles.sssss}>
          <li>
            <a href="#" onClick={this.iconClick.bind(this, 'h1', 'style')}><span>标题一</span></a>
          </li>
          <li>
            <a href="#" onClick={this.iconClick.bind(this, 'h2', 'style')}><span>标题二</span></a>
          </li>
          <li>
            <a href="#" onClick={this.iconClick.bind(this, 'h3', 'style')}><span>标题三</span></a>
          </li>
          
          <li>
            <a href="#" onClick={this.iconClick.bind(this, 'h4', 'style')}><span>标题四</span></a>
          </li>
          <li>
            <a href="#" onClick={this.iconClick.bind(this, 'h5', 'style')} ><span>标题五</span></a>
          </li>
          <li>
            <a href="#" onClick={this.iconClick.bind(this, 'h6', 'style')}><span>标题六</span></a>
          </li>
        </ul>
        <ul className={styles.sssss+" "+styles.a1}>
         
          <li>
            <a href="#" onClick={this.iconClick.bind(this, 'strike', 'style')}><span>删除线</span></a>
          </li>
          <li>
            <a href="#" onClick={this.iconClick.bind(this, 'underline', 'style')}><span>下划线</span></a>
          </li>
          <li>
            <a href="#" onClick={this.iconClick.bind(this, 'bold', 'style')}><span>粗体</span></a>
          </li>
          <li>
            <a href="#" onClick={this.iconClick.bind(this, 'unorderedlist', 'style')}><span>无序列表</span></a>
          </li>
          <li>
            <a href="#" onClick={this.iconClick.bind(this, 'orderedlist', 'style')}><span>有序列表</span></a>
          </li>

          <li>
            <div>
              <span>图片</span>
                <input type="text" maxLength="255" placeholder="请输入地址" onChange={this.onURLPATH} /> 
                <button type="button" onClick={this.iconClick.bind(this, 'image1', 'style')} style={{"float":"left","marginLeft":"20px"}}>确定</button> 
                <input type="file" accept="image/png,image/jpeg,image/gif,image/jpg" style={{"display":"none !important"}} onChange={this.iconClick.bind(this, 'image', 'style')} ref="uploadimage" />
                <button type="button" onClick={this.clickfile} style={{"float":"left","marginLeft":"20px","marginRight":"20px"}}>上传</button>
                <input type="text" maxLength="255" placeholder="请输入图片宽度" onChange={this.setWIdthImg} /> 
                <input type="text" maxLength="255" placeholder="请输入图片高度" onChange={this.setHeightImg} /> 
              </div>
          </li>
        </ul>
        <Radio.Group onChange={this.changeColorDirection.bind(this)} value={this.state.colorform}>
          <Radio.Button value="foreColor">前景色</Radio.Button>
          <Radio.Button value="backColor">背景色</Radio.Button>
        </Radio.Group>
        {/* <label><input type="radio" name="color" value="foreColor" checked={this.state.colorform == 'foreColor'} onClick={this.changeColorDirection.bind(this, 'foreColor')} />前景色</label>
        <label><input type="radio" name="color" value="backColor" checked={this.state.colorform == 'backColor'} onClick={this.changeColorDirection.bind(this, 'backColor')} />背景色</label> */}
    
   
     <ul className={styles.sssss+" "+styles.sssss1+" "+styles.special}>
      <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(0, 0, 0)', 'color')} style={{"backgroundColor": "rgb(0, 0, 0)"}}></a>
      </li>
      <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(102, 102, 153)', 'color')} style={{"backgroundColor": "rgb(102, 102, 153)"}}></a>
      </li>
       <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(51, 51, 102)', 'color')} style={{"backgroundColor": "rgb(51, 51, 102)"}}></a>
      </li>
       <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(102, 51, 0)', 'color')} style={{"backgroundColor": "rgb(102, 51, 0)"}}></a>
      </li>
       <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(204, 255, 255)', 'color')} style={{"backgroundColor": "rgb(204, 255, 255)"}}></a>
      </li>
       <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(204, 255, 153)', 'color')} style={{"backgroundColor": "rgb(204, 255, 153)"}}></a>
      </li>
       <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(153, 0, 0)', 'color')} style={{"backgroundColor": "rgb(153, 0, 0)"}}></a>
      </li>
       <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(0, 153, 0)', 'color')} style={{"backgroundColor": "rgb(0, 153, 0)"}}></a>
      </li>
       <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(0, 0, 153)', 'color')} style={{"backgroundColor": "rgb(0, 0, 153)"}}></a>
      </li>
       <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(255, 255, 0)', 'color')} style={{"backgroundColor": "rgb(255, 255, 0)"}}></a>
      </li>
       <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(255, 0, 255)', 'color')} style={{"backgroundColor": "rgb(255, 0, 255)"}}></a>
      </li>
       <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(0, 255, 255)', 'color')} style={{"backgroundColor": "rgb(0, 255, 255)"}}></a>
      </li>
       <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(0, 0, 255)', 'color')} style={{"backgroundColor": "rgb(0, 0, 255)"}}></a>
      </li>
       <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(0, 255, 0)', 'color')} style={{"backgroundColor": "rgb(0, 255, 0)"}}></a>
      </li>
       <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(255, 0, 0)', 'color')} style={{"backgroundColor": "rgb(255, 0, 0)"}}></a>
      </li>
       <li>
        <a href="#" onClick={this.iconClick.bind(this, 'rgb(255, 255, 255)', 'color')} style={{"backgroundColor": "rgb(255, 255, 255)"}}></a>
      </li>
    </ul>
       <Button type="primary" size="large" className={styles.proArt} onClick={this.producthtml.bind(this)} loading={this.state.loading}>
        生成html
        </Button>
        <div className={styles.editorBody}
            contentEditable="true"
            spellCheck="false"
            ref="editor"
            vHtml="html"
            style={{"height":"2000px","backgroundColor":"#fff","padding":"0 10px"}}>
          </div>
      </div>
    );
  }
}
