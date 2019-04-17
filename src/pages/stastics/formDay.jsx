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
  column1:"投入的值班人员(人次)",
  column2:"出动海巡艇(艘次）",
  column3:"出动海巡艇巡航里程(公里）",
  column4:"渡口渡船渡运旅客(人次)",
  column5:"水上风景旅游区乘船游客(人次)",
  column6:"危险货物运输船舶申报（艘次）",
  column7:"危险货物运输船舶装卸量(吨)",
  column8:"12395等报警电话接/处警(次)",
  column9:"辖区发生的小事故(起)",
  column10:"辖区发生的一般及以上等级事故(起)"
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
    // let items = [
    //  {id:"column1",title:"投入的值班人员(人次)"},
    //  {id:"column2",title:"出动海巡艇(艘次）"},
    //  {id:"column3",title:"出动海巡艇巡航里程(公里）"},
    //  {id:"column4",title:"渡口渡船渡运旅客(人次)"},
    //  {id:"column5",title:"水上风景旅游区乘船游客(人次)"},
    //  {id:"column6",title:"危险货物运输船舶申报（艘次）"},
    //  {id:"column7",title:"危险货物运输船舶装卸量(吨)"},
    //  {id:"column8",title:"12395等报警电话接/处警(次)"},
    //  {id:"column9",title:"辖区发生的小事故(起)"},
    //  {id:"column10",title:"辖区发生的一般及以上等级事故(起)"}
    // ];

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
          writeDate : res.data.response.statisticListDto
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
        $jsonppost(self,api.SecurityRisk,{
				detailId:self.state.detailId,
				column1:Number(values.column1),
				column2:Number(values.column2),
				column3:Number(values.column3),
				column4:Number(values.column4),
				column5:Number(values.column5),
				column6:Number(values.column6),
				column7:Number(values.column7),
				column8:Number(values.column8),
				column9:Number(values.column9),
				column10:Number(values.column10),

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
                <Breadcrumb.Item>填写</Breadcrumb.Item>
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
                    //   return <RadioButton value={item.id}>{item.statisticsDate.split("-").splice(1,2).join("月")+"日"}</RadioButton>
                    if(self.state.writeDate.templateCode=="103"){
                      return <Button style={{margin:"5px 10px"}} data-id={item.id} key={item.id} onClick={self.tab}>{item.statisticsDate.split("-").splice(1,1) + "月"}</Button>
                    }else if(self.state.writeDate.templateCode=="100"){
                      return <Button style={{margin:"5px 10px"}} data-id={item.id} key={item.id} onClick={self.tab}>{item.statisticsDate.split("-").splice(1,2).join("月")+"日"}</Button>
                    }
                  })
                }
                  </RadioGroup>
              </Col>
            </Row>
            <h3 style={{background:"#108fe9",color:"#fff",textAlign:"center",padding:"10px",margin:"20px"}}>统计项目</h3>
            {/*表单*/}
            <Form onSubmit={this.handleSubmit} hideRequiredMark layout="inline"  style={{margin:"30px"}}>
                <FormItem label={items.column1} id="column1" validateStatus={this.state.column1ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                    {getFieldDecorator('column1', {
                        rules: [{
                          required: true,
                          message: '请输入数字',
                        }],
                          initialValue: this.state.number,
                          pattern:/^[0-9]*$/
                    })(
                        <Input placeholder="0" onChange={this.column1}/>
                    )}
                </FormItem>

                <FormItem label={items.column2} id="column2" validateStatus={this.state.column2ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('column2', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.column2,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.column2}/>
                  )}
                </FormItem>
                
                <FormItem label={items.column3} validateStatus={this.state.column3ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('column3', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.column3,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.column3}/>
                  )}
                </FormItem>
                
                <FormItem label={items.column4} validateStatus={this.state.column4ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('column4', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.column4,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.column4}/>
                  )}
                </FormItem>

                <FormItem label={items.column5} validateStatus={this.state.column5ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('column5', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.column5,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.column5}/>
                  )}
                </FormItem>

                <FormItem label={items.column6} validateStatus={this.state.column6ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('column6', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.column6,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.column6}/>
                  )}
                </FormItem>

                <FormItem label={items.column7} validateStatus={this.state.column7ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('column7', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.column7,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.column7}/>
                  )}
                </FormItem>

                <FormItem label={items.column8} validateStatus={this.state.column8ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('column8', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.column8,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.column8}/>
                  )}
                </FormItem>

                <FormItem label={items.column9} validateStatus={this.state.column9ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('column9', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.column9,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.column9}/>
                  )}
                </FormItem>

                <FormItem label={items.column10} validateStatus={this.state.column10ValueT} style={{width:"33%",boxSizing:"border-box",padding:"10px 3%",margin:"0",textAlign:"right"}}  hasFeedback>
                  {getFieldDecorator('column10', {
                    rules: [{
                      required: true,
                      message: '请输入数字',
                    }],
                      initialValue: this.state.column10,
                      pattern:/^[0-9]*$/
                  })(
                    <Input placeholder="0" onChange={this.column10}/>
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
    column1=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                column1ValueT: "error"
            })
        }
        else {
            this.setState({
                column1ValueT: "success"
            })
        }
    } else {
        this.setState({
            column1ValueT: "error"
        })
    }
  }

    column2=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                column2ValueT: "error"
            })
        }
        else {
            this.setState({
                column2ValueT: "success"
            })
        }
    } else {
        this.setState({
            column2ValueT: "error"
        })
    }
  }

    column3=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                column3ValueT: "error"
            })
        }
        else {
            this.setState({
                column3ValueT: "success"
            })
        }
    } else {
        this.setState({
            column3ValueT: "error"
        })
    }
  }

    column4=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                column4ValueT: "error"
            })
        }
        else {
            this.setState({
                column4ValueT: "success"
            })
        }
    } else {
        this.setState({
            column4ValueT: "error"
        })
    }
  }

    column5=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                column5ValueT: "error"
            })
        }
        else {
            this.setState({
                column5ValueT: "success"
            })
        }
    } else {
        this.setState({
            column5ValueT: "error"
        })
    }
  }

    column6=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                column6ValueT: "error"
            })
        }
        else {
            this.setState({
                column6ValueT: "success"
            })
        }
    } else {
        this.setState({
            column6ValueT: "error"
        })
    }
  }

    column7=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                column7ValueT: "error"
            })
        }
        else {
            this.setState({
                column7ValueT: "success"
            })
        }
    } else {
        this.setState({
            column7ValueT: "error"
        })
    }
  }

    column8=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                column8ValueT: "error"
            })
        }
        else {
            this.setState({
                column8ValueT: "success"
            })
        }
    } else {
        this.setState({
            column8ValueT: "error"
        })
    }
  }


    column9=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                column9ValueT: "error"
            })
        }
        else {
            this.setState({
                column9ValueT: "success"
            })
        }
    } else {
        this.setState({
            column9ValueT: "error"
        })
    }
  }

 column10=(e)=>{
    if (e.target.value !== "") {
        if (!(/^[0-9]*$/.test(e.target.value))) {
            this.setState({
                column10ValueT: "error"
            })
        }
        else {
            this.setState({
                column10ValueT: "success"
            })
        }
    } else {
        this.setState({
            column10ValueT: "error"
        })
    }
  }
}

const FromListFrom = Form.create()(FromList);
export default FromListFrom;