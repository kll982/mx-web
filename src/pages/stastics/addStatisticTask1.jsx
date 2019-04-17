import React from 'react';
import moment from "moment";

moment.locale('zh-cn');
import {Breadcrumb, Row, Col, Select, Input, DatePicker, TreeSelect, Button, message, Icon} from 'antd';

const Option = Select.Option;
const {TextArea} = Input;
const {MonthPicker, RangePicker} = DatePicker;
const TreeNode = TreeSelect.TreeNode;
import {Link, hashHistory} from 'react-router';

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from '../../utils/api.js';

import beard from '../../img/Breadcrumbsymbol.jpg'
import publicstyle from '../../img/public.less'
import styles from '../businessmanage/addcompanyNew.less'
import Singlepersonselect from '../../components/singlepersonselect1.jsx'
import companypng from "../../img/company.png"
import departmentpng from "../../img/department.png"
import emppng from "../../img/emp.png"
import styles1 from "../../components/common.less"

let self;


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
});

class addStatisticTask extends React.Component {
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
            statisticsMsaId: "",
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

            dayDisplay: "none",
            monthDisplay: "none"

        }
    }

    componentWillMount() {
        this.fetchTemplate();
        this.fetchMsaInfos();
        if (self.props.location.state.top == "edit") {
            var statisticTask = JSON.parse(sessionStorage.getItem("statisticTask"));
            this.setState({
                id: statisticTask.id,
                statisticsMsaId: statisticTask.statisticsMsaId,
                codeName: statisticTask.code == 100 ? "水上交通安全监督情况统计汇总表" : "通航安全业务工作量统计表",
                templateCode: statisticTask.code + "=" + statisticTask.statisticsType + "=" + statisticTask.name,
                statisticsTitle: statisticTask.name,
                statisticYear: statisticTask.year,
                startDay: statisticTask.startDay,
                endDay: statisticTask.endDay,
                months: statisticTask.months,
                disabled: true,
            });
            this.setTemplateCode(statisticTask.code + "=" + statisticTask.statisticsType + "=" + statisticTask.name);
        } else {
            this.setState({
                startDay: moment().format("YYYY-MM-DD"),
                endDay: moment().format("YYYY-MM-DD"),
            });
            this.setTemplateCode("");
        }
    }

    handleSubmit = (e) => {

        if (!self.state.statisticsMsaId) {
            message.error("请选择填报单位");
            return;
        }

        self.setState({
            loading: true
        })

        if (self.props.location.state.top == "add") {
            $jsonppost(self, api.addNewTask, {
                templateCode: self.state.templateCode.split("=")[0],
                statisticsTitle: self.state.statisticsTitle,
                statisticsMsaId: self.state.statisticsMsaId,
                startDay: self.state.startDay,
                endDay: self.state.endDay,
                months: self.state.months,
                statisticsYear: self.state.statisticYear
            }).then((res) => {
                hashHistory.push({
                    pathname: 'main/statictisTask',
                    state: {
                        current: ""
                    }
                })
            }).catch((error) => {
                self.setState({
                    loading: false
                })
            })
        }
        else {
            $jsonppost(self, api.updateNewTask, {
                TaskId: self.state.id,
                templateCode: self.state.templateCode.split("=")[0],
                statisticsTitle: self.state.statisticsTitle,
                statisticsMsaId: self.state.statisticsMsaId,
                startDay: self.state.startDay,
                endDay: self.state.endDay,
                months: self.state.months,
                statisticsYear: self.state.statisticYear
            }).then((res) => {
                hashHistory.push({
                    pathname: 'main/statictisTask',
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


    //根据模板编码返回所有待部门
    fetchMsaInfos(templateCode1) {
        $jsonp3(self, api.listDepartmentByUser, {
            templateCode: templateCode1
        }).then((res) => {
            self.setState({
                departments: res.data.response.list,
            });
        });
    }

    //获取所有的报表模板
    fetchTemplate() {
        $jsonp3(self, api.getAllTemplates, {}).then((res) => {
            self.setState({
                allTemplates: res.data.response.specialStatisticsTemplates,
            });
        });
    }

    setStatictisYear(value) {
        if (!value) {
            message.warning("报表年份必填");
            self.setState({
                statictisYearValidStatus: "error"
            })
        }
        else {
            self.setState({
                statisticYear: value,
                statictisYearValidStatus: "success"

            });
        }
    }

    setStatisticTitle(e) {
        self.setState({
            statisticsTitle: e.target.value
        });
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

    setMonths(endDayMement, endDayStr) {
        self.setState({
            months: endDayStr
        });
    }

    disabledStartDay(choosedStartDayMoment) {
        const endDay = moment(self.state.endDay);
        if (!endDay || !choosedStartDayMoment) {
            return false;
        }
        return choosedStartDayMoment.valueOf() > endDay.valueOf();
    }

    disabledEndDay(choosedEndDayMoment) {
        const endDay = moment(self.state.endDay);
        if (!endDay || !choosedEndDayMoment) {
            return false;
        }
        return choosedEndDayMoment.valueOf() > endDay.valueOf();
    }

    onMonthsCheck(monthsArray) {
        if (!monthsArray || monthsArray.length == 0) {

            message.warning("统计日期必填");
            self.setState({
                statictisMonthsValidStatus: "error"
            })
        }
        else {
            self.setState({
                statictisMonthsValidStatus: "success",
                months: monthsArray.join(",")
            })
        }
    }

    onMsaIdCheck = (msaIdArray) => {
        self.setState({
            statisticsMsaId: msaIdArray.join(",")
        })
        console.log(msaIdArray, self.state.statisticsMsaId)
    }

    setTemplateCode(value) {
        if (!value) {
            message.warning("报表模板必填");
            self.setState({
                templateCodeValidStatus: "error"
            });
        }
        else {
            let val = value.split("=");
            self.setState({
                templateCode: value,
                templateType: val[1],
                name: val[2],
                templateCodeValidStatus: "success"
            });

            if (val[1] == "1") {
                self.setState({
                    dayDisplay: "none",
                    monthDisplay: "block"
                });
            }
            else {
                self.setState({
                    dayDisplay: "block",
                    monthDisplay: "none",
                });
            }
            self.fetchMsaInfos(val[0]);

        }
    }

    cancel = () => {
        var eeee = self.props.location.state;
        hashHistory.push({
            pathname: 'main/statictisTask',
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

        const treeMonthData = [{
            title: '01月',
            value: '01',
            key: '01',
        },
            {
                title: '02月',
                value: '02',
                key: '02',
            },
            {
                title: '03月',
                value: '03',
                key: '03',
            },
            {
                title: '04月',
                value: '04',
                key: '04',
            },
            {
                title: '05月',
                value: '05',
                key: '05',
            },
            {
                title: '06月',
                value: '06',
                key: '06',
            },
            {
                title: '07月',
                value: '07',
                key: '07',
            },
            {
                title: '08月',
                value: '08',
                key: '08',
            },
            {
                title: '09月',
                value: '09',
                key: '09',
            },
            {
                title: '10月',
                value: '10',
                key: '10',
            },
            {
                title: '11月',
                value: '11',
                key: '11',
            },
            {
                title: '12月',
                value: '12',
                key: '12',
            }];

        return (
            <div>

                <Breadcrumb separator=">" style={{textAlign: "left"}}>
                    <Breadcrumb.Item><Link to="main/statictisTask">报表管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{self.props.location.state.top == "add" ? "新增报表" : "编辑报表"}</Breadcrumb.Item>
                </Breadcrumb>
                <div className={publicstyle.clearfloat}></div>

                <div className={styles.form1}>
                    <dl className={styles.formitem1} style={{display: this.state.showStatus ? "none" : "block"}}>
                        <span className={styles.bitian}><i></i>选择报表：</span>
                        <Select style={{width: "200px"}} placeholder="请选择模板" onChange={this.setTemplateCode}
                                value={this.state.templateCode.split("=")[0] == "" ? "" : this.state.templateCode.split("=")[0] == 100 ? "水上交通安全监督情况统计汇总表" : "通航安全业务工作量统计表"}>
                            {this.state.allTemplates.map((item, index) => {
                                return <Option value={item.code + "=" + item.statistics_type + "=" + item.name}
                                               key={item.code}>{item.name}</Option>
                            })}
                        </Select>
                    </dl>
                    <dl className={styles.formitem1}>
                        <span className={styles.bitian}><i></i>报表名称：</span>
                        <TextArea rows={4} style={{width: "200px"}} onChange={this.setStatisticTitle}
                                  value={this.state.statisticsTitle}/>
                    </dl>
                    <dl className={styles.formitem1}>
                        <span className={styles.bitian}><i></i>报表年份：</span>
                        <Select style={{width: "200px"}} value={this.state.statisticYear} placeholder="请选择报表年份"
                                onChange={this.setStatictisYear}>
                            <Option value="2018">2018</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2020">2020</Option>
                            <Option value="2021">2021</Option>
                        </Select>
                    </dl>


                    <dl className={styles.formitem1} style={{display: this.state.dayDisplay}}>
                        <span className={styles.bitian}><i></i>统计日期：</span>
                        <DatePicker style={{width: "200px"}}
                                    value={this.state.startDay ? moment(this.state.startDay) : moment()}
                                    onChange={this.setStartDay}/>
                    </dl>


                    <dl className={styles.formitem1} style={{display: this.state.dayDisplay}}>
                        <span className={styles.bitian}><i></i>至：</span>
                        <DatePicker style={{width: "200px"}}
                                    value={this.state.endDay ? moment(this.state.endDay) : moment()}
                                    onChange={this.setEndDay}/>
                    </dl>

                    <dl className={styles.formitem1} style={{display: this.state.monthDisplay}}>
                        <span className={styles.bitian}><i></i>统计日期：</span>
                        <TreeSelect style={{width: "200px"}} treeCheckable={true} onChange={this.onMonthsCheck}
                                    value={this.state.months.split(",")}>
                            <TreeNode title="所有月份" key="13" value="13">
                                {treeMonthData.map((item, index) => {
                                    return <TreeNode title={item.title} key={item.key} value={item.value}/>
                                })}
                            </TreeNode>
                        </TreeSelect>
                    </dl>
                    <dl className={styles.formitem1}>
                        <span className={styles.bitian}><i></i>填报单位：</span>

                        <TreeSelect style={{width: "200px"}} treeCheckable={true} onChange={this.onMsaIdCheck}
                                    value={this.state.statisticsMsaId.split(",")}>
                            <TreeNode title="所有" key="all" value="all">
                                {this.state.departments.map((item, index) => {
                                    return <TreeNode title={item.name} key={item.id + ""} value={item.id + ""}/>

                                })}
                            </TreeNode>
                        </TreeSelect>
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
                </div>
            </div>

        )
    }
}

export default addStatisticTask;

