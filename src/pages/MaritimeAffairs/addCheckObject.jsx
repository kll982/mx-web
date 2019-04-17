// 报表管理
import React from "react";
import moment from "moment";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Button, Input, Select, TreeSelect, DatePicker, message } from "antd";

// less
import MaritimeAffairs from "../MaritimeAffairs/MaritimeAffairs.less"
import publicstyle from "../../img/public.less";
import stylez from '../../container/index.less';
import report from "../report/report.less";
import styles2 from "../admin/index.less";
import styles from "../stastics/taskIndex.less";
import PageStyles from "../stastics/taskIndex.less";
import Cardstyles from '../businessmanage/addcompanyNew.less';

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";


let self, propsData = {};
const Option = Select.Option, TreeNode = TreeSelect.TreeNode;

export default class AddCheckObject extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            allLevel: [],
            ChildrenMsa: [],

            title: "",
            levelValue: "",
            operator: "",
            operatorPhone: "",
            MsaNameValue: "",
            location: "",
            createTime: null,
            // 渡口渡船
            shipsName: "",
            busload: "",
            // 水上水下游览经营
            unit: "",
            // 水上加油站
            employeeCount: "",
            managerCount: "",
            credentialCount: "",
            machineCount: "",
            gunCount: "",
            systemName: "",
            // 水上加油船
            shipLoad: "",
            // 游艇俱乐部
            yachtCount: "",
        }
    }
    // 挂载前
    componentWillMount() {
        propsData = this.props.location.state;
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (propsData.edit == false) {
            this.setState({
                propsData: propsData,
                userInfo: userInfo,

                MsaNameValue: userInfo.departmentId,
                MsaName: userInfo.departmentId == 1 ? "" : userInfo.departmentName,
            }, () => {
                this.getLevel();
                this.getChildrenMsa();
            })
        } else {
            this.setState({
                propsData: propsData,
                userInfo: userInfo,

                title: propsData.record.title,
                levelName: propsData.record.levelName,
                levelValue: propsData.record.sortLevelId,
                operator: propsData.record.operator == "--" ? "" : propsData.record.operator,
                operatorPhone: propsData.record.operatorPhone == "--" ? "" : propsData.record.operatorPhone,
                MsaNameValue: propsData.record.msaId,
                MsaName: propsData.record.msaName,
                location: propsData.record.location == "--" ? "" : propsData.record.location,

                // 渡口渡船
                shipsName: propsData.record.other.shipsName,
                busload: propsData.record.other.busload,
                // 水上水下游览经营
                unit: propsData.record.unit == "--" ? "" : propsData.record.unit,
                createTime: (propsData.record.recordTime == "--" || !!!propsData.record.recordTime) ? null : propsData.record.recordTime,
                // 水上加油站
                employeeCount: propsData.record.other.employeeCount,
                managerCount: propsData.record.other.managerCount,
                credentialCount: propsData.record.other.credentialCount,
                machineCount: propsData.record.other.machineCount,
                gunCount: propsData.record.other.gunCount,
                systemName: propsData.record.other.systemName,
                // 水上加油船
                shipLoad: propsData.record.other.shipLoad,
                // 游艇俱乐部
                yachtCount: propsData.record.other.yachtCount,
                // 水路危险货物运输企业
                isSystem: propsData.record.other.isSystem,
            }, () => {
                this.getLevel();
                this.getChildrenMsa();
            })
        }

    }
    // 挂载后
    componentDidMount() {
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
    getLevel() {
        $jsonp3(self, api.listSortLevelBySortIdAndMsaId, {
            sortId: this.state.propsData.sortId,
            msaId: this.state.MsaNameValue,
        }).then(res => {
            if (res.code == 200) {
                let arr = res.data.response.list;
                this.setState({
                    allLevel: arr,
                })
            }
        })
    }

    getChildrenMsa() {
        $jsonp3(self, api.listDepartmentByUser, {}).then(res => {
            let list = res.data.response.list;
            this.setState({
                ChildrenMsa: list
            })
        })
    }

    back() {
        hashHistory.push({
            pathname: "/main/library",
            state: {
                checkName: propsData.checkName,
                sortId: propsData.sortId,
                pageNum: propsData.pageNum,

                nameValue: propsData.nameValue,
                msaId: propsData.msaId,
                sortId: propsData.sortId,
                levelValue: propsData.levelValue,
                MsaNameValue: propsData.MsaNameValue,
                riskLevelValue: propsData.riskLevelValue,
            }
        })
    }

    // 数字
    NotNumber(value) {
        var reg = /^[0-9]+$/g;
        return reg.test(value);
    }

    selectLevel(value) {
        this.setState({
            levelName: value,
            levelValue: value
        })
    }

    selectMsaName = (value) => {
        this.setState({
            MsaNameValue: value,
            MsaName: value,
            levelName: "",
            levelValue: "",
        }, () => {
            this.getLevel();
        })
    }

    // 名称
    changeTitle(e) {
        this.setState({
            title: e.target.value,
        })
    }
    changeOperator(e) {
        this.setState({
            operator: e.target.value,
        })
    }
    changeOperatorMobile(e) {
        this.setState({
            operatorPhone: e.target.value,
        })
    }
    ChangeLocation(e) {
        this.setState({
            location: e.target.value,
        })
    }
    ChangeShipsName(e) {
        this.setState({
            shipsName: e.target.value,
        })
    }
    changeBusload(e) {
        this.setState({
            busload: e.target.value,
        })
    }
    ChangeUnitName(e) {
        this.setState({
            unit: e.target.value,
        })
    }
    ChangeTime(data, dataStr) {
        this.setState({
            createTime: moment(dataStr, "YYYY-MM-DD"),
        })
    }
    ChangeEmployeeCount(e) {
        this.setState({
            employeeCount: e.target.value,
        })
    }
    ChangeManagerCount(e) {
        this.setState({
            managerCount: e.target.value,
        })
    }
    ChangeCredentialCount(e) {
        this.setState({
            credentialCount: e.target.value,
        })
    }
    ChangeMachineCount(e) {
        this.setState({
            machineCount: e.target.value,
        })
    }
    ChangeGunCount(e) {
        this.setState({
            gunCount: e.target.value,
        })
    }
    ChangeSystemName(e) {
        this.setState({
            systemName: e.target.value,
        })
    }
    ChangeShipLoad(e) {
        this.setState({
            shipLoad: e.target.value,
        })
    }
    ChangeYachtCount(e) {
        this.setState({
            yachtCount: e.target.value,
        })
    }
    selectSystem(isSystem) {
        this.setState({
            isSystem,
        })
    }
    save() {
        if (!!!this.state.title) {
            return message.error("请输入检查对象名称")
        }
        if (!!!this.state.levelValue) {
            return message.error("请选择等级")
        }
        if (!!!this.state.MsaNameValue) {
            return message.error("请输入检查对象所在辖区")
        }
        if (!!!this.state.location) {
            return message.error("请输入检查对象 地址/作业海域")
        }
        let reg = /^1(3|4|5|7|8)\d{9}$/;
        if (!!this.state.operatorPhone && reg.test(this.state.operatorPhone) == false) {
            return message.error("请输入正确的运营人手机号码")
        }
        // 渡口渡船
        if (!!this.state.busload && this.NotNumber(this.state.busload) == false) {
            return message.error("请输入正确的载客定额")
        }

        // 水上水下

        // 水上加油站
        if (!!this.state.employeeCount && this.NotNumber(this.state.employeeCount) == false) {
            return message.error("请输入正确的职工人数")
        }
        if (!!this.state.managerCount && this.NotNumber(this.state.managerCount) == false) {
            return message.error("请输入正确的安全管理人员人数")
        }
        if (!!this.state.credentialCount && this.NotNumber(this.state.credentialCount) == false) {
            return message.error("请输入正确的持证上岗人数")
        }
        if (!!this.state.machineCount && this.NotNumber(this.state.machineCount) == false) {
            return message.error("请输入正确的加油机数量")
        }
        if (!!this.state.gunCount && this.NotNumber(this.state.gunCount) == false) {
            return message.error("请输入正确的加油枪数量")
        }

        // 水上加油船
        if (!!this.state.shipLoad && this.NotNumber(this.state.shipLoad) == false) {
            return message.error("请输入正确的船舶吨位")
        }

        // 游艇俱乐部
        if (!!this.state.yachtCount && this.NotNumber(this.state.yachtCount) == false) {
            return message.error("请输入正确的游艇数")
        }

        let datas = {
            name: this.state.title,
            sortId: this.state.propsData.sortId,
            sortLevelId: this.state.levelValue,
            location: this.state.location,
            msaId: Number(this.state.MsaNameValue),
            operator: this.state.operator,// 运营人
            operatorPhone: this.state.operatorPhone,// 运营人手机
        }, excess = {};


        if (this.state.propsData.sortId == 1) {
            excess = {
                shipsName: this.state.shipsName,
                busload: this.state.busload,
            }
        } else if (this.state.propsData.sortId == 2 || this.state.propsData.sortId == 3) {
            excess = {
                unit: this.state.unit,
                recordTime: this.state.createTime,
            }
        } else if (this.state.propsData.sortId == 8) {
            excess = {
                employeeCount: this.state.employeeCount,
                managerCount: this.state.managerCount,
                credentialCount: this.state.credentialCount,
                machineCount: this.state.machineCount,
                gunCount: this.state.gunCount,
            }
        }
        else if (this.state.propsData.sortId == 9) {
            excess = {
                shipLoad: this.state.shipLoad,
            }
        }
        else if (this.state.propsData.sortId == 11) {
            excess = {
                yachtCount: this.state.yachtCount,
            }
        } else if (this.state.propsData.sortId == 14) {
            excess = {
                isSystem: this.state.isSystem
            }
        }
        Object.assign(datas, excess);

        if (this.state.propsData.edit == true) {
            datas.id = this.state.propsData.record.id;

            // 编辑
            $jsonppost(self, api.updateCompanyInfo, datas
            ).then(res => {
                if (res.code == 200 && res.data.response.succ == "ok") {
                    message.success("成功修改此检查对象")

                    hashHistory.push({
                        pathname: "/main/library",
                        state: {
                            checkName: propsData.checkName,
                            sortId: propsData.sortId,
                            pageNum: propsData.pageNum,

                            nameValue: propsData.nameValue,
                            msaId: propsData.msaId,
                            sortId: propsData.sortId,
                            levelValue: propsData.levelValue,
                            MsaNameValue: propsData.MsaNameValue,
                            riskLevelValue: propsData.riskLevelValue,
                        }
                    })
                }
            })

        } else {
            // 新增
            $jsonppost(self, api.addCompanyInfo, datas
            ).then(res => {
                if (res.code == 200 && res.data.response.succ == "ok") {
                    message.success("成功添加此检查对象")

                    hashHistory.push({
                        pathname: "/main/library",
                        state: {
                            checkName: propsData.checkName,
                            sortId: propsData.sortId,
                            pageNum: propsData.pageNum,
                        }
                    })
                }
            })
        }
    }

    // 渲染
    render() {
        let Company = this.state.propsData.sortId == 2 || this.state.propsData.sortId == 3 || this.state.propsData.sortId == 12;
        return (
            <div className={stylez.wrapPadding} style={{ padding: "0px", position: "relative" }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", background: "white", padding: "15px" }}>
                    <Breadcrumb.Item>检查项目管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查对象名录库</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.propsData.edit == true ? "编辑对象" : "新增对象"}</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloatTop}></div>

                <div className={Cardstyles.form1}>
                    <dl className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}><i></i>名称：</span>
                        <Input style={{ width: "50%" }} defaultValue={this.state.title} onChange={this.changeTitle.bind(this)} placeholder={Company ? "请输入活动名称" : "请输入单位名称"}></Input>
                    </dl>
                    <dl className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}><i></i>所属海事局：</span>
                        <TreeSelect style={{ width: "50%" }} onChange={this.selectMsaName.bind(this)} value={this.state.MsaName} placeholder={"请输入选择所属海事局"} treeDefaultExpandAll>
                            <TreeNode value={this.state.userInfo.departmentId
                                + ""} key={this.state.userInfo.departmentName} title={this.state.userInfo.departmentName} disabled={this.state.userInfo.departmentId == 1}>
                                {
                                    this.state.ChildrenMsa.map(item => {
                                        return <treeNode value={item.id + ""} title={item.name} key={item.id + ""} />
                                    })
                                }
                            </TreeNode>
                        </TreeSelect>
                    </dl>
                    <dl className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}><i></i>等级：</span>
                        <Select style={{ width: "50%" }} onChange={this.selectLevel.bind(this)} value={this.state.levelName} placeholder={"请选择等级"}>
                            {
                                this.state.allLevel.map((item, index) => {
                                    return <Option key={item.id + ""} value={item.id + ""} disabled={item.status == 0}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </dl>
                    <dl className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>运营人：</span>
                        <Input style={{ width: "50%" }} onChange={this.changeOperator.bind(this)} value={this.state.operator} placeholder={"请输入运营人姓名"}></Input>
                    </dl>
                    <dl className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>运营人手机：</span>
                        <Input style={{ width: "50%" }} onChange={this.changeOperatorMobile.bind(this)} value={this.state.operatorPhone} maxLength="11" placeholder={"请输入运营人手机号"}></Input>
                    </dl>

                    <dl className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}><i></i>地址/作业海域：</span>
                        <Input value={this.state.location} onChange={this.ChangeLocation.bind(this)} style={{ width: "50%" }} placeholder={"请填写单位地址"}></Input>
                    </dl>
                    {/* 渡口渡船 */}
                    <dl style={{ display: this.state.propsData.sortId == 1 ? "block" : "none" }} className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>渡船船名：</span>
                        <Input value={this.state.shipsName} onChange={this.ChangeShipsName.bind(this)} style={{ width: "50%" }} placeholder={"请输入船名"}></Input>
                    </dl>
                    <dl style={{ display: this.state.propsData.sortId == 1 ? "block" : "none" }} className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>载客定额：</span>
                        <Input value={this.state.busload} onChange={this.changeBusload.bind(this)} style={{ width: "50%" }} placeholder={"请填写数量"}></Input>
                    </dl>

                    {/* 水上水下游览经营 */}
                    <dl style={{ display: Company ? "block" : "none" }} className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>游览经营单位：</span>
                        <Input value={this.state.unit} onChange={this.ChangeUnitName.bind(this)} style={{ width: "50%" }} placeholder={"请输入经营单位名称"}></Input>
                    </dl>
                    <dl style={{ display: Company ? "block" : "none" }} className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>备案时间：</span>
                        <DatePicker style={{ width: "50%" }}
                            format="YYYY-MM-DD"
                            placeholder="选择备案时间"
                            onChange={this.ChangeTime.bind(this)}
                            value={this.state.createTime}
                        />
                    </dl>
                    {/* 水上加油站 */}
                    <dl style={{ display: this.state.propsData.sortId == 8 ? "block" : "none" }} className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>职工人数：</span>
                        <Input value={this.state.employeeCount} onChange={this.ChangeEmployeeCount.bind(this)} style={{ width: "50%" }} placeholder="请输入数量"></Input>
                    </dl>
                    <dl style={{ display: this.state.propsData.sortId == 8 ? "block" : "none" }} className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>安全管理人员：</span>
                        <Input value={this.state.managerCount} onChange={this.ChangeManagerCount.bind(this)} style={{ width: "50%" }} placeholder="请输入数量"></Input>
                    </dl>
                    <dl style={{ display: this.state.propsData.sortId == 8 ? "block" : "none" }} className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>持证上岗人员：</span>
                        <Input value={this.state.credentialCount} onChange={this.ChangeCredentialCount.bind(this)} style={{ width: "50%" }} placeholder="请输入数量"></Input>
                    </dl>
                    <dl style={{ display: this.state.propsData.sortId == 8 ? "block" : "none" }} className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>加油机数量：</span>
                        <Input value={this.state.machineCount} onChange={this.ChangeMachineCount.bind(this)} style={{ width: "50%" }} placeholder="请输入数量"></Input>
                    </dl>
                    <dl style={{ display: this.state.propsData.sortId == 8 ? "block" : "none" }} className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>加油枪数量：</span>
                        <Input value={this.state.gunCount} onChange={this.ChangeGunCount.bind(this)} style={{ width: "50%" }} placeholder="请输入数量"></Input>
                    </dl>
                    <dl style={{ display: this.state.propsData.sortId == 8 ? "block" : "none" }} className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>主要管理制度名称：</span>
                        <Input value={this.state.systemName} onChange={this.ChangeSystemName.bind(this)} style={{ width: "50%" }} placeholder="请填写制度名称"></Input>
                    </dl>

                    {/* 水上加油船 */}
                    <dl style={{ display: this.state.propsData.sortId == 9 ? "block" : "none" }} className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>船舶吨位：</span>
                        <Input value={this.state.shipLoad} onChange={this.ChangeShipLoad.bind(this)} style={{ width: "50%" }} placeholder="请输入数量"></Input>
                    </dl>
                    {/* 游艇俱乐部 */}
                    <dl style={{ display: this.state.propsData.sortId == 11 ? "block" : "none" }} className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>拥有游艇数：</span>
                        <Input value={this.state.yachtCount} onChange={this.ChangeYachtCount.bind(this)} style={{ width: "50%" }} placeholder="请输入数量"></Input>
                    </dl>

                    {/* 水路危险货物运输企业 */}
                    <dl style={{ display: this.state.propsData.sortId == 14 ? "block" : "none" }} className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}>是否体系：</span>
                        <Select style={{ width: "50%" }} onChange={this.selectSystem.bind(this)} value={this.state.isSystem} placeholder={"请选择等级"}>
                            <Option value={"是"}>是</Option>
                            <Option value={"否"}>否</Option>
                        </Select>
                    </dl>

                    {/* button */}
                    <dl className={styles.formitem1} style={{ textAlign: "center" }}>
                        <Button type="primary" size="large" className={publicstyle.button + " " + styles.button + " " + MaritimeAffairs.ButtonMargin}
                            onClick={this.save.bind(this)} loading={this.state.loading}>
                            保存
                        </Button>
                        <Button size="large" className={publicstyle.button + " " + styles.button + " " + MaritimeAffairs.ButtonMargin} onClick={this.back}>
                            取消
                        </Button>
                    </dl>
                </div>
            </div>
        )

    }
}