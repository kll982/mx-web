// 接收汇总
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Button, Row, Col, Select, Table, Pagination, Tag, Modal, Input, message, Popover } from "antd";

import publicstyle from "../../img/public.less";
import styles from "../stastics/taskIndex.less";
import report from "./report.less";
import styles2 from "../admin/index.less";

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";
import stylez from '../../container/index.less';

let self;
const Option = Select.Option, confirm = Modal.confirm;
export default class summary extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            type: [{
                type: "日",
                value: 1,
            }, {
                type: "月",
                value: 2,
            }, {
                type: "季度",
                value: 3,
            }, {
                type: "半年",
                value: 4,
            }, {
                type: "年",
                value: 5,
            }],
            rank: [{
                title: "市级填报",
                value: 1,
            }, {
                title: "区县级填报",
                value: 2,
            }],
            status: [{
                id: "0",
                name: "待发布"
            }, {
                id: "1",
                name: "已发布"
            }, {
                id: "2",
                name: "停用"
            }],
            filterName: [],
            chooseType: "",
            chooseRank: "",
            chooseYear: "",
            TOreceiveContentText: [],
            TOreportContentText: []
        }
    }
    // 挂载前
    componentWillMount() {
        this.condition(1)
    }
    // 挂载后
    componentDidMount() {

    }

    // 报表名称
    SelectChangeName(e) {
        this.setState({
            chooseFilterName: e.target.value,
        }, () => {
            this.condition(1)
        })
    }
    // 统计类型
    SelectChangeType(value) {
        this.setState({
            chooseType: value,
        })
    }
    // 填报级别
    SelectChangeRank(value) {
        this.setState({
            chooseRank: value,
        })
    }
    // 报表状态
    SelectChangeYear(value) {
        this.setState({
            chooseYear: value,
        })
    }

    // 查询
    condition1() {
        this.condition(1);
    }
    condition(pageNum) {
        $jsonp3(self, api.listStatisticsBasicInfoByCondition, {
            name: self.state.chooseFilterName,
            statisticsType: self.state.chooseType,
            fillInLevel: self.state.chooseRank,
            year: self.state.chooseYear,
            pageNum: pageNum,
        }).then(res => {
            var list = res.data.response.list;
            var pageInfo = res.data.response.pageInfo;
            var tableData = [];
            if (list != null) {
                list.map((item, index) => {
                    var obj = {};
                    obj.index = (pageNum - 1) * 10 + (index + 1);
                    obj.taskId = item.taskId;
                    obj.name = item.checkNames;
                    obj.createMsaId = item.createMsaName;
                    obj.publishTime = item.publishTime;
                    obj.rank = item.statisticsType;
                    obj.updateTime = item.checkTime;
                    obj.writeLevel = item.fillInLevel;
                    obj.tags = item.status;
                    // 0:未发布 1:已发布 2:停用 3:删除
                    obj.tagsName = item.status == 1 ? "进行中" : item.status == 2 ? "未开始" : item.status == 3 ? "结　束" : item.status == 4 ? "停　用" : "其　他";
                    obj.reportCount = item.reportCount == null ? "——" : item.reportCount;
                    obj.button = item.button.split(",");

                    tableData.push(obj);
                })
            }
            this.setState({
                tableData: tableData,
                page: pageInfo,
            })
        })
    }
    // 重置
    reset() {
        new Promise(function (res, err) {
            self.setState({
                chooseType: "",
                chooseRank: "",
                chooseYear: "",
                chooseFilterName: "",
            })
            res(true)
        }).then((data) => {
            if (data) {
                this.condition1();
            }
        })

    }
    // 接收
    TOreceive(record) {
        hashHistory.push({
            pathname: '/main/TOreceive',
            state: {
                record: record,
            }
        })
    }
    // 汇总
    TOsummary(record) {
        hashHistory.push({
            pathname: '/main/TOsummary',
            state: {
                taskId: record.taskId,
                taskName: record.name,
            }
        })

    }
    // 上报
    TOreport(record) {
        hashHistory.push({
            pathname: '/main/TOreport',
            state: {
                taskId: record.taskId,
            }
        })

    }
    // 填写
    TOfill(record) {
        hashHistory.push({
            pathname: '/main/TOfill',
            state: {
                taskId: record.taskId,
            }
        })

    }

    // 首页
    toFirst() {
        this.condition(1);
    }
    // 页面跳转
    onPageChange(page) {
        this.condition(page)
    }
    // 尾页
    toLast() {
        this.condition(self.state.page.pages)
    }
    // 接收
    TOreceiveContent(record) {
        $jsonp3(self, api.listByReceptionButton, {
            taskId: record.taskId,
        }).then(res => {
            let list = res.data.response.list;
            let arr = [];
            list.map((it, ind) => {
                if (it.value == "正常") {
                    arr.push(<p key={ind} style={{ color: "#999999" }}>{it.name}<span style={{ float: "right" }}>&emsp;&emsp;{it.value}</span></p>)
                } else if (it.value == "逾期") {
                    arr.push(<p key={ind} style={{ color: "#FF9800" }}>{it.name}<span style={{ float: "right" }}>&emsp;&emsp;{it.value}</span></p>)
                }
            })
            this.setState({
                TOreceiveContentText: arr,
            })
        })
    }
    // 上报|填报
    TOreportContent(record) {
        $jsonp3(self, api.listByWriteButton, {
            taskId: record.taskId,
        }).then(res => {
            var list = res.data.response.list;
            let arr = [];
            list.map((it, ind) => {
                if (it.value == "已上报") {
                    // arr.push(<p key={ind} style={{ color: "#999999", display: "none" }}>{it.name}<span style={{ float: "right", display: "none" }}>&emsp;&emsp;{it.value}</span></p>)
                } else if (it.value == "逾期") {
                    arr.push(<p key={ind} style={{ color: "#FF9800" }}>{it.name}<span style={{ float: "right" }}>&emsp;&emsp;{it.value}</span></p>)
                }
                else if (it.value == "被退回") {
                    arr.push(<p key={ind} style={{ color: "#EC1219" }}>{it.name}<span style={{ float: "right" }}>&emsp;&emsp;{it.value}</span></p>)
                } else if (it.value == "待上报") {
                    arr.push(<p key={ind} style={{ color: "#999999" }}>{it.name}<span style={{ float: "right" }}>&emsp;&emsp;{it.value}</span></p>)
                }
            })

            if (list.length != 0 && arr.length == 0) {
                arr.push(<p key={0} style={{ color: "#87d068" }}>任务已完成</p>)
            }

            this.setState({
                TOreportContentText: arr,
            })
        })
    }

    back() {
        window.history.back();
    }
    // 渲染
    render() {
        let level = localStorage.getItem("level");
        let columns = [];
        if (level == "省") {
            columns = [{
                title: '序号',
                dataIndex: 'index',
                className: publicstyle.center
            }, {
                title: '报表名称',
                dataIndex: 'name',
                className: publicstyle.center
            },
            {
                title: '发布单位',
                dataIndex: 'createMsaId',
                className: publicstyle.center,
            },
            {
                title: '统计类型',
                dataIndex: 'rank',
                className: publicstyle.center,
            },
            {
                title: '统计日期',
                dataIndex: 'updateTime',
                className: publicstyle.center,
            },
            {
                title: '填报级别',
                dataIndex: 'writeLevel',
                className: publicstyle.center,
            },
            {
                title: '状态',
                dataIndex: 'tags',
                className: publicstyle.center,
                render: (text, record, index) => {
                    // 1 正在进行 2 未开始 3 结束 4 停用
                    if (record.tags == 1) {
                        return <Tag color="blue">{record.tagsName}</Tag>
                    } else if (record.tags == 2) {
                        return <Tag color="yellow">{record.tagsName}</Tag>
                    } else {
                        return <Tag>{record.tagsName}</Tag>
                    }
                },
            },
            {
                title: '操作',
                key: 'action',
                className: publicstyle.center,
                render: (text, record, index) => {
                    return <div>
                        <Popover placement="leftTop" style={{ display: (record.button.indexOf("4") != -1) ? "inline-block" : "none" }} onMouseEnter={this.TOreportContent.bind(this, record)} content={this.state.TOreportContentText}>
                            <Button type="primary" style={{ display: (record.button.indexOf("4") != -1) ? "inline-block" : "none" }} className={report.Tablebutton} onClick={this.TOfill.bind(this, record)}>填报</Button>
                        </Popover>

                        <Popover placement="leftTop" style={{ display: (record.button.indexOf("1") != -1) ? "inline-block" : "none" }} onMouseEnter={this.TOreceiveContent.bind(this, record)} content={this.state.TOreceiveContentText}>
                            <Button type="primary" style={{ display: (record.button.indexOf("1") != -1) ? "inline-block" : "none" }} className={report.Tablebutton} onClick={this.TOreceive.bind(this, record)}>接收</Button>
                        </Popover>

                        <Popover placement="leftTop" style={{ display: (record.button.indexOf("3") != -1) ? "inline-block" : "none" }} onMouseEnter={this.TOreportContent.bind(this, record)} content={this.state.TOreportContentText}>
                            <Button type="primary" style={{ display: (record.button.indexOf("3") != -1) ? "inline-block" : "none" }} className={report.Tablebutton} onClick={this.TOreport.bind(this, record)}>上报</Button>
                        </Popover>
                        <Button type="primary" style={{ display: (record.button.indexOf("2") != -1) ? "inline-block" : "none" }} className={report.Tablebutton} onClick={this.TOsummary.bind(this, record)}>汇总</Button>
                    </div>

                },
            }];
        } else {
            columns = [{
                title: '序号',
                dataIndex: 'index',
                className: publicstyle.center
            }, {
                title: '报表名称',
                dataIndex: 'name',
                className: publicstyle.center
            },
            {
                title: '发布单位',
                dataIndex: 'createMsaId',
                className: publicstyle.center,
            },
            {
                title: '统计类型',
                dataIndex: 'rank',
                className: publicstyle.center,
            },
            {
                title: '统计日期',
                dataIndex: 'updateTime',
                className: publicstyle.center,
            },
            {
                title: '填报级别',
                dataIndex: 'writeLevel',
                className: publicstyle.center,
            },
            {
                title: '状态',
                dataIndex: 'tags',
                className: publicstyle.center,
                render: (text, record, index) => {
                    // 0:进行中 1:结束 
                    if (record.tags == 1) {
                        return <Tag color="blue">{record.tagsName}</Tag>
                    } else if (record.tags == 2) {
                        return <Tag color="yellow">{record.tagsName}</Tag>
                    } else {
                        return <Tag>{record.tagsName}</Tag>
                    }
                },
            },
            {
                title: '上报',
                dataIndex: 'reportCount',
                className: publicstyle.center,
            },
            {
                title: '操作',
                key: 'action',
                className: publicstyle.center,
                render: (text, record, index) => {
                    return <div>
                        <Popover placement="leftTop" style={{ display: (record.button.indexOf("4") != -1) ? "inline-block" : "none" }} onMouseEnter={this.TOreportContent.bind(this, record)} content={this.state.TOreportContentText}>
                            <Button type="primary" style={{ display: (record.button.indexOf("4") != -1) ? "inline-block" : "none" }} className={report.Tablebutton} onClick={this.TOfill.bind(this, record)}>填报</Button>
                        </Popover>

                        <Popover placement="leftTop" style={{ display: (record.button.indexOf("1") != -1) ? "inline-block" : "none" }} onMouseEnter={this.TOreceiveContent.bind(this, record)} content={this.state.TOreceiveContentText}>
                            <Button type="primary" style={{ display: (record.button.indexOf("1") != -1) ? "inline-block" : "none" }} className={report.Tablebutton} onClick={this.TOreceive.bind(this, record)}>接收</Button>
                        </Popover>

                        <Popover placement="leftTop" style={{ display: (record.button.indexOf("3") != -1) ? "inline-block" : "none" }} onMouseEnter={this.TOreportContent.bind(this, record)} content={this.state.TOreportContentText}>
                            <Button type="primary" style={{ display: (record.button.indexOf("3") != -1) ? "inline-block" : "none" }} className={report.Tablebutton} onClick={this.TOreport.bind(this, record)}>上报</Button>
                        </Popover>

                        <Button type="primary" style={{ display: (record.button.indexOf("2") != -1) ? "inline-block" : "none" }} className={report.Tablebutton} onClick={this.TOsummary.bind(this, record)}>汇总</Button>
                    </div>
                },
            }];
        }


        return (
            <div className={stylez.wrapPadding}>
                <Breadcrumb separator=">" style={{ textAlign: "left" }}>
                    <Breadcrumb.Item>统计报表</Breadcrumb.Item>
                    <Breadcrumb.Item>统计汇总</Breadcrumb.Item>
                </Breadcrumb>
                <div className={publicstyle.clearfloat}></div>

                <Row style={{ marginTop: 20 }}>
                    <div>
                        <Col span={6}>
                            报表名称：
                            <Input onChange={this.SelectChangeName.bind(this)} style={{ width: "50%" }}
                                placeholder="输入关键字搜索"></Input>
                        </Col>
                        <Col span={6}>
                            统计类型：
                    <Select defaultValue={""} style={{ width: "50%" }} onChange={this.SelectChangeType.bind(this)} value={this.state.chooseType}>
                                <Option value={""} key={""}>所有</Option>
                                {
                                    this.state.type.map((item) => {
                                        return <Option value={item.value + ""} key={item.value + ""}>按{item.type}统计</Option>
                                    })
                                }
                            </Select>
                        </Col>
                        <Col span={6}>
                            填报级别：
                    <Select defaultValue={""} style={{ width: "50%" }} onChange={this.SelectChangeRank.bind(this)} value={this.state.chooseRank}>
                                <Option value={""} key={""}>所有</Option>
                                {
                                    this.state.rank.map((item) => {
                                        return <Option value={item.value + ""} key={item.value + ""}>{item.title}</Option>
                                    })
                                }
                            </Select>
                        </Col>
                        <Col span={6}>
                            报表年度：
                    <Select defaultValue={""} style={{ width: "50%" }} onChange={this.SelectChangeYear.bind(this)} value={this.state.chooseYear}>
                                <Option value={""} key={""}>所有</Option>
                                <Option value={"2018"} key={"2018"}>2018</Option>
                                <Option value={"2019"} key={"2019"}>2019</Option>
                                <Option value={"2020"} key={"2020"}>2020</Option>
                                <Option value={"2021"} key={"2021"}>2021</Option>
                            </Select>
                        </Col>
                    </div>

                    <Col offset={18} span={6} style={{ textAlign: "right" }}>
                        <Button onClick={this.condition1.bind(this)} type="primary" className={publicstyle.button} style={{ margin: " 20px 0px 40px 20px " }} icon="search">查询</Button>
                        <Button onClick={this.reset.bind(this)} className={publicstyle.button} style={{ margin: " 20px 0px 40px 20px" }} icon="reload">重置</Button>
                    </Col>
                </Row>
                {
                    this.state.tableData && this.state.page ? <div>
                        <Table rowKey="index" columns={columns} dataSource={this.state.tableData} bordered={true} pagination={false}
                            style={{ textAlign: "center" }} />
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
                    </div> : ""
                }
            </div >
        )
    }

}
