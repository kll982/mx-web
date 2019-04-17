// 检查单管理
import React from 'react';
import { hashHistory } from 'react-router';
import moment from "moment";
import {
    Button,
    Col,
    DatePicker,
    Icon,
    Modal,
    Pagination,
    Radio,
    Row,
    Select,
    Spin,
    Table,
    TreeSelect,
    Tag,
} from 'antd';
import 'moment/locale/zh-cn';
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
const Option = Select.Option, confirm = Modal.confirm, RadioGroup = Radio.Group;

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
            value: [],
            checkNameValue: [],
            taskState: null,
            checkName: null,
            startDay: "",
            endDay: "",
            radioValue: "=",
            startDayShow: null,
            endDayShow: null
        }
    }

    componentWillMount() {
        this.queryProfitOfCondition();
        // 获取所有的检查对象
        this.getCheckObjeckt();
    }

    // 重置
    reset = () => {
        self.setState({
            checkName: "",
            taskState: null,
            radioValue: "=",
            startDay: "",
            endDay: "",
            checkNameValue: [],
            startDayShow: null,
            endDayShow: null
        }, () => self.loadData(1, 10));

    }

    // 检查单名称
    checkName(value) {
        $jsonp3(self, api.listTaskNameFuzzyQuery, {
            checkType: 1,
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

    // 获取所有的检查对象
    getCheckObjeckt() {
        $jsonp3(self, api.listAllCheckSort, {}).then((res) => {
            this.setState({
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

    // 状态
    setTaskState(value) {
        self.setState({
            taskState: value
        });
    }

    //新增
    addTask() {
        hashHistory.push({
            pathname: '/main/addChecklist',
            state: {
                top: "add",
            }
        })
    }

    //预览
    preview(record) {
        hashHistory.push({
            pathname: '/main/Mobilephone',
            state: {
                taskId: record.id,
                // 专项检查名称
                name: record.name,
                // 发布单位
                createMsa: record.createMsaName,
                // 发布时间
                publishTime: record.publishTime,
                // 实施单位
                department: record.department,
                // 检查时间
                date: record.date,
                // 检查对象
                checkName: record.checkSortName,
                // 检查单类型
                checkSortId: record.checkSortId,
                // 状态
                statusNumber: record.statusNumber, // 5 覆盖
                checkType: record.checkType,


            }
        })
    }

    //编辑
    edit(record) {
        hashHistory.push({
            pathname: '/main/addCheckList',
            state: {
                top: "edit",
                taskId: record.id,
            }
        })
    }

    //发布
    publish(record) {
        if (record.checkType == 2) {
            // 专项检查
            confirm({
                title: '发布',
                content: '发布后专项检查单将会同步到检查人员APP上，确认发布？',
                onOk() {
                    return $jsonp3(self, api.checklistPublishTask, {
                        taskId: record.id
                    }).then((res) => {
                        self.queryProfitOfCondition();
                    });
                },
                onCancel() {
                },
            });
        } else if (record.checkType == 1) {
            // 日常检查
            confirm({
                title: '发布',
                content: '发布后，原有的检查单会被停用，确认发布？',
                onOk() {
                    return $jsonp3(self, api.checklistPublishTask, {
                        taskId: record.id
                    }).then((res) => {
                        self.queryProfitOfCondition();
                    });
                },
                onCancel() {
                },
            });
        }
    }

    // 日常检查复用
    multiplexing(record) {
        // 提示框
        confirm({
            title: '复用',
            content: '复用后，现有的检查单会被停用，确认复用？',
            onOk() {
                return $jsonp3(self, api.reuseChecklistByTaskId, {
                    taskId: record.id
                }).then((res) => {
                    self.queryProfitOfCondition();
                });
            },
            onCancel() {
            },
        });
    }

    //删除
    del(record) {
        confirm({
            title: '删除',
            content: '删除后所有记录将消失，确认删除？',
            okType: 'danger',
            onOk() {
                return $jsonp3(self, api.removeChecklistByTaskId, {
                    taskId: record.id
                }).then((res) => {
                    self.queryProfitOfCondition();
                });
            },
            onCancel() {
            },
        });
    }

    // 下载检查表
    dowload(record) {
        $jsonp3(self, api.getTaskInfoById, {
            taskId: record.id
        }).then((res) => {
            var url = res.data.response.checklistDto.checklistTask.excelUrl;
            var a = document.createElement('a');//页面上创建一个标签
            a.setAttribute('href', url);//设置a 标签的href，
            a.setAttribute('download', "模板文件");//设置a 标签的download 属性，并限定下载文件名。
            a.setAttribute('target', "_blank");
            a.click();//出发a点击事件，下载文件
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
            status: this.state.taskState,
            startDay: this.state.startDay,
            endDay: this.state.endDay,
            checkType: null,
            pageNum: page,
        }).then((res) => {
            var result = [];
            var list = res.data.response.list;
            var level = res.data.response.level;
            let index = 1;
            if (list == null) {
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
                obj.checkSortId = item.checkSortId;//检查对象
                obj.checkSortName = item.checkSortName;
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

                obj.publishTime = pubdate;

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
                obj.statusNumber = item.status;
                if (item.status == "1") {
                    obj.status = "已发布"
                } else if (item.status == "2") {
                    obj.status = "待发布"
                } else if (item.status == "3") {
                    obj.status = "已停用"
                } else if (item.status == "5") {
                    obj.status = "已覆盖"
                }
                // 当前用户为市并且检查单由省级创建
                if (level == "市" && item.createMsaId == "1") {
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

                    <Col span={6} push={1} style={{ margin: "10px 0px" }}>
                        <span style={{ paddingRight: 10 }}>检查名称:</span>
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

                    <Col span={6} style={{ margin: "10px 0px", textAlign: "center" }}>
                        <span style={{ paddingRight: 10 }}>状态:</span>
                        <Select value={this.state.taskState} style={{ width: "50%" }} placeholder="请选择状态"
                            onChange={this.setTaskState}>
                            <Option value="1">已发布</Option>
                            <Option value="2">未发布</Option>
                            <Option value="3">停用</Option>
                        </Select>
                    </Col>

                    <Col span={6} style={{ margin: "10px 0px", textAlign: "right" }}>
                        <span style={{ paddingRight: 10 }}>检查对象:</span>
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

                    <Col span={18} push={1} style={{ margin: "10px 0px", textAlign: "left" }}>
                        <div style={{ display: "inline-block" }}>
                            <span style={{ paddingRight: 10 }}>发布时间:</span>
                            <DatePicker style={{ width: "270px" }} onChange={this.setStartDay}
                                placeholder={"开始时间"} value={self.state.startDayShow} />
                        </div>

                        <div style={{ display: "inline-block" }}>
                            <span className={styles.bitian}> &nbsp; 至：</span>
                            <DatePicker style={{ width: "270px" }} onChange={this.setEndDay} value={self.state.endDayShow}
                                placeholder={"结束时间"} />
                        </div>
                    </Col>

                    <Col span={5} style={{ margin: "10px 0px", textAlign: "right" }}>
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
            title: '检查名称',
            dataIndex: 'name',
            className: publicstyle.center
        }, {
            title: '检查类型',
            dataIndex: 'checkTypeName',
            className: publicstyle.center
        },
        {
            title: '发布单位',
            dataIndex: 'createMsaName',
            className: publicstyle.center
        }, {
            title: '发布时间',
            dataIndex: 'publishTime',
            className: publicstyle.center
        }, {
            title: '实施单位',
            dataIndex: 'department',
            className: publicstyle.center
        }, {
            title: '检查时间',
            dataIndex: 'date',
            className: publicstyle.center,
        }, {
            title: '检查对象',
            dataIndex: 'checkSortName',
            className: publicstyle.center,
        },
        {
            title: '状态',
            // dataIndex: 'status',
            className: publicstyle.center,
            render: (text, record, index) => {
                if (record.status == "待发布") {
                    return (
                        <span>
                            <Tag color="orange">待发布</Tag>
                        </span>
                    )

                } else if (record.status == "已发布") {
                    return (
                        <span>
                            <Tag color="blue">已发布</Tag>
                        </span>
                    )
                } else if (record.status == "已停用") {
                    return (
                        <span>
                            <Tag>已停用</Tag>
                        </span>
                    )
                } else if (record.status == "已覆盖") {
                    return (
                        <span>
                            <Tag>已覆盖</Tag>
                        </span>
                    )
                }
            }
        },
        {
            title: '操作',
            key: 'action',
            className: publicstyle.center,
            render: (text, record, index) => {
                if (record.status == "待发布") {
                    return <div className={`${publicstyle.left} ${publicstyle.relative}`}>
                        <Button type="primary" style={{ margin: 10, display: "inline-block" }}
                            onClick={this.preview.bind(this, record)}>查看</Button>
                        <Button type="primary"
                            style={{ margin: 10, display: (record.hidden) ? "none" : "inline-block" }}
                            onClick={this.edit.bind(this, record)}>编辑</Button>
                        <Button type="primary"
                            style={{ margin: 10, display: (record.hidden) ? "none" : "inline-block" }}
                            onClick={this.publish.bind(this, record)}>发布</Button>

                        <Button type="danger" ghost
                            style={{ margin: 10, display: (record.hidden) ? "none" : "inline-block" }}
                            onClick={this.del.bind(this, record)}>删除</Button>
                        <Button className={`${publicstyle.absolute} ${publicstyle.dowload}`}
                            shape="circle" icon="download" onClick={this.dowload.bind(this, record)}></Button>
                    </div>
                }
                else if (record.status == "已发布") {
                    return <div className={`${publicstyle.left} ${publicstyle.relative}`}>
                        <Button type="primary" style={{ margin: 10, display: "inline-block" }}
                            onClick={this.preview.bind(this, record)}>查看</Button>
                        <Button className={`${publicstyle.absolute} ${publicstyle.dowload}`}
                            shape="circle" icon="download" onClick={this.dowload.bind(this, record)}></Button>
                        <Button type="danger" ghost
                            style={{
                                margin: 10,
                                display: record.hidden || record.checkType == 1 ? "none" : "inline-block"
                            }}
                            onClick={this.del.bind(this, record)}>删除</Button>
                    </div>
                }
                else if (record.status == "已停用") {
                    return <div className={`${publicstyle.left} ${publicstyle.relative}`}>
                        <Button type="primary" style={{ margin: 10, display: "inline-block" }}
                            onClick={this.preview.bind(this, record)}>查看</Button>
                        <Button type="primary" ghost style={{
                            margin: 10,
                            display: record.hidden ? "none" : "inline-block"
                        }} onClick={this.multiplexing.bind(this, record)}>复用</Button>
                        <Button className={`${publicstyle.absolute} ${publicstyle.dowload}`}
                            shape="circle" icon="download" onClick={this.dowload.bind(this, record)}></Button>
                    </div>
                }
                else if (record.status == "已覆盖") {
                    return <div className={`${publicstyle.left} ${publicstyle.relative}`}>
                        <Button type="primary" style={{ margin: 10, display: "inline-block" }}
                            onClick={this.preview.bind(this, record)}>查看</Button>
                        <Button className={`${publicstyle.absolute} ${publicstyle.dowload}`}
                            shape="circle" icon="download" onClick={this.dowload.bind(this, record)}></Button>
                    </div>
                }


            },
        }];

        return (
            <div className={stylez.wrapPadding}>
                <Spin spinning={this.state.loading}>
                    {/*<Breadcrumb separator=">">*/}
                    {/*<Breadcrumb.Item>专项统计</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>检查单管理</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    {/*<div className={publicstyle.clearfloat}></div>*/}

                    <Row className={styles.antrow1}>
                        <Col>
                            <Button type="primary" className={publicstyle.button} onClick={this.addTask.bind(this)}>
                                <Icon type="plus" />
                                更新/新增检查
                        </Button>
                        </Col>
                    </Row>
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
                        </div> : ""
                    }
                </Spin>
            </div>
        )
    }


}