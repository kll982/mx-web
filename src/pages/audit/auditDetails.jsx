// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import moment from 'moment';
import { Breadcrumb, Input, Button, Modal, DatePicker, message } from "antd";

import publicstyle from "../../img/public.less";
import styles from "../stastics/taskIndex.less";
import styles1 from '../businessmanage/addcompanyNew.less';
import styles2 from "../admin/index.less";
import report from "../report/report.less";
import audit from "../audit/audit.less";

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import $ from 'jquery';

import api from "../../utils/api";

const { TextArea } = Input, dateFormat = 'YYYY-MM-DD', monthFormat = 'YYYY-MM', yearFormat = 'YYYY', timeFormat = "YYYY-MM-DD hh:mm:ss";

let self, prposData;

export default class auditDetails extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            visible: false,
            confirmLoading: false,
            prposData: {
                auditIt: "",
                reviewId: "",
            },
            // defaultTimeValue: Date.now() + 24 * 60 * 60 * 1000 * 7,
            // defaultTimeValue: "",
            datas: {
                before_result: "",
                after_pic: "",
                before_location: "",
                before_reviewTime: "",
                before_pic: [],
                after_pic: [],
                after_location: "",
                before_require: "",
                after_result: "",
                before_describe: "",
                before_result: "",
                after_uploadTime: "",
                after_describe: "",
            },
            result: "",
            Times: null,
        }
    }
    // 挂载前
    componentWillMount() {
        prposData = self.props.location.state;
        var Default = this.getDates(Date.now() + 24 * 60 * 60 * 1000 * 7);
        // console.log(Default)
        this.setState({
            prposData: prposData,
            defaultTimeValue: Default,
            Times: Default,
        })
        this.getData();
    }
    // 挂载后
    componentDidMount() {
    }
    // 改变值时
    componentDidUpdate() {
        var L = this.refs.leftBlock, R = this.refs.rightBlock;
        // setTimeout(function () {
        //     if (L.offsetHeight >= R.offsetHeight) {
        //         R.style.height = L.offsetHeight + "px";
        //     } else if (L.offsetHeight < R.offsetHeight) {
        //         L.style.height = R.offsetHeight + "px";
        //     }
        // }, 0)
    }
    getData() {
        $jsonp3(self, api.getReviewDetailForPass, {
            reviewId: prposData.reviewId,
        }).then(res => {
            if (res.code == 200) {
                var datas = res.data.response;
                if (datas.before_pic == null) {
                    datas.before_pic = [];
                }
                if (datas.after_pic == null) {
                    datas.after_pic = [];
                }
                let PassCode;
                if (datas.isPass == "通过") {
                    PassCode = true;
                } else {
                    PassCode = false;
                }
                this.setState({
                    datas: datas,
                    PassCode: PassCode,
                })
            } else {
                message.info(res.message)
            }
        })
    }
    // 通过与否
    pass(value) {
        if (value == 3) {
            $jsonppost(self, api.checkPass, {
                reviewId: prposData.reviewId,
                isPass: value
            }).then(res => {
                if (res.code == 200) {
                    message.success("操作成功");
                    window.history.back();
                } else {
                    message.error(res.message);
                }
            })
        } else if (value == 2) {
            this.setState({
                visible: true,
                passCode: 2,
            });
        }
    }
    // 确认
    handleOk() {
        if (this.state.result == "") {
            return message.error("请填写退回原因")
        }
        if (this.state.Times == null || this.state.Times == "") {
            return message.error("请选择重新上报时间")
        }
        this.setState({
            confirmLoading: true,
        });
        $jsonppost(self, api.checkPass, {
            reviewId: prposData.reviewId,
            isPass: this.state.passCode,
            noPassCause: this.state.result,
            reviewTime: this.state.Times,
        }).then(res => {
            if (res.code == 200) {
                message.success("操作成功")
                self.setState({
                    visible: false,
                    confirmLoading: false,
                });
                window.history.back();
            } else {
                message.error(res.message)
                self.setState({
                    visible: false,
                    confirmLoading: false,
                });
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
    // 返回
    cancel() {
        hashHistory.push({
            pathname: '/main/audit',
            state: {
                resultsChooseed: prposData.resultsChooseed,
                loadAudit: prposData.loadAudit,
            }
        })
    }
    // 时间戳转换
    getDates(date) {
        if (date == null) {
            return "";
        }
        let pubtime = new Date(date),
            month = pubtime.getMonth() + 1,
            month1 = month < 10 ? ("0" + month) : month,
            date0 = pubtime.getDate(),
            date1 = date0 < 10 ? "0" + date0 : date0,
            pubdate = (pubtime.getFullYear()) + "-" +
                month1 + "-" + date1;
        return pubdate;
    }
    // 时间戳转换
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
    // 原因
    result(e) {
        let value = e.target.value
        this.setState({
            result: value,
        })
    }
    // 上报时间
    onChange(date, dateString) {
        this.setState({
            Times: dateString
        })

    }
    // 不可选时间
    disabledDate(current) {
        return current && current < Date.now() - 24 * 60 * 60 * 1000;
    }
    // 点击放大
    clickBigger(url) {
        $(".bigger").css({
            "display": "block",
        })
        $(".bigger img").attr({
            "src": url
        })
    }
    same() {
        $(".bigger").css("display", "none")
    }
    // 渲染
    render() {
        // 审核 查看
        let AuditItstyle, AuditNotstyle, PassCode, fontColor;
        if (this.state.prposData.auditIt == true) {
            AuditItstyle = {
                display: "inline-block",
                fontSize: 16,
            }
            AuditNotstyle = {
                display: "none",
                fontSize: 16,
            }
        } else {
            AuditItstyle = {
                display: "none",
                fontSize: 16,
            }
            AuditNotstyle = {
                display: "inline-block",
                fontSize: 16,
            }
        }
        if (this.state.PassCode == true) {
            PassCode = {
                display: "none",
            }
            fontColor = {
                color: "#52C41A",
                borderLeft: "3px solid #52C41A",
            }
        } else {
            PassCode = {
                display: "block",
            }
            fontColor = {
                color: "#F5222D",
                borderLeft: "3px solid #F5222D",
            }
        }
        return (
            <div className={audit.grayBackground}>
                <Breadcrumb separator=">" style={{ textAlign: "left" }}>
                    <Breadcrumb.Item>审核</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="main/audit">隐患复查审核</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.prposData.auditIt == true ? "" : "查看"}</Breadcrumb.Item>
                </Breadcrumb>
                <div className={audit.clearfloat}></div>
                <div className={"bigger" + " " + audit.bigger + " " + audit.clickBiggerImg} onClick={this.same.bind(this)}>
                    <img src="" alt="" />
                </div>
                <div className={audit.MaxWrap}>
                    <h3 className={audit.titleWrap}>
                        <b className={audit.textTitle}>{this.state.prposData.companyName}</b>
                        <span className={audit.listCode}>{this.state.datas.checklistCode}</span>
                        <br />
                        <span className={audit.listKind}>{this.state.prposData.checkSortName}</span>
                    </h3>
                    <p className={audit.CardWrap}>{this.state.PassCode == true ? "隐患要素" : "隐患"}：{this.state.prposData.item}</p>
                    <div className={audit.CardWrapNoP} >
                        <div className={audit.leftBlock + " " + audit.rightBorder} ref="leftBlock">
                            <p>整改前</p>
                            <div className={audit.titleValueWrap}>
                                <span className={audit.leftTitle}>检查结果</span>
                                <span className={audit.cententsymbol}>：</span>
                                <span className={audit.rightValue}>{this.state.datas.before_result}</span>
                            </div>
                            <div className={audit.titleValueWrap}>
                                <span className={audit.leftTitle}>现场照片</span>
                                <span className={audit.cententsymbol}>：</span>
                                <span className={audit.rightValue + " " + audit.flex}>
                                    {
                                        this.state.datas.before_pic.map((item, index) => {
                                            return <div className={audit.imgWrap + " " + audit.clickBiggerImg} key={index}>
                                                <img onClick={this.clickBigger.bind(this, item)} src={item} />
                                            </div>
                                        })

                                    }</span>
                            </div>
                            <div className={audit.titleValueWrap}>
                                <span className={audit.leftTitle}>检查描述</span>
                                <span className={audit.cententsymbol}>：</span>
                                <span className={audit.rightValue}>{this.state.datas.before_describe}</span>
                            </div>
                            <div className={audit.titleValueWrap}>
                                <span className={audit.leftTitle}>整改要求</span>
                                <span className={audit.cententsymbol}>：</span>
                                <span className={audit.rightValue}>{this.state.datas.before_require}</span>
                            </div>
                            {/* <div className={audit.titleValueWrap}>
                                <span className={audit.leftTitle}>复查时间</span>
                                <span className={audit.cententsymbol}>：</span>
                                <span className={audit.rightValue}>{this.state.datas.before_reviewTime}</span>
                            </div> */}
                            <div className={audit.titleValueWrap}>
                                <span className={audit.leftTitle}>定&emsp;&emsp;位</span>
                                <span className={audit.cententsymbol}>：</span>
                                <span className={audit.rightValue}>{this.state.datas.before_location}</span>
                            </div>
                        </div>
                        <div className={audit.rightBlock} ref="rightBlock"><p>整改后</p>
                            {/* 审核 */}
                            {/* <div className={audit.titleValueWrap} style={AuditItstyle}>
                                <span className={audit.leftTitle}>实际复查时间</span>
                                <span className={audit.cententsymbol}>：</span>
                                <span className={audit.rightValue}>{this.getDay(this.state.datas.after_uploadTime)}</span>
                            </div> */}
                            <div className={audit.titleValueWrap}>
                                <span className={audit.leftTitle}>检查结果</span>
                                <span className={audit.cententsymbol}>：</span>
                                <span className={audit.rightValue}>{this.state.datas.after_result}</span>
                            </div>
                            <div className={audit.titleValueWrap}>
                                <span className={audit.leftTitle}>现场照片</span>
                                <span className={audit.cententsymbol}>：</span>
                                <span className={audit.rightValue + " " + audit.flex}>
                                    {
                                        this.state.datas.after_pic.map((item, index) => {
                                            return <div className={audit.imgWrap + " " + audit.clickBiggerImg} key={index}>
                                                <img onClick={this.clickBigger.bind(this, item)} src={item} />
                                            </div>
                                        })

                                    }</span>
                            </div>
                            {/* 查看 */}
                            {/* <div className={audit.titleValueWrap} style={AuditNotstyle}>
                                <span className={audit.leftTitle}>检查描述</span>
                                <span className={audit.cententsymbol}>：</span>
                                <span className={audit.rightValue}>{this.state.datas.after_describe}</span>
                            </div> */}
                            <div className={audit.titleValueWrap}>
                                <span className={audit.leftTitle}>定&emsp;&emsp;位</span>
                                <span className={audit.cententsymbol}>：</span>
                                <span className={audit.rightValue}>{this.state.datas.after_location}</span>
                            </div>
                        </div>
                    </div>

                </div>
                {/* 查看 */}
                <div style={AuditNotstyle} className={audit.CardWrap}>
                    <h5 className={audit.success} style={fontColor}>审核结果：{this.state.datas.isPass}</h5>
                    <p style={PassCode}>原因：{this.state.datas.noPassCause}</p>
                    <p><span>审核人：{this.state.datas.name}</span></p>
                    <p><span>审核人手机：{this.state.datas.phone}</span></p>
                    <p style={PassCode}><span>再次提交时间：{this.state.datas.reUploadTime}</span></p>
                </div>

                <div className={audit.ButtonWrap} style={{ textAlign: "right" }}>
                    {/* 审核 */}
                    <Button type="primary" style={AuditItstyle} className={audit.ButtonItem} onClick={this.pass.bind(this, 3)}>通过</Button>
                    {/* 审核 */}
                    <Button type="danger" style={AuditItstyle} className={audit.ButtonItem} onClick={this.pass.bind(this, 2)}>不通过</Button>
                    <Button className={audit.ButtonItem} onClick={this.cancel.bind(this)}>返回</Button>
                </div>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                    okText={"退回"}
                    okType={"danger"}
                    autoFocusButton={"cancel"}
                >
                    <p style={{ width: "80%", margin: "10px 10%" }}>不通过原因<i className={audit.must}>*</i></p>
                    <TextArea style={{ width: "80%", margin: "10px 10%" }} onChange={this.result.bind(this)}></TextArea>
                    <div style={{ width: "80%", margin: "10px 10%" }}>
                        <span>重新提交时间</span><i className={audit.must}>*</i>
                        <DatePicker
                            format={dateFormat} defaultValue={moment(this.state.defaultTimeValue, dateFormat)}
                            placeholder="选择时间" disabledDate={this.disabledDate} style={{ width: "50%", marginLeft: 30 }} showToday={true}
                            onChange={this.onChange.bind(this)}
                        />
                    </div>
                </Modal>
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