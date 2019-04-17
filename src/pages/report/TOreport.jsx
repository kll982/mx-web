// 上报
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Input, Button } from "antd";

import publicstyle from "../../img/public.less";
import styles from "../stastics/taskIndex.less";
import report from "./report.less";
import styles2 from "../admin/index.less";

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
import summary_icon from "../../img/summary_icon.png";

let self, prposData;

export default class TOreport extends React.Component {
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
            pageItemdier: 0
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
                const statisticsCount = res.data.response.dto.statisticsCount
                const status = res.data.response.dto.status
                $('#TostateOne').text(res.data.response.dto.status)
                if (num[0] == '正常') {
                    if (status != "待上报") {
                        $('.TostekIdtdaaa').css({ 'display': 'none' })
                        $('#TostateekIdtd').css({ 'display': 'none' })
                    }
                    if (fillInLevel == '1') {
                        $('#Tostateek').text('市级填报')
                    } else if (fillInLevel == '2') {
                        $('#Tostateek').text('区县级填报')
                    } else {
                        $('#Tostateek').text('--')
                    }
                    $('#TostateekIdtd').text(statisticsCount)
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
                    if (status != "待上报") {
                        $('.TostekIdtdaaa').css({ 'display': 'none' })
                        $('#TostateekIdtd').css({ 'display': 'none' })
                    }
                    $('#TostateekIdtd').text(statisticsCount)
                    $('#TostateTwog').text(reReportTime)
                    $('#oneLeftItemC').css({ 'display': 'block' })
                    $(id).children('button').css({ 'background': 'rgba(255,242,232,1)' })
                } else if (num[0] == '被退回') {
                    if (status != "待上报") {
                        $('.Tostateekxa').css({ 'display': 'none' })
                        $('#TostateekIdtdId').css({ 'display': 'none' })
                    }

                    $('#Tostatea').text(self.getDay(returnTime))
                    $('#Tostateb').text(returnBy)
                    $('#Tostatec').text(phone)
                    $('#TostateekIdtdId').text(statisticsCount)
                    $('#Tostated').text(returnDescribe)
                    $('#Tostatee').text(reReportTime)
                    $('#oneLeftItem').css({ 'display': 'block' })
                    $(id).children('button').css({ 'background': 'rgba(255,241,240,1)' })
                }

            }
        })

    }
    // 时间戳转化
    getDay(date) {
        if (date == null) {
            return "";
        }
        var pubtime = new Date(date),
            pubdate = (pubtime.getFullYear()) + "-" +
                ((pubtime.getMonth() + 1) < 10 ? "0" + (pubtime.getMonth() + 1) : (pubtime.getMonth() + 1)) + "-" +
                (pubtime.getDate()) + " " +
                (pubtime.getHours()) + ":" +
                (pubtime.getMinutes() < 10 ? "0" + pubtime.getMinutes() : pubtime.getMinutes()) + ":" +
                (pubtime.getSeconds() < 10 ? "0" + pubtime.getSeconds() : pubtime.getSeconds());
        return pubdate;

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
    // 统计
    statisticsItem(num) {
        var idItem = num + 'button';
        var isChild = '1';
        var page = '1'
        const valueButtone = $('#' + idItem).children('button').text()

        this.setState({
            valueButtone: valueButtone,
            initial: num
        })
        const taskId = String(self.props.location.state.taskId)

        if ($('#' + idItem).children('span').text() == '正常') {
            $('.inputItemValue').map((dom, index) => {
                isChild = '2'
                $('#foorlt').css({ display: 'none' })
                self.setState({
                    pageItemdier: 0
                })
            })
        } else if ($('#' + idItem).children('span').text() == '被退回') {
            isChild = '2'
            page = ''
            self.setState({
                pageItemdier: 1
            })
            $('#foorlt').css({ display: 'block' })
        } else {
            $('#foorlt').css({ display: 'block' })
            isChild = '1';
            self.setState({
                pageItemdier: 0
            })
        }
        $jsonp3(self, api.statistics, {
            statisticsDate: valueButtone,
            taskId: taskId,
            isChild: isChild,
            page: page
        }).then(res => {
            if (res.code == 200) {
                const list = res.data.response.list
                //  $('.reporttdIborder').eq(0).css({ border: '2.5px solid #438BE0' })
                //  $('.inputItemValue').eq(0).focus()
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
                const statisticsCount = res.data.response.dto.statisticsCount
                const status = res.data.response.dto.status
                $('#TostateOne').text(res.data.response.dto.status)
                if (value == '正常') {
                    if (status != "待上报") {
                        $('.TostateekIdtdaaa').css({ 'display': 'none' })
                        $('#TostateekIdtda').css({ 'display': 'none' })
                    }
                    $('#Tostateg').text(createBy)
                    $('#Tostateh').text(phone)
                    $('#Tostatej').text(reportTime)
                    $('#TostateekIdtda').text(statisticsCount)
                    $('#oneLeftItemC').css({ 'display': 'none' })
                    $('#oneLeftItem').css({ 'display': 'none' })
                    $('#oneLeftItemB').css({ 'display': 'block' })
                } else if (value == '被退回') {
                    if (status != "待上报") {
                        $('.Tostateekxa').css({ 'display': 'none' })
                        $('#TostateekIdtdId').css({ 'display': 'none' })
                    }
                    $('#Tostatea').text(returnTime)
                    $('#Tostateb').text(returnBy)
                    $('#Tostatec').text(phone)
                    $('#TostateekIdtdId').text(statisticsCount)
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
                    if (status != "待上报") {
                        $('.TostekIdtdaaa').css({ 'display': 'none' })
                        $('#TostateekIdtd').css({ 'display': 'none' })
                    }
                    $('#TostateekIdtd').text(statisticsCount)
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
            // console.log(rightWidth)
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
            // console.log(rightWidth)
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
        // const idItem = id + 'input'
        // const idTd = id + 'td'
        // $('#' + idItem).focus()
        // $('td').css({ border: '1px solid #ACA9A9' })
        // $('#' + idTd).css({ border: '2.5px solid #438BE0' })
    }
    onblurItem(id) {
        const idItem = id + 'input'
        const idTd = id + 'td'
        $('td').css({ border: '1px solid #ACA9A9' })
    }
    onfouItef(id) {
        const idItem = id + 'input';
        $('#' + idItem).blur()
    }
    // 敲击键盘的时候
    onkeyupItem(id) {
        const idItem = '#' + id + 'input';
        $(idItem).val($(idItem).val().replace(/[^\d.]/g, ''))
    }

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

        hashHistory.push({
            pathname: '/main/TOreportChild',
            state: {
                taskId: self.props.location.state.taskId,
                valueButtone: self.state.valueButtone,
                page: self.state.pageItemdier,
                initial: self.state.initial
            }
        })
        //     const num = this.state.initial.split(',')
        //     var numA =num[num.length-1]
        //    let mapStr=[]
        //     $('.inputItemValue').map((index, id) => {
        //         const idItem = id.getAttribute('id').replace('input','')
        //         const value = id.value
        //         if(value == ''){
        //             const string = idItem + ',' + '0'
        //             mapStr.push(string) 
        //         }else{
        //             const string = idItem + ',' + value
        //             mapStr.push(string)
        //         }       
        //     })      
        //        $jsonppost(self, api.insertStatistics, {
        //         detailId: numA,
        //         mapStr:mapStr
        //     }).then(res => { 
        //         if(res.code == 200){
        //             $jsonp3(self, api.uploadDetail, {
        //                 detailId: numA,
        //             }).then(res => { 
        //                 if(res.code == 200){
        //                     location.reload()
        //                 }
        //              })
        //         }
        //      })

    }
    back() {
        window.history.back();
    }
    render() {
        var name, oneItem = false, twoItem = false;
        const Welcome = function (prop) {
            var itemOne = Math.ceil(prop.name.length / 3)
            var num = []
            for (var index = 0; index < itemOne; index++) {
                num.push(index)
            }
            const llistItems = num.map((val, index) => {
                return (<TrItem key={index} name={prop} namt={index} />)
            })
            return (<tbody className={report.tbodyItemDatAdd} >{llistItems}</tbody>)
        }
        var TrItem = function (prop) {
            const num = prop.name.name.slice(prop.namt * 3, prop.namt * 3 + 3)
            const llistItems = num.map((val, index) => {
                return (<td className="reporttdIborder" key={index} >
                    <span className={report.leftItemA + '  ' + 'namiteAfad'} >{val.two}</span>
                    <input defaultValue="0" onFocus={self.onfouItef.bind(this, val.id)} readOnly="readonly" className={report.RightItemA + ' ' + 'inputItemValue'} id={val.id + 'input'} type="text" />
                </td>)
            })
            return (<tr>{llistItems}</tr>)
        }
        return (
            <div style={{ height: "100%", overflow: "hidden" }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", padding: "15px 0px 0px 15px", zIndex: 1 }}>
                    <Breadcrumb.Item>统计报表</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="main/summary">统计汇总</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>上报</Breadcrumb.Item>
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
                        <div>
                            <div className={report.headerItem} style={{ margin: '10px 0' }} >待上报</div>
                            <div id="Tobereported">
                                {self.state.listtwo.map((item, index) => {
                                    if (index > 2) {
                                        oneItem = true
                                    } else {
                                        oneItem = false
                                    }

                                    if (item.value.split(',')[0] == '逾期') {
                                        return <div id={item.value.split(',')[item.value.split(',').length - 1] + 'button'} style={{ display: oneItem == true ? this.state.displayItem : 'block' }} className={report.inlintColo} key={index}><button onClick={self.buttonClickItem.bind(self, item.value.split(',')[item.value.split(',').length - 1])} className={report.TobereOne + " " + report.Tobere + ' ' + 'buttonBackground'} >{item.name}</button> <span className={report.textOne}>逾期</span></div>
                                    } else if (item.value.split(',')[0] == '正常') {
                                        return <div id={item.value.split(',')[item.value.split(',').length - 1] + 'button'} style={{ display: oneItem == true ? this.state.displayItem : 'block' }} className={report.inlintColo} key={index}><button onClick={self.buttonClickItem.bind(self, item.value.split(',')[item.value.split(',').length - 1])} className={report.TobereTwp + " " + report.Tobere + ' ' + 'buttonBackground' + ' ' + 'buttonBackgroundA'} >{item.name}</button> <span style={{ display: 'none' }} ></span></div>
                                    } else if (item.value.split(',')[0] == '被退回') {
                                        return <div id={item.value.split(',')[item.value.split(',').length - 1] + 'button'} style={{ display: oneItem == true ? this.state.displayItem : 'block' }} className={report.inlintColo} key={index}><button onClick={self.buttonClickItem.bind(self, item.value.split(',')[item.value.split(',').length - 1])} className={report.TobereThree + " " + report.Tobere + ' ' + 'buttonBackground'} >{item.name}</button> <span className={report.textThree}>被退回</span></div>
                                    }
                                })}
                            </div>
                            <div style={{ textAlign: 'right', display: oneItem == true ? 'block' : this.state.displayItem }} ><span style={{ width: "35px", display: 'inline-block', textAlign: 'center' }} onClick={this.displayItem.bind(this)}><img id="imgPrexnext" src={prexnext} /></span></div>
                        </div>
                        <hr className={report.HrBorder} />
                        <div>
                            <div className={report.headerItem} style={{ margin: '10px 0' }} >已上报</div>
                            <div id="Hasbeenreported">
                                {self.state.listone.map((item, index) => {
                                    if (index > 2) {
                                        twoItem = true
                                    } else {
                                        twoItem = false
                                    }
                                    return <div id={item.value.split(',')[item.value.split(',').length - 1] + 'button'} style={{ display: twoItem == true ? this.state.displayItemA : 'block' }} className={report.inlintColo + " " + report.Hasbeenr} key={index}><button onClick={self.buttonClickItem.bind(self, item.value.split(',')[item.value.split(',').length - 1])} className={report.TobereTwp + ' ' + 'buttonBackground'} >{item.name}</button><span style={{ display: 'none' }}>正常</span></div>
                                })}
                            </div>
                            <div style={{ textAlign: 'right', display: twoItem == true ? 'block' : this.state.displayItemA }} ><span style={{ width: "35px", display: 'inline-block', textAlign: 'center' }} onClick={this.Hasbeenreported.bind(this)} ><img id="imgPrexnextA" src={prexnext} /></span></div>
                        </div>
                        <hr className={report.HrBorder} />
                        <div>
                            <div className={report.headerItem} >报表信息</div>
                            <div id="Tostate" style={{ marginBottom: '160px' }} >
                                <div className={report.Tostate} >状态:</div>
                                <div id='TostateOne'  ></div>
                                <div id="oneLeftItem" style={{ display: 'none' }} >
                                    <div className={report.Tostate} >退回时间:</div>
                                    <div id='Tostatea'  ></div>
                                    <div className={report.Tostate} >回退人:</div>
                                    <div id='Tostateb'  ></div>
                                    <div className={report.Tostate} >回退人联系方式:</div>
                                    <div id='Tostatec'  ></div>
                                    <div className={report.Tostate} >回退备注:</div>
                                    <div id='Tostated'  ></div>
                                    <div className={report.Tostate + ' ' + 'Tostateekxa'} >汇总单位:</div>
                                    <div id='TostateekIdtdId'  ></div>
                                    <div className={report.Tostate} >上报时间:</div>
                                    <div id='Tostatee'  ></div>
                                </div>
                                <div id="oneLeftItemB" style={{ display: 'none' }} >
                                    <div className={report.Tostate} >填报人:</div>
                                    <div id='Tostateg'  ></div>
                                    <div className={report.Tostate} >填报人联系方式:</div>
                                    <div id='Tostateh'  ></div>
                                    <div className={report.Tostate + ' ' + 'TostateekIdtdaaa'} >汇总单位:</div>
                                    <div id='TostateekIdtda'  ></div>
                                    <div className={report.Tostate} >报出时间:</div>
                                    <div id='Tostatej'  ></div>
                                </div>
                                <div id="oneLeftItemC" style={{ display: 'none' }} >
                                    <div className={report.Tostate} >填报级别:</div>
                                    <div id='Tostateek'  ></div>
                                    <div className={report.Tostate + ' ' + 'TostekIdtdaaa'} >汇总单位:</div>
                                    <div id='TostateekIdtd'  ></div>
                                    <div className={report.Tostate} >上报时间:</div>
                                    <div id='TostateTwog'  ></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* right */}
                    <div className={report.rightWidth} style={{ width: this.state.rightWidth, textAlign: 'center' }}>
                        <h3 id="headerText" style={{ color: '#4D4D4D', fontSize: '24px' }}></h3>
                        <div style={{ color: '#4D4D4D', fontSize: '18px', marginTop: '10px', textAlign: 'left' }} >
                            <span>汇总/填报单位: </span>
                            <span id="msaNameText"></span>
                        </div>
                        <div style={{ marginBottom: '30px' }}>
                            {this.state.oneHeader.map((value, index) => {
                                var num = 0;
                                var numindex = 0;
                                var string = '';
                                var stringAll = '';
                                var tableTrindex = this.itemBodyOne(value)
                                return (<table className={report.table} key={index} style={{ margin: '40px auto' }} >
                                    <thead>
                                        <tr>
                                            <th className={report.thheaserItemaddd} colSpan='3'><span style={{ height: '54px', lineHeight: " 54px", display: 'inline-block', margin: '0 6px 0 30px' }} ><img className={report.imgtiheider} src={summary_icon} alt="" /> </span> {value}</th>
                                        </tr>
                                    </thead>
                                    <Welcome name={tableTrindex} />
                                </table>)
                            })}
                        </div>
                        <div style={{ textAlign: 'right' }} id="foorlt">
                            {/* <span style={{ display: 'inline-block', textAlign: 'center' }} onClick={self.preserve.bind(self)} ><img className={report.imgsizeItem} src={noterepotet2_11} alt="" /><br /><span>保存</span> </span> */}
                            <span style={{ marginLeft: '20px', display: 'inline-block', textAlign: 'center' }} onClick={self.submitItem.bind(self)} ><img className={report.imgsizeItem} src={repottitem2_13} alt="" /><br /><span>上报</span></span>
                        </div>
                        <div style={{ height: '70px' }} ></div>
                    </div>
                </div>

            </div>
        )
    }
}