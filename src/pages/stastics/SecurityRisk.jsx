// 录入和编辑 水上交通安全情况督查

// 必填项未实现

import React from 'react';
import {Link, hashHistory} from 'react-router';
import {Input, Button, Row, Col, Breadcrumb, message, Modal, Radio} from 'antd';
import styles2 from "../admin/index.less";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import $jsonp from '../../utils/service.js';
import $jsonp3 from "../../utils/service3";
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";

import styles1 from "./addStatisticTask.less";

import publicstyle from "../../img/public.less";

import phone from "../../img/phone.png";
import Addstaff from "./addStatisticTask1";
import styles from "../admin/index.less";

let self, items = {
    column1: "投入的值班人员(人次)",
    column2: "出动海巡艇(艘次）",
    column3: "出动海巡艇巡航里程(公里）",
    column4: "渡口渡船渡运旅客(人次)",
    column5: "水上风景旅游区乘船游客(人次)",
    column6: "危险货物运输船舶申报（艘次）",
    column7: "危险货物运输船舶装卸量(吨)",
    column8: "12395等报警电话接/处警(次)",
    column9: "辖区发生的小事故(起)",
    column10: "辖区发生的一般及以上等级事故(起)"
}, forindate = [], data;

export default class SecurityRisk extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        // let items = [
        // 	{id:"column1",title:"投入的值班人员(人次)"},
        // 	{id:"column2",title:"出动海巡艇(艘次）"},
        // 	{id:"column3",title:"出动海巡艇巡航里程(公里）"},
        // 	{id:"column4",title:"渡口渡船渡运旅客(人次)"},
        // 	{id:"column5",title:"水上风景旅游区乘船游客(人次)"},
        // 	{id:"column6",title:"危险货物运输船舶申报（艘次）"},
        // 	{id:"column7",title:"危险货物运输船舶装卸量(吨)"},
        // 	{id:"column8",title:"12395等报警电话接/处警(次)"},
        // 	{id:"column9",title:"辖区发生的小事故(起)"},
        // 	{id:"column10",title:"辖区发生的一般及以上等级事故(起)"}
        // ];

        self.state = {
            value: "",
            column1Value: 0,
            column2Value: 0,
            column3Value: 0,
            column4Value: 0,
            column5Value: 0,
            column6Value: 0,
            column7Value: 0,
            column8Value: 0,
            column9Value: 0,
            column10Value: 0,
            userPhone: {},
            writeDate: {},
            detailId: ""
        }
    }

    // onlunch
    componentWillMount() {
    }

    // onload
    componentDidMount() {
        data = self.props.location.state;
        // 获取登录者手机号和姓名
        self.getPhone();
        self.getDate(data);
    }

    // 获取手机号
    getPhone = () => {
        $jsonp3(self, api.phone, {}).then((res) => {
            self.setState({
                userPhone: res.data.response.statisticListDto
            });
        });
    }
    getDate = (data) => {
        $jsonp3(self, api.InfoGetdelites, {
            id: data.id
        }).then((res) => {
            forindate = res.data.response.statisticListDto.specialStatsticsTaskInfoDetails;
            if (forindate.length != 0) {
                self.setState({
                    writeDate: res.data.response.statisticListDto,
                    detailId: res.data.response.statisticListDto.specialStatsticsTaskInfoDetails[0].id
                })
            } else {
                self.setState({
                    writeDate: res.data.response.statisticListDto,
                })
            }

        });
    }

    // 提交
    SecurityRisk = (e) => {
        if (self.state.detailId == "") {
            message.info('请选择上报日期');
            return
        }
        // // if (self.props.location.state.top == "add") {
        $jsonppost(self, api.SecurityRisk, {
            detailId: self.state.detailId,
            column1: Number(self.state.column1Value),
            column2: Number(self.state.column2Value),
            column3: Number(self.state.column3Value),
            column4: Number(self.state.column4Value),
            column5: Number(self.state.column5Value),
            column6: Number(self.state.column6Value),
            column7: Number(self.state.column7Value),
            column8: Number(self.state.column8Value),
            column9: Number(self.state.column9Value),
            column10: Number(self.state.column10Value)
        }).then((res) => {
            if (res.message == "ok") {
                message.success("已上报")
                // 	// 跳转路由
                // 	hashHistory.push({
                // 		pathname: '',
                // 		state: {
                // 			current: ""
                // 		}
                // 	})
            } else {
                message.info("请重试")
            }
        });
        // }
        // else {
        // 	$jsonppost(self, api.editSecurityRisk, {
        // 		detailId:self.state.detailId,
        // 		column1:Number(self.state.column1Value),
        // 		column2:Number(self.state.column2Value),
        // 		column3:Number(self.state.column3Value),
        // 		column4:Number(self.state.column4Value),
        // 		column5:Number(self.state.column5Value),
        // 		column6:Number(self.state.column6Value),
        // 		column7:Number(self.state.column7Value),
        // 		column8:Number(self.state.column8Value),
        // 		column9:Number(self.state.column9Value),
        // 		column10:Number(self.state.column10Value)
        // 	}).catch((error) => {
        // 		if(res.message=="ok"){
        // 			// 跳转路由
        // 			hashHistory.push({
        // 				pathname: '',
        // 				state: {
        // 					current: ""
        // 				}
        // 			})
        // 		}
        // 	});
        // }

    }
    onColumn1Change = (e) => {
        async function wait() {
            self.setState({
                column1Value: Number(e.target.value)
            })
        }

        wait().then();
    }

    onColumn2Change = (e) => {
        async function wait() {
            self.setState({
                column2Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onColumn3Change = (e) => {
        async function wait() {
            self.setState({
                column3Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onColumn4Change = (e) => {
        async function wait() {
            self.setState({
                column4Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onColumn5Change = (e) => {
        async function wait() {
            self.setState({
                column5Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onColumn6Change = (e) => {
        async function wait() {
            self.setState({
                column6Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onColumn7Change = (e) => {
        async function wait() {
            self.setState({
                column7Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onColumn8Change = (e) => {
        async function wait() {
            self.setState({
                column8Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onColumn9Change = (e) => {
        async function wait() {
            self.setState({
                column9Value: Number(e.target.value)
            })
        }

        wait().then();
    }

    onColumn10Change = (e) => {
        async function wait() {
            self.setState({
                column10Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    tab = (e) => {
        async function wait() {
            self.type = "primary";
            self.setState({
                selectId: e.target.value
            })
        }

        wait().then()
    }

    back() {
        window.history.back();
    }

    render() {
        return (
            <div className={styles2.magin}>
                <Breadcrumb separator=">" style={{textAlign: "left"}}>
                    <Breadcrumb.Item>专项统计</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="main/fillStatictisTaskList">填写报表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>填写</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloat}></div>
                <h2 style={{textAlign: "center", margin: "20px auto"}}>{self.state.writeDate.statisticsTitle}</h2>

                <Row type="flex" justify="space-between">
                    <Col span={8} offset={1}>
						<span style={{display: "inline-block"}}>
                            填写人
                            &ensp;
                            <Button>{self.state.userPhone.userName}</Button>
                        </span>

                        &ensp;&ensp;
                        <span style={{display: "inline-block"}}>
							<img src={phone}/>
                            &ensp;
                            <Button>{self.state.userPhone.mobile}</Button>
						</span>
                    </Col>
                    <Col span={14} offset={1} pull={1} style={{textAlign: "right"}}>
                        <span>选择日期</span>
                        <RadioGroup onChange={self.tab}>
                            {
                                forindate.map((item) => {
                                    // if (self.state.writeDate.templateCode == "103") {
                                    //     return <RadioButton
                                    //         value={item.id}>{item.statisticsDate.split("-").splice(1, 1) + "月"}</RadioButton>
                                    //     //return <Button style={{margin:"5px 10px"}} data-id={item.id} key={item.id} onClick={self.tab}>{item.statisticsDate.split("-").splice(1,1) + "月"}</Button>
                                    // } else if (self.state.writeDate.templateCode == "100") {
                                        return <RadioButton
                                            value={item.id}>{item.statisticsDate.split("-").splice(1, 2).join("月") + "日"}</RadioButton>
                                        //return <Button style={{margin:"5px 10px"}} data-id={item.id} key={item.id} onClick={self.tab}>{item.statisticsDate.split("-").splice(1,2).join("月")+"日"}</Button>
                                    // }
                                })
                            }
                        </RadioGroup>
                    </Col>
                </Row>
                <h3 style={{
                    background: "#108fe9",
                    color: "#fff",
                    textAlign: "center",
                    padding: "10px",
                    margin: "20px"
                }}>统计项目</h3>
                <Row style={{margin: "30px"}}>
                    {/*{ items.map(function (item) {*/}
                    {/*return <Col span={8} key={item.id}>*/}
                    {/*<laber style={{position:"relative",width:"100%"}}>*/}
                    {/*<span style={{position:"absolute",left:"12%",top:"1%",zIndex:1}}>{item.id}</span>*/}
                    {/*<Input size="large" style={{paddingLeft:"65%",margin:"3% 10%",width:"80%",boxSizing:"border-box"}} placeholder="0" onChange={self.onChange}  data-id={item.id}/>*/}
                    {/*</laber>*/}
                    {/*</Col>*/}
                    {/*})}*/}
                    {/*投入的值班人员(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.column1}</span>
                                <Input size="large" style={{
                                    paddingLeft: "60%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onColumn1Change} data-id={items.column1} required/>
                            </laber>
                        </Col>
                    }

                    {/*出动海巡艇(艘次）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.column2}</span>
                                <Input size="large" style={{
                                    paddingLeft: "60%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onColumn2Change} data-id={items.column2}/>
                            </laber>
                        </Col>
                    }

                    {/*出动海巡艇巡航里程(公里）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.column3}</span>
                                <Input size="large" style={{
                                    paddingLeft: "60%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onColumn3Change} data-id={items.column3}/>
                            </laber>
                        </Col>
                    }

                    {/*渡口渡船渡运旅客(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.column4}</span>
                                <Input size="large" style={{
                                    paddingLeft: "60%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onColumn4Change} data-id={items.column4}/>
                            </laber>
                        </Col>
                    }

                    {/*水上风景旅游区乘船游客(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.column5}</span>
                                <Input size="large" style={{
                                    paddingLeft: "60%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onColumn5Change} data-id={items.column5}/>
                            </laber>
                        </Col>
                    }

                    {/*危险货物运输船舶申报（艘次）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.column6}</span>
                                <Input size="large" style={{
                                    paddingLeft: "60%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onColumn6Change} data-id={items.column6}/>
                            </laber>
                        </Col>
                    }

                    {/*危险货物运输船舶装卸量(吨)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.column7}</span>
                                <Input size="large" style={{
                                    paddingLeft: "60%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onColumn7Change} data-id={items.column7}/>
                            </laber>
                        </Col>
                    }

                    {/*12395等报警电话接/处警(次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.column8}</span>
                                <Input size="large" style={{
                                    paddingLeft: "60%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onColumn8Change} data-id={items.column8}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的小事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.column9}</span>
                                <Input size="large" style={{
                                    paddingLeft: "60%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onColumn9Change} data-id={items.column9}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的一般及以上等级事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.column10}</span>
                                <Input size="large" style={{
                                    paddingLeft: "60%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onColumn10Change} data-id={items.column10}/>
                            </laber>
                        </Col>
                    }
                </Row>
                <Col span={4} offset={10} style={{marginTop: "5%"}}>
                    <Button style={{color: "#fff", width: "100%", height: "40px"}} onClick={self.SecurityRisk}
                            type="primary">上报</Button>
                </Col>
            </div>

        )
    }
}

// export default SecurityRisk;

// onChange={self.onChange.bind(this)}  data-id={items.column1}