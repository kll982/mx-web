// 报表管理
import React from "react";
import moment from "moment";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Button, Input, Select, Upload, message, Icon, DatePicker, TreeSelect, Progress } from "antd";

import publicstyle from "../../img/public.less";
import styles from "../stastics/taskIndex.less";
import styles1 from '../businessmanage/addcompanyNew.less';
import styles2 from "../admin/index.less";
import stylez from '../../container/index.less';

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import $FormData from "../../utils/formData";
import api from "../../utils/api";
import { readConfigFile } from "typescript";


let self, prposData;
const Option = Select.Option, { TextArea } = Input, { MonthPicker, RangePicker } = DatePicker, dateFormat = 'YYYY-MM-DD', monthFormat = 'YYYY-MM', yearFormat = 'YYYY', TreeNode = TreeSelect.TreeNode;
moment.locale('zh-cn');

export default class AddMangerment extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            reportKindChoose: "2",
            fixedKind: [],
            fixedKindChoose: "",
            DateKindChoose: "1",
            writeLevelChoose: "",
            departments: [],
            checkMsaId: "",
            UploadDate: [],
            UploadDateChoose: "",
            UploadTime: [],
            UploadTimeChoose: "",
            startYear: "",
            endYear: "",
            startDate: "",
            endDate: "",
            startMouth: "",
            endMouth: "",
            startQuarter: "",
            endQuarter: "",
            firstHalfYear: "",
            lastHalfYear: "",
            titleName: "",
            startDateShow: null,
            endDateShow: null,
            startMouthShow: null,
            endMouthShow: null,
            startQuarterShow: null,
            endQuarterShow: null,
            file: [],
            cpercent: 0,
        }
    }
    // 挂载前
    componentWillMount() {
        prposData = self.props.location.state;
        this.getAllFixedKind();
        this.fetchMsaInfos();
        this.getUploadDate();
        this.getUploadTime();

        if (prposData.add == false) {
            $jsonp3(self, api.getTaskById, {
                taskId: prposData.taskId,
            }).then(res => {
                var info = res.data.response.task;

                if (res.code == 200) {
                    this.setState({
                        reportKindChoose: info.checkType,
                        titleName: info.checkNames,
                        fixedKindChoose: info.templateId == null ? "" : info.templateId + "",
                        DateKindChoose: info.statisticsType,
                        // 日
                        startDate: info.startTime,
                        endDate: info.endTime,
                        startDateShow: info.startTime,
                        endDateShow: info.endTime,
                        // 月
                        startMouth: info.startTime,
                        endMouth: info.endTime,
                        startMouthShow: info.startTime,
                        endMouthShow: info.endTime,
                        // 季度
                        startYear: info.startYear,
                        endYear: info.endYear,
                        startQuarter: info.statisticsType == 3 ? info.startTime : null,
                        endQuarter: info.statisticsType == 3 ? info.endTime : null,
                        // 半年
                        firstHalfYear: info.statisticsType == 4 ? info.startTime : null,
                        lastHalfYear: info.statisticsType == 4 ? info.endTime : null,
                        // 填报级别
                        writeLevelChoose: info.fillInLevel,
                        checkMsaId: info.checkMsaIds.split(","),
                        UploadDateChoose: info.reportDifferDays + "",
                        UploadTimeChoose: info.reportTime.split(":")[0] + ":" + info.reportTime.split(":")[1],
                    })
                }
            })
        }
    }
    // 挂载后
    componentDidMount() {

    }
    // 报表类型
    reportKindChange(value) {
        if (value == 1 && (this.state.fixedKind.length == 0 || this.state.fixedKind == null)) {
            message.error("暂无固定报表，请选择生成报表")
        }
        this.setState({
            reportKindChoose: value
        })
    }
    // 获取固定报表
    getAllFixedKind() {
        $jsonp3(self, api.listAllStatisticsTemplate, {})
            .then(res => {
                this.setState({
                    fixedKind: res.data.response.list,
                })
            })
    }
    // 返回所有填报部门
    fetchMsaInfos() {
        $jsonp3(self, api.listDepartmentByUser, {}).then((res) => {
            this.setState({
                departments: res.data.response.list,
            });
        });
    }
    // 选择固定报表
    fixedKindChange(value) {
        this.setState({
            fixedKindChoose: value
        })
    }
    // 报表名称
    titleChange(e) {
        this.setState({
            titleName: e.target.value,
        })
    }
    // 日期类型
    DateKindChange(value) {
        this.setState({
            DateKindChoose: value
        })
    }
    // 按日
    RangeDate(date, dateString) {
        var startDate = dateString[0], endDate = dateString[1];
        var startYear = startDate.split("-")[0], endYear = endDate.split("-")[0];
        this.setState({
            startYear: startYear,
            endYear: endYear,
            startDate: startDate,
            endDate: endDate,
            startDateShow: startDate,
            endDateShow: endDate,
        })
    }
    // 按月
    RangeStartMouth(date, dateString) {
        var startMouth = dateString;
        var startYear = startMouth.split("-")[0];
        if (this.state.endMouth != "" && startMouth > this.state.endMouth) {
            this.setState({
                startMouthShow: null
            })
            return message.error("请选择正确的开始月份")
        } else {
            this.setState({
                startYear: startYear,
                startMouth: startMouth,
                startMouthShow: date
            })
        }
    }
    RangeEndMouth(date, dateString) {
        var endMouth = dateString;
        var endYear = endMouth.split("-")[0];
        if (this.state.startMouth != "" && endMouth < this.state.startMouth) {
            this.setState({
                endMouthShow: null
            })
            return message.error("请选择正确的结束月份")

        } else {
            this.setState({
                endYear: endYear,
                endMouth: endMouth,
                endMouthShow: date
            })
        }
    }
    // 选择年份
    RangeStartYear(value) {
        if (this.state.endYear != "" && value > this.state.endYear) {
            this.setState({
                startYear: "",
            })
            return message.error("请选择正确的开始年份")
        } else {
            this.setState({
                startYear: value,
            })
        }
    }
    RangeEndYear(value) {
        if (this.state.startYear != "" && value < this.state.startYear) {
            this.setState({
                endYear: ""
            })
            return message.error("请选择正确的结束年份")

        } else {
            this.setState({
                endYear: value,
            })
        }
    }
    // 按季 quarter
    RangeStartQuarter(value) {
        if (this.state.endYear != "" && this.state.endYear == this.state.startYear) {
            if (this.state.endQuarter != "" && value > this.state.endQuarter) {
                this.setState({
                    startQuarter: "",
                })
                return message.error("请选择正确的开始季度")
            } else {
                this.setState({
                    startQuarter: value,
                })
            }
        } else if (this.state.endYear != "" && this.state.endYear > this.state.startYear) {
            this.setState({
                startQuarter: value,
            })
        } else if (this.state.endYear == "") {
            this.setState({
                startQuarter: value,
            })
        }

    }
    RangeEndQuarter(value) {
        if (this.state.endYear != "" && this.state.endYear == this.state.startYear) {
            if (this.state.startQuarter != "" && value < this.state.startQuarter) {
                this.setState({
                    endQuarter: ""
                })
                return message.error("请选择正确的结束季度")

            } else {
                this.setState({
                    endQuarter: value,
                })
            }

        } else if (this.state.endYear != "" && this.state.endYear > this.state.startYear) {
            this.setState({
                endQuarter: value,
            })
        } else if (this.state.endYear == "") {
            this.setState({
                endQuarter: value,
            })
        }
    }
    // 半年
    RangeFirstHalfYear(value) {
        if (this.state.endYear != "" && this.state.endYear == this.state.startYear) {
            if (this.state.lastHalfYear != "" && value > this.state.lastHalfYear) {
                this.setState({
                    firstHalfYear: "",
                })
                return message.error("请选择正确的开始时间")
            } else {
                this.setState({
                    firstHalfYear: value,
                })
            }

        } else if (this.state.endYear != "" && this.state.endYear > this.state.startYear) {
            this.setState({
                firstHalfYear: value,
            })
        } else if (this.state.endYear == "") {
            this.setState({
                firstHalfYear: value,
            })
        }

    }
    RangeLastHalfYear(value) {
        if (this.state.endYear != "" && this.state.endYear == this.state.startYear) {
            if (this.state.firstHalfYear != "" && value < this.state.firstHalfYear) {
                this.setState({
                    lastHalfYear: ""
                })
                return message.error("请选择正确的结束时间")

            } else {
                this.setState({
                    lastHalfYear: value,
                })
            }

        } else if (this.state.endYear != "" && this.state.endYear > this.state.startYear) {
            this.setState({
                lastHalfYear: value,
            })
        } else if (this.state.endYear == "") {
            this.setState({
                lastHalfYear: value,
            })
        }

    }


    // 填报级别
    writeLevelChange(value) {
        this.setState({
            writeLevelChoose: value
        })
    }
    // 检查单位
    onMsaIdCheck = (msaIdArray) => {
        this.setState({
            checkMsaId: msaIdArray
        })
    }
    // 填报日期范围
    getUploadDate() {
        let arr = [];
        for (var i = -10; i < 11; i++) {
            arr.push(i)
        }
        this.setState({
            UploadDate: arr,
        })

    }
    // 填报日期
    UploadDateChange(value) {
        this.setState({
            UploadDateChoose: value,
        })
    }
    // 填报时间范围
    getUploadTime() {
        let arr = [];
        for (var i = 0; i < 24; i++) {
            if (i < 10) {
                i = "0" + i;
            }
            arr.push(i + ":00")
        }
        this.setState({
            UploadTime: arr,
        })

    }
    // 填报时间
    UploadTimeChange(value) {
        this.setState({
            UploadTimeChoose: value,
        })
    }
    // 保存
    save() {
        // return 
        let startTime, endTime;
        // 无固定报表
        if (this.state.reportKindChoose == 1 && (this.state.fixedKind.length == 0 || this.state.fixedKind == null)) {
            message.error("暂无固定报表，请选择生成报表")
            return
        }
        // 固定报表
        if (this.state.reportKindChoose == 1 && this.state.fixedKindChoose == "") {
            return message.info("请选择报表")
        }
        // 生成报表
        if (this.state.reportKindChoose == 2 && this.state.file.length == 0) {
            return message.info("请选取报表")
        }
        // 名称
        if (this.state.titleName == "") {
            return message.info("请填写报表名称")
        }
        // 按日
        if (this.state.DateKindChoose == 1) {
            if (this.state.startYear == "" || this.state.endYear == "" || this.state.startDate == "" || this.state.endDate == "") {
                return message.info("请选择填报日期")
            }
            startTime = this.state.startDate;
            endTime = this.state.endDate;
        }
        // 按月
        else if (this.state.DateKindChoose == 2) {
            if (this.state.startYear == "" || this.state.endYear == "" || this.state.startMouth == "" || this.state.endMouth == "") {
                return message.info("请选择填报月份")
            }
            startTime = this.state.startMouth;
            endTime = this.state.endMouth;
        }
        // 按季
        else if (this.state.DateKindChoose == 3) {
            if (this.state.startYear == "" || this.state.endYear == "" || this.state.startQuarter == "" || this.state.endQuarter == "") {
                return message.info("请选择填报季度")
            }
            startTime = this.state.startQuarter;
            endTime = this.state.endQuarter;
        }
        // 半年
        else if (this.state.DateKindChoose == 4) {
            if (this.state.startYear == "" || this.state.endYear == "" || this.state.firstHalfYear == "" || this.state.lastHalfYear == "") {
                return message.info("请选择填报时间")
            }
            startTime = this.state.firstHalfYear;
            endTime = this.state.lastHalfYear;
        }
        // 年
        else if (this.state.DateKindChoose == 5) {
            if (this.state.startYear == "" || this.state.endYear == "") {
                return message.info("请选择填报年份")
            }
            startTime = this.state.startYear;
            endTime = this.state.endYear;
        }
        // 填报级别
        if (this.state.writeLevelChoose == "") {
            return message.info("请选择填报级别")
        }
        // 填报单位
        if (this.state.checkMsaId == "") {
            return message.info("请选择填报单位")
        }
        // 填报日
        if (this.state.UploadDateChoose == "") {
            return message.info("请选择填报日")
        }
        // 填报时
        if (this.state.UploadTimeChoose == "") {
            return message.info("请选择填报时")
        }

        this.setState({ loading: true });
        // 新增
        if (prposData.add == true) {
            // 固定报表上传
            if (this.state.reportKindChoose == 1) {
                $jsonppost(self, api.createTask, {
                    checkNames: this.state.titleName,
                    checkType: this.state.reportKindChoose,
                    templateId: this.state.fixedKindChoose,
                    statisticsType: this.state.DateKindChoose,
                    startYear: this.state.startYear,
                    endYear: this.state.endYear,
                    startTime: startTime,
                    endTime: endTime,
                    fillInLevel: this.state.writeLevelChoose,
                    checkMsaIds: this.state.checkMsaId.join(","),
                    reportTime: this.state.UploadTimeChoose + ":00",
                    reportDifferDays: this.state.UploadDateChoose,
                }).then(res => {
                    if (res.code == 200 && res.message == "ok") {
                        message.success("创建成功");
                        this.setState({ loading: false });
                        hashHistory.push({
                            pathname: 'main/management',
                        })
                    } else {
                        message.error("创建失败");
                    }
                }).catch((error) => {
                    self.setState({
                        loading: false
                    })
                });
            } else if (this.state.reportKindChoose == 2) {
                var formData = new FormData();
                formData.append("checkNames", this.state.titleName);
                formData.append("checkType", this.state.reportKindChoose);
                formData.append("file", this.state.file[0]);
                formData.append("statisticsType", this.state.DateKindChoose);
                formData.append("startYear", this.state.startYear);
                formData.append("endYear", this.state.endYear);
                formData.append("startTime", startTime);
                formData.append("endTime", endTime);
                formData.append("fillInLevel", this.state.writeLevelChoose);
                formData.append("checkMsaIds", this.state.checkMsaId.join(","));
                formData.append("reportTime", this.state.UploadTimeChoose + ":00");
                formData.append("reportDifferDays", this.state.UploadDateChoose);
                $FormData(self, api.createTask, formData).then((res) => {
                    if (res.code == 200 && res.message == "ok") {
                        message.success("创建成功");
                        this.setState({ loading: false });
                        hashHistory.push({
                            pathname: 'main/management',
                        })
                    } else {
                        message.error("创建失败");
                    }
                }).catch((error) => {
                    self.setState({
                        loading: false
                    })
                });
            } else {
                this.setState({ loading: false });
            }
        } else {
            console.info('edit')
            if (this.state.reportKindChoose == 1) {
                $jsonppost(self, api.updateTask, {
                    taskId: prposData.taskId,
                    checkNames: this.state.titleName,
                    checkType: this.state.reportKindChoose,
                    templateId: this.state.fixedKindChoose,
                    statisticsType: this.state.DateKindChoose,
                    startYear: this.state.startYear,
                    endYear: this.state.endYear,
                    startTime: startTime,
                    endTime: endTime,
                    fillInLevel: this.state.writeLevelChoose,
                    checkMsaIds: this.state.checkMsaId.join(","),
                    reportTime: this.state.UploadTimeChoose + ":00",
                    reportDifferDays: this.state.UploadDateChoose,
                }).then(res => {
                    if (res.code == 200 && res.message == "ok") {
                        message.success("修改成功");
                        this.setState({ loading: false });
                        hashHistory.push({
                            pathname: 'main/management',
                        })
                    } else {
                        message.error("修改失败");
                    }
                }).catch((error) => {
                    self.setState({
                        loading: false
                    })
                });
            } else if (this.state.reportKindChoose == 2) {
                var formData = new FormData();
                formData.append("taskId", prposData.taskId);
                formData.append("checkNames", this.state.titleName);
                formData.append("checkType", this.state.reportKindChoose);
                formData.append("file", this.state.file[0]);
                formData.append("statisticsType", this.state.DateKindChoose);
                formData.append("startYear", this.state.startYear);
                formData.append("endYear", this.state.endYear);
                formData.append("startTime", startTime);
                formData.append("endTime", endTime);
                formData.append("fillInLevel", this.state.writeLevelChoose);
                formData.append("checkMsaIds", this.state.checkMsaId.join(","));
                formData.append("reportTime", this.state.UploadTimeChoose + ":00");
                formData.append("reportDifferDays", this.state.UploadDateChoose);
                $FormData(self, api.updateTask, formData).then((res) => {
                    if (res.code == 200 && res.message == "ok") {
                        message.success("修改成功");
                        this.setState({ loading: false });
                        hashHistory.push({
                            pathname: 'main/management',
                        })
                    } else {
                        message.error("修改失败");
                    }
                }).catch((error) => {
                    self.setState({
                        loading: false
                    })
                });
            } else {
                self.setState({
                    loading: false
                })
            }
        }

    }
    // 返回
    cancel = () => {
        window.history.back();
    }
    // 上传之前事件
    beforeUpload = (file) => {
        var fileArr = [];
        //获取新的上传列表
        fileArr.push(file);
        //进行赋值保存
        this.setState({
            file: fileArr,
        })
    }
    // 文件上传改变事件
    updateChange = (info) => {
        // this.removeFile();
        if (info.file.status === 'done') {
            //上传成功后将后台返回来的文件地址进行获取--info.file.response
            if (info.file.response) {
                this.setState(preState => ({
                    uploadPath: info.file.response.Data,
                })
                )
            }
            message.success('上传成功！');
        } else if (info.file.status === 'error') {
            //上传失败进行提示
            message.error('上传失败！');
        }
    }
    // 移除文件
    removeFile = () => {
        this.setState(preState => ({
            file: [],
            uploadPath: ""
        })
        )
    }
    upChange(e) {
        var file = e.target.files;
        console.log(e)
        console.log(file);
        self.setState({
            cpercent: 0,
        })
        var reg = /\.xl(s|s[xmb]|t[xm]|am)$/i;
        if (!reg.test(file[0].name)) {
            message.error("文件类型错误");
            self.setState({
                cpercent: 100,
                progressStatus: "exception"
            })
            return "error";
        }
        if (file.length != 0) {
            self.setState({
                cpercent: 100,
                progressStatus: "success",
                file:file,
            })
        }

    }
    back() {
        window.history.back();
    }
    // 渲染
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
                    <Breadcrumb.Item>统计报表</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="main/management">报表管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{prposData.add == true ? "新增报表" : "编辑报表"}</Breadcrumb.Item>
                </Breadcrumb>
                {/* <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button> */}
                <div className={publicstyle.clearfloat}></div>
                <div className={styles1.form1}>
                    <dl className={styles1.formitem1}>
                        <span className={styles.bitian}><i></i>报表类型：</span>
                        <Select style={{ width: "50%" }} placeholder="请选择报表类型" onChange={this.reportKindChange.bind(this)} value={this.state.reportKindChoose}>
                            <Option value={"1"} key={"1"}>固定报表</Option>
                            <Option value={"2"} key={"2"}>生成报表</Option>
                        </Select>
                    </dl>
                    <dl className={styles1.formitem1} style={{ display: this.state.reportKindChoose == 1 ? "block" : "none" }}>
                        <span className={styles.bitian}><i></i>选择报表：</span>
                        <Select style={{ width: "50%" }} placeholder="请选择报表" onChange={this.fixedKindChange.bind(this)} value={this.state.fixedKindChoose}>
                            {
                                this.state.fixedKind.map(item => {
                                    return <Option value={item.id + ""} key={item.id + ""}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </dl>
                    <dl style={{ display: this.state.reportKindChoose == 2 ? "block" : "none" }}>
                        <span className={styles.bitian}><i></i>上传报表模板：</span>
                        {/* <Upload accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" action="http://www.aliyun.com" beforeUpload={this.beforeUpload} onChange={this.updateChange} onRemove={this.removeFile.bind(this)} fileList={this.state.file} style={{ width: "50%" }}>
                            <Button><Icon type="upload" /> 点击此处上传&ensp;生成报表</Button>
                        </Upload> */}
                        <span style={{ width: "50%", overflow: "hidden", display: "inline-block", }}>
                            <Input type="file" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" size="large" style={{ width: "100%", height: "auto", padding: "5px", }} name="file" onChange={this.upChange} />
                            <Progress size="small" percent={this.state.cpercent} status={this.state.progressStatus} />
                        </span>

                    </dl>
                    <dl className={styles1.formitem1}>
                        <span className={styles.bitian}><i></i>统计名称：</span>
                        <TextArea rows={2} style={{ width: "50%" }} onChange={this.titleChange.bind(this)} value={this.state.titleName} />
                    </dl>
                    <dl className={styles1.formitem1}>
                        <span className={styles.bitian}><i></i>统计类型：</span>
                        <Select style={{ width: "50%" }} placeholder="请选择统计类型" onChange={this.DateKindChange.bind(this)} value={this.state.DateKindChoose}>
                            <Option value={"1"} key={"1"}>按日统计</Option>
                            <Option value={"2"} key={"2"}>按月统计</Option>
                            <Option value={"3"} key={"3"}>按季度统计</Option>
                            <Option value={"4"} key={"4"}>按半年统计</Option>
                            <Option value={"5"} key={"5"}>按年统计</Option>
                        </Select>
                    </dl>
                    <dl className={styles1.formitem1}>
                        <span className={styles.bitian}><i></i>统计日期：</span>
                        <div style={{ width: "50%", textAlign: "left", float: "left", }}>
                            <div style={{ display: this.state.DateKindChoose == 1 ? "block" : "none" }}>
                                {/* 日期 */}
                                <RangePicker onChange={this.RangeDate.bind(this)} format={dateFormat} value={this.state.startDateShow == null ? null : [moment(this.state.startDateShow, dateFormat), moment(this.state.endDateShow, dateFormat)]} />
                            </div>
                            <div style={{ display: this.state.DateKindChoose == 2 ? "block" : "none" }}>
                                {/* 月份 */}
                                {/* 开始 */}
                                <MonthPicker format={monthFormat} style={{ width: "45%", float: "left", }} placeholder="开始月份" onChange={this.RangeStartMouth.bind(this)} value={this.state.startMouthShow == null ? null : moment(this.state.startMouthShow, monthFormat)} />
                                {/* 结束 */}
                                <MonthPicker format={monthFormat} style={{ width: "45%", float: "right", }} placeholder="结束月份" onChange={this.RangeEndMouth.bind(this)} value={this.state.endMouthShow == null ? null : moment(this.state.endMouthShow, monthFormat)} />
                            </div>
                            {/* 季度||半年 */}
                            <div style={{ width: "55%", float: "left", display: (this.state.DateKindChoose == 3 || this.state.DateKindChoose == 4) ? "block" : "none" }}>
                                <Select name="" id="" style={{ width: "80%" }} placeholder="开始年份" onChange={this.RangeStartYear.bind(this)} value={this.state.startYear}>
                                    <Option value="2018">2018</Option>
                                    <Option value="2019">2019</Option>
                                    <Option value="2020">2020</Option>
                                    <Option value="2021">2021</Option>
                                </Select>
                                <span style={{ display: "inline-block", width: "20%", textAlign: "center" }}>年</span>
                            </div>
                            {/* 季度 */}
                            <div style={{ width: "45%", float: "left", display: this.state.DateKindChoose == 3 ? "block" : "none" }}>
                                <Select name="" id="" style={{ width: "100%" }} placeholder="开始季度" onChange={this.RangeStartQuarter.bind(this)} value={this.state.startQuarter}>
                                    <Option value="1">一季度</Option>
                                    <Option value="2">二季度</Option>
                                    <Option value="3">三季度</Option>
                                    <Option value="4">四季度</Option>
                                </Select>
                            </div>
                            {/* 半年 */}
                            <div style={{ width: "45%", float: "left", display: this.state.DateKindChoose == 4 ? "block" : "none" }}>
                                <Select name="" id="" style={{ width: "100%" }} placeholder="上半年" onChange={this.RangeFirstHalfYear.bind(this)} value={this.state.firstHalfYear}>
                                    <Option value="1">上半年</Option>
                                    <Option value="2">下半年</Option>
                                </Select>
                            </div>
                            {/* 季度||半年 */}
                            <div style={{ width: "55%", float: "left", display: (this.state.DateKindChoose == 3 || this.state.DateKindChoose == 4) ? "block" : "none" }}>
                                <Select name="" id="" style={{ width: "80%" }} placeholder="结束年份" onChange={this.RangeEndYear.bind(this)} value={this.state.endYear}>
                                    <Option value="2018">2018</Option>
                                    <Option value="2019">2019</Option>
                                    <Option value="2020">2020</Option>
                                    <Option value="2021">2021</Option>
                                </Select>
                                <span style={{ display: "inline-block", width: "20%", textAlign: "center" }}>年</span>
                            </div>
                            {/* 季度 */}
                            <div style={{ width: "45%", float: "left", display: this.state.DateKindChoose == 3 ? "block" : "none" }}>
                                <Select name="" id="" style={{ width: "100%" }} placeholder="结束季度" onChange={this.RangeEndQuarter.bind(this)} value={this.state.endQuarter}>
                                    <Option value="1">一季度</Option>
                                    <Option value="2">二季度</Option>
                                    <Option value="3">三季度</Option>
                                    <Option value="4">四季度</Option>
                                </Select>
                            </div>
                            {/* 半年 */}
                            <div style={{ width: "45%", float: "left", display: this.state.DateKindChoose == 4 ? "block" : "none" }}>
                                <Select name="" id="" style={{ width: "100%" }} placeholder="下半年" onChange={this.RangeLastHalfYear.bind(this)} value={this.state.lastHalfYear}>
                                    <Option value="1">上半年</Option>
                                    <Option value="2">下半年</Option>
                                </Select>
                            </div>

                            <div style={{ display: this.state.DateKindChoose == 5 ? "block" : "none" }}>
                                {/* 年 */}
                                {/* 开始 */}
                                <Select name="" id="" style={{ width: "40%" }} placeholder="开始年份" onChange={this.RangeStartYear.bind(this)} value={this.state.startYear}>
                                    <Option value="2018">2018</Option>
                                    <Option value="2019">2019</Option>
                                    <Option value="2020">2020</Option>
                                    <Option value="2021">2021</Option>
                                </Select>
                                <span style={{ display: "inline-block", width: "10%", textAlign: "center" }}>年</span>
                                {/* 结束 */}
                                <Select name="" id="" style={{ width: "40%" }} placeholder="结束年份" onChange={this.RangeEndYear.bind(this)} value={this.state.endYear}>
                                    <Option value="2018">2018</Option>
                                    <Option value="2019">2019</Option>
                                    <Option value="2020">2020</Option>
                                    <Option value="2021">2021</Option>
                                </Select>
                                <span style={{ display: "inline-block", width: "10%", textAlign: "center" }}>年</span>
                            </div>
                        </div>
                    </dl>
                    <dl className={styles1.formitem1}>
                        <span className={styles.bitian}><i></i>填报级别：</span>
                        <Select name="" id="" style={{ width: "50%" }} placeholder="请选择填报级别" onChange={this.writeLevelChange.bind(this)} value={this.state.writeLevelChoose}>
                            <Option value="1" disabled={localStorage.getItem("level") != "省"}>市级填报</Option>
                            <Option value="2" disabled={localStorage.getItem("level") != "省" && localStorage.getItem("level") != "市"}>区县级填报</Option>
                        </Select>
                    </dl>
                    <dl className={styles1.formitem1}>
                        <span className={styles.bitian}><i></i>填报单位：</span>
                        <TreeSelect style={{ width: "50%" }} treeCheckable={true}
                            onChange={this.onMsaIdCheck} value={this.state.checkMsaId}
                        >
                            <TreeNode title="所有" key="all" value='all'>
                                {renderTreeNodes(this.state.departments)}
                            </TreeNode>
                        </TreeSelect>
                    </dl>
                    <dl className={styles1.formitem1}>
                        <span className={styles.bitian}><i></i>上报时间：</span>
                        <div style={{ width: "50%", float: "left", }}>
                            <span style={{ display: this.state.DateKindChoose == 1 ? "inline-block" : "none" }}>当日报表 次日</span>
                            <span style={{ display: this.state.DateKindChoose == 2 ? "inline-block" : "none" }}>当月报表 次月</span>
                            <span style={{ display: this.state.DateKindChoose == 3 ? "inline-block" : "none" }}>当季度报表 次季度</span>
                            <span style={{ display: this.state.DateKindChoose == 4 ? "inline-block" : "none" }}>当半年度报表 次半年度</span>
                            <span style={{ display: this.state.DateKindChoose == 5 ? "inline-block" : "none" }}>当年度报表 次年度</span>
                            <span style={{ display: "inline-block" }}>
                                <Select style={{ width: 80 }} onChange={this.UploadDateChange.bind(this)} value={this.state.UploadDateChoose}>
                                    {
                                        this.state.UploadDate.map(item => {
                                            return <Option value={item + ""} key={item + ""}>{item >= 0 ? "+" + item : item} 天</Option>
                                        })
                                    }
                                </Select>
                                &emsp;&ensp;
                        <Select style={{ width: 75 }} onChange={this.UploadTimeChange.bind(this)} value={this.state.UploadTimeChoose}>
                                    {
                                        this.state.UploadTime.map(item => {
                                            return <Option value={item} key={item}>{item}</Option>
                                        })
                                    }
                                </Select>
                                &emsp;前上报
                            </span>

                        </div>
                    </dl>
                    <dl className={styles1.formitem1}>
                        <Button type="primary" size="large" className={publicstyle.button + " " + styles1.button} onClick={this.save.bind(this)} loading={this.state.loading}>
                            保存
                        </Button>
                        <Button size="large" className={publicstyle.button + " " + styles1.button} onClick={this.cancel.bind(this)}>
                            取消
                        </Button>
                    </dl>
                </div>
                <p style={{ textAlign: "center", marginTop: "50px", display: this.state.reportKindChoose == 2 ? "block" : "none" }}>
                    <a href="../../../ico/excel/v2.1.0.xls" download="报表模板">点击此处下载报表模板</a>
                </p>
            </div>
        )

    }
}