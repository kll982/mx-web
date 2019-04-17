import React from 'react';
import {Link, hashHistory} from 'react-router';

import { Form, Icon, Input, Button, Breadcrumb,Row,Col,message,Radio} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import styles1 from "./addStatisticTask.less";
import publicstyle from "../../img/public.less";

import $jsonp from '../../utils/service.js';
import $jsonp3 from "../../utils/service3";
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";

import phone from "../../img/phone.png";
import Addstaff from "./addStatisticTask1";
import styles2 from "../admin/index.less";

let self,items={
	emowsar1:"接处警（起）",
	emowsar2:"救助人员（人次）",
	emowsar3:"救助遇险船舶（艘次）",
	emowsar4:"挽回损失（万元）",
	emowsar5:"处置险情",
	emowsar6:"死亡",
	emowsar7:"沉船",
	emowsar8:"排除险情（起）",
	emowsar9:"其中航道堵塞",
	emowsar10:"清除碍航物",
	emowsar11:"出动人力（人次）",
	emowsar12:"出动艇力（艘次）",
	emowsar13:"协调社会力量（人次）",
	aiah1:"事故起数",
	aiah2:"一般等级以上事故起数",
	aiah3:"小事故起数",
	aiah4:"伤亡人数",
	aiah5:"沉船艘数",
	aiah6:"直接经济损失（万元）",
	aiah7:"立案调查起数",
	aiah8:"受理调解起数",
	aiah9:"危化品、客渡船事故起数",
    leiahti1:"执法检查次数",
    leiahti2:"出动人次",
    leiahti3:"出动车艇",
    leiahti4:"聘请专家人次",
    leiahti5:"检查企业数",
    leiahti6:"检查船舶数",
    leiahti7:"隐患数量",
    leiahti8:"立即整改",
    leiahti9:"限期整改",
    leiahti10:"追究违法责任",
    leiahti11:"采取强制措施",
    leiahti12:"挂牌督办",
    leiahti13:"下达整改通知书",
    leiahti14:"发执法抄送函",
    leiahti15:"责令停止作业",
    leiahti16:"查处违章船舶数",
    leiahti17:"行政处罚次数",
    leiahti18:"罚没金额（万元）",
    sss1:"船舶报告数（艘次）",
    sss2:"其中：危险货物船舶数（艘次）",
    sss3:"船舶货物量（万吨）",
    sss4:"其中：危险货物量（万吨）",
    sss5:"船舶现场监督（艘次）",
    sss6:"发现违法行为（起）",
    sss7:"启动安全检查（次）",
    sss8:"船旗国监督检查（艘次）",
    sss9:"其中危化品船舶",
    sss10:"其中客渡船",
    sss11:"查出缺陷数（项）",
    sss12:"滞留船舶（艘）",
    sss13:"发出船舶安全检查信息通报表（份）",
    sss14:"其中危化品船舶",
    nsmowaua1:"核发水工许可（件）",
    nsmowaua2:"发布航行通告、警告（份）",
    nsmowaua3:"水上群体性文娱体育活动（次）",
    nsmowaua4:"已核发许可在建工程（项）",
    nsmowaua5:"交通管制（天）",
    nsmowaua6:"出动人员（人次）",
    nsmowaua7:"动用艇力（艘次）",
    todgaam1:"载运危险货物船舶适装申报艘次",
    todgaam2:"其中现场核查艘次",
    todgaam3:"危险货物吞吐量（万吨）",
    todgaam4:"防污检查艘次",
    todgaam5:"固废检查艘次",
    todgaam6:"接收船舶垃圾（吨）",
    todgaam7:"生活污水装置检查（艘）",
    todgaam8:"处罚起数",

},forindate=[],data;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const FormItem = Form.Item;



class FromList extends React.Component {

constructor(props) {
      super(props);
      self = this;
      data = self.props.location.state;
      self.state = {
        value:"",
        userPhone:{},
        writeDate:{},
        detailId:""
      }
  }

  // onlunch
  componentWillMount(){
  }
  // onload
  componentDidMount(){
    data = self.props.location.state;
    // 获取登录者手机号和姓名
    self.getPhone();
    self.getDate(data);
  }
  // 获取手机号
  getPhone=()=>{
    $jsonp3(self,api.phone,{}).then((res) => {
      self.setState({
        userPhone : res.data.response.statisticListDto
      });
    });
  }
  getDate=(data)=>{
    $jsonp3(self,api.InfoGetdelites,{
      id:data.id
    }).then((res) => {
      forindate = res.data.response.statisticListDto.specialStatsticsTaskInfoDetails;
      if(forindate.length!=0){
        self.setState({
          writeDate : res.data.response.statisticListDto,
        })
      }else{
        self.setState({
          writeDate : res.data.response.statisticListDto,
        })
      }
      
    });
  }
    tab=(e)=>{
	    async function wait(){
	        self.type="primary";
            self.setState({
                detailId:e.target.value
            })
        }
        wait().then()
	}
  handleSubmit = (e) => {
    e.preventDefault();
    if(self.state.detailId == ""){
        message.info("请选择日期！");
        return;
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        $jsonppost(self,api.SecurityRisk3,{
				detailId:self.state.detailId,
				emowsar1:Number(values.emowsar1),
				emowsar2:Number(values.emowsar2),
				emowsar3:Number(values.emowsar3),
				emowsar4:Number(values.emowsar4),
				emowsar5:Number(values.emowsar5),
				emowsar6:Number(values.emowsar6),
				emowsar7:Number(values.emowsar7),
				emowsar8:Number(values.emowsar8),
				emowsar9:Number(values.emowsar9),
				emowsar10:Number(values.emowsar10),
                emowsar11:Number(values.emowsar11),
                emowsar12:Number(values.emowsar12),
                emowsar13:Number(values.emowsar13),

                aiah1:Number(values.aiah1),
                aiah2:Number(values.aiah2),
                aiah3:Number(values.aiah3),
                aiah4:Number(values.aiah4),
                aiah5:Number(values.aiah5),
                aiah6:Number(values.aiah6),
                aiah7:Number(values.aiah7),
                aiah8:Number(values.aiah8),
                aiah9:Number(values.aiah9),

            	leiahti1:Number(values.leiahti1),
				leiahti2:Number(values.leiahti2),
				leiahti3:Number(values.leiahti3),
				leiahti4:Number(values.leiahti4),
				leiahti5:Number(values.leiahti5),
				leiahti6:Number(values.leiahti6),
				leiahti7:Number(values.leiahti7),
				leiahti8:Number(values.leiahti8),
				leiahti9:Number(values.leiahti9),
				leiahti10:Number(values.leiahti10),
                leiahti11:Number(values.leiahti11),
                leiahti12:Number(values.leiahti12),
                leiahti13:Number(values.leiahti13),
                leiahti14:Number(values.leiahti14),
				leiahti15:Number(values.leiahti15),
				leiahti16:Number(values.leiahti16),
				leiahti17:Number(values.leiahti17),
				leiahti18:Number(values.leiahti18),

                sss1:Number(values.sss1),
				sss2:Number(values.sss2),
				sss3:Number(values.sss3),
				sss4:Number(values.sss4),
				sss5:Number(values.sss5),
				sss6:Number(values.sss6),
				sss7:Number(values.sss7),
				sss8:Number(values.sss8),
				sss9:Number(values.sss9),
				sss10:Number(values.sss10),
                sss11:Number(values.sss11),
                sss12:Number(values.sss12),
                sss13:Number(values.sss13),
                sss14:Number(values.sss14),

                nsmowaua1:Number(values.nsmowaua1),
                nsmowaua2:Number(values.nsmowaua2),
                nsmowaua3:Number(values.nsmowaua3),
                nsmowaua4:Number(values.nsmowaua4),
                nsmowaua5:Number(values.nsmowaua5),
                nsmowaua6:Number(values.nsmowaua6),
                nsmowaua7:Number(values.nsmowaua7),

                todgaam1:Number(values.todgaam1),
                todgaam2:Number(values.todgaam2),
                todgaam3:Number(values.todgaam3),
                todgaam4:Number(values.todgaam4),
                todgaam5:Number(values.todgaam5),
                todgaam6:Number(values.todgaam6),
                todgaam7:Number(values.todgaam7),
                todgaam8:Number(values.todgaam8),

			}).then((res) => {
				if(res.message == "ok"){
					message.success("已上报");
					forindate.shift();
					setTimeout(function(){
					    if(forindate.length == 0){
                            hashHistory.push({
                              pathname: '/main/fillStatictisTaskList'
                            })
                        }
                        location.reload();
                    },2000)
				}else{
					message.info("请重试")
				}
			});
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    return (
        <div>
            <Breadcrumb separator=">" style={{ textAlign: "left" }}>
                <Breadcrumb.Item>专项统计</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="main/fillStatictisTaskList">填写报表</Link></Breadcrumb.Item>
                <Breadcrumb.Item>填 写</Breadcrumb.Item>
            </Breadcrumb>
            <div className={publicstyle.clearfloat}></div>

            <h1 style={{textAlign:"center",margin:"20px auto"}}>{self.state.writeDate.statisticsTitle}</h1>

            <Row type="flex" justify="space-between">
              <Col span={5} offset={1}>
                填写人
                &ensp;
                <span className={styles2.bottonBorder}>{self.state.userPhone.userName}</span>
                &ensp;&ensp;
                <img src={phone}/>
                &ensp;
                <span className={styles2.bottonBorder}>{self.state.userPhone.mobile}</span>
              </Col>
              <Col span={16} offset={1} pull={1} style={{textAlign:"right"}}>
                <span>选择日期 : </span>
                  <RadioGroup onChange={self.tab}>
                {
                  forindate.map((item)=>{
                      return <RadioButton value={item.id}>{item.statisticsDate.split("-").splice(1,1) + "月"}</RadioButton>

                    // if(self.state.writeDate.templateCode=="103"){
                    //   return <Button style={{margin:"5px 10px"}} data-id={item.id} key={item.id} onClick={self.tab}>{item.statisticsDate.split("-").splice(1,1) + "月"}</Button>
                    // }else if(self.state.writeDate.templateCode=="100"){
                    //   return <Button style={{margin:"5px 10px"}} data-id={item.id} key={item.id} onClick={self.tab}>{item.statisticsDate.split("-").splice(1,2).join("月")+"日"}</Button>
                    // }
                  })
                }
                  </RadioGroup>
              </Col>
            </Row>
            {/*表单*/}
            <Form onSubmit={this.handleSubmit} hideRequiredMark layout="inline"  style={{margin:"30px"}}>
                {/*1*/}
                <h3 style={{background:"#108fe9",color:"#fff",textAlign:"center",padding:"10px",margin:"20px"}}>水上搜救应急管理</h3>

                <FormItem label={items.emowsar1} id="emowsar1" validateStatus={this.state.emowsar1ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('emowsar1', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                          initialValue: this.state.emowsar1,
                          pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.emowsar1}/>
                    )}
                </FormItem>

                <FormItem label={items.emowsar2} id="emowsar2" validateStatus={this.state.emowsar2ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('emowsar2', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.emowsar2,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.emowsar2}/>
                  )}
                </FormItem>
                
                <FormItem label={items.emowsar3} validateStatus={this.state.emowsar3ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('emowsar3', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.emowsar3,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.emowsar3}/>
                  )}
                </FormItem>
                
                <FormItem label={items.emowsar4} validateStatus={this.state.emowsar4ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('emowsar4', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.emowsar4,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.emowsar4}/>
                  )}
                </FormItem>

                <FormItem label={items.emowsar5} validateStatus={this.state.emowsar5ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('emowsar5', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.emowsar5,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.emowsar5}/>
                  )}
                </FormItem>

                <FormItem label={items.emowsar6} validateStatus={this.state.emowsar6ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('emowsar6', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.emowsar6,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.emowsar6}/>
                  )}
                </FormItem>

                <FormItem label={items.emowsar7} validateStatus={this.state.emowsar7ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('emowsar7', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.emowsar7,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.emowsar7}/>
                  )}
                </FormItem>

                <FormItem label={items.emowsar8} validateStatus={this.state.emowsar8ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('emowsar8', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.emowsar8,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.emowsar8}/>
                  )}
                </FormItem>

                <FormItem label={items.emowsar9} validateStatus={this.state.emowsar9ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('emowsar9', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.emowsar9,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.emowsar9}/>
                  )}
                </FormItem>

                <FormItem label={items.emowsar10} validateStatus={this.state.emowsar10ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('emowsar10', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.emowsar10,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.emowsar10}/>
                    )}
                </FormItem>

                <FormItem label={items.emowsar11} validateStatus={this.state.emowsar11ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('emowsar11', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.emowsar11,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.emowsar11}/>
                    )}
                </FormItem>

                <FormItem label={items.emowsar12} validateStatus={this.state.emowsar12ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('emowsar12', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.emowsar12,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.emowsar12}/>
                    )}
                </FormItem>

                <FormItem label={items.emowsar13} validateStatus={this.state.emowsar13ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('emowsar13', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.emowsar13,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.emowsar13}/>
                    )}
                </FormItem>
                {/*2*/}
                <h3 style={{background:"#108fe9",color:"#fff",textAlign:"center",padding:"10px",margin:"20px"}}>事故调查处理</h3>

                <FormItem label={items.aiah1} id="aiah1" validateStatus={this.state.aiah1ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('aiah1', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                          initialValue: this.state.aiah1,
                          pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.aiah1}/>
                    )}
                </FormItem>

                <FormItem label={items.aiah2} id="aiah2" validateStatus={this.state.aiah2ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('aiah2', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.aiah2,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.aiah2}/>
                  )}
                </FormItem>

                <FormItem label={items.aiah3} validateStatus={this.state.aiah3ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('aiah3', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.aiah3,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.aiah3}/>
                  )}
                </FormItem>

                <FormItem label={items.aiah4} validateStatus={this.state.aiah4ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('aiah4', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.aiah4,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.aiah4}/>
                  )}
                </FormItem>

                <FormItem label={items.aiah5} validateStatus={this.state.aiah5ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('aiah5', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.aiah5,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.aiah5}/>
                  )}
                </FormItem>

                <FormItem label={items.aiah6} validateStatus={this.state.aiah6ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('aiah6', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.aiah6,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.aiah6}/>
                  )}
                </FormItem>

                <FormItem label={items.aiah7} validateStatus={this.state.aiah7ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('aiah7', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.aiah7,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.aiah7}/>
                  )}
                </FormItem>

                <FormItem label={items.aiah8} validateStatus={this.state.aiah8ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('aiah8', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.aiah8,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.aiah8}/>
                  )}
                </FormItem>

                <FormItem label={items.aiah9} validateStatus={this.state.aiah9ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('aiah9', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.aiah9,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.aiah9}/>
                  )}
                </FormItem>
                {/*3*/}
                <h3 style={{background:"#108fe9",color:"#fff",textAlign:"center",padding:"10px",margin:"20px"}}>执法检查与隐患排查</h3>

                <FormItem label={items.leiahti1} id="leiahti1" validateStatus={this.state.leiahti1ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('leiahti1', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                          initialValue: this.state.leiahti1,
                          pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.leiahti1}/>
                    )}
                </FormItem>

                <FormItem label={items.leiahti2} id="leiahti2" validateStatus={this.state.leiahti2ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('leiahti2', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.leiahti2,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.leiahti2}/>
                  )}
                </FormItem>

                <FormItem label={items.leiahti3} validateStatus={this.state.leiahti3ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('leiahti3', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.leiahti3,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.leiahti3}/>
                  )}
                </FormItem>

                <FormItem label={items.leiahti4} validateStatus={this.state.leiahti4ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('leiahti4', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.leiahti4,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.leiahti4}/>
                  )}
                </FormItem>

                <FormItem label={items.leiahti5} validateStatus={this.state.leiahti5ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('leiahti5', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.leiahti5,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.leiahti5}/>
                  )}
                </FormItem>

                <FormItem label={items.leiahti6} validateStatus={this.state.leiahti6ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('leiahti6', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.leiahti6,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.leiahti6}/>
                  )}
                </FormItem>

                <FormItem label={items.leiahti7} validateStatus={this.state.leiahti7ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('leiahti7', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.leiahti7,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.leiahti7}/>
                  )}
                </FormItem>

                <FormItem label={items.leiahti8} validateStatus={this.state.leiahti8ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('leiahti8', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.leiahti8,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.leiahti8}/>
                  )}
                </FormItem>

                <FormItem label={items.leiahti9} validateStatus={this.state.leiahti9ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('leiahti9', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.leiahti9,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.leiahti9}/>
                  )}
                </FormItem>

                <FormItem label={items.leiahti10} validateStatus={this.state.leiahti10ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('leiahti10', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.leiahti10,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.leiahti10}/>
                    )}
                </FormItem>

                <FormItem label={items.leiahti11} validateStatus={this.state.leiahti11ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('leiahti11', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.leiahti11,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.leiahti11}/>
                    )}
                </FormItem>

                <FormItem label={items.leiahti12} validateStatus={this.state.leiahti12ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('leiahti12', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.leiahti12,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.leiahti12}/>
                    )}
                </FormItem>

                <FormItem label={items.leiahti13} validateStatus={this.state.leiahti13ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('leiahti13', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.leiahti13,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.leiahti13}/>
                    )}
                </FormItem>

                <FormItem label={items.leiahti14} validateStatus={this.state.leiahti14ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('leiahti14', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.leiahti14,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.leiahti14}/>
                  )}
                </FormItem>

                <FormItem label={items.leiahti15} validateStatus={this.state.leiahti15ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('leiahti15', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.leiahti15,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.leiahti15}/>
                    )}
                </FormItem>

                <FormItem label={items.leiahti16} validateStatus={this.state.leiahti16ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('leiahti16', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.leiahti16,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.leiahti16}/>
                    )}
                </FormItem>

                <FormItem label={items.leiahti17} validateStatus={this.state.leiahti17ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('leiahti17', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.leiahti17,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.leiahti17}/>
                    )}
                </FormItem>

                <FormItem label={items.leiahti18} validateStatus={this.state.leiahti18ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('leiahti18', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.leiahti18,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.leiahti18}/>
                    )}
                </FormItem>
                {/*4*/}
                <h3 style={{background:"#108fe9",color:"#fff",textAlign:"center",padding:"10px",margin:"20px"}}>船舶安全监督</h3>

                <FormItem label={items.sss1} id="sss1" validateStatus={this.state.sss1ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('sss1', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                          initialValue: this.state.number,
                          pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.sss1}/>
                    )}
                </FormItem>

                <FormItem label={items.sss2} id="sss2" validateStatus={this.state.sss2ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('sss2', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.sss2,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.sss2}/>
                  )}
                </FormItem>

                <FormItem label={items.sss3} validateStatus={this.state.sss3ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('sss3', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.sss3,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.sss3}/>
                  )}
                </FormItem>

                <FormItem label={items.sss4} validateStatus={this.state.sss4ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('sss4', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.sss4,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.sss4}/>
                  )}
                </FormItem>

                <FormItem label={items.sss5} validateStatus={this.state.sss5ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('sss5', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.sss5,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.sss5}/>
                  )}
                </FormItem>

                <FormItem label={items.sss6} validateStatus={this.state.sss6ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('sss6', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.sss6,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.sss6}/>
                  )}
                </FormItem>

                <FormItem label={items.sss7} validateStatus={this.state.sss7ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('sss7', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.sss7,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.sss7}/>
                  )}
                </FormItem>

                <FormItem label={items.sss8} validateStatus={this.state.sss8ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('sss8', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.sss8,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.sss8}/>
                  )}
                </FormItem>

                <FormItem label={items.sss9} validateStatus={this.state.sss9ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('sss9', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.sss9,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.sss9}/>
                  )}
                </FormItem>

                <FormItem label={items.sss10} validateStatus={this.state.sss10ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('sss10', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.sss10,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.sss10}/>
                    )}
                </FormItem>

                <FormItem label={items.sss11} validateStatus={this.state.sss11ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('sss11', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.sss11,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.sss11}/>
                    )}
                </FormItem>

                <FormItem label={items.sss12} validateStatus={this.state.sss12ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('sss12', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.sss12,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.sss12}/>
                    )}
                </FormItem>

                <FormItem label={items.sss13} validateStatus={this.state.sss13ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('sss13', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                        initialValue: this.state.sss13,
                        pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.sss13}/>
                    )}
                </FormItem>

                <FormItem label={items.sss14} validateStatus={this.state.sss14ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('sss14', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.sss14,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.sss14}/>
                  )}
                </FormItem>
                {/*5*/}
                <h3 style={{background:"#108fe9",color:"#fff",textAlign:"center",padding:"10px",margin:"20px"}}>水上水下活动通航安全管理</h3>

                <FormItem label={items.nsmowaua1} id="nsmowaua1" validateStatus={this.state.nsmowaua1ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('nsmowaua1', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                          initialValue: this.state.number,
                          pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.nsmowaua1}/>
                    )}
                </FormItem>

                <FormItem label={items.nsmowaua2} id="nsmowaua2" validateStatus={this.state.nsmowaua2ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('nsmowaua2', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.nsmowaua2,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.nsmowaua2}/>
                  )}
                </FormItem>

                <FormItem label={items.nsmowaua3} validateStatus={this.state.nsmowaua3ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('nsmowaua3', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.nsmowaua3,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.nsmowaua3}/>
                  )}
                </FormItem>

                <FormItem label={items.nsmowaua4} validateStatus={this.state.nsmowaua4ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('nsmowaua4', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.nsmowaua4,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.nsmowaua4}/>
                  )}
                </FormItem>

                <FormItem label={items.nsmowaua5} validateStatus={this.state.nsmowaua5ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('nsmowaua5', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.nsmowaua5,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.nsmowaua5}/>
                  )}
                </FormItem>

                <FormItem label={items.nsmowaua6} validateStatus={this.state.nsmowaua6ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('nsmowaua6', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.nsmowaua6,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.nsmowaua6}/>
                  )}
                </FormItem>

                <FormItem label={items.nsmowaua7} validateStatus={this.state.nsmowaua7ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('nsmowaua7', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.nsmowaua7,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.nsmowaua7}/>
                  )}
                </FormItem>
                {/*6*/}
                <h3 style={{background:"#108fe9",color:"#fff",textAlign:"center",padding:"10px",margin:"20px"}}>危险货物运输、防污染管理</h3>

                <FormItem label={items.todgaam1} id="todgaam1" validateStatus={this.state.todgaam1ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('todgaam1', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                          initialValue: this.state.number,
                          pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.todgaam1}/>
                    )}
                </FormItem>

                <FormItem label={items.todgaam2} id="todgaam2" validateStatus={this.state.todgaam2ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('todgaam2', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.todgaam2,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.todgaam2}/>
                  )}
                </FormItem>

                <FormItem label={items.todgaam3} validateStatus={this.state.todgaam3ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('todgaam3', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.todgaam3,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.todgaam3}/>
                  )}
                </FormItem>

                <FormItem label={items.todgaam4} validateStatus={this.state.todgaam4ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('todgaam4', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.todgaam4,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.todgaam4}/>
                  )}
                </FormItem>

                <FormItem label={items.todgaam5} validateStatus={this.state.todgaam5ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('todgaam5', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.todgaam5,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.todgaam5}/>
                  )}
                </FormItem>

                <FormItem label={items.todgaam6} validateStatus={this.state.todgaam6ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('todgaam6', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.todgaam6,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.todgaam6}/>
                  )}
                </FormItem>

                <FormItem label={items.todgaam7} validateStatus={this.state.todgaam7ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('todgaam7', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.todgaam7,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.todgaam7}/>
                  )}
                </FormItem>

                <FormItem label={items.todgaam8} validateStatus={this.state.todgaam8ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('todgaam8', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.todgaam8,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.todgaam8}/>
                  )}
                </FormItem>


                <Row>
                <Col span={4} offset={10} style={{marginTop:"5%"}}>
                  <Button style={{width:"100%",height:"40px"}}  type="primary"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}>上报</Button>
                </Col>
                </Row>
              </Form>
        </div>
    );
  }
    emowsar1=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                emowsar1ValueT: "error"
            })
        }
        else {
            this.setState({
                emowsar1ValueT: "success"
            })
        }
    } else {
        this.setState({
            emowsar1ValueT: "error"
        })
    }
  }

    emowsar2=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                emowsar2ValueT: "error"
            })
        }
        else {
            this.setState({
                emowsar2ValueT: "success"
            })
        }
    } else {
        this.setState({
            emowsar2ValueT: "error"
        })
    }
  }

    emowsar3=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                emowsar3ValueT: "error"
            })
        }
        else {
            this.setState({
                emowsar3ValueT: "success"
            })
        }
    } else {
        this.setState({
            emowsar3ValueT: "error"
        })
    }
  }

    emowsar4=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                emowsar4ValueT: "error"
            })
        }
        else {
            this.setState({
                emowsar4ValueT: "success"
            })
        }
    } else {
        this.setState({
            emowsar4ValueT: "error"
        })
    }
  }

    emowsar5=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                emowsar5ValueT: "error"
            })
        }
        else {
            this.setState({
                emowsar5ValueT: "success"
            })
        }
    } else {
        this.setState({
            emowsar5ValueT: "error"
        })
    }
  }

    emowsar6=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                emowsar6ValueT: "error"
            })
        }
        else {
            this.setState({
                emowsar6ValueT: "success"
            })
        }
    } else {
        this.setState({
            emowsar6ValueT: "error"
        })
    }
  }

    emowsar7=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                emowsar7ValueT: "error"
            })
        }
        else {
            this.setState({
                emowsar7ValueT: "success"
            })
        }
    } else {
        this.setState({
            emowsar7ValueT: "error"
        })
    }
  }

    emowsar8=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                emowsar8ValueT: "error"
            })
        }
        else {
            this.setState({
                emowsar8ValueT: "success"
            })
        }
    } else {
        this.setState({
            emowsar8ValueT: "error"
        })
    }
  }


    emowsar9=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                emowsar9ValueT: "error"
            })
        }
        else {
            this.setState({
                emowsar9ValueT: "success"
            })
        }
    } else {
        this.setState({
            emowsar9ValueT: "error"
        })
    }
  }

 emowsar10=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                emowsar10ValueT: "error"
            })
        }
        else {
            this.setState({
                emowsar10ValueT: "success"
            })
        }
    } else {
        this.setState({
            emowsar10ValueT: "error"
        })
    }
  }

   emowsar11=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                emowsar11ValueT: "error"
            })
        }
        else {
            this.setState({
                emowsar11ValueT: "success"
            })
        }
    } else {
        this.setState({
            emowsar11ValueT: "error"
        })
    }
  }

    emowsar12=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                emowsar12ValueT: "error"
            })
        }
        else {
            this.setState({
                emowsar12ValueT: "success"
            })
        }
    } else {
        this.setState({
            emowsar12ValueT: "error"
        })
    }
  }

    emowsar13=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                emowsar13ValueT: "error"
            })
        }
        else {
            this.setState({
                emowsar3ValueT: "success"
            })
        }
    } else {
        this.setState({
            emowsar13ValueT: "error"
        })
    }
  }


   aiah1=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                aiah1ValueT: "error"
            })
        }
        else {
            this.setState({
                aiah1ValueT: "success"
            })
        }
    } else {
        this.setState({
            aiah1ValueT: "error"
        })
    }
  }

    aiah2=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                aiah2ValueT: "error"
            })
        }
        else {
            this.setState({
                aiah2ValueT: "success"
            })
        }
    } else {
        this.setState({
            aiah2ValueT: "error"
        })
    }
  }

    aiah3=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                aiah3ValueT: "error"
            })
        }
        else {
            this.setState({
                aiah3ValueT: "success"
            })
        }
    } else {
        this.setState({
            aiah3ValueT: "error"
        })
    }
  }

    aiah4=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                aiah4ValueT: "error"
            })
        }
        else {
            this.setState({
                aiah4ValueT: "success"
            })
        }
    } else {
        this.setState({
            aiah4ValueT: "error"
        })
    }
  }

    aiah5=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                aiah5ValueT: "error"
            })
        }
        else {
            this.setState({
                aiah5ValueT: "success"
            })
        }
    } else {
        this.setState({
            aiah5ValueT: "error"
        })
    }
  }

    aiah6=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                aiah6ValueT: "error"
            })
        }
        else {
            this.setState({
                aiah6ValueT: "success"
            })
        }
    } else {
        this.setState({
            aiah6ValueT: "error"
        })
    }
  }

    aiah7=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                aiah7ValueT: "error"
            })
        }
        else {
            this.setState({
                aiah7ValueT: "success"
            })
        }
    } else {
        this.setState({
            aiah7ValueT: "error"
        })
    }
  }

    aiah8=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                aiah8ValueT: "error"
            })
        }
        else {
            this.setState({
                aiah8ValueT: "success"
            })
        }
    } else {
        this.setState({
            aiah8ValueT: "error"
        })
    }
  }

    aiah9=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                aiah9ValueT: "error"
            })
        }
        else {
            this.setState({
                aiah9ValueT: "success"
            })
        }
    } else {
        this.setState({
            aiah9ValueT: "error"
        })
    }
  }


  leiahti1=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti1ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti1ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti1ValueT: "error"
        })
    }
  }

    leiahti2=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti2ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti2ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti2ValueT: "error"
        })
    }
  }

    leiahti3=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti3ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti3ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti3ValueT: "error"
        })
    }
  }

    leiahti4=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti4ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti4ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti4ValueT: "error"
        })
    }
  }

    leiahti5=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti5ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti5ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti5ValueT: "error"
        })
    }
  }

    leiahti6=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti6ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti6ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti6ValueT: "error"
        })
    }
  }

    leiahti7=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti7ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti7ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti7ValueT: "error"
        })
    }
  }

    leiahti8=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti8ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti8ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti8ValueT: "error"
        })
    }
  }


    leiahti9=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti9ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti9ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti9ValueT: "error"
        })
    }
  }

 leiahti10=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti10ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti10ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti10ValueT: "error"
        })
    }
  }

   leiahti11=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti11ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti11ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti11ValueT: "error"
        })
    }
  }

    leiahti12=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti12ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti12ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti12ValueT: "error"
        })
    }
  }

    leiahti13=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti13ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti13ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti13ValueT: "error"
        })
    }
  }
   leiahti14=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti14ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti14ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti14ValueT: "error"
        })
    }
  }

    leiahti15=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti15ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti15ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti15ValueT: "error"
        })
    }
  }

    leiahti16=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti16ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti16ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti16ValueT: "error"
        })
    }
  }

    leiahti17=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti17ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti17ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti17ValueT: "error"
        })
    }
  }

    leiahti18=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                leiahti18ValueT: "error"
            })
        }
        else {
            this.setState({
                leiahti18ValueT: "success"
            })
        }
    } else {
        this.setState({
            leiahti18ValueT: "error"
        })
    }
  }

  sss1=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                sss1ValueT: "error"
            })
        }
        else {
            this.setState({
                sss1ValueT: "success"
            })
        }
    } else {
        this.setState({
            sss1ValueT: "error"
        })
    }
  }

    sss2=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                sss2ValueT: "error"
            })
        }
        else {
            this.setState({
                sss2ValueT: "success"
            })
        }
    } else {
        this.setState({
            sss2ValueT: "error"
        })
    }
  }

    sss3=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                sss3ValueT: "error"
            })
        }
        else {
            this.setState({
                sss3ValueT: "success"
            })
        }
    } else {
        this.setState({
            sss3ValueT: "error"
        })
    }
  }

    sss4=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                sss4ValueT: "error"
            })
        }
        else {
            this.setState({
                sss4ValueT: "success"
            })
        }
    } else {
        this.setState({
            sss4ValueT: "error"
        })
    }
  }

    sss5=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                sss5ValueT: "error"
            })
        }
        else {
            this.setState({
                sss5ValueT: "success"
            })
        }
    } else {
        this.setState({
            sss5ValueT: "error"
        })
    }
  }

    sss6=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                sss6ValueT: "error"
            })
        }
        else {
            this.setState({
                sss6ValueT: "success"
            })
        }
    } else {
        this.setState({
            sss6ValueT: "error"
        })
    }
  }

    sss7=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                sss7ValueT: "error"
            })
        }
        else {
            this.setState({
                sss7ValueT: "success"
            })
        }
    } else {
        this.setState({
            sss7ValueT: "error"
        })
    }
  }

    sss8=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                sss8ValueT: "error"
            })
        }
        else {
            this.setState({
                sss8ValueT: "success"
            })
        }
    } else {
        this.setState({
            sss8ValueT: "error"
        })
    }
  }


    sss9=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                sss9ValueT: "error"
            })
        }
        else {
            this.setState({
                sss9ValueT: "success"
            })
        }
    } else {
        this.setState({
            sss9ValueT: "error"
        })
    }
  }

 sss10=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                sss10ValueT: "error"
            })
        }
        else {
            this.setState({
                sss10ValueT: "success"
            })
        }
    } else {
        this.setState({
            sss10ValueT: "error"
        })
    }
  }

   sss11=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                sss11ValueT: "error"
            })
        }
        else {
            this.setState({
                sss11ValueT: "success"
            })
        }
    } else {
        this.setState({
            sss11ValueT: "error"
        })
    }
  }

    sss12=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                sss12ValueT: "error"
            })
        }
        else {
            this.setState({
                sss12ValueT: "success"
            })
        }
    } else {
        this.setState({
            sss12ValueT: "error"
        })
    }
  }

    sss13=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                sss13ValueT: "error"
            })
        }
        else {
            this.setState({
                sss13ValueT: "success"
            })
        }
    } else {
        this.setState({
            sss13ValueT: "error"
        })
    }
  }
   sss14=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                sss14ValueT: "error"
            })
        }
        else {
            this.setState({
                sss14ValueT: "success"
            })
        }
    } else {
        this.setState({
            sss14ValueT: "error"
        })
    }
  }



  nsmowaua1=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                nsmowaua1ValueT: "error"
            })
        }
        else {
            this.setState({
                nsmowaua1ValueT: "success"
            })
        }
    } else {
        this.setState({
            nsmowaua1ValueT: "error"
        })
    }
  }

    nsmowaua2=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                nsmowaua2ValueT: "error"
            })
        }
        else {
            this.setState({
                nsmowaua2ValueT: "success"
            })
        }
    } else {
        this.setState({
            nsmowaua2ValueT: "error"
        })
    }
  }

    nsmowaua3=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                nsmowaua3ValueT: "error"
            })
        }
        else {
            this.setState({
                nsmowaua3ValueT: "success"
            })
        }
    } else {
        this.setState({
            nsmowaua3ValueT: "error"
        })
    }
  }

    nsmowaua4=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                nsmowaua4ValueT: "error"
            })
        }
        else {
            this.setState({
                nsmowaua4ValueT: "success"
            })
        }
    } else {
        this.setState({
            nsmowaua4ValueT: "error"
        })
    }
  }

    nsmowaua5=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                nsmowaua5ValueT: "error"
            })
        }
        else {
            this.setState({
                nsmowaua5ValueT: "success"
            })
        }
    } else {
        this.setState({
            nsmowaua5ValueT: "error"
        })
    }
  }

    nsmowaua6=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                nsmowaua6ValueT: "error"
            })
        }
        else {
            this.setState({
                nsmowaua6ValueT: "success"
            })
        }
    } else {
        this.setState({
            nsmowaua6ValueT: "error"
        })
    }
  }

    nsmowaua7=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                nsmowaua7ValueT: "error"
            })
        }
        else {
            this.setState({
                nsmowaua7ValueT: "success"
            })
        }
    } else {
        this.setState({
            nsmowaua7ValueT: "error"
        })
    }
  }

    todgaam1=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                todgaam1ValueT: "error"
            })
        }
        else {
            this.setState({
                todgaam1ValueT: "success"
            })
        }
    } else {
        this.setState({
            todgaam1ValueT: "error"
        })
    }
  }

    todgaam2=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                todgaam2ValueT: "error"
            })
        }
        else {
            this.setState({
                todgaam2ValueT: "success"
            })
        }
    } else {
        this.setState({
            todgaam2ValueT: "error"
        })
    }
  }

    todgaam3=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                todgaam3ValueT: "error"
            })
        }
        else {
            this.setState({
                todgaam3ValueT: "success"
            })
        }
    } else {
        this.setState({
            todgaam3ValueT: "error"
        })
    }
  }

    todgaam4=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                todgaam4ValueT: "error"
            })
        }
        else {
            this.setState({
                todgaam4ValueT: "success"
            })
        }
    } else {
        this.setState({
            todgaam4ValueT: "error"
        })
    }
  }

    todgaam5=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                todgaam5ValueT: "error"
            })
        }
        else {
            this.setState({
                todgaam5ValueT: "success"
            })
        }
    } else {
        this.setState({
            todgaam5ValueT: "error"
        })
    }
  }

    todgaam6=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                todgaam6ValueT: "error"
            })
        }
        else {
            this.setState({
                todgaam6ValueT: "success"
            })
        }
    } else {
        this.setState({
            todgaam6ValueT: "error"
        })
    }
  }

    todgaam7=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                todgaam7ValueT: "error"
            })
        }
        else {
            this.setState({
                todgaam7ValueT: "success"
            })
        }
    } else {
        this.setState({
            todgaam7ValueT: "error"
        })
    }
  }

    todgaam8=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                todgaam8ValueT: "error"
            })
        }
        else {
            this.setState({
                todgaam8ValueT: "success"
            })
        }
    } else {
        this.setState({
            todgaam8ValueT: "error"
        })
    }
  }




}

const FromListFrom = Form.create()(FromList);
export default FromListFrom;