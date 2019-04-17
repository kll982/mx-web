import React from 'react';
import moment from "moment";
import { Row, Col, Select, Icon, Card, Spin } from 'antd';
import styles from './index.less'
import '../echarts/westeros.js';
import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import api from '../../utils/api.js';
import 'echarts/map/js/province/jiangsu.js';
import 'echarts/map/js/province/jiangxi.js';
import publicstyle from '../../img/public.less'
import $ from 'jquery';

moment.locale('zh-cn');
// 引入 ECharts 主模块

var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入词云
require('echarts-wordcloud');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');


let self;
const bodyStyle = {
    bodyStyle: {
        height: 432,
        background: '#fff',
    }
}, Option = Select.Option;
export default class home extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.initFontSize.bind(this);
        this.state = {
            provinceMap: "",
            departmentName: "",
            selectMapFixStatus: "",
            selectPieFixStatus: "",
            selectBarFixStatus: "",
            selectLineFixStatus: "",
            selectMapDateType: "1",
            selectPieDateType: "1",
            selectBarDateType: "1",
            selectLineDateType: "1",
            firstPadding: "32px",

            mouths: [],
            checkType: [],
            selectMouth: "",
            selectCheckType: "1=渡口渡船",
            selectType: "2=限期整改",
            checkSortId: "",
            numberCard: [],
            ringLoading: true,
            pieLoading: true,
            mapLoading: true,
            wordLoading: true,
            selectMouthS: "-",
            defaultMouth: " ",
        }

    }

    componentWillMount() {
        if (localStorage.getItem("level") != "省" && localStorage.getItem("level") != "市") {
            hashHistory.push({
                pathname: "/main/trouble_report",
            })
        }
        let s = JSON.parse(localStorage.getItem("userInfo"));
        if (!s) {
        }
        else {
            self.setState({
                departmentName: s.departmentName,
            })
        }

    }

    componentDidMount() {
        self.getMouth();
        self.getCheckType();
        self.initFontSize();
        window.addEventListener('resize', this.initFontSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.initFontSize);
    }

    getMouth() {
        $jsonp3(self, api.homeListCheckMonth, {})
            .then((res) => {
                self.setState({
                    mouths: res.data.response.list,
                    selectMouthS: res.data.response.list[res.data.response.list.length - 1].split("-")[1] + "月",
                    defaultMouth: res.data.response.list[res.data.response.list.length - 1],
                })
                self.Datas();
                self.wordColud();
            })

    }

    // 时间
    ChooseMouth(value) {
        let item = new Promise(function (resolve, reject) {
            self.setState({
                selectMouth: value,
                selectMouthS: value.split("-")[1] + "月",
            })
            resolve(self.state.value)
        })
        item.then(function (value) {
            self.Datas();
            self.wordColud();
        })
    }

    getCheckType() {
        $jsonp3(self, api.listAllCheckSort, {})
            .then((res) => {
                self.setState({
                    checkType: res.data.response.list
                })
            })
    }

    // 检查对象
    ChooseCheckType(value) {
        let item = new Promise(function (resolve, reject) {
            self.setState({
                selectCheckType: value,
            })
            resolve(self.state.value)
        })
        item.then(function (value) {
            self.wordColud();
        })

    }

    // 地图上的select
    ChooseType(value) {

        let item = new Promise(function (resolve, reject) {
            self.setState({
                selectType: value,
            })
            resolve(self.state.value)
        })
        item.then(function (valueA) {
            self.Datas();
        })
    }

    Datas() {
        var a1 = document.body.clientWidth || document.body.scrollWidth;
        if (a1 >= 1200) {
            var top1 = (a1 - 360) / 2 + "px";
        } else {
            var top1 = (a1 - 300) + "px";
        }
        self.setState({
            colwidth: top1
        })

        $jsonp3(self, api.homeListStatisticsByConditional, {
            statisticsMonth: self.state.selectMouth,
            // 1 当场纠正 2 限期整改
            type: self.state.selectType.split("=")[0],
            // 检查对象分类Id (1 渡口渡船 2 游览经营公司-通航水域 3 游览经营公司-非通航水域 )
            checkSortId: self.state.selectCheckType.split("=")[0],
        }).then((res) => {
            let counties = res.data.response.troubleDetail;
            let countiesOne = [];
            counties.map((value, index) => {
                var oneName = {
                    type: 'text',
                    top: index * 28 + 40,
                    left: '82%',
                    style: {
                        text: value.name,
                        color: '#c93265',
                        fontSize: 14,
                        fontWeight: 190,
                    }
                }
                countiesOne.push(oneName)
            })
            counties.map((value, index) => {
                var oneName = {
                    type: 'text',
                    top: index * 28 + 40,
                    left: '94%',
                    style: {
                        text: value.value,
                        color: '#c93265',
                        fontSize: 14,
                        fontWeight: 170,
                    }
                }
                countiesOne.push(oneName)
            })
            var data = res.data.response;

            var leftcount = "";
            if (!!!data.solvedCount || !!!data.unSolvedCount) {
                leftcount = 0
            } else {
                let count = data.solvedCount + data.unSolvedCount;
                leftcount = Number(data.solvedCount / count * 100).toFixed(2)
            }

            // 四个小卡片
            var numberCard = [{
                color: "rgb(100, 234, 145)",
                icon: "file-text",
                number: data.orderCount,
                title: self.state.selectMouthS + "检查单数量",
            }, {
                color: "rgb(143, 201, 251)",
                icon: "exception",
                number: data.correctCount + data.reviewCount,
                title: self.state.selectMouthS + "隐患数量",
            }, {
                color: "rgb(216, 151, 235)",
                icon: "check-circle-o",
                number: data.solvedCount,
                title: self.state.selectMouthS + "已整改隐患",
            }, {
                color: "rgb(246, 152, 153)",
                icon: "area-chart",
                number: data.maxCityName,
                title: self.state.selectMouthS + "隐患最多区域",
            }];
            // 环形图数据
            let ringData = [
                {
                    name: "未整改隐患",
                    value: data.unSolvedCount
                },
                {
                    name: "已整改隐患",
                    value: data.solvedCount
                }
            ]
            let pieData = [
                {
                    name: "限期整改",
                    value: data.reviewCount
                },
                {
                    name: "当场纠正",
                    value: data.correctCount
                }
            ]
            // 地图

            // 隐患词云

            // 环
            let ring = echarts.init(document.getElementById("ring"), 'westeros'),
                pie = echarts.init(document.getElementById("pie"), 'westeros'),
                map = echarts.init(document.getElementById("map"), 'westeros');
            let ringOption = {
                title: {
                    text: "隐患数量",
                    textStyle: {
                        color: "#108ee9"
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    y: "bottom",
                },
                graphic: {
                    elements: [
                        {
                            type: 'text',
                            top: "30%",
                            left: "center",
                            style: {
                                text: data.reviewCount + data.correctCount,
                                fill: '#c93265',
                                fontSize: 30
                            }
                        },
                        {
                            type: 'text',
                            top: "40%",
                            left: "center",
                            style: {
                                text: "隐患总数",
                                fill: '#5c5c5c',
                                fontSize: 18
                            }
                        },
                        {
                            type: 'text',
                            top: "52%",
                            left: "center",
                            style: {
                                // NaN == false : null || Number
                                text: isNaN(data.troubleSpecific) ? data.troubleSpecific : (Number(data.troubleSpecific) > 0 ? "" + Number(data.troubleSpecific) : "" + Number(data.troubleSpecific)) + "% 较上月隐患总数",
                                fill: '#b6b6b6',
                                fontSize: 14
                            }
                        },
                        {
                            type: 'text',
                            top: "58%",
                            left: "center",
                            style: {
                                text: leftcount + " % 隐患整改率",
                                // data.level == "省" ? (isNaN(data.allAverage) ? data.allAverage : Number(data.allAverage) + " 全省隐患数量平均值") : (isNaN(data.average) ? data.average : ((Number(data.average) > 0 ? "" + Number(data.average) : "" + Number(data.average)) + "% 较全部地区平均值")),
                                fill: '#b6b6b6',
                                fontSize: 14
                            }
                        },
                    ]
                },
                series: [
                    {
                        name: '隐患数量',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: true,
                        label: {

                            normal: {
                                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                backgroundColor: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                                borderColor: '#aaa',
                                borderWidth: 0.3,
                                borderRadius: 4,
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.2,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 14,
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: 'rgb(153,153,153)',
                                        padding: [2, 1],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data: ringData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
                ;
            // 饼
            let pieOption = {
                title: {
                    text: '隐患结果分布',
                    x: 'left',
                    textStyle: {
                        color: "#108ee9"
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    y: "bottom",
                },
                series: [
                    {
                        name: '隐患结果分布',
                        type: 'pie',
                        radius: '70%',
                        center: ['50%', '50%'],
                        data: pieData,
                        label: {

                            normal: {
                                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                backgroundColor: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                                borderColor: '#aaa',
                                borderWidth: 0.3,
                                borderRadius: 4,
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.2,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 14,
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: 'rgb(153,153,153)',
                                        padding: [2, 1],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            var jiangsuMap = "/ico/jiangsu.json";

            let geoCoordMap = {
                "南京市": [118.767413, 32.041544],
                "无锡市": [120.301663, 31.574729],
                "徐州市": [117.184811, 34.261792],
                "常州市": [119.446973, 31.472752],
                "苏州市": [120.619585, 31.299379],
                "南通市": [121.064608, 32.116212],
                "连云港市": [119.178821, 34.600018],
                "淮安市": [119.021265, 33.597506],
                "盐城市": [120.139998, 33.377631],
                "扬州市": [119.421003, 32.893159],
                "镇江市": [119.452753, 32.004402],
                "泰州市": [120.015176, 32.484882],
                "宿迁市": [118.275162, 33.963008],
            };
            for (var i = 0; i < data.city.length; i++) {
                data.city[i].name = data.city[i].name + "市"
            }

            function convertData(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res
            }

            var max = 480, min = 9;
            var maxSize4Pin = 100, minSize4Pin = 20;
            // 地图
            let mapOption = {
                title: {
                    text: '隐患区域统计',
                    x: 'left',
                    textStyle: {
                        color: "#108ee9"
                    }
                },
                graphic: {
                    elements: countiesOne
                },
                color: ["#ce376b"],
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        if (typeof (params.value)[2] == "undefined") {
                            return params.name + ' : ' + params.value;
                        } else {
                            return params.name + ' : ' + params.value[2];
                        }
                    }
                },
                geo: {
                    show: true,
                    map: 'jiangsu',
                    zoom: 1.2,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true,
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: 'white',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7',
                        }
                    }
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data: [''],
                },
                visualMap: {
                    show: true,
                    x: 'left',
                    y: 'bottom',
                    text: ['高', '低'], // 文本，默认为数值文本
                    seriesIndex: [1],
                    inRange: {
                        color: ['#69c0ff ', '#ffd666', '#ff7875'] // 黑紫黑
                    }
                },
                series: [
                    {
                        name: '水域地图异常点',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(data.city),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                    },
                    {
                        type: 'map',
                        map: 'jiangsu',
                        geoIndex: 0,
                        aspectScale: 0.75, //长宽比
                        animation: false,
                        data: data.city
                    },
                    {
                        name: '点',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbol: 'pin',
                        symbolSize: function (val) {
                            var a = (maxSize4Pin - minSize4Pin) / (max - min);
                            var b = minSize4Pin - a * min;
                            b = maxSize4Pin - a * max + 5;
                            var a1 = 0;
                            if (a * val[2] + b > 40) {
                                a1 = a * val[2] + b
                            } else {
                                a1 = 40
                            }
                            return a1;
                        },
                        label: {
                            normal: {
                                formatter: function (params) {
                                    if (typeof (params.value)[2] == "undefined") {
                                        return params.value;
                                    } else {
                                        return params.value[2];
                                    }
                                },
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 9,
                                }
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: '#F62157', //标志颜色
                            }
                        },
                        zlevel: 6,
                        data: convertData(data.city),
                    },
                    {
                        name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(data.city.sort(function (a, b) {
                            return b.value - a.value;
                        }).slice(0, 5)),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: false,

                            },
                        },
                        itemStyle: {
                            normal: {
                                color: '#05C3F9',
                                shadowBlur: 10,
                                shadowColor: '#05C3F9'
                            }
                        },
                        zlevel: 1
                    },

                ]

            };

            ring.setOption(ringOption);
            pie.setOption(pieOption);
            $.get(jiangsuMap, function (geoJson) {
                // must
                echarts.registerMap('jiangsu', geoJson);
                map.setOption(mapOption);
            });

            self.setState({
                numberCard: numberCard,
                pieLoading: false,
                ringLoading: false,
                mapLoading: false,
            })
        })

    }

    // 隐患词云
    wordColud() {
        $jsonp3(self, api.troubleWordCloudMap, {
            statisticsMonth: self.state.selectMouth,
            // 检查对象分类Id (1 渡口渡船 2 游览经营公司-通航水域 3 游览经营公司-非通航水域 )
            checkSortId: self.state.selectCheckType.split("=")[0],
        }).then((res) => {
            self.setState({
                wordLoading: false,
            })
            let wordColud = echarts.init(document.getElementById("wordColud"), 'westeros');
            let wordColudOption = {
                title: {
                    text: "隐患词云分布",
                    x: 'left',
                    textStyle: {
                        color: "#108ee9"
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        type: 'wordCloud',
                        gridSize: 2,
                        sizeRange: [12, 50],
                        rotationRange: [-90, 90],
                        shape: 'pentagon',
                        textStyle: {
                            normal: {
                                color: 'rgb(170,49,49)'
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#cecece'
                            }
                        },
                        data: res.data.response.troubleWordCloudMap
                    }
                ]
            };

            wordColud.setOption(wordColudOption);
        })
    }


    initFontSize = () => {
        var a1 = document.body.clientWidth || document.body.scrollWidth;
        var nubmer1 = 54;
        var nubmer2 = 14;
        var nubmer3 = 30;
        var number4 = 70;
        var number5 = "0";
        if (a1 < 1200) {
            nubmer1 = 54;
            nubmer2 = 14;
            nubmer3 = 30;
            number4 = 70;
            number5 = "0";
        } else if (a1 >= 1200 && a1 < 1600) {
            nubmer1 = 42;
            nubmer2 = 14;
            nubmer3 = 24;
            number4 = 55;
            number5 = "0";
        }
        self.setState({
            firstIconSize: nubmer1 + "px",
            firstTitleSize: nubmer2 + "px",
            firstNumberSize: nubmer3 + "px",
            firstIconLeft: number4 + "px",
            firstPadding: number5,
        })

    }

    setBarFixStatus = (value) => {
        this.setState({
            selectBarFixStatus: value
        }, () => {
            self.loadData1(3)
        })
    }


    render() {
        const numberCards = self.state.numberCard.map((item, key) => {
            return <Col key={key} lg={6} md={12}>
                <Card className={styles.numberCard} bordered={false} style={{ padding: self.state.firstPadding }}>
                    <Icon className={styles.iconWarp}
                        style={{ color: item.color, fontSize: self.state.firstIconSize }}
                        type={item.icon} />
                    <div className={styles.content} style={{ paddingLeft: self.state.firstIconLeft }}>
                        <p className={styles.title}
                            style={{ fontSize: self.state.firstTitleSize }}>{item.title || '-'}</p>
                        <p className={styles.number} style={{ fontSize: self.state.firstNumberSize }}>
                            {item.number || '0'}
                        </p>
                    </div>
                </Card>
            </Col>
        })
        return (
            <div className={styles.welcomea}>
                <Row gutter={24}>
                    <Col style={{ overflow: "hidden" }}>
                        <Col lg={12} xs={24}>
                            <span className={styles.logo}>{this.state.departmentName}</span>
                        </Col>
                        <Col lg={12} xs={24} className={publicstyle.textRight}>
                            <span style={{ fontSize: 20 }}>选择时间:&nbsp;</span>
                            <Select onChange={this.ChooseMouth}
                                style={{ width: 120, marginRight: 10 }} placeholder={self.state.defaultMouth}>
                                {self.state.mouths.map((item) => {
                                    return <Option value={item} key={item}>{item}</Option>
                                })}
                            </Select>
                        </Col>
                    </Col>
                    {numberCards}
                    {/*ring*/}
                    <Col lg={12} md={24} id="Row1">
                        <Spin spinning={this.state.ringLoading}>
                            <Card bordered={false} style={{
                                height: 450,
                                background: '#fff',
                            }} className={styles.numberCard1}>
                                <div id="ring" style={{ width: this.state.colwidth, height: "400px" }}></div>
                            </Card>
                        </Spin>
                    </Col>
                    {/*pie*/}
                    <Col lg={12} md={24}>
                        <Spin spinning={this.state.pieLoading}>
                            <Card bordered={false} style={{
                                height: 450,
                                background: '#fff',
                            }} className={styles.numberCard1}>
                                <div id="pie" style={{ width: this.state.colwidth, height: "400px" }}></div>
                            </Card>
                        </Spin>
                    </Col>
                    {/*map*/}
                    <Col lg={12} md={24}>
                        <Spin spinning={this.state.mapLoading}>
                            <Card bordered={false} style={{
                                height: 450,
                                background: '#fff',
                            }} className={styles.numberCard1}>
                                <div className={styles.numberCard1Button}>
                                    <Select onChange={this.ChooseType}
                                        style={{ width: "180px", zIndex: 1 }}
                                        value={this.state.selectType.split("=")[1]}>
                                        <Option value="1=当场纠正">当场纠正</Option>
                                        <Option value="2=限期整改">限期整改</Option>
                                    </Select>
                                </div>
                                <div id="map" style={{ width: this.state.colwidth, height: "400px" }}></div>
                            </Card>
                        </Spin>
                    </Col>
                    {/*词云*/}
                    <Col lg={12} md={24}>
                        <Spin spinning={this.state.wordLoading}>
                            <Card bordered={false} style={{
                                height: 450,
                                background: '#fff',
                            }} className={styles.numberCard1}>
                                <div className={styles.numberCard1Button}>
                                    <Select onChange={this.ChooseCheckType}
                                        value={this.state.selectCheckType.split("=")[1]}
                                        style={{ width: "180px", zIndex: 1 }}>
                                        {
                                            self.state.checkType.map((item) => {
                                                return <Option value={item.id + "=" + item.sort}
                                                    key={item.id + ""}>{item.sort}</Option>
                                            })
                                        }
                                    </Select>
                                </div>
                                <div id="wordColud" style={{ width: this.state.colwidth, height: "400px" }}></div>
                            </Card>
                        </Spin>
                    </Col>
                </Row>
            </div>
        )
    }
}