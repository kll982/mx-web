import React from 'react';
import {Link, hashHistory} from 'react-router';
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
import {rmdir} from 'fs';

let self;

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
                } else {
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
        returnDiv = <div><img src={companypng} className={styles1.qicon}/>{nodeName}</div>
    }
    else if (nodeType == 2) {
        returnDiv = <div><img src={departmentpng} className={styles1.qicon}/>{nodeName}</div>
    }
    else if (nodeType == 3) {
        returnDiv = <div><img src={emppng} className={styles1.qicon}/>{nodeName}</div>
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
                                value={item.id.toString()}/>;
    // isLeaf={item.isLeaf}
});

export default class allTable extends React.Component {
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
        }
    }

    componentWillMount() {
        this.fetchTemplate();
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
    see(e) {
        var data = JSON.stringify(e);
        if (e.code == "100") {
            hashHistory.push({
                pathname: '/main/watchDay',
                state: {
                    data: data,
                }
            })
        } else if (e.code == "103") {
            hashHistory.push({
                pathname: '/main/watchYear',
                state: {
                    data: data,
                }
            })
        }
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
            if (list == null) {
                self.setState({
                    data: result,
                    page: res.data.response.pageInfo,
                    current: res.data.response.pageInfo.pageNum,
                    totalPage: res.data.response.pageInfo.pages,
                    loading: false
                });
            }
            list.map((item) => {
                let obj = {};
                // 页码
                obj.odrder = (res.data.response.pageInfo.pageNum - 1) * 10 + index++;
                // taskId
                obj.id = item.id;
                // 报表名称
                obj.name = item.statisticsTitle;
                // 报表时间
                obj.year = item.statisticsYear;
                obj.startDay = item.startDay;
                obj.endDay = item.endDay;
                // 创建类别
                obj.statisticsType = item.statisticsType;
                obj.months = item.months;
                // 报表类别
                obj.code = item.templateCode;
                // 填报单位ID
                obj.statisticsMsaId = item.statisticsMsaId;
                // 创建单位
                obj.createMsaId = item.msaName;
                // 是否上报
                obj.YON = item.specialStatsticsTaskInfoDetails;
                if (item.statisticsType == "1") {
                    obj.date = item.months.split(',').join("月,") + "月";
                }
                else {
                    obj.date = item.startDay + "至" + item.endDay;
                }
                if (item.state == "1") {
                    result.push(obj);
                }

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
    // 页码函数
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
                    <Col offset={8} span={6}><span style={{paddingRight: 10}}>报表模板:</span>
                        <Select value={this.state.templateCode} style={{width: "50%"}} defaultValue="100"
                                placeholder="请选择模板" onChange={this.setTemplateCode}>
                            {this.state.allTemplates.map((item, index) => {
                                return <Option value={item.code} key={item.code}>{item.name}</Option>
                            })}
                        </Select>
                    </Col>
                    <Col span={6}><span style={{paddingRight: 10}}>报表年份:</span>
                        <Select value={this.state.statisticYear} style={{width: "50%"}} placeholder="请选择报表年份"
                                onChange={this.setStatictisYear}>
                            <Option value="2018">2018</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2020">2020</Option>
                            <Option value="2021">2021</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Button type="primary" className={publicstyle.button}
                                onClick={this.queryProfitOfCondition.bind(this)}>查询</Button>
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
            width: "80px",
            className: publicstyle.center
        }, {
            title: '报表名称',
            dataIndex: 'name',
            key: 'name',
            className: publicstyle.center
        },
            {
                title: '发布单位',
                dataIndex: 'createMsaId',
                key: 'msaId',
                // width:"270px",
                className: publicstyle.center,
            },
            {
                title: '报表年份',
                dataIndex: 'year',
                key: 'year',
                width: "100px",
                className: publicstyle.center,
            },
            {
                title: '统计日期',
                dataIndex: 'date',
                key: 'date',
                width: "240px",
                className: publicstyle.center,
            },
            {
                title: '操作',
                key: 'action',
                className: publicstyle.center,
                width: "80px",
                render: (text, record, index) => {
                    return <div className={`${publicstyle.left}`}>
                        <Button type="primary" style={{marginRight: 10}}
                                onClick={this.see.bind(this, record)}>查看</Button>
                    </div>
                },
            }];

        return (
            <Spin spinning={this.state.loading}>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>数据统计</Breadcrumb.Item>
                    <Breadcrumb.Item>统计报表</Breadcrumb.Item>
                </Breadcrumb>
                <div className={publicstyle.clearfloat}></div>
                {/*查询块儿*/}
                {this.renderForm()}
                {/*表格*/}
                {this.state.data && this.state.page ?
                    <div>
                        <Table columns={columns} dataSource={this.state.data} bordered={true} pagination={false}
                               style={{textAlign: "center"}}/>

                        {/*页码*/}
                        <div className={styles.pageFlex}>
                            <span className={styles.pageWrap}>
                                <Button type="primary" className={styles.pageFirst}
                                        style={{display: this.state.page.pages > 0 ? "block" : "none", float: "left"}}
                                        onClick={this.toFirst.bind(this)}>首页</Button>
                            <Pagination className={styles.page}
                                        style={{display: this.state.page.pages > 0 ? "flex" : "none", float: "left"}}
                                        onChange={this.onPageChange.bind(this)} showFISRT
                                        current={this.state.current}
                                        pageSize={this.state.page.pageSize} total={this.state.page.total}/>
                            <Button type="primary" className={styles.pageLast}
                                    style={{display: this.state.page.pages > 0 ? "block" : "none", float: "left"}}
                                    onClick={this.toLast.bind(this)}>末页</Button>
                            </span>

                        </div>
                    </div> : <div></div>}

            </Spin>

        )
    }


}

















