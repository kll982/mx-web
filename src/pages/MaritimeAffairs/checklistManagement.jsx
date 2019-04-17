// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Row, Col, Button, Input, Radio, Upload, Icon, Table, Tag, Pagination, message, Modal, Progress } from "antd";

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
import $FromData from "../../utils/formData.jsx";
import api from "../../utils/api";

import downIcon from "../../img/downIcon.png"

let self, propsData = {
    checkName: "",
    sortId: "",
};
const RadioGroup = Radio.Group, confirm = Modal.confirm;

export default class ChecklistManagement extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            listDataSource: [],
            page: {
                pages: "",
            },
            fileList: [],
            Progressvisibilty: false,
        }
    }
    // 挂载前
    componentWillMount() {
        propsData = this.props.location.state;
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.setState({
            propsData: propsData,
            Radiovalue: 0,
            userInfo: userInfo,
        }, () => {
            this.getListData(1);
        })
    }
    // 挂载后
    componentDidMount() {

    }
    inputChange(e) {
        this.setState({
            inputValue: e.target.value,
        })
    }
    RadioChange(e) {
        this.setState({
            Radiovalue: e.target.value
        })
    }
    fileChange = (e) => {
        var file = e.target.files;
        var time = new Date();
        var times = time.getTime();
        self.setState({
            epercent: 0, Progressvisibilty: true
        })
        var reg = /\.xl(s|s[xmb]|t[xm]|am)$/i;
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
                oncomplete: function (res) {
                    message.success('上传成功');
                    self.setState({
                        cpercent: 100,
                        progressStatus: "success",
                        fileListUrl: host + "/" + dir + "/" + id + times + "." + file[0].name.split(".")[file[0].name.split('.').length - 1],
                        fileArray: [...file],
                        fileName: [...file][0].name,
                        fileList: file,
                    })
                }
            });

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
    // 查看
    seeItem(record) {
        hashHistory.push({
            pathname: "/main/Mobilephone",
            state: {
                taskId: record.id,
                checkType: record.checkType,
                sortId: this.state.propsData.sortId,
                checkName: this.state.propsData.checkName,
                seePath: "checklistManagement",
            }
        })
    }
    // 复用
    reviewItem(record) {
        confirm({
            title: '复用' + record.name,
            content: `确认复用${record.name}吗？`,
            onOk() {
                // publishTask
                $jsonp3(self, api.reuseChecklistByTaskId, {
                    taskId: record.id
                }).then(res => {
                    if (res.code == 200) {
                        message.success("复用成功");
                        self.getListData(self.state.page.pageNum);
                    }
                })
            },
            onCancel() {
                return
            },
        });
    }
    deleteItem(record) {
        confirm({
            title: '删除' + record.name,
            content: `确认删除${record.name}吗？`,
            onOk() {
                // publishTask
                $jsonp3(self, api.removeChecklistByTaskId, {
                    taskId: record.id
                }).then(res => {
                    if (res.code == 200) {
                        message.success("删除成功");
                        self.getListData(self.state.page.pageNum);
                    }
                })
            },
            onCancel() {
                return
            },
        });

    }
    // 发布
    releaseItem(record) {
        confirm({
            title: '发布' + record.name,
            content: `确认发布${record.name}吗？`,
            onOk() {
                // publishTask
                $jsonp3(self, api.checklistPublishTask, {
                    taskId: record.id
                }).then(res => {
                    if (res.code == 200) {
                        self.getListData(self.state.page.pageNum);
                        return message.success("发布成功");
                    }
                })
            },
            onCancel() {
                return
            },
        });
    }
    getListData(page) {
        $jsonp3(self, api.listChecklist, {
            sortId: this.state.propsData.sortId,
            pageNum: page,
        }).then(res => {
            if (res.code == 200) {
                let list = res.data.response.list, pageInfo = res.data.response.pageInfo;
                let arr = [];
                if (list.length != 0) {
                    list.map((item, index) => {
                        let Item = {};
                        Item.id = item.id;
                        Item.index = (page - 1) * 10 + index + 1;
                        Item.name = item.checklistTitle;
                        Item.msaName = item.msaName == null ? "--" : item.msaName;
                        Item.publishTime = this.getDay(item.publishTime);
                        Item.stustas = item.status;
                        Item.isLevel = item.isLevel;
                        Item.creatBy = item.creatBy;
                        Item.createMsaId = item.createMsaId;
                        Item.buttonVisibily = (item.createMsaId == this.state.userInfo.departmentId);
                        Item.checkType = item.checkType;
                        Item.excelUrl = item.excelUrl;
                        Item.isUse = item.isUse == 1 ? true : false;

                        arr.push(Item);
                    })
                }
                this.setState({
                    listDataSource: arr,
                    page: pageInfo,
                    listDataColumns: [{
                        title: "编号",
                        dataIndex: "index",
                        key: "index",
                        className: publicstyle.center,
                    }, {
                        title: "检查单名称",
                        dataIndex: "name",
                        key: "name",
                        className: publicstyle.center,
                        render: (text, record) => {
                            return <div>
                                {record.name}<span style={{ display: record.isUse ? "inline-block" : "none", color: "red" }}>(正在使用)</span>
                            </div>

                        }
                    }, {
                        title: "生成单位",
                        dataIndex: "msaName",
                        key: "msaName",
                        className: publicstyle.center,
                    }, {
                        title: "发布时间",
                        dataIndex: "publishTime",
                        key: "publishTime",
                        className: publicstyle.center,
                    }, {
                        title: "风险分级",
                        dataIndex: "isLevel",
                        key: "isLevel",
                        className: publicstyle.center,
                        render: (text, record) => {
                            //  1 是 0 否
                            if (record.isLevel == 1) {
                                return <Tag>是</Tag>
                            } else {
                                return <Tag>否</Tag>
                            }
                        }
                    }, {
                        title: "状态",
                        dataIndex: "stustas",
                        key: "stustas",
                        className: publicstyle.center,
                        render: (text, record) => {
                            //  1 发布 2 未发布 3 停用 4 删除
                            if (record.stustas == 1) {
                                return <Tag color="blue">已发布</Tag>
                            } else if (record.stustas == 2) {
                                return <Tag color="orange">待发布</Tag>
                            } else if (record.stustas == 3) {
                                return <Tag color="red">停用</Tag>
                            }
                        }
                    }, {
                        title: "操作",
                        dataIndex: "action",
                        key: "action",
                        className: publicstyle.center,
                        render: (text, record) => {
                            if (record.stustas == 1) {
                                return <div>

                                    <button className={MaritimeAffairs.Button5ECF8B} style={{ margin: "0px 10px 10px 0px", }} onClick={this.seeItem.bind(this, record)}>查看</button>

                                    <a href={record.excelUrl} download={record.name}>
                                        <img style={{ display: "inline-block", verticalAlign: "middle", padding: "4px", margin: "0px 10px 10px 0px", float: "right", }} src={downIcon} alt="" />
                                    </a>

                                </div>
                            } else if (record.stustas == 2) {
                                return <div>

                                    <button className={MaritimeAffairs.Button5ECF8B} style={{ margin: "0px 10px 10px 0px", }} onClick={this.seeItem.bind(this, record)}>查看</button>

                                    <button className={MaritimeAffairs.Button2F8DEB} style={{ display: record.buttonVisibily == true ? "linline-block" : "none", margin: "0px 10px 10px 0px", }} onClick={this.releaseItem.bind(this, record)}>发布</button>

                                    <button className={MaritimeAffairs.ButtonF04B31} style={{ display: record.buttonVisibily == true ? "linline-block" : "none", margin: "0px 10px 10px 0px", }} onClick={this.deleteItem.bind(this, record)}>删除</button>

                                    <a href={record.excelUrl} download={record.name}>
                                        <img style={{ display: "inline-block", verticalAlign: "middle", padding: "4px", margin: "0px 10px 10px 0px", float: "right", }} src={downIcon} alt="" />
                                    </a>

                                </div>
                            } else if (record.stustas == 3) {
                                return <div>

                                    <button className={MaritimeAffairs.Button5ECF8B} style={{ margin: "0px 10px 10px 0px", }} onClick={this.seeItem.bind(this, record)}>查看</button>

                                    <button className={MaritimeAffairs.Button2F8DEB} style={{ display: record.buttonVisibily == true ? "linline-block" : "none", margin: "0px 10px 10px 0px", }} onClick={this.reviewItem.bind(this, record)}>复用</button>

                                    <a href={record.excelUrl} download={record.name}>
                                        <img style={{ display: "inline-block", verticalAlign: "middle", padding: "4px", margin: "0px 10px 10px 0px", float: "right", }} src={downIcon} alt="" />
                                    </a>

                                </div>
                            }
                        }
                    },]
                })
            }
        })
    }
    // 生成
    generate() {
        if (!!!this.state.inputValue) { return message.error("请输入检查表名称") }
        if (this.state.fileArray.length == 0) { return message.error("请上传检查表") }
        confirm({
            title: '生成检查单?',
            content: '确认生成检查单？',
            onOk() {
                var formData = new FormData();
                formData.append("checklistTitle", self.state.inputValue);
                formData.append("checkSortId", self.state.propsData.sortId);
                formData.append("isLevel", self.state.Radiovalue);
                formData.append("file", self.state.fileArray[0]);
                formData.append("excelUrl", self.state.fileListUrl);

                $FromData(self, api.createChecklist, formData).then(res => {
                    if (res.code == 200) {
                        self.getListData(self.state.page.pageNum);
                        self.setState({
                            inputValue: "",
                            excelUrl: "",
                            fileName: "",
                        })
                        return message.success("成功生成检查单")
                    }
                })
            },
            onCancel() { },
        });


    }
    toFirst() {
        this.getListData(1);
    }
    onPageChange(page) {
        this.getListData(page);
    }
    toLast() {
        this.getListData(this.state.page.pages);
    }
    back() {
        hashHistory.push({
            pathname: "/main/projectItem",
        })
    }
    // 渲染
    render() {
        return (
            <div className={stylez.wrapPadding} style={{ background: "#F7F7F7", padding: "0px", position: "relative" }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", background: "white", padding: "15px" }}>
                    <Breadcrumb.Item>检查项目管理</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/main/checklistManagement">检查单</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloatTop}></div>
                <div className={MaritimeAffairs.cardWrap}>
                    <div className={MaritimeAffairs.cardTitle}>
                        检查单生成——{this.state.propsData.checkName}
                        <a href="../../../ico/excel/v2.2.0.xlsx" download="检查表模板"><Button className={MaritimeAffairs.rightButton + " " + MaritimeAffairs.cardTitleRightItem} icon="download" >下载检查表模板</Button></a>
                    </div>
                    <div className={MaritimeAffairs.fromList}>
                        <dl>
                            <dd className={MaritimeAffairs.justify}>检查单名称<span></span></dd>
                            <dt><Input onChange={this.inputChange.bind(this)} value={this.state.inputValue}></Input></dt>
                        </dl>

                        <dl>
                            <dd className={MaritimeAffairs.justify}>风险分级<span></span></dd>
                            <dt>
                                <RadioGroup onChange={this.RadioChange.bind(this)} value={this.state.Radiovalue} >
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                </RadioGroup>
                            </dt>
                        </dl>

                        <dl>
                            <dd className={MaritimeAffairs.justify}>上传检查表<span></span></dd>
                            <dt style={{ position: "relative", width: "426px", height: "80px" }}>
                                <Input style={{ position: "absolute", left: 0, top: 0, opacity: "0", zIndex: 2, width: 130, heigth: 30 }} type="file" onChange={this.fileChange.bind(this)} accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"></Input>
                                <Button style={{ position: "absolute", left: 0, top: 0, opacity: "1", }}>
                                    <Icon type="upload" /> 上传检查表
                                </Button>
                                <br />
                                <Progress size="small" style={{ visibility: this.state.Progressvisibilty == true ? "visubily" : "hidden", }} percent={this.state.cpercent} status={this.state.progressStatus} />
                                <span style={{ paddingTop: "7px", float: "left", fontSize: 10 }}>{this.state.fileName}</span>
                            </dt>
                        </dl>
                        <button className={MaritimeAffairs.longButton} onClick={this.generate.bind(this)}>生成</button>
                    </div>
                </div>

                <div className={MaritimeAffairs.cardWrap}>
                    {this.state.listDataSource ?
                        <div style={{ overflow: "hidden" }}>
                            <Table className={MaritimeAffairs.Table} rowKey={record => record.id} columns={this.state.listDataColumns} dataSource={this.state.listDataSource} pagination={false}>
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
            </div >
        )

    }
}