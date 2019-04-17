
// 汇总
import React from "react";
import moment from "moment";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Input, Button, Select, DatePicker, TreeSelect, message } from "antd";

import publicstyle from "../../img/public.less";
import styles from "../stastics/taskIndex.less";
import styles1 from '../businessmanage/addcompanyNew.less';
import report from "./report.less";
import styles2 from "../admin/index.less";

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";
import { userInfo } from "os";
import stylez from '../../container/index.less';

let self, prposData = {
    taskId: "",
    taskName: "",
}, UserInfo = {
    departmentName: "",
    departmentId: "",
};
const Option = Select.Option, { MonthPicker, RangePicker } = DatePicker, dateFormat = 'YYYY-MM-DD', monthFormat = 'YYYY-MM', yearFormat = 'YYYY', TreeNode = TreeSelect.TreeNode;
moment.locale('zh-cn');

export default class Tosummary extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            departments: [],
            DateKindChoose: "",
            msa: [],
            checkMsaId: [],
        }
    }
    // 挂载前
    componentWillMount() {
        prposData = self.props.location.state;
        UserInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.fetchMsaInfos();
        this.setState({
            UserInfo: UserInfo,
            msaId: UserInfo.departmentId,
            msaName: UserInfo.departmentName,
        })
    }
    // 挂载后
    componentDidMount() {
        window.addEventListener('resize', this.changeWindowWidth) //监听窗口大小改变
    }
    // 获取dom
    componentWillUnmount() {
        //移除监听
        window.removeEventListener('resize', this.changeWindowWidth)
    }
    // 窗口大小
    changeWindowWidth() {
        var clientWidth = document.body.clientWidth;
        // 减 菜单栏宽度 减 左右padding 减左侧宽度
        if (self.state.leftShow == true) {
            var rightWidth = clientWidth - 200 - 15 - 274;
            self.setState({
                rightWidth: rightWidth,
            })
        } else {
            var rightWidth = clientWidth - 200 - 15;
            self.setState({
                rightWidth: rightWidth,
            })
        }
    }
    // 获取数据
    getData() {
        $jsonp3(self, api.summarizQueryCondition, {
            taskId: prposData.taskId,
        }).then(res => {
            var req = res.data.response, list = req.list, msa = this.state.departments == null ? [] : this.state.departments;
            var msaCount = "";
            var arr = [];
            for (var i in list) {
                if (UserInfo.departmentId == list[i].msaId) {
                    msaCount = list[i].count;
                }
                for (var l in msa) {
                    if (list[i].msaId == msa[l].id) {
                        msa[l].count = "（" + list[i].count + "）";
                        arr.push(msa[l])
                    }
                }
            }
            self.setState({
                DateKindChoose: req.type,
                DateKindChooseValue: req.statisticsType,
                startYear: req.startYear,
                startTime: req.startTime,
                endYear: req.endYear,
                endTime: req.endTime,
                msa: arr,
                msaCount: "（" + msaCount + "）",
                startY: req.startYear,
                endY: req.endYear,
            })
            let start = req.startTime, end = req.endTime;
            if (this.state.DateKindChoose == 1) {
                this.setState({
                    startDate: start,
                    endDate: end,
                    startDateShow: start,
                    endDateShow: end,
                })

            } else if (this.state.DateKindChoose == 2) {
                this.setState({
                    startMouth: start,
                    endMouth: end,
                    startMouthShow: start,
                    endMouthShow: end,
                })

            } else if (this.state.DateKindChoose == 3) {
                let startQ, endQ;
                if (start == "第一季度") {
                    startQ = "1";
                } else if (start == "第二季度") {
                    startQ = "2";
                } else if (start == "第三季度") {
                    startQ = "3";
                } else if (start == "第四季度") {
                    startQ = "4";
                }

                if (end == "第一季度") {
                    endQ = "1";
                } else if (end == "第二季度") {
                    endQ = "2";
                } else if (end == "第三季度") {
                    endQ = "3";
                } else if (end == "第四季度") {
                    endQ = "4";
                }
                this.setState({
                    startQuarter: startQ,
                    endQuarter: endQ,
                    startQ: req.startYear + "." + startQ,
                    endQ: req.endYear + "." + endQ,
                })

            } else if (this.state.DateKindChoose == 4) {
                let startH, endH;
                if (start == "上半年") {
                    startH = "1";
                } else if (start == "下半年") {
                    startH = "2";
                }
                if (end == "上半年") {
                    endH = "1";
                } else if (end == "下半年") {
                    endH = "2";
                }
                this.setState({
                    firstHalfYear: startH,
                    lastHalfYear: endH,
                    startH: req.startYear + "." + startH,
                    endH: req.endYear + "." + endH,
                })

            } else if (this.state.DateKindChoose == 5) {
                this.setState({
                    startY: start,
                    endY: end,
                    startYear: req.startYear,
                    endYear: req.endYear,
                })
            }
        })
    }
    // 按日
    RangeDate(date, dateString) {
        var startDate = dateString[0], endDate = dateString[1];
        var startYear = startDate.split("-")[0], endYear = endDate.split("-")[0];
        if (startDate < this.state.startTime || endDate > this.state.endTime) {
            return message.info("所选日期应包含在统计日期之内")
        }
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
        if (value < this.state.startY || value > this.state.endY) {
            return message.info("所选日期应包含在统计日期之内")
        }
        if (this.state.startQuarter != "" && this.state.endQuarter != "" && this.state.startQuarter > this.state.endQuarter) {
            if (this.state.endYear != "" && value >= this.state.endYear) {
                this.setState({
                    startYear: "",
                })
                return message.error("请选择正确的开始年份")
            }
        }
        if (this.state.firstHalfYear != "" && this.state.lastHalfYear != "" && this.state.firstHalfYear > this.state.lastHalfYear) {
            if (this.state.endYear != "" && value >= this.state.endYear) {
                this.setState({
                    startYear: "",
                })
                return message.error("请选择正确的开始年份")
            }
        }
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
        if (value < this.state.startY || value > this.state.endY) {
            return message.info("所选日期应包含在统计日期之内")
        }
        if (this.state.startQuarter != "" && this.state.endQuarter != "" && this.state.startQuarter > this.state.endQuarter) {
            if (this.state.startYear != "" && value <= this.state.startYear) {
                this.setState({
                    endYear: "",
                })
                return message.error("请选择正确的结束年份")
            }
        }
        if (this.state.firstHalfYear != "" && this.state.lastHalfYear != "" && this.state.firstHalfYear > this.state.lastHalfYear) {
            if (this.state.startYear != "" && value <= this.state.startYear) {
                this.setState({
                    endYear: "",
                })
                return message.error("请选择正确的结束年份")
            }
        }
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
        if (this.state.startYear + "." + value < this.state.startQ || this.state.startYear + "." + value > this.state.endQ) {
            return message.info("所选日期应包含在统计日期之内")
        }

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
        if (this.state.endYear + "." + value < this.state.startQ || this.state.endYear + "." + value > this.state.endQ) {
            return message.info("所选日期应包含在统计日期之内")
        }
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
        if (this.state.startYear != "" && this.state.startYear + "." + value < this.state.startH || this.state.startYear + "." + value > this.state.endH) {
            return message.info("所选日期应包含在统计日期之内")
        }
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
        if (this.state.endYear != "" && this.state.endYear + "." + value < this.state.startH || this.state.endYear + "." + value > this.state.endH) {
            return message.info("所选日期应包含在统计日期之内")
        }
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
    // 返回所有填报部门
    fetchMsaInfos() {
        $jsonp3(self, api.listDepartmentByUser, {}).then((res) => {
            this.setState({
                departments: res.data.response.list,
            });
            this.getData();
        });
    }

    // 检查单位
    onMsaIdCheck = (msaIdArray) => {
        this.setState({
            checkMsaId: msaIdArray
        })
    }
    // 保存
    save() {
        let start = "", end = "", startY = "", endY = "", isChild;
        if (this.state.DateKindChoose == 1) {
            start = this.state.startDate;
            end = this.state.endDate;
            startY = this.state.startYear;
            endY = this.state.endYear;
        } else if (this.state.DateKindChoose == 2) {
            start = this.state.startMouth;
            end = this.state.endMouth;
            startY = this.state.startYear;
            endY = this.state.endYear;
        } else if (this.state.DateKindChoose == 3) {
            start = this.state.startQuarter;
            end = this.state.endQuarter;
            startY = this.state.startYear;
            endY = this.state.endYear;
        } else if (this.state.DateKindChoose == 4) {
            start = this.state.firstHalfYear;
            end = this.state.lastHalfYear;
            startY = this.state.startYear;
            endY = this.state.endYear;
        } else if (this.state.DateKindChoose == 5) {
            start = this.state.startYear;
            end = this.state.endYear;
            startY = this.state.startYear;
            endY = this.state.endYear;
        }
        if (start == "" || end == "" || startY == "" || endY == "") {
            return message.info("请选择汇总日期");
        }
        if (this.state.checkMsaId.length == 0) {
            return message.info("请选择汇总单位")
        }
        if (this.state.checkMsaId == this.state.msaId && this.state.msa.length != 0) {
            isChild = 1
        } else if (this.state.msa.length == 0) {
            isChild = 2
        } else {
            isChild = 2
        }
        hashHistory.push({
            pathname: '/main/printIt',
            state: {
                start: start,
                end: end,
                startY: startY,
                endY: endY,
                isChild: isChild,
                msaId: Number(this.state.checkMsaId),
                taskId: prposData.taskId,
                taskName: prposData.taskName
            },
        })
    }
    // 返回
    cancel() {
        hashHistory.push({
            pathname: '/main/summary',
        })
    }

    disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment(self.state.startTime) || current > moment(self.state.endTime)
    }
    back() {
        hashHistory.push({
            pathname: '/main/summary',
        })
    }
    // 渲染
    render() {

        const renderTreeNodes = data => data.map((item) => {
            if (item.children == null || item.children.length == 0) {
                return <TreeNode title={item.name + item.count} key={item.id + ""} value={item.id + ""} />;

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
                    <Breadcrumb.Item><Link to="main/summary">统计汇总</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>汇总</Breadcrumb.Item>
                </Breadcrumb>
                {/* <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button> */}
                <div className={publicstyle.clearfloat}></div>
                <div className={styles1.form1}>
                    <h2 style={{ textAlign: "center", marginBottom: 30 }}>{prposData.taskName}</h2>
                    <dl className={styles1.formitem1}>
                        <span className={styles.bitian}><i></i>汇总范围：</span>
                        <span>{this.state.DateKindChooseValue}</span>
                    </dl>
                    <dl className={styles1.formitem1}>
                        <span className={styles.bitian}><i></i>选择时间：</span>
                        <div style={{ width: "50%", textAlign: "left", float: "left", }}>
                            <div style={{ display: this.state.DateKindChoose == 1 ? "block" : "none" }}>
                                {/* 日期 */}
                                <RangePicker onChange={this.RangeDate.bind(this)} format={dateFormat} value={this.state.startDateShow == null ? null : [moment(this.state.startDateShow, dateFormat), moment(this.state.endDateShow, dateFormat)]} disabledDate={this.disabledDate} />
                            </div>
                            <div style={{ display: this.state.DateKindChoose == 2 ? "block" : "none" }}>
                                {/* 月份 */}
                                {/* 开始 */}
                                <MonthPicker format={monthFormat} style={{ width: "45%", float: "left", }} placeholder="开始月份" onChange={this.RangeStartMouth.bind(this)} value={this.state.startMouthShow == null ? null : moment(this.state.startMouthShow, monthFormat)} disabledDate={this.disabledDate} />
                                {/* 结束 */}
                                <MonthPicker format={monthFormat} style={{ width: "45%", float: "right", }} placeholder="结束月份" onChange={this.RangeEndMouth.bind(this)} value={this.state.endMouthShow == null ? null : moment(this.state.endMouthShow, monthFormat)} disabledDate={this.disabledDate} />
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
                        <span className={styles.bitian}><i></i>汇总单位：</span>
                        <TreeSelect style={{ width: "50%" }} treeCheckable={false}
                            onChange={this.onMsaIdCheck} value={this.state.checkMsaId} showCheckedStrategy="SHOW_PARENT"
                        >
                            <TreeNode title={this.state.msaName + (localStorage.getItem("level") == "县" ? this.state.msaCount : "")} key={this.state.msaId} value={this.state.msaId + ""}>
                                {this.state.msa.map((item, index) => {
                                    return <TreeNode title={item.name + item.count} key={item.id + ""} value={item.id + ""} />
                                })}
                            </TreeNode>
                        </TreeSelect>
                    </dl>
                    <dl className={styles1.formitem1}>
                        <Button type="primary" size="large" className={publicstyle.button + " " + styles1.button} onClick={this.save.bind(this)}>
                            生成
                        </Button>
                        <Button size="large" onClick={this.cancel.bind(this)}>
                            返回
                        </Button>
                    </dl>
                </div>
            </div>
        )

    }
}