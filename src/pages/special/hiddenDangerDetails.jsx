// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Row, Col, Button, Radio, Tag, Checkbox, Input, TreeSelect, Select, Modal, Table, Pagination, Spin } from "antd";

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

const Option = Select.Option, confirm = Modal.confirm, TreeNode = TreeSelect.TreeNode;

export default class SpecialDetails extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            ChildUnits: [],
            departments: [],
            AllCheckSort: [],
        }
    }
    // 挂载前
    componentWillMount() {
        this.fetchMsaInfos();
        this.getChildUnits();
        this.getAllShort();
        propsData = this.props.location.state;
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.setState({
            propsData: propsData,
            userInfo: userInfo,
            msaId: userInfo.departmentId,
            msaName: userInfo.departmentName,
            shortName: userInfo.shortName,
            childrenUnitsChoose: userInfo.shortName,
            childrenUnitsChoose1: userInfo.departmentId,
        }, () => {
            this.getTable(1)
        })
    }
    // 挂载后
    componentDidMount() {

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
    getAllShort() {
        $jsonp3(self, api.listAllCheckSort, {}).then(res => {
            self.setState({
                AllCheckSort: res.data.response.list,
            });
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
    // 获取数据
    getTable(page) {
        this.setState({
            loading: true
        })
        $jsonp3(self, api.listSpDetailByTaskId, {
            taskId: propsData.taskId,
            pageNum: page,

            msaId: this.state.childrenUnitsChoose1,
            checkMsaId: this.state.checkMsaId,
            code: this.state.Num,
            companyName: this.state.checkName,
            checkSortId: this.state.propsData.checkSortId,
            isToday: this.state.SeeToday ? "1" : "",
        }).then(res => {
            let resp = res.data.response;
            let arr = [];
            resp.list.map((item, index) => {
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

                arr.push(li);
            })
            this.setState({
                loading: false,
                tableData: arr,
                page: resp.pageInfo,
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
                        return <Button type="primary" onClick={() => { 
                            if(this.state.checkMsaId>14&&this.state.checkMsaId<18){
                                window.open("../../../ico/shipPrint.html?detailId=" + record.detailId)
                            }else{
                                window.open("../../../ico/DailySupervisionItemDetails.html?detailId=" + record.detailId) 
                            }
                             }}>查看检查单</Button>
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
    // 选择所属海事局单位
    selectChildrenUnits(value) {
        this.setState({
            childrenUnitsChoose: value,
            childrenUnitsChoose1: value
        })
    }
    onMsaIdCheck = (msaIdArray) => {
        self.setState({
            checkMsaId: msaIdArray
        })
    }
    changeNumber(e) {
        this.setState({
            Num: e.target.value,
        })
    }
    inquire = () => {
        this.getTable(1)
    }
    resetName = () => {
        this.setState({
            checkName: "",
            Num: "",
            childrenUnitsChoose: this.state.shortName,
            checkMsaId: "",
            SeeToday: false,
        }, () => {
            this.getTable(1);
        })
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

    back() {
        hashHistory.push({
            pathname: "/main/hiddenDanger",
            state: {
                size: self.state.propsData.size,
                pageNum: self.state.propsData.pageNum,
            }
        })
    }
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
        return (
            <div className={stylez.wrapPadding} style={{ padding: "0px", background: "#F7F7F7" }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", background: "white", padding: "15px" }}>
                    <Breadcrumb.Item>检查管理</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/main/hiddenDanger">隐患排查</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>检查单</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloatTop}></div>
                <div className={MaritimeAffairs.cardWrap}>
                    <div className={MaritimeAffairs.cardTitle}>{this.state.propsData.sortName}&emsp;<Tag color="red">隐患排查</Tag></div>
                    <Row>
                        <Col span={6}>
                            检查对象名称&emsp;
                            <Input style={{ width: "50%" }} onChange={(e) => {
                                this.setState({
                                    checkName: e.target.value
                                })
                            }} value={this.state.checkName} />
                        </Col>
                        <Col span={6}>
                            所在辖区&emsp;
                            <TreeSelect
                                // showSearch
                                style={{ width: "50%" }}
                                value={this.state.childrenUnitsChoose}
                                treeNodeFilterProp="title"
                                placeholder={this.state.shortName}
                                allowClear
                                treeDefaultExpandedKeys={this.state.ChildUnits.length > 0 ? [Number(this.state.ChildUnits[0].id).toString()] : [this.state.msaId.toString()]}
                                onChange={this.selectChildrenUnits.bind(this)}
                            >
                                <TreeNode title={this.state.shortName} value={this.state.msaId + ""} key={this.state.msaId + ""}>
                                    {this.state.ChildUnits.map((item, inx) => {
                                        return <TreeNode title={item.shortName} value={item.id + ""} key={item.id + ""} />
                                    })}
                                </TreeNode>
                            </TreeSelect>
                        </Col>
                        <Col span={6}>
                            检查单位&emsp;
                            <TreeSelect style={{ width: "50%", background: '#F5F5F5' }}
                                onChange={this.onMsaIdCheck}
                                dropdownMatchSelectWidth={false}
                                value={this.state.checkMsaId}>
                                {renderTreeNodes(this.state.departments)}
                            </TreeSelect>
                        </Col>
                        
                        <Col span={6}>
                            检查单编号&emsp;<Input style={{ width: "50%" }} onChange={this.changeNumber.bind(this)} value={this.state.Num}></Input>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "16px" }}>
                        <Col span={6}>

                            <Checkbox style={{ display: "inline-block", verticalAlign: "top" }} onChange={() => {
                                this.setState({
                                    SeeToday: !this.state.SeeToday
                                })
                            }} checked={this.state.SeeToday} ><span style={{ display: "inline-block", verticalAlign: "middle" }}>查看今日检查单</span> </Checkbox>
                        </Col>
                        <Col offset={14} span={4} style={{ marginTop: "16px" }}>
                            <Button type="primary" onClick={self.inquire.bind(self)}>查询</Button>
                            <Button style={{ marginLeft: '26px' }} onClick={self.resetName.bind(self)} type="primary" >重置</Button>
                        </Col>
                    </Row>
                    <br />
                    <Spin spinning={this.state.loading} tip="获取数据中，请稍后..." delay={100} style={{ background: "transparent", width: "100%", }}>
                        {this.state.tableData ?
                            <div style={{ overflow: "hidden", marginTop: 40 }}>
                                <Table className={MaritimeAffairs.Table} rowKey={record => record.taskId} columns={this.state.tableColumns} dataSource={this.state.tableData} pagination={false}>
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
                    </Spin>
                </div>
            </div>
        )

    }
}