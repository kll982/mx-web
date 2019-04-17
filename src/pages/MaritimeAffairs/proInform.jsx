import React from "react";
import { Link, hashHistory } from 'react-router';
import $ from 'jquery';
// ajax
import projectItemLess from "./projectItem.less";
import { Breadcrumb, Button, Radio, Card, Input, DatePicker, message, Icon } from "antd";
import moment from 'moment';
// less
import MaritimeAffairs from "../MaritimeAffairs/MaritimeAffairs.less"
import publicstyle from "../../img/public.less";
import stylez from '../../container/index.less';
import report from "../report/report.less";
import styles2 from "../admin/index.less";
import styles from "../stastics/taskIndex.less";

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";
// img
import bianJi217x from '../../img/bianJi217@2x.png'
import shanChu2292x from '../../img/shanChu229@2x.png'
import queding248x from '../../img/queding248@2x.png'
import tianjia211x from '../../img/tianjia211@2x.png'
class proInform extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        self.state = {
            parId: self.props.location.state.parId,
            sort: self.props.location.state.sort,
            basicInfo: '',
            extend: '',
            cardItem: '',
            listCard: [],
            list: [],
            trueItem: true,
            riquItemg: '',
            riqiNanefNsame: '',
            leftShow: true
        }
    }
    // 发送ajax
    componentDidMount() {
        self.dataAll()
    }
    // 数据
    dataAll() {
        $jsonp3(self, api.listSortLevelDetail, {
            parId: self.state.parId
        })
            .then((res) => {
                const basicInfo = res.data.response.basicInfo
                const list = res.data.response.list
                const listvalue = []
                const listbody = []
                list.map((item, index) => {
                    listvalue.push(Number(item.level))
                })
                self.bubbleSort(listvalue).map((item, index) => {
                    list.map((name, j) => {
                        if (item == Number(name.level)) {
                            listbody.push(name)
                        }
                    })
                })
                self.setState({
                    basicInfo: basicInfo,
                    list: listbody
                })
                self.numberList(listbody)
            });
    }
    // 冒泡排序
    bubbleSort(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }
    SectionToChinese(section) {
        const chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
        const chnUnitSection = ["", "万", "亿", "万亿", "亿亿"]
        const chnUnitChar = ["", "十", "百", "千"]
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            } else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        for (var indexI = 0; indexI < chnStr.length; indexI++) {
            if (chnStr[0] == '一') {
                if (chnStr[1] == '十') {
                    chnStr = chnStr.substring(1, chnStr.length)
                }
            }
        }
        return chnStr;
    }
    numberList(props) {
        const listItems = props.map((props, index) => {
            return <Button key={index}>级别{self.SectionToChinese(index + 1)}</Button>
        }
        );
        const imgColorIjai = <Button onClick={self.mColorIjai.bind(self)} className={projectItemLess.imgColorIjai}><img src={tianjia211x} alt="" /></Button>
        const listCard = props.map((props, index) => {
            return <Card title={props.name} className={projectItemLess.cardColor} key={index} extra={<div className={projectItemLess.rankItem}>级别{self.SectionToChinese(index + 1)}</div>} >
                <p><span>分级标准：</span><span className={projectItemLess.rightBiaozhu}>{props.standard}</span></p>
                <p className={projectItemLess.prositionitem}><span>检查频次：</span><span>每{props.checkFrequency}月       检查1次</span></p>
                <p className={projectItemLess.prositionitem}><span>检查率：</span><span>每次{props.checkRate}%</span></p>
                <p className={projectItemLess.prositionitem}><span>起始时间：</span><span>{props.startDay}</span></p>
                <div className={projectItemLess.hrItem}></div>
                <div style={{ position: 'relative', top: '8px' }}>
                    <span><img onClick={self.LeftCompile.bind(self, index)} className={projectItemLess.imgLeft} src={bianJi217x} alt="" /></span><span><img onClick={self.deleteSoLevel.bind(self, index)} className={projectItemLess.imgRight} src={shanChu2292x} alt="" /></span>
                </div>
            </Card>
        }
        );
        self.setState({
            extend: <div>{listItems}{imgColorIjai}</div>,
            cardItem: <span>{listCard}</span>,
            listCard: listCard
        })
    }
    // 编辑
    LeftCompile(index) {

        const { TextArea } = Input;
        const textHtml = self.state.listCard.map((propsd, num) => {

            const props = self.state.list[num]
            const { MonthPicker, RangePicker } = DatePicker;
            function disabledDate(current) {
                return current && current.valueOf() > Date.now();
            }
            function range(start, end) {
                const result = [];
                for (let i = start; i < end; i++) {
                    result.push(i);
                }
                return result;
            }
            this.setState({
                riqiNanefNsame: props.startDay
            })
            if (index == num) {
                return <Card className={projectItemLess.cardColor} key={num}  >
                    <div style={{ height: '36px' }}><Input className={projectItemLess.biaojianImte + '  ' + 'texta'} defaultValue={props.name} /><div className={projectItemLess.rankItem}>级别{self.SectionToChinese(num + 1)}</div></div>
                    <div className={projectItemLess.hrItem}></div>
                    <p style={{ marginTop: '16px' }}><span>分级标准：</span><span className={projectItemLess.rightBiaozhu}><TextArea className={projectItemLess.inputSizefor + '  ' + 'textb'} defaultValue={props.standard} rows={3} /></span></p>
                    <p className={projectItemLess.prositionitem}><span>检查频次：</span><span>每<Input className={projectItemLess.inputSizeOne + '  ' + 'textc'} size="small" defaultValue={props.checkFrequency} />月       检查1次</span></p>
                    <p className={projectItemLess.prositionitem}><span>检查率：</span><span>每次<Input className={projectItemLess.inputSize + '  ' + 'textd'} size="small" defaultValue={props.checkRate} />%</span></p>

                    <p className={projectItemLess.prositionitem}><span>起始时间：</span><span> <DatePicker onChange={self.riqiNanefNsame.bind(self)}
                        format="YYYY-MM-DD"
                        disabledDate={disabledDate}
                        defaultValue={moment(props.startDay, "YYYY-MM-DD")}
                    // value={moment(props.startDay, "YYYY-MM-DD")}
                    /></span></p>

                    <div className={projectItemLess.hrItem}></div>
                    <div style={{ position: 'relative', top: '8px' }}>
                        <span><img onClick={self.LeftCompileBiam.bind(self, props.id)} className={projectItemLess.imgLeft} src={queding248x} alt="" /></span><span><img onClick={self.deleteSoLevel.bind(self, num)} className={projectItemLess.imgRight} src={shanChu2292x} alt="" /></span>
                        <span style={{ float: "right", cursor: "pointer" }} onClick={this.reload.bind(this)}>取消编辑</span>
                    </div>
                </Card>
            } else {
                return propsd
            }
        })
        self.setState({
            cardItem: <span>{textHtml}</span>
        })
    }
    // 取消编辑
    reload() {
        self.dataAll()
        self.setState({
            trueItem: true,
        })
    }
    riqiNanefNsame(value, dateString) {
        self.setState({
            riqiNanefNsame: dateString
        })
    }
    deleteSoLevel(num) {
        $jsonp3(self, api.deleteSortLevel, {
            levelId: self.state.list[num].id
        })
            .then((res) => {
                self.dataAll()
            });
    }
    LeftCompileBiam(index) {
        if (self.judge($('.texta').val(), $('.textb').val(), $('.textc').val(), $('.textd').val(), self.state.riqiNanefNsame)) {
            $jsonppost(self, api.updateSortLevel, {
                name: $('.texta').val(),
                levelId: index,
                standard: $('.textb').val(),
                checkFrequency: $('.textc').val(),
                startDay: self.state.riqiNanefNsame,
                checkRate: $('.textd').val(),
            })
                .then((res) => {
                    self.setState({
                        riqiNanefNsame: ''
                    })
                    self.dataAll()
                });
        }
    }
    // 新增
    mColorIjai() {
        if (self.state.trueItem) {
            const { TextArea } = Input;
            const textHtml = self.state.listCard;
            const defaultValuename = '级别' + self.SectionToChinese(self.state.list.length + 1)
            function disabledDate(current) {
                return current && current.valueOf() > Date.now();
            }
            function range(start, end) {
                const result = [];
                for (let i = start; i < end; i++) {
                    result.push(i);
                }
                return result;
            }
            self.state.listCard.map((propsd, num) => {
                if (num == self.state.listCard.length - 1) {
                    const propsdname = <Card className={projectItemLess.cardColor} key={self.state.listCard.length}>
                        <div style={{ height: '36px' }}><Input className={projectItemLess.biaojianImte + '  ' + 'valuea'} defaultValue={defaultValuename} /><div className={projectItemLess.rankItem}>级别{self.SectionToChinese(self.state.list.length + 1)}</div></div>
                        <div className={projectItemLess.hrItem}></div>
                        <p style={{ marginTop: '16px' }}><span>分级标准：</span><span className={projectItemLess.rightBiaozhu}><TextArea className={projectItemLess.inputSizefor + '  ' + 'valueb'} rows={3} /></span></p>
                        <p className={projectItemLess.prositionitem}><span>检查频次：</span><span>每<Input className={projectItemLess.inputSizeOne + '  ' + 'valuec'} size="small" />月       检查1次</span></p>
                        <p className={projectItemLess.prositionitem}><span>检查率：</span><span>每次<Input className={projectItemLess.inputSize + '  ' + 'valued'} size="small" />%</span></p>
                        <p className={projectItemLess.prositionitem}><span>起始时间：</span><span>
                            <DatePicker onChange={self.riqiNanef.bind(self)}
                                format="YYYY-MM-DD"
                                disabledDate={disabledDate}
                            /></span></p>
                        <div className={projectItemLess.hrItem}></div>
                        <div style={{ position: 'relative', top: '8px' }}>
                            <span><img onClick={self.tianJiaItem.bind(self)} className={projectItemLess.imgLeft} src={queding248x} alt="" /></span><span><img onClick={self.deleteSoLevelItem.bind(self)} className={projectItemLess.imgRight} src={shanChu2292x} alt="" /></span>
                            <span style={{ float: "right", cursor: "pointer" }} onClick={this.reload.bind(this)}>取消编辑</span>
                        </div>
                    </Card>
                    textHtml.push(propsdname)
                }
            })
            self.setState({
                cardItem: <span>{textHtml}</span>,
                trueItem: false
            })
        }
    }
    tianJiaItem() {
        if (self.judge($('.valuea').val(), $('.valueb').val(), $('.valuec').val(), $('.valued').val(), self.state.riquItemg)) {
            $jsonppost(self, api.addSortLevel, {
                name: $('.valuea').val(),
                parId: self.state.parId,
                standard: $('.valueb').val(),
                checkFrequency: $('.valuec').val(),
                startDay: self.state.riquItemg,
                checkRate: $('.valued').val(),
            })
                .then((res) => {
                    self.setState({
                        riquItemg: '',
                        trueItem: true,
                    })
                    self.dataAll()
                });
        }
    }
    deleteSoLevelItem() {
        self.numberList(self.state.list)
        self.setState({
            trueItem: true
        })
    }
    judge(a, b, c, d, e) {
        if (a == '' || a == null) {
            message.error('标题不能为空');
        } else if (b == '' || b == null) {
            message.error('分级标准不能为空');
        } else if (!!!c || !/(^[1-9]\d*$)/.test(c)) {
            message.error('检查频次不能为空且为整数');
        } else if (!!!d || d < 1 || d > 100 || !/(^[1-9]\d*$)/.test(d)) {
            message.error('检查率不能为空且应大于等于1小于等于100的整数');
        } else if (e == '' || e == null) {
            message.error('起始时间不能为空');
        } else {
            return true
        }
    }
    riqiNanef(value, dateString) {
        self.setState({
            riquItemg: dateString
        })
    }
    leftItemIocn() {
        if (self.state.leftShow) {
            self.setState({
                leftShow: false
            })
            $('.leftBiodyItem').css('display', 'none')
        } else {
            self.setState({
                leftShow: true
            })
            $('.leftBiodyItem').css('display', 'block')
        }
    }
    back() {
        hashHistory.push({
            pathname: "/main/projectItem",
        })
    }
    render() {
        return (
            <div className={projectItemLess.informa} style={{ height: "100%", overflow: "hiddden" }}>
                <div className={stylez.wrapPadding} style={{ position: "relative", height: "100%", overflow: "hiddden" }}>
                    <Breadcrumb separator=">" style={{ textAlign: "left", paddingBottom: '10px' }}>
                        <Breadcrumb.Item><Link to="main/projectItem">检查项目管理</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>基本信息</Breadcrumb.Item>
                    </Breadcrumb>
                    <Button type="primary" onClick={this.back} style={{ marginTop: 14 }} className={styles2.returnbackbutton}>返回</Button>
                    <div style={{ height: "calc(100% - 45px)", overflowY: "hidden" }}>
                        <div className={projectItemLess.informaleft + ' ' + 'leftBiodyItem'}>
                            <div className={projectItemLess.lefthea}>{self.state.sort}</div>
                            <div className={projectItemLess.leftheacolor}>基本信息：{self.state.basicInfo}</div>
                            <div>
                                <div className={projectItemLess.divButtoleft}>分级：</div>
                                <div className={projectItemLess.divButtonba}>
                                    {self.state.extend}
                                </div>
                            </div>
                        </div>
                        <div className={projectItemLess.leftNagsdgITemBody}>
                            <div className={projectItemLess.leftNagsdgITem} onClick={self.leftItemIocn.bind(self)}> <Icon type={self.state.leftShow == true ? "right" : "left"} /></div>
                        </div>
                        {/* right */}
                        <div className={projectItemLess.informaright} style={{ height: "100%", overflowY: "scroll" }}>
                            {self.state.cardItem}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default proInform;