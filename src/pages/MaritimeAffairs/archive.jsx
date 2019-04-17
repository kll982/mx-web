// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Row, Col, Button, Table, TreeSelect, Select, Modal, Input, Pagination, Tag } from "antd";

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

// img
import blueImg from "../../img/blueImg.png";
import redImg from "../../img/redImg.png";
import yellowImg from "../../img/yellowImg.png";
import orangeImg from "../../img/orangeImg.png";
import grayImg from "../../img/grayImg.png";
import checkRight from "../../img/checkRight.png";
import checkWram from "../../img/checkWram.png";
import checkListIcon from "../../img/checkListIcon.png";
import grayRing from "../../img/grayRing.png";

let self, propsData = {};
const Option = Select.Option, confirm = Modal.confirm, TreeNode = TreeSelect.TreeNode;

export default class Archive extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            departments: [],
            list: {},
        }
    }
    // 挂载前
    componentWillMount() {
        this.fetchMsaInfos();
        propsData = this.props.location.state;

        let level = localStorage.getItem("level");
        // var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.setState({
            propsData: propsData,
            level: level,
            //     userInfo: userInfo,
        }, () => {
            this.getTableData(1)
            this.getData()
        })
    }
    // 挂载后
    componentDidMount() {

    }
    getData() {
        $jsonp3(self, api.getCompanyExponentInfo, {
            companyId: propsData.record.id,
        }).then(res => {
            let list = res.data.response;
            this.setState({
                list: list,
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
    getTableData(page) {
        var data = {}
        $jsonp3(self, api.listChecklistByConditional, {
            msaName: this.state.checkMsaId,
            code: this.state.Num,
            level: this.state.riskLevelValue,
            companyId: propsData.record.id,
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

    back() {
        hashHistory.push({
            pathname: "/main/library",
            state: {
                checkName: propsData.checkName,
                sortId: propsData.sortId,
                pageNum: propsData.pageNum,

                nameValue: propsData.nameValue,
                msaId: propsData.msaId,
                sortId: propsData.sortId,
                levelValue: propsData.levelValue,
                MsaNameValue: propsData.MsaNameValue,
                riskLevelValue: propsData.riskLevelValue,
            }
        })
    }
    // 检查单位
    fetchMsaInfos() {
        $jsonp3(self, api.listDepartmentByUser, {
            type: "all"
        }).then((res) => {
            this.setState({
                departments: res.data.response.list,
            });
        });
    }
    onMsaIdCheck(value) {
        this.setState({
            checkMsaId: value,
        })
    }
    changeNumber(e) {
        this.setState({
            Num: e.target.value,
        })
    }
    riskLevel(value) {
        this.setState({
            riskLevelValue: value,
        })
    }
    reset() {
        this.setState({
            checkMsaId: "",
            Num: "",
            riskLevelValue: "",
        })
    }
    toFirst() {
        this.getTableData(1);
    }
    onPageChange(page) {
        this.getTableData(page);
    }
    toLast() {
        this.getTableData(this.state.page.pages);
    }
    // 渲染
    render() {
        var list = this.state.list;
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
            <div className={stylez.wrapPadding} style={{ padding: "0px", background: "#f4f4f4", position: "relative" }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", background: "white", padding: "15px" }}>
                    <Breadcrumb.Item>检查项目管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查对象名录库</Breadcrumb.Item>
                    <Breadcrumb.Item>档案</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloatTop}></div>
                <div className={MaritimeAffairs.cardWrap}>
                    <div className={MaritimeAffairs.cardTitle}>{this.state.propsData.record.title}</div>
                    <Row>
                        <Col span={6}>
                            <div className={MaritimeAffairs.leftImgWrap}>
                                <img src={this.state.list.level == 1 ? blueImg : this.state.list.level == 2 ? yellowImg : this.state.list.level == 3 ? orangeImg : this.state.list.level == 4 ? redImg : grayImg} alt="" />
                                <div className={MaritimeAffairs.leftImg_rightItem}>

                                    <span className={this.state.list.level == 1 ? MaritimeAffairs.bluesColor : this.state.list.level == 2 ? MaritimeAffairs.yellowsColor : this.state.list.level == 3 ? MaritimeAffairs.orangesColor : this.state.list.level == 4 ? MaritimeAffairs.redsColor : MaritimeAffairs.graysColor}>{this.state.list.level == null ? "--" : this.state.list.level}</span>
                                    <p>当前风险分级</p>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={MaritimeAffairs.leftImgWrap}>
                                <img src={checkWram} alt="" />
                                <div className={MaritimeAffairs.leftImg_rightItem}>
                                    <span className="top">{this.state.list.unSolveCount}</span>
                                    <p>当前隐患</p>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={MaritimeAffairs.leftImgWrap}>
                                <img src={this.state.list.IsQualified ? checkRight : grayRing} alt="" />
                                <div className={MaritimeAffairs.leftImg_rightItem}>

                                    <span className="top">{this.state.list.IsQualified ? "已达标" : "未达标"}</span>
                                    <p>当期检查次数</p>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={MaritimeAffairs.leftImgWrap}>
                                <img src={checkListIcon} alt="" />
                                <div className={MaritimeAffairs.leftImg_rightItem}>

                                    <span className="top">{this.state.list.checklistCount}</span>
                                    <p>检查单总数</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={MaritimeAffairs.cardWrap}>
                    <Row>
                        <Col span={5}>
                            检查单位&emsp;
                            <TreeSelect style={{ width: "50%", background: '#F5F5F5' }}
                                onChange={this.onMsaIdCheck}
                                dropdownMatchSelectWidth={false}
                                value={this.state.checkMsaId}>
                                {renderTreeNodes(this.state.departments)}
                            </TreeSelect>
                        </Col>
                        <Col span={5}>
                            检查单编号&emsp;<Input style={{ width: "50%" }} onChange={this.changeNumber.bind(this)} value={this.state.Num}></Input>
                        </Col>
                        <Col span={5}>
                            风险分级&emsp;
                            <Select style={{ width: "50%" }} onChange={this.riskLevel.bind(this)} value={this.state.riskLevelValue}>
                                <Option value={"1"}>1</Option>
                                <Option value={"2"}>2</Option>
                                <Option value={"3"}>3</Option>
                                <Option value={"4"}>4</Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            <Button type="primary" className={MaritimeAffairs.ButtonMargin} onClick={this.getTableData.bind(this, 1)}>查询</Button>
                            <Button onClick={this.reset.bind(this)} className={MaritimeAffairs.ButtonMargin}>重置</Button>
                        </Col>
                    </Row>
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
                </div>
            </div>
        )

    }
}