import React from "react";
import { Link, hashHistory } from 'react-router';
// ajax
import $jsonp3 from '../../utils/service3.js';
import api from "../../utils/api";
// antd
import { Table, Button, Icon, Tag } from 'antd';
// less
import projectItemLess from "./projectItem.less";
import MaritimeAffairs from "../MaritimeAffairs/MaritimeAffairs.less"
// js
import Divbutton from './divButton.jsx';
import DivbuttonFa from './divButtonFa.jsx';

import see from "../../img/see.png";

class projectItem extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        self.state = {
            one: "",
            two: "",
            three: "",
            response: [],
            dataSource: [],
            columns: [],
        }
    }
    // 挂载前
    componentWillMount() {
        self.dataAll();
    }

    // 发送ajax
    componentDidMount() {
        let level = localStorage.getItem('level')
        if (level == '省') {
            this.setState({
                one: "block",
                two: 'none',
                three: "none"
            })
        } else if (level == '市') {
            this.setState({
                one: "none",
                two: 'block',
                three: "none"
            })
        } else {
            this.setState({
                one: "none",
                two: 'none',
                three: "block"
            })
        }
    }
    // 数据
    dataAll() {

        $jsonp3(self, api.projectItem, {})
            .then((res) => {
                let response = res.data.response
                let level = localStorage.getItem('level')
                this.setState({
                    response: response
                }, () => {
                    if (level == '省') {
                        self.oneItemAll()
                    } else {
                        self.twoItemAll()
                    }
                })
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

    // 省
    oneItemAll() {
        const dataSourceOne = [];
        self.state.response.sorts.map((item, index) => {
            index = index + 1
            dataSourceOne.push({ key: index, id: index, sort: item.sort, idItem: item.id })
        })
        self.setState({
            dataSource: dataSourceOne,
            columns: [{
                title: '编号',
                dataIndex: 'id',
                key: 'id',
                // width: '25%',
                className: projectItemLess.center,
            }, {
                title: '检查项目',
                dataIndex: 'sort',
                key: 'sort',
                width: '50%',
                className: projectItemLess.center,
                render: (text, record) => {
                    return <span className={MaritimeAffairs.size20}>{record.sort}</span>
                }
            }, {
                title: '操作',
                key: 'operation',
                dataIndex: 'sort',
                className: projectItemLess.center,
                render: (text, record, index) => {
                    return {
                        children: <div>
                            <button id={record.sort} onClick={self.onInformationIteg.bind(self, record.idItem, record.sort)} className={MaritimeAffairs.Button2F8DEB + " " + MaritimeAffairs.ButtonMargin}>各市项目信息</button>

                            <button onClick={self.ToChecksfhgn.bind(self, record.idItem, record.sort)} className={MaritimeAffairs.Button5ECF8B + " " + MaritimeAffairs.ButtonMargin}>检查单</button>

                            <button onClick={self.ToLibrarysdfny.bind(self, record.idItem, record.sort)} className={MaritimeAffairs.ButtonF0BD31 + " " + MaritimeAffairs.ButtonMargin}>检查对象名录库</button>
                        </div>,
                        props: {
                            rowSpan: 1
                        }
                    }
                }
            }]

        })
    }
    onInformationIteg = (idItem, sort) => {
        hashHistory.push({
            pathname: "main/listSortLevelBySortId",
            state: {
                idItem: idItem,
                sort: sort,
            }
        })
    }
    ToChecksfhgn = (sortId, checkName) => {
        hashHistory.push({
            pathname: "main/checklistManagement",
            state: {
                sortId: sortId,
                checkName: checkName,
            }
        })
    }
    ToLibrarysdfny = (sortId, checkName) => {
        hashHistory.push({
            pathname: "main/library",
            state: {
                sortId: sortId,
                checkName: checkName,
            }
        })
    }
    // <DivbuttonFa record={record} ></DivbuttonFa>
    // 市
    twoItemAll() {
        const dataSourceOne = [];
        const sortItem = [];
        const sortItemAll = [];
        self.state.response.sortLevels.map((item, index) => {
            sortItem.push(item.parId)
        })
        sortItem.map((item, index) => {
            if (sortItem.indexOf(item) === sortItem.lastIndexOf(item)) {
                self.state.response.sortLevels.map((name, j) => {
                    if (item == name.parId) {
                        sortItemAll.push(name)
                    }
                })
            } else {
                const forMoment = [];
                const arraySmall = [];
                self.state.response.sortLevels.map((name, j) => {
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
                    taskId: item.taskId,
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
                        taskId: item.taskId,
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
                        taskId: item.taskId,
                    })
                }
            }
        })
        self.setState({
            dataSource: dataSourceOne,
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
                title: '检查项目',
                dataIndex: 'sort',
                key: 'sort',
                // width:'50%',
                className: projectItemLess.center,
                render: (text, row, index) => {
                    console.log(row);
                    if (row.level != '1') {
                        return {
                            props: {
                                rowSpan: 0,
                            }
                        }
                    } else {
                        if (row.levelCount != null) {
                            return {
                                children: <span className={MaritimeAffairs.size20}>{row.sort}</span>,
                                props: {
                                    rowSpan: row.levelCount
                                }
                            }
                        } else {
                            return {
                                children: <span className={MaritimeAffairs.size20}>{row.sort}</span>,
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
                // width:'50%',
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
                                                seePath: "projectItem",
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
                                                seePath: "projectItem",
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
                // width:'50%',
                className: projectItemLess.center,
            }, {
                title: '分级标准',
                dataIndex: 'standard',
                key: 'standard',
                width: '25%',
                className: projectItemLess.center,
            }, {
                title: '检查频次',
                dataIndex: 'checkFrequency',
                key: 'checkFrequency',
                // width:'50%',
                className: projectItemLess.center,
            }, {
                title: '检查率',
                dataIndex: 'checkRate',
                key: 'checkRate',
                // width:'50%',
                className: projectItemLess.center,
            }, {
                title: '操作',
                key: 'operation',
                dataIndex: 'operation',
                className: projectItemLess.center,
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
                                children: <Divbutton record={record}></Divbutton>,
                                props: {
                                    rowSpan: record.levelCount
                                }
                            }
                        } else {
                            return {
                                children: <Divbutton record={record}></Divbutton>,
                                props: {
                                    rowSpan: 1
                                }
                            }
                        }
                    }
                }
            }],
        })
    }
    render() {
        let level = localStorage.getItem('level');
        const stateItem = this.state;
        return (
            <div className={projectItemLess.textBodyName}>
                <div className={projectItemLess.textBodyChild}>
                    <div className={projectItemLess.cardTitle}>检查项目管理</div>
                    {
                        stateItem.dataSource ?
                            <div>
                                <Table className={projectItemLess.celltable} dataSource={stateItem.dataSource} columns={stateItem.columns} pagination={false} bordered={true} />

                            </div>
                            : ""
                    }


                </div>

            </div>
        )
    }
}

export default projectItem;