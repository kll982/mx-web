// 汇总页
import React from 'react';
import { Link, hashHistory } from 'react-router';
import { Input, Tooltip, Button, Row, Col, Breadcrumb, message, Menu, Icon, Layout, Select, Tree } from 'antd';

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";
import publicstyle from "../../img/public.less";
import styles from "../businessmanage/departmentsetNew.less";
import companypng from "../../img/company.png";
import departmentpng from "../../img/department.png";
import emppng from "../../img/emp.png";
import phone from "../../img/phone.png";
import styles2 from "../admin/index.less";

let self, data, rootSubmenuKeys, NoneLength, items = {
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
};
;

const SubMenu = Menu.SubMenu, TreeNode = Tree.TreeNode,
    Option = Select.Option, { Header, Content, Footer, Sider } = Layout, text = <span>发送短信 提醒未上报单位</span>;

export default class all extends React.Component {
    constructor(props) {
        super(props);
        self = this;
    }

    state = {
        noneLength: 0,
        Value: {},
        statsticsday: "",
        specialStatsticsTaskInfoDetails: [],
        Tablevalue: [],
        forindate: [],

        phones: {},

        chartImg: true,
        userInfoz:{},

    };

    // onlunch
    componentWillMount() {
        data = JSON.parse(self.props.location.state.data);
        self.setState({
            data: data
        })
        self.getStatisticsInfo(data);
        self.setIfUpload(self.state.statsticsday);
        this.getUserMsa();

    }
    getUserMsa() {
        $jsonp3(self, api.phone, {}).then((res) => {
            self.setState({
                userInfoz: res.data.response.statisticListDto
            })
        })
    }

    // onload
    componentDidMount() {

    }

    componentDidMount() {
        this.setState({
            Tablevalue: []
        })
    }

    // 树形结构
    getStatisticsInfo = (data) => {
        $jsonp3(self, api.getStatisticsInfo, {
            taskId: data.id
        }).then((res) => {
            var forindate = res.data.response.statsticsday;
            var countyList = res.data.response.countyList;
            countyList[0].isUpload = true;
            countyList[0].subTitle = '';
            countyList[0].children.map((item) => {
                if (item.children && item.children.length > 0) {
                    item.children.map((it) => {
                        it.isUpload = true;
                        it.subTitle = ""
                    });
                }
                item.subTitle = ''
                item.isUpload = true
            });
            self.setState({
                tree: countyList,
                specialStatsticsTaskInfoDetails: res.data.response.specialStatsticsTaskInfoDetails,
                forindate: forindate
            })
            self.handleClick(self.state.tree[0].id);
            self.setIfUpload(self.state.statsticsday);
        });
    }

    //动态设置部门是否上报
    setIfUpload(dateString) {
        // 选择日期
        if (dateString && dateString != 'null' && dateString != null) {
            if (self.state.tree) {
                self.state.tree[0].children.map((item) => {
                    //三级
                    if (item.children && item.children.length > 0) {
                        let flag = false;
                        item.children.map((it1) => {
                            self.state.specialStatsticsTaskInfoDetails.map((it) => {
                                if (dateString == it.statisticsDate && it1.id == it.msaId) {
                                    if (it.state == '0') {
                                        it1.subTitle = "（未上报）";
                                        it1.isUpload = false
                                    }
                                    else {
                                        it1.subTitle = "";
                                        it1.isUpload = true;
                                        flag = true;
                                    }
                                }
                            });
                        });
                        if (flag) {
                            item.isUpload = true;
                            item.subTitle = '';
                        }
                        else {
                            item.subTitle = "（未上报）";
                            item.isUpload = false
                        }
                    }
                    else {
                        self.state.specialStatsticsTaskInfoDetails.map((it) => {
                            if (dateString == it.statisticsDate && item.id == it.msaId) {
                                if (it.state == '0') {
                                    item.subTitle = "（未上报）";
                                    item.isUpload = false
                                }
                                else {
                                    item.subTitle = "";
                                    item.isUpload = true
                                }
                            }
                        });
                    }

                });
            }

        }
        // 未选择日期
        else {
            if (self.state.tree) {
                self.state.tree[0].children.map((item) => {
                    //三级
                    if (item.children && item.children.length > 0) {
                        let flag = false;
                        item.children.map((it1) => {
                            let flag1 = false;
                            self.state.specialStatsticsTaskInfoDetails.map((it) => {
                                if (it1.id == it.msaId) {

                                    if (it.state != '0') {
                                        flag = true;
                                        flag1 = true;
                                    }
                                }
                            });
                            if (flag1) {
                                it1.subTitle = "";
                                it1.isUpload = true
                            } else {
                                it1.subTitle = "（未上报）";
                                it1.isUpload = false;
                            }

                        });
                        if (flag) {
                            item.subTitle = "";
                            item.isUpload = true
                        } else {
                            item.subTitle = "（未上报）";
                            item.isUpload = false;
                        }
                    }
                    // 二级
                    else {
                        let flag = false;
                        self.state.specialStatsticsTaskInfoDetails.map((it) => {
                            if (item.id == it.msaId) {
                                if (it.state != '0') {
                                    flag = true;
                                }
                            }
                        });
                        if (!flag) {
                            item.subTitle = "（未上报）";
                            item.isUpload = false;
                        }
                        else {
                            item.subTitle = "";
                            item.isUpload = true
                        }
                    }
                });
            }
        }
    }
    time = (time) => {
        var Time = new Date(time);
        var year = Time.getFullYear();
        var mon = Time.getMonth() + 1 < 10 ? "0" + (Time.getMonth() + 1) : Time.getMonth() + 1;
        var day = Time.getDate() < 10 ? "0" + Time.getDate() : Time.getDate();
        var hour = Time.getHours() < 10 ? "0" + Time.getHours() : Time.getHours();
        var min = Time.getMinutes() < 10 ? "0" + Time.getMinutes() : Time.getMinutes();
        var sconed = Time.getSeconds() < 10 ? "0" + Time.getSeconds() : Time.getSeconds();
        var days = year + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sconed;
        return days;
    }
    // 选择单位
    handleClick = (e) => {
        if (e.length == 0) {
            return
        }
        localStorage.setItem('ClickMsaId', Number(e));
        self.setState({
            Value: {},
            msaId: Number(e),
        })
        var user = self.state.userInfoz.msaId;
        if (self.state.statsticsday != "" || Number(e)!=user) {
            self.setState({
                chartImg: false,
            })
        } else {
            self.setState({
                chartImg: true,
            })
        }
        $jsonp3(self, api.getStatistics, {
            msaId: Number(e),
            taskId: data.id,
            statisticsDate: self.state.statsticsday
        }).then((res) => {
            var data = res.data.response.specialStowtss;
            var responses = res.data.response;
            if (responses.isOk != null) {
                this.setState({
                    phones: {
                        show: true,
                        isOk: responses.isOk,
                        name: responses.name,
                        phone: responses.phone,
                        updateTime: self.time(responses.updateTime),
                    }
                })
            }
            var Tablevalue = [];
            Tablevalue.push(
                [
                    {
                        name: items.column1,
                        type: "column1",
                        value: Number(data.column1),
                    },
                    {
                        name: items.column2,
                        type: "column2",
                        value: Number(data.column2),
                    },
                    {
                        name: items.column3,
                        type: "column3",
                        value: Number(data.column3),
                    }
                ],
                [
                    {
                        name: items.column4,
                        type: "column4",
                        value: Number(data.column4),
                    },
                    {
                        name: items.column5,
                        type: "column5",
                        value: Number(data.column5),
                    },
                    {
                        name: items.column6,
                        type: "column6",
                        value: Number(data.column6),
                    }
                ],
                [
                    {
                        name: items.column7,
                        type: "column7",
                        value: Number(data.column7),
                    }, {
                        name: items.column8,
                        type: "column8",
                        value: Number(data.column8),
                    }, {
                        name: items.column9,
                        type: "column9",
                        value: Number(data.column9),
                    }
                ],
                [
                    {
                        name: items.column10,
                        type: "column10",
                        value: Number(data.column10),
                    }
                ])
            self.setState({
                Value: res.data.response.specialStowtss,
                Tablevalue: Tablevalue,
            })
        });
    }

    // 选择日期
    SelectChange = (value) => {

        async function wait() {
            self.setState({
                statsticsday: value
            })
        }

        wait().then(function () {
            self.handleClick(localStorage.getItem('ClickMsaId'))
            self.setIfUpload(self.state.statsticsday);
        })
    }
    send = () => {
        $jsonp3(self, api.send, {
            taskId: data.id,
        }).then((res) => {
            message.info("请稍等");
            if (res.message == "ok") {
                message.success("已提醒");
            }
        });
    }

    back() {
        window.history.back();
    }

    perviewCharts(data, recode, index) {
        hashHistory.push({
            pathname: '/main/charts',
            state: {
                taskId: data.id,
                type: self.state.Tablevalue[recode][index].type,
                typeName: self.state.Tablevalue[recode][index].name,
                msaId: self.state.msaId,
            }
        })
    }

    render() {
        const renderTreeNodes = data => data.map((item) => {
            if (item.children == null || item.children.length == 0) {
                return <TreeNode title={item.name + item.subTitle} key={item.id + ""} disabled={!item.isUpload} />;
            } else {
                return (
                    <TreeNode title={item.name + item.subTitle} key={item.id + ""} disabled={!item.isUpload}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
        });
        return (
            <div style={{ height: "100%", position: "relative" }} className={styles2.magin}>
                <Breadcrumb separator=">" style={{ textAlign: "left" }}>
                    <Breadcrumb.Item>数据统计</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="main/allTable">统计报表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>查看</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloat}></div>

                <Row style={{ height: "93.5%", width: "100%" }}>
                    {/*树状图*/}
                    <Col md={5} sm={8} xs={11} style={{
                        background: '#fff',
                        height: "100%",
                        borderRight: "1px solid #f5f5f5"
                    }} className={publicstyle.relative}>
                        {
                            this.state.tree ?
                                <Tree onSelect={this.handleClick}
                                    defaultSelectedKeys={[this.state.tree[0].id.toString()]}
                                    defaultExpandedKeys={[this.state.tree[0].id.toString()]}>
                                    {renderTreeNodes(this.state.tree)}
                                </Tree> : ""
                        }

                        {/* <Button onClick={this.send.bind(this)} type="danger" style={{
                            position: "absolute",
                            background: "rgba(255,0,0,.7)",
                            color: "#fff",
                            bottom: 50,
                            margin: "0 auto",
                        }}>发送短信 提醒未上报单位</Button> */}

                    </Col>
                    {/*数据*/}
                    <Col md={19} sm={16} xs={13} style={{ padding: "0 10px;", boxSizing: "border-box" }}>
                        <Row>
                            <Col span={24}>
                                <h2 style={{
                                    fontSize: 26,
                                    textAlign: "center",
                                    margin: "65px 0px 20px"
                                }}>{this.state.data.name}</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={16} push={1}>
                                {self.state.phones.show == true ? <div>
                                    <div style={{ display: "inline-block", marginBottom: 10 }}>
                                        填写人&ensp;
                <span className={styles2.bottonBorder}>{self.state.phones.name}</span>
                                    </div>
                                    &ensp;&ensp;
                <div style={{ display: "inline-block", marginBottom: 10 }}>
                                        <img src={phone} />
                                        &ensp;
                <span className={styles2.bottonBorder}>{self.state.phones.phone}</span>
                                    </div>
                                    &ensp;&ensp;
                <div style={{ display: "inline-block", marginBottom: 10 }}>
                                        报出时间&ensp;
                <span className={styles2.bottonBorder}>{self.state.phones.updateTime}</span>
                                    </div>
                                </div> : ""}
                            </Col>
                            <Col offset={1} span={6} style={{ textAlign: "right", }}>
                                <span style={{ margin: "0px 20px" }}>统计日期</span>
                                <Select defaultValue="" style={{ width: 120 }}
                                    onChange={this.SelectChange.bind(this)}>
                                    <Option value="">汇总</Option>
                                    {
                                        this.state.forindate.map((item) => {
                                            return <Option value={item}>{item}</Option>
                                        })
                                    }
                                </Select>
                            </Col>
                            <Col span={23} push={1}
                                className={`${publicstyle.border_e6} ${publicstyle.marginT20} ${publicstyle.fl}`}>
                                <table cellSpacing={0} cellPadding={0}
                                    className={`${publicstyle.prviewWrapf7}`}>
                                    <thead>
                                        <tr>
                                            <td colSpan={3}>
                                                <h3 className={`${publicstyle.previewTitle} ${publicstyle.paddingLeft37}`}>
                                                    <img src="../../../ico/summary_icon.png" alt=""
                                                        className={publicstyle.previewTitleIcon} />
                                                    <span style={{ float: "left", }}>统计项目</span>
                                                </h3>
                                            </td>
                                        </tr>
                                    </thead>
                                    {/*数据*/}
                                    <tbody>
                                        {
                                            self.state.Tablevalue.map((item, recode) => {
                                                return <tr className={`${publicstyle.trBackground} ${publicstyle.trWidth}`}>
                                                    {
                                                        item.map((it, index) => {
                                                            return <td width={"33%"}
                                                                className={`${publicstyle.paddingLeft37} ${publicstyle.item} ${publicstyle.border_e6}`}
                                                                onClick={this.perviewCharts.bind(this, data, recode, index)}>
                                                                <span>{it.name}</span>
                                                                <span className={`${publicstyle.fr}`}>
                                                                    <span className={publicstyle.itemNumber}>{it.value}</span>
                                                                    <span className={publicstyle.itemBarWrap}>
                                                                        <img src="../../../ico/summary_bar.png" alt=""
                                                                            className={publicstyle.itemBar} style={{ display: (self.state.chartImg ? "inline-block" : "none") }} />
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        })
                                                    }
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}