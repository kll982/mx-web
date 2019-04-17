// 填写
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Input, Modal, message, Button } from "antd";

import styles2 from "../admin/index.less";
import publicstyle from "../../img/public.less";
import styles from "../stastics/taskIndex.less";
import report from "./report.less";

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";
// import index, { Button } from "../../../node_modules/_antd@2.13.14@antd/lib/radio";
import $ from 'jquery';
import prexnext from "../../img/prexnext.png";
import fubrnnext from "../../img/fubrnnext.png";
import repottitem2_13 from "../../img/repottitem2_13.png";
import noterepotet2_11 from "../../img/noterepotet2_11.png";
import textaone from "../../img/textaone.png";

let self, prposData;

export default class TOfill extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            leftShowWidth: 274,
            leftHiddenWidth: 0,
            leftShow: false,
            rightWidth: "100%",
            listone: [],
            listtwo: [],
            displayItem: 'none',
            displayIte: true,
            displayItemA: 'none',
            displayteA: true,
            oneHeader: [],
            itemBodyOne: [],
            trItemAll: [],
            initial: 0,
            valueButtone: '',
            itemwidth: true,
        }
    }
    // 挂载前
    componentWillMount() {
        prposData = self.props.location.state.taskId;

        $jsonp3(self, api.listWriteInfoByTaskId, {
            taskId: prposData,
        }).then(res => {
            if (res.code == 200) {
                const list = res.data.response.list;
                const item = res.data.response.item;
                const one = [];
                const teo = [];
                const three = [];
                self.setState({
                    itemBodyOne: item
                })
                $('#headerText').text(res.data.response.title)
                $('#msaNameText').text(res.data.response.msaName)
                list.map((item, index) => {
                    if (item.value.split(',').length == 3) {
                        one.push(item)
                    } else {

                        teo.push(item)
                    }
                })
                self.setState({
                    listone: one,
                    listtwo: teo
                })
                this.state.listtwo.map((item, index) => {
                    if (index == 0) {
                        this.setState({
                            initial: item.value,
                            valueButtone: item.name
                        })
                    }
                })
                item.map((value, index) => {
                    if (three.indexOf(value.one) == -1) {
                        three.push(value.one)
                    }
                })

                self.setState({
                    oneHeader: three
                })
                self.initialItem()
                self.statisticsItem(this.state.initial.split(',')[this.state.initial.split(',').length - 1])
            }
        })
        self.changeWidth()


    }

    // 报表状态
    initialItem() {
        const num = this.state.initial.split(',')
        $jsonp3(self, api.listWriteDetailInfoByDetailId, {
            detailId: num[num.length - 1],
        }).then(res => {
            if (res.code == 200) {
                var id = '#' + num[num.length - 1] + 'button';
                const reportTime = res.data.response.dto.reportTime;
                const createBy = res.data.response.dto.createBy;
                const phone = res.data.response.dto.phone;
                const fillInLevel = res.data.response.dto.fillInLevel
                const reReportTime = res.data.response.dto.reReportTime
                const returnTime = res.data.response.dto.returnTime
                const returnBy = res.data.response.dto.returnBy
                const returnDescribe = res.data.response.dto.returnDescribe
                $('#TostateOne').text(res.data.response.dto.status)
                if (num[0] == '正常') {
                    if (fillInLevel == '1') {
                        $('#Tostateek').text('市级填报')
                    } else if (fillInLevel == '2') {
                        $('#Tostateek').text('区县级填报')
                    } else {
                        $('#Tostateek').text('--')
                    }

                    $('#TostateTwog').text(reReportTime)
                    $('#oneLeftItemC').css({ 'display': 'block' })
                    $(id).children('button').css({ 'background': 'rgba(230,247,255,1)' })
                } else if (num[0] == '逾期') {
                    if (fillInLevel == '1') {
                        $('#Tostateek').text('市级填报')
                    } else if (fillInLevel == '2') {
                        $('#Tostateek').text('区县级填报')
                    } else {
                        $('#Tostateek').text('--')
                    }
                    $('#TostateTwog').text(reReportTime)
                    $('#oneLeftItemC').css({ 'display': 'block' })
                    $(id).children('button').css({ 'background': 'rgba(255,242,232,1)' })
                } else if (num[0] == '被退回') {
                    $('#Tostatea').text(returnTime)
                    $('#Tostateb').text(returnBy)
                    $('#Tostatec').text(phone)
                    $('#Tostated').text(returnDescribe)
                    $('#Tostatee').text(reReportTime)
                    $('#oneLeftItem').css({ 'display': 'block' })
                    $(id).children('button').css({ 'background': 'rgba(255,241,240,1)' })
                }

            }
        })

    }
    // 左侧点击事件
    buttonClickItem(id) {
        this.setState({
            initial: id
        })
        self.initialItemLeft(id)
        var idItem = id + 'button';
        var value = $('#' + idItem).children('span').text()
        $('#Hasbeenreported').find('.buttonBackground').css({ 'color': '#1890FF' })
        $('.buttonBackground').css('background', '#ffffff')
        $('.buttonBackgroundA').css({ 'color': '#1890FF' })
        if (value == '逾期') {
            $(('#' + idItem)).children('button').css({ 'background': 'rgba(255,242,232,1)' })
        } else if (value == '被退回') {
            $(('#' + idItem)).children('button').css({ 'background': 'rgba(255,241,240,1)' })
        } else {
            $(('#' + idItem)).children('button').css({ 'background': 'rgba(230,247,255,1)' })
        }
    }
    updateIem() {
        const num = this.state.initial.split(',')[this.state.initial.split(',').length - 1]
        // console.log(num)   
        // console.log(num)   
        var idItem = num + 'button';
        var page = '1';
        var isChild = '1'
        const valueButtone = $('#' + idItem).children('button').text()
        this.setState({
            valueButtone: valueButtone
        })
        if (self.props.location.state.page == 1) {
            page = '';
            isChild = '2'
        } else {
            page = '1'
            isChild = '1'
        }
        const taskId = String(self.props.location.state.taskId)
        $jsonp3(self, api.statistics, {
            statisticsDate: self.props.location.state.valueButtone,
            taskId: taskId,
            isChild: '1',
            page: '1'
        }).then(res => {
            if (res.code == 200) {
                const list = res.data.response.list
                if (list.length > 0) {
                    $('.inputItemValue').map((index, id) => {
                        const idItem = Number(id.getAttribute('id').replace('input', ''))
                        list.map((indexA, idA) => {
                            if (idItem == indexA.itemId) {
                                if (indexA.statisticsValue != 0) {
                                    $('#' + id.getAttribute('id')).val(indexA.statisticsValue)

                                }
                            }
                        })

                    })
                }

                if ($('#' + idItem).children('span').text() == '正常') {
                    $('.inputItemValue').map((dom, index) => {
                        index.setAttribute('readonly', 'readonly')
                        $('#foorlt').css({ display: 'none' })
                        $('td').css({ border: '1px solid #ACA9A9' })

                    })
                    if (self.state.itemwidth) {
                        self.setState({
                            itemwidth: false
                        })
                    }

                } else {
                    $('#foorlt').css({ display: 'block' })
                    if (self.state.itemwidth) {

                    } else {
                        self.setState({
                            itemwidth: true
                        })
                    }
                    $('.reporttdIborder').eq(0).css({ border: '2.5px solid #438BE0' })
                    $('.inputItemValue').eq(0).focus()
                }
            }
        })
    }
    // 统计
    statisticsItem(num) {
        // console.log(num)   
        // console.log(num)   
        var idItem = num + 'button';
        var page = '1';
        var isChild = '1'
        const valueButtone = $('#' + idItem).children('button').text()
        this.setState({
            valueButtone: valueButtone
        })
        if (self.props.location.state.page == 1) {
            page = '';
            isChild = '2'
        } else {
            page = '1'
            isChild = '1'
        }
        const taskId = String(self.props.location.state.taskId)
        $jsonp3(self, api.statistics, {
            statisticsDate: self.props.location.state.valueButtone,
            taskId: taskId,
            isChild: isChild,
            page: page
        }).then(res => {
            if (res.code == 200) {
                const list = res.data.response.list
                if (list.length > 0) {
                    $('.inputItemValue').map((index, id) => {
                        const idItem = Number(id.getAttribute('id').replace('input', ''))
                        list.map((indexA, idA) => {
                            if (idItem == indexA.itemId) {
                                if (indexA.statisticsValue != 0) {
                                    $('#' + id.getAttribute('id')).val(indexA.statisticsValue)

                                }
                            }
                        })

                    })
                }

                if ($('#' + idItem).children('span').text() == '正常') {
                    $('.inputItemValue').map((dom, index) => {
                        index.setAttribute('readonly', 'readonly')
                        $('#foorlt').css({ display: 'none' })
                        $('td').css({ border: '1px solid #ACA9A9' })

                    })
                    if (self.state.itemwidth) {
                        self.setState({
                            itemwidth: false
                        })
                    }

                } else {
                    $('#foorlt').css({ display: 'block' })
                    if (self.state.itemwidth) {

                    } else {
                        self.setState({
                            itemwidth: true
                        })
                    }
                    $('.reporttdIborder').eq(0).css({ border: '2.5px solid #438BE0' })
                    $('.inputItemValue').eq(0).focus()
                }
            }
        })
    }
    // 左侧点击 报表状态改变
    initialItemLeft(num) {
        var idItem = num + 'button';
        const value = $('#' + idItem).children('span').text()
        self.statisticsItem(num)
        $jsonp3(self, api.listWriteDetailInfoByDetailId, {
            detailId: num,
        }).then(res => {
            if (res.code == 200) {
                const reportTime = self.timestampToTime(new Date(res.data.response.dto.reportTime));
                const createBy = res.data.response.dto.createBy;
                const phone = res.data.response.dto.phone;
                const fillInLevel = res.data.response.dto.fillInLevel
                const reReportTime = res.data.response.dto.reReportTime
                const returnTime = self.timestampToTime(new Date(res.data.response.dto.returnTime))
                const returnBy = res.data.response.dto.returnBy
                const returnDescribe = res.data.response.dto.returnDescribe
                $('#TostateOne').text(res.data.response.dto.status)
                if (value == '正常') {
                    $('#Tostateg').text(createBy)
                    $('#Tostateh').text(phone)
                    $('#Tostatej').text(reportTime)
                    $('#oneLeftItemC').css({ 'display': 'none' })
                    $('#oneLeftItem').css({ 'display': 'none' })
                    $('#oneLeftItemB').css({ 'display': 'block' })
                } else if (value == '被退回') {
                    $('#Tostatea').text(returnTime)
                    $('#Tostateb').text(returnBy)
                    $('#Tostatec').text(phone)
                    $('#Tostated').text(returnDescribe)
                    $('#Tostatee').text(reReportTime)
                    $('#oneLeftItemC').css({ 'display': 'none' })
                    $('#oneLeftItemB').css({ 'display': 'none' })
                    $('#oneLeftItem').css({ 'display': 'block' })
                } else {
                    if (fillInLevel == '1') {
                        $('#Tostateek').text('市级填报')
                    } else if (fillInLevel == '2') {
                        $('#Tostateek').text('区县级填报')
                    } else {
                        $('#Tostateek').text('--')
                    }
                    $('#TostateTwog').text(reReportTime)
                    $('#oneLeftItemB').css({ 'display': 'none' })
                    $('#oneLeftItem').css({ 'display': 'none' })
                    $('#oneLeftItemC').css({ 'display': 'block' })
                }
            }
        })
    }
    // 时间戳转化
    timestampToTime(now) {
        var year = now.getFullYear();
        var month = chang(now.getMonth() + 1);
        var date = chang(now.getDate());
        var hour = chang(now.getHours());
        var minute = chang(now.getMinutes());
        var second = chang(now.getSeconds());
        function chang(t) {
            if (t < 10) {
                return "0" + t;
            } else {
                return t;
            }
        }
        return (year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second);
    }
    itemBodyOne(value) {
        var num = []
        this.state.itemBodyOne.map((item, j) => {
            if (item.one == value) {
                num.push(item)
            }
        })
        return num
    }
    // 挂载后
    componentDidMount() {
        // console.log( )
        $('#buttonIdherty').text(self.props.location.state.valueButtone)
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
    // 左侧栏
    changeWidth() {
        var clientWidth = document.body.clientWidth;
        // 减 菜单栏宽度 减 左右padding 减左侧宽度
        if (this.state.leftShow == true) {
            var rightWidth = clientWidth - 200 - 15;

            // $("#anmation").animate({
            //     left:'250px',
            //     opacity:'0.5',
            //     height:'150px',
            //     width:'150px'
            //   });
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
    displayItem() {
        if (self.state.displayIte) {
            ($('#imgPrexnext').attr('src', fubrnnext))
            this.setState({
                displayItem: 'block',
                displayIte: false
            })
        } else {
            ($('#imgPrexnext').attr('src', prexnext))
            this.setState({
                displayItem: 'none',
                displayIte: true
            })
        }
    }
    Hasbeenreported() {
        if (self.state.displayIteA) {
            ($('#imgPrexnextA').attr('src', fubrnnext))
            this.setState({
                displayItemA: 'block',
                displayIteA: false
            })
        } else {
            ($('#imgPrexnextA').attr('src', prexnext))
            this.setState({
                displayItemA: 'none',
                displayIteA: true
            })
        }
    }
    // 点击td的时候
    tditemId(id) {
        const idItem = id + 'input'
        const idTd = id + 'td'
        if (self.state.itemwidth) {
            $('#' + idItem).focus()
            //
            if ($('#' + idItem).val() == 0) {
                $('#' + idItem).val('')
            }
            $('td').css({ border: '1px solid #ACA9A9' })
            $('#' + idTd).css({ border: '2.5px solid #438BE0' })
        } else {
            $('#' + idItem).blur()
        }


    }
    onblurItem(id) {
        const idItem = id + 'input'
        const idTd = id + 'td'
        $('td').css({ border: '1px solid #ACA9A9' })
        if ($('#' + idItem).val() == 0 || $('#' + idItem).val() == '') {
            $('#' + idItem).val(0)
        }
    }
    // 敲击键盘的时候
    onkeyupItem(id) {
        const idItem = '#' + id + 'input';
        $(idItem).val($(idItem).val().replace(/[^\d.]/g, ''))
    }
    // // 离焦的时候
    // onblur(){

    // }
    // 渲染
    // valurItem(id) {

    //     const idItem = id + 'input';
    //     $('#' + idItem).val().replace('/[^\d]/g', ' ')
    // }
    // 保存按钮
    preserve() {
        const num = this.state.initial.split(',')
        const numA = num[num.length - 1]
        let mapStr = []
        $('.inputItemValue').map((index, id) => {
            const idItem = id.getAttribute('id').replace('input', '')
            const value = id.value
            if (value == '') {
                const string = idItem + ',' + '0'
                mapStr.push(string)
            } else {
                const string = idItem + ',' + value
                mapStr.push(string)
            }
        })

        $jsonppost(self, api.insertStatistics, {
            detailId: numA,
            mapStr: mapStr
        }).then(res => {
            if (res.code == 200) {
                console.log(res)
            }
        })
    }
    // 提交
    submitItem() {
        const num = this.state.initial.split(',')
        var numA = num[num.length - 1]
        let mapStr = []
        $('.inputItemValue').map((index, id) => {
            const idItem = id.getAttribute('id').replace('input', '')
            const value = id.value
            if (value == '') {
                const string = idItem + ',' + '0'
                mapStr.push(string)
            } else {
                const string = idItem + ',' + value
                mapStr.push(string)
            }
        })
        Modal.confirm({
            content: '确认上报？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                $jsonppost(self, api.insertStatistics, {
                    detailId: self.props.location.state.initial,
                    mapStr: mapStr
                }).then(res => {
                    if (res.code == 200) {
                        $jsonp3(self, api.uploadDetail, {
                            detailId: self.props.location.state.initial,
                        }).then(res => {
                            if (res.code == 200) {
                                message.success("上报成功")
                                hashHistory.push({
                                    pathname: '/main/TOreport',
                                    state: {
                                        taskId: self.props.location.state.taskId,
                                        // valueButtone:self.state.valueButtone
                                    }
                                })
                            }
                        })
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        })


    }
    back() {
        window.history.back();
    }
    render() {
        var name;
        const Welcome = function (prop) {
            var itemOne = Math.ceil(prop.name.length / 3)
            var num = []
            for (var index = 0; index < itemOne; index++) {
                num.push(index)
            }
            const llistItems = num.map((val, index) => {
                return (<TrItem key={index} name={prop} namt={index} />)
            })
            return (<tbody className={report.tbodyItemDat} >{llistItems}</tbody>)
        }
        var TrItem = function (prop) {
            const num = prop.name.name.slice(prop.namt * 3, prop.namt * 3 + 3)
            const llistItems = num.map((val, index) => {
                return (<td id={val.id + 'td'} className="reporttdIborder" key={index} >
                    <span onClick={self.tditemId.bind(this, val.id)} className={report.leftItemA + '  ' + 'namiteAfad'} >{val.two}</span>
                    <input onBlur={self.onblurItem.bind(this, val.id)} onKeyUp={self.onkeyupItem.bind(this, val.id)} onFocus={self.tditemId.bind(this, val.id)} defaultValue="0" className={report.RightItemA + ' ' + 'inputItemValue'} id={val.id + 'input'} type="text" />
                </td>)
            })
            return (<tr>{llistItems}</tr>)
        }
        return (
            <div style={{ height: "100%", overflow: "hidden" }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", padding: "15px 0px 0px 15px", zIndex: 1 }}>
                    <Breadcrumb.Item>统计报表</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="main/summary">统计汇总</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>填报</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloat}></div>
                <div style={{ height: "100%", position: "relative" }}>
                    {/* button */}
                    <div id="anmation" className={report.leftButtonWrap} style={{ left: this.state.leftShow == true ? this.state.leftShowWidth : this.state.leftHiddenWidth }} onClick={this.changeWidth.bind(this)}>
                        <img style={{ display: this.state.leftShow == true ? "none" : "inline-block" }} src="../../../ico/toRight.png" alt="" />
                        <img style={{ display: this.state.leftShow == true ? "inline-block" : "none", }} src="../../../ico/toLeft.png" alt="" />
                    </div>
                    {/* left */}
                    <div className={report.leftWidth} style={{ left: this.state.leftShow == true ? this.state.leftHiddenWidth : -(this.state.leftShowWidth) }}>

                        <div className={report.headerItem} >统计时间</div>
                        <div className={report.inlintColo} ><span id="buttonIdherty" className={report.TobereOne + " " + report.Tobere + ' ' + 'buttonBackground'} style={{ border: 'none', color: '#1890FF' }} ></span> </div>

                    </div>
                    {/* right */}
                    <div className={report.rightWidth} style={{ width: this.state.rightWidth, textAlign: 'center' }}>
                        <h3 id="headerText" style={{ color: '#4D4D4D', fontSize: '24px' }}></h3>
                        <div style={{ color: '#4D4D4D', fontSize: '18px', marginTop: '10px', textAlign: 'left' }} >
                            <span>汇总/填报单位: </span>
                            <span id="msaNameText"></span>
                        </div>
                        <div style={{}}>
                            {this.state.oneHeader.map((value, index) => {
                                var num = 0;
                                var numindex = 0;
                                var string = '';
                                var stringAll = '';
                                var tableTrindex = this.itemBodyOne(value)
                                return (<table className={report.table} key={index} style={{ margin: '40px auto' }} >
                                    <thead>
                                        <tr>
                                            <th className={report.thheaserItem} colSpan='3'><span style={{ height: '54px', lineHeight: " 54px", display: 'inline-block', margin: '0 6px 0 30px' }} ><img className={report.imgtiheider} src={textaone} alt="" /> </span> {value}</th>
                                        </tr>
                                    </thead>
                                    <Welcome name={tableTrindex} />
                                </table>)
                            })}
                        </div>
                        <div style={{ textAlign: 'right', marginTop: '30px', marginBottom: '70px' }} id="foorlt">
                            <span style={{ display: 'inline-block', textAlign: 'center', position: 'relative', top: '-50px', color: '#1890FF' }} onClick={self.updateIem.bind(self)} ><span>点击更新实时数据</span> <img src="../../../ico/reload.png" alt="" /></span>
                            {/* <span style={{ display: 'inline-block', textAlign: 'center' }} onClick={self.preserve.bind(self)} ><img className={report.imgsizeItem} src={noterepotet2_11} alt="" /><br /><span>保存</span> </span> */}
                            <span style={{ marginLeft: '20px', display: 'inline-block', textAlign: 'center' }} onClick={self.submitItem.bind(self)} ><img className={report.imgsizeItem} src={repottitem2_13} alt="" /><br /><span>上报</span></span>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}