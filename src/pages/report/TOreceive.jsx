// 接收
import React from "react";
import ReactDOM from "react";
import moment from 'moment';
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Tree, Button, TreeSelect, Row, Col, Icon, Radio, Modal, Input, Select, message, DatePicker, TimePicker } from "antd";

import publicstyle from "../../img/public.less";
import styles from "../stastics/taskIndex.less";
import report from "./report.less";
import styles2 from "../admin/index.less";

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";

let self, prposData = {
    record: {},
}, UserInfo = {
    departmentName: "",
    departmentId: "",
}, TreeStructure;
const { TreeNode } = Tree, ButtonGroup = Button.Group, RadioGroup = Radio.Group, RadioButton = Radio.Button, Option = Select.Option, confirm = Modal.confirm, RangePicker = DatePicker.RangePicker;

export default class Toreceive extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            leftShowWidth: 274,
            leftHiddenWidth: 0,
            leftShow: false,
            rightWidth: "100%",
            click: true,
            hover: false,
            // 总宽度 - 菜单栏宽度 - layout两侧padding-leftWidth - right填报日期左侧padding - 字数*个数 - padding*2
            widths: document.body.clientWidth - 280 - 15 * 2 - 274 - 10 - 16 * 4 - 194 - 10 * 2,
            // open: true,
            // page: 1,
            // leftPage: false,
            // rightPage: false,
            // pages: 10,
            pageShow: false,
            DateAll: true,
            Dates: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 0
            ],
            departments: [],
            size: "",
            AllData: {
            },
            statisticsTimes: [],
            infoId: "",
            isChild: 1,
            item: [],
            UserInfo: {
                departmentName: "",
                departmentId: "",
            },
            personal: "",
            monthS: [], dateS: [], timeS: [],
            Year: "",
            Month: "",
            Date: "",
            Time: "",
            cause: "",
            DateSelect: "",
        }
    }
    // 挂载前
    componentWillMount() {
        prposData = self.props.location.state;
        UserInfo = JSON.parse(localStorage.getItem("userInfo"));
        // 年
        let monthS = [], dateS = [], timeS = [];
        // 月
        for (let i = 1; i < 13; i++) {
            monthS.push(i)
        }
        // 日
        for (let i = 1; i <= 31; i++) {
            dateS.push(i)
        }
        // 时
        for (let i = 0; i < 24; i++) {
            let t;
            if (i < 10) {
                t = "0" + i + ":00"
                timeS.push(t)
            } else {
                t = i + ":00"
                timeS.push(t)
            }
        }
        this.setState({
            monthS: monthS,
            dateS: dateS,
            timeS: timeS,
            UserInfo: UserInfo,
            msaId: UserInfo.departmentId,
            msaName: UserInfo.departmentName,
            // pages: Math.round(Math.random() * 10) + 1,
        })

        this.changeWidth();
        self.query();

    }
    // 挂载后
    componentDidMount() {
        window.addEventListener('resize', this.changeWindowWidth) //监听窗口大小改变
        // if (this.state.pages > 1) {
        // this.setState({
        //     rightPage: true,
        //     pageShow: true,
        // })
        // }
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
    // 左侧宽度
    changeWidth() {
        var clientWidth = document.body.clientWidth;
        // 减 菜单栏宽度 减 左右padding 减左侧宽度
        if (this.state.leftShow == true) {
            var rightWidth = clientWidth - 200 - 15;
            this.setState({
                rightWidth: rightWidth,
                leftShow: false
            })
        } else {
            var rightWidth = clientWidth - 200 - 15 - 274;
            this.setState({
                rightWidth: rightWidth,
                leftShow: true,
            })
        }
    }
    // 所有数据
    query() {
        $jsonp3(self, api.listReceptionInfo, {
            taskId: prposData.record.taskId,
        }).then(res => {
            TreeStructure = res.data.response;
            var item = res.data.response.item, statisticsTimes = res.data.response.statisticsTimes, date = res.data.response.newest;
            var ones = [];
            for (let i = 0; i < item.length - 1; i++) {
                if (item[i].one == item[i + 1].one) {
                    ones.push({
                        title: item[i].one,
                        children: [{
                            title: item[i].two,
                        },]
                    });
                }
                if (item[i].one != item[i + 1].one) {
                    ones.push({
                        title: item[i].one,
                        children: [{
                            title: item[i].two,
                        },]
                    });
                }
                if (i == (item.length - 2)) {
                    ones.push({
                        title: item[item.length - 1].one,
                        children: [{
                            title: item[item.length - 1].two,
                        },]
                    });
                }
            }
            if (item.length > 1) {
                // 一级去重
                for (var i = 1; i < ones.length; i++) {
                    if (ones[i].title == ones[i - 1].title) {
                        for (var l in ones[i].children) {
                            ones[i - 1].children.push(ones[i].children[l]);
                        }
                        ones.splice(i, 1);
                        i--;
                    }
                }
                var arr = [];
                // 3个一组
                for (var i = 0; i < ones.length; i++) {
                    var arr1 = [];
                    for (var l in ones[i].children) {
                        if (ones[i].children.length >= 3) {
                            if ((l + 1) % 3 == 0) {
                                arr1.push([ones[i].children[l - 2], ones[i].children[l - 1], ones[i].children[l]]);
                            } else if ((ones[i].children.length - l) < 3 && ones[i].children.length % 3 == 0) {

                            } else if ((ones[i].children.length - l) < 3 && ones[i].children.length % 3 == 1 && (ones[i].children.length - l) == 1) {
                                arr1.push([ones[i].children[ones[i].children.length - 1]]);
                            } else if ((ones[i].children.length - l) < 3 && ones[i].children.length % 3 == 2 && (ones[i].children.length - l) == 2) {
                                arr1.push([ones[i].children[ones[i].children.length - 2], ones[i].children[ones[i].children.length - 1]]);
                            }
                        } else {
                            if (ones[i].children.length % 3 == 0) {
                            } else if (ones[i].children.length % 3 == 1 && (ones[i].children.length - l) == 1) {
                                arr1.push([ones[i].children[ones[i].children.length - 1]]);
                            } else if (ones[i].children.length % 3 == 2 && (ones[i].children.length - l) == 2) {
                                arr1.push([ones[i].children[ones[i].children.length - 2], ones[i].children[ones[i].children.length - 1]]);
                            }
                        }
                    }
                    arr.push({
                        title: ones[i].title,
                        children: arr1,
                    });
                }
            }
            let dates = [];
            for (let i in statisticsTimes) {
                dates.push({
                    title: statisticsTimes[i],
                    disabled: false,
                    writeInfo: "",
                })
            }
            async function wait(TreeStructure, arr) {
                self.setState({
                    AllData: TreeStructure,
                    // item: arr,
                    newest: date == null ? "" : date,
                    newestAll: date == null ? true : false,
                    statisticsTimes: dates,
                    size: date == null ? "" : date,
                    DateSelect: date == null ? "" : date,
                    DateAll: date == null ? true : false,
                });
            }
            wait(TreeStructure, arr).then(res => {
                self.treeData();
                self.changeData();
            })

        })
    }
    // 树状图
    treeData() {
        $jsonp3(self, api.listDepartmentByUser, {})
            .then((res) => {
                let departments = res.data.response.list, count = TreeStructure.count;
                let result = [];
                for (var i in departments) {
                    for (var j in count) {
                        if (departments[i].id == count[j].msaId) {
                            departments[i].count = count[j].count;
                            result.push(departments[i]);
                        } else {
                        }
                    }
                }
                this.setState({
                    departments: result,
                });
            });
    }
    // // 减一页
    // leftPage(page) {
    //     let Page = --page;
    //     this.setState({
    //         page: Page,
    //     })
    //     if (Page == 1 && this.state.pages != 1) {
    //         this.setState({
    //             leftPage: false,
    //             rightPage: true,
    //         })
    //         return;
    //     }
    //     else {
    //         this.setState({
    //             leftPage: true,
    //         })
    //     }
    // }
    // 数值
    changeData() {
        $jsonp3(self, api.statistics, {
            msaId: self.state.msaId,
            statisticsDate: this.state.DateSelect,
            taskId: prposData.record.taskId,
            isChild: this.state.isChild,
            page: "1",
        }).then(res => {
            var list = res.data.response.list;
            var count = this.state.AllData.item;
            if (list.length == 0) {
                for (var l in count) {
                    count[l].statisticsValue = 0;
                }
            } else {
                for (var i in list) {
                    for (var l in count) {
                        if (list[i].itemId == count[l].id) {
                            count[l].statisticsValue = list[i].statisticsValue;
                        }
                    }
                }
            }
            var ones = [];
            for (let i = 0; i < count.length - 1; i++) {
                if (count[i].one == count[i + 1].one) {
                    ones.push({
                        title: count[i].one,
                        children: [{
                            title: count[i].two,
                            statisticsValue: count[i].statisticsValue,
                        },]
                    });
                }
                if (count[i].one != count[i + 1].one) {
                    ones.push({
                        title: count[i].one,
                        children: [{
                            title: count[i].two,
                            statisticsValue: count[i].statisticsValue,
                        },]
                    });
                }
                if (i == (count.length - 2)) {
                    ones.push({
                        title: count[count.length - 1].one,
                        children: [{
                            title: count[count.length - 1].two,
                            statisticsValue: count[count.length - 1].statisticsValue,
                        },]
                    });
                }
            }
            if (count.length > 1) {
                // 一级去重
                for (var i = 1; i < ones.length; i++) {
                    if (ones[i].title == ones[i - 1].title) {
                        for (var l in ones[i].children) {
                            ones[i - 1].children.push(ones[i].children[l]);
                        }
                        ones.splice(i, 1);
                        i--;
                    }
                }

                var arr = [];
                // 3个一组
                for (var i = 0; i < ones.length; i++) {
                    var arr1 = [];
                    for (var l in ones[i].children) {
                        if (ones[i].children.length >= 3) {
                            if ((l + 1) % 3 == 0) {
                                arr1.push([ones[i].children[l - 2], ones[i].children[l - 1], ones[i].children[l]]);
                            } else if ((ones[i].children.length - l) < 3 && ones[i].children.length % 3 == 0) {

                            } else if ((ones[i].children.length - l) < 3 && ones[i].children.length % 3 == 1 && (ones[i].children.length - l) == 1) {
                                arr1.push([ones[i].children[ones[i].children.length - 1]]);
                            } else if ((ones[i].children.length - l) < 3 && ones[i].children.length % 3 == 2 && (ones[i].children.length - l) == 2) {
                                arr1.push([ones[i].children[ones[i].children.length - 2], ones[i].children[ones[i].children.length - 1]]);
                            }
                        } else {
                            if (ones[i].children.length % 3 == 0) {
                            } else if (ones[i].children.length % 3 == 1 && (ones[i].children.length - l) == 1) {
                                arr1.push([ones[i].children[ones[i].children.length - 1]]);
                            } else if (ones[i].children.length % 3 == 2 && (ones[i].children.length - l) == 2) {
                                arr1.push([ones[i].children[ones[i].children.length - 2], ones[i].children[ones[i].children.length - 1]]);
                            }
                        }
                    }
                    arr.push({
                        title: ones[i].title,
                        statisticsValue: ones[i].statisticsValue,
                        children: arr1,
                    });
                }
            }
            async function wait(TreeStructure, arr) {
                self.setState({
                    item: arr,
                });
            }
            wait(TreeStructure, arr).then(res => {
                self.treeData();
            })
        })
    }
    // // 加一页
    // rightPage(page) {
    //     let Page = ++page;
    //     this.setState({
    //         page: Page,
    //     })
    //     if (Page == this.state.pages) {
    //         this.setState({
    //             rightPage: false,
    //             leftPage: true,
    //         })
    //         return;
    //     }
    //     else {
    //         this.setState({
    //             rightPage: true,
    //             leftPage: true,
    //         })
    //     }
    // }
    // 选择部门
    treeChoose(value) {
        if (value.length == 0) {
            return
        }
        var ischild;
        if (value[0].split("=")[0] == this.state.UserInfo.departmentId) {
            ischild = 1;
        } else {
            ischild = 2;
        }
        async function wait(value, ischild) {
            self.setState({
                msaId: value[0].split("=")[0],
                msaName: value[0].split("=")[2],
                infoId: value[0].split("=")[1],
                isChild: ischild,
                personal: "",
            });
        }
        wait(value, ischild).then(() => {
            self.sendInfoID();
        })
    }
    // 更改日期状态
    sendInfoID() {
        $jsonp3(self, api.listReceptionDetail, {
            infoId: self.state.infoId,
        }).then(res => {
            let list = res.data.response.list, times = self.state.statisticsTimes, Arr = [], choose = "", chooseScelect = "", size = "", DateSelect = "", DateAll = "", writeInfo = "", infoTime = [];

            if (self.state.infoId == 0) {
                for (let i in times) {
                    times[i].disabled = false;
                    times[i].writeInfo = "";
                    size = self.state.newest;
                    DateSelect = self.state.newest;
                    DateAll = self.state.newestAll;
                }
            } else {
                for (let i in times) {
                    times[i].disabled = true;
                    for (let l in list) {
                        if (list[l].statisticsTime == times[i].title) {
                            times[i].disabled = false;
                            times[i].writeInfo = list[l].info;
                            Arr.push(times[i].title);
                            infoTime.push(times[i].writeInfo);
                        }
                    }
                }
                Arr = Arr.sort(function (a, b) { return a - b });
                chooseScelect = Arr.length != 0 ? false : true;

                size = Arr.length != 0 ? Arr[Arr.length - 1] : "";
                DateSelect = Arr.length != 0 ? Arr[Arr.length - 1] : "";
                DateAll = chooseScelect;
            }
            writeInfo = infoTime.length != 0 ? infoTime[infoTime.length - 1] : "";

            self.setState({
                statisticsTimes: times,
                size: size,
                DateSelect: DateSelect,
                DateAll: DateAll,
                personal: writeInfo,
            }, () => {
                self.changeData();
            })
        })
    }
    // 选择是否为所有日期
    DateChoose(e) {
        async function wait(e) {
            self.setState({
                DateSelect: "",
                size: "",
                DateAll: true,
                personal: "",
            });
        }
        wait(e).then(() => {
            self.changeData();
        })
    }
    // 退回
    backToThe(id) {
        this.setState({
            visible: true,
        });
    }
    // 选择单个日期
    handleSizeChange(e) {
        async function wait(e) {
            self.setState({
                size: e.target.value,
                DateSelect: e.target.value,
                DateAll: false,
                personal: e.target["data-writeInfo"],
            });
        }
        wait(e).then(() => {
            self.changeData();
        })
    }
    // textarea
    Cause(e) {
        this.setState({
            cause: e.target.value,
        })

    }
    // 确认
    handleOk(detailId) {
        // if (this.state.cause == "") {
        //     return message.error("请填写退回原因");
        // }
        if (this.state.Times == "") {
            return message.error("请选择上报时间");
        }
        var loadTime = this.state.Year + "-" + this.state.Month + "-" + this.state.Date + " " + this.state.Time;
        this.setState({
            confirmLoading: true,
        });
        $jsonppost(self, api.returnDetail, {
            detailId: detailId,
            returnDescribe: this.state.cause,
            reReportTime: this.state.Times
        }).then(res => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            if (res.code == 200) {
                message.success("成功退回");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                message.error("退回失败");
            }
        })
    }
    // 取消
    handleCancel = () => {
        this.setState({
            visible: false,
            confirmLoading: false,
        });
    }
    // 上报年份
    YearChange(value) {
        this.setState({
            Year: value
        })

    }
    // 上报月份
    MonthChange(value) {
        this.setState({
            Month: value
        })
    }
    // 上报日份
    DateChange(value) {
        this.setState({
            Date: value
        })
    }
    // 上报时间
    TimeChange(value) {
        this.setState({
            Time: value
        })
    }
    onChange(date, dateString) {
        this.setState({
            Times: dateString
        })

    }
    disabledDate(current) {
        // var date = new Date().getFullYear() + "-" + "0"+(new Date().getMonth() + 1) + "-" + (new Date().getDate() - 1);
        // Can not select days before today and today
        return current && current < Date.now() - 24 * 60 * 60 * 1000;
    }

    back() {
        window.history.back();
    }
    // 渲染
    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div style={{ height: "100%", overflow: "hidden", }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", padding: "15px 0px 0px 15px", zIndex: 1 }}>
                    <Breadcrumb.Item>统计报表</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="main/summary">统计汇总</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>接收</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloat}></div>
                <div style={{ height: "100%", position: "relative" }}>
                    {/* button */}
                    <div className={report.leftButtonWrap} style={{ left: this.state.leftShow == true ? this.state.leftShowWidth : this.state.leftHiddenWidth }} onClick={this.changeWidth.bind(this)}>
                        <img style={{ display: this.state.leftShow == true ? "none" : "inline-block" }} src="../../../ico/toRight.png" alt="" />
                        <img style={{ display: this.state.leftShow == true ? "inline-block" : "none", }} src="../../../ico/toLeft.png" alt="" />
                    </div>
                    {/* left */}
                    <div className={report.leftWidth} style={{ left: this.state.leftShow == true ? this.state.leftHiddenWidth : -(this.state.leftShowWidth), background: "#fff", }}>
                        <Tree onSelect={this.treeChoose.bind(this)} defaultExpandedKeys={[this.state.UserInfo.departmentId + "=" + "0" + "=" + this.state.UserInfo.departmentName]} defaultSelectedKeys={[this.state.UserInfo.departmentId + "=" + "0" + "=" + this.state.UserInfo.departmentName]} disableCheckbox  >
                            <TreeNode title={this.state.UserInfo.departmentName} key={[this.state.UserInfo.departmentId + "=" + "0" + "=" + this.state.UserInfo.departmentName]} value={this.state.UserInfo.departmentId}>
                                {
                                    this.state.departments.map((item, index) => {
                                        return <TreeNode title={`${item.name}(${item.count.split(",")[0]})`} key={item.id + "=" + item.count.split(",")[1] + "=" + item.name} value={item.id} />
                                    })
                                }
                            </TreeNode>
                        </Tree>
                    </div>
                    {/* right */}
                    <div className={report.rightWidth} style={{ width: this.state.rightWidth, paddingBottom: 70 }}>
                        <h1 className={report.MainTitle}>
                            {this.state.AllData.title}
                        </h1>
                        <Row style={{ overflow: "hidden", marginBottom: 10 }}>
                            {/* <Col span={18}> */}
                            <span style={{ display: "inline-block", float: "left", width: "auto", fontSize: "16px", color: "#4d4d4d", padding: "10px 10px 10px 0px" }}>填报日期</span>
                            <div style={{ display: "inline-block", float: "left", width: this.state.widths, height: "50px", overflowY: "hidden", overflowX: "auto", position: "relative", padding: "0px 10px 5px", boxSizing: "content-box" }} >
                                <RadioGroup style={{ whiteSpace: "nowrap", position: "absolute", left: -(this.state.page - 1) * this.state.widths, borderRadius: 0 }} value={this.state.size} onChange={this.handleSizeChange}>
                                    {
                                        this.state.statisticsTimes.map((item, index) => {
                                            return <RadioButton className={report.subButton} data-value={item.title} data-writeInfo={item.writeInfo} key={index} value={item.title} disabled={item.disabled}>{item.title}</RadioButton>
                                        })
                                    }

                                </RadioGroup>
                            </div>

                            {/* <ButtonGroup style={{ display: "inline-block", float: "left", visibility: this.state.pageShow == true ? "visible" : "hidden" }}>
                                <Button className={report.subArrow} icon={"left"} onClick={this.leftPage.bind(this, this.state.page)} disabled={!this.state.leftPage}></Button>
                                <Button className={report.subArrow} icon={"right"} onClick={this.rightPage.bind(this, this.state.page)} disabled={!this.state.rightPage}></Button>
                            </ButtonGroup> */}
                            <Button style={{ fontSize: "16px", margin: "10px 0px 10px 40px", float: "right" }} type={this.state.DateAll ? "primary" : ""} ghost={this.state.DateAll} data-value={""} onClick={this.DateChoose.bind(this)} >
                                <i>
                                    <img style={{ verticalAlign: "center", float: "left", margin: "4px 10px 0px 0px", verticalAlign: "middle" }} src={!this.state.DateAll ? "../../../ico/summary_Button_Date_Selected.png" : "../../../ico/summary_Button_Date_NoSelected.png"} alt="" />
                                </i>所有日期汇总</Button>
                            {/* </Col> */}
                        </Row>
                        <h3 className={report.subtitleLeft}>
                            {this.state.msaName} {this.state.DateSelect == "" ? "所有日期汇总" : this.state.DateSelect}
                        </h3>
                        {
                            this.state.item.map((item, index) => {
                                return <table className={report.tables} style={{ border: "1px solid #aaa", width: "100%" }} key={index}>
                                    <thead>
                                        <tr>
                                            <th colSpan={3}>
                                                <img src="../../../ico/summary_icon.png" alt="" />
                                                <strong>
                                                    {item.title}
                                                </strong>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            item.children.map((it, ind) => {
                                                return <tr key={ind}>
                                                    {
                                                        it.map((a, b) => {
                                                            return <td key={b}>
                                                                <span>
                                                                    {a.title}
                                                                    <b>
                                                                        <time>{a.statisticsValue}</time>
                                                                        <img src="../../../ico/summary_bar.png" alt="" />
                                                                    </b>
                                                                </span>
                                                            </td>
                                                        })
                                                    }
                                                </tr>
                                            })
                                        }
                                    </tbody>

                                </table>
                            })
                        }
                        {
                            this.state.personal != "" ? <p className={report.textRight}>
                                <time>
                                    <span>填报人&emsp;{this.state.personal.split(",")[1]}</span>
                                    <span>联系方式&emsp;{this.state.personal.split(",")[2]}</span>
                                    <span>报出时间&emsp;{this.state.personal.split(",")[3]}</span>
                                </time>
                            </p> : ""
                        }
                        {
                            this.state.personal != "" ? <p className={report.textRight}>
                                <span style={{ width: 52, display: "inline-block", color: "#F5232E", }} onClick={this.backToThe.bind(this, this.state.personal.split(",")[0])}>
                                    <Button shape="circle" size="large" type="danger" icon="close"></Button>
                                    {/* <br /> */}
                                    <span className={report.colorRed}>退回</span>
                                </span>
                                <Modal
                                    title={this.state.AllData.title}
                                    visible={visible}
                                    onOk={this.handleOk.bind(this, this.state.personal.split(",")[0])}
                                    confirmLoading={confirmLoading}
                                    onCancel={this.handleCancel}
                                    okText={"退回"}
                                    okType={"danger"}
                                    autoFocusButton={"cancel"}
                                >
                                    <p>将{this.state.DateSelect}的报表退回给{this.state.msaName}</p>
                                    <div style={{ padding: "10px 0px", width: "100%", }}>
                                        <span>退回原因</span>
                                        <Input.TextArea style={{
                                            width: "50%", marginLeft: 30
                                        }} onChange={this.Cause.bind(this)}></Input.TextArea>
                                    </div>

                                    <div >上报时间
                                    {/* <Select onChange={this.YearChange.bind(this)} style={{ width: "100px" }} placeholder={"年"}>
                                            <Option value="2019">2019年</Option>
                                            <Option value="2020">2020年</Option>
                                            <Option value="2021">2021年</Option>
                                            <Option value="2022">2022年</Option>
                                        </Select>
                                        <Select onChange={this.MonthChange.bind(this)} style={{ width: "60px" }} placeholder={"月"}>
                                            
                                            {
                                                this.state.monthS.map(item => {
                                                    return <Option value={item + ""} key={item + ""}>{item}月</Option>
                                                })
                                            }
                                        </Select>
                                        <Select onChange={this.DateChange.bind(this)} style={{ width: "60px" }} placeholder={"日"}>
                                            {
                                                this.state.monthS.map(item => {
                                                    return <Option value={item + ""} key={item + ""}>{item}日</Option>
                                                })
                                            }
                                        </Select>
                                        <Select onChange={this.TimeChange.bind(this)} style={{ width: "70px" }} placeholder={"时"}>
                                            {
                                                this.state.timeS.map(item => {
                                                    return <Option value={item + ":00"} key={item + "：00"}>{item}</Option>
                                                })
                                            }
                                        </Select> */}
                                        <DatePicker
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            placeholder="选择时间" disabledDate={this.disabledDate} style={{ width: "50%", marginLeft: 30 }} showToday={false}
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </div>
                                </Modal>
                            </p> : ""
                        }
                    </div>
                </div>F
            </div>
        )
    }
}
function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

function disabledDateTime() {
    var h = new Date().getHours();
    return {
        disabledHours: () => range(0, h + 1),
        disabledMinutes: () => range(1, 60),
        disabledSeconds: () => range(1, 60),
    };
}