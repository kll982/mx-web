import React from 'react';
import moment from "moment";

import { Pagination, Breadcrumb, Select, Row, Col, Input, DatePicker, Button, Icon, Table, message, Spin, TreeSelect, Tabs } from 'antd';
import Singlepersonselect from '../../components/singlepersonselectload.jsx'

import { Link, hashHistory } from 'react-router';
import { Map, Marker, NavigationControl, MapTypeControl, ScaleControl, OverviewMapControl, PanoramaControl, InfoWindow, MarkerList, PointLabel, Lable } from 'react-bmap';

import './westeros.js';
import $ from 'jquery';
import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import api from '../../utils/api.js';
import styles from './echarts.less'
import publicstyle from '../../img/public.less'
import freshfs from "../../img/freshfs.png"
import ReactEcharts from 'echarts-for-react';
import styles1 from '../../components/common.less';
import companypng from "../../img/company.png"
import departmentpng from "../../img/department.png"
import emppng from "../../img/emp.png"
import darkblue from "../../img/darkblue.png"
import darkred from "../../img/darkred.png"
import darkyellow from "../../img/darkyellow.png"
import stylez from '../../container/index.less';

// 引入 ECharts 主模块

var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

// img
// import redIcon from "../../img/redIcon.png";
// import orangeIcon from "../../img/orangeIcon.png";
// import yellowIcon from "../../img/yellowIcon.png";
// import blueIcon from "../../img/blueIcon.png";
// import grayIcon from "../../img/grayIcon.png";

// import redIcon from "../../img/redIcons.png";
// import orangeIcon from "../../img/orangeIcons.png";
// import yellowIcon from "../../img/yellowIcons.png";
// import blueIcon from "../../img/blueIcons.png";
// import grayIcon from "../../img/grayIcons.png";

import fangda from "../../img/fangda.png";
import suoxiao from "../../img/suoxiao.png";

// import redIcon from "../../img/redLight.png";
// import orangeIcon from "../../img/orangeLight.png";
// import yellowIcon from "../../img/yellowLight.png";
// import blueIcon from "../../img/blueLight.png";
// import grayIcon from "../../img/grayLight.png";

import redIcon from "../../img/redNotLight.png";
import orangeIcon from "../../img/orangeNotLight.png";
import yellowIcon from "../../img/yellowNotLight.png";
import blueIcon from "../../img/blueNotLight.png";
import grayIcon from "../../img/grayNotLight.png";


moment.locale('zh-cn');
let self;

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;

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

const loop = data => data.map((item) => {
    if (item.children && item.children.length) {
        var ptitle = "";
        if (item.nodeType == 1) {
            ptitle = <span><img src={companypng} className={styles1.qicon} />{item.name}</span>;
        } else if (item.nodeType == 2) {
            ptitle = <span><img src={departmentpng} className={styles1.qicon} />{item.name}</span>;
        } else if (item.nodeType == 3) {
            ptitle = <span><img src={emppng} className={styles1.qicon} />{item.name}</span>;
        }
        return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id}
            value={item.id.toString()}>{loop(item.children)}</TreeSelect.TreeNode>;
    }
    var ptitle = "";
    if (item.nodeType == 1) {
        ptitle = <span><img src={companypng} className={styles1.qicon} />{item.name}</span>;
    } else if (item.nodeType == 2) {
        ptitle = <span><img src={departmentpng} className={styles1.qicon} />{item.name}</span>;
    } else if (item.nodeType == 3) {
        ptitle = <span><img src={emppng} className={styles1.qicon} />{item.name}</span>;
    }
    return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id}
        value={item.id.toString()} />;
    // isLeaf={item.isLeaf}
});

export default class Customeppqqrlist extends React.Component {

    constructor(props) {
        super(props);
        self = this;
        this.state = {
            loading: false,
            selectYearTime1: "",
            selectYearTime2: "",
            selectMonthTimeShow1: null,
            selectMonthTimeShow2: null,
            selectMonthTime1: "",
            selectMonthTime2: "",
            selectDateTimeShow1: moment().subtract(7, "days"),
            selectDateTimeShow2: moment(),
            selectDateTime1: moment().subtract(7, "days").format("YYYY-MM-DD"),
            selectDateTime2: moment().format("YYYY-MM-DD"),
            mapselection: [],
            treedata2: [],
            departmentId: "",
            departmentCode: "",
            departmentIdText: [],

            selectGrade: "",
            selectFixStatus: "",
            selectDateType: "day",
            markers: [],
            showInfoWindowTitle: "",
            showInfoWindowContent: "",
            showInfoWindowlng: "",
            showInfoWindowlat: "",
            dataPie: "",
            dataBar: "",
            dataLine: "",
            chartStartTime: "",
            chartEndTime: "",
            fetchParId: 1,
            expandForm: true,
            tabClickChangeActiveIndex: 1,
            expandRightPlace: false,
            // centerlng: 120.613241,
            // centerlat: 31.299671,
            tabledata1: null,
            tablecolumns1: null,
            tabledata2: null,
            tablecolumns2: null,

            selectCheckType: "=全部",
            AllCheckType: [],
            pieData: false,
            lineData: false,
            icons: "",

            iconz: [],
            arr: {
                title: "",
                list: [],
            },
            iconDatas: [],
        }
    }

    componentWillMount() {
        self.loadData(1, 10);
        self.getTime();
        self.fetchDepartment();
        self.setWidth();
        // 获取检查对象
        self.getCheckType();

    }

    setWidth = () => {
        var a1 = document.body.clientWidth || document.body.scrollWidth;
        var a2 = document.body.clientHeight || document.body.scrollHeight;
        if (a2 <= 650) {
            a2 = 650;
        }
        self.setState({
            widthwidow: a1 - 220 + "px",
            widthwidow1: a1 - 250 + "px",
            heightwidow: a2 - 297 + "px",
            heightwidow1: a2 - 297 + "px"
        })
    }

    componentDidMount() {
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 12);

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);

                // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
                self.setState({
                    centerlng: r.point.lng,
                    centerlat: r.point.lat,
                })
            }
            else {

            }
        }, { enableHighAccuracy: true })
    }

    fetchDepartment() {
        // 获取当前部门ID 和 名称
        $jsonp3(self, api.commonFilterData, {}).then((res) => {
            var list = [];
            var post1 = res.data.response.msaInfo;

            if (post1.nodeType == "3") {
                post1.isLeaf = true
            } else {
                post1.isLeaf = false
            }
            list[0] = post1;
            this.setState({
                department: list,
                msaInitInfo: post1,
                treedata2: list,
                fetchParId: post1.id
            }, () => {
            });
        });
    }

    getTime = () => {
        // 时间
        var a1 = moment().format("YYYY");
        var a2 = parseFloat(a1) + 1;
        var a3 = a2 - 10;
        var a4 = a2;
        var arr = [];
        for (var index = a4; index > a3; index--) {
            var onj = { value: index + "", name: index }
            arr.push(onj)
        }
        self.setState({
            mapselection: arr
        })
    }
    // 选择部门
    setDepartmentid = (value) => {
        if (!value) {
            this.setState({ departmentId: "", departmentCode: "", departmentIdText: [] })
        }
        else {

            var arr1 = [];
            e1(arr1, value, this.state.department);
            if (!arr1) {
                this.setState({ departmentId: value, departmentIdText: value });
                return
            }
            if (arr1.length > 0) {
                this.setState({ departmentId: value, departmentIdText: value });
                this.setState({
                    departmentCode: arr1[0].code,
                });
            }

        }

    }
    onChartClick = (params) => {
    }
    onChartLegendselectchanged = () => {
    }
    unique4 = (arr) => {
        var hash = [];
        for (var i = 0; i < arr.length; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i].companyName === arr[j].companyName) {
                    ++i;
                }
            }
            hash.push(arr[i]);
        }
        return hash;
    }
    //根据页号获取数据的方法
    loadData = (page, pageSize) => {
        self.setWidth();
        var selectDateType = self.state.selectDateType;
        if (selectDateType == "day") {
            var startTime = self.state.selectDateTime1;
            var endTime = self.state.selectDateTime2;
            if (!startTime && !endTime) {
                startTime = moment().subtract(7, "days").format("YYYY-MM-DD")
                endTime = moment().format("YYYY-MM-DD")
            }
        }
        else if (selectDateType == "month") {
            var startTime = self.state.selectMonthTime1;
            var endTime = self.state.selectMonthTime2;
            if (!startTime) {
                message.info("请选择开始月份")
                return
            }
            if (!endTime) {
                message.info("请选择结束月份")
                return
            }
        }
        else {
            var startTime = self.state.selectYearTime1;
            var endTime = self.state.selectYearTime2;
            if (!startTime) {
                message.info("请选择开始年份")
                return
            }
            if (!endTime) {
                message.info("请选择结束年份")
                return
            }
            if (parseInt(startTime) > parseInt(endTime)) {
                message.info("开始年份不能大于结束年份")
                return
            }
        }
        self.setState({
            dataLine: "",
            dataBar: "",
            dataPie: "",
            expandRightPlace: false,
            // centerlng: "",
            // centerlat: "",
            chartStartTime: startTime,
            chartEndTime: endTime
        })
        // 查询
        $jsonp3(self, api.checklistStatisticsByMap, {
            msaId: self.state.departmentId,
            checkSortId: self.state.selectCheckType.split("=")[0],
            isSolve: 1,//是否解决
            startDay: startTime,
            endDay: endTime,
            optionId: 3,//检查结果
            dateType: self.state.selectDateType,//year-按年查询 month-按月查询 day-按天查询
        })
            .then((res) => {
                var dataList = res.data.response.list;
                var data = [];
                if (dataList.length > 0) {
                    dataList.map(item => {
                        data.push({
                            id: item.id,
                            // 检查分类
                            checkSortId: item.checkSortId,
                            checkSortName: item.checkSortName,
                            // 公司名称
                            companyName: item.companyName,
                            // 检查人
                            createBy: item.createBy + " " + (item.synergyPerson == null ? "" : item.synergyPerson == "" ? "" : item.synergyPerson),
                            createId: item.createId,
                            // 检查单位
                            createMsaName: item.createMsaName,
                            createMsaId: item.createMsaId,
                            // 检查时间
                            createTime: item.createTime == null ? "—" : new Date(item.createTime),
                            // 发布时间
                            publishTime: item.createTime == null ? "—" : new Date(item.publishTime),
                            // 复查时间
                            reviewTime: item.reviewTime == null ? "—" : item.reviewTime,
                            detailId: item.detailId,
                            // 检查项名称
                            itemName: item.itemName,
                            // 检查结果
                            optionName: item.optionName,
                            optionId: item.optionId,
                            // 问题描述
                            reviewDescribe: item.reviewDescribe == null ? "—" : item.reviewDescribe,
                            // 整改要求
                            reviewRequire: item.reviewRequire == null ? "—" : item.reviewRequire,
                            lng: item.lng,
                            lat: item.lat,
                            checklistCode: item.checklistCode,
                            level: Number(item.level)
                        })
                    })
                }
                // 有隐患
                // 地图上
                var listItem = "", datas = [];
                if (data.length > 0) {
                    // listItem =
                    //     `<div>
                    //         <p>海事部门: ${data[0].createMsaName}</p>
                    //         <p>检查人: ${data[0].createBy}</p>
                    //         <p>分类: ${data[0].checkSortName}</p>
                    //         <p>检查项: ${data[0].itemName}</p>
                    //         <p>检查结果: ${data[0].optionName}</p>
                    //         <p>问题描述: ${data[0].reviewDescribe}</p>
                    //         <p>整改要求: ${data[0].reviewRequire}</p>
                    //         <p>复查时间: ${data[0].reviewTime}</p>
                    //     </div>`
                    var icon = [];
                    data.map(item => {
                        datas.push({
                            id: item.id,
                            description: item.createBy,
                            msaName: item.createMsaName,
                            createTime: item.createTime,
                            companyName: item.companyName,
                            grade: item.level,
                            userName: item.createBy,
                            sortName: item.checkSortName,
                            itemName: item.itemName,
                            itemNameA: item.optionName,
                            itemNameB: item.reviewDescribe,
                            itemNameC: item.reviewRequire,
                            itemNameD: item.reviewTime,
                            lng: item.lng,
                            lat: item.lat,
                            checklistCode: item.checklistCode,
                        })
                        icon.push({
                            id: item.id,
                            description: item.createBy,
                            msaName: item.createMsaName,
                            createTime: item.createTime,
                            companyName: item.companyName,
                            grade: item.level,
                            userName: item.createBy,
                            sortName: item.checkSortName,
                            itemName: item.itemName,
                            itemNameA: item.optionName,
                            itemNameB: item.reviewDescribe,
                            itemNameC: item.reviewRequire,
                            itemNameD: item.reviewTime,
                            lng: item.lng,
                            lat: item.lat,
                            checklistCode: item.checklistCode,
                        })
                    })
                    var iconDatas = this.unique4(datas);

                    self.setState({
                        // list
                        markers: datas,
                        showInfoWindowTitle: `<div style='font-weight:bold'>${data[0].companyName}</div>`,
                        showInfoWindowContent: listItem,
                        showInfoWindowlng: data[0].lng,
                        showInfoWindowlat: data[0].lat,
                        centerlng: data[0].lng,
                        centerlat: data[0].lat,
                        icons: data[0].optionId,
                        iconz: icon,
                        iconDatas: iconDatas,
                    })
                } else {
                    listItem = "";
                    datas = [];

                    self.setState({
                        // list
                        markers: datas,
                        iconDatas: datas,
                        showInfoWindowTitle: "",
                        showInfoWindowContent: listItem,
                        showInfoWindowlng: "",
                        showInfoWindowlat: "",
                        // centerlng: "",
                        // centerlat: "",
                    })
                }
            })

    }
    loadData1 = (page, pageSize) => {
        self.setWidth();
        var selectDateType = self.state.selectDateType;
        if (selectDateType == "day") {
            var startTime = self.state.selectDateTime1;
            var endTime = self.state.selectDateTime2;
            if (!startTime && !endTime) {
                startTime = moment().subtract(7, "days").format("YYYY-MM-DD")
                endTime = moment().format("YYYY-MM-DD")
            }
        } else if (selectDateType == "month") {
            var startTime = self.state.selectMonthTime1;
            var endTime = self.state.selectMonthTime2;
            if (!startTime) {
                message.info("请选择开始月份")
                return
            }
            if (!endTime) {
                message.info("请选择结束月份")
                return
            }
        } else {
            var startTime = self.state.selectYearTime1;
            var endTime = self.state.selectYearTime2;
            if (!startTime) {
                message.info("请选择开始年份")
                return
            }
            if (!endTime) {
                message.info("请选择结束年份")
                return
            }
            if (parseInt(startTime) > parseInt(endTime)) {
                message.info("开始年份不能大于结束年份")
                return
            }
        }
        self.setState({
            dataLine: "",
            dataBar: "",
            dataPie: "",
            loading: true,
            tabledata1: null,
            tablecolumns1: null,
        })
        $jsonp3(self, api.checklistStatisticsByCity, {
            msaId: self.state.departmentId,
            checkSortId: self.state.selectCheckType.split("=")[0],
            isSolve: self.state.selectFixStatus,
            startDay: startTime,
            endDay: endTime,
            optionId: self.state.selectGrade,
            dateType: self.state.selectDateType,
        }).then(res => {
            var list = res.data.response.list, titles = startTime + " 至 " + endTime + ' 隐患数量统计';
            var pieData = list, lineName = [], lineValue = [], table = [], tableColumn = [];
            for (let i = 0; i < list.length; i++) {
                lineName.push(list[i].name);
                lineValue.push(list[i].value);
            }

            // 线图
            var lineOption = {
                title: {
                    text: startTime + " 至 " + endTime + ' 隐患数量统计',
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
                        },
                    },
                },
                legend: {
                    top: "20px",
                },
                xAxis: {
                    data: lineName,
                    // boundaryGap: false,
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: lineValue,
                    type: 'line',
                    markPoint: {
                        data: [
                            {
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
                }]
            };
            // 饼图
            var pieOption = {
                title: {
                    text: startTime + " 至 " + endTime + ' 隐患数量统计',
                    x: 'center',
                    textStyle: {
                        color: "#108ee9"
                    }
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
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
                    avoidLabelOverlap: true,
                    data: pieData.sort(function (a, b) {
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
            // 线图
            var mylineChart = echarts.init(document.getElementById("mainAreaBar"), 'westeros');
            mylineChart.setOption(lineOption);
            // 饼图
            var myChart2 = echarts.init(document.getElementById("mainAreaPie"), 'westeros');
            myChart2.setOption(pieOption);
            // 表格
            var tableHeader = ["区域", "数量"];
            for (var p in list[0]) {
                table.push(p)
            }
            for (var i in tableHeader) {
                tableColumn.push({
                    title: tableHeader[i],
                    dataIndex: table[i],
                    key: table[i],
                    className: publicstyle.center,
                })
            }
            self.setState({
                loading: false,
                pieData: true,
                lineData: true,
                tablecolumns1: tableColumn,
                tableTitle1: titles,
                tabledata1: list,
            })
        })


    }
    //查询第三种
    loadData2 = (page, pageSize) => {
        self.setWidth();
        var selectDateType = self.state.selectDateType;
        if (selectDateType == "day") {
            var startTime = self.state.selectDateTime1;
            var endTime = self.state.selectDateTime2;
            if (!startTime && !endTime) {
                startTime = moment().subtract(7, "days").format("YYYY-MM-DD")
                endTime = moment().format("YYYY-MM-DD")
            }
        } else if (selectDateType == "month") {
            var startTime = self.state.selectMonthTime1;
            var endTime = self.state.selectMonthTime2;
            if (!startTime) {
                message.info("请选择开始月份")
                return
            }
            if (!endTime) {
                message.info("请选择结束月份")
                return
            }
        } else {
            var startTime = self.state.selectYearTime1;
            var endTime = self.state.selectYearTime2;
            if (!startTime) {
                message.info("请选择开始年份")
                return
            }
            if (!endTime) {
                message.info("请选择结束年份")
                return
            }
            if (parseInt(startTime) > parseInt(endTime)) {
                message.info("开始年份不能大于结束年份")
                return
            }
        }
        self.setState({
            dataLine: "",
            dataBar: "",
            dataPie: "",
            loading: true,
            tabledata2: null,
            tablecolumns2: null,

        })
        // 线
        $jsonp3(self, api.checklistStatisticsByDate, {
            msaId: self.state.departmentId,
            checkSortId: self.state.selectCheckType.split("=")[0],
            isSolve: self.state.selectFixStatus,
            startDay: startTime,
            endDay: endTime,
            optionId: self.state.selectGrade,
            dateType: self.state.selectDateType,
        }).then(res => {
            self.setState({
                loading: false,
            })
            var legend = res.data.response.legend;
            var data1 = res.data.response.lineSeries;
            var lineSeriesData = [], lineSeriesName = [], lineSeriesValue = [];

            data1.map(item => {
                lineSeriesName.push(item.city);
                lineSeriesValue.push(item.count);
                lineSeriesData.push(
                    {
                        name: item.city,
                        type: 'line',
                        // stack: '总量',
                        data: item.count,
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
                );
            })
            var lineOptrions = {
                title: {
                    text: startTime + " 至 " + endTime + ' 隐患数量统计',
                    top: "0px",
                    textStyle: {
                        color: "#108ee9"
                    }
                },
                grid: {
                    top: "150px",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            type: 'shadow',
                            color: '#999'
                        }
                    }
                },
                legend: {
                    data: legend,
                    top: "70px",
                },
                xAxis: {
                    data: res.data.response.xAxis,
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                yAxis: {
                    name: '数量',
                    type: 'value',
                },
                series: lineSeriesData
            };

            self.setState({
                dataLine: lineOptrions
            })

            var myChart1 = echarts.init(document.getElementById("mainTimeLine"), 'westeros');
            myChart1.setOption(lineOptrions, true);
            lineSeriesData = [];
        })
        // 表格
        $jsonp3(self, api.checklistStatisticsDateByTable, {
            msaId: self.state.departmentId,
            checkSortId: self.state.selectCheckType.split("=")[0],
            isSolve: self.state.selectFixStatus,
            startDay: startTime,
            endDay: endTime,
            optionId: self.state.selectGrade,
            dateType: self.state.selectDateType,
        }).then(res => {
            var tableList = res.data.response.list;
            var tableKind = res.data.response.legend;
            var tableHeaderLength = tableKind.length;
            var result = tableList;
            var pushList = [];
            for (var i = 0; i < result.length; i++) {
                var newObg = {};
                for (var j = 0; j < result[i].data.length; j++) {
                    newObg[tableKind[j]] = result[i].data[j];
                }
                pushList.push(newObg)
            }
            var returnColumn = [];
            for (var i = 0; i < tableKind.length; i++) {
                returnColumn.push({
                    title: tableKind[i],
                    dataIndex: tableKind[i],
                    key: tableKind[i],
                    className: publicstyle.center,
                })
            }
            self.setState({
                tabledata2: pushList
            })
            self.setState({
                tablecolumns2: returnColumn,
                tableTitle2: res.data.response.title
            })
        }).catch((err) => {
            self.setState({
                loading: false,
            })
        });

    }

    selectDateChange1 = (date, dateString) => {

        let self = this
        this.setState({
            selectDateTime1: dateString,
            selectDateTimeShow1: date
        })
    }
    selectDateChange2 = (date, dateString) => {

        let self = this
        this.setState({
            selectDateTime2: dateString,
            selectDateTimeShow2: date
        })
    }
    selectMonthChange1 = (date, dateString) => {

        let self = this
        this.setState({
            selectMonthTime1: dateString,
            selectMonthTimeShow1: date
        })
    }
    selectMonthChange2 = (date, dateString) => {
        let self = this
        this.setState({
            selectMonthTime2: dateString,
            selectMonthTimeShow2: date
        })
    }
    setYearTime1 = (value) => {
        this.setState({
            selectYearTime1: value
        })
    }
    setYearTime2 = (value) => {
        this.setState({
            selectYearTime2: value
        })
    }
    // 获取检查对象
    getCheckType = () => {
        $jsonp3(self, api.listAllCheckSort, {})
            .then((res) => {
                self.setState({
                    AllCheckType: res.data.response.list
                })
            })
    }
    setUnitType = (value) => {
        this.setState({
            selectCheckType: value
        })
    }
    setGrade = (value) => {
        this.setState({
            selectGrade: value
        })
    }
    setFixStatus = (value) => {
        this.setState({
            selectFixStatus: value
        })
    }
    setDateType = (value) => {

        this.setState({
            selectDateType: value
        })
    }
    queryProfitOfCondition = () => {
        if (self.state.tabClickChangeActiveIndex == 1) {
            self.loadData(1, 10);
        }
        else if (self.state.tabClickChangeActiveIndex == 2) {
            self.loadData1(1, 10);
        }
        else if (self.state.tabClickChangeActiveIndex == 3) {
            self.loadData2(1, 10);
        }
    }
    queryProfitOfCondition1 = () => {
        self.loadData1(1, 10);
    }
    queryProfitOfCondition2 = () => {
        self.loadData2(1, 10);
    }
    reset = () => {
        this.setState({
            selectYearTime1: "",
            selectYearTime2: "",
            selectMonthTimeShow1: null,
            selectMonthTimeShow2: null,
            selectMonthTime1: "",
            selectMonthTime2: "",
            selectDateTimeShow1: moment().subtract(7, "days"),
            selectDateTimeShow2: moment(),
            selectDateTime1: moment().subtract(7, "days").format("YYYY-MM-DD"),
            selectDateTime2: moment().format("YYYY-MM-DD"),
            departmentId: "",
            departmentCode: "",
            departmentIdText: [],
            selectUnitType: "",
            selectGrade: "",
            selectFixStatus: "",
            selectDateType: "day",
            selectCheckType: "=全部",
        }, () => {
            if (self.state.tabClickChangeActiveIndex == 1) {
                self.loadData(1, 10);
            }
            else if (self.state.tabClickChangeActiveIndex == 2) {
                self.loadData1(1, 10);
            }
            else if (self.state.tabClickChangeActiveIndex == 3) {
                self.loadData2(1, 10);
            }

        });
    }
    disabledStartDate = (startValue) => {
        const endValue = this.state.selectDateTimeShow2;
        if (!startValue) {
            return false;
        }
        if (!endValue) {
            return false
        }
        return startValue.valueOf() > endValue.valueOf();

    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.selectDateTimeShow1;
        if (!endValue) {
            return false;
        }
        if (!startValue) {
            return false
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    disabledStartMonth = (startValue) => {
        const endValue = this.state.selectMonthTimeShow2;
        if (!startValue) {
            return false;
        }
        if (!endValue) {
            return false
        }
        return startValue.valueOf() > endValue.valueOf();
    }
    disabledEndMonth = (endValue) => {
        const startValue = this.state.selectMonthTimeShow1;
        if (!endValue) {
            return false;
        }
        if (!startValue) {
            return false
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    clickit = (item, index) => {
        let arr = {
            // title: item.companyName,
            // color: item.grade == 1 ? "#2F8DEB" : item.grade == 2 ? "#F0BD31" : item.grade == 3 ? "#F06C31" : item.grade == 4 ? "#F03131" : "#6A7A8B",
            // level: item.grade,
            list: [],
        };
        this.state.markers.map(id => {
            if (item.companyName == id.companyName ) {
                arr.list.push(id)
            }
        })
        arr.title = arr.list[arr.list.length - 1].companyName;
        arr.color = arr.list[arr.list.length - 1].grade == 1 ? "#2F8DEB" : arr.list[arr.list.length - 1].grade == 2 ? "#F0BD31" : arr.list[arr.list.length - 1].grade == 3 ? "#F06C31" : arr.list[arr.list.length - 1].grade == 4 ? "#F03131" : "#6A7A8B";
        arr.level = arr.list[arr.list.length - 1].grade;

        // var d1 = item.grade == "2" ? "一般" : item.grade == "1" ? "无隐患" : "重大";
        // var d2 = !item.deadLine && item.deadLine !== 0 ? "—" : item.deadLine + "天";
        // var description = !item.description ? "—" : item.description;
        // var dealMeasure = !item.dealMeasure ? "—" : item.dealMeasure;
        // var dealResult = !item.dealResult ? "—" : item.dealResult;
        // var showContent =
        //     `<div>
        //         <p>海事部门: ${item.msaName}</p>
        //         <p>检查人: ${item.userName}</p>
        //         <p>分类: ${item.sortName}</p>
        //         <p>检查项: ${item.itemName}</p>
        //         <p>检查结果: ${item.itemNameA}</p>
        //         <p>问题描述: ${item.itemNameB}</p>
        //         <p>整改要求: ${item.itemNameC}</p>
        //         <p>复查时间: ${item.itemNameD}</p>
        //     </div>`;
        self.setState({
            // showInfoWindowTitle: "<div style='font-weight:bold'>" + item.companyName + "</div>",
            // showInfoWindowContent: showContent,
            // showInfoWindow: true,
            // showInfoWindowlng: item.lng,
            // showInfoWindowlat: item.lat,
            // centerlng: item.lng,
            // centerlat: item.lat,
            arr,
            expandRightPlace: !this.state.expandRightPlace,
        })
        // this.setState({
        // });
    }
    clickitCopy = (item, index) => {
        self.setState({
            centerlat: item.lat,
            centerlng: item.lng,
        })
        var d1 = item.grade == "2" ? "一般" : item.grade == "1" ? "无隐患" : "重大";
        var d2 = !item.deadLine && item.deadLine !== 0 ? "—" : item.deadLine + "天";
        var description = !item.description ? "—" : item.description;
        var dealMeasure = !item.dealMeasure ? "—" : item.dealMeasure;
        var dealResult = !item.dealResult ? "—" : item.dealResult;
        var showContent =
            `<div>
                <p>海事部门: ${item.msaName}</p>
                <p>检查人: ${item.userName}</p>
                <p>分类: ${item.sortName}</p>
                <p>检查项: ${item.itemName}</p>
                <p>检查结果: ${item.itemNameA}</p>
                <p>问题描述: ${item.itemNameB}</p>
                <p>整改要求: ${item.itemNameC}</p>
                <p>复查时间: ${item.itemNameD}</p>
            </div>`;

        self.setState({
            showInfoWindowTitle: "<div style='font-weight:bold'>" + item.companyName + "</div>",
            showInfoWindowContent: showContent,
            showInfoWindow: true,
            showInfoWindowlng: item.lng,
            showInfoWindowlat: item.lat,
            icons: item.grade,
        })

    }

    showInfo(e) {
        alert(e.point.lng + ", " + e.point.lat);
    }

    onTreeLoadData = (treeNode) => {
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            var msaInitInfo = self.state.msaInitInfo;
            $jsonp3(self, api.getChildByParId, {
                id: treeNode.props.dataRef.id
            }).then((res) => {
                var post1 = res.data.response.childDepts;
                for (var p1 = 0; p1 < post1.length; p1++) {
                    if (post1[p1].nodeType == "3") {
                        post1[p1].isLeaf = true
                    } else {
                        post1[p1].isLeaf = false
                    }
                    if (msaInitInfo.nodeType == "1" && post1[p1].nodeType == "2") {
                        post1[p1].isLeaf = true
                    }
                }
                treeNode.props.dataRef.children = post1
                self.setState({
                    department: [...this.state.treedata2],
                    treedata2: [...this.state.treedata2],
                });

                resolve();

            });

        });

    }
    changeTabActive = (key) => {
        self.setState({
            tabClickChangeActiveIndex: key
        }, () => {
            if (self.state.tabClickChangeActiveIndex == 1) {
                self.loadData(1, 10);
            }
            else if (self.state.tabClickChangeActiveIndex == 2) {
                self.loadData1(1, 10);
            }
            else if (self.state.tabClickChangeActiveIndex == 3) {
                self.loadData2(1, 10);
            }

        })
    }
    toggleForm = () => {
        this.setState({
            expandForm: !this.state.expandForm,
        });
    };

    renderSimpleForm() {
        return (
            <Row className={styles.antrow1}>
                <Col span={8}><span style={{ paddingRight: 10 }}>所属海事局:</span>
                    <TreeSelect
                        loadData={this.onTreeLoadData}
                        showSearch
                        treeNodeFilterProp="pops"
                        className={styles.singleSelect}
                        value={this.state.departmentIdText ? this.state.departmentIdText : ""}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="请选择"
                        allowClear
                        dropdownMatchSelectWidth={false}

                        onChange={this.setDepartmentid}
                    >
                        {loop(this.state.treedata2)}

                    </TreeSelect>
                </Col>
                <Col span={5}><span style={{ paddingRight: 10 }}>检查对象</span>
                    <Select value={this.state.selectCheckType.split("=")[1]} style={{ width: "50%" }}
                        onChange={this.setUnitType}>
                        <Option value="=全部" key={""}>全部</Option>
                        {
                            this.state.AllCheckType.map((item, index) => {
                                return <Option value={item.id + "=" + item.sort} key={item + ""}
                                    disable={item.status == 0}>{item.sort}</Option>
                            })
                        }
                    </Select>
                </Col>

                {/* <Col span={5}><span style={{ paddingRight: 10 }}>检查结果:</span>
                    <Select value={this.state.selectGrade} style={{ width: "50%" }} onChange={this.setGrade}>
                        <Option value="">全部</Option>
                        <Option value="2">当场纠正</Option>
                        <Option value="3">限期整改</Option>

                    </Select>
                </Col> */}
                <Col span={6}>
                    <Button type="primary" onClick={this.queryProfitOfCondition} style={{ float: "left", }}>查询</Button>
                    <Button type="default" style={{ marginLeft: 20 }} onClick={this.reset}
                        style={{ float: "left", marginLeft: 20, }}>重置</Button>
                    <span style={{
                        marginLeft: 20,
                        display: this.state.tabClickChangeActiveIndex == 2 ? "inline-block" : "none",
                        background: "url(../../../ico/excelBg.png)",
                        color: "#fff",
                        border: "none",
                        height: 28,
                        width: 90,
                        float: "left",
                    }} onClick={this.xiazai.bind(this, 2)}></span>
                    <span style={{
                        marginLeft: 20,
                        display: this.state.tabClickChangeActiveIndex == 3 ? "inline-block" : "none",
                        background: "url(../../../ico/excelBg.png)",
                        color: "#fff",
                        border: "none",
                        height: 28,
                        width: 90,
                        float: "left",
                    }} onClick={this.xiazai.bind(this, 3)}></span>
                    {/*<Button type="default" style={{*/}
                    {/*marginLeft: 20,*/}
                    {/*display: this.state.tabClickChangeActiveIndex == 3 ? "inline-block" : "none"*/}
                    {/*}} onClick={this.xiazai.bind(this, 3)}>导出</Button>*/}
                    <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                        展开 <Icon type="down" />
                    </a>
                </Col>
            </Row>
        );
    }

    renderAdvancedForm() {
        return (
            <div>
                <Row className={styles.antrow1}>
                    <Col span={8}><span style={{ paddingRight: 10 }}>所属海事局:</span>
                        <TreeSelect
                            loadData={this.onTreeLoadData}
                            showSearch
                            treeNodeFilterProp="pops"
                            className={styles.singleSelect}
                            value={this.state.departmentIdText ? this.state.departmentIdText : ""}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="请选择"
                            allowClear
                            dropdownMatchSelectWidth={false}

                            onChange={this.setDepartmentid}
                        >
                            {loop(this.state.treedata2)}

                        </TreeSelect>
                    </Col>
                    <Col span={5}><span style={{ paddingRight: 10 }}>检查对象</span>
                        <Select value={this.state.selectCheckType.split("=")[1]} style={{ width: "50%" }}
                            onChange={this.setUnitType}>
                            <Option value="=全部" key={""}>全部</Option>
                            {
                                this.state.AllCheckType.map((item, index) => {
                                    return <Option value={item.id + "=" + item.sort} key={item + ""}
                                        disable={item.status == 0}>{item.sort}</Option>
                                })
                            }
                        </Select>
                    </Col>

                    {/* <Col span={5}><span style={{ paddingRight: 10 }}>检查结果:</span>
                        <Select value={this.state.selectGrade} style={{ width: "50%" }} onChange={this.setGrade}>
                            <Option value="">全部</Option>
                            <Option value="1">限期整改</Option>
                            <Option value="2">当场纠正</Option>
                        </Select>
                    </Col> */}
                    {/* <Col span={6}><span style={{ paddingRight: 10 }}>解决与否:</span>
                        <Select value={this.state.selectFixStatus} style={{ width: "50%" }} onChange={this.setFixStatus}>
                            <Option value="">全部</Option>
                            <Option value="1">未解决</Option>
                            <Option value="0">已解决</Option>
                        </Select>
                    </Col> */}
                </Row>
                <Row className={styles.antrow1}>
                    <Col span={8}><span style={{ paddingRight: 10 }}>查询类型:</span>
                        <Select value={this.state.selectDateType} style={{ width: "50%" }} onChange={this.setDateType}>
                            <Option value="day">按日查询</Option>
                            <Option value="month">按月查询</Option>
                            <Option value="year">按年查询</Option>

                        </Select>
                    </Col>

                    <Col span={10}><span style={{ paddingRight: 10 }}>日期范围:</span>
                        <div style={{
                            display: this.state.selectDateType == "year" ? "inline-block" : "none",
                            width: "80%"
                        }}>
                            <Select value={this.state.selectYearTime1} placeholder="开始年份" style={{ width: "45%" }}
                                onChange={this.setYearTime1.bind(this)}>
                                {this.state.mapselection.map((item, index) => {
                                    return <Option value={item.value} key={item.value}>{item.name}</Option>
                                })}
                            </Select>
                            <Select value={this.state.selectYearTime2} placeholder="结束年份"
                                style={{ width: "45%", marginLeft: "10px" }} onChange={this.setYearTime2.bind(this)}>
                                {this.state.mapselection.map((item, index) => {
                                    return <Option value={item.value} key={item.value}>{item.name}</Option>
                                })}
                            </Select>
                        </div>
                        <div style={{
                            display: this.state.selectDateType == "month" ? "inline-block" : "none",
                            width: "80%"
                        }}>
                            <MonthPicker format="YYYY-MM" value={this.state.selectMonthTimeShow1}
                                onChange={this.selectMonthChange1} disabledDate={this.disabledStartMonth}
                                style={{ width: "45%" }} placeholder="开始月份" />
                            <MonthPicker format="YYYY-MM" value={this.state.selectMonthTimeShow2}
                                onChange={this.selectMonthChange2} disabledDate={this.disabledEndMonth}
                                style={{ width: "45%", marginLeft: "10px" }} placeholder="结束月份" />
                        </div>
                        <div style={{
                            display: this.state.selectDateType == "day" ? "inline-block" : "none",
                            width: "80%"
                        }}>
                            <DatePicker
                                size="large"
                                format="YYYY-MM-DD"
                                placeholder={'开始日期'}
                                disabledDate={this.disabledStartDate}
                                value={this.state.selectDateTimeShow1}
                                onOk={this.timeOk}
                                style={{ width: "45%" }}
                                onChange={this.selectDateChange1} />
                            <DatePicker
                                size="large"
                                format="YYYY-MM-DD"
                                placeholder={"结束日期"}
                                value={this.state.selectDateTimeShow2}
                                disabledDate={this.disabledEndDate}
                                onOk={this.timeOk}
                                style={{ width: "45%", marginLeft: "10px" }}
                                onChange={this.selectDateChange2} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <Button type="primary" onClick={this.queryProfitOfCondition}
                            style={{ float: "left", }}>查询</Button>
                        <Button type="default" style={{ marginLeft: 20 }} onClick={this.reset}
                            style={{ float: "left", marginLeft: 20, }}>重置</Button>
                        <span style={{
                            marginLeft: 20,
                            display: this.state.tabClickChangeActiveIndex == 2 ? "inline-block" : "none",
                            background: "url(../../../ico/excelBg.png)",
                            color: "#fff",
                            border: "none",
                            height: 28,
                            width: 90,
                            float: "left",
                        }} onClick={this.xiazai.bind(this, 2)}></span>
                        <span style={{
                            marginLeft: 20,
                            display: this.state.tabClickChangeActiveIndex == 3 ? "inline-block" : "none",
                            background: "url(../../../ico/excelBg.png)",
                            color: "#fff",
                            border: "none",
                            height: 28,
                            width: 90,
                            float: "left",
                        }} onClick={this.xiazai.bind(this, 3)}></span>

                        <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            收起 <Icon type="up" />
                        </a>
                    </Col>
                </Row>
            </div>
        );
    }

    renderForm() {
        return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }

    xiazai = (typeTextShow) => {
        var selectDateType = self.state.selectDateType;
        if (selectDateType == "day") {
            var startTime = self.state.selectDateTime1;
            var endTime = self.state.selectDateTime2;
            if (!startTime && !endTime) {
                startTime = moment().subtract(7, "days").format("YYYY-MM-DD")
                endTime = moment().format("YYYY-MM-DD")
            }
        } else if (selectDateType == "month") {
            var startTime = self.state.selectMonthTime1;
            var endTime = self.state.selectMonthTime2;
            if (!startTime) {
                message.info("请选择开始月份")
                return
            }
            if (!endTime) {
                message.info("请选择结束月份")
                return
            }
        } else {
            var startTime = self.state.selectYearTime1;
            var endTime = self.state.selectYearTime2;
            if (!startTime) {
                message.info("请选择开始年份")
                return
            }
            if (!endTime) {
                message.info("请选择结束年份")
                return
            }
            if (parseInt(startTime) > parseInt(endTime)) {
                message.info("开始年份不能大于结束年份")
                return
            }
        }
        var param = "?msaId=" + self.state.departmentId + "&checkSortId=" + self.state.selectCheckType.split("=")[0] + "&isSolve=" + self.state.selectFixStatus + "&startDay=" + startTime + "&endDay=" + endTime + "&optionId=" + self.state.selectGrade + "&dateType=" + self.state.selectDateType;

        if (typeTextShow == 2) {
            var urlxiazai1 = api.checklistStatisticsCityByExcel + param;
            var urlxiazaiList = api.checklistStatisticsCityByExcel;
        } else if (typeTextShow == 3) {
            var urlxiazai1 = api.checklistStatisticsDateByExcel + param;
            var urlxiazaiList = api.checklistStatisticsDateByExcel;
        }
        self.setState({
            loading: true,
        })
        $.ajax({
            url: urlxiazaiList,
            type: "get",
            data: {
                msaId: self.state.departmentId,
                checkSortId: self.state.selectCheckType.split("=")[0],
                isSolve: self.state.selectFixStatus,
                startDay: startTime,
                endDay: endTime,
                optionId: self.state.selectGrade,
                dateType: self.state.selectDateType,
            },
            xhrFields: {
                withCredentials: true
            },
            success: (res) => {
                if (res.code == 500) {
                    self.setState({
                        loading: false,
                    })
                    message.warning(res.message);
                    return false
                } else if (res.code == 600) {
                    self.setState({
                        loading: false,
                    })
                    Modal.info({
                        title: "提示",
                        content: res.message,
                        okText: "去登陆",
                        onOk: function () {
                            localStorage.clear();
                            sessionStorage.clear();
                            hashHistory.push("/");
                        }
                    })
                } else {
                    self.setState({
                        urlxiazai: urlxiazai1
                    }, () => {
                        self.refs.xiazaibutton.click()
                        self.setState({
                            loading: false
                        })
                    })
                }

            },
            error: (error) => {
            }
        })
        // self.setState({
        // 	urlxiazai:urlxiazai1
        // },()=>{
        // 	self.refs.xiazaibutton.click()
        // 	self.setState({
        // 		loading:false
        // 	})
        // })
    }
    toggleShowTotal = () => {
        this.setState({
            expandRightPlace: !this.state.expandRightPlace,
        });
    };

    render() {
        let onEvents = {
            'click': this.onChartClick,
            'legendselectchanged': this.onChartLegendselectchanged
        }
        return (
            <div className={stylez.wrapPadding}>
                <Spin spinning={this.state.loading}>
                    {/* <Breadcrumb separator=">">
                    <Breadcrumb.Item>隐患区域统计</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.clearfloat}></div> */}
                    <a href={this.state.urlxiazai} download style={{ display: "none" }} ref="xiazaibutton">下载</a>
                    {this.renderForm()}
                    {/* 全屏 */}
                    <div style={{ zIndex: "100", background: "rgba(255,255,255,1)", position: "fixed", left: 0, top: 0, width: "100%", height: "100%", display: this.state.fullBlock ? "block" : "none" }}>

                        <div style={{ position: "relative", overflow: "hidden", }} ref="mapWrap">
                            <img src={suoxiao} style={{ position: "absolute", left: "0px", top: "32px", zIndex: "1", opacity: ".4" }} onClick={() => { this.setState({ fullBlock: !this.state.fullBlock }) }} />
                            <div style={{ fontSize: 18, padding: "3px", fontWeight: "bold" }}>{self.state.chartStartTime + " 至 " + self.state.chartEndTime + ' 水域地图异常点'}</div>
                            {/* 右侧信息窗 */}
                            <div className={styles.absoluteRight}
                                style={{ display: this.state.expandRightPlace && this.state.markers.length > 0 ? "block" : "none" }}>
                                <div className={styles.rightInfo}>
                                    <h3>{this.state.arr.title}</h3>
                                    <span className={styles.rightInfoTitle}>

                                        当前风险等级：<span style={{ background: this.state.arr.color, }}>{!!this.state.arr.level ? this.state.arr.level : "-"}</span>
                                    </span>

                                    {this.state.arr.list.map((marker, index) => {
                                        return <div className={styles.itemWrap}>
                                            <span className={styles.itemTitle}>{marker.itemName}</span>
                                            <div>
                                                <span className={styles.leftItemTitle}>检查单编号：</span>
                                                <p className={styles.rightItemValue + " " + styles.fivespcing}>
                                                    {marker.checklistCode}
                                                </p>
                                            </div>
                                            <div>
                                                <span className={styles.leftItemTitle}>检查人：</span>
                                                <p className={styles.rightItemValue + " " + styles.threespcing}>
                                                    {marker.userName}
                                                </p>
                                            </div>
                                            <div>
                                                <span className={styles.leftItemTitle}>检查单位：</span>
                                                <p className={styles.rightItemValue + " " + styles.fourspcing}>
                                                    {marker.msaName}
                                                </p>
                                            </div>
                                            <div>
                                                <span className={styles.leftItemTitle}>问题描述：</span>
                                                <p className={styles.rightItemValue + " " + styles.fourspcing}>
                                                    {marker.itemNameB}
                                                </p>
                                            </div>
                                            <div>
                                                <span className={styles.leftItemTitle}>整改要求：</span>
                                                <p className={styles.rightItemValue + " " + styles.fourspcing}>
                                                    {marker.itemNameC}
                                                </p>
                                            </div>
                                            <div>
                                                <span className={styles.leftItemTitle}>检查时间：</span>
                                                <p className={styles.rightItemValue + " " + styles.fourspcing}>
                                                    {moment(marker.createTime).format('YYYY-MM-DD HH:mm:ss')}
                                                </p>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                            {this.state.iconDatas.length > 0 ?
                                <Map center={{
                                    lng: self.state.centerlng,
                                    lat: self.state.centerlat,
                                }}
                                    style={{
                                        height: document.documentElement.clientHeight - 50,
                                        width: "100%",
                                        display: this.state.iconDatas.length > 0 ? "block" : "none",
                                    }}
                                    enableScrollWheelZoom={true}
                                    zoom='9'
                                >
                                    {/* iconz 多點展示 */}
                                    {this.state.iconDatas.map((iconz, index) => {
                                        let icon;
                                        if (iconz.grade == 1) {
                                            icon = blueIcon
                                        } else if (iconz.grade == 2) {
                                            icon = yellowIcon
                                        } else if (iconz.grade == 3) {
                                            icon = orangeIcon
                                        } else if (iconz.grade == 4) {
                                            icon = redIcon
                                        } else {
                                            icon = grayIcon
                                        }

                                        return <Marker icon={icon} position={{
                                            lng: iconz.lng,
                                            lat: iconz.lat
                                        }} key={index}>
                                            <img src={icon} alt="" style={{ height: 32, position: "absolute", top: "-16px", left: "-16px", }} onClick={this.clickit.bind(this, iconz, index)} />
                                            <span onClick={this.clickit.bind(this, iconz, index)} style={{ background: "#fff", border: "1px solid #fff", position: "absolute", top: "-25px", boxShadow: "4px 3px 1px rgba(0,0,0,0.24)", padding: "0px 10px", whiteSpace: "noWrap", lineHeight: "1.7", color: "#707070", fontSize: "12px", top: "-14px", left: "16px" }}> {iconz.companyName}</span>
                                        </Marker>

                                    })}
                                    <ScaleControl />
                                    <OverviewMapControl />
                                </Map>
                                : ""}

                            {this.state.iconDatas.length == 0 ? <Map center={{
                                lng: self.state.centerlng, lat: self.state.centerlat
                            }} style={{
                                height: document.documentElement.clientHeight - 50,
                                width: "100%",
                                display: this.state.iconDatas.length > 0 ? "none" : "block"
                            }} enableScrollWheelZoom={true} zoom='9'>
                                {/* 比例尺 */}
                                {/* <NavigationControl /> */}

                                <ScaleControl />
                                <OverviewMapControl />

                            </Map> : ""}


                        </div>
                    </div>



                    <Tabs defaultActiveKey={this.state.tabClickChangeActiveIndex + ""}
                        onChange={this.changeTabActive.bind(this)}>
                        <Tabs.TabPane tab={<em className={styles.is00}>水域地图</em>} key="1" style={{ backgrpund: "red" }}>
                            <div style={{ position: "relative", overflow: "hidden", }} ref="mapWrap">
                                <img src={fangda} style={{ position: "absolute", left: "0px", top: "32px", zIndex: "1", opacity: ".4" }} onClick={() => {
                                    this.setState({ fullBlock: !this.state.fullBlock }, () => {
                                        self.loadData(1, 10);
                                    })
                                }} />
                                <div
                                    className={styles.titlr}>{self.state.chartStartTime + " 至 " + self.state.chartEndTime + ' 水域地图异常点'}</div>
                                {/* 右侧信息窗 */}
                                <div className={styles.absoluteRight}
                                    style={{ display: this.state.expandRightPlace && this.state.markers.length > 0 ? "block" : "none" }}>
                                    <div className={styles.rightInfo}>
                                        <h3>{this.state.arr.title}</h3>
                                        <span className={styles.rightInfoTitle}>
                                            当前风险等级：<span style={{ background: this.state.arr.color, }}>{!!this.state.arr.level ? this.state.arr.level : "-"}</span>
                                        </span>

                                        {this.state.arr.list.map((marker, index) => {
                                            return <div className={styles.itemWrap}>
                                                <span className={styles.itemTitle}>{marker.itemName}</span>
                                                <div>
                                                    <span className={styles.leftItemTitle}>检查单编号：</span>
                                                    <p className={styles.rightItemValue + " " + styles.fivespcing}>
                                                        {marker.checklistCode}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className={styles.leftItemTitle}>检查人：</span>
                                                    <p className={styles.rightItemValue + " " + styles.threespcing}>
                                                        {marker.userName}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className={styles.leftItemTitle}>检查单位：</span>
                                                    <p className={styles.rightItemValue + " " + styles.fourspcing}>
                                                        {marker.msaName}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className={styles.leftItemTitle}>问题描述：</span>
                                                    <p className={styles.rightItemValue + " " + styles.fourspcing}>
                                                        {marker.itemNameB}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className={styles.leftItemTitle}>整改要求：</span>
                                                    <p className={styles.rightItemValue + " " + styles.fourspcing}>
                                                        {marker.itemNameC}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className={styles.leftItemTitle}>检查时间：</span>
                                                    <p className={styles.rightItemValue + " " + styles.fourspcing}>
                                                        {moment(marker.createTime).format('YYYY-MM-DD HH:mm:ss')}
                                                    </p>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                {/* <div className={styles.codeArrow} onClick={this.toggleShowTotal} style={{ display: this.state.markers.length > 0 ? "block" : "none" }}>
                                    {
                                        !this.state.expandRightPlace ? <span><Icon type="left" /></span> :
                                            <span><Icon type="right" /></span>
                                    }
                                </div> */}
                                {this.state.iconDatas.length > 0 ?
                                    <Map center={{
                                        lng: self.state.centerlng,
                                        lat: self.state.centerlat,
                                    }}
                                        style={{
                                            height: '700px',
                                            width: this.state.widthwidow,
                                            display: this.state.iconDatas.length > 0 ? "block" : "none",
                                        }}
                                        enableScrollWheelZoom={true}
                                        zoom='9'
                                    >
                                        {/* iconz 多點展示 */}
                                        {this.state.iconDatas.map((iconz, index) => {

                                            // import redIcon from "../../img/redIcon.png";
                                            // import orangeIcon from "../../img/orangeIcon.png";
                                            // import yellowIcon from "../../img/yellowIcon.png";
                                            // import blueIcon from "../../img/blueIcon.png";
                                            // import grayIcon from "../../img/grayIcon.png";
                                            let icon;
                                            if (iconz.grade == 1) {
                                                icon = blueIcon
                                            } else if (iconz.grade == 2) {
                                                icon = yellowIcon
                                            } else if (iconz.grade == 3) {
                                                icon = orangeIcon
                                            } else if (iconz.grade == 4) {
                                                icon = redIcon
                                            } else {
                                                icon = grayIcon
                                            }

                                            return <Marker icon={icon} position={{
                                                lng: iconz.lng,
                                                lat: iconz.lat
                                            }} key={index} style={{ position: "relative" }}>
                                                <img src={icon} alt="" style={{ height: 32, position: "absolute", top: "-16px", left: "-16px" }} onClick={this.clickit.bind(this, iconz, index)} />
                                                {/* <span style={{width:8,height:8,background:"red",display:"inline-block"}}></span> */}
                                                <span onClick={this.clickit.bind(this, iconz, index)} style={{ background: "#fff", border: "1px solid #fff", position: "absolute", boxShadow: "4px 3px 1px rgba(0,0,0,0.24)", padding: "0px 10px", whiteSpace: "noWrap", lineHeight: "1.7", color: "#707070", fontSize: "12px", top: "-14px", left: "16px" }}> {iconz.companyName}</span>
                                            </Marker>

                                        })}
                                        {/* 比例尺 */}
                                        {/* <NavigationControl /> */}

                                        <ScaleControl />
                                        <OverviewMapControl />
                                        {/* lng: self.state.centerlng+0.00009, lat: self.state.centerlat-0.00001 */}

                                        {/* 中间信息框 */}
                                        {/* <InfoWindow position={{ lng: self.state.centerlng + 0.00009, lat: self.state.centerlat - 0.00001 }}
                                            text={this.state.showInfoWindowContent}
                                            title={this.state.showInfoWindowTitle} /> */}

                                        {/* <InfoWindow position={{lng: this.state.showInfoWindowlng, lat: this.state.showInfoWindowlat}} text={this.state.showInfoWindowContent} title={this.state.showInfoWindowTitle}/> */}
                                    </Map>
                                    : ""}

                                {this.state.iconDatas.length == 0 ? <Map center={{
                                    lng: self.state.centerlng, lat: self.state.centerlat
                                }} style={{
                                    height: '700px',
                                    width: this.state.widthwidow,
                                    display: this.state.iconDatas.length > 0 ? "none" : "block"
                                }} enableScrollWheelZoom={true} zoom='9'>
                                    {/* 比例尺 */}
                                    {/* <NavigationControl /> */}

                                    <ScaleControl />
                                    <OverviewMapControl />

                                </Map> : ""}


                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={<em className={styles.is00}>区域统计</em>} key="2">
                            <div id="mainAreaBar" style={{
                                width: this.state.widthwidow1,
                                height: this.state.heightwidow1,
                                display: !this.state.pieData ? "none" : "block"
                            }}></div>
                            <div id="mainAreaPie" style={{
                                width: this.state.widthwidow1,
                                height: this.state.heightwidow1,
                                display: !this.state.lineData ? "none" : "block"
                            }}></div>

                            {this.state.tabledata1 ? <div>
                                <div className={styles.titlr1}>{self.state.tableTitle1}</div>
                                <Table columns={this.state.tablecolumns1} dataSource={this.state.tabledata1} bordered={true}
                                    pagination={false} style={{ textAlign: "center" }} /></div> : ""}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={<em className={styles.is00}>时间统计</em>} key="3">
                            <div id="mainTimeLine" style={{
                                width: this.state.widthwidow1,
                                height: this.state.heightwidow1,
                                display: !this.state.dataLine ? "none" : "block"
                            }}></div>
                            {this.state.tabledata2 ? <div>
                                <div className={styles.titlr1}>{self.state.tableTitle2}</div>
                                <Table columns={this.state.tablecolumns2} dataSource={this.state.tabledata2} bordered={true}
                                    pagination={false} style={{ textAlign: "center" }} /></div> : ""}

                        </Tabs.TabPane>
                    </Tabs>
                </Spin>
                <div id="allmap" style={{ display: "none" }}></div>
            </div >
        )

    }
}
