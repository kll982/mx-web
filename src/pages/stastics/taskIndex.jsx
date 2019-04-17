import React from 'react';
import { Link, hashHistory } from 'react-router';
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
    Modal
} from 'antd';
import Singlepersonselect from '../../components/singlepersonselect1.jsx'

const Option = Select.Option;
import $jsonp from '../../utils/service.js'
import $jsonp3 from '../../utils/service3.js';
import api from '../../utils/api.js'
import publicstyle from '../../img/public.less'
import beard from '../../img/Breadcrumbsymbol.jpg'

import companypng from "../../img/company.png"
import departmentpng from "../../img/department.png"
import emppng from "../../img/emp.png"
import styles from "./taskIndex.less"
import styles1 from "../../components/common.less"
import { rmdir } from 'fs';

let self;
var jobstatusArray = ['全部', '离职', '停职', '在职'];
var jobstatusArr = ['', -1, 0, 1];

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

function e3(arr, key, departsArr) {
    departsArr.map((item, index) => {
        if (item.id == key) {
            arr.push(item);
        }
        e4(arr, item, key);
    })
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
    // isLeaf={item.isLeaf}
});

export default class StatisticTaskmanage extends React.Component {
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

            userInfoz: {},
        }
    }

    componentWillMount() {
        this.fetchTemplate();
        this.getUserMsa();
        this.queryProfitOfCondition();

    }

    componentDidMount() {

    }

    reset = () => {
        this.setState({
            templateCode: "",
            statisticYear: "",
            taskState: "",
        }, () => self.loadData(1, 10));

    }
    getUserMsa() {
        $jsonp3(self, api.phone, {}).then((res) => {
            self.setState({
                userInfoz: res.data.response.statisticListDto
            })
        })
    }

    //获取所有的报表模板
    fetchTemplate() {
        $jsonp3(self, api.getAllTemplates, {}).then((res) => {
            this.setState({
                allTemplates: res.data.response.specialStatisticsTemplates,
            });
        });
    }

    setTemplateCode(value) {
        self.setState({
            templateCode: value
        });
    }

    setStatictisYear(value) {
        self.setState({
            statisticYear: value
        });
    }

    setTaskState(value) {
        self.setState({
            taskState: value
        });
    }

    //新增
    addTask() {

        hashHistory.push({
            pathname: '/main/addStatisticTask',
            state: {
                top: "add",
            }
        })
    }

    //预览
    preview(record) {
        if (record.code == 100) {
            hashHistory.push({
                pathname: '/main/previewDay',
                state: {
                    id: record.id,
                    name: record.name,
                }
            })
        } else if (record.code == 103) {
            hashHistory.push({
                pathname: '/main/previewYear',
                state: {
                    id: record.id,
                    name: record.name,
                }
            })
        }
    }

    //编辑
    edit(record) {
        sessionStorage.setItem("statisticTask", JSON.stringify(record));
        hashHistory.push({
            pathname: '/main/addStatisticTask',
            state: {
                top: "edit",
            }
        })
    }

    //发布
    publish(record) {
        $jsonp3(self, api.publishTask, {
            id: record.id
        }).then((res) => {
            message.info("发布成功");
            self.queryProfitOfCondition();
        });
    }

    //删除
    del(record) {
        $jsonp3(self, api.delNewTask, {
            id: record.id
        }).then((res) => {

            self.queryProfitOfCondition();
        });

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
        $jsonp3(self1, api.queryStatisticTask, {
            pageNum: page,
            templateCode: self.state.templateCode,
            statisticsYear: self.state.statisticYear,
            state: self.state.taskState,
        }).then((res) => {
            var result = [];
            var list = res.data.response.list;
            let index = 1;
            if (list != null) {
                list.map((item) => {
                    let obj = {};
                    obj.odrder = (res.data.response.pageInfo.pageNum - 1) * 10 + index++;
                    obj.id = item.id;
                    obj.createMsaId = item.createMsaId;
                    obj.name = item.statisticsTitle;
                    obj.year = item.statisticsYear;
                    obj.statisticsType = item.statisticsType;
                    obj.startDay = item.startDay;
                    obj.endDay = item.endDay;
                    obj.months = item.months;
                    obj.code = item.templateCode;
                    obj.statisticsMsaId = item.statisticsMsaId;
                    obj.msaName = item.msaName;
                    if (item.statisticsType == "1") {
                        obj.date = item.months.split(',').join("月,") + "月";
                    }
                    else {
                        obj.date = item.startDay + "至" + item.endDay;
                    }
                    obj.state = item.state == "1" ? "已发布" : "待发布";
                    result.push(obj);

                });
            }


            self.setState({
                data: result,
                page: res.data.response.pageInfo,
                current: res.data.response.pageInfo.pageNum,
                totalPage: res.data.response.pageInfo.pages,
                loading: false
            });

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
                    <Col span={6}><span style={{ paddingRight: 10 }}>报表模板:</span>
                        <Select value={this.state.templateCode} style={{ width: "50%" }} defaultValue="100"
                            placeholder="请选择模板" onChange={this.setTemplateCode}>

                            {this.state.allTemplates.map((item, index) => {
                                return <Option value={item.code} key={item.code}>{item.name}</Option>
                            })}
                        </Select>
                    </Col>
                    <Col span={6}><span style={{ paddingRight: 10 }}>报表年份:</span>
                        <Select value={this.state.statisticYear} style={{ width: "50%" }} placeholder="请选择报表年份"
                            onChange={this.setStatictisYear}>
                            <Option value="2018">2018</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2020">2020</Option>
                            <Option value="2021">2021</Option>
                        </Select>
                    </Col>
                    <Col span={6}><span style={{ paddingRight: 10 }}>状态:</span>
                        <Select value={this.state.taskState} style={{ width: "50%" }} placeholder="请选择状态"
                            onChange={this.setTaskState}>
                            <Option value="0">未发布</Option>
                            <Option value="1">已发布</Option>
                        </Select>
                    </Col>

                    <Col span={6}>
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
            key: 'odrder',
            className: publicstyle.center
        }, {
            title: '报表名称',
            dataIndex: 'name',
            key: 'name',
            className: publicstyle.center,
            // render: (record) => {
            //     return  <div className={publicstyle.left}>
            //             <span>{record.name}</span>
            //         </div>
            //
            // }
        },
        {
            title: '发布单位',
            dataIndex: 'msaName',
            key: 'msaName',
            className: publicstyle.center,

        },
        {
            title: '报表年份',
            dataIndex: 'year',
            key: 'year',
            className: publicstyle.center,

        },
        {
            title: '统计日期',
            dataIndex: 'date',
            key: 'date',
            className: publicstyle.center,
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            className: publicstyle.center,
        }, {
            title: '操作',
            key: 'action',
            className: publicstyle.center,
            render: (text, record, index) => {
                if (self.state.userInfoz.msaId == record.createMsaId) {
                    if (record.state == "待发布") {
                        return <div className={`${publicstyle.left}`}>
                            <Button type="primary" style={{ marginRight: 10 }}
                                onClick={this.edit.bind(this, record)}>编辑</Button>
                            <Button type="primary" style={{ marginRight: 10 }}
                                onClick={this.publish.bind(this, record)}>发布</Button>
                            <Button type="primary" style={{ marginRight: 10 }}
                                onClick={this.del.bind(this, record)}>删除</Button>
                        </div>
                    }
                    else if (record.state == "已发布") {
                        return <div className={`${publicstyle.left}`}>
                            <Button type="primary" style={{ marginRight: 10 }}
                                onClick={this.preview.bind(this, record)}>查看</Button>
                            <Button type="primary" style={{ marginRight: 10 }}
                                onClick={this.del.bind(this, record)}>删除</Button>
                        </div>
                    }
                } else {
                    return <div className={`${publicstyle.left}`}>
                        <Button type="primary" style={{ marginRight: 10 }}
                            onClick={this.preview.bind(this, record)}>查看</Button>
                    </div>
                }

            },
        }];

        return (
            <Spin spinning={this.state.loading}>
                {/*<Breadcrumb separator=">">*/}
                {/*<Breadcrumb.Item>专项统计</Breadcrumb.Item>*/}
                {/*<Breadcrumb.Item>报表发布</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}
                {/*<div className={publicstyle.clearfloat}></div>*/}


                <Row className={styles.antrow1}>
                    <Col>
                        <Button type="primary" className={publicstyle.button} onClick={this.addTask.bind(this)}><Icon
                            type="plus" />新增报表</Button>
                    </Col>
                </Row>
                {this.renderForm()}

                {this.state.data && this.state.page ?
                    <div><Table columns={columns} dataSource={this.state.data} bordered={true} pagination={false}
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

        )
    }


}

















