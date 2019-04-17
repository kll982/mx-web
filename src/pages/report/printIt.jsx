// 打印页
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Button, Modal } from "antd";

import publicstyle from "../../img/public.less";
import styles from "../stastics/taskIndex.less";
import report from "./report.less";
import styles2 from "../admin/index.less";
import stylez from '../../container/index.less';

import $ from 'jquery';
import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";


let self, prposData, UserInfo;

export default class printIt extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            datas: {
                dataOrigin: "",
                item: [],
                msaName: "",
                name: "",
                phone: "",
                statisticsTime: "",
                time: "",
                title: "",
            },
            table: [],
            tables: [],
        }
    }
    // 挂载前
    componentWillMount() {
        prposData = self.props.location.state;
        UserInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.setState({
            UserInfo: UserInfo,
            msaId: UserInfo.departmentId,
            msaName: UserInfo.departmentName,
            // pages: Math.round(Math.random() * 10) + 1,
        })
        this.GetAll();
    }
    // 挂载后
    componentDidMount() {

    }
    GetAll() {
        $jsonp3(self, api.summarizTask, {
            msaId: prposData.msaId,
            taskId: prposData.taskId,
            startYear: prposData.startY,
            endYear: prposData.endY,
            startTime: prposData.start,
            endTime: prposData.end,
            isChild: prposData.isChild,
        }).then(res => {
            if (res.code == 200) {
                let li = res.data.response;
                let list = res.data.response.item;
                let lists = res.data.response.list;
                let arr = [];
                for (let i in list) {
                    for (let l in lists) {
                        if (list[i].id == lists[l].itemId) {
                            list[i].value = lists[l].statisticsValue;
                        }

                    }
                }
                for (let i in list) {
                    if (arr.indexOf(list[i].one) == -1) {
                        arr.push(list[i].one);
                    }
                }

                this.setState({
                    table: list,
                    datas: li,
                    tables: arr,
                })
            }
        })
    }
    printIt() {
        var data = `msaId=${prposData.msaId}&taskId=${prposData.taskId}&startYear=${prposData.startY}&endYear=${prposData.endY}&startTime=${prposData.start}&endTime=${prposData.end}&isChild=${prposData.isChild}`
        window.open("/ico/printReports.html?" + data)
    }
    exportExcel() {
        let excelUrl = `${api.summarizTaskForExcel}?msaId=${prposData.msaId}&taskId=${prposData.taskId}&startYear=${prposData.startY}&endYear=${prposData.endY}&startTime=${prposData.start}&endTime=${prposData.end}&isChild=${prposData.isChild}`;

        $.ajax({
            url: excelUrl,
            type: "get",
            data: {
                msaId: prposData.msaId,
                taskId: prposData.taskId,
                startYear: prposData.startY,
                endYear: prposData.endY,
                startTime: prposData.start,
                endTime: prposData.end,
                isChild: prposData.isChild,
            },
            xhrFields: {
                withCredentials: true
            },
            success: (res) => {
                if (res.code == 500) {
                    message.warning(res.message);
                    return false
                } else if (res.code == 600) {
                    Modal.info({
                        title: "提示",
                        content: res.message,
                        okText: "去登陆",
                        onOk: function () {
                            localStorage.clear();
                            sessionStorage.clear();
                            hashHistory.push("/");
                        }
                    })
                } else {
                    self.setState({
                        excelUrl: excelUrl
                    }, () => {
                        self.refs.excelUrl.click();
                    })
                }
            }
        })
    }

    back() {
        hashHistory.push({
            pathname: 'main/TOsummary',
            state: prposData,
        })
    }
    // 渲染
    render() {
        const $bor = "1px solid #aaa"
        return (
            <div className={stylez.wrapPadding}>
                <Breadcrumb separator=">" style={{ textAlign: "left" }}>
                    <Breadcrumb.Item>统计报表</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="main/summary">统计汇总</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={{
                        pathname: 'main/TOsummary',
                        state: prposData,
                    }}>汇总</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>生成</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloat}></div>
                <div className={report.printwrap}>
                    <h2> {this.state.datas.title} </h2>
                    <div>
                        <span>数据源：{this.state.datas.dataOrigin}</span>
                        <time style={{ float: "right" }}>{this.state.datas.statisticsTime}</time>
                    </div>

                    <table className={report.printTable}>
                        <thead>
                            <tr>
                                <th>分类</th>
                                <th>统计项目</th>
                                <th>数量</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.table.map((item, index) => {
                                    return <tr style={{}} key={index}>
                                        <td style={{}}>{item.one}</td>
                                        <td style={{}}>{item.two}</td>
                                        <td style={{}}>{Number(item.value)}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    <div>
                        <span>汇总人：{this.state.datas.name}（{this.state.msaName}）</span>
                        <time style={{ float: "right" }}>联系电话：{this.state.datas.phone}&emsp;汇总日期：{this.state.datas.time}</time>
                    </div>
                    <Button type="primary" icon="printer" onClick={this.printIt}>打印</Button>
                    <Button type="primary" icon="file-excel" onClick={this.exportExcel.bind(this)} >导出为EXCEL</Button>

                    <a href={this.state.excelUrl} ref="excelUrl" download style={{ display: "none" }}>下载</a>
                </div>
            </div>
        )
    }
}