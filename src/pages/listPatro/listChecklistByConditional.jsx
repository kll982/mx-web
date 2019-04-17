// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Row, Col, Select, FormItem, Input, Button, Pagination, TreeSelect, Modal, Table, Tag, Checkbox } from "antd";
// js
import $ from 'jquery'

// less
import listPatr from './listPatr.less'
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



let self, UserInfo;
const Option = Select.Option, confirm = Modal.confirm, TreeNode = TreeSelect.TreeNode;

export default class ListChecklistByConditional extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            departments: [{}],
            checkMsaId: '',
            childrenUnitsChoose1: '',
            ChildUnits: [{ id: null, children: [] }],
        }
    }
    // 挂载前
    componentWillMount() {
        UserInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.setState({
            UserInfo: UserInfo,
            msaId: UserInfo.departmentId,
            msaName: UserInfo.departmentName,
            shortName: UserInfo.shortName,
            childrenUnitsChoose: UserInfo.shortName,
            childrenUnitsChoose1: UserInfo.departmentId,
        })
    }
    // 挂载后
    componentDidMount() {
        self.dataAll()
        self.fetchMsaInfos({ type: "all" });
        self.getChildUnits();
    }
    // 数据
    dataAll = () => {
        let level = localStorage.getItem('level')
        let data = {};
        if (level == '省') {
            data = {
                checkSortId: self.props.location.state.id,
                pageNum: 1,
            }
        } else {
            data = {
                sortLevelId: self.props.location.state.id,
                pageNum: 1,
            }
        }
        $jsonp3(self, api.listChecklistByConditional, data)
            .then((res) => {
                let TableDatas = res.data.response;
                var arr = [];
                TableDatas.list.map((item, index) => {
                    var li = {};
                    li.index = index + 1;
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
                            return <span className={record.level == 1 ? MaritimeAffairs.bluesColor : record.level == 2 ? MaritimeAffairs.yellowsColor : record.level == 3 ? MaritimeAffairs.orangesColor : record.level == 4 ? MaritimeAffairs.redsColor : MaritimeAffairs.graysColor}>{record.level == null ? "-" : record.level}</span>
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
            });
    }
    // 检查单位
    fetchMsaInfos(templateCode1) {
        $jsonp3(self, api.listDepartmentByUser, {
            type: "all"
        }).then((res) => {
            self.setState({
                departments: res.data.response.list,
            });
        });
    }
    onMsaIdCheck = (msaIdArray) => {
        self.setState({
            checkMsaId: msaIdArray
        })
    }
    // 选择所属海事局单位
    selectChildrenUnits(value) {
        this.setState({
            childrenUnitsChoose: value,
            childrenUnitsChoose1: value
        })
    }
    // 所属辖区
    getChildUnits() {
        $jsonp3(self, api.listDepartmentByUser, {}).then((res) => {
            var children = res.data.response.list;
            this.setState({
                ChildUnits: children,
            })
        });
    }
    // 返回
    retuItem() {
        hashHistory.push({
            pathname: "main/listPatrolInfo",
        })
    }
    // 查询
    inquire(page) {
        const companyName = $('.naemItem').val()
        const msaId = self.state.childrenUnitsChoose1
        const checkMsaId = self.state.checkMsaId
        const code = $('.codeItem').val()
        let level = localStorage.getItem('level')
        let data = {};
        if (level == '省') {
            data = {
                checkSortId: self.props.location.state.id,
                pageNum: page,
                companyName: companyName,
                msaId: msaId,
                checkMsaId: checkMsaId,
                code: code,
                isToday: this.state.SeeToday ? "1" : "",
            }
        } else {
            data = {
                sortLevelId: self.props.location.state.id,
                pageNum: page,
                companyName: companyName,
                msaId: msaId,
                checkMsaId: checkMsaId,
                code: code,
                isToday: this.state.SeeToday ? "1" : "",
            }
        }
        $jsonp3(self, api.listChecklistByConditional, data)
            .then((res) => {
                let TableDatas = res.data.response;
                var arr = [];
                TableDatas.list.map((item, index) => {
                    var li = {};
                    li.index = (page - 1) * 10 + (index + 1);
                    li.id = item.id;
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
                            return <span className={record.level == 1 ? MaritimeAffairs.bluesColor : record.level == 2 ? MaritimeAffairs.yellowsColor : record.level == 3 ? MaritimeAffairs.orangesColor : record.level == 4 ? MaritimeAffairs.redsColor : MaritimeAffairs.graysColor}>{record.level == null ? "-" : record.level}</span>
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
            });

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
    // 重置
    resetName() {
        $('.naemItem').val('')
        $('.codeItem').val('')
        self.setState({
            checkMsaId: '',
            childrenUnitsChoose: this.state.shortName,
            childrenUnitsChoose1: '',
            SeeToday: false,
        })
        self.dataAll()
        self.fetchMsaInfos({ type: "all" });
        self.getChildUnits();
    }
    toFirst() {
        this.inquire(1);
    }
    onPageChange(page) {
        this.inquire(page);
    }
    toLast() {
        this.inquire(this.state.page.pages);
    }
    // seeToday(value) {
    // this.setState({
    //     SeeToday: value
    // })
    // }
    // 渲染
    render() {
        const renderTreeNodes = data => data.map((item) => {
            if (item.children == null || item.children.length == 0) {
                return <TreeNode style={{ background: '#F5F5F5 !important' }} title={item.name} key={item.id + ""} value={item.id + ""} />;

            } else {
                return (
                    <TreeNode style={{ background: '#F5F5F5 !important' }} title={item.name} key={item.id + ""} value={item.id + ""}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
        });
        const renderTreeNode = data => data.map((item) => {
            if (item.children == null || item.children.length == 0) {
                return <TreeNode style={{ background: '#F5F5F5 !important' }} title={item.shortName} key={item.id + ""} value={item.id + ""} />;

            } else {
                return (
                    <TreeNode style={{ background: '#F5F5F5 !important' }} title={item.shortName} key={item.id + ""} value={item.id + ""}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
        });
        return (
            <div className={stylez.wrapPadding} style={{ background: '#F7F7F7' }}>
                <div style={{ background: '#ffffff', margin: '8px', padding: '24px' }}>
                    <div className={listPatr.cardTitle}>
                        {self.props.location.state.sort}
                        <Button type="primary" onClick={self.retuItem.bind(self)} className={styles2.returnbackbutton}>返回</Button>
                    </div>
                    <Breadcrumb separator=">" style={{ textAlign: "left", paddingBottom: '20px' }}>
                        <Breadcrumb.Item><Link to="">检查管理</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="main/listPatrolInfo">安全检查</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>检查单</Breadcrumb.Item>
                    </Breadcrumb>
                    <div>
                        <Row gutter={5}>
                            <Col span={5}>
                                <span style={{ marginRight: '8px' }}>检查对象名称</span><Input className={listPatr.inputItem + ' ' + 'naemItem'} />
                            </Col>
                            <Col span={5}>
                                <span style={{ marginRight: '8px' }}>所在辖区</span>
                                <TreeSelect
                                    // showSearch
                                    style={{ width: 160 }}
                                    value={this.state.childrenUnitsChoose}
                                    treeNodeFilterProp="title"
                                    placeholder={this.state.shortName}
                                    allowClear
                                    treeDefaultExpandedKeys={this.state.ChildUnits.length > 0 ? [Number(this.state.ChildUnits[0].id).toString()] : [this.state.msaId.toString()]}
                                    onChange={this.selectChildrenUnits.bind(this)}
                                >
                                    <TreeNode title={this.state.shortName} value={this.state.msaId + ""} key={this.state.msaId + ""}>
                                        {renderTreeNode(this.state.ChildUnits)}
                                    </TreeNode>
                                </TreeSelect>
                            </Col>
                            <Col span={5}>
                                <span style={{ marginRight: '8px' }}>检查单位</span>
                                <TreeSelect style={{ width: 160, background: '#F5F5F5' }}
                                    onChange={this.onMsaIdCheck}
                                    dropdownMatchSelectWidth={false}
                                    value={this.state.checkMsaId}>
                                    {renderTreeNodes(this.state.departments)}
                                </TreeSelect>
                            </Col>
                            <Col span={5}>
                                <span style={{ marginRight: '8px' }}>检查单编号</span><Input className={listPatr.inputItem + ' ' + 'codeItem'} />
                            </Col>
                            <Col span={4}>
                                <Checkbox style={{ display: "inline-block", verticalAlign: "top" }} onChange={() => {
                                    this.setState({
                                        SeeToday: !this.state.SeeToday
                                    })
                                }} checked={this.state.SeeToday} ><span style={{ display: "inline-block", verticalAlign: "middle" }}>查看今日检查单</span> </Checkbox>
                            </Col>
                            <Col offset={20} span={4} style={{ marginTop: "16px" }}>
                                <Button type="primary" onClick={self.inquire.bind(self, 1)}>查询</Button>
                                <Button style={{ marginLeft: '26px' }} onClick={self.resetName.bind(self)} type="primary" >重置</Button>
                            </Col>
                        </Row>
                    </div>
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
                        </div> : ""}
                    {/* <div className={styles.pageFlex}>
                    <span className={styles.pageWrap}>
                        <Button type="primary" className={styles.pageFirst}
                            style={{ display: this.state.page.pages > 0 ? "block" : "none", float: "left" }}
                            onClick={this.toFirst.bind(this)}>首页</Button>
                        <Pagination className={styles.page}
                            style={{ display: this.state.page.pages > 0 ? "flex" : "none", float: "left" }}
                            onChange={this.onPageChange.bind(this)} showFISRT
                            current={this.state.current}
                            pageSize={this.state.page.pageSize} total={this.state.page.total}
                        />
                        <Button type="primary" className={styles.pageLast}
                            style={{ display: this.state.page.pages > 0 ? "block" : "none", float: "left" }}
                            onClick={this.toLast.bind(this)}>末页</Button>
                    </span>
                </div> */}
                </div>
            </div>
        )

    }
}