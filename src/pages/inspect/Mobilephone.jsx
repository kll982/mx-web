import React, { Component } from 'react';
// import { connect } from 'dva';
import { Breadcrumb, message, Button } from 'antd';
import { Link, hashHistory } from 'react-router';
import styles from './index.less';
import styles2 from "../admin/index.less";
import api from '../../utils/api.js';
import $jsonp3 from '../../utils/service3.js';
import $ from 'jquery';
import phote from '../../img/phote.png';
import shuaxin from '../../img/shuaxin_07.png';
import zuobiaozhi from '../../img/zuobiaozhi.png';
import nobufuhe from '../../img/nobufuhe.png';
import diliweizhi from '../../img/diliweizhi.png';
import yuyin from '../../img/yuyin.png';
import sanjixuanxiang from '../../img/sanjixuanxiang.png'
import yijingcha_03 from '../../img/yijingcha_03.png'
import youbianone from '../../img/youbianone.png'
import youbiantwo from '../../img/youbiantwo.png'
import publicstyle from "../../img/public.less";
import stylez from '../../container/index.less';
let self, basicInfo;

class IndexPage extends Component {
    constructor(props) {
        super(props);
        self = this;

        basicInfo = self.props.location.state;
        this.state = {
            item: false,
            itemOne: false,
            itemthree: false,
            itemFirm: false,
            clickitem: true,
            clickitemOne: true,
            pageItem: false,
            twoagin: false,
            information: [],
            oneValue: '',
            twoValue: '',
            taskId: "",
            special: false,

            hide: true,
            checkMsa: [],
            basicInfo: basicInfo,
            blockTime: "-",
            checkList: [],
        };
        this.threestair = this.threestair.bind(this)
    }

    componentWillMount() {
        let propsData = this.props.location.state;

        if (propsData.seePath == "projectItem") {
            self.setState({
                propsData: propsData,
                taskId: propsData.taskId,
                seePath: "projectItem"
            })
        } else if (propsData.seePath == "checklistManagement") {

            self.setState({
                propsData: propsData,
                taskId: propsData.taskId,
                seePath: "checklistManagement"
            })
        } else if (propsData.seePath == "listSortLevelBySortId") {
            self.setState({
                propsData: propsData,
                taskId: propsData.taskId,
                seePath: "listSortLevelBySortId"
            })
        } else if (propsData.seePath == "pubilcSpecial") {
            self.setState({
                propsData: propsData,
                taskId: propsData.taskId,
                seePath: "pubilcSpecial",
                special: true,
            })
        } else if (propsData.seePath == "special") {
            self.setState({
                propsData: propsData,
                taskId: propsData.taskId,
                seePath: "special",
                special: true,
            })
        }
    }

    componentDidMount() {
        self.dataAgin();
        if (this.state.special) {
            this.getRightInfo();
        }
    }
    // 右侧信息栏
    getRightInfo() {
        $jsonp3(self, api.listCheckMsaIdName, {
            taskId: this.state.propsData.taskId
        }).then(res => {
            let r = res.data.response.list;
            this.setState({
                checkList: r,
            })
        })
    }

    dataAgin = () => {
        $jsonp3(self, api.listAllItemByTaskId, {
            taskId: self.state.taskId
        })
            .then((res) => {
                this.setState({
                    information: res.data.response.checklistDto.checklistItems,
                    item: true
                })
            }).catch((err) => {

            })


    }

    //  点击其他位置 二级目录消失
    handleClick() {
        let domGet = document.getElementsByClassName(this.refs.douget.className)
        if (this.state.clickitem == false) {
            this.setState({
                clickitem: true,
                itemOne: false
            })
            document.getElementById('twostair').style.display = 'none';
            document.getElementById('twostairOne').style.display = 'none';
            for (var i = 0; i < domGet.length; i++) {
                domGet[i].style.color = '#4c4c4c';
                domGet[i].nextSibling.style.backgroundColor = 'rgb(198, 198, 198)';
                domGet[i].style.background = 'rgb(242,242,242)'
            }
        }
    }


    // 一级点击事件
    oneClick(value, index) {
        let domGet = document.getElementsByClassName(this.refs.douget.className)
        this.setState({
            oneValue: value,
            itemOne: true,
        })
        if (this.state.clickitem == true) {
            document.getElementById('twostair').style.display = 'block';
            document.getElementById('twostairOne').style.display = 'block';
            for (var i = 0; i < domGet.length; i++) {
                domGet[i].style.color = '#4c4c4c';
                domGet[i].nextSibling.style.backgroundColor = 'rgb(198, 198, 198)';
                domGet[i].style.background = 'rgb(242,242,242)'
            }
            domGet[index].style.color = '#40b4f0';
            domGet[index].nextSibling.style.backgroundColor = '#40b4f0'
            domGet[index].style.background = 'white'
            this.setState({
                clickitem: false,
            })

        }

    }

    // 一级目录
    nundfine() {
        if (this.state.item == true) {
            var newArr = []
            newArr.push(this.state.information[0].one)
            for (var i = 1; i < this.state.information.length; i++) {
                if (newArr.indexOf(this.state.information[i].one) == -1) {
                    newArr.push(this.state.information[i].one)
                }
            }

            return (
                newArr.map(function (value, index) {
                    // let net = value.one;
                    return (
                        <div key={index}>
                            <div key={index} ref='douget' onClick={this.oneClick.bind(this, value, index)}
                                className={`${styles.undifine} ${styles.clickItemOne}`}>{value}</div>
                            <hr className={styles.undifineHr} />
                        </div>
                    )
                }, this)
            )
        }

    };

    // 二级点击事件
    twoClick(value, index) {
        let imglogo = document.getElementsByClassName(this.refs.imglogo.className)
        let domGet = document.getElementsByClassName(this.refs.twoClick.className)
        let nameA = document.getElementsByClassName('noneClick')
        for (var j = 0; j < nameA.length; j++) {
            nameA[j].style.display = 'none';
            for (var i = 0; i < domGet.length; i++) {

            }

        }
        this.setState({
            twoValue: value,
            itemthree: true
        })

        for (var num = 0; num < imglogo.length; num++) {
            imglogo[num].src = youbianone
        }
        imglogo[index].src = youbiantwo

        if (window.localStorage.getItem('twoclick') == value) {
            if (window.localStorage.getItem('agin') == 'two') {
                document.getElementById(index + 'name').style.display = 'none';
                window.localStorage.setItem('agin', 'one')
                imglogo[index].src = youbianone;
                for (var i = 0; i < domGet.length; i++) {
                    domGet[i].style.color = '#4c4c4c';
                    domGet[i].nextSibling.style.backgroundColor = 'rgb(198, 198, 198)'
                    domGet[i].style.background = 'rgb(242,242,242)'
                }
                window.localStorage.setItem('agin', 'two')
                window.localStorage.removeItem('twoclick')
            } else {
                window.localStorage.setItem('agin', 'two')
                window.localStorage.setItem('twoclick', value)
                let nameA = document.getElementsByClassName('noneClick')
                for (var j = 0; j < nameA.length; j++) {
                    nameA[j].style.display = 'none';
                    for (var i = 0; i < domGet.length; i++) {
                        domGet[i].style.color = '#4c4c4c';
                        domGet[i].nextSibling.style.backgroundColor = 'rgb(198, 198, 198)'
                        domGet[i].style.background = 'rgb(242,242,242)'
                    }
                    domGet[index].style.color = '#40b4f0';
                    domGet[index].nextSibling.style.backgroundColor = '#40b4f0'
                    domGet[index].style.background = 'white'
                }
                document.getElementById(index + 'name').style.display = 'block';

            }
        } else {
            window.localStorage.setItem('agin', 'two')
            window.localStorage.setItem('twoclick', value)
            let nameA = document.getElementsByClassName('noneClick')
            for (var j = 0; j < nameA.length; j++) {
                nameA[j].style.display = 'none';
                for (var i = 0; i < domGet.length; i++) {
                    domGet[i].style.color = '#4c4c4c';
                    domGet[i].nextSibling.style.backgroundColor = 'rgb(198, 198, 198)'
                    domGet[i].style.background = 'rgb(242,242,242)'
                }
                domGet[index].style.color = '#40b4f0';
                domGet[index].nextSibling.style.backgroundColor = '#40b4f0'
                domGet[index].style.background = 'white'
            }
            document.getElementById(index + 'name').style.display = 'block';
        }


    }

    // 二级目录
    twostair() {
        if (this.state.itemOne == true) {
            var newAray = [];
            for (var i = 1; i < this.state.information.length; i++) {
                if (this.state.information[i].one == this.state.oneValue) {
                    newAray.push(this.state.information[i])
                }
            }
            var newArr = [];
            if (!!newAray[0] && !!newAray[0].two) {
                newArr.push(newAray[0].two);
            } else {
                return message.info("该项下暂无下级")
            }

            for (var i = 1; i < newAray.length; i++) {
                if (newArr.indexOf(newAray[i].two) == -1) {
                    newArr.push(newAray[i].two)
                }
            }
            let threestair = this.threestair();
            return (
                newArr.map((value, index) => {
                    return (
                        <div key={index + ""}>
                            <div>
                                <div ref='twoClick' style={{
                                    paddingLeft: '8px',
                                    position: 'relative',
                                    padding: '5px 8px',
                                    cursor: "pointer",
                                }} className={(styles.undifine, styles.twobackground)} key={index}
                                    onClick={this.twoClick.bind(this, value, index)}>
                                    {value}
                                    <img ref="imglogo" className={styles.imglogo} style={{
                                        width: '10px',
                                        height: '10px',
                                        position: 'absolute',
                                        right: '10px',
                                        top: '10px'
                                    }} src={youbianone} />
                                </div>
                                <hr className={styles.undifineHr} />
                                <div ref={'twoclick' + index} id={index + 'name'} className='noneClick' style={{
                                    display: 'none',
                                    background: 'white',
                                    lineHeight: '20px'
                                }}>{threestair}</div>
                            </div>
                        </div>
                    )
                }, this)
            )
        }


    }

    threeClick(value, index) {
        if (this.state.pageItem == true) {
            document.getElementById('detailPage').style.display = 'none';
            document.getElementById('detailPageA').style.display = 'none';
            this.setState({
                pageItem: false
            })
        }
        document.getElementById('bigpage').style.display = 'block';
        document.getElementById('parcelNow').style.display = 'none';
        let newAray = '', threeIt = '';
        for (var i = 0; i < this.state.information.length; i++) {
            if (this.state.information[i].three == value) {
                newAray = this.state.information[i].stipulate;
                threeIt = this.state.information[i].three
            }
        }
        document.getElementById('detailPage').textContent = newAray
        document.getElementById('threeSibuu').textContent = threeIt
    }

    // 三级目录
    threestair() {
        var newAray = [];

        for (var i = 0; i < this.state.information.length; i++) {
            for (var i = 0; i < this.state.information.length; i++) {
                if (this.state.information[i].two == this.state.twoValue && this.state.information[i].one == this.state.oneValue) {
                    newAray.push(this.state.information[i].three)
                }
            }
        }
        return (
            newAray.map((value, index) => {
                return (
                    <div>
                        <div>
                            <div className='show' key={index} onClick={this.threeClick.bind(this, value, index)}
                                style={{
                                    fontSize: '14px', padding: '4px 0 4px 10px',
                                    cursor: "pointer",
                                }}>{value}</div>
                            <hr className={styles.undifineHr} />
                        </div>
                    </div>
                )
            }
            )
        )
        // }

    }


    accord(value) {
        document.getElementById('accord').style.display = 'none';
        document.getElementById('noAccord').style.display = 'none';
        // document.getElementById('trueItem').disabled=true;
        for (var index = 0; index < document.getElementsByClassName(styles.buttonOne).length; index++) {
            document.getElementsByClassName(styles.buttonOne)[index].style.background = 'white'
            document.getElementsByClassName(styles.buttonOne)[index].style.color = 'rgb(70, 159, 220)'
        }
        document.getElementsByClassName(styles.buttonOne)[value].style.background = 'rgb(70, 159, 220)'
        document.getElementsByClassName(styles.buttonOne)[value].style.color = 'white'
    }

    noAccord(value) {
        //  document.getElementById('trueItem').disabled=false
        document.getElementById('accord').style.display = 'block';
        document.getElementById('noAccord').style.display = 'none';
        for (var index = 0; index < document.getElementsByClassName(styles.buttonOne).length; index++) {
            document.getElementsByClassName(styles.buttonOne)[index].style.background = 'white'
            document.getElementsByClassName(styles.buttonOne)[index].style.color = 'rgb(70, 159, 220)'
        }
        document.getElementsByClassName(styles.buttonOne)[value].style.background = 'rgb(70, 159, 220)'
        document.getElementsByClassName(styles.buttonOne)[value].style.color = 'white'
    }

    twoAccord(value) {
        document.getElementById('noAccord').style.display = 'block';
        document.getElementById('accord').style.display = 'none';
        // document.getElementById('trueItem').disabled=false
        for (var index = 0; index < document.getElementsByClassName(styles.buttonOne).length; index++) {
            document.getElementsByClassName(styles.buttonOne)[index].style.background = 'white'
            document.getElementsByClassName(styles.buttonOne)[index].style.color = 'rgb(70, 159, 220)'
        }
        document.getElementsByClassName(styles.buttonOne)[value].style.background = 'rgb(70, 159, 220)'
        document.getElementsByClassName(styles.buttonOne)[value].style.color = 'white'
    }

    returnA() {
        document.getElementById('bigpage').style.display = 'none';
        document.getElementById('parcelNow').style.display = 'block';
    }

    // 详情页
    childstair() {
        return (
            <div className={styles.bodyOne} style={{ textAlign: "left" }}>
                <div>
                    <header className={styles.headerOne}>
                        <span className={(styles.headertwo, styles.leftOne)} onClick={this.returnA.bind(this)}>
                            <img style={{
                                height: '18px',
                                width: '11px',
                                paddingTop: '5px'
                            }} src={zuobiaozhi} />
                        </span>
                        <span className={styles.headerthree}>渡口设置</span>
                        <span className={(styles.headerfrim, styles.RightOne)}> <img
                            style={{ height: '15px', width: '15px' }} src={shuaxin} /> </span>
                    </header>
                </div>
                <div>
                    <div style={{ background: 'white', paddingBottom: '8px' }}>
                        <div className={styles.fontPaddin}>
                            <span id="threeSibuu"></span>
                            <span
                                onClick={this.childName.bind(this)}>&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;
                                <img style={{ width: '18px', height: '18px' }} src={nobufuhe} /></span>
                        </div>
                        <div className={styles.detailPageB} id="detailPageA">
                            <div className={styles.detailPageA} id='detailPage' style={{ display: 'none' }}>
                            </div>
                        </div>
                        <div>
                            <button style={{ marginLeft: '4px' }} className={(styles.buttonOne)}
                                onClick={this.accord.bind(this, 0)}>符合
                            </button>
                            <button className={(styles.buttonOne)}
                                onClick={this.noAccord.bind(this, 1)}>不符合<span>(当场纠正)</span></button>
                            <button className={(styles.buttonOne)}
                                onClick={this.twoAccord.bind(this, 2)}>不符合<span>(限期整改)</span></button>
                        </div>
                        <div style={{ height: '8px', background: 'rgb(242, 242, 242)', marginTop: '9px' }}></div>
                    </div>
                    <div style={{ background: 'white', marginTop: '7px' }}>
                        <div style={{ display: 'none' }} id="accord">
                            <div id="camera" className={styles.fontTwo}>
                                <span className={styles.fontNow}>现场照片</span>
                                <span id="photo" className={styles.backgroundGray}> <img src={phote} style={{
                                    width: '17px',
                                    height: '17px'
                                }} /> </span>
                            </div>
                            <div>
                                <div className={styles.leftLogo}>
                                    <span> <img /><span className={styles.signal}>*</span>检查描述</span>
                                    {/* <span> <img src={yuyin} /> 按住说话</span> */}
                                </div>
                                <div className={styles.inputSize} style={{ fontSize: '12px', paddingBottom: '10px' }}>
                                    <input type="text" placeholder="" />
                                </div>
                                <div className={styles.orientation}>
                                    <span style={{ marginLeft: '10px' }}>定&#x3000;位</span>
                                    <span style={{ marginLeft: '10px' }}> <img src={diliweizhi}
                                        className={styles.geography} />----</span>
                                </div>
                            </div>
                        </div>

                        <div id="noAccord" style={{ display: 'none' }}>
                            <div id="camera" className={styles.fontTwo}>
                                <span className={styles.fontNow}>现场照片</span>
                                <span id="photo" className={styles.backgroundGray}> <img src={phote} style={{
                                    width: '17px',
                                    height: '17px'
                                }} /> </span>
                            </div>
                            <div>
                                <div className={styles.leftLogo}>
                                    <span> <img /><span className={styles.signal}>*</span>检查描述</span>
                                    {/* <span> <img src={yuyin} /> 按住说话</span> */}
                                </div>
                                <div className={styles.inputSize} style={{ paddingBottom: '10px' }}>
                                    <input type="text" placeholder="" style={{ fontSize: '12px' }} />
                                </div>
                                <div className={styles.leftLogo}>
                                    <span> <img src="" /><span className={styles.signal}>*</span>整改要求</span>
                                    {/* <span> <img src="" /> 按住说话</span> */}
                                </div>
                                <div className={styles.inputSize} style={{ paddingBottom: '10px' }}>
                                    <input type="text" placeholder="" style={{ fontSize: '12px' }} />
                                </div>
                                <div className={styles.leftLogo} style={{ paddingBottom: '10px' }}>
                                    <span style={{ marginRight: '10px' }}><span
                                        className={styles.signal}>*</span>复查时间</span>
                                    <input type="text" placeholder="" style={{
                                        fontSize: '12px',
                                        borderRadius: '4px',
                                        border: '1px solid rgb(170, 170, 170)',
                                        lineHeight: '20px',
                                        width: '120px',
                                        textAlign: 'center'
                                    }} />
                                </div>
                                <div className={styles.orientation}>
                                    <span style={{ marginLeft: '10px' }}>定&#x3000;位</span>
                                    <span style={{ marginLeft: '10px' }}><img src={diliweizhi}
                                        className={styles.geography} />----</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.submitTrue}>
                        <button onClick={this.returnA.bind(this)} id="trueItem">确&#x3000;认</button>
                    </div>
                </div>
            </div>
        )
    }

    // 法律法规
    childName() {
        if (this.state.pageItem == false) {
            document.getElementById('detailPage').style.display = 'block';
            document.getElementById('detailPageA').style.display = 'block';
            this.setState({
                pageItem: true
            })
        } else {
            document.getElementById('detailPage').style.display = 'none';
            document.getElementById('detailPageA').style.display = 'none';
            this.setState({
                pageItem: false
            })
        }
    }

    amount() {
        return (
            name = 0
        )
    }
    back = () => {

        if (this.state.propsData.seePath == "projectItem") {
            hashHistory.push({
                pathname: "/main/projectItem",
            })

        } else if (this.state.propsData.seePath == "checklistManagement") {
            hashHistory.push({
                pathname: "/main/checklistManagement",
                state: {
                    sortId: this.state.propsData.sortId,
                    checkName: this.state.propsData.checkName,
                }
            })
        } else if (this.state.propsData.seePath == "listSortLevelBySortId") {
            hashHistory.push({
                pathname: "/main/listSortLevelBySortId",
                state: {
                    idItem: this.state.propsData.sortId,
                    sort: this.state.propsData.checkName,
                }
            })
        } else if (this.state.propsData.seePath == "pubilcSpecial") {
            hashHistory.push({
                pathname: "/main/pubilcSpecial",
                state: {
                    pageNum: this.state.propsData.pageNum,
                }
            })
        } else if (this.state.propsData.seePath == "special") {
            hashHistory.push({
                pathname: "/main/special",
                state: {
                    pageNum: this.state.propsData.pageNum,
                    size: this.state.propsData.size,
                }
            })
        }
    }

    render() {
        let onestair = this.nundfine();
        let twostair = this.twostair();
        let childstair = this.childstair();
        let amount = this.amount();
        return (
            <div className={stylez.wrapPadding}>
                <Breadcrumb separator=">" style={{ textAlign: "left" }}>
                    <Breadcrumb.Item>{
                        this.state.propsData.seePath == "pubilcSpecial" ? "发布专项检查" : "检查管理"
                    }
                    </Breadcrumb.Item>
                    {
                        this.state.propsData.seePath == "checklistManagement" ? <Breadcrumb.Item onClick={this.back}>检查单</Breadcrumb.Item> : ""
                    }
                    {
                        this.state.propsData.seePath == "special" ? <Breadcrumb.Item onClick={this.back}>专项检查</Breadcrumb.Item> : ""
                    }
                    {/* <Breadcrumb.Item onClick={this.back} style={{ display: this.state.propsData.seePath == "checklistManagement" ? "inline-block" : "none" }}>检查单</Breadcrumb.Item> */}
                    <Breadcrumb.Item>查看</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloat}></div>

                <div className={styles.wrap}>
                    <div id="parcel" className={styles.bigAll}>
                        <div id='parcelNow' className={styles.bodyOne}>
                            <div className={styles.yijian}>
                                {/*<img style={{height: '30%', width: '30%'}} src={yijing}/>*/}
                            </div>
                            <header className={styles.headerOne}>
                                <span className={styles.leftOne}> <img src={zuobiaozhi} style={{
                                    height: '18px',
                                    width: '11px',
                                    paddingTop: '5px'
                                }} /> </span>
                                <span>{self.state.basicInfo.checkType == 1 ? "日常检查" : "专项检查"}</span>
                                <span className={styles.RightOne}><img src={shuaxin}
                                    style={{
                                        height: '15px',
                                        width: '15px'
                                    }} /> </span>
                            </header>
                            <div style={{ position: 'relative', }} id="allClick" className={styles.twoAll}>
                                <div className={styles.oneoneone}>{self.state.basicInfo.name}</div>
                                <hr className={styles.undifineHr} />
                                <div style={{ height: '375px', overflow: 'hidden', width: '270px', textAlign: "left", }}>
                                    <div style={{
                                        height: '375px',
                                        overflowY: 'scroll',
                                        width: '300px',
                                        textAlign: "left",
                                    }}>
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                textAlign: 'center',
                                                lineHeight: '35px',
                                                color: 'black',
                                            }}>
                                            <img style={{ width: '12px', height: '12px', marginRight: '4px' }} src={sanjixuanxiang} />
                                            一级检查项
                                        </div>
                                        <hr className={styles.undifineHr} />
                                        <div id='onestair' onClick={this.handleClick.bind(this)} style={{ cursor: "pointer", }}>{onestair}</div>
                                    </div>
                                </div>
                                <div>
                                    <div id='twostairOne' style={{
                                        width: "180px",
                                        overflow: 'hidden',
                                        height: '387px',
                                        position: 'absolute',
                                        top: '33px',
                                        right: '0',
                                        display: 'none',
                                        textAlign: "left",
                                    }}>
                                        <div id='twostair' className={styles.twostairTwo} style={{ display: 'none' }}>
                                            <div style={{
                                                fontSize: '14px',
                                                textAlign: 'center',
                                                lineHeight: '35px',
                                                color: 'black',
                                            }}><img style={{ width: '12px', height: '12px', marginRight: '4px' }}
                                                src={yijingcha_03} />二级检查项
                                            </div>
                                            <hr className={styles.undifineHr} />
                                            {twostair}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className={(styles.buttonItem, styles.submitTrue)}>
                                {/* <div><span><img src=""/></span> <span>已检</span> <span>{amount}</span> </div> */}
                                <button id="submit" disabled>发布检查单</button>
                            </div>
                        </div>
                        <div id="bigpage" style={{ display: 'none' }}>{childstair}</div>
                    </div>
                    <div style={{ display: this.state.special ? "inline-block" : "none" }} className={styles.rightInfo}>
                        参与部门：
                        {this.state.checkList.map((item, index) => {
                            return <div key={index + ""}>{item}</div>
                        })}
                        <div className={styles.rightLine}></div>
                    </div>
                </div>

            </div>

        )

    }
}

export default IndexPage;
