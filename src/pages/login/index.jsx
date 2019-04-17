import React from 'react';
import { Form, Input, Button, Icon, Row, Col } from 'antd';
import { hashHistory } from 'react-router';
import $jsonp from "../../utils/service.js";
import api from "../../utils/api.js";
import styles from './index.less';
import titlepng from "../../img/logo-x2.png";
import usernamepng from "../../img/username.png";
import userpasswpord from "../../img/userpasswpord.png";
import qrcodeicon from "../../img/qrcodeicon.png";
import qrcodetwo from "../../img/qrcodetwo.png";
import qrcodecomputer from "../../img/qrcodecomputer.png";
import qrcodecontent from "../../../ico/qrcodecontent.png";
import $jsonp3 from "../../utils/service3";


const FormItem = Form.Item;

function e0(arr, items, key) {
    if (items.children && items.children.length > 0) {
        items.children.map((itemss, indexss) => {
            if (itemss.code == key) {
                arr.push(itemss);
            }
            e0(arr, itemss, key);
        })
    }
}

function e1(arr, key, departsArr) {
    departsArr.map((item, index) => {
        if (item.code == key) {
            arr.push(item);
        }
        e0(arr, item, key);
    })
}
let self;
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            userName: "",
            psd: "",
            loading: false,
            loginContentVisible: true,
            height: ""
        }
    }

    componentWillMount() {

        localStorage.setItem("head", api.apiHeader);
        localStorage.setItem("headLogin", api.apiLoginHeader);
        var height = window.screen.Height;
        this.setState({
            height: height
        })
        $jsonp(self, api.checkBmSSO, {}).then((response) => {
            if (response.data.response.ok) {

                $jsonp(self, api.findPrivileges, {}).then((res) => {
                    let response = res.data.response;
                    localStorage.setItem("userMenu", JSON.stringify(response.list))
                    localStorage.setItem("isroot", response.isroot);

                    $jsonp(self, api.getUserInfo, {}).then((resp) => {
                        let userresponse = resp.data.response;
                        localStorage.setItem("userInfo", JSON.stringify(userresponse.companyEmployee));
                        localStorage.setItem("userCode", userresponse.code);
                        setTimeout(function () {
                            self.setState({
                                loading: false
                            })
                            $jsonp3(self, api.getUserLevel, {})
                                .then((respon) => {
                                    localStorage.setItem("level", respon.data.response.level)
                                    if (respon.data.response.level == "省" || respon.data.response.level == "市") {
                                        hashHistory.push({
                                            pathname: "/main/home",
                                        })
                                    } else {
                                        hashHistory.push({
                                            pathname: "/main/trouble_report",
                                        })
                                    }
                                })
                        }, 0)
                    })
                })
            }
        });
    }

    componentDidMount() {
    }

    handleSubmit = (e) => {
        self.setState({
            loading: true,
        })
        e.preventDefault();
        let formData = this.props.form.getFieldsValue();
        $jsonp(self, api.login, {
            mobile: formData.username,
            password: formData.password
        }).then((res) => {
            let response = res.data.response;
            localStorage.setItem("userMenu", JSON.stringify([]))
            localStorage.setItem("isroot", 0);

            $jsonp(self, api.findPrivileges, {}).then((res) => {
                let response = res.data.response;
                localStorage.setItem("userMenu", JSON.stringify(response.list))
                localStorage.setItem("isroot", response.isroot);
                $jsonp(self, api.getUserInfo, {}).then((res) => {
                    let userresponse = res.data.response;
                    localStorage.setItem("userInfo", JSON.stringify(userresponse.companyEmployee));
                    localStorage.setItem("userCode", userresponse.code);
                    setTimeout(function () {
                        self.setState({
                            loading: false
                        })
                        $jsonp3(self, api.getUserLevel, {})
                            .then((res) => {
                                localStorage.setItem("level", res.data.response.level)
                                if (res.data.response.level == "省" || res.data.response.level == "市") {
                                    hashHistory.push({
                                        pathname: "/main/home",
                                    })
                                } else {
                                    hashHistory.push({
                                        pathname: "/main/trouble_report",
                                    })
                                }
                            })
                    }, 50)

                })
            })

        })
    }

    changeToQr = () => {
        var loginContentVisible = this.state.loginContentVisible;
        this.setState({
            loginContentVisible: !loginContentVisible
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div style={{ height: "100%", minWidth: "1200px" }}>
                <Row style={{ height: "100%" }}>
                    <div className={styles.MainTitleWrap}>
                        <div className={styles.mainArea}>
                            <img alt="logo" className={styles.logoImg} style={{
                            }} src="../../../ico/logo1.ico" />
                            <div className={styles.mainTitle}>
                                江苏省水路行业安全生产风险管理与隐患治理信息系统
                            </div>
                        </div>
                    </div>
                    {/*登录框*/}
                    <div className={styles.loginbg} style={{}}>
                        <div style={{
                            width: "1200px",
                            margin: "0 auto",
                            height: "100%",
                            position: "relative",
                            // display: "flex",
                            // flexDirection: "column",
                            // justifyContent: "center",
                            // alignItems: "flex-end",
                        }}>
                            <div className={styles.loginpagewrap}>
                                <div className={styles.inputpng}>
                                    {/*角标*/}
                                    <div className={styles.qrcode}
                                        style={{ display: this.state.loginContentVisible ? "block" : "none" }}>
                                        <span className={styles.qrcodetip}>
                                            <img src={qrcodeicon} alt="" />
                                            扫码下载客户端
                </span>
                                        <div className={styles.sectionqr} onClick={this.changeToQr.bind(this)}>
                                            <img src={qrcodetwo} alt="" />
                                            <div className={styles.whitetriangle}></div>
                                        </div>
                                    </div>

                                    <div className={styles.qrcode}
                                        style={{ display: this.state.loginContentVisible ? "none" : "block" }}>
                                        <div className={styles.sectionqr} onClick={this.changeToQr.bind(this)}>
                                            <img src={qrcodecomputer} alt="" />
                                            <div className={styles.whitetriangle}></div>
                                        </div>
                                    </div>
                                    {/*二维码*/}
                                    <div className={styles.qrcodeContent}
                                        style={{ display: this.state.loginContentVisible ? "none" : "block" }}>
                                        <img src={qrcodecontent} alt="" />
                                        <span className={styles.qrcodeContentLabel1}>海事</span>
                                        <span className={styles.qrcodeContentLabel}>扫描二维码下载手机客户端</span>
                                    </div>

                                    <p className={styles.title}
                                        style={{ display: this.state.loginContentVisible ? "block" : "none" }}>管理登录</p>
                                    <div className={styles.leftund}
                                        style={{ display: this.state.loginContentVisible ? "block" : "none" }}>
                                        <Form onSubmit={this.handleSubmit.bind(this)} multiple="multiple">
                                            <FormItem className={styles.formitem}>
                                                {getFieldDecorator('username', {
                                                    rules: [{ required: true, message: '请输入用户名/手机号' }],
                                                })(
                                                    <Input placeholder="请输入手机号" prefix={<img src={usernamepng} />} />
                                                )}
                                            </FormItem>
                                            <FormItem className={styles.formitem + " " + styles.formitem1} >
                                                {getFieldDecorator('password', {
                                                    rules: [{ required: true, message: '请输入密码' }],
                                                })(
                                                    <Input type="password" placeholder="请输入密码"
                                                        prefix={<img src={userpasswpord} />} />
                                                )}
                                            </FormItem>
                                            <Button type="primary" htmlType="submit" loading={this.state.loading}
                                                className={styles.loginBtn}>登录</Button>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.MainBottom}>
                        <div className={styles.mainArea}>
                            {/* <Col offset={4} span={20}
                                style={{ padding: "30px 0px", lineHeight: "1.5", fontSize: "16px" }}>
                                <h3>技术支持：南京中淼信息科技有限公司</h3>
                                <h3>协作支持：江苏省交通安全应急研究中心</h3>
                            </Col> */}
                            <span>苏ICP备18043568号</span>|
                            <span>服务热线：17002523999</span>|
                            <span>隐私政策</span>|
                            <span>技术支持：<img src="../../../ico/zhongmiaoLogo.png" alt="中淼信息" /></span>|
                            <span>协作支持：江苏省交通安全应急研究中心</span>
                        </div>
                    </div>
                </Row>
            </div>
        );
    }
}

const Login = Form.create()(LoginPage);
export default Login;
