// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Row, Col, Select, Input, Button, TreeSelect, Table, Tag, Pagination, Icon, message, Modal } from "antd";

// less
import MaritimeAffairs from "../MaritimeAffairs/MaritimeAffairs.less"
import publicstyle from "../../img/public.less";
import stylez from '../../container/index.less';
import report from "../report/report.less";
import styles2 from "../admin/index.less";
import styles from "../stastics/taskIndex.less";
import PageStyles from "../stastics/taskIndex.less";
import Cardstyles from '../businessmanage/addcompanyNew.less'

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";

import right from "../../img/rightIcons.png";
import error from "../../img/errorIcons.png";

let self, propsData = {
    checkName: "",
    sortId: "",
}, name = "", node, msaId;

const Option = Select.Option, TreeNode = TreeSelect.TreeNode, confirm = Modal.confirm;

export default class Library extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            allLevel: [],
            ChildrenMsa: [],
            // checkBox: false,
        }
    }
    // 挂载前
    componentWillMount() {
        propsData = this.props.location.state;
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        var level = localStorage.getItem("level");

        name = (userInfo.departmentName == "江苏省地方海事局" ? "" : userInfo.departmentName);
        msaId = (userInfo.departmentId == 1 ? "" : userInfo.departmentId);
        node = (level == "省" ? true : false);

        console.log("propsData", propsData.msaId);

        this.setState({
            propsData: propsData,
            userInfo: userInfo,
            MsaNameValue: name,
            msaId: !!!propsData.msaId ? msaId : propsData.msaId,
            node: node,

            nameValue: !!!propsData.nameValue ? "" : propsData.nameValue,
            MsaNameValue: !!!propsData.MsaNameValue ? "" : propsData.MsaNameValue,
            sortId: !!!propsData.sortId ? "" : propsData.sortId,
            levelValue: !!!propsData.levelValue ? "" : propsData.levelValue,
            riskLevelValue: !!!propsData.riskLevelValue ? "" : propsData.riskLevelValue,
        }, () => {
            console.log("msaId", this.state.msaId)
            this.getChildrenMsa();
            if (node == false) {
                this.getLevel();
            }
            this.search(propsData.pageNum ? propsData.pageNum : 1);
        })
    }
    // 挂载后
    componentDidMount() {

    }
    getChildrenMsa() {
        $jsonp3(self, api.listDepartmentByUser, {}).then(res => {
            let list = res.data.response.list;
            this.setState({
                ChildrenMsa: list
            })
        })
    }
    getLevel() {
        $jsonp3(self, api.listSortLevelBySortIdAndMsaId, {
            sortId: this.state.propsData.sortId,
            msaId: this.state.msaId
        }).then(res => {
            if (res.code == 200) {
                let arr = res.data.response.list;
                this.setState({
                    allLevel: arr,
                })
            }
        })
    }
    nameInput(e) {
        this.setState({
            nameValue: e.target.value,
        })
    }
    selectMsaName(value) {
        this.setState({
            MsaNameValue: value,
            msaId: value,
            levelValue: "",
        }, () => {
            this.getLevel();
        })
    }
    selectLevel(value) {
        this.setState({
            levelValue: value,
        })
    }
    riskLevel(value) {
        this.setState({
            riskLevelValue: value,
        })
    }
    search(page) {
        $jsonp3(self, api.listCompanyByConditional, {
            name: this.state.nameValue,
            msaId: this.state.msaId,
            sortId: this.state.propsData.sortId,
            sortLevelId: this.state.levelValue,
            level: this.state.riskLevelValue,
            pageNum: page,
        }).then(res => {
            let data = res.data.response;
            let tablesData = [];
            if (data.list != null && data.list.length != 0) {
                data.list.map((item, index) => {
                    let it = {};
                    it.index = (page - 1) * 10 + index + 1;
                    it.id = item.id;
                    it.title = item.name.replace("(" + item.unit + ")", "");
                    it.level = item.level;
                    it.unit = !!!item.unit || item.unit == "null" ? "--" : item.unit;
                    it.operator = !!!item.operator || item.operator == "null" ? "--" : item.operator;
                    it.operatorPhone = !!!item.operatorPhone || item.operatorPhone == "null" ? "--" : item.operatorPhone;
                    it.msaId = item.msaId;
                    it.msaName = item.msaName;
                    it.location = !!!item.location || item.location == "null" ? "--" : item.location;
                    it.other = item;
                    it.recordTime = item.recordTime;

                    it.levelName = !!!item.levelName || item.levelName == "null" ? "无" : item.levelName;
                    it.levelTag = item.levelName == "默认";
                    it.sortLevelId = !!!item.sortLevelId || item.sortLevelId == "null" ? "无" : item.sortLevelId;
                    it.isQualified = item.isQualified;
                    it.isQualifiedName = item.isQualified ? "达标" : "不达标";
                    it.createTime = this.getDay(item.createTime);
                    it.statusId = item.status;
                    it.statusName = item.status == 0 ? "注销" : "正常";
                    it.sortId = item.sortId;

                    tablesData.push(it);
                })
            }
            this.setState({
                page: data.pageInfo,
                tableData: tablesData,
                // 非游览经营
                tableColumn: [{
                    title: "编号",
                    dataIndex: "index",
                    key: "index",
                    className: publicstyle.center,
                }, {
                    title: "检查对象名称",
                    dataIndex: "title",
                    key: "title",
                    className: publicstyle.center,
                }, {
                    title: "等级",
                    dataIndex: "levelName",
                    key: "levelName",
                    className: publicstyle.center,
                    render: (text, record) => {
                        if (record.levelTag) {
                            return <Tag>{record.levelName}</Tag>
                        } else {
                            return <Tag color="blue">{record.levelName}</Tag>
                        }
                    }
                }, {
                    title: "运营人",
                    dataIndex: "operator",
                    key: "operator",
                    className: publicstyle.center,
                }, {
                    title: "运营人手机",
                    dataIndex: "operatorPhone",
                    key: "operatorPhone",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <span className={MaritimeAffairs.nowrap}>{record.operatorPhone}</span>
                    }
                }, {
                    title: "所属海事局",
                    dataIndex: "msaName",
                    key: "msaName",
                    className: publicstyle.center,
                }, {
                    title: "地址/作业海域",
                    dataIndex: "location",
                    key: "location",
                    className: publicstyle.center,
                }, {
                    title: "其他信息",
                    // dataIndex: "other",
                    key: "other",
                    width: "20%",
                    className: publicstyle.center,
                    render: (text, record) => {
                        if (record.sortId == 1) {
                            return <div style={{ textAlign: "left", padding: "0px 24px" }}>
                                <span className={MaritimeAffairs.nowrap}>渡船船名：&emsp;{!!!record.other.shipsName || record.other.shipsName == "null" ? "" : record.other.shipsName}</span>
                                <span className={MaritimeAffairs.nowrap}>载客定额：&emsp;{record.other.busload == null ? "" : record.other.busload}</span>
                            </div>
                        } else if (record.sortId == 2 || record.sortId == 3) {
                            return <div style={{ textAlign: "left", padding: "0px 24px" }}>
                                <span>游览经营单位：&emsp;{record.unit}</span>
                                <span className={MaritimeAffairs.nowrap}>备案时间：&emsp;{record.recordTime}</span>
                            </div>
                        } else if (record.sortId == 8) {
                            return <div style={{ textAlign: "left", padding: "0px 24px" }}>
                                <span className={MaritimeAffairs.nowrap}>职工人数：{!!!record.other.employeeCount ? "" : record.other.employeeCount}</span>
                                <span className={MaritimeAffairs.nowrap}>安全管理人员：{!!!record.other.managerCount ? "" : record.other.managerCount}</span>
                                <span className={MaritimeAffairs.nowrap}>持证上岗人员：{!!!record.other.credentialCount ? "" : record.other.credentialCount}</span>
                                <span className={MaritimeAffairs.nowrap}>加油机数量：{!!!record.other.machineCount ? "" : record.other.machineCount}</span>
                                <span className={MaritimeAffairs.nowrap}>加油枪数量：{!!!record.other.gunCount ? "" : record.other.gunCount}</span>
                                <span>主要管理制度名称：{!!!record.other.systemName ? "" : record.other.systemName}</span>
                            </div>
                        } else if (record.sortId == 9) {
                            return <div style={{ textAlign: "left", padding: "0px 24px" }}>
                                <span className={MaritimeAffairs.nowrap}>船舶吨位：{!!!record.other.shipLoad ? "" : record.other.shipLoad}</span>
                            </div>
                        } else if (record.sortId == 11) {
                            return <div style={{ textAlign: "left", padding: "0px 24px" }}>
                                <span className={MaritimeAffairs.nowrap}>拥有游艇数：{!!record.other.yachtCount ? record.other.yachtCount : ""}</span>
                            </div>
                        } else if (record.sortId == 14) {
                            return <div style={{ textAlign: "left", padding: "0px 24px" }}>
                                <span className={MaritimeAffairs.nowrap}>是否体系：{!!!record.other.isSystem ? "" : record.other.isSystem}</span>
                            </div>
                        } else {
                            return "--"
                        }
                    }
                }, {
                    title: "风险分级",
                    dataIndex: "level",
                    key: "level",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <span className={record.level == 1 ? MaritimeAffairs.bluesColor : record.level == 2 ? MaritimeAffairs.yellowsColor : record.level == 3 ? MaritimeAffairs.orangesColor : record.level == 4 ? MaritimeAffairs.redsColor : MaritimeAffairs.graysColor}>{!!!record.level || record.level == "null" ? "--" : record.level}</span>
                    }
                }, {
                    title: "当期检查次数",
                    dataIndex: "isQualified",
                    key: "isQualified",
                    className: publicstyle.center,
                    render: (text, record) => {
                        if (record.statusId == 0) {
                            return "--"
                        } else {
                            return <div className={MaritimeAffairs.nowrap}>
                                <img src={record.isQualified ? right : error} style={{ verticalAlign: "middle", display: "inline-block" }} alt="" />&ensp;
                                {record.isQualifiedName}
                            </div>
                        }
                    }
                }, {
                    title: "状态",
                    dataIndex: "status",
                    key: "status",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <Tag color={record.statusId == 0 ? "red" : "blue"}>{record.statusName}</Tag>
                    }
                }, {
                    title: "操作",
                    dataIndex: "action",
                    key: "action",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <div>
                            <button className={MaritimeAffairs.Button2F8DEB + " " + MaritimeAffairs.ButtonMargin} style={{ display: record.statusId == 1 ? "inline-block" : "none" }} onClick={this.editObject.bind(this, record)}>编辑</button>
                            <button className={MaritimeAffairs.ButtonF04B31 + " " + MaritimeAffairs.ButtonMargin} style={{ display: record.statusId == 1 ? "inline-block" : "none" }} onClick={this.wihteOff.bind(this, record)}>注销</button>
                            <button className={MaritimeAffairs.Button2F8DEB + " " + MaritimeAffairs.ButtonMargin} style={{ display: record.statusId == 0 ? "inline-block" : "none" }} onClick={this.reuse.bind(this, record)}>复用</button>
                            <button className={MaritimeAffairs.Button5ECF8B + " " + MaritimeAffairs.ButtonMargin} onClick={this.archive.bind(this, record)}>档案</button>
                        </div>
                    }
                },]
            })
        })
    }
    wihteOff = (record) => {
        confirm({
            title: '注销 ' + record.title,
            content: `确认注销 ${record.title}吗？`,
            onOk() {
                $jsonp3(self, api.companyEnableOrDisable, {
                    id: record.id,
                    status: 0
                }).then(res => {
                    if (res.code == 200) {
                        self.search(self.state.page.pageNum)
                        return message.success("该部门已被注销")
                    }
                })
            },
            onCancel() {
                return
            },
        });

    }
    reuse = (record) => {
        confirm({
            title: '复用' + record.title,
            content: `确认复用${record.title}吗？`,
            onOk() {
                $jsonp3(self, api.companyEnableOrDisable, {
                    id: record.id,
                    status: 1
                }).then(res => {
                    if (res.code == 200) {
                        self.search(self.state.page.pageNum)
                        return message.success("该部门已被启用")
                    }
                })
            },
            onCancel() {
                return
            },
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
    reset = () => {

        this.setState({
            nameValue: "",
            MsaNameValue: "",
            levelValue: "",
            riskLevelValue: "",
            msaId: (this.state.userInfo.departmentId == 1 ? "" : this.state.userInfo.departmentId),
        }, () => {
            this.search(this.state.page.pageNum)
        })
    }
    toFirst() {
        this.search(1)
    }
    onPageChange(page) {
        this.search(page)
    }
    toLast() {
        this.search(this.state.page.pages)
    }
    back() {
        hashHistory.push({
            pathname: "/main/projectItem",
        })
    }
    addObject() {
        hashHistory.push({
            pathname: "/main/addCheckObject",
            state: {
                edit: false,
                sortId: propsData.sortId,
                checkName: propsData.checkName,
                pageNum: this.state.page.pageNum,
            }
        })

    }
    editObject(record) {
        hashHistory.push({
            pathname: "/main/addCheckObject",
            state: {
                edit: true,
                sortId: propsData.sortId,
                checkName: propsData.checkName,
                pageNum: this.state.page.pageNum,

                nameValue: this.state.nameValue,
                msaId: this.state.msaId,
                MsaNameValue: this.state.MsaNameValue,
                sortId: this.state.propsData.sortId,
                levelValue: this.state.levelValue,
                riskLevelValue: this.state.riskLevelValue,
                record,
            }
        })
    }
    archive(record) {
        hashHistory.push({
            pathname: "/main/archive",
            state: {
                sortId: propsData.sortId,
                checkName: propsData.checkName,
                pageNum: this.state.page.pageNum,

                nameValue: this.state.nameValue,
                msaId: this.state.msaId,
                MsaNameValue: this.state.MsaNameValue,
                sortId: this.state.propsData.sortId,
                levelValue: this.state.levelValue,
                riskLevelValue: this.state.riskLevelValue,
                record,
            }
        })
    }
    moreIn() {
        hashHistory.push({
            pathname: "/main/moreIn",
            state: {
                sortId: propsData.sortId,
                checkName: propsData.checkName,
            }
        })
    }
    checkd(value) {
        var moveTo = false;
        if (value.length != 0) {
            moveTo = true
        }
        this.setState({
            checked: value,
            moveTo,
        })
    }

    moveTo() {
        this.setState({ visible: true })
    }
    selectMoveTo(value) {
        this.setState({
            MoveToMsaName: value,
        })
    }
    handleCancel() {
        if (!!!this.state.MoveToMsaName) {
            message.error("请选择将要移入的等级")
            return this.setState({ visibleText: true })
        }
        $jsonppost(self, api.massTransferSortLevel, {
            ids: this.state.checked + "",
            parId: this.state.propsData.sortId,//shortId
            levelId: this.state.MoveToMsaName,//shortLevelId
        }).then(res => {
            if (res.code == 200) {
                self.search(self.state.page.pageNum)
                self.setState({ visible: false, checkBox: false })
            }
        })
    }
    hide() {
        this.setState({ visible: false })
    }
    // 渲染
    render() {
        let Company = this.state.propsData.sortId == 2 || this.state.propsData.sortId == 3 || this.state.propsData.sortId == 12;
        return (
            <div className={stylez.wrapPadding} style={{ padding: "0px", background: "#f4f4f4", position: "relative" }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", background: "white", padding: "15px" }}>
                    <Breadcrumb.Item>检查项目管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查对象名录库</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloatTop}></div>

                <div className={MaritimeAffairs.cardWrap}>
                    <div className={MaritimeAffairs.cardTitle}>
                        {this.state.propsData.checkName}
                    </div>
                    <Row>
                        <Col span={5} onChange={this.nameInput.bind(this)} value={this.state.nameValue}>
                            检查对象名称&emsp;
                            <Input style={{ width: "50%" }} value={this.state.nameValue}></Input>
                        </Col>
                        <Col span={5}>
                            所属海事局&emsp;
                            <TreeSelect style={{ width: "50%" }} onChange={this.selectMsaName.bind(this)} value={this.state.MsaNameValue} placeholder={"请选择所属海事局"} treeDefaultExpandAll>
                                <TreeNode value={this.state.userInfo.departmentId
                                    + ""} key={this.state.userInfo.departmentName} title={this.state.userInfo.departmentName} disabled={this.state.node}>
                                    {
                                        this.state.ChildrenMsa.map(item => {
                                            return <treeNode value={item.id + ""} title={item.name} key={item.id + ""} />
                                        })
                                    }
                                </TreeNode>
                            </TreeSelect>
                        </Col>
                        <Col span={5}>
                            等级&emsp;
                            <Select style={{ width: "50%" }} onChange={this.selectLevel.bind(this)} value={this.state.levelValue} placeholder={"请先选择海事局"} disabled={!!!this.state.msaId ? true : false}>
                                {
                                    this.state.allLevel.map((item, index) => {
                                        return <Option key={item.id + ""} value={item.id + ""} disabled={item.status == 0}>{item.name}</Option>
                                    })
                                }
                            </Select>
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
                            <Button type="primary" className={MaritimeAffairs.ButtonMargin} onClick={this.search.bind(this, 1)}>查询</Button>
                            <Button className={MaritimeAffairs.ButtonMargin} onClick={this.reset.bind(this)}>重置</Button>
                        </Col>
                    </Row>
                    <Row style={{ margin: "40px 0px 16px" }}>
                        <Button type="primary" className={MaritimeAffairs.ButtonMargin} onClick={this.addObject.bind(this)}>+ 新增对象</Button>
                        {/* <span style={{ position: "relative" }}> */}
                        <Button className={MaritimeAffairs.ButtonMargin} onClick={this.moreIn.bind(this)}>批量导入</Button>
                        {/* <Input type="file" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={this.chooseFile.bind(this)} style={{ width: "90px", display: "inline-block", position: "absolute", left: 0, top: 0, zIndex: 1, opacity: "0" }} /> */}
                        {/* </span> */}
                        <Button className={MaritimeAffairs.ButtonMargin} style={{ display: this.state.node ? "none" : "inline-block" }} onClick={() => this.setState({ checkBox: !this.state.checkBox, MoveToMsaName: "" })}>批量转移（等级）</Button>
                        <a href={Company ? "../../../ico/excel/litter.xlsx" : "../../../ico/excel/more.xlsx"} style={{ float: "right" }} download={`批量导入模板 (${this.state.propsData.checkName})`}> <Icon type="download" />下载批量导入模板 ({this.state.propsData.checkName})</a>
                    </Row>
                    {
                        this.state.tableData ? <div>
                            <Table pagination={false} className={MaritimeAffairs.Table} columns={this.state.tableColumn} dataSource={this.state.tableData} rowKey={record => record.id} rowSelection={this.state.checkBox ? {
                                type: 'checkbox',
                                onChange: this.checkd.bind(this),
                            } : undefined}></Table>
                            <button className={MaritimeAffairs.Button2F8DEB} style={{ display: this.state.moveTo && this.state.checkBox ? "inline-block" : "none", margin: "24px 0px 0px" }} onClick={this.moveTo.bind(this)}>转移到</button>
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
                </div>
                <Modal
                    title="转移检查对象至"
                    visible={this.state.visible}
                    onOk={this.handleCancel.bind(this)}
                    onCancel={this.hide.bind(this)}
                    okText="确认"
                    cancelText="取消"
                    className={MaritimeAffairs.Model}
                >
                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>等级：</dt>
                        <dd>
                            <Select style={{ width: "100%" }} onChange={this.selectMoveTo.bind(this)} value={this.state.MoveToMsaName} placeholder={"请选择要移入的等级"} disabled={!!!this.state.msaId ? true : false}>
                                {
                                    this.state.allLevel.map((item, index) => {
                                        return <Option key={item.id + ""} value={item.id + ""} disabled={item.status == 0}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </dd>
                    </dl>
                    <dl style={{ display: this.state.visibleText ? "block" : "none" }}>
                        <dt></dt>
                        <dd>
                            <span style={{ color: "red", fontSize: "10px" }}>请选择要移入的等级</span>
                        </dd>
                    </dl>
                </Modal>
            </div>
        )

    }
}