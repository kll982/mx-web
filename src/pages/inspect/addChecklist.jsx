import React from 'react';
import moment from "moment";
import {
    Breadcrumb,
    Select,
    Input,
    DatePicker,
    TreeSelect,
    Button,
    message,
    Icon,
    Progress,
    Radio,
    Form
} from 'antd';
import { Link, hashHistory } from 'react-router';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from '../../utils/api.js';
import publicstyle from '../../img/public.less'
import styles from '../businessmanage/addcompanyNew.less'
import companypng from "../../img/company.png"
import departmentpng from "../../img/department.png"
import emppng from "../../img/emp.png"
import styles1 from "../../components/common.less"
import $jsonp from "../../utils/service";
import $FromData from "../../utils/formData.jsx";
import $ from 'jquery';
import $FormData from "../../utils/formData";
import stylez from '../../container/index.less';

moment.locale('zh-cn');
let self;
const Option = Select.Option, { TextArea } = Input, { MonthPicker, RangePicker } = DatePicker,
    TreeNode = TreeSelect.TreeNode, RadioGroup = Radio.Group, SHOW_PARENT = TreeSelect.SHOW_PARENT;

function e0(arr, items, key) {
    if (items.children && items.children.length > 0) {
        items.children.map((itemss, indexss) => {
            if (itemss.id == key) {
                arr.push(itemss);
            }
            e0(arr, itemss, key);
        })
    }
}

function e1(arr, key, departsArr) {
    departsArr.map((item, index) => {
        if (item.id == key) {
            arr.push(item);
        }
        e0(arr, item, key);
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
        return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name}
            key={item.id + ""}
            value={item.id.toString()}>{loop(item.children)}</TreeSelect.TreeNode>;
    }
    var ptitle = "";
    ptitle = fetchNodeType(item.nodeType, item.name)
    return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id}
        value={item.id.toString()} />;
});

class addChecklist extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            loading: false,
            id: "",
            templateType: "",
            templateCode: "",
            allTemplates: [],
            departments: [],
            statisticYear: "",
            statisticsTitle: "",
            startDay: "",
            endDay: "",
            checkMsaId: "",
            months: "",
            sMsaId: "",
            templateCodeValidStatus: "",
            statictisTitleValidStatus: "",
            statictisYearValidStatus: "",
            statictisMonthsValidStatus: "",
            startDayValidStatus: "",
            endDayValidStatus: "",
            monthsValidStatus: "",
            statisticsMsaIdValidStatus: "",
            monthDisplay: "none",
            Special: "none",
            department: "",
            radioObject: [],
            radioValue: "=",
        }
    }

    componentWillMount() {
        this.getCheckObjeckt();
        this.fetchMsaInfos();
        if (self.props.location.state.top == "edit") {
            // taskId
            $jsonp3(self, api.getTaskInfoById, {
                taskId: self.props.location.state.taskId
            }).then((res) => {
                var data = res.data.response.checklistDto.checklistTask;
                var Sort = res.data.response.checklistDto.checklistSort;
                if (data.checkType == 1) {
                    var checkTypeName = "日常检查";
                    self.setState({
                        Special: "none"
                    })
                } else {
                    var checkTypeName = "专项检查";
                    self.setState({
                        Special: "block"
                    })
                }
                self.setState({
                    taskId: data.id,
                    checklistTitle: data.checklistTitle,
                    checkType: data.checkType,
                    checkTypeName: checkTypeName,
                    radioValue: Sort.id + "=" + Sort.sort,
                    startDay: data.startDay,
                    endDay: data.endDay,
                    checkMsaId: data.checkMsaId,
                    department: data.department,
                    excelUrl: data.excelUrl,
                    file: ""
                });
            })

        } else {
            self.setState({
                startDay: "",
                endDay: "",
            });
        }
    }

    handleSubmit = (e) => {
        if (self.state.checkType && self.state.checkType == 1) {
            if (!self.state.radioValue) {
                return message.info("请选择检查对象")
            }
            if (!self.state.fileArray) {
                return message.info("上传文件")
            }
        } else if (self.state.checkType && self.state.checkType == 2) {
            if (!self.state.checklistTitle) {
                return message.info("请填写检查名称")
            }
            if (!self.state.radioValue) {
                return message.info("请选择检查对象")
            }
            if (!self.state.startDay) {
                return message.info("请选择检查开始时间")
            }
            if (!self.state.endDay) {
                return message.info("请选择检查结束时间")
            }
            if (!self.state.checkMsaId) {
                return message.info("请选择检查单位")
            }
            if (!self.state.fileArray) {
                return message.info("请上传文件")
            }
        } else {
            return message.info("请选择检查单类型")
        }
        self.setState({
            loading: true
        })
        if (self.props.location.state.top == "add") {
            var formData = new FormData();
            formData.append("checklistTitle", self.state.checklistTitle);
            formData.append("checkType", self.state.checkType);
            formData.append("checkSortId", self.state.radioValue.split("=")[0]);
            formData.append("startDay", self.state.startDay);
            formData.append("endDay", self.state.endDay);
            formData.append("checkMsaId", self.state.checkMsaId);
            formData.append("department", self.state.department);
            formData.append("excelUrl", self.state.cbannerUrl);
            formData.append("file", self.state.fileArray[0]);
            $FromData(self, api.createChecklist, formData).then((res) => {
                self.setState({
                    loading: false
                })
                if (res.message == "ok") {
                    hashHistory.push({
                        pathname: 'main/CheckList',
                        state: {
                            current: ""
                        }
                    })
                }
            }).catch((error) => {
                self.setState({
                    loading: false
                })
            })
        }
        else {
            var formData = new FormData();
            formData.append("taskId", self.state.taskId);
            formData.append("checklistTitle", self.state.checklistTitle);
            formData.append("checkType", self.state.checkType);
            formData.append("checkSortId", self.state.radioValue.split("=")[0]);
            formData.append("startDay", self.state.startDay);
            formData.append("endDay", self.state.endDay);
            formData.append("checkMsaId", self.state.checkMsaId);
            formData.append("department", self.state.department);
            formData.append("excelUrl", self.state.cbannerUrl);
            formData.append("file", self.state.fileArray[0]);
            $FormData(self, api.updateChecklist, formData).then((res) => {
                hashHistory.push({
                    pathname: 'main/CheckList',
                    state: {
                        current: ""
                    }
                })
            }).catch((error) => {
                self.setState({
                    loading: false
                })
            });
        }
    }

    chooseFile(e) {
        var file = e.target.files;
        var time = new Date();
        var times = time.getTime();
        self.setState({
            epercent: 0,
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
            console.log(file[0].name.split("."));
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
                        cbannerUrl: host + "/" + dir + "/" + id + times + "." + file[0].name.split(".")[file[0].name.split('.').length - 1],
                        fileArray: [...file]
                    })
                }
            });

        })
    }

    // 选取文件
    files = (event) => {
        event.preventDefault();
        // mulitipart form,如文件上传类
        var formData = new FormData();
        formData.append("file", this.state.fileArray[0]);
        $FromData(self, api.test, formData).then((res) => {
        }).catch((error) => {
            console.log(error);
        })
    }

    //根据模板编码返回所有待部门
    fetchMsaInfos(templateCode1) {
        $jsonp3(self, api.listDepartmentByUser, {}).then((res) => {
            self.setState({
                departments: res.data.response.list,
            });
        });
    }

    setChecklistTitle(e) {
        self.setState({
            checklistTitle: e.target.value
        });
    }

    // 专项检查/日常检查
    setTaskState(e) {
        if (e == 1) {
            self.setState({
                checkTypeName: "日常检查",
                checkType: "1",
                Special: "none",
            })
        } else {
            self.setState({
                checkTypeName: "专项检查",
                checkType: "2",
                Special: "block",
            })
        }
    }

    // 获取所有的检查对象
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

    setStartDay(startDayMement, staryDayStr) {
        self.setState({
            startDay: staryDayStr
        });
    }

    setEndDay(endDayMement, endDayStr) {
        self.setState({
            endDay: endDayStr
        });
    }

    // 实施单位
    setDepartment(e) {
        self.setState({
            department: e.target.value
        })
    }

    // 检查单位
    onMsaIdCheck = (msaIdArray) => {
        self.setState({
            checkMsaId: msaIdArray
        })
    }

    cancel = () => {
        var eeee = self.props.location.state;
        hashHistory.push({
            pathname: 'main/CheckList',
            state: {
                current: eeee.current,
                account: eeee.account,
                mobile: eeee.mobile,
                name: eeee.name,
                departmentId: eeee.departmentId,
                departmentCode: eeee.departmentCode,
                roleId: eeee.roleId,
                jobStatus: eeee.jobStatus,
                jobStatusText: eeee.jobStatusText,
                expandForm: eeee.expandForm,
            }
        })
    }

    render() {
        const renderTreeNodes = data => data.map((item) => {
            if (item.children == null || item.children.length == 0) {
                return <TreeNode title={item.name} key={item.id + ""} value={item.id + ""} />;

            } else {
                return (
                    <TreeNode title={item.name} key={item.id + ""} value={item.id + ""}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
        });
        return (
            <div className={stylez.wrapPadding}>

                <Breadcrumb separator=">" style={{ textAlign: "left" }}>
                    <Breadcrumb.Item><Link to="main/Checklist">检查单管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>编辑</Breadcrumb.Item>
                </Breadcrumb>
                <div className={publicstyle.clearfloat}></div>
                {/*<div className={styles.form1}>*/}
                <form className={styles.form1} id="from" onSubmit={this.files.bind(this)}>
                    <dl className={styles.formitem1}>
                        <span className={styles.bitian}><i></i>检查类型：</span>
                        <Select value={this.state.checkTypeName} style={{ width: "50%" }} placeholder="检查类型"
                            onChange={this.setTaskState}>
                            <Option value="1">日常检查</Option>
                            <Option value="2" disabled>专项检查</Option>
                        </Select>
                    </dl>
                    {/*专 显*/}
                    <dl className={styles.formitem1} style={{ display: this.state.Special }}>
                        <span className={styles.bitian}><i></i>检查名称：</span>
                        <TextArea rows={2} style={{ width: "50%" }} onChange={this.setChecklistTitle}
                            value={this.state.checklistTitle} />
                    </dl>

                    <dl className={styles.formitem1}>
                        <span className={styles.bitian}><i></i>检查对象：</span>
                        <Select onChange={this.checkObjeckt.bind(this)} value={this.state.radioValue.split("=")[1]}
                            placeholder="检查对象" style={{ width: "50%" }}>
                            {
                                this.state.radioObject.map((item, index) => {
                                    return <Option value={item.id + "=" + item.sort} disabled={item.status == 0}
                                        key={item.id + ""}>{item.sort}</Option>
                                })
                            }
                        </Select>
                    </dl>

                    {/*专 显*/}
                    <dl className={styles.formitem1} style={{ display: this.state.Special }}>
                        <span className={styles.bitian}><i></i>检查时间：</span>
                        <DatePicker style={{ width: "50%" }}
                            onChange={this.setStartDay}
                        />
                    </dl>
                    {/*专 显*/}
                    <dl className={styles.formitem1} style={{ display: this.state.Special }}>
                        <span className={styles.bitian}><i></i>至：</span>
                        <DatePicker style={{ width: "50%" }}
                            onChange={this.setEndDay}
                        />
                    </dl>

                    {/*专 显*/}
                    <dl className={styles.formitem1} style={{ display: this.state.Special }}>
                        <span className={styles.bitian}><i></i>检查单位：</span>
                        <TreeSelect style={{ width: "50%" }} treeCheckable={true}
                            // showCheckedStrategy={SHOW_PARENT}
                            onChange={this.onMsaIdCheck} value={this.state.checkMsaId}
                        >
                            <TreeNode title="所有" key="all" value='all'>
                                {renderTreeNodes(this.state.departments)}
                            </TreeNode>
                        </TreeSelect>
                    </dl>

                    {/*专 显*/}
                    <dl className={styles.formitem1} style={{ display: this.state.Special }}>
                        <span className={styles.nobitian}><i></i>实施单位：</span>
                        <div className="example-input" style={{ width: "50%", float: "left" }}>
                            <Input size="large" placeholder="实施单位" onChange={this.setDepartment}
                                value={this.state.department} />
                        </div>
                    </dl>

                    <dl className={styles.formitem1}>
                        <span className={styles.bitian}><i></i>上传检查表：</span>
                        <span style={{ width: "50%", overflow: "hidden", display: "inline-block", }}>
                            <Input type="file" name="file" size="large" style={{ width: "100%", height: "auto", padding: "5px", }}
                                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange={this.chooseFile.bind(this)} />
                            <Progress size="small" percent={this.state.cpercent} status={this.state.progressStatus} />
                        </span>
                    </dl>
                    <dl className={styles.formitem1}>
                        <Button type="primary" size="large" className={publicstyle.button + " " + styles.button}
                            onClick={this.handleSubmit.bind(this)} loading={this.state.loading}>
                            保存
                        </Button>
                        <Button size="large" className={publicstyle.button + " " + styles.button} onClick={this.cancel}>
                            取消
                        </Button>
                    </dl>
                </form>
                {/*</div>*/}
                <div style={{ textAlign: "center", padding: "50px" }}>
                    注意:上传的检查表必须按照统一模板,点击<a href="../../../ico/excel/v2.0.0.xlsx" download="检查表模板">下载检查表模板</a>
                </div>
            </div>

        )
    }
}

export default addChecklist;