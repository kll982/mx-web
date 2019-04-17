// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Button, Row, Col, Select, Table, Pagination, Tag, Modal, Input, message } from "antd";

import publicstyle from "../../img/public.less";
import styles from "../stastics/taskIndex.less";
import styles2 from "../admin/index.less";
import stylez from '../../container/index.less';

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";

let self;
const Option = Select.Option, confirm = Modal.confirm;
export default class management extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            type: [{
                type: "日",
                value: 1,
            }, {
                type: "月",
                value: 2,
            }, {
                type: "季度",
                value: 3,
            }, {
                type: "半年",
                value: 4,
            }, {
                type: "年",
                value: 5,
            }],
            rank: [{
                title: "市级填报",
                value: 1,
            }, {
                title: "区县级填报",
                value: 2,
            }],
            status: [{
                id: "0",
                name: "待发布"
            }, {
                id: "1",
                name: "已发布"
            }, {
                id: "2",
                name: "停用"
            }],
            filterName: [],
            chooseType: "",
            chooseRank: "",
            chooseStatus: "",
        }
    }
    // 挂载前
    componentWillMount() {
        this.condition(1)
    }
    // 挂载后
    componentDidMount() {

    }

    // 报表名称
    SelectChangeName(e) {
        this.setState({
            chooseFilterName: e.target.value,
        }, () => {
            this.condition(1)
        })
    }
    // 统计类型
    SelectChangeType(value) {
        this.setState({
            chooseType: value,
        })
    }
    // 填报级别
    SelectChangeRank(value) {
        this.setState({
            chooseRank: value,
        })
    }
    // 报表状态
    SelectChangeStatus(value) {
        this.setState({
            chooseStatus: value,
        })
    }




    // 查询
    condition1() {
        this.condition(1);
    }
    condition(pageNum) {
        $jsonp3(self, api.listTaskBasicInfoByCondition, {
            name: this.state.chooseFilterName,
            statisticsType: this.state.chooseType,
            fillInLevel: this.state.chooseRank,
            status: this.state.chooseStatus,
            pageNum: pageNum,
        }).then(res => {
            var list = res.data.response.list;
            var pageInfo = res.data.response.pageInfo;
            var tableData = [];
            if (list != null) {
                list.map((item, index) => {
                    var obj = {};
                    obj.index = (pageNum - 1) * 10 + (index + 1);
                    obj.taskId = item.taskId;
                    obj.name = item.checkNames;
                    obj.createMsaId = item.createMsaName;
                    obj.publishTime = item.publishTime;
                    obj.rank = item.statisticsType;
                    obj.updateTime = item.checkTime;
                    obj.writeLevel = item.fillInLevel;
                    obj.tags = item.status;
                    // 0:未发布 1:已发布 2:停用 3:删除
                    obj.tagsName = item.status == 0 ? "待发布" : item.status == 1 ? "已发布" : item.status == 2 ? "停　用" : "其　他";
                    tableData.push(obj);
                })
            }
            this.setState({
                tableData: tableData,
                page: pageInfo,
            })
        })

    }
    // 重置
    reset() {
        new Promise(function (res, err) {
            this.setState({
                chooseType: "",
                chooseRank: "",
                chooseStatus: "",
                chooseFilterName: "",
            })
            res(true)
        }).then((data) => {
            if (data) {
                this.condition1();
            }
        })

    }

    // 查看
    watch(record) {
        hashHistory.push({
            pathname: '/main/watchManagement',
            state: {
                taskId: record.taskId,
            }
        })
    }

    // 编辑
    edit(record) {
        hashHistory.push({
            pathname: '/main/addManagement',
            state: {
                add: false,
                taskId: record.taskId,
            }
        })
    }

    // 发布
    publish(record) {
        confirm({
            title: '发布',
            content: '一旦发布，统计报表将会下发到指定填报单位，确认发布？',
            onOk() {
                $jsonp3(self, api.reportPublishTask, {
                    taskId: record.taskId
                }).then(res => {
                    if (res.code == 200 && res.message == "ok") {
                        self.condition1();
                        return message.success("发布成功");
                    } else {
                        return message.error("发布失败");
                    }
                })

            },
            onCancel() {
            },
        });
    }

    // 删除
    del(record) {
        confirm({
            title: '删除',
            content: '一旦删除，报表及所有相关数据将会消失，确认删除？',
            onOk() {
                $jsonp3(self, api.deleteTaskById, {
                    taskId: record.taskId
                }).then(res => {
                    if (res.code == 200 && res.message == "ok") {
                        self.condition1();
                        return message.success("删除成功");
                    } else {
                        return message.error("删除失败");
                    }
                })
            },
            onCancel() {
            },
        })
    }

    // 停用
    stop(record) {
        confirm({
            title: '停用',
            content: '一旦停用，报表任务将会中断，确认停用？',
            onOk() {
                $jsonp3(self, api.stopTaskById, {
                    taskId: record.taskId
                }).then(res => {
                    if (res.code == 200 && res.message == "ok") {
                        self.condition1();
                        return message.success("已停用");
                    } else {
                        return message.error("停用失败");
                    }
                })
            },
            onCancel() {
            },
        })
    }

    // 新增
    addReport() {
        hashHistory.push({
            pathname: '/main/addManagement',
            state: {
                add: true,
            }
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

    back() {
        window.history.back();
    }
    // 渲染
    render() {
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            className: publicstyle.center
        }, {
            title: '报表名称',
            dataIndex: 'name',
            className: publicstyle.center
        },
        {
            title: '发布单位',
            dataIndex: 'createMsaId',
            className: publicstyle.center,
        },
        {
            title: '发布时间',
            dataIndex: 'publishTime',
            className: publicstyle.center,
        },
        {
            title: '报表类型',
            dataIndex: 'rank',
            className: publicstyle.center,
        },
        {
            title: '统计时间',
            dataIndex: 'updateTime',
            className: publicstyle.center,
        },
        {
            title: '填报级别',
            dataIndex: 'writeLevel',
            className: publicstyle.center,
        },
        {
            title: '状态',
            dataIndex: 'tags',
            className: publicstyle.center,
            render: (text, record, index) => {
                // 0:未发布 1:已发布 2:停用 3:删除
                if (record.tags == 0) {
                    return <Tag color="orange">{record.tagsName}</Tag>
                } else if (record.tags == 1) {
                    return <Tag color="blue">{record.tagsName}</Tag>
                } else if (record.tags == 2) {
                    return <Tag>{record.tagsName}</Tag>
                }

            },
        },
        {
            title: '操作',
            key: 'action',
            className: publicstyle.center,
            render: (text, record, index) => {
                // 0:未发布 1:已发布 2:停用 3:删除
                if (record.tags == 0) {
                    return <div className={`${publicstyle.left}`}>
                        <Button type="primary" style={{ margin: "0px 10px 10px 0px" }}
                            onClick={this.watch.bind(this, record)}>查看</Button>
                        <Button type="primary" style={{ margin: "0px 10px 10px 0px" }}
                            onClick={this.edit.bind(this, record)}>编辑</Button>
                        <Button type="primary" style={{ margin: "0px 10px 10px 0px" }}
                            onClick={this.publish.bind(this, record)}>发布</Button>
                        <Button type="danger" ghost style={{ margin: "0px 10px 10px 0px" }}
                            onClick={this.del.bind(this, record)}>删除</Button>
                    </div>
                } else if (record.tags == 1) {
                    return <div className={`${publicstyle.left}`}>
                        <Button type="primary" style={{ margin: "0px 10px 10px 0px" }}
                            onClick={this.watch.bind(this, record)}>查看</Button>
                        <Button style={{ margin: "0px 10px 10px 0px", border: "1px solid rgb(234,234,234)", background: "rgb(255,255,255)", padding: "2px 15px", borderRadius: "4px" }}
                            onClick={this.stop.bind(this, record)}>停用</Button>
                        <Button type="danger" ghost style={{ margin: "0px 10px 10px 0px" }}
                            onClick={this.del.bind(this, record)}>删除</Button>
                    </div>
                } else if (record.tags == 2) {
                    return <div className={`${publicstyle.left}`}>
                        <Button type="primary" style={{ margin: "0px 10px 10px 0px" }}
                            onClick={this.watch.bind(this, record)}>查看</Button>
                        <Button type="danger" ghost style={{ margin: "0px 10px 10px 0px" }}
                            onClick={this.del.bind(this, record)}>删除</Button>
                    </div>
                }

            },
        }];

        return (
            <div className={stylez.wrapPadding}>
                <Breadcrumb separator=">" style={{ textAlign: "left" }}>
                    <Breadcrumb.Item>统计报表</Breadcrumb.Item>
                    <Breadcrumb.Item>报表管理</Breadcrumb.Item>
                </Breadcrumb>
                <div className={publicstyle.clearfloat}></div>

                <Button className={publicstyle.button} style={{ margin: " 20px 20px 20px 0px" }} icon="plus" type="primary" onClick={this.addReport.bind(this)}>新增报表</Button>
                <Row>
                    <div>
                        <Col span={6}>
                            报表名称：
                            <Input onChange={this.SelectChangeName.bind(this)} style={{ width: "50%" }}
                                placeholder="输入关键字搜索"></Input>
                        </Col>
                        <Col span={6}>
                            统计类型：
                    <Select defaultValue={""} style={{ width: "50%" }} onChange={this.SelectChangeType.bind(this)} value={this.state.chooseType}>
                                <Option value={""} key={""}>所有</Option>
                                {
                                    this.state.type.map((item) => {
                                        return <Option value={item.value + ""} key={item.value + ""}>按{item.type}统计</Option>
                                    })
                                }
                            </Select>
                        </Col>
                        <Col span={6}>
                            填报级别：
                    <Select defaultValue={""} style={{ width: "50%" }} onChange={this.SelectChangeRank.bind(this)} value={this.state.chooseRank}>
                                <Option value={""} key={""}>所有</Option>
                                {
                                    this.state.rank.map((item) => {
                                        return <Option value={item.value + ""} key={item.value + ""}>{item.title}</Option>
                                    })
                                }
                            </Select>
                        </Col>
                        <Col span={6}>
                            报表状态：
                    <Select defaultValue={""} style={{ width: "50%" }} onChange={this.SelectChangeStatus.bind(this)} value={this.state.chooseStatus}>
                                <Option value={""} key={""}>所有</Option>
                                {
                                    this.state.status.map((item) => {
                                        return <Option value={item.id + ""} key={item.id + ""}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Col>
                    </div>

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
            </div >
        )
    }

}
