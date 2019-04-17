import React from 'react';
import {Form, Input, Button, Icon} from 'antd';
import {hashHistory} from 'react-router';
import $jsonp from "../../utils/service.js";
import api from "../../utils/api.js";
import styles from './index.less';
import inputpng from "../../img/input.png";
import titlepng from "../../img/logo-x1.png";
import successpng from "../../img/success.png";
const FormItem = Form.Item;
function e0(arr,items,key){
	if(items.children && items.children.length > 0){
		items.children.map((itemss,indexss) => {
		  if(itemss.code == key){
		      arr.push(itemss);
		  }
		  e0(arr,itemss,key);
		})
	}
}

function e1(arr,key,departsArr){
  departsArr.map((item,index) => {
    if(item.code == key){
      arr.push(item);
    }
    e0(arr,item,key);
  })
}
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      psd: "",
      loading:false,
    }
  }

  componentWillMount() {
    let self=this;
    $jsonp(self,api.checkBmSSO,{
    }).then((res)=>{
      console.log(res);
      if(res.data.response.ok){
        localStorage.setItem("saleIsHandleCount1", 0);
        localStorage.setItem("buyIsHandleCount1", 0);
        $jsonp(self,api.findPrivileges,{
        }).then((res)=>{
          let response=res.data.response;
          localStorage.setItem("userMenu", JSON.stringify(response.list))
          var arr1=[];
          e1(arr1,104100100,JSON.parse(localStorage.getItem("userMenu")));
          
          localStorage.setItem("roleBanks", JSON.stringify(response.roleBanks))
          localStorage.setItem("isroot", response.isroot);
          localStorage.setItem("isMaster",response.isMaster);
          $jsonp(self,api.getUserInfo,{
          }).then((res)=>{
            let userresponse=res.data.response;
            sessionStorage.setItem("zhijianrenAppid", userresponse.zhijianrenAppid)
            sessionStorage.setItem("zhijianrenSalerUrl", userresponse.zhijianrenSalerUrl)
            localStorage.setItem("userInfo", JSON.stringify(userresponse.companyEmployee));
              $jsonp(self,api.getByCompanyId,{}).then((res) => {
                var list=res.data.response.company;
                if((!list.tel || !list.shortName) && arr1.length>0){
                    hashHistory.push({
                      pathname: "/main/baseinfo",
                      state: { 
                        pupFlag:true
                      }
                    })
                
                }else{
                  hashHistory.push({
                    pathname: "/main/home",
                  })
                  
                }
  
              });
            
          })
        })
       
      }else{
        console.log("未登录");
      }
    });
  }

  componentDidMount() {
    
    
  }
 
 
  handleSubmit = (e) => {
    let self=this;
    self.setState({
      loading:true,
    })
    e.preventDefault();
    let formData = this.props.form.getFieldsValue();
    $jsonp(self, api.login, {
      mobile: formData.username,
      password: formData.password
    }).then((res) => {
        localStorage.setItem("saleIsHandleCount1", 0)
        localStorage.setItem("buyIsHandleCount1", 0)
        $jsonp(self,api.findPrivileges,{
        }).then((res)=>{
          let response=res.data.response;
          localStorage.setItem("userMenu", JSON.stringify(response.list))
          var arr1=[];
          e1(arr1,104100100,JSON.parse(localStorage.getItem("userMenu")));
         
          localStorage.setItem("roleBanks", JSON.stringify(response.roleBanks))
          localStorage.setItem("isroot", response.isroot);
          localStorage.setItem("isMaster",response.isMaster);
          $jsonp(self,api.getUserInfo,{
          }).then((res)=>{
            let userresponse=res.data.response;
            sessionStorage.setItem("zhijianrenAppid", userresponse.zhijianrenAppid)
            sessionStorage.setItem("zhijianrenSalerUrl", userresponse.zhijianrenSalerUrl)
            localStorage.setItem("userInfo", JSON.stringify(userresponse.companyEmployee));
             $jsonp(self,api.getByCompanyId,{}).then((res) => {
                var list=res.data.response.company;
                if((!list.tel || !list.shortName) && arr1.length>0)
                {
                    setTimeout(function(){
                      self.setState({
                        loading:false
                      })
                    hashHistory.push({
                      pathname: "/main/baseinfo",
                      state: { 
                        pupFlag:true
                      }
  
                    })
                  },50)
                }
                else
                {
                  setTimeout(function(){
                    self.setState({
                      loading:false
                    })
                    hashHistory.push({
                      pathname: "/main/home",
                    })
                  },50)
                }
  
              });
            
          })
        })
     
    })
  }
  
  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div className={styles.loginbg}>
      <img src={inputpng} className={styles.inputpng} />
      <img src={successpng} className={styles.successpng} />
      <div className={styles.bottoms}>南京金沂奥网络科技有限公司</div>
      <div className={styles.loginpagewrap}>
      <div>
      <p className={styles.title}><img src={titlepng} /></p>
      <div>
      <Form onSubmit={this.handleSubmit.bind(this)}>
      <FormItem className={styles.formitem}>
      {getFieldDecorator('username', {
        rules: [{required: true, message: '请输入用户名'}],
      })(
      <Input placeholder="用户名"/>
      )}
      </FormItem>
      <FormItem className={styles.formitem}>
      {getFieldDecorator('password', {
        rules: [{required: true, message: '请输入密码'}],
      })(
      <Input type="password" placeholder="密码"/>
      )}
      </FormItem>
      <Button type="primary" htmlType="submit" loading={this.state.loading}  className={styles.loginBtn}>登录</Button>
      </Form>
      </div>
      </div>
      </div>
      </div>
      );
  }
}

const Login = Form.create()(LoginPage);
export default Login;
