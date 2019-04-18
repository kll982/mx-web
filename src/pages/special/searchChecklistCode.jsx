// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Input, Table, Pagination, Button, Tag } from "antd";

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

let self, propsData = {};


export default class SearchChecklistCode extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            code: ""
        }
    }
    // 挂载前
    componentWillMount() {
        propsData = this.props.location.state;
        // var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.getTable(!!propsData ? propsData.pageNum : 1);

        // this.setState({
        //     propsData: propsData,
        //     userInfo: userInfo,
        // })
    }
    // 挂载后
    componentDidMount() {

    }
    getTable(page) {
        $jsonp3(self, api.listChecklistByCode, {
            code: this.state.code,
            pageNum: page
        }).then(res => {
            let TableDatas = res.data.response;
            var arr = [];
            TableDatas.list.map((item, index) => {
                var li = {};
                li.index = (page - 1) * 10 + index + 1;
                li.accordCount = item.accordCount;
                li.checkUseName = item.checkUseName;
                li.code = item.code;
                li.companyName = item.companyName;
                li.correctCount = item.correctCount;
                li.detailId = item.detailId;
                li.isSolveValue = item.isSolve;
                // 1 未解决 0 已解决 2 无隐患
                li.isSolveName = item.isSolve == 1 ? "未解决" : item.isSolve == 0 ? "已解决" : "无隐患";
                li.level = item.level;
                li.msaId = item.msaId;
                li.msaName = item.msaName;
                li.reviewCount = item.reviewCount;
                li.shortName = item.shortName;
                li.synergyPerson = item.synergyPerson;
                li.uploadTime = this.getDay(item.uploadTime);
                li.checkType = item.checkType;
                li.checkTypeName = item.checkType == 1 ? "日常" : item.checkType == 2 ? "专项" : "";
                arr.push(li);
            })
            this.setState({
                tableData: arr,
                page: TableDatas.pageInfo,
                tableColumns: [{
                    title: "编号",
                    dataIndex: "index",
                    key: "index",
                    className: publicstyle.center,
                },
                {
                    title: "检查类型",
                    dataIndex: "checkTypeName",
                    key: "checkTypeName",
                    className: publicstyle.center,

                }, {
                    title: "检查对象名称",
                    dataIndex: "companyName",
                    key: "companyName",
                    className: publicstyle.center,
                }, {
                    title: "所在辖区",
                    dataIndex: "shortName",
                    key: "shortName",
                    className: publicstyle.center,
                }, {
                    title: "检查人",
                    dataIndex: "checkUseName",
                    key: "checkUseName",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <div>
                            <span className={MaritimeAffairs.nowrap}>{record.checkUseName}</span>
                            <span className={MaritimeAffairs.nowrap}>{record.synergyPerson}</span>
                        </div>
                    }
                }, {
                    title: "检查单位",
                    dataIndex: "msaName",
                    key: "msaName",
                    className: publicstyle.center,
                }, {
                    title: "发布时间",
                    dataIndex: "uploadTime",
                    key: "uploadTime",
                    className: publicstyle.center,
                }, {
                    title: "检查结果",
                    dataIndex: "Count",
                    key: "Count",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <div>
                            <span className={MaritimeAffairs.nowrap}>符合：{record.accordCount}</span>
                            <span className={MaritimeAffairs.nowrap}>当场纠正：{record.correctCount}</span>
                            <span className={MaritimeAffairs.nowrap}>限期整改：{record.reviewCount}</span>
                        </div>
                    }
                }, {
                    title: "风险分级",
                    dataIndex: "level",
                    key: "level",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <span className={record.level == 1 ? MaritimeAffairs.bluesColor : record.level == 2 ? MaritimeAffairs.yellowsColor : record.level == 3 ? MaritimeAffairs.orangesColor : record.level == 4 ? MaritimeAffairs.redsColor : MaritimeAffairs.graysColor}>{!!!record.level ? "--" : record.level}</span>
                    }
                }, {
                    title: "检查单编号",
                    dataIndex: "code",
                    key: "code",
                    className: publicstyle.center,
                }, {
                    title: "是否解决",
                    dataIndex: "isSolve",
                    key: "isSolve",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <Tag color={record.isSolveValue == 0 ? "blue" : record.isSolveValue == 1 ? "orange" : "green"}>{record.isSolveName}</Tag>
                    }
                }, {
                    title: "操作",
                    dataIndex: "action",
                    key: "action",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <Button type="primary" onClick={() => { window.open("../../../ico/DailySupervisionItemDetails.html?detailId=" + record.detailId) }}>查看检查单</Button>
                    }
                },],
            })
        })
    }
    getDay(date) {
        if (date == null) {
            return "";
        }
        var pubtime = new Date(date),
            pubdate = (pubtime.getFullYear()) + "年" +
                (pubtime.getMonth() + 1) + "月" +
                (pubtime.getDate()) + "日 " +
                (pubtime.getHours()) + ":" +
                (pubtime.getMinutes() < 10 ? "0" + pubtime.getMinutes() : pubtime.getMinutes()) + ":" +
                (pubtime.getSeconds() < 10 ? "0" + pubtime.getSeconds() : pubtime.getSeconds());
        return pubdate;

    }
    toFirst() {
        this.getTable(1);
    }
    onPageChange(page) {
        this.getTable(page);
    }
    toLast() {
        this.getTable(this.state.page.pages);
    }
    // 渲染
    render() {
        return (
            <div className={stylez.wrapPadding} style={{ padding: "0px", background: "#f4f4f4" }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", background: "white", padding: "15px" }}>
                    <Breadcrumb.Item>统计报表</Breadcrumb.Item>
                    <Breadcrumb.Item>检查单查询</Breadcrumb.Item>
                </Breadcrumb>
                <div className={publicstyle.clearfloatTop}></div>
                <div className={MaritimeAffairs.cardWrap}>
                    <div>输入检查单编号 &emsp; <Input style={{ width: 280 }} placeholder="请输入检查单编号" onChange={(e) => {
                        let value = e.target.value;
                        this.setState({
                            code: value,
                        }, () => {
                            this.getTable(1);
                        })
                    }} /></div>
                    {this.state.tableData && this.state.code ?
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
                </div>
            </div>
        )

    }
}