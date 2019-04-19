// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Button, Table, Pagination, Modal, DatePicker, Input, Tag, message } from "antd";
import moment from "moment";

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
moment.locale('zh-cn');

let self, propsData = {}, { RangePicker } = DatePicker,confirm = Modal.confirm;

var level = localStorage.getItem('level');

export default class AddMangerment extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            level,
        }
    }
    // 挂载前
    componentWillMount() {
        propsData = this.props.location.state;
        console.log(propsData);
        // var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.setState({
            propsData: propsData,
            // userInfo: userInfo,
        }, () => {
            this.getData(1)
        })
    }
    // 挂载后
    componentDidMount() {

    }
    getData(page) {
        // createSpTaskPage
        $jsonp3(self, api.createSpTaskPage, {
            sortId: this.state.propsData.sortId,
            checkType: 1,
            pageNum: page,
        }).then(res => {
            var r = res.data.response;
            let arr = [];
            r.list = !!r.list ? r.list : [];
            r.list.map((item, index) => {
                var li = {};
                li.index = (page - 1) * 10 + index + 1;
                li.taskId = item.id;
                li.name = item.name;
                li.sortId = item.sortId;
                li.createTime = this.getDay(item.createTime);
                li.createBy = item.createBy;
                li.createMsaId = item.createMsaId;
                li.createMsaName = item.createMsaName;
                li.startDay = item.startDay;
                li.endDay = item.endDay;
                li.timeRange = item.startDay.split(" ")[0] + "~" + item.endDay.split(" ")[0];
                li.noteType = item.noteType;
                li.checkType = item.checkType;
                li.status = item.status;
                // 1 正在进行 2 未开始 3 已结束 4 停用
                li.isFinishName = item.isFinish == 1 ? "正在进行" : item.isFinish == 2 ? "未开始" : item.isFinish == 3 ? "已结束" : item.isFinish == 4 ? "停用" : "";
                li.isFinishColor = item.isFinish == 1 ? "green" : item.isFinish == 2 ? "blue" : item.isFinish == 3 ? "" : item.isFinish == 4 ? "red" : "";

                li.isFinish = item.isFinish;

                arr.push(li);
            })
            this.setState({
                tableData: arr,
                page: r.pageInfo,
                tableColumns: [{
                    title: "编号",
                    dataIndex: "index",
                    key: "index",
                    className: publicstyle.center,
                }, {
                    title: "专项检查名称",
                    dataIndex: "name",
                    key: "name",
                    className: publicstyle.center,
                }, {
                    title: "开展时间",
                    dataIndex: "timeRange",
                    key: "timeRange",
                    className: publicstyle.center,
                }, {
                    title: "发布单位",
                    dataIndex: "createMsaName",
                    key: "createMsaName",
                    className: publicstyle.center,
                }, {
                    title: "状态",
                    dataIndex: "isFinish",
                    key: "isFinish",
                    className: publicstyle.center,
                    render: (text, r) => {
                        return <Tag color={r.isFinishColor}>{r.isFinishName}</Tag>
                    }
                }, {
                    title: "操作",
                    dataIndex: "action",
                    key: "action",
                    className: publicstyle.center,
                    render: (text, r) => {

                        if (r.isFinish == 1) {
                            return <Button type="danger" onClick={()=>{
                                confirm({
                                    title: '终止'+r.name,
                                    content: '确定终止该检查单吗',
                                    onOk() {
                                        $jsonppost(self,api.blockSpTask,{
                                            taskId:r.taskId 
                                        }).then(y=>{
                                            if(y.code == 200){
                                                message.success("已停用")
                                                self.getData(self.state.page.pages);
                                            }
                                        })
                                    },
                                    onCancel() {},
                                  });

                                
                            }}>终止</Button>
                        } else if (r.isFinish == 2) {
                            return <Button type="danger" onClick={()=>{
                                confirm({
                                    title: '删除'+r.name,
                                    content: '确定删除该检查单吗',
                                    onOk() {
                                        $jsonppost(self,api.removeSpTask,{
                                            taskId:r.taskId,
                                        }).then(y=>{
                                            if(y.code == 200){
                                                message.success("已删除")
                                                self.getData(self.state.page.pages);
                                            }
                                        })
                                    },
                                    onCancel() {},
                                  });
                                
                            }}>删除</Button>
                        }

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
    back() {
        hashHistory.push({
            pathname: "/main/projectItem",
            state: {
                pageNum: self.state.propsData.pageNum,
            }
        })
    }
    toFirst() {
        this.getData(1);
    }
    onPageChange(page) {
        self.getData(page);
    }
    toLast() {
        this.getData(this.state.page.pages);
    }
    add = () => {
        if (!!!this.state.specialName) {
            return message.error("请输入隐患排查名称")
        }
        if (!!!this.state.startTime || !!!this.state.endTime || !!!this.state.startDay || !!!this.state.endDay) {
            return message.error("请选择检查时间")
        }
        $jsonppost(self, api.createSpTask, {
            name: this.state.specialName,
            startDay: this.state.startDay + " 00:00:00",
            endDay: this.state.endDay + " 23:59:59",
            sortId: this.state.propsData.sortId,
            checkType: 1,
        }).then(res => {
            if (res.code == 200) {
                message.success("创建成功");
                this.setState({
                    Cv: false
                }, () => {
                    self.getData(self.state.page.pages);
                })
            }
        })
    }
    noAdd = () => {
        this.setState({
            Cv: false
        })
    }
    // 渲染
    render() {
        return (
            <div className={stylez.wrapPadding} style={{ padding: "0px", background: "#f4f4f4" }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", background: "white", padding: "15px" }}>
                    <Breadcrumb.Item>检查项目管理</Breadcrumb.Item>
                    <Breadcrumb.Item>专项检查</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloatTop}></div>
                <div className={MaritimeAffairs.cardWrap}>
                    <div className={MaritimeAffairs.cardTitle}>{this.state.propsData.checkName}</div>
                    <Button type="primary" ghost onClick={() => {
                        this.setState({
                            Cv: true,
                            specialName:"",
                            startTime: null,
                            endTime: null,
                            startDay: null,
                            endDay: null,
                        })
                    }}>开展日常专项检查</Button>
                    {this.state.tableData ?
                        <div style={{ overflow: "hidden", marginTop: 40 }}>
                            <Table className={MaritimeAffairs.Table} rowKey={record => record.id} columns={this.state.tableColumns} dataSource={this.state.tableData} pagination={false}>
                            </Table>
                            <div className={styles.pageFlex}>
                                <span className={styles.pageWrap}>
                                    <Button type="primary" className={styles.pageFirst}
                                        style={{ display: this.state.page.pages > 0 ? "block" : "none", float: "left" }}
                                        onClick={this.toFirst.bind(this)}>首页</Button>
                                    <Pagination className={styles.page} style={{ display: this.state.page.pages > 0 ? "flex" : "none", float: "left" }} onChange={this.onPageChange.bind(this)} showFISRT current={this.state.page.pageNum} pageSize={this.state.page.pageSize} total={this.state.page.total} />
                                    <Button type="primary" className={styles.pageLast}
                                        style={{ display: this.state.page.pages > 0 ? "block" : "none", float: "left" }}
                                        onClick={this.toLast.bind(this)}>末页</Button>
                                </span>
                            </div>
                        </div>
                        : ""}
                </div>
                <Modal visible={this.state.Cv} title="开展日常专项检查"
                    onOk={this.add}
                    onCancel={this.noAdd}
                    okText="确认"
                    cancelText="取消"
                    className={MaritimeAffairs.Model}>
                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>隐患排查名称：</dt>
                        <dd><Input placeholder={"请输入隐患排查名称"} value={this.state.specialName} onInput={
                            (e) => this.setState({
                                specialName: e.target.value,
                            })} /></dd>
                    </dl>
                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>隐患排查时间：</dt>
                        <dd>
                            <RangePicker format="YYYY-MM-DD" value={[this.state.startTime, this.state.endTime]} onChange={(date, dateString) => {
                                this.setState({
                                    startTime: moment(date[0], "YYYY-MM-DD"),
                                    startDay: dateString[0],
                                    endTime: moment(date[1], "YYYY-MM-DD"),
                                    endDay: dateString[1],
                                })
                            }} />
                        </dd>
                    </dl>
                </Modal>
            </div>
        )

    }
}