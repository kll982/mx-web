// 报表管理->查看
import React from "react";
import moment from "moment";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Button, Input, Select, Upload, message, Icon, DatePicker, TreeSelect, Row, Col } from "antd";
import styles2 from "../admin/index.less";

import publicstyle from "../../img/public.less";
import report from "./report.less"
import styles from "../stastics/taskIndex.less";
import styles1 from '../businessmanage/addcompanyNew.less'
import stylez from '../../container/index.less';

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import $FormData from "../../utils/formData";
import api from "../../utils/api";

import chart from "../../../ico/summary_bar.png";
import summary_icon from "../../../ico/summary_icon.png";

let self, prposData;
export default class WatchMangrment extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            leftShowWidth: 274,
            leftHiddenWidth: 0,
            leftShow: false,
            rightWidth: "100%",
            info: {
                msaNames: [],
                deadline: "",
            },
            item: [],
        }
    }
    componentWillMount() {
        prposData = self.props.location.state;
        this.changeWidth();


        // 左侧信息
        $jsonp3(self, api.getTaskDetailByTaskId, {
            taskId: prposData.taskId,
        }).then(res => {
            var info = res.data.response.dto;
            var item = res.data.response.item;
            var ones = [];
            for (var i = 0; i < item.length - 1; i++) {
                if (item[i].one == item[i + 1].one) {
                    ones.push({
                        title: item[i].one,
                        children: [{
                            title: item[i].two,
                        },]
                    });
                }
                if (item[i].one != item[i + 1].one) {
                    ones.push({
                        title: item[i].one,
                        children: [{
                            title: item[i].two,
                        },]
                    });
                }
                if (i == (item.length - 2)) {
                    ones.push({
                        title: item[item.length - 1].one,
                        children: [{
                            title: item[item.length - 1].two,
                        },]
                    });
                }
            }
            var pop = [];
            if (item.length > 1) {
                // 一级去重
                for (var i = 1; i < ones.length; i++) {
                    if (ones[i].title == ones[i - 1].title) {
                        for (var l in ones[i].children) {
                            ones[i - 1].children.push(ones[i].children[l]);
                        }
                        ones.splice(i, 1);
                        i--;
                    }
                }
                var arr = [];
                // 3个一组
                for (var i = 0; i < ones.length; i++) {
                    var arr1 = [];
                    for (var l in ones[i].children) {
                        if (ones[i].children.length >= 3) {
                            if ((l + 1) % 3 == 0) {
                                arr1.push([ones[i].children[l - 2], ones[i].children[l - 1], ones[i].children[l]]);
                            } else if ((ones[i].children.length - l) < 3 && ones[i].children.length % 3 == 0) {

                            } else if ((ones[i].children.length - l) < 3 && ones[i].children.length % 3 == 1 && (ones[i].children.length - l) == 1) {
                                arr1.push([ones[i].children[ones[i].children.length - 1]]);
                            } else if ((ones[i].children.length - l) < 3 && ones[i].children.length % 3 == 2 && (ones[i].children.length - l) == 2) {
                                arr1.push([ones[i].children[ones[i].children.length - 2], ones[i].children[ones[i].children.length - 1]]);
                            }
                        } else {
                            if (ones[i].children.length % 3 == 0) {
                            } else if (ones[i].children.length % 3 == 1 && (ones[i].children.length - l) == 1) {
                                arr1.push([ones[i].children[ones[i].children.length - 1]]);
                            } else if (ones[i].children.length % 3 == 2 && (ones[i].children.length - l) == 2) {
                                arr1.push([ones[i].children[ones[i].children.length - 2], ones[i].children[ones[i].children.length - 1]]);
                            }
                        }
                    }
                    arr.push({
                        title: ones[i].title,
                        children: arr1,
                    });
                }
            }
            this.setState({
                info: info,
                item: arr,
            })
        })

    }

    // 挂载后
    componentDidMount() {
        window.addEventListener('resize', this.changeWindowWidth) //监听窗口大小改变
    }
    // 获取dom
    componentWillUnmount() {
        //移除监听
        window.removeEventListener('resize', this.changeWindowWidth)
    }
    // 窗口大小
    changeWindowWidth() {
        var clientWidth = document.body.clientWidth;
        // 减 菜单栏宽度 减 左右padding 减左侧宽度
        if (self.state.leftShow == true) {
            var rightWidth = clientWidth - 200 - 15 - 274;
            self.setState({
                rightWidth: rightWidth,
            })
        } else {
            var rightWidth = clientWidth - 200 - 15;
            self.setState({
                rightWidth: rightWidth,
            })
        }
    }
    changeWidth() {
        var clientWidth = document.body.clientWidth;
        // 减 菜单栏宽度 减 左右padding 减左侧宽度
        if (this.state.leftShow == true) {
            var rightWidth = clientWidth - 200 - 15;
            this.setState({
                rightWidth: rightWidth,
                leftShow: false
            })
        } else {
            var rightWidth = clientWidth - 200 - 15 - 274;
            this.setState({
                rightWidth: rightWidth,
                leftShow: true,
            })
        }
    }
    back() {
        window.history.back();
    }
    render() {
        return (
            <div style={{ height: "100%", overflow: "hidden" }} >
                <Breadcrumb separator=">" style={{ textAlign: "left", padding: "15px 0px 0px 15px", zIndex: 1 }}>
                    <Breadcrumb.Item>统计报表</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="main/management">报表管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>查看</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloat}></div>
                <div style={{ height: "100%", position: "relative" }}>
                    {/* button */}
                    <div className={report.leftButtonWrap} style={{ left: this.state.leftShow == true ? this.state.leftShowWidth : this.state.leftHiddenWidth }} onClick={this.changeWidth.bind(this)}>
                        <img style={{ display: this.state.leftShow == true ? "none" : "inline-block" }} src="../../../ico/toRight.png" alt="" />
                        <img style={{ display: this.state.leftShow == true ? "inline-block" : "none", }} src="../../../ico/toLeft.png" alt="" />
                    </div>
                    {/* left */}
                    <div className={report.leftWidth} style={{ left: this.state.leftShow == true ? this.state.leftHiddenWidth : -(this.state.leftShowWidth) }}>

                        {/* title */}
                        <h3 className={`${report.left_title}`}>发布信息</h3>
                        {/* contenet-text */}
                        <div className={report.left_content_wrap}>
                            <span className={`${report.top}`}>
                                统计类型：
                        </span>
                            <p className={`${report.bottom}`}>{this.state.info.statisticsType}</p>
                        </div>

                        <div className={report.left_content_wrap}>
                            <span className={`${report.top}`}>
                                统计日期：
                        </span>
                            <p className={`${report.bottom}`}>{this.state.info.checkTime}</p>
                        </div>

                        <div className={report.left_content_wrap}>
                            <span className={`${report.top}`}>
                                发布单位：
                        </span>
                            <p className={`${report.bottom}`}>{this.state.info.createMsaName}</p>
                        </div>

                        <div className={report.left_content_wrap}>
                            <span className={`${report.top}`}>
                                填报级别：
                        </span>
                            <p className={`${report.bottom}`}>{this.state.info.fillInLevel}</p>
                        </div>

                        <div className={report.left_content_wrap}>
                            <span className={`${report.top}`}>
                                填报单位：
                        </span>
                            <p className={`${report.bottom}`}>
                                {this.state.info.msaNames.join(",").replace(/,/g, "\r\n")}
                            </p>
                        </div>

                        <div className={report.left_content_wrap}>
                            <span className={`${report.top}`}>
                                上报时间：
                        </span>
                            <p className={`${report.bottom}`}>
                                {this.state.info.deadline.replace(":00:00", ":00")}
                            </p>
                        </div>
                    </div>
                    {/* right */}
                    <div className={report.rightWidth} style={{ width: this.state.rightWidth, }}>
                        <h1 className={report.title}>
                            {this.state.info.checkNames}
                        </h1>
                        {
                            this.state.item.map((item, index) => {
                                return <table className={report.tables} style={{ border: "1px solid #aaa", width: "100%" }} key={index}>
                                    <thead>
                                        <tr>
                                            <th colSpan={3}>
                                                <img src={summary_icon} alt="" />
                                                <strong>
                                                    {item.title}
                                                </strong>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            item.children.map((it, ind) => {
                                                return <tr key={ind}>
                                                    {
                                                        it.map((a, b) => {
                                                            return <td key={b}>
                                                                <span>
                                                                    {a.title}
                                                                    <b>
                                                                        <img src="../../../ico/summary_bar.png" alt="" />
                                                                    </b>
                                                                </span>
                                                            </td>
                                                        })
                                                    }
                                                </tr>
                                            })
                                        }
                                    </tbody>

                                </table>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}