// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Button, Table, Pagination, Tag, Progress, Spin } from "antd";

// less
import MaritimeAffairs from "../MaritimeAffairs/MaritimeAffairs.less"
import publicstyle from "../../img/public.less";
import stylez from '../../container/index.less';
import report from "../report/report.less";
import styles2 from "../admin/index.less";
import styles from "../stastics/taskIndex.less";
import PageStyles from "../stastics/taskIndex.less";

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";

import see from "../../img/see.png";

let self, propsData = {};


export default class AddMangerment extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            size: "1",
        }
    }
    // 挂载前
    componentWillMount() {
        propsData = this.props.location.state;
        // var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // this.setState({
        //     propsData: propsData,
        //     userInfo: userInfo,
        // })
        this.getData(!!propsData ? propsData.pageNum : 1)
    }
    // 挂载后
    componentDidMount() {

    }
    getData = (page) => {
        this.setState({
            loading: true
        })
        $jsonp3(self, api.spChecklistStatisticsPage, {
            pageNum: page,
            isProceed: this.state.size,
        }).then(res => {
            self.setState({
                loading: false
            })
            var resp = res.data.response;
            let arr = [];
            resp.list.map((item, index) => {
                var li = {};
                li.index = (page - 1) * 10 + index + 1;
                li.sortName = item.sortName;
                li.checklistTitle = item.checklistTitle;
                li.startDay = item.startDay;
                li.endDay = item.endDay;
                li.timeFrame = item.startDay.split(" ")[0] + "~" + item.endDay.split(" ")[0];
                li.msaName = item.msaName;
                li.checkSortId = item.checkSortId;
                li.progressBar = item.progressBar;
                li.countOfToday = item.countOfToday;
                li.allCount = item.allCount;
                li.taskId = item.id;
                li.statusCode = item.status;
                li.statusValue = item.status == 1 ? "已发布" : item.status == 2 ? "待发布" : item.status == 3 ? "已结束" : item.status == 4 ? "已删除" : "";
                li.statusColor = item.status == 1 ? "blue" : item.status == 2 ? "red" : item.status == 3 ? "" : item.status == 4 ? "" : "";

                li.isFinish = item.isFinish;
                li.isFinishValue = item.isFinish == 1 ? "进行中" : item.isFinish == 2 ? "已结束" : item.isFinish == 3 ? "未开始" : item.isFinish == 4 ? "已停用" : "";
                li.isFinishColor = item.isFinish == 1 ? "green" : item.isFinish == 2 ? "orange" : item.isFinish == 3 ? "blue" : item.isFinish == 4 ? "" : "";

                arr.push(li);
            })
            self.setState({
                tableData: arr,
                page: resp.pageInfo,
                tableColumns: [{
                    title: "编号",
                    dataIndex: "index",
                    key: "index",
                    className: publicstyle.center,
                }, {
                    title: "检查项目",
                    dataIndex: "sortName",
                    key: "sortName",
                    className: publicstyle.center,
                }, {
                    title: "数量（今日/总数）",
                    dataIndex: "count",
                    key: "count",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <div>
                            <span style={{ color: "#2F8DEB" }}>{record.countOfToday}</span>/{record.allCount}
                        </div>
                    }
                }, {
                    title: "操作",
                    dataIndex: "action",
                    key: "action",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <Button type="primary" onClick={() => {
                            hashHistory.push({
                                pathname: "/main/hiddenDangerDetails",
                                state: {
                                    checkSortId: record.checkSortId,
                                    sortName: record.sortName,
                                    pageNum: self.state.page.pageNum,
                                }
                            })
                        }}>检查单</Button>
                    }
                },],
            })
        })
    }
    toFirst() {
        this.getData(1);
    }
    onPageChange(page) {
        self.getData(page);
    }
    toLast() {
        this.getData(this.state.page.pages);
    }
    // 渲染
    render() {
        return (
            <div className={stylez.wrapPadding} style={{ padding: "0px", background: "#f4f4f4" }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", background: "white", padding: "15px" }}>
                    <Breadcrumb.Item>检查管理</Breadcrumb.Item>
                    <Breadcrumb.Item>隐患排查</Breadcrumb.Item>
                </Breadcrumb>
                <div className={publicstyle.clearfloatTop}></div>
                <div className={MaritimeAffairs.cardWrap}>
                <div className={MaritimeAffairs.cardTitle}>隐患排查</div>
                    <Spin spinning={this.state.loading} tip="获取数据中，请稍后..." delay={100} style={{ background: "transparent", width: "100%", }}>
                        {this.state.tableData ?
                            <div style={{ overflow: "hidden", marginTop: 40 }}>
                                <Table className={MaritimeAffairs.Table} rowKey={record => record.id} columns={this.state.tableColumns} dataSource={this.state.tableData} pagination={false}>
                                </Table>
                                <div className={styles.pageFlex}>
                                    <span className={styles.pageWrap}>
                                        <Button type="primary" className={styles.pageFirst}
                                            style={{ display: this.state.page.pages > 0 ? "block" : "none", float: "left" }}
                                            onClick={this.toFirst.bind(this)}>首页</Button>
                                        <Pagination className={styles.page}
                                            style={{ display: this.state.page.pages > 0 ? "flex" : "none", float: "left" }}
                                            onChange={this.onPageChange.bind(this)} showFISRT
                                            current={this.state.page.pageNum}
                                            pageSize={this.state.page.pageSize} total={this.state.page.total} />
                                        <Button type="primary" className={styles.pageLast}
                                            style={{ display: this.state.page.pages > 0 ? "block" : "none", float: "left" }}
                                            onClick={this.toLast.bind(this)}>末页</Button>
                                    </span>
                                </div>
                            </div>
                            : ""}
                    </Spin>
                </div>
            </div>
        )

    }
}