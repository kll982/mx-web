// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Button, Table, Tag, Pagination, Modal, Input, Select, TreeSelect, Progress, message, DatePicker, Icon } from "antd";
import ReactDOM from 'react-dom';
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
import $FormData from "../../utils/formData";
import api from "../../utils/api";

import downIcon from "../../img/downIcon.png";
import see from "../../img/see.png";

moment.locale('zh-cn');

let self, propsData = {};
const Option = Select.Option, TreeNode = TreeSelect.TreeNode, { RangePicker } = DatePicker, confirm = Modal.confirm;

export default class PubilcSpecial extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            AllCheckSort: [],
            departments: [],
        }
    }
    // 挂载前
    componentWillMount() {

        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.setState({
            userInfo: userInfo,
        })
        propsData = this.props.location.state;
        let page = !!propsData ? propsData.pageNum : 1;
        this.getTableData(page);
        this.getAllShort();
        this.fetchMsaInfos();
    }
    // 挂载后
    componentDidMount() {

    }
    // 检查单位
    fetchMsaInfos(templateCode1) {
        $jsonp3(self, api.listDepartmentByUser, {
            // type: "all"
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
    // 选择所属海事局单位
    selectChildrenUnits(value) {
        this.setState({
            childrenUnitsChoose: value,
            childrenUnitsChoose1: value
        })
    }
    getTableData(page) {
        $jsonp3(self, api.publishSpTaskPage, {
            pageNum: page
        }).then(res => {
            let TableDatas = res.data.response;
            var arr = [];
            TableDatas.list.map((item, index) => {
                var li = {};
                li.index = (page - 1) * 10 + index + 1;

                li.taskId = item.id;
                li.checklistTitle = item.checklistTitle;
                li.sortName = item.sortName;
                li.checkSortId = item.checkSortId;

                li.isLevel = item.isLevel;
                li.isLevelName = item.isLevel == 1 ? "是" : "否";
                li.msaName = item.msaName;
                li.isUse = item.isUse;
                li.createTime = this.getDay(item.createTime);
                li.checkSortId = item.checkSortId;
                li.statusCode = item.status;
                li.statusValue = item.status == 1 ? "已发布" : item.status == 2 ? "待发布" : item.status == 3 ? "已停用" : item.status == 4 ? "已删除" : "";
                li.statusColor = item.status == 1 ? "green" : item.status == 2 ? "blue" : item.status == 3 ? "" : item.status == 4 ? "" : "";

                li.startDay = item.startDay;
                li.endDay = item.endDay;
                li.timeFrame = item.startDay.split(" ")[0] + "~" + item.endDay.split(" ")[0];
                li.checkMsaId = item.checkMsaId.split(",");

                li.excelUrl = item.excelUrl;
                li.department = !!item.department ? item.department : "--";

                li.publishTime = !!item.publishTime ? this.getDay(item.publishTime) : "--";
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
                    title: "检查项目",
                    dataIndex: "sortName",
                    key: "sortName",
                    className: publicstyle.center,
                }, {
                    title: "专项检查名称",
                    dataIndex: "checklistTitle",
                    key: "checklistTitle",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <div>
                            {record.checklistTitle}
                            &emsp;<img style={{ display: !!record.checklistTitle ? "inline-block" : "none", verticalAlign: "middle", cursor: "pointer", width: "16px" }} src={see} onClick={() => {
                                hashHistory.push({
                                    pathname: "/main/Mobilephone",
                                    state: {
                                        taskId: record.taskId,
                                        seePath: "pubilcSpecial",
                                        pageNum: this.state.page.pageNum,
                                    }
                                })
                            }} type="info-circle" />
                        </div>
                    }
                }, {
                    title: "发布时间",
                    dataIndex: "publishTime",
                    key: "publishTime",
                    className: publicstyle.center,
                }, {
                    title: "状态",
                    dataIndex: "statusValue",
                    key: "statusValue",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <Tag color={record.statusColor}>{record.statusValue}</Tag>
                    }
                }, {
                    title: "发布单位",
                    dataIndex: "msaName",
                    key: "msaName",
                    className: publicstyle.center,
                }, {
                    title: "专项检查时间",
                    dataIndex: "timeFrame",
                    key: "timeFrame",
                    className: publicstyle.center,
                }, {
                    title: "实施单位",
                    dataIndex: "department",
                    key: "department",
                    className: publicstyle.center,
                }, {
                    title: "是否分级",
                    dataIndex: "isLevel",
                    key: "isLevel",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <Tag className={MaritimeAffairs.tagGray}>{record.isLevelName}</Tag>
                    }
                }, {
                    title: "操作",
                    dataIndex: "action",
                    key: "action",
                    width: "20%",
                    className: publicstyle.center,
                    render: (text, record) => {
                        return <div>
                            <button style={{ display: record.statusCode == 2 ? "inline-block" : "none" }} className={MaritimeAffairs.ButtonMargin + ' ' + MaritimeAffairs.Button5ECF8B} onClick={this.publish.bind(this, record.taskId)}>发布</button>
                            <button style={{ display: record.statusCode == 2 ? "inline-block" : "none" }} className={MaritimeAffairs.ButtonMargin + ' ' + MaritimeAffairs.Button2F8DEB} onClick={() => {
                                let iii = ReactDOM.findDOMNode(this["Efiles"]);
                                if (!!iii) {
                                    iii.value = '';
                                }
                                self.setState({
                                    Eprogess: false,
                                    Efile: [],
                                    EfileName: "",
                                    EcbannerUrl: "",
                                    EspecialName: record.checklistTitle,
                                    EcheckItem: record.sortName,
                                    EcheckSortId: record.checkSortId,
                                    EstartTime: record.startDay,
                                    EstartDay: record.startDay,
                                    EendTime: record.endDay,
                                    EendDay: record.endDay,
                                    EmsaInfo: record.checkMsaId,
                                    EspecialMsaDer: record.department == "--" ? "" : record.department,
                                    EdistinguishValue: record.isLevelName,
                                    EdistinguishCode: record.isLevel,
                                    ETaskID: record.taskId,
                                    editItem: true,
                                })
                            }}>编辑</button>
                            <button style={{ display: record.statusCode == 2 ? "inline-block" : "none" }} className={MaritimeAffairs.ButtonMargin + ' ' + MaritimeAffairs.ButtonF04B31} onClick={this.deleteItem.bind(this, record.taskId)}>删除</button>
                            <button style={{ display: record.statusCode == 1 ? "inline-block" : "none" }} className={MaritimeAffairs.ButtonMargin + ' ' + MaritimeAffairs.ButtonF0BD31} onClick={this.stopItem.bind(this, record.taskId)}>停用</button>

                            <a href={record.excelUrl} download={record.checklistTitle}>
                                <img style={{ display: "inline-block", verticalAlign: "middle", padding: "4px", margin: "0px 10px 10px 0px", float: "right", }} src={downIcon} alt="" />
                            </a>
                        </div >
                    }
                },],
            })
        })

    }
    // 发布
    publish = (taskId) => {
        confirm({
            title: '发布',
            content: `确定发布该检查单吗？`,
            okText: "确认",
            cancelText: "取消",
            onOk() {
                $jsonp3(self, api.spPublishTask, { taskId }).then(res => {
                    if (res.code == "200") {
                        message.success("发布成功");
                        self.getTableData(self.state.page.pageNum);
                    }
                })
            },
            onCancel() {
            },
        });
    }
    // 删除
    deleteItem = (taskId) => {
        confirm({
            title: '删除',
            content: `确定删除该检查单吗？`,
            okText: "确认",
            okType: 'danger',
            cancelText: "取消",
            onOk() {
                $jsonp3(self, api.removeChecklist, { taskId }).then(res => {
                    if (res.code == "200") {
                        message.success("删除成功");
                        self.getTableData(self.state.page.pageNum);
                    }
                })
            },
            onCancel() {
            },
        });
        // deleteItem
    }
    // 停用
    stopItem = (taskId) => {
        confirm({
            title: '停用',
            content: `确定停用该检查单吗？`,
            okText: "确认",
            okType: 'danger',
            cancelText: "取消",
            onOk() {
                $jsonp3(self, api.blockChecklist, { taskId }).then(res => {
                    if (res.code == "200") {
                        message.success("停用成功");
                        self.getTableData(self.state.page.pageNum);
                    }
                })
            },
            onCancel() {
            },
        });
        // deleteItem
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
    toFirst() {
        this.getTableData(1);
    }
    onPageChange(page) {
        this.getTableData(page);
    }
    toLast() {
        this.getTableData(this.state.page.pages);
    }
    add = () => {
        if (!!!this.state.specialName) {
            return message.error("请输入专项检查名称")
        }
        if (!!!this.state.checkItem) {
            return message.error("请选择专项检查项目")
        }
        if (!!!this.state.startTime || !!!this.state.endTime || !!!this.state.startDay || !!!this.state.endDay) {
            return message.error("请选择检查时间")
        }
        if (!!!this.state.msaInfo || this.state.msaInfo.length == 0) {
            return message.error("请选择参与部门")
        }
        if (!!!this.state.distinguish) {
            return message.error("请选择是否分级")
        }
        if (!!!this.state.file || !!!this.state.cbannerUrl) {
            return message.error("请上传检查单")
        }
        let form = new FormData();
        form.append("checklistTitle", this.state.specialName)
        form.append("checkSortId", this.state.checkItem)
        form.append("startDay", this.state.startDay + " 00:00:00")
        form.append("endDay", this.state.endDay + " 23:59:59")
        form.append("checkMsaId", this.state.msaInfo)
        form.append("department", this.state.specialMsaDer)
        form.append("isLevel", this.state.distinguish)
        form.append("excelUrl", this.state.cbannerUrl)
        form.append("file", this.state.file)
        $FormData(self, api.spCreateChecklist, form).then(res => {
            if (res.code == 200) {
                this.getTableData(this.state.page.pageNum);
                message.success("创建成功")
            }
            this.setState({
                visibily: false
            })
        })


    }
    noAdd = () => {
        this.setState({
            visibily: false
        })
    }
    edit = () => {
        if (!!!this.state.EspecialName) {
            return message.error("请输入专项检查名称")
        }
        if (!!!this.state.EcheckSortId) {
            return message.error("请选择专项检查项目")
        }
        if (!!!this.state.EstartTime || !!!this.state.EendTime || !!!this.state.EstartDay || !!!this.state.EendDay) {
            return message.error("请选择检查时间")
        }
        if (!!!this.state.EmsaInfo || this.state.EmsaInfo.length == 0) {
            return message.error("请选择参与部门")
        }
        if (!!!this.state.EdistinguishCode) {
            return message.error("请选择是否分级")
        }
        if (!!!this.state.Efile || !!!this.state.EcbannerUrl) {
            return message.error("请上传检查单")
        }
        let form = new FormData();
        form.append("taskId", this.state.ETaskID)
        form.append("checklistTitle", this.state.EspecialName)
        form.append("checkSortId", this.state.EcheckSortId)
        form.append("startDay", this.state.EstartDay.split(" ")[0] + " 00:00:00")
        form.append("endDay", this.state.EendDay.split(" ")[0] + " 23:59:59")
        form.append("checkMsaId", this.state.EmsaInfo)
        form.append("department", this.state.EspecialMsaDer)
        form.append("isLevel", this.state.EdistinguishCode)
        form.append("excelUrl", this.state.EcbannerUrl)
        form.append("file", this.state.Efile)

        $FormData(self, api.spUpdateChecklist, form).then(res => {
            if (res.code == 200) {
                self.getTableData(self.state.page.pageNum);
                message.success("修改成功")
            }
            this.setState({
                editItem: false,
                Efile: [],
                EfileName: "",
                EcbannerUrl: "",
            })
        })
    }
    noEdit = () => {
        this.setState({
            editItem: false,
            Efile: [],
            EfileName: "",
            EcbannerUrl: "",
        })
    }
    // 渲染
    render() {
        return (
            <div className={stylez.wrapPadding} style={{ padding: "0px", background: "#F7F7F7" }}>
                <div className={MaritimeAffairs.cardWrap}>
                    <div className={MaritimeAffairs.cardTitle}>专项检查</div>
                    <Button type="primary" ghost onClick={() => {
                        let iii = ReactDOM.findDOMNode(this["files"]);
                        if (!!iii) {
                            iii.value = '';
                        }
                        this.setState({
                            visibily: true,
                            progess: false,
                            file: [],
                            fileName: "",
                            cbannerUrl: "",
                            specialName: "",
                            checkItem: "",
                            specialMsaDer: "",
                            msaInfo: undefined,
                            startTime: null,
                            endTime: null,
                            distinguish: "",
                            startDay: null,
                            endDay: null,
                        })
                    }}>发布专项检查</Button>

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
                <Modal visible={this.state.visibily}
                    title="发布专项检查"
                    onOk={this.add}
                    onCancel={this.noAdd}
                    okText="确认"
                    cancelText="取消"
                    className={MaritimeAffairs.Model}>
                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>专项检查名称：</dt>
                        <dd><Input placeholder={"请输入专项检查名称"} value={this.state.specialName} onInput={
                            (e) => this.setState({
                                specialName: e.target.value,
                            })} /></dd>
                    </dl>
                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>专项检查项目：</dt>
                        <dd>
                            <Select placeholder={"请选择专项检查项目"} value={this.state.checkItem}
                                onChange={(value) => {
                                    this.setState({
                                        checkItem: value,
                                    })
                                }}>
                                {
                                    this.state.AllCheckSort.map(q => {
                                        return <Option key={q.id} value={q.id + ""} disabled={q.status != 1}>{q.sort}</Option>
                                    })
                                }
                            </Select>
                        </dd>
                    </dl>
                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>专项检查时间：</dt>
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
                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>参与部门：</dt>
                        <dd>
                            <TreeSelect
                                showSearch
                                style={{ width: "100%" }}
                                value={this.state.msaInfo}
                                placeholder="请选择参与部门"
                                allowClear
                                multiple
                                treeDefaultExpandAll
                                treeCheckable={true}
                                onChange={(msaInfo) => {
                                    this.setState({ msaInfo });
                                }}
                            >
                                <TreeNode value={""} title={"所有"} key={"所有"}>
                                    <TreeNode value={this.state.userInfo.departmentId + ""} title={this.state.userInfo.departmentName} key={this.state.userInfo.departmentId + ""} />
                                    {
                                        this.state.departments.map(item => {
                                            return <TreeNode title={item.name} key={item.id + ""} value={item.id + ""} />
                                        })
                                    }
                                </TreeNode>
                            </TreeSelect>
                        </dd>
                    </dl>
                    <dl>
                        <dt>实施单位：</dt>
                        <dd><Input placeholder={"请输入实施单位"} value={this.state.specialMsaDer} onInput={
                            (e) => this.setState({
                                specialMsaDer: e.target.value,
                            })} /></dd>
                    </dl>
                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>是否分级：</dt>
                        <dd>
                            <Select placeholder={"请选择是否分级"} value={this.state.distinguish}
                                onChange={(distinguish) => {
                                    this.setState({
                                        distinguish
                                    })
                                }}>
                                <Option key="1" value="1">是</Option>
                                <Option key="0" value="0">否</Option>
                            </Select>
                        </dd>
                    </dl>
                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>上传检查单：</dt>
                        <dd> <Button icon="upload" onClick={() => {
                            ReactDOM.findDOMNode(this["files"]).click();
                        }}>点击上传检查单</Button>
                            <Progress size="small" style={{ display: this.state.progess ? "block" : "none" }} percent={this.state.cpercent} status={this.state.progressStatus} />
                            <span style={{ margin: "5px" }}>{this.state.fileName}</span>
                            <Input type="file" style={{ display: "none" }} ref={(file) => { this.files = file }}
                                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={(ii) => {
                                    var file = ii.target.files, time = new Date(), times = time.getTime(), reg = /\.xl(s|s[xmb]|t[xm]|am)$/i;
                                    self.setState({
                                        epercent: 0,
                                        progess: true
                                    })
                                    if (!reg.test(file[0].name)) {
                                        message.error("文件类型错误");
                                        self.setState({
                                            epercent: 100,
                                            progressStatus: "exception"
                                        })
                                        return "error";
                                    }
                                    $jsonp(self, api.getOrderTplSign, {}).then((res) => {
                                        var dir = res.data.dir;
                                        var host = res.data.host;
                                        var id = res.data.id;
                                        var bucket = host.split("//")[1].split(".")[0];
                                        var endpoint = host.split("//")[0] + "//" + host.split(".")[1] + "." + host.split(".")[2] + "." + host.split(".")[3];
                                        var stsToken = {
                                            "RequestId": res.data.response.requestId,
                                            "AssumedRoleUser": {
                                                "AssumedRoleId": res.data.response.assumedRoleUser.assumedRoleId,
                                                "Arn": res.data.response.assumedRoleUser.arn
                                            },
                                            "Credentials": {
                                                "AccessKeySecret": res.data.response.credentials.accessKeySecret,
                                                "AccessKeyId": res.data.response.credentials.accessKeyId,
                                                "Expiration": res.data.response.credentials.expiration,
                                                "SecurityToken": res.data.response.credentials.securityToken
                                            }
                                        };
                                        var ossUpload = new OssUpload({
                                            bucket: bucket,
                                            endpoint: endpoint,
                                            chunkSize: 104857600,
                                            concurrency: 4,
                                            stsToken: stsToken,
                                        });
                                        ossUpload.upload({
                                            file: file[0],
                                            key: dir + "/" + id + times + "." + file[0].name.split(".")[file[0].name.split('.').length - 1],
                                            maxRetry: 3,
                                            headers: {
                                                'CacheControl': 'public',
                                                'Expires': '',
                                                'ContentEncoding': '',
                                                'ContentDisposition': '',
                                                'ServerSideEncryption': ''
                                            },
                                            onprogress: function (evt) {
                                                let percent = self.state.cpercent + 10;
                                                if (percent > 100) {
                                                    percent = 100;
                                                }
                                                self.setState({
                                                    cpercent: percent
                                                })
                                            },
                                            onerror: function (evt) {
                                                message.warning('上传失败');
                                            },
                                            oncomplete: function (r) {

                                                message.success('上传成功');
                                                self.setState({
                                                    cpercent: 100,
                                                    progressStatus: "success",
                                                    cbannerUrl: host + "/" + dir + "/" + id + times + "." + file[0].name.split(".")[file[0].name.split('.').length - 1],
                                                    file: file[0],
                                                    fileName: file[0].name,
                                                })
                                            }
                                        });
                                    })
                                }} />
                        </dd>
                    </dl>
                </Modal>

                <Modal visible={this.state.editItem} title="编辑专项检查"
                    onOk={this.edit}
                    onCancel={this.noEdit}
                    className={MaritimeAffairs.Model}>

                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>专项检查名称：</dt>
                        <dd>
                            <Input placeholder={"请输入专项检查名称"} value={this.state.EspecialName} onInput={
                                (e) => this.setState({
                                    EspecialName: e.target.value,
                                })} /></dd>
                    </dl>
                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>专项检查项目：</dt>
                        <dd>
                            <Select placeholder={"请选择专项检查项目"} value={this.state.EcheckItem}
                                onChange={(value) => {
                                    this.setState({
                                        EcheckItem: value,
                                        EcheckSortId: value,
                                    })
                                }}>
                                {
                                    this.state.AllCheckSort.map(q => {
                                        return <Option key={q.id} value={q.id + ""} disabled={q.status != 1}>{q.sort}</Option>
                                    })
                                }
                            </Select>
                        </dd>
                    </dl>
                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>专项检查时间：</dt>
                        <dd>
                            <RangePicker format="YYYY-MM-DD" value={[moment(this.state.EstartTime, "YYYY-MM-DD"), moment(this.state.EendTime, "YYYY-MM-DD")]} onChange={(date, dateString) => {
                                this.setState({
                                    EstartTime: moment(date[0], "YYYY-MM-DD"),
                                    EstartDay: dateString[0],
                                    EendTime: moment(date[1], "YYYY-MM-DD"),
                                    EendDay: dateString[1],
                                })
                            }} />
                        </dd>
                    </dl>
                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>参与部门：</dt>
                        <dd>
                            <TreeSelect
                                showSearch
                                style={{ width: "100%" }}
                                value={this.state.EmsaInfo}
                                placeholder="请选择参与部门"
                                allowClear
                                multiple
                                treeDefaultExpandAll
                                treeCheckable={true}
                                onChange={(EmsaInfo) => {
                                    this.setState({ EmsaInfo });
                                }}
                            >
                                <TreeNode value={""} title={"所有"} key={"所有"}>
                                    <TreeNode value={this.state.userInfo.departmentId + ""} title={this.state.userInfo.departmentName} key={this.state.userInfo.departmentId + ""} />
                                    {
                                        this.state.departments.map(item => {
                                            return <TreeNode title={item.name} key={item.id + ""} value={item.id + ""} />
                                        })
                                    }
                                </TreeNode>
                            </TreeSelect>
                        </dd>
                    </dl>
                    <dl>
                        <dt>实施单位：</dt>
                        <dd><Input placeholder={"请输入实施单位"} value={this.state.EspecialMsaDer} onInput={
                            (e) => this.setState({
                                EspecialMsaDer: e.target.value,
                            })} /></dd>
                    </dl>
                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>是否分级：</dt>
                        <dd>
                            <Select placeholder={"请选择是否分级"} value={this.state.EdistinguishValue}
                                onChange={(distinguish) => {
                                    this.setState({
                                        EdistinguishValue: distinguish,
                                        EdistinguishCode: distinguish,
                                    })
                                }}>
                                <Option key="1" value="1">是</Option>
                                <Option key="0" value="0">否</Option>
                            </Select>
                        </dd>
                    </dl>
                    <dl>
                        <dt><span className={MaritimeAffairs.must}>*</span>上传检查单：</dt>
                        <dd> <Button icon="upload" onClick={() => {
                            ReactDOM.findDOMNode(this["Efiles"]).click();
                        }}>点击上传检查单</Button>
                            <Progress size="small" style={{ display: this.state.Eprogess ? "block" : "none" }} percent={this.state.Ecpercent} status={this.state.EprogressStatus} />
                            <span style={{ margin: "5px" }}>{this.state.EfileName}</span>
                            <Input type="file" style={{ display: "none" }} ref={(file) => { this.Efiles = file }}
                                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={(ii) => {
                                    self = this;
                                    var file = ii.target.files, time = new Date(), times = time.getTime(), reg = /\.xl(s|s[xmb]|t[xm]|am)$/i;
                                    self.setState({
                                        Eepercent: 0,
                                        Eprogess: true
                                    })
                                    if (!reg.test(file[0].name)) {
                                        message.error("文件类型错误");
                                        self.setState({
                                            Eepercent: 100,
                                            EprogressStatus: "exception"
                                        })
                                        return "error";
                                    }
                                    $jsonp(self, api.getOrderTplSign, {}).then((res) => {
                                        var dir = res.data.dir;
                                        var host = res.data.host;
                                        var id = res.data.id;
                                        var bucket = host.split("//")[1].split(".")[0];
                                        var endpoint = host.split("//")[0] + "//" + host.split(".")[1] + "." + host.split(".")[2] + "." + host.split(".")[3];
                                        var stsToken = {
                                            "RequestId": res.data.response.requestId,
                                            "AssumedRoleUser": {
                                                "AssumedRoleId": res.data.response.assumedRoleUser.assumedRoleId,
                                                "Arn": res.data.response.assumedRoleUser.arn
                                            },
                                            "Credentials": {
                                                "AccessKeySecret": res.data.response.credentials.accessKeySecret,
                                                "AccessKeyId": res.data.response.credentials.accessKeyId,
                                                "Expiration": res.data.response.credentials.expiration,
                                                "SecurityToken": res.data.response.credentials.securityToken
                                            }
                                        };
                                        var ossUpload = new OssUpload({
                                            bucket: bucket,
                                            endpoint: endpoint,
                                            chunkSize: 104857600,
                                            concurrency: 4,
                                            stsToken: stsToken,
                                        });
                                        ossUpload.upload({
                                            file: file[0],
                                            key: dir + "/" + id + times + "." + file[0].name.split(".")[file[0].name.split('.').length - 1],
                                            maxRetry: 3,
                                            headers: {
                                                'CacheControl': 'public',
                                                'Expires': '',
                                                'ContentEncoding': '',
                                                'ContentDisposition': '',
                                                'ServerSideEncryption': ''
                                            },
                                            onprogress: function (evt) {
                                                let percent = self.state.cpercent + 10;
                                                if (percent > 100) {
                                                    percent = 100;
                                                }
                                                self.setState({
                                                    Ecpercent: percent
                                                })
                                            },
                                            onerror: function (evt) {
                                                message.warning('上传失败');
                                            },
                                            oncomplete: function (r) {
                                                message.success('上传成功');
                                                self.setState({
                                                    Ecpercent: 100,
                                                    EprogressStatus: "success",
                                                    EcbannerUrl: host + "/" + dir + "/" + id + times + "." + file[0].name.split(".")[file[0].name.split('.').length - 1],
                                                    Efile: file[0],
                                                    EfileName: file[0].name,
                                                })
                                            }
                                        });
                                    })
                                }} />
                        </dd>
                    </dl>
                </Modal>
            </div >

        )

    }
}