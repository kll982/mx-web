// 审核
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Row, Col, Table, Button, Tag, Pagination, Select, Input, TreeSelect, message, Popover, Menu, Dropdown, Icon } from "antd";

import publicstyle from "../../img/public.less";
import styles from "../stastics/taskIndex.less";
import stylez from '../../container/index.less';

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";

let self, UserInfo = {
    departmentName: "",
    departmentId: "",
}, prposData = {
    resultsChooseed: "",
    loadAudit: "",
};

const Option = Select.Option, TreeNode = TreeSelect.TreeNode;

export default class audit extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            tableData: [],
            page: {},
            // loadAudit: true,
            checkObject: [],
            chooseCheckObject: "",
            // resultsChooseed: 1,
            AllUnits: [{ id: null }],
            ChildUnits: [{ id: null }],
            UserInfo: {
                departmentName: "",
                departmentId: "",
            },
        }
    }
    // 挂载前
    componentWillMount() {
        UserInfo = JSON.parse(localStorage.getItem("userInfo"));
        prposData = self.props.location.state;
        this.getCheckObject();
        this.getAllUnits();
        this.getChildUnits();
        this.setState({
            UserInfo: UserInfo,
            msaId: UserInfo.departmentId,
            msaName: UserInfo.departmentName,
            resultsChooseed: prposData == null ? 1 : prposData.resultsChooseed,
            loadAudit: prposData == null ? true : prposData.loadAudit,
        })
    }
    // 挂载后
    componentDidMount() {
        this.condition1();
    }
    // 获取检查对象
    getCheckObject() {
        $jsonp3(self, api.listAllCheckSort, {}).then(res => {
            this.setState({
                checkObject: res.data.response.list,
            })
        })
    }
    // 获取所属海事局
    getChildUnits() {
        $jsonp3(self, api.listDepartmentByUser, {}).then((res) => {
            var children = res.data.response.list;
            this.setState({
                ChildUnits: children,
            })
        });
    }
    // 获取督办单位
    getAllUnits() {
        $jsonp3(self, api.getAllCompanyDepartmentTreeInUse, {}).then(res => {
            this.setState({
                AllUnits: res.data.response.companyDepartmentList,
            })

        })
    }
    condition(page) {
        $jsonp3(self, api.listReviewAuditByConditional, {
            companyName: this.state.chooseFilterName, // 项目名称
            checkSortId: this.state.chooseCheckObject,// 检查对象
            companyMsaId: this.state.childrenUnitsChoose,// 所属海事局
            msaId: this.state.unitsChoose,// 督办单位
            isPass: this.state.resultsChooseed,// 审核结果
            pageNum: page, //当前页
        }).then(res => {
            var list = res.data.response.list;
            var pageInfo = res.data.response.pageInfo;
            var tableData = [];
            console.log(list);
            if (list == null) {
                return;
            } else {
                list.map((item, index) => {
                    var obj = {};
                    obj.index = (page - 1) * 10 + (index + 1);
                    obj.reviewId = item.reviewId;//复查Id
                    obj.checkSortName = item.checkSortName;//检查项目
                    obj.companyMsaName = item.companyMsaName;//所属海事局
                    obj.companyName = item.companyName;//项目名称
                    obj.item = item.item;//隐患
                    obj.reviewByName = item.reviewByName + " " + (item.synergyPerson == null ? "" : item.synergyPerson == "" ? "" : item.synergyPerson);//复查人
                    obj.reviewMsaName = item.reviewMsaName;//督办单位(复查人所属海事部门)
                    obj.uploadTime = this.getDay(item.uploadTime);//上报时间

                    obj.sortId = item.sortId;
                    obj.passByName = item.passByName;// 审核人
                    obj.passByMsaName = item.passByMsaName;// 审核人部门
                    obj.passTime = this.getDay(item.passTime);//审核时间
                    obj.isPassValue = item.isPass;// 审核结果
                    obj.isPassName = item.isPass == 1 ? "<Tag color='orange'>待审核</Tag>" : item.isPass == 2 ? "<Tag color='red'>未通过</Tag>" : item.isPass == 3 ? "<Tag color='#87d068'>通过</Tag>" : "<Tag>其他</Tag>";// 审核结果
                    tableData.push(obj);
                })
            }
            this.setState({
                tableData: tableData,
                page: pageInfo,
            })
        })
    }
    // 查询
    condition1() {
        this.condition(1);
    }
    // 重置
    reset() {
        this.setState({
            chooseCheckObject: "",// 检查对象
            loadAudit: true, // 待审核
            resultsChooseed: 1, // 审核结果
            unitsChoose: "", // 督办单位
            chooseFilterName: "", // 项目名称
            childrenUnitsChoose: "",// 所属海事局
            resultsChoose: "" // 审核结果
        })
    }
    // 选择督办单位
    selectUnits(value) {
        this.setState({
            unitsChoose: value
        })
    }
    // 选择所属海事局单位
    selectChildrenUnits(value) {
        this.setState({
            childrenUnitsChoose: value
        })
    }
    // 选择检查对象
    selectCheckObject(value) {
        this.setState({
            chooseCheckObject: value
        })

    }
    // 切换审核状态
    change() {
        this.setState({ loadAudit: !this.state.loadAudit }, () => {
            if (this.state.loadAudit == true) {
                this.setState({
                    resultsChooseed: 1
                }, () => {
                    this.condition1();
                })
            } else {
                this.setState({
                    resultsChooseed: 4
                }, () => {
                    this.condition1();
                })
            }
        });

    }
    // 报表名称
    SelectChangeName(e) {
        this.setState({
            chooseFilterName: e.target.value,
        }, () => {
            this.condition1();
        })
    }
    // 审核
    audit(record) {
        hashHistory.push({
            pathname: '/main/auditDetails',
            state: {
                reviewId: record.reviewId,
                auditIt: true,
                item: record.item,
                checkSortName: record.checkSortName,
                companyName: record.companyName,
                resultsChooseed: this.state.resultsChooseed,
                loadAudit: true,
                sortId:record.sortId,
            }
        })
    }
    // 查看
    watch(record) {
        hashHistory.push({
            pathname: '/main/auditDetails',
            state: {
                reviewId: record.reviewId,
                auditIt: false,
                item: record.item,
                checkSortName: record.checkSortName,
                companyName: record.companyName,
                resultsChooseed: this.state.resultsChooseed,
                loadAudit: false,
                sortId:record.sortId,
            }
        })
    }
    // 审核结果
    selectResults(value) {
        this.setState({
            resultsChooseed: value,
            resultsChoose: value
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
        this.condition(this.state.page.pages)
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
    // 渲染
    render() {
        var columns;
        if (this.state.loadAudit == true) {
            columns = [{
                title: '序号',
                dataIndex: 'index',
                className: publicstyle.center
            }, {
                title: '检查项目',
                dataIndex: 'checkSortName',
                className: publicstyle.center
            },
            {
                title: '所属海事局',
                dataIndex: 'companyMsaName',
                className: publicstyle.center,
            },
            {
                title: '项目名称',
                key: 'companyName',
                dataIndex: 'companyName',
                className: publicstyle.center,
                // render: (text, record, index) => {
                //     return <Popover placement="leftTop" content={record.companyName}>
                //         {record.companyName}
                //     </Popover>
                // }
            },
            {
                title: '隐患',
                dataIndex: 'item',
                className: publicstyle.center,
            },
            {
                title: '复查人',
                dataIndex: 'reviewByName',
                className: publicstyle.center,
            },
            {
                title: '督办单位',
                dataIndex: 'reviewMsaName',
                className: publicstyle.center,
            },
            {
                title: '上报时间',
                dataIndex: 'uploadTime',
                className: publicstyle.center,
            },
            {
                title: '操作',
                key: 'action',
                className: publicstyle.center,
                render: (text, record, index) => {
                    return <Button type="primary" style={{ margin: "0px 10px 10px 0px" }}
                        onClick={this.audit.bind(this, record)}>审核</Button>
                },
            }];
        } else {
            columns = [{
                title: '序号',
                dataIndex: 'index',
                className: publicstyle.center
            }, {
                title: '检查项目',
                dataIndex: 'checkSortName',
                className: publicstyle.center
            },
            {
                title: '所属海事局',
                dataIndex: 'companyMsaName',
                className: publicstyle.center,
            },
            {
                title: '项目名称',
                dataIndex: 'companyName',
                className: publicstyle.center,
            },
            {
                title: '隐患',
                dataIndex: 'item',
                className: publicstyle.center,
            },
            {
                title: '复查人',
                // dataIndex: 'reviewByName',
                key: "reviewByName",
                className: publicstyle.center,
                render: (text, record, index) => {
                    return <Popover placement="leftTop" content={record.reviewMsaName}>
                        {record.reviewByName}
                    </Popover>
                }
            },
            {
                title: '审核人',
                // dataIndex: 'passByName',
                key: "passByName",
                className: publicstyle.center,
                render: (text, record, index) => {
                    return <Popover placement="leftTop" content={record.passByMsaName}>
                        {record.passByName}
                    </Popover>
                }
            },
            {
                title: '审核结果',
                dataIndex: 'isPassValue',
                className: publicstyle.center,
                render: (text, record, index) => {
                    if (record.isPassValue == 1) {
                        return <Tag color='orange'>待审核</Tag>
                    }
                    else if (record.isPassValue == 2) {
                        return <Tag color='red'>未通过</Tag>
                    }
                    else if (record.isPassValue == 3) {
                        return <Tag color='green'>通过</Tag>
                    }

                }
            },
            {
                title: '审核时间',
                dataIndex: 'passTime',
                className: publicstyle.center,
            },
            {
                title: '操作',
                key: 'action',
                className: publicstyle.center,
                render: (text, record, index) => {
                    return <Button type="primary" style={{ margin: "0px 10px 10px 0px" }}
                        onClick={this.watch.bind(this, record)}>查看</Button>
                },
            }];
        }

        const renderTreeNodes = data => data.map((item) => {
            if (item.children == null || item.children.length == 0) {
                return <TreeNode title={item.name} key={item.id + ""} value={item.id + ""} disabled={item.status != 1} />;
            } else {
                return (
                    <TreeNode title={item.name} key={item.id + ""} value={item.id + ""} disabled={item.status != 1}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
        });
        return (
            <div className={stylez.wrapPadding}>
                <Breadcrumb separator=">" style={{ textAlign: "left" }}>
                    <Breadcrumb.Item>审核</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="main/audit">隐患复查</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className={publicstyle.clearfloat}></div>
                <h3 style={{ margin: "20px 0px 30px", }}>隐患复查
                    <a style={{ margin: "0px 20px", }} onClick={this.change.bind(this)} className="ant-dropdown-link" href="javascript:void(0);">
                        {this.state.loadAudit == true ? "待审核" : "已审核"}&nbsp;
                        <Icon type="down" />
                    </a>

                    {/* <Button style={{ margin: "0px 20px", }} onClick={this.change.bind(this)}>{this.state.loadAudit == true ? "待审核" : "已审核"}</Button> */}
                </h3>
                <Row>
                    <Col span="6">检查项目：
                    <Select defaultValue={""} style={{ minWidth: 185, width: "50%" }} onChange={this.selectCheckObject.bind(this)} value={this.state.chooseCheckObject}>
                            {
                                this.state.checkObject.map((item) => {
                                    return <Option value={item.id + ""} key={item.id + ""}>{item.sort}</Option>
                                })
                            }
                        </Select>
                    </Col>
                    <Col span="6">项目名称：<Input onChange={this.SelectChangeName.bind(this)} style={{ width: "50%" }}
                        placeholder="输入关键字搜索"></Input></Col>
                    <Col span="6">所属海事局：
                    <TreeSelect
                            // showSearch
                            style={{ minWidth: 200, width: "50%" }}
                            value={this.state.childrenUnitsChoose}

                            treeNodeFilterProp="title"
                            allowClear
                            treeDefaultExpandedKeys={this.state.ChildUnits.length > 0 ? [Number(this.state.ChildUnits[0].id).toString()] : [this.state.msaId.toString()]}

                            onChange={this.selectChildrenUnits.bind(this)}
                        >
                            <TreeNode title={this.state.msaName} value={this.state.msaId + ""} key={this.state.msaId + ""}>

                                {renderTreeNodes(this.state.ChildUnits)}
                            </TreeNode>
                        </TreeSelect>
                    </Col>
                    <Col span="6" style={{ display: this.state.loadAudit == true ? "block" : "none" }}>督办单位：
                    <TreeSelect
                            showSearch
                            style={{ minWidth: 210, width: "50%" }}
                            value={this.state.unitsChoose}
                            treeNodeFilterProp="title"
                            allowClear
                            treeDefaultExpandedKeys={[Number(this.state.AllUnits[0].id).toString()]}
                            onChange={this.selectUnits.bind(this)}
                        >
                            {renderTreeNodes(this.state.AllUnits)}
                        </TreeSelect>
                    </Col>
                    <Col span="6" style={{ display: this.state.loadAudit == false ? "block" : "none" }}>审核结果：
                    <Select defaultValue={""} style={{ width: "50%" }} onChange={this.selectResults.bind(this)} value={this.state.resultsChoose}>
                            {/* 未通过 2 通过 3 */}
                            <Option value={"2"} key={"2"}>未通过</Option>
                            <Option value={"3"} key={"3"}>通过</Option>
                        </Select>
                    </Col>
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
            </div>
        )

    }
}