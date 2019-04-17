
// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Table, Button, Spin, Tag } from "antd";

// less
import projectItemLess from "./projectItem.less";
import MaritimeAffairs from "../MaritimeAffairs/MaritimeAffairs.less"
import publicstyle from "../../img/public.less";
import stylez from '../../container/index.less';
import report from "../report/report.less";
import styles2 from "../admin/index.less";
import styles from "../stastics/taskIndex.less";
import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";

import see from "../../img/see.png";

let self;
export default class ListSortLevelBySortId extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            list: [],
            load: true,
            idNaeng: 1
        }

    }
    // 挂载前
    componentWillMount() {
    }
    // 挂载后
    componentDidMount() {
        let propsData = this.props.location.state;
        self.dataAll()
    }
    // 数据
    dataAll() {
        $jsonp3(self, api.listSortLevelBySortId, {
            parId: self.props.location.state.idItem
        })
            .then((res) => {
                let response = res.data.response;
                this.setState({
                    response: response,
                    load: false,
                })
                self.oneItemAll()
            });
    }
    // 冒泡排序
    bubbleSort(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }
    oneItemAll() {
        const dataSourceOne = [];
        const sortItem = [];
        const sortItemAll = [];
        self.state.response.list.map((item, index) => {
            sortItem.push(item.msaId)
        })
        sortItem.map((item, index) => {
            if (sortItem.indexOf(item) === sortItem.lastIndexOf(item)) {
                self.state.response.list.map((name, j) => {
                    if (item == name.msaId) {
                        sortItemAll.push(name)
                    }
                })
            } else {
                const forMoment = [];
                const arraySmall = [];
                self.state.response.list.map((name, j) => {
                    if (item == name.msaId) {
                        forMoment.push(name)
                    }
                })
                forMoment.map((i, num) => {
                    arraySmall.push(i.level)
                })

                sortItem.map((add, numIte) => {
                    if (sortItem.lastIndexOf(item) != sortItem.indexOf(item)) {
                        sortItem.splice(sortItem.indexOf(item), 1)
                    } else {
                    }
                })
                const arrayJie = self.bubbleSort(arraySmall)
                arrayJie.map((add, num) => {
                    forMoment.map((adda, numa) => {
                        if (add == adda.level) {
                            sortItemAll.push(adda)
                        }
                    })
                })
            }
        })
        var idNaengName = 0;
        sortItemAll.map((item, index) => {
            if (item.level != '1') {
                dataSourceOne.push({
                    key: index,
                    id: idNaengName,
                    msaName: item.msaName,
                    checklistTitle: item.checklistTitle,
                    name: item.name,
                    standard: !!item.standard ? item.standard : "-",
                    checkFrequency: item.checkFrequency + "月/次",
                    checkRate: item.checkRate + '%',
                    level: item.level,
                    levelCount: item.levelCount,
                    parId: item.parId,
                    taskId:item.taskId,
                })
            } else {
                if (item.levelCount != null) {
                    idNaengName++
                    dataSourceOne.push({
                        key: index,
                        id: idNaengName,
                        msaName: item.msaName,
                        checklistTitle: item.checklistTitle,
                        name: item.name,
                        standard: !!item.standard ? item.standard : "--",
                        checkFrequency: item.checkFrequency + "月/次",
                        checkRate: item.checkRate + '%',
                        level: item.level,
                        levelCount: item.levelCount,
                        parId: item.parId,
                        taskId:item.taskId,
                    })
                } else {
                    dataSourceOne.push({
                        key: index,
                        id: idNaengName,
                        msaName: item.msaName,
                        checklistTitle: item.checklistTitle,
                        name: item.name,
                        standard: !!item.standard ? item.standard : "--",
                        checkFrequency: item.checkFrequency + "月/次",
                        checkRate: item.checkRate + '%',
                        level: item.level,
                        levelCount: item.levelCount,
                        parId: item.parId,
                        taskId:item.taskId,
                    })
                }
            }
        })
        self.setState({
            columns: [{
                title: '编号',
                dataIndex: 'id',
                key: 'id',
                className: projectItemLess.center,
                render: (text, row, index) => {
                    if (row.level != '1') {
                        return {
                            props: {
                                rowSpan: 0,
                            }
                        }
                    } else {

                        if (row.levelCount != null) {
                            return {
                                children: text,
                                props: {
                                    rowSpan: row.levelCount
                                }
                            }
                        } else {
                            return {
                                children: text,
                                props: {
                                    rowSpan: 1
                                }
                            }
                        }
                    }
                }
            }, {
                title: '市',
                dataIndex: 'msaName',
                key: 'msaName',
                className: projectItemLess.center,
                render: (text, row, index) => {
                    if (row.level != '1') {
                        return {
                            props: {
                                rowSpan: 0,
                            }
                        }
                    } else {
                        if (row.levelCount != null) {
                            return {
                                children: <span className={projectItemLess.centerBlod}>{row.msaName}</span>,
                                props: {
                                    rowSpan: row.levelCount
                                }
                            }
                        } else {
                            return {
                                children: <span className={projectItemLess.centerBlod}>{row.msaName}</span>,
                                props: {
                                    rowSpan: 1
                                }
                            }
                        }

                    }
                }
            }, {
                title: '检查单',
                dataIndex: 'checklistTitle',
                key: 'checklistTitle',
                className: projectItemLess.center,
                render: (text, row, index) => {
                    if (row.level != '1') {
                        return {
                            props: {
                                rowSpan: 0,
                            }
                        }
                    } else {
                        if (row.levelCount != null) {
                            return {
                                children: <div>
                                {row.checklistTitle}&emsp;<img style={{ display: !!row.checklistTitle ? "inline-block" : "none", verticalAlign: "middle", cursor: "pointer", width: "16px" }} src={see} onClick={() => {
                                    hashHistory.push({
                                        pathname: "/main/Mobilephone",
                                        state: {
                                            taskId: row.taskId,
                                            sortId:row.parId,
                                            checkName:self.props.location.state.sort,
                                            seePath: "listSortLevelBySortId",
                                        }
                                    })
                                }} type="info-circle" />
                            </div>,
                                props: {
                                    rowSpan: row.levelCount
                                }
                            }
                        } else {
                            return {
                                children: <div>
                                {row.checklistTitle}&emsp;<img style={{ display: !!row.checklistTitle ? "inline-block" : "none", verticalAlign: "middle", cursor: "pointer", width: "16px" }} src={see} onClick={() => {
                                    hashHistory.push({
                                        pathname: "/main/Mobilephone",
                                        state: {
                                            taskId: row.taskId,
                                            sortId:row.parId,
                                            checkName:self.props.location.state.sort,
                                            seePath: "listSortLevelBySortId",
                                        }
                                    })
                                }} type="info-circle" />
                            </div>,
                                props: {
                                    rowSpan: 1
                                }
                            }
                        }

                    }
                }
            }, {
                title: '分级',
                dataIndex: 'name',
                key: 'name',
                className: projectItemLess.center,
                render: (text, record) => {
                    return <Tag color={record.name == "默认" ? "" : "blue"}>{record.name}</Tag>
                }
            }, {
                title: '分级标准',
                dataIndex: 'standard',
                key: 'standard',
                width: "25%",
                className: projectItemLess.center,
            }, {
                title: '检查频次',
                dataIndex: 'checkFrequency',
                key: 'checkFrequency',
                className: projectItemLess.center,
            }, {
                title: '检查率',
                dataIndex: 'checkRate',
                key: 'checkRate',
                className: projectItemLess.center,
            }],
            dataSource: dataSourceOne
        })
    }
    back() {
        hashHistory.push({
            pathname: "/main/projectItem",
            state: {
            }
        })
    }
    // 渲染
    render() {
        const stateItem = self.state
        return (
            <Spin spinning={this.state.load}>
                <Breadcrumb separator=">" style={{ textAlign: "left", background: "white", padding: "15px" }}>
                    <Breadcrumb.Item>检查项目管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查项目信息</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloatTop}></div>
                <div className={stylez.wrapPadding} style={{ background: '#F7F7F7' }}>
                    <div style={{ background: '#ffffff', padding: '24px', }}>
                        <div className={projectItemLess.cardTitle}>{self.props.location.state.sort}</div>

                        {stateItem.dataSource ? <Table className={projectItemLess.celltable} style={{ display: stateItem.one }} dataSource={stateItem.dataSource} columns={stateItem.columns} pagination={false} bordered={true} /> : ""}

                    </div>
                </div>
            </Spin>

        )

    }
}