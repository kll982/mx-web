
// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Table, Progress, Spin, Tag } from "antd";

//js
import DivbuttonFa from './listButton.jsx';
// less
import listPatr from "./listPatr.less"
import MaritimeAffairs from "../MaritimeAffairs/MaritimeAffairs.less"
import publicstyle from "../../img/public.less";
import stylez from '../../container/index.less';
import report from "../report/report.less";
import styles2 from "../admin/index.less";
import styles from "../stastics/taskIndex.less";
import projectItemLess from "../MaritimeAffairs/projectItem.less";

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";

let self;


export default class ListPatrolInfo extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            list: [],
            columns: [],
            dataSource: [],
        }
    }
    // 挂载前
    componentWillMount() {
        this.dataAll()
    }
    // 挂载后
    componentDidMount() {
    }
    // 数据
    dataAll() {
        $jsonp3(self, api.listPatrolInfo, {})
            .then((res) => {
                if (res.code == 200) {
                    let list = res.data.response.list
                    let level = localStorage.getItem('level')
                    this.setState({
                        list: list,
                        level: level,
                        load: false,
                    }, () => {
                        if (level == '省') {
                            self.oneItemAll()
                        } else {
                            self.twoItemAll()
                        }
                    })
                }

            });
    }
    oneItemAll() {

        const dataSourceOne = [];
        self.state.list.map((item, index) => {
            // if (index > 9 || index == 0) {
            index = index + 1
            // } else {
            // index = '0' + index
            // }
            dataSourceOne.push({ key: index, id: index, sort: item.sort, itemId: item.id, countOfToday: item.countOfToday, allCount: item.allCount })
        })
        self.setState({
            columns: [{
                title: '编号',
                dataIndex: 'id',
                key: 'id',
                // width: '33.3%',
                className: listPatr.center,
            }, {
                title: '检查项目',
                dataIndex: 'sort',
                key: 'sort',
                width: '50%',
                className: listPatr.center,
            }, {
                title: '数量（今日/总数）',
                dataIndex: 'countOfToday',
                key: 'countOfToday',
                // width: '33.3%',
                className: listPatr.center,
                render: (text, record) => {
                    return <div>
                        <span style={{ color: "#2F8DEB" }}>{record.countOfToday}</span>/{record.allCount}
                    </div>
                }
            }, {
                title: '操作',
                key: 'operation',
                dataIndex: 'operation',
                className: listPatr.center,
                render: (text, record, index) => {
                    return <DivbuttonFa record={record} ></DivbuttonFa>
                }
            }],
            dataSource: dataSourceOne
        })
    }
    twoItemAll() {
        const dataSourceOne = [];
        const sortItem = [];
        const sortItemAll = [];
        self.state.list.map((item, index) => {
            sortItem.push(item.parId)
        })
        sortItem.map((item, index) => {
            if (sortItem.indexOf(item) === sortItem.lastIndexOf(item)) {
                self.state.list.map((name, j) => {
                    if (item == name.parId) {
                        sortItemAll.push(name)
                    }
                })
            } else {
                const forMoment = [];
                const arraySmall = [];
                self.state.list.map((name, j) => {
                    if (item == name.parId) {
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
                    sort: item.sort,
                    checklistTitle: item.checklistTitle,
                    name: item.name,
                    standard: item.standard,
                    checkFrequency: item.checkFrequency + "月/次",
                    checkRate: item.checkRate + '%',
                    level: item.level,
                    levelCount: item.levelCount,
                    parId: item.parId,
                    progressBar: item.progressBar,
                    itemId: item.id, countOfToday: item.countOfToday, allCount: item.allCount
                })
            } else {
                if (item.levelCount != null) {
                    idNaengName++
                    dataSourceOne.push({
                        key: index,
                        id: idNaengName,
                        sort: item.sort,
                        checklistTitle: item.checklistTitle,
                        name: item.name,
                        standard: item.standard,
                        checkFrequency: item.checkFrequency + "月/次",
                        checkRate: item.checkRate + '%',
                        level: item.level,
                        levelCount: item.levelCount,
                        parId: item.parId,
                        progressBar: item.progressBar,
                        itemId: item.id, countOfToday: item.countOfToday, allCount: item.allCount
                    })
                } else {
                    dataSourceOne.push({
                        key: index,
                        id: idNaengName,
                        sort: item.sort,
                        checklistTitle: item.checklistTitle,
                        name: item.name,
                        standard: item.standard,
                        checkFrequency: item.checkFrequency + "月/次",
                        checkRate: item.checkRate + '%',
                        level: item.level,
                        levelCount: item.levelCount,
                        parId: item.parId,
                        progressBar: item.progressBar,
                        itemId: item.id, countOfToday: item.countOfToday, allCount: item.allCount
                    })
                }
            }

        })
        self.setState({
            columns: [{
                title: '编号',
                dataIndex: 'id',
                key: 'id',
                className: listPatr.center,
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
            },
            {
                title: '检查项目',
                dataIndex: 'sort',
                key: 'sort',
                className: listPatr.center,
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
            },
            {
                title: '分级',
                dataIndex: 'name',
                key: 'name',
                className: listPatr.center,
            }, {
                title: '检查频次',
                dataIndex: 'checkFrequency',
                key: 'checkFrequency',
                className: listPatr.center,
            }, {
                title: '检查率',
                dataIndex: 'checkRate',
                key: 'checkRate',
                className: listPatr.center,
            }, {
                title: '检查进度',
                key: 'standard',
                dataIndex: 'standard',
                className: listPatr.center,
                render: (text, record, index) => {
                    return <div style={{ width: 160, margin: '0 auto' }}>
                        <Progress percent={Number(record.progressBar)} strokeWidth={5} />
                    </div>

                }
            }, {
                title: '数量（今日/总数）',
                dataIndex: 'countOfToday',
                key: 'countOfToday',
                // width: '33.3%',
                className: listPatr.center,
                render: (text, record) => {
                    return <div>
                        <span style={{ color: "#2F8DEB", }}>{record.countOfToday}</span>/{record.allCount}
                    </div>
                }
            }, {
                title: '操作',
                key: 'operation',
                dataIndex: 'operation',
                className: listPatr.center,
                render: (text, record, index) => {
                    if (record.level != '1') {
                        return {
                            props: {
                                rowSpan: 0,
                            }
                        }
                    } else {
                        if (record.levelCount != null) {
                            return {
                                children: <DivbuttonFa record={record}></DivbuttonFa>,
                                props: {
                                    rowSpan: record.levelCount
                                }
                            }
                        } else {
                            return {
                                children: <DivbuttonFa record={record}></DivbuttonFa>,
                                props: {
                                    rowSpan: 1
                                }
                            }
                        }
                    }

                }
            }],
            dataSource: dataSourceOne,
        })
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
    // 渲染
    render() {
        const stateItem = self.state
        return (
            <div className={stylez.wrapPadding} style={{ background: "#f4f4f4", padding: "0" }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", padding: '15px', background: "#fff" }}>
                    <Breadcrumb.Item><Link to="">检查管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>安全检查</Breadcrumb.Item>
                </Breadcrumb>
                <Spin spinning={this.state.load}>
                    <div className={MaritimeAffairs.cardWrap}>
                    <div className={MaritimeAffairs.cardTitle}>安全检查</div>
                        <Table dataSource={stateItem.dataSource} className={stateItem.level != "省" ? projectItemLess.celltable : ""} columns={stateItem.columns} pagination={false} bordered={true} />
                    </div>
                </Spin>
            </div>
        )
    }
}