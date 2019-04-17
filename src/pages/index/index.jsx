import React from 'react';
import moment from "moment";
import {Row, Col, Input, DatePicker, Icon, Select, Radio, Table, message, Card, Spin} from 'antd';
import styles from './index.less'
import '../echarts/westeros.js';
import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import api from '../../utils/api.js';
import 'echarts/map/js/province/jiangsu.js';
import 'echarts/map/js/province/jiangxi.js';
import $ from 'jquery';

import darkblue from "../../img/darkblue.png";
import darkred from "../../img/darkred.png";
import darkyellow from "../../img/darkyellow.png";
import location12 from "../../img/location12.png";
import location20 from "../../img/location20.png";
import location30 from "../../img/location30.png";
import location40 from "../../img/location40.png";
import location50 from "../../img/location50.png";
import location60 from "../../img/location60.png";
import location401 from "../../img/location401.png";
import location42 from "../../img/location42.png";

moment.locale('zh-cn');
// 引入 ECharts 主模块

var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

var numbers = [
    {
        icon: 'file-text',
        color: "rgb(100, 234, 145)",
        title: '当月检查单数量',
        number: 0
    }, {
        icon: 'exception',
        color: "rgb(143, 201, 251)",
        title: '当月隐患数量',
        number: <span>一般 0 重大 0</span>,
    }, {
        icon: 'check-circle-o',
        color: "rgb(216, 151, 235)",
        title: '当月已解决隐患',
        number: 0
    }, {
        icon: 'area-chart',
        color: "rgb(246, 152, 153)",
        title: '当月隐患最多区域',
        number: <span>地区 0</span>,
    }
];
var mapCityData = [
    {name: "南京市", value: 0, coord: [118.767413, 32.041544], symbol: 'pin'},
    {name: '无锡市', value: 0, coord: [120.301663, 31.574729], symbol: 'pin'},
    {name: '徐州市', value: 0, coord: [117.184811, 34.261792], symbol: 'pin'},
    {name: '常州市', value: 0, coord: [119.946973, 31.772752], symbol: 'pin'},
    {name: '苏州市', value: 0, coord: [120.619585, 31.299379], symbol: 'pin'},
    {name: '南通市', value: 0, coord: [120.864608, 32.016212], symbol: 'pin'},
    {name: '连云港市', value: 0, coord: [119.178821, 34.600018], symbol: 'pin'},
    {name: '淮安市', value: 0, coord: [119.021265, 33.597506], symbol: 'pin'},
    {name: '盐城市', value: 0, coord: [120.139998, 33.377631], symbol: 'pin'},
    {name: '扬州市', value: 0, coord: [119.421003, 32.393159], symbol: 'pin'},
    {name: "镇江市", value: 0, coord: [119.452753, 32.204402], symbol: 'pin'},
    {name: '泰州市', value: 0, coord: [119.915176, 32.484882], symbol: 'pin'},
    {name: '宿迁市', value: 0, coord: [118.275162, 33.963008], symbol: 'pin'},
];
var mock1data = [
    {name: '南京市', value: 0},
    {name: '无锡市', value: 0},
    {name: '徐州市', value: 0},
    {name: '常州市', value: 0},
    {name: '苏州市', value: 0},
    {name: '南通市', value: 0},
    {name: '连云港市', value: 0},
    {name: '淮安市', value: 0},
    {name: '盐城市', value: 0},
    {name: '扬州市', value: 0},
    {name: '镇江市', value: 0},
    {name: '泰州市', value: 0},
    {name: '宿迁市', value: 0},
];


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
            mapLoading: false,
            pieLoading: false,
            barLoading: false,
            lineLoading: false,
            mapCityData: mapCityData,
            firstPadding: "32px",
            numbersCardData: numbers,
            mapQueryData: mock1data
        }

    }

    componentWillMount() {

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
        self.loadDataMap(1);
        //self.testMap();
        self.loadData1(23);
        self.loadData2(4);
        self.loadDataCountCurrent();
        self.loadDataTroubleCurrent("total");
        self.loadDataTroubleCurrent("done");
        self.loadDataRankList();
        self.initFontSize();
        window.addEventListener('resize', this.initFontSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.initFontSize);
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
    //不同区域 指定时间段内（按年、按月、按日） 不同等级隐患数量 统计【矢量地图
    loadDataMap = (queryIndex) => {
        var a1 = document.body.clientWidth || document.body.scrollWidth;
        if (a1 >= 1200) {
            var top1 = (a1 - 360) / 2 + "px";
        } else {
            var top1 = (a1 - 300) + "px";
        }
        self.setState({
            colwidth: top1
        })
        var p1 = "mapLoading";
        var p2 = self.state.selectMapDateType;
        var fixStatus = self.state.selectMapFixStatus;
        var p3 = "chartStartTime1";
        var p4 = "chartEndTime1";
        //p2当前选择的查询状态
        self.setState({
            [p1]: true
        })
        if (p2 == "1") {
            var startTime = moment().subtract(7, "days").format("YYYY-MM-DD")
            var endTime = moment().format("YYYY-MM-DD")
            var selectDateType = "day";
            var selectFixStatus = fixStatus;
        } else if (p2 == "2") {
            var startTime = moment().subtract(30, "days").format("YYYY-MM-DD")
            var endTime = moment().format("YYYY-MM-DD")
            var selectDateType = "day";
            var selectFixStatus = fixStatus;
        }

        $jsonp3(self, api.troubleOfMsa4VectorMap, {
            msaId: "",
            type: "",
            grade: "",
            fixStatus: selectFixStatus,
            startDate: startTime,
            endDate: endTime,
            dateType: selectDateType,
        }).then((res) => {
            var startTime1 = startTime.split("-");
            startTime1.splice(0, 1);
            var startTime1Text = startTime1.join("-")
            var endTime1 = endTime.split("-");
            endTime1.splice(0, 1);
            var endTime1Text = endTime1.join("-");

            self.setState({
                [p1]: false,
                [p3]: startTime1Text,
                [p4]: endTime1Text,
            })

            //地图
            var datapie1 = res.data.response.pieSeries;
            var pieSeriesData1 = [];
            for (var k2 = 0; k2 < datapie1.length; k2++) {
                pieSeriesData1.push(datapie1[k2])
            }
            var shiff = pieSeriesData1;
            for (var i = 0; i < shiff.length; i++) {
                shiff[i].name = shiff[i].name + "市"
            }
            self.setState({
                mapQueryData: shiff
            }, () => {
                self.testMap();
            })

        }).catch((err) => {
            self.setState({
                [p1]: false
            })
        });

    }
    //查询第二和第三
    loadData1 = (queryIndex) => {
        if (queryIndex == 23) {
            self.setState({
                "pieLoading": true,
                "barLoading": true,
            })
            var startTime = moment().subtract(7, "days").format("YYYY-MM-DD")
            var endTime = moment().format("YYYY-MM-DD")
            var selectDateType = "day";
            var selectFixStatus = "";
        } else {
            if (queryIndex == 2) {
                var p1 = "pieLoading";
                var p2 = self.state.selectPieDateType;
                var fixStatus = self.state.selectPieFixStatus;
                var p3 = "chartStartTime2";
                var p4 = "chartEndTime2";
            } else if (queryIndex == 3) {
                var p1 = "barLoading";
                var p2 = self.state.selectBarDateType;
                var fixStatus = self.state.selectBarFixStatus;
                var p3 = "chartStartTime3";
                var p4 = "chartEndTime3";
            }
            //p2当前选择的查询状态
            self.setState({
                [p1]: true
            })

            if (p2 == "1") {
                var startTime = moment().subtract(7, "days").format("YYYY-MM-DD")
                var endTime = moment().format("YYYY-MM-DD")
                var selectDateType = "day";
                var selectFixStatus = fixStatus;
            } else if (p2 == "2") {
                var startTime = moment().subtract(30, "days").format("YYYY-MM-DD")
                var endTime = moment().format("YYYY-MM-DD")
                var selectDateType = "day";
                var selectFixStatus = fixStatus;
            }
        }
        $jsonp3(self, api.troubleOfMsa, {
            msaId: "",
            type: "",
            grade: "",
            fixStatus: selectFixStatus,
            startDate: startTime,
            endDate: endTime,
            dateType: selectDateType,
        }).then((res) => {
            var startTime1 = startTime.split("-");
            startTime1.splice(0, 1);
            var startTime1Text = startTime1.join("-")
            var endTime1 = endTime.split("-");
            endTime1.splice(0, 1);
            var endTime1Text = endTime1.join("-");

            if (queryIndex == 23) {
                self.setState({
                    "pieLoading": false,
                    "barLoading": false,
                })
                self.setState({
                    chartStartTime1: startTime1Text,
                    chartEndTime1: endTime1Text,
                    chartStartTime2: startTime1Text,
                    chartEndTime2: endTime1Text,
                    chartStartTime3: startTime1Text,
                    chartEndTime3: endTime1Text
                })
            } else {
                self.setState({
                    [p1]: false,
                    [p3]: startTime1Text,
                    [p4]: endTime1Text,
                })
            }
            var list = res.data.response.list;
            var legend = res.data.response.legend;

            var data1 = res.data.response.lineSeries;
            var barSeriesData = [];
            for (var k2 = 0; k2 < data1.length; k2++) {
                var temp1 = {
                    name: data1[k2].name,
                    type: 'bar',
                    data: data1[k2].data,
                    markPoint: {
                        data: [{
                            type: 'max',
                            name: '最大值'
                        },
                            {
                                type: 'min',
                                name: '最小值'
                            }
                        ]
                    },
                    markLine: {
                        data: [{
                            type: 'average',
                            name: '平均值'
                        }]
                    }
                }
                barSeriesData.push(temp1)
            }
            var option1 = {
                title: {
                    text: self.state.chartStartTime3 + "~" + self.state.chartEndTime3 + '隐患数量统计',
                    textStyle: {
                        color: "#108ee9"
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    },
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                },
                legend: {
                    data: res.data.response.legend,
                    x: 'right',
                    orient: 'vertical',
                },
                xAxis: {
                    data: res.data.response.xAxis,
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                yAxis: {
                    name: '数量'
                },
                series: barSeriesData
            };
            self.setState({
                dataBar: option1
            })
            //饼图
            var datapie = res.data.response.pieSeries;
            var pieSeriesData = [];
            for (var k2 = 0; k2 < datapie.length; k2++) {
                pieSeriesData.push(datapie[k2])
            }
            var option2 = {
                title: {
                    text: self.state.chartStartTime2 + "~" + self.state.chartEndTime2 + '隐患数量统计',
                    subtext: '',
                    x: 'left',
                    textStyle: {
                        color: "#108ee9"
                    }
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    show: true,
                    data: res.data.response.legend
                },
                toolbox: {
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    },
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [{
                    name: '区域',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    data: pieSeriesData.sort(function (a, b) {
                        return a.value - b.value;
                    }),
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                }]
            };
            self.setState({
                dataPie: option2
            })

            if (queryIndex == 2 || queryIndex == 23) {
                var myChart2 = echarts.init(document.getElementById("mainAreaPie"), 'westeros');
                myChart2.setOption(option2);
            }
            if (queryIndex == 3 || queryIndex == 23) {
                var myChart1 = echarts.init(document.getElementById("mainAreaBar"), 'westeros');
                myChart1.setOption(option1);
            }

        }).catch((err) => {
            if (queryIndex == 23) {
                self.setState({
                    "pieLoading": false,
                    "barLoading": false,
                })
            } else {
                self.setState({
                    [p1]: false,
                })
            }
        });

    }

    //查询线型图
    loadData2 = (queryIndex) => {
        self.setState({
            "lineLoading": true
        })
        var p2 = self.state.selectLineDateType;
        if (p2 == "1") {
            var startTime = moment().subtract(7, "days").format("YYYY-MM-DD")
            var endTime = moment().format("YYYY-MM-DD")
            var selectDateType = "day";
            var selectFixStatus = self.state.selectLineFixStatus;
        } else if (p2 == "2") {
            var startTime = moment().subtract(30, "days").format("YYYY-MM-DD")
            var endTime = moment().format("YYYY-MM-DD")
            var selectDateType = "day";
            var selectFixStatus = self.state.selectLineFixStatus;
        }

        $jsonp3(self, api.troubleOfMsaPreDay, {
            msaId: "",
            type: "",
            grade: "",
            fixStatus: selectFixStatus,
            startDate: startTime,
            endDate: endTime,
            dateType: selectDateType,
        }).then((res) => {
            self.setState({
                "lineLoading": false
            })
            var startTime1 = startTime.split("-");
            startTime1.splice(0, 1);
            var startTime1Text = startTime1.join("-")
            var endTime1 = endTime.split("-");
            endTime1.splice(0, 1);
            var endTime1Text = endTime1.join("-")
            self.setState({
                chartStartTime4: startTime1Text,
                chartEndTime4: endTime1Text
            })
            var legend = res.data.response.legend;
            var data1 = res.data.response.lineSeries;
            var lineSeriesData = [];
            for (var k1 = 0; k1 < data1.length; k1++) {
                var temp1 = {
                    name: data1[k1].name,
                    type: 'line',
                    data: data1[k1].data,
                    markPoint: {
                        data: [{
                            type: 'max',
                            name: '最大值'
                        },
                            {
                                type: 'min',
                                name: '最小值'
                            }
                        ]
                    },
                    markLine: {
                        data: [{
                            type: 'average',
                            name: '平均值'
                        }]
                    }
                }
                lineSeriesData.push(temp1)
            }

            var option = {
                title: {
                    text: self.state.chartStartTime4 + "~" + self.state.chartEndTime4 + '隐患数量统计',
                    top: "0px",
                    textStyle: {
                        color: "#108ee9"
                    }
                },
                grid: {
                    top: "100px",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    },
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                },
                legend: {
                    data: res.data.response.legend,
                    top: "20px",
                },
                xAxis: {
                    data: res.data.response.xAxis,
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                yAxis: {
                    name: '数量'
                },
                series: lineSeriesData
            };
            self.setState({
                dataLine: option
            })

            var myChart1 = echarts.init(document.getElementById("mainTimeLine"), 'westeros');
            myChart1.setOption(option);

        }).catch((err) => {
            self.setState({
                lineLoading: false,
            })
        });
    }
    //查询当前部门及子部门 指定时间段 发布的检查单数量
    loadDataCountCurrent = () => {
        var startTime = moment().subtract(1, "months").format("YYYY-MM")
        var endTime = moment().format("YYYY-MM")
        var selectDateType = "month";
        $jsonp3(self, api.countOfCurrentMsa, {
            startDate: endTime,
            endDate: endTime,
            dateType: selectDateType,
        }).then((res) => {

            var numbersCardData = self.state.numbersCardData;
            var cnt = res.data.response.cnt;
            if (cnt == 0) {
            }
            else if (!cnt) {
                cnt = 0;
            }
            numbersCardData[0].number = cnt
            self.setState({
                numbersCardData: numbersCardData
            })
        })
    }

    //当前部门及以下部门 指定时间段内 总的隐患数量
    loadDataTroubleCurrent = (fixStatusType) => {
        var startTime = moment().subtract(1, "months").format("YYYY-MM")
        var endTime = moment().format("YYYY-MM")
        var selectDateType = "month";
        if (fixStatusType == "total") {
            var selectFixStatus = "";
        } else if (fixStatusType == "done") {
            var selectFixStatus = "0";
        }
        $jsonp3(self, api.troubleOfCurrentMsa, {
            fixStatus: selectFixStatus,
            startDate: endTime,
            endDate: endTime,
            dateType: selectDateType,
        }).then((res) => {
            var numbersCardData = self.state.numbersCardData;
            var list = res.data.response.list;
            var totalCount = 0;
            for (var k = 0; k < list.length; k++) {
                totalCount += list[k].cnt;
                if (list[k].name == "一般") {
                    var normalCount = list[k].cnt;
                }
                if (list[k].name == "重大") {
                    var bigCount = list[k].cnt;
                }
            }
            if (normalCount == 0) {
            }
            else if (!normalCount) {
                normalCount = 0;
            }
            if (bigCount == 0) {
            }
            else if (!bigCount) {
                bigCount = 0;
            }
            if (totalCount == 0) {
            }
            else if (!totalCount) {
                totalCount = 0;
            }
            if (fixStatusType == "total") {
                numbersCardData[1].number = <span>一般 {normalCount} 重大 {bigCount}</span>
            } else if (fixStatusType == "done") {
                numbersCardData[2].number = totalCount
            }
            self.setState({
                numbersCardData: numbersCardData
            })

        }).catch((err) => {

        });
    }
    //当前部门及以下部门 指定时间段内 隐患数量排名
    loadDataRankList = () => {
        var startTime = moment().subtract(1, "months").format("YYYY-MM")
        var endTime = moment().format("YYYY-MM")
        var selectDateType = "month";
        var selectFixStatus = "";
        $jsonp3(self, api.rankListTroubleOfCurrentMsa, {
            fixStatus: selectFixStatus,
            startDate: endTime,
            endDate: endTime,
            dateType: selectDateType,
        }).then((res) => {
            var numbersCardData = self.state.numbersCardData;
            var list = res.data.response.list;
            var rankCnt = list[0].cnt;
            var rankName = list[0].name;
            numbersCardData[3].number = <span>{rankName} {rankCnt}</span>
            self.setState({
                numbersCardData: numbersCardData
            })
        }).catch((err) => {

        });
    }
    getEchartMap1 = () => {
        var myChart = echarts.init(document.getElementById('echartMapX'), 'westeros');
        var option = {
            title: {
                text: self.state.chartStartTime1 + "~" + self.state.chartEndTime1 + '隐患数量统计',
                x: 'left',
                textStyle: {
                    color: "#108ee9"
                }
            },
            tooltip: {
                trigger: 'item',
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            color: ['#c61e4d'],
            legend: {
                orient: 'vertical',
                x: 'right',
                data: ['水域地图异常点']
            },
            dataRange: {
                x: 'left',
                y: 'bottom',
                splitList: [
                    {start: 50.1, color: '#ff7875'},
                    {start: 0.1, end: 50.1, color: '#ffd666'},
                    {start: 0, end: 0.1, color: '#69c0ff '}
                ],
            },
            series: [{
                name: '水域地图异常点',
                map: '江苏',
                type: 'map',
                roam: true,
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontWeight: 500
                        }
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {//改变区域颜色
                    normal: {
                        areaColor: '#C1FFC1',
                    }
                },
                markPoint: {//图形
                    symbolSize: (value, params) => {
                        var size1 = 12;
                        if (value > 50) {
                            size1 = 60;
                        } else if (0 < value && value <= 50) {
                            size1 = 50;
                        } else if (value <= 0) {
                            size1 = 30;
                        } else {
                            size1 = 30;
                        }
                        return size1
                    },
                    label: {
                        normal: {
                            show: true,
                            formatter: '{c}',
                            fontSize: 12
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#C1FFC1',
                            color: ['rgba(127, 255, 0, 0.7)']
                        },
                        emphasis: {
                            color: ['rgb(127, 255, 0)']
                        }
                    },
                    markArea: {
                        itemStyle: {
                            normal: {
                                color: ['#7FFFD4']
                            }
                        }
                    },
                    data: this.state.mapCityData
                },
                data: this.state.mapCityData
            }]
        };
        myChart.setOption(option);
    }
    setMapFixStatus = (value) => {
        this.setState({
            selectMapFixStatus: value
        }, () => {
            self.loadDataMap(1)
        })
    }
    setPieFixStatus = (value) => {
        this.setState({
            selectPieFixStatus: value
        }, () => {
            self.loadData1(2)
        })
    }
    setBarFixStatus = (value) => {
        this.setState({
            selectBarFixStatus: value
        }, () => {
            self.loadData1(3)
        })
    }
    setLineFixStatus = (value) => {
        this.setState({
            selectLineFixStatus: value
        }, () => {
            self.loadData2(4)
        })
    }
    //选择的时间类型
    setMapDateType = (value) => {
        this.setState({
            selectMapDateType: value
        }, () => {
            self.loadDataMap(1)
        })
    }
    setPieDateType = (value) => {
        this.setState({
            selectPieDateType: value
        }, () => {
            self.loadData1(2)
        })
    }
    setBarDateType = (value) => {
        this.setState({
            selectBarDateType: value
        }, () => {
            self.loadData1(3)
        })
    }
    setLineDateType = (value) => {
        this.setState({
            selectLineDateType: value
        }, () => {
            self.loadData2(4)
        })
    }

    testMap = () => {
        var myChart = echarts.init(document.getElementById('testmap'), 'westeros');
        //var uploadedDataURL = "/ico/jiangxi.json";
        var uploadedDataURL1 = "/ico/jiangsu.json";
        myChart.showLoading();
        $.getJSON(uploadedDataURL1, function (geoJson) {
            echarts.registerMap('jiangsu', geoJson);
            myChart.hideLoading();
            var geoCoordMap = {
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

            var data = self.state.mapQueryData;
            var max = 480, min = 9; // todo
            var maxSize4Pin = 100, minSize4Pin = 20;

            var convertData = function (data) {
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
                return res;
            };


            var option = {
                title: {
                    text: self.state.chartStartTime1 + "~" + self.state.chartEndTime1 + '隐患数量统计',
                    x: 'left',
                    textStyle: {
                        color: "#108ee9"
                    }
                },
                color: ["#ce376b"],
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        if (typeof(params.value)[2] == "undefined") {
                            return params.name + ' : ' + params.value;
                        } else {
                            return params.name + ' : ' + params.value[2];
                        }
                    }
                },
                grid: {
                    top: "20px",
                },
                // legend: {
                //     orient: 'vertical',
                //     x:'right',
                //     data: ['水域地图异常点'],
                //     textStyle: {
                //         color: '#fff'
                //     }
                // },
                visualMap: {
                    show: true,
                    min: 0,
                    max: 400,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'], // 文本，默认为数值文本
                    calculable: true,
                    seriesIndex: [1],
                    inRange: {
                        color: ['#69c0ff ', '#ffd666', '#ff7875'] // 黑紫黑
                    }
                },

                geo: {
                    show: true,
                    map: 'jiangsu',
                    zoom: 1.1,
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
                            areaColor: '#031525',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7',
                        }
                    }
                },
                series: [
                    {
                        name: '水域地图异常点',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(data),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#05C3F9'
                            }
                        }
                    },
                    {
                        type: 'map',
                        map: 'jiangsu',
                        geoIndex: 0,
                        aspectScale: 0.75, //长宽比
                        showLegendSymbol: false, // 存在legend时显示
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                color: "#000",
                                areaColor: '#031525',
                                borderColor: '#3B5077',
                            },
                            emphasis: {
                                areaColor: '#000'
                            }
                        },
                        animation: false,
                        data: data
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
                                    if (typeof(params.value)[2] == "undefined") {
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
                        data: convertData(data),
                    },
                    {
                        name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(data.sort(function (a, b) {
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
            myChart.setOption(option);
        });

    }

    render() {
        const numberCards = this.state.numbersCardData.map((item, key) => <Col key={key} lg={6} md={12}>
            <Card className={styles.numberCard} bordered={false} style={{padding: this.state.firstPadding}}>
                <Icon className={styles.iconWarp} style={{color: item.color, fontSize: this.state.firstIconSize}}
                      type={item.icon}/>
                <div className={styles.content} style={{paddingLeft: this.state.firstIconLeft}}>
                    <p className={styles.title} style={{fontSize: this.state.firstTitleSize}}>{item.title || '-'}</p>
                    <p className={styles.number} style={{fontSize: this.state.firstNumberSize}}>
                        {item.number || '0'}
                    </p>
                </div>
            </Card>
        </Col>)
        return (
            <div className={styles.welcomea}>
                <span className={styles.logo}>{this.state.departmentName}</span>
                <Row gutter={24}>
                    {numberCards}

                    <Col lg={12} md={24} id="Row1">
                        <Spin spinning={this.state.mapLoading}>
                            <Card bordered={false} style={{
                                padding: '24px 0 24px 0',
                                height: 450,
                                background: '#fff',
                            }} className={styles.numberCard1}>
                                <div className={styles.numberCard1Button}>
                                    <Select value={this.state.selectMapDateType} onChange={this.setMapDateType}
                                            style={{width: "85px", marginRight: "10px"}}>
                                        <Option value="1">最近7天</Option>
                                        <Option value="2">最近30天</Option>
                                    </Select>
                                    <Select value={this.state.selectMapFixStatus} onChange={this.setMapFixStatus}
                                            style={{width: "85px"}}>
                                        <Option value="">全部</Option>
                                        <Option value="1">未解决</Option>
                                        <Option value="0">已解决</Option>
                                    </Select>
                                </div>
                                <div id="testmap" style={{width: this.state.colwidth, height: "400px"}}></div>
                            </Card>
                        </Spin>
                    </Col>
                    <Col lg={12} md={24}>
                        <Spin spinning={this.state.pieLoading}>
                            <Card bordered={false} style={{
                                padding: '24px 0 24px 0',
                                height: 450,
                                background: '#fff',
                            }} className={styles.numberCard1}>
                                <div className={styles.numberCard1Button}>
                                    <Select value={this.state.selectPieDateType} onChange={this.setPieDateType}
                                            style={{width: "85px", marginRight: "10px"}}>
                                        <Option value="1">最近7天</Option>
                                        <Option value="2">最近30天</Option>
                                    </Select>
                                    <Select value={this.state.selectPieFixStatus} onChange={this.setPieFixStatus}
                                            style={{width: "85px"}}>
                                        <Option value="">全部</Option>
                                        <Option value="1">未解决</Option>
                                        <Option value="0">已解决</Option>
                                    </Select>
                                </div>

                                <div id="mainAreaPie" style={{width: "100%", height: "400px"}}></div>
                            </Card>
                        </Spin>
                    </Col>


                    <Col lg={12} md={24}>
                        <Spin spinning={this.state.barLoading}>
                            <Card bordered={false} style={{
                                padding: '24px 0 24px 0',
                                height: 450,
                                background: '#fff',
                            }} className={styles.numberCard1}>
                                <div className={styles.numberCard1Button}>
                                    <Select value={this.state.selectBarDateType} onChange={this.setBarDateType}
                                            style={{width: "85px", marginRight: "10px"}}>
                                        <Option value="1">最近7天</Option>
                                        <Option value="2">最近30天</Option>
                                    </Select>
                                    <Select value={this.state.selectBarFixStatus} onChange={this.setBarFixStatus}
                                            style={{width: "85px"}}>
                                        <Option value="">全部</Option>
                                        <Option value="1">未解决</Option>
                                        <Option value="0">已解决</Option>
                                    </Select>
                                </div>

                                <div id="mainAreaBar" style={{width: "100%", height: "400px"}}></div>
                            </Card>
                        </Spin>
                    </Col>
                    <Col lg={12} md={24}>
                        <Spin spinning={this.state.lineLoading}>
                            <Card bordered={false} style={{
                                padding: '24px 0 24px 0',
                                height: 450,
                                background: '#fff',
                            }} className={styles.numberCard1}>
                                <div className={styles.numberCard1Button}>
                                    <Select value={this.state.selectLineDateType} onChange={this.setLineDateType}
                                            style={{width: "85px", marginRight: "10px"}}>
                                        <Option value="1">最近7天</Option>
                                        <Option value="2">最近30天</Option>
                                    </Select>
                                    <Select value={this.state.selectLineFixStatus} onChange={this.setLineFixStatus}
                                            style={{width: "85px"}}>
                                        <Option value="">全部</Option>
                                        <Option value="1">未解决</Option>
                                        <Option value="0">已解决</Option>
                                    </Select>
                                </div>
                                <div id="mainTimeLine" style={{width: "100%", height: "400px"}}></div>
                            </Card>
                        </Spin>
                    </Col>
                    <Col lg={12} md={24} style={{display: "none"}}>
                        <Spin spinning={this.state.mapLoading}>
                            <Card bordered={false} style={{
                                padding: '24px 0 24px 0',
                                height: 432,
                                background: '#fff',
                            }} className={styles.numberCard1}>
                                <div className={styles.numberCard1Button}>
                                    <Select value={this.state.selectMapDateType} onChange={this.setMapDateType}
                                            style={{width: "85px", marginRight: "10px"}}>
                                        <Option value="1">最近7天</Option>
                                        <Option value="2">最近30天</Option>
                                    </Select>
                                    <Select value={this.state.selectMapFixStatus} onChange={this.setMapFixStatus}
                                            style={{width: "85px"}}>
                                        <Option value="">全部</Option>
                                        <Option value="1">未解决</Option>
                                        <Option value="0">已解决</Option>
                                    </Select>
                                </div>

                                <div id="echartMapX" style={{width: "100%", height: "390px"}}></div>
                            </Card>
                        </Spin>
                    </Col>
                </Row>
            </div>
        )
    }
}
