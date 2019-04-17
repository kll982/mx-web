// 专项检查
import React from 'react';
import { Link, hashHistory } from 'react-router';
import moment from "moment";
import {
    Pagination,
    Breadcrumb,
    Row,
    Col,
    Input,
    Select,
    Button,
    Tag,
    TreeSelect,
    Table,
    message,
    Spin,
    Icon,
    Modal,
    DatePicker
} from 'antd';
import $jsonp from '../../utils/service.js'
import $jsonp3 from '../../utils/service3.js';
import api from '../../utils/api.js'
import publicstyle from '../../img/public.less'
import companypng from "../../img/company.png"
import departmentpng from "../../img/department.png"
import emppng from "../../img/emp.png"
import styles from "../stastics/taskIndex.less"
import styles1 from "../../components/common.less"
import { rmdir } from 'fs';
import stylez from '../../container/index.less';

let self;
moment.locale('zh-cn');
const Option = Select.Option, confirm = Modal.confirm;

function e2(arr, items, key) {
    if (items.children && items.children.length > 0) {
        items.children.map((itemss, indexss) => {
            if (itemss.id == key) {
                arr.push(itemss);
            }
            e2(arr, itemss, key);
        })
    }
}

function e1(arr, key, departsArr) {
    departsArr.map((item, index) => {
        if (item.id == key) {
            arr.push(item);
        }
        e2(arr, item, key);
    })
}

function e4(arr, items, key) {
    if (items.children && items.children.length > 0) {
        items.children.map((itemss, indexss) => {
            if (itemss.id == key) {
                arr.push(items);
            }
            e4(arr, itemss, key);
        })
    }
}

function findCompanyLoop(arr, items, key, departsArr) {
    if (items.children && items.children.length > 0) {
        items.children.map((itemss, indexss) => {
            if (itemss.id == key) {
                if (itemss.nodeType == 1) {
                    arr.push(itemss);
                }
                else {
                    findCompanyLoop(arr, itemss, key, departsArr);
                }
            }
            findCompanyLoop(arr, itemss, key, departsArr);
        })
    }
}

function findCompany(arr, key, departsArr) {
    departsArr.map((item, index) => {
        arr.push(item);
        if (item.id == key) {

        }
        findCompanyLoop(arr, item, key, departsArr);
    })
}

function fetchNodeType(nodeType, nodeName) {
    var returnDiv = "";
    if (nodeType == 1) {
        returnDiv = <div><img src={companypng} className={styles1.qicon} />{nodeName}</div>
    }
    else if (nodeType == 2) {
        returnDiv = <div><img src={departmentpng} className={styles1.qicon} />{nodeName}</div>
    }
    else if (nodeType == 3) {
        returnDiv = <div><img src={emppng} className={styles1.qicon} />{nodeName}</div>
    }
    return returnDiv
}

const loop = data => data.map((item) => {
    if (item.children && item.children.length) {
        var ptitle = "";
        ptitle = fetchNodeType(item.nodeType, item.name)

        return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id}
            value={item.id.toString()}>{loop(item.children)}</TreeSelect.TreeNode>;
    }
    var ptitle = "";
    ptitle = fetchNodeType(item.nodeType, item.name)
    return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id}
        value={item.id.toString()} />;
});

export default class specialExamination extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            current: 1,
            total: 30,
            templateCode: "",
            allTemplates: [],
            statisticYear: "",
            taskState: "",
            accountname: "",
            mobilename: "",
            name: "",
            departmentId: "",
            departmentCode: "",
            roleId: "",
            jobStatus: "",
            loading: false,
            options1: [],
            role: [],
            department: [],
            jobStatusText: "全部",
            roleIdText: "",
            departmentIdText: [],
            treedata1: [],
            treedata2: [],
            expandForm: false,

            radioObject: [],
            checkNameValue: [],
            radioValue: "=",
            checkName: "",
            startDay: "",
            endDay: "",
            startDayShow: null,
            endDayShow: null
        }
    }


    componentWillMount() {
        this.queryProfitOfCondition();
        this.getCheckObjeckt();
    }

    componentDidMount() {

    }

    reset = () => {
        this.setState({
            checkName: "",
            radioValue: "=",
            startDay: "",
            endDay: "",
            startDayShow: null,
            endDayShow: null
        }, () => self.loadData(1, 10));
    }

    // 检查单名称
    checkName(value) {
        $jsonp3(self, api.listTaskNameFuzzyQuery, {
            checkType: 2,
            name: value,
        }).then((res) => {
            self.setState({
                checkNameValue: res.data.response.list,
            });
        });
    }

    selectCheckName(value) {
        self.setState({
            checkName: value,
        });
    }

    // 检查对象
    getCheckObjeckt() {
        $jsonp3(self, api.listAllCheckSort, {}).then((res) => {
            self.setState({
                radioObject: res.data.response.list,
            });
        });
    }

    // 检查对象
    checkObjeckt(value) {
        self.setState({
            radioValue: value
        })
    }


    //预览
    previewEveryItem(record) {
        hashHistory.push({
            pathname: '/main/SpecialInspectionItems',
            state: {
                taskId: record.id,
                name: record.name,
            }
        })
    }

    //编辑
    edit(record) {
        hashHistory.push({
            pathname: '/main/charts',
            state: {
                top: "edit",
            }
        })
    }

    queryProfitOfCondition = () => {
        self.loadData(1, 10);
    }

    loadData = (page, pageSize) => {
        self.setState({
            loading: true
        });
        var self1 = self;
        let index;
        $jsonp3(self1, api.listChecklistInfo, {
            checklistTitle: this.state.checkName,
            checkSortId: this.state.radioValue.split("=")[0],
            // status: 1,
            startDay: this.state.startDay,
            endDay: this.state.endDay,
            checkType: 2,
            pageNum: page,
        }).then((res) => {
            var result = [];
            var list = res.data.response.list;
            var level = res.data.response.level;
            let index = 1;
            if (list == null || list.length == 0) {
                self.setState({
                    data: result,
                    page: res.data.response.pageInfo,
                    current: res.data.response.pageInfo.pageNum,
                    totalPage: res.data.response.pageInfo.pages,
                    loading: false
                });
                return;
            }
            list.map((item) => {
                let obj = {};
                obj.odrder = (res.data.response.pageInfo.pageNum - 1) * 10 + index++;
                obj.id = item.id;
                obj.name = item.checklistTitle;
                obj.checkType = item.checkType;
                obj.checkTypeName = item.checkType == 1 ? "日常检查" : "专项检查";
                obj.createMsaName = item.createMsaName;
                var pubdate = null;
                if (item.publishTime != null) {
                    var pubtime = new Date(item.publishTime);
                    pubdate = (pubtime.getFullYear()) + "年"
                        + (pubtime.getMonth() + 1) + "月"
                        + (pubtime.getDate()) + "日 "
                        + (pubtime.getHours()) + ":"
                        + (pubtime.getMinutes() < 10 ? "0" + pubtime.getMinutes() : pubtime.getMinutes()) + ":"
                        + (pubtime.getSeconds() < 10 ? "0" + pubtime.getSeconds() : pubtime.getSeconds());
                }

                obj.publishTime = (pubdate == null ? "—" : pubdate);
                obj.department = (item.department == "" ? "—" : item.department);
                obj.startDay = item.startDay;
                obj.endDay = item.endDay;
                obj.checkSortName = item.checkSortName;
                obj.statisticsMsaId = item.createMsaId;
                obj.link = obj.id;
                if (item.startDay == null && item.endDay == null || item.startDay == "" && item.endDay == "") {
                    obj.date = "—";
                } else {
                    obj.date = item.startDay + "至" + item.endDay;
                }
                if (item.status == "1") {
                    obj.status = "已发布"
                } else if (item.status == "2") {
                    obj.status = "待发布"
                } else if (item.status == "3") {
                    obj.status = "已停用"
                }
                // 当前用户为市并且检查单由省级创建
                if (level == "市" && item.checkMsaId == "1") {
                    obj.hidden = true
                } else {
                    obj.hidden = false
                }
                result.push(obj);
            });
            self.setState({
                data: result,
                page: res.data.response.pageInfo,
                current: res.data.response.pageInfo.pageNum,
                totalPage: res.data.response.pageInfo.pages,
                loading: false
            });

        });
    }

    setStartDay(startDayMement, staryDayStr) {
        self.setState({
            startDayShow: startDayMement,
            startDay: staryDayStr
        });
    }

    setEndDay(endDayMement, endDayStr) {
        self.setState({
            endDayShow: endDayMement,
            endDay: endDayStr
        });
    }

    onPageChange = (page, pageSize) => {
        self.loadData(page, pageSize);
    }
    toFirst = () => {
        self.loadData(1, self.state.page.pageSize);
    }
    toLast = () => {
        self.loadData(self.state.page.pages, self.state.page.pageSize);
    }

    renderForm() {
        return (
            <div>
                <Row className={styles.antrow1}>
                    {/*专项检查名称*/}
                    <Col span={5} push={1} style={{ padding: 10 }}>
                        <span style={{ paddingRight: 10 }}>专项检查名称:</span>
                        <Select
                            placeholder="检查名称" showSearch
                            value={this.state.checkName}
                            filterOption={true}
                            onSearch={this.checkName}
                            onChange={this.selectCheckName} allowClear={true} showArrow={false}
                            style={{ width: '50%' }}
                        >
                            {this.state.checkNameValue.map(d => <Option key={d}>{d}</Option>)}
                        </Select>
                    </Col>

                    <Col span={5} style={{ padding: 10, textAlign: "right" }}><span
                        style={{ paddingRight: 10 }}>检查对象:</span>
                        <Select onChange={this.checkObjeckt} value={this.state.radioValue.split("=")[1]}
                            placeholder="检查对象"
                            style={{ width: "50%" }}>
                            {
                                this.state.radioObject.map((item, index) => {
                                    return <Option value={item.id + "=" + item.sort} disabled={item.status == 0}
                                        key={item.id + ""}>{item.sort}</Option>
                                })
                            }
                        </Select>
                    </Col>

                    {/*检查时间*/}
                    <Col span={12} push={1} style={{ padding: "10px 0px", textAlign: 'left' }}>
                        <div style={{ display: "inline-block" }}>
                            <span style={{ paddingRight: 10 }}>发布日期:</span>
                            <DatePicker style={{ width: "200px" }} onChange={this.setStartDay} placeholder={"开始时间"} value={self.state.startDayShow} />
                        </div>

                        <div style={{ display: "inline-block" }}>
                            <span className={styles.bitian}> &nbsp; 至：</span>
                            <DatePicker style={{ width: "200px" }} onChange={this.setEndDay} value={self.state.endDayShow}
                                placeholder={"结束时间"} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={6} push={18} style={{ padding: "10px 0px", textAlign: "right" }}>
                        <Button type="primary" className={publicstyle.button}
                            onClick={this.queryProfitOfCondition.bind(this)}>查询</Button>
                        <Button type="default" className={publicstyle.cancelbutton} style={{ marginLeft: "20px" }}
                            onClick={this.reset}>重置</Button>
                    </Col>
                </Row>
            </div>
        );
    }

    render() {

        const columns = [{
            title: '序号',
            dataIndex: 'odrder',
            className: publicstyle.center
        }, {
            title: '专项检查名称',
            dataIndex: 'name',
            className: publicstyle.center
        }, {
            title: '发布单位',
            dataIndex: 'createMsaName',
            className: publicstyle.center,
        }, {
            title: '发布时间',
            dataIndex: 'publishTime',
            className: publicstyle.center,
        },
        {
            title: '实施单位',
            dataIndex: 'department',
            className: publicstyle.center
        }, {
            title: '检查时间',
            dataIndex: 'date',
            className: publicstyle.center
        },
        {
            title: '检查对象',
            dataIndex: 'checkSortName',
            className: publicstyle.center
        }, {
            title: '操作',
            dataIndex: 'action',
            className: publicstyle.center,
            render: (text, record, index) => {
                return <div className={`${publicstyle.left}`}>
                    <Button type="primary" style={{ margin: 10 }}
                        onClick={this.previewEveryItem.bind(this, record)}>查看</Button>
                    {/*<Button type="primary" style={{margin: 10}}*/}
                    {/*onClick={this.edit.bind(this, record)}>数据统计</Button>*/}
                </div>
            },
        }];
        return (
            <div className={stylez.wrapPadding}>
                <Spin spinning={this.state.loading}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>检查单统计</Breadcrumb.Item>
                        <Breadcrumb.Item>专项检查单统计</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={publicstyle.clearfloat}></div>
                    <h3 style={{ margin: "20px 0px 30px", }}>专项检查单</h3>
                    {this.renderForm()}
                    {/*页码*/}
                    {this.state.data && this.state.page ?
                        <div>
                            <Table columns={columns} dataSource={this.state.data} bordered={true} pagination={false}
                                style={{ textAlign: "center" }} />
                            <div className={styles.pageFlex}>
                                <span className={styles.pageWrap}>
                                    <Button type="primary" className={styles.pageFirst}
                                        style={{ display: this.state.page.pages > 0 ? "block" : "none", float: "left" }}
                                        onClick={this.toFirst.bind(this)}>首页</Button>
                                    <Pagination className={styles.page}
                                        style={{ display: this.state.page.pages > 0 ? "flex" : "none", float: "left" }}
                                        onChange={this.onPageChange.bind(this)} showFISRT
                                        current={this.state.current}
                                        pageSize={this.state.page.pageSize} total={this.state.page.total} />
                                    <Button type="primary" className={styles.pageLast}
                                        style={{ display: this.state.page.pages > 0 ? "block" : "none", float: "left" }}
                                        onClick={this.toLast.bind(this)}>末页</Button>
                                </span>

                            </div>
                        </div> : <div></div>}
                </Spin>


            </div>
        )
    }


}