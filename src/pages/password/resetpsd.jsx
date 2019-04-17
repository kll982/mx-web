import React from "react";
import { Form, Input, Tooltip, Icon, Cascader, DatePicker, Select, Row, Col,Modal, Checkbox, Button } from 'antd';

const Option = Select.Option;
import {hashHistory} from "react-router"
import $jsonp from "../../utils/service.js";
import api from "../../utils/api.js";
import styles from "./reset.less";
class RetPsdForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      confirmDirty: false,
    };
  }
  componentWillMount() {
  
  }
  componentDidMount() {
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkSourepsd = (rule, value, callback) => {
    const form = this.props.form;
    
    if(form.getFieldValue('sourcepsd').length<1){
      callback("输入密码长度至少为1位");
    } 
    callback()
  }
 
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
       if(form.getFieldValue('password').length<1){
          callback("输入密码长度至少为1位");
        }
        form.validateFields(['confirm'], { force: true });
        callback()
        return 
    }
    if(value && form.getFieldValue('password').length<1){
      callback("输入密码长度至少为1位");
    }
    callback()
   
  }

   checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }


  handleSubmit=(e)=>{
    let self=this;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        $jsonp(self,api.updateBmPwd,{
            oldPassword:values.sourcepsd,
            newPassword:values.password,
            newPassword1:values.confirm
        }).then((res)=>{
          console.log(res)
          Modal.success({
            title:"提示",
            content:"修改成功",
            onOk:function(){
                hashHistory.push({
                  pathname:"/main/home"
                })
            }
          })
        }).catch((res) => {
          console.log(res)
        })
      }
    });
  }

  returnbacktopage=(e)=>{
		window.history.go(-1)
	}

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <div className={styles.formcon}>
      <p className={styles.title}>修改密码</p>
      <Button type="primary" className={styles.returnPage} onClick={this.returnbacktopage.bind(this)} size="large">返回</Button>
      <Form onSubmit={this.handleSubmit}>
    
        <Form.Item
          {...formItemLayout}
         
          hasFeedback
        >
          {getFieldDecorator('sourcepsd', {
            rules: [{
              required: true, message: '密码格式不正确',
            },
            {validator: this.checkSourepsd,}],
          })(
            <Input type="password" placeholder="请输入原密码" autoComplete="off"/>
          )}
        </Form.Item>
         <Form.Item
          {...formItemLayout}
         
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '密码格式不正确',
            },
              {validator: this.checkConfirm,}
            ],
          })(
            <Input type="password" placeholder="请输入新密码" autoComplete="off"/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '密码格式不正确',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} placeholder="请再次输入新密码" autoComplete="off"/>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.submitbtn} size="large">保存</Button>
        </Form.Item>
       
      </Form>
      </div>
    )
  }
}

let resetForm = Form.create()(RetPsdForm);
export default resetForm;
