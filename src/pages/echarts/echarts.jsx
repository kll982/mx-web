import React from 'react';
import moment from "moment";

moment.locale('zh-cn');
import {
    Pagination,
    Breadcrumb,
    Select,
    Row,
    Col,
    Input,
    DatePicker,
    Button,
    Icon,
    Table,
    message,
    Spin,
    TreeSelect,
    Tabs
} from 'antd';
import Singlepersonselect from '../../components/singlepersonselectload.jsx'

const {MonthPicker, RangePicker} = DatePicker;
const Option = Select.Option;
import {Link, hashHistory} from 'react-router';
import {
    Map,
    Marker,
    NavigationControl,
    MapTypeControl,
    ScaleControl,
    OverviewMapControl,
    PanoramaControl,
    InfoWindow,
    MarkerList,
    PointLabel
} from 'react-bmap';

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
// 引入 ECharts 主模块

var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
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

const loop = data => data.map((item) => {
    if (item.children && item.children.length) {
        var ptitle = "";
        if (item.nodeType == 1) {
            ptitle = <span><img src={companypng} className={styles1.qicon}/>{item.name}</span>;
        } else if (item.nodeType == 2) {
            ptitle = <span><img src={departmentpng} className={styles1.qicon}/>{item.name}</span>;
        } else if (item.nodeType == 3) {
            ptitle = <span><img src={emppng} className={styles1.qicon}/>{item.name}</span>;
        }
        return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id}
                                    value={item.id.toString()}>{loop(item.children)}</TreeSelect.TreeNode>;
    }
    var ptitle = "";
    if (item.nodeType == 1) {
        ptitle = <span><img src={companypng} className={styles1.qicon}/>{item.name}</span>;
    } else if (item.nodeType == 2) {
        ptitle = <span><img src={departmentpng} className={styles1.qicon}/>{item.name}</span>;
    } else if (item.nodeType == 3) {
        ptitle = <span><img src={emppng} className={styles1.qicon}/>{item.name}</span>;
    }
    return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id}
                                value={item.id.toString()}/>;
    // isLeaf={item.isLeaf}
});

var fakerData = {
    "text": null,
    "code": 200,
    "message": null,
    "data": {
        "response": {
            "list": [
                {
                    "name": "南京",
                    "cnt": 0
                },
                {
                    "name": "镇江",
                    "cnt": 0
                },
                {
                    "name": "扬州",
                    "cnt": 0
                },
                {
                    "name": "苏州",
                    "cnt": 0
                },
                {
                    "name": "无锡",
                    "cnt": 0
                },
                {
                    "name": "常州",
                    "cnt": 0
                },
                {
                    "name": "徐州",
                    "cnt": 0
                },
                {
                    "name": "淮安",
                    "cnt": 0
                },
                {
                    "name": "盐城",
                    "cnt": 0
                },
                {
                    "name": "连云港",
                    "cnt": 0
                },
                {
                    "name": "南通",
                    "cnt": 0
                },
                {
                    "name": "泰州",
                    "cnt": 0
                },
                {
                    "name": "宿迁",
                    "cnt": 0
                }
            ],
            "title": "2018-06-26~2018-07-03区域隐患统计",
            "tableHeader": [
                "区域",
                "数量"
            ]
        },
        "time": 1530610801908
    },
    "index": 0
};
var fakerData1 = {
    "text": null,
    "code": 200,
    "message": null,
    "data": {
        "response": {
            "list": [
                "2018-06-27",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "2018-06-28",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "2018-06-29",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "2018-06-30",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "2018-07-01",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "2018-07-02",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "2018-07-03",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "2018-07-04",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0"
            ],
            "title": "2018-06-27~2018-07-04每天隐患统计",
            "tableHeader": [
                "日期",
                "南京",
                "镇江",
                "扬州",
                "苏州",
                "无锡",
                "常州",
                "徐州",
                "淮安",
                "盐城",
                "连云港",
                "南通",
                "泰州",
                "宿迁"
            ]
        },
        "time": 1530667689494
    },
    "index": 0
}
export default class customeppqqrlist extends React.Component {
	constructor(props) {
		super(props);
		self=this;
		this.state = {
			loading:false,
			selectYearTime1:"",
			selectYearTime2:"",
			selectMonthTimeShow1:null,
			selectMonthTimeShow2:null,
			selectMonthTime1:"",
			selectMonthTime2:"",
			selectDateTimeShow1:moment().subtract(7, "days"),
			selectDateTimeShow2:moment(),
			selectDateTime1:moment().subtract(7, "days").format("YYYY-MM-DD"),
			selectDateTime2:moment().format("YYYY-MM-DD"),
			mapselection:[],
			treedata2:[],
			departmentId:"",
			departmentCode:"",
			departmentIdText:[],
			selectUnitType:"",
			selectGrade:"",
			selectFixStatus:"1",
			selectDateType:"day",
			markers:[],
			showInfoWindowTitle:"",
			showInfoWindowContent:"",
			showInfoWindowlng:"",
			showInfoWindowlat:"",
			dataPie:"",
			dataBar:"",
			dataLine:"",
			chartStartTime:"",
			chartEndTime:"",
			fetchParId:1,
			expandForm: false,
			tabClickChangeActiveIndex:1,
			expandRightPlace:true,
			centerlng: 120.613241,
			centerlat: 31.299671,
			tabledata1:null,
			tablecolumns1:null,
			tabledata2:null,
			tablecolumns2:null,

            selectCheckType: "=全部",
            AllCheckType:[],
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

    }

    initMap = () => {
        // var map = new BMap.Map("allmap");
        // map.centerAndZoom(new BMap.Point(116.4035,39.915),8);
        // setTimeout(function(){
        // 	map.setZoom(14);
        // }, 2000);  //2秒后放大到14级
        // map.enableScrollWheelZoom(true);
    }

    fetchDepartment() {
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
        var a1 = moment().format("YYYY");
        var a2 = parseFloat(a1);
        var a3 = a2 - 100;
        var a4 = a2;
        var arr = [];
        for (var index = a4; index > a3; index--) {
            var onj = {value: index + "", name: index}
            arr.push(onj)
        }
        self.setState({
            mapselection: arr
        })
    }
    setDepartmentid = (value) => {
        console.log(value);
        if (!value) {
            this.setState({departmentId: "", departmentCode: "", departmentIdText: []})
        }
        else {

            var arr1 = [];
            e1(arr1, value, this.state.department);
            if (!arr1) {
                this.setState({departmentId: value, departmentIdText: value});
                return
            }
            if (arr1.length > 0) {
                this.setState({departmentId: value, departmentIdText: value});
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
            expandRightPlace: true,
        })
        self.setState({
            centerlng: 120.613241,
            centerlat: 31.299671,
        })
        $jsonp3(self, api.checklistStatisticsByMap, {
            msaId: self.state.departmentId,
            checkSortId: self.state.selectCheckType.split("=")[0],
            isSolve: self.state.selectGrade,
            startDay: startTime,
            endDay: endTime,
            optionId: "",//检查结果
            dateType: self.state.selectDateType,//year-按年查询 month-按月查询 day-按天查询
        })
            .then((res) => {
                var dataList = res.data.response.list;
                console.log("dataList", dataList);
                for (var i in dataList) {

                }
            })
        // $jsonp3(self, api.trouble4Map, {
        //     msaId: this.state.departmentId,
        //     type: this.state.selectUnitType,
        //     grade: this.state.selectGrade,
        //     fixStatus: this.state.selectFixStatus,
        //     startDate: startTime,
        //     endDate: endTime,
        //     dateType: self.state.selectDateType,
        // })
        //     .then((res) => {
        //         self.setState({
        //             chartStartTime: startTime,
        //             chartEndTime: endTime
        //         })
        //         // var list=res.data.response.list
        //         var list = [{
        //             description: '辛甜',
        //             msaName: '灌南县地方海事处',
        //             createTime: '2018-10-29 14:31:39',
        //             companyName: '一帆河',
        //             userName: '辛甜',
        //             sortName: '渡口渡船',
        //             itemName: '渡口设置',
        //             grade: 2,
        //             itemNameA: '限期整改',
        //             itemNameB: '码头和侯船场所不符合要求',
        //             itemNameC: '码头和侯船场所按照要求整改',
        //             itemNameD: '2018年11月12日'
        //         }, {
        //             description: '辛甜',
        //             msaName: '宿迁市宿城地方海事处',
        //             createTime: '2018-10-29 14:34:01',
        //             companyName: '三台山森林公园',
        //             userName: '辛甜',
        //             sortName: '非通航水域',
        //             itemName: '标志标示',
        //             itemNameA: '当场纠正',
        //             itemNameB: '船舶蓄电池未存放在合适位置',
        //             grade: 1,
        //             itemNameC: '///',
        //             itemNameD: '///'
        //         }]
        //
        //         if (list.length > 0) {
        //             var showContent = <div>
        //                 海事部门:{list[0].msaName}<br/>分类：{list[0].sortName}<br/>检查项：{list[0].itemName}<br/>隐患等级：{list[0].grade == "2" ? "重大" : list[0].grade == "1" ? "一般" : "无隐患"}
        //             </div>;
        //             var d1 = list[0].grade == "2" ? "重大" : list[0].grade == "1" ? "一般" : "无隐患";
        //             var d2 = !list[0].deadLine && list[0].deadLine !== 0 ? "—" : list[0].deadLine + "天";
        //             var description = !list[0].description ? "—" : list[0].description;
        //             var dealMeasure = !list[0].dealMeasure ? "—" : list[0].dealMeasure;
        //             var dealResult = !list[0].dealResult ? "—" : list[0].dealResult;
        //             var showContent = "<div>海事部门：" + list[0].msaName + "<br/>检查人：" + list[0].userName + "<br/>分类：" + list[0].sortName + "<br/>检查项：" + list[0].itemName + "<br/>检查结果：" + list[0].itemNameA + "<br/>问题描述：" + list[0].itemNameB + "<br/>整改要求：" + list[0].itemNameC + "<br/>复查时间：" + list[0].itemNameD + "</div>";
        //             self.setState({
        //                 // list
        //                 markers: [{
        //                     description: '辛甜',
        //                     msaName: '灌南县地方海事处',
        //                     createTime: '2018-10-29 14:31:39',
        //                     companyName: '一帆河',
        //                     userName: '辛甜',
        //                     grade: 2,
        //                     sortName: '渡口渡船',
        //                     itemName: '渡口设置',
        //                     itemNameA: '限期整改',
        //                     itemNameB: '码头和侯船场所不符合要求',
        //                     itemNameC: '码头和侯船场所按照要求整改',
        //                     itemNameD: '2018年11月12日'
        //                 }, {
        //                     description: '辛甜',
        //                     msaName: '宿迁市宿城地方海事处',
        //                     createTime: '2018-10-29 14:34:01',
        //                     companyName: '三台山森林公园',
        //                     userName: '辛甜',
        //                     sortName: '非通航水域',
        //                     itemName: '标志标示',
        //                     itemNameA: '当场纠正',
        //                     itemNameB: '船舶蓄电池未存放在合适位置',
        //                     grade: 1,
        //                     itemNameC: '///',
        //                     itemNameD: '///'
        //                 }],
        //                 showInfoWindowTitle: "<div style='font-weight:bold'>" + list[0].companyName + "</div>",
        //                 showInfoWindowContent: showContent,
        //                 showInfoWindowlng: list[0].lng,
        //                 showInfoWindowlat: list[0].lat,
        //                 centerlng: list[0].lng,
        //                 centerlat: list[0].lat,
        //             })
        //         } else {
        //             self.setState({
        //                 markers: [{
        //                     description: '辛甜',
        //                     msaName: '灌南县地方海事处',
        //                     createTime: '2018-10-29 14:31:39',
        //                     companyName: '一帆河',
        //                     grade: 2,
        //                     userName: '辛甜',
        //                     sortName: '渡口渡船',
        //                     itemName: '渡口设置',
        //                     itemNameA: '限期整改',
        //                     itemNameB: '码头和侯船场所不符合要求',
        //                     itemNameC: '码头和侯船场所按照要求整改',
        //                     itemNameD: '2018年11月12日'
        //                 }, {
        //                     description: '辛甜',
        //                     msaName: '宿迁市宿城地方海事处',
        //                     createTime: '2018-10-29 14:34:01',
        //                     companyName: '三台山森林公园',
        //                     userName: '辛甜',
        //                     sortName: '非通航水域',
        //                     itemName: '标志标示',
        //                     itemNameA: '当场纠正',
        //                     itemNameB: '船舶蓄电池未存放在合适位置',
        //                     grade: 1,
        //                     itemNameC: '///',
        //                     itemNameD: '///'
        //                 }],
        //                 showInfoWindowTitle: "",
        //                 showInfoWindowContent: "",
        //                 showInfoWindowlng: "",
        //                 showInfoWindowlat: "",
        //                 centerlng: 120.613241,
        //                 centerlat: 31.299671,
        //             }, () => {
        //             })
        //         }
        //
        //
        //     });

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
        $jsonp3(self, api.troubleOfMsa, {
            msaId: this.state.departmentId,
            type: this.state.selectUnitType,
            grade: this.state.selectGrade,
            fixStatus: this.state.selectFixStatus,
            startDate: startTime,
            endDate: endTime,
            dateType: self.state.selectDateType,
        }).then((res) => {
            self.setState({
                loading: false,
            })
            self.setState({
                chartStartTime: startTime,
                chartEndTime: endTime
            })
            var list = res.data.response.list;
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
                    text: self.state.chartStartTime + "-" + self.state.chartEndTime + '隐患数量统计',
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
                    }
                },
                legend: {
                    data: res.data.response.legend
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
                    text: self.state.chartStartTime + "-" + self.state.chartEndTime + '隐患数量统计',
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
                    }
                },
                legend: {
                    data: res.data.response.legend
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
                // if(datapie[k2].value==0){}
                // else{

                // }
                pieSeriesData.push(datapie[k2])
            }
            var option2 = {
                title: {
                    text: self.state.chartStartTime + "-" + self.state.chartEndTime + '隐患数量统计',
                    subtext: '',
                    x: 'center',
                    textStyle: {
                        color: "#108ee9"
                    }

                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data: res.data.response.legend
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
            var myChart1 = echarts.init(document.getElementById("mainAreaBar"), 'westeros');
            myChart1.setOption(option1);
            var myChart2 = echarts.init(document.getElementById("mainAreaPie"), 'westeros');
            myChart2.setOption(option2);


        }).catch((err) => {
            self.setState({
                loading: false,
            })
        });
        $jsonp3(self, api.troubleOfMsa4Table, {
            msaId: this.state.departmentId,
            type: this.state.selectUnitType,
            grade: this.state.selectGrade,
            fixStatus: this.state.selectFixStatus,
            startDate: startTime,
            endDate: endTime,
            dateType: self.state.selectDateType,
        }).then((res) => {
            var tableList = res.data.response.list;
            var tableHeader = res.data.response.tableHeader;
            self.setState({
                tabledata1: tableList
            })
            var keyList = [];
            for (var p in tableList[0]) {
                keyList.push(p)
            }
            var returnColumn = [];
            for (var i = 0; i < tableHeader.length; i++) {
                returnColumn.push({
                    title: tableHeader[i],
                    dataIndex: keyList[i],
                    key: keyList[i],
                    className: publicstyle.center,
                })
            }
            self.setState({
                tablecolumns1: returnColumn,
                tableTitle1: res.data.response.title
            })
        }).catch((err) => {
            self.setState({
                loading: false,
            })
        });
        // var tableList=fakerData.data.response.list;
        // var tableHeader=fakerData.data.response.tableHeader;
        // self.setState({
        // 	tabledata1:tableList
        // })
        // var keyList=[];
        // for(var p in tableList[0]){
        // 	keyList.push(p)
        // }
        // var returnColumn=[];
        // for(var i=0;i<tableHeader.length;i++){
        // 	returnColumn.push({
        // 		title:  tableHeader[i],
        // 		dataIndex: keyList[i],
        // 		key: keyList[i],
        // 		className:publicstyle.center,
        // 	})
        // }
        // self.setState({
        // 	tablecolumns1:returnColumn
        // })

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
        $jsonp3(self, api.troubleOfMsaPreDay, {
            msaId: this.state.departmentId,
            type: this.state.selectUnitType,
            grade: this.state.selectGrade,
            fixStatus: this.state.selectFixStatus,
            startDate: startTime,
            endDate: endTime,
            dateType: self.state.selectDateType,
        }).then((res) => {
            self.setState({
                loading: false,
            })
            self.setState({
                chartStartTime: startTime,
                chartEndTime: endTime
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
                    text: self.state.chartStartTime + "-" + self.state.chartEndTime + '隐患数量统计',
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
                    }
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
                    text: self.state.chartStartTime + "-" + self.state.chartEndTime + '隐患数量统计',
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
                    }
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
                series: barSeriesData
            };
            self.setState({
                dataBar: option1
            })
            var myChart1 = echarts.init(document.getElementById("mainTimeLine"), 'westeros');
            myChart1.setOption(option);
        }).catch((err) => {
            self.setState({
                loading: false,
            })
        });
        $jsonp3(self, api.troubleOfMsaPreDay4Table, {
            msaId: this.state.departmentId,
            type: this.state.selectUnitType,
            grade: this.state.selectGrade,
            fixStatus: this.state.selectFixStatus,
            startDate: startTime,
            endDate: endTime,
            dateType: self.state.selectDateType,
        }).then((res) => {
            var tableList = res.data.response.list;
            var tableHeader = res.data.response.tableHeader;
            var tableHeaderLength = tableHeader.length;

            var result = tableList;

            var pushList = [];
            for (var i = 0; i < result.length; i++) {
                var newObg = {};
                for (var j = 0; j < result[i].dateCnt.length; j++) {
                    newObg[tableHeader[j]] = result[i].dateCnt[j]
                }
                pushList.push(newObg)
            }
            var returnColumn = [];
            for (var i = 0; i < tableHeader.length; i++) {
                returnColumn.push({
                    title: tableHeader[i],
                    dataIndex: tableHeader[i],
                    key: tableHeader[i],
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

        // var tableList=fakerData1.data.response.list;
        // var tableHeader=fakerData1.data.response.tableHeader;
        // var tableHeaderLength=tableHeader.length;

        // var result = [];
        // for(var i=0;i<tableList.length;i+=tableHeaderLength){
        // 	result.push(tableList.slice(i,i+tableHeaderLength));
        // }
        // var pushList=[];
        // for(var i=0;i<result.length;i++){
        // 	var newObg={};
        // 	for(var j=0;j<result[i].length;j++){
        // 		newObg[tableHeader[j]]=result[i][j]
        // 	}
        // 	pushList.push(newObg)
        // }
        // var returnColumn=[];
        // for(var i=0;i<tableHeader.length;i++){
        // 	returnColumn.push({
        // 		title:  tableHeader[i],
        // 		dataIndex: tableHeader[i],
        // 		key: tableHeader[i],
        // 		className:publicstyle.center,
        // 	})
        // }
        // self.setState({
        // 	tabledata2:pushList
        // })
        // self.setState({
        // 	tablecolumns2:returnColumn,
        // 	tableTitle2:fakerData1.data.response.title
        // })
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
                console.log(res.data.response.list);
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
            selectFixStatus: "1",
            selectDateType: "day",
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
        var d1 = item.grade == "2" ? "重大" : item.grade == "1" ? "一般" : "无隐患";
        var d2 = !item.deadLine && item.deadLine !== 0 ? "—" : item.deadLine + "天";

        var description = !item.description ? "—" : item.description;
        var dealMeasure = !item.dealMeasure ? "—" : item.dealMeasure;
        var dealResult = !item.dealResult ? "—" : item.dealResult;

        self.setState({
            showInfoWindowTitle: "<div style='font-weight:bold'>" + item.companyName + "</div>",
            showInfoWindowContent: showContent,
            showInfoWindow: true,
            showInfoWindowlng: item.lng,
            showInfoWindowlat: item.lat,
        })

    }
    clickitCopy = (item, index) => {
        self.setState({
            centerlat: item.lat,
            centerlng: item.lng,
        })

        var d1 = item.grade == "2" ? "重大" : item.grade == "1" ? "一般" : "无隐患";
        var d2 = !item.deadLine && item.deadLine !== 0 ? "—" : item.deadLine + "天";
        var description = !item.description ? "—" : item.description;
        var dealMeasure = !item.dealMeasure ? "—" : item.dealMeasure;
        var dealResult = !item.dealResult ? "—" : item.dealResult;
        var showContent = "<div>海事部门：" + item.msaName + "<br/>检查人：" + item.userName + "<br/>检查对象：" + item.sortName + "<br/>检查项：" + item.itemName + "<br/>检查结果：" + item.itemNameA + "<br/>问题描述：" + item.itemNameB + "<br/>整改要求：" + item.itemNameC + "<br/>复查时间：" + item.itemNameD + "</div>";
        // var showContent="<div>海事部门："+item.msaName+"<br/>检查人："+item.userName+"<br/>分类："+item.sortName+"<br/>检查项："+item.itemName+"<br/>隐患等级："+d1+"<br/>问题描述："+description+"<br/>处理措施："+dealMeasure+"<br/>处理结果："+dealResult+"<br/>限期天数："+d2+"</div>";

        self.setState({
            showInfoWindowTitle: "<div style='font-weight:bold'>" + item.companyName + "</div>",
            showInfoWindowContent: showContent,
            showInfoWindow: true,
            showInfoWindowlng: item.lng,
            showInfoWindowlat: item.lat,
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
                <Col span={8}><span style={{paddingRight: 10}}>所属海事局:</span>
                    <TreeSelect
                        loadData={this.onTreeLoadData}
                        showSearch
                        treeNodeFilterProp="pops"
                        className={styles.singleSelect}
                        value={this.state.departmentIdText ? this.state.departmentIdText : ""}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        placeholder="请选择"
                        allowClear
                        dropdownMatchSelectWidth={false}

                        onChange={this.setDepartmentid}
                    >
                        {loop(this.state.treedata2)}

                    </TreeSelect>
                </Col>
                <Col span={5}><span style={{paddingRight: 10}}>检查对象</span>
                    <Select value={this.state.selectCheckType.split("=")[1]} style={{width: "50%"}}
                            onChange={this.setUnitType}>
                        <Option value="=全部">全部</Option>
                        {
                            this.state.AllCheckType.map((item, index) => {
                                return <Option value={item.id + "=" + item.sort} key={item + ""}
                                               disable={item.status == 0}>{item.sort}</Option>
                            })
                        }
                    </Select>
                </Col>

                <Col span={5}><span style={{paddingRight: 10}}>检查结果:</span>
                    <Select value={this.state.selectGrade} style={{width: "50%"}} onChange={this.setGrade}>
                        <Option value="">全部</Option>
                        <Option value="1">限期整改</Option>
                        <Option value="2">当场纠正</Option>
                    </Select>
                </Col>
                <Col span={6}>
                    <Button type="primary" onClick={this.queryProfitOfCondition}>查询</Button>
                    <Button type="default" style={{marginLeft: 20}} onClick={this.reset}>重置</Button>
                    <Button type="default" style={{
                        marginLeft: 20,
                        display: this.state.tabClickChangeActiveIndex == 2 ? "inline-block" : "none"
                    }} onClick={this.xiazai.bind(this, 2)}>导出</Button>
                    <Button type="default" style={{
                        marginLeft: 20,
                        display: this.state.tabClickChangeActiveIndex == 3 ? "inline-block" : "none"
                    }} onClick={this.xiazai.bind(this, 3)}>导出</Button>
                    <a style={{marginLeft: 8}} onClick={this.toggleForm}>
                        展开 <Icon type="down"/>
                    </a>
                </Col>
            </Row>
        );
    }

    renderAdvancedForm() {
        return (
            <div>
                <Row className={styles.antrow1}>
                    <Col span={8}><span style={{paddingRight: 10}}>所属海事局:</span>
                        <TreeSelect
                            loadData={this.onTreeLoadData}
                            showSearch
                            treeNodeFilterProp="pops"
                            className={styles.singleSelect}
                            value={this.state.departmentIdText ? this.state.departmentIdText : ""}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            placeholder="请选择"
                            allowClear
                            dropdownMatchSelectWidth={false}

                            onChange={this.setDepartmentid}
                        >
                            {loop(this.state.treedata2)}

                        </TreeSelect>
                    </Col>
                    <Col span={5}><span style={{paddingRight: 10}}>分类</span>
                        <Select value={this.state.selectUnitType} style={{width: "50%"}} onChange={this.setUnitType}>
                            <Option value="">全部</Option>
                            <Option value="1">渡口渡船</Option>
                            <Option value="2">游览经营(通航)</Option>
                            <Option value="3">游览经营(非通航)</Option>
                        </Select>
                    </Col>

                    <Col span={5}><span style={{paddingRight: 10}}>检查结果:</span>
                        <Select value={this.state.selectGrade} style={{width: "50%"}} onChange={this.setGrade}>
                            <Option value="">全部</Option>
                            <Option value="1">限期整改</Option>
                            <Option value="2">当场纠正</Option>
                        </Select>
                    </Col>
                    <Col span={6}><span style={{paddingRight: 10}}>解决与否:</span>
                        <Select value={this.state.selectFixStatus} style={{width: "50%"}} onChange={this.setFixStatus}>
                            <Option value="">全部</Option>
                            <Option value="1">未解决</Option>
                            <Option value="0">已解决</Option>
                        </Select>
                    </Col>
                </Row>
                <Row className={styles.antrow1}>
                    <Col span={8}><span style={{paddingRight: 10}}>查询类型:</span>
                        <Select value={this.state.selectDateType} style={{width: "50%"}} onChange={this.setDateType}>
                            <Option value="day">按日查询</Option>
                            <Option value="month">按月查询</Option>
                            <Option value="year">按年查询</Option>

                        </Select>
                    </Col>

                    <Col span={10}><span style={{paddingRight: 10}}>日期范围:</span>
                        <div style={{
                            display: this.state.selectDateType == "year" ? "inline-block" : "none",
                            width: "80%"
                        }}>
                            <Select value={this.state.selectYearTime1} placeholder="开始年份" style={{width: "45%"}}
                                    onChange={this.setYearTime1.bind(this)}>
                                {this.state.mapselection.map((item, index) => {
                                    return <Option value={item.value}>{item.name}</Option>
                                })}
                            </Select>
                            <Select value={this.state.selectYearTime2} placeholder="结束年份"
                                    style={{width: "45%", marginLeft: "10px"}} onChange={this.setYearTime2.bind(this)}>
                                {this.state.mapselection.map((item, index) => {
                                    return <Option value={item.value}>{item.name}</Option>
                                })}
                            </Select>
                        </div>
                        <div style={{
                            display: this.state.selectDateType == "month" ? "inline-block" : "none",
                            width: "80%"
                        }}>
                            <MonthPicker format="YYYY-MM" value={this.state.selectMonthTimeShow1}
                                         onChange={this.selectMonthChange1} disabledDate={this.disabledStartMonth}
                                         style={{width: "45%"}} placeholder="开始月份"/>
                            <MonthPicker format="YYYY-MM" value={this.state.selectMonthTimeShow2}
                                         onChange={this.selectMonthChange2} disabledDate={this.disabledEndMonth}
                                         style={{width: "45%", marginLeft: "10px"}} placeholder="结束月份"/>
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
                                style={{width: "45%"}}
                                onChange={this.selectDateChange1}/>
                            <DatePicker
                                size="large"
                                format="YYYY-MM-DD"
                                placeholder={"结束日期"}
                                value={this.state.selectDateTimeShow2}
                                disabledDate={this.disabledEndDate}
                                onOk={this.timeOk}
                                style={{width: "45%", marginLeft: "10px"}}
                                onChange={this.selectDateChange2}/>
                        </div>
                    </Col>
                    <Col span={6}>
                        <Button type="primary" onClick={this.queryProfitOfCondition}>查询</Button>
                        <Button type="default" style={{marginLeft: 20}} onClick={this.reset}>重置</Button>
                        <Button type="default" style={{
                            marginLeft: 20,
                            display: this.state.tabClickChangeActiveIndex == 2 ? "inline-block" : "none"
                        }} onClick={this.xiazai.bind(this, 2)}>导出</Button>
                        <Button type="default" style={{
                            marginLeft: 20,
                            display: this.state.tabClickChangeActiveIndex == 3 ? "inline-block" : "none"
                        }} onClick={this.xiazai.bind(this, 3)}>导出</Button>
                        <a style={{marginLeft: 8}} onClick={this.toggleForm}>
                            收起 <Icon type="up"/>
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
        // msaId:this.state.departmentId,
        // 	type:this.state.selectUnitType,
        // 	grade:this.state.selectGrade,
        // 	fixStatus:this.state.selectFixStatus,
        // 	startDate:startTime,
        // 	endDate: endTime,
        // 	dateType:self.state.selectDateType,
        var param = "?msaId=" + self.state.departmentId + "&type=" + self.state.selectUnitType + "&grade=" + self.state.selectGrade + "&fixStatus=" + self.state.selectFixStatus + "&startDate=" + startTime + "&endDate=" + endTime + "&dateType=" + self.state.selectDateType;

        if (typeTextShow == 2) {
            var urlxiazai1 = api.troubleOfMsa4Excel + param;
            var urlxiazaiList = api.troubleOfMsa4Excel;
        } else if (typeTextShow == 3) {
            var urlxiazai1 = api.troubleOfMsaPreDay4Excel + param;
            var urlxiazaiList = api.troubleOfMsaPreDay4Excel;
        }
        self.setState({
            loading: true,
        })
        $.ajax({
            url: urlxiazaiList,
            type: "get",
            data: {
                msaId: self.state.departmentId,
                type: self.state.selectUnitType,
                grade: self.state.selectGrade,
                fixStatus: self.state.selectFixStatus,
                startDate: startTime,
                endDate: endTime,
                dateType: self.state.selectDateType
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

        {
        }
        return (
            <Spin spinning={this.state.loading}>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>统计报表</Breadcrumb.Item>
                    <Breadcrumb.Item>隐患区域统计</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.clearfloat}></div>
                <a href={this.state.urlxiazai} download style={{display: "none"}} ref="xiazaibutton">下载</a>
                {this.renderForm()}

                <Tabs defaultActiveKey={this.state.tabClickChangeActiveIndex + ""}
                      onChange={this.changeTabActive.bind(this)}>
                    <Tabs.TabPane tab={<em className={styles.is00}>水域地图</em>} key="1">
                        <div style={{position: "relative"}}>
                            <div
                                className={styles.titlr}>{self.state.chartStartTime + "-" + self.state.chartEndTime + '水域地图异常点'}</div>
                            <div className={styles.absoluteRight}
                                 style={{display: this.state.expandRightPlace && this.state.markers.length > 0 ? "block" : "none"}}>

                                {this.state.markers.map((marker, index) => {
                                    if (marker.grade == "2") {
                                        var icon = styles.amapSimpleMarkerStylered;
                                        var icon1 = <img src={darkred}/>;
                                    } else if (marker.grade == "1") {
                                        var icon = styles.amapSimpleMarkerStyledarkyellow;
                                        var icon1 = <img src={darkyellow}/>;
                                    } else {
                                        var icon = styles.amapSimpleMarkerStyleblue;
                                        var icon1 = <img src={darkblue}/>;
                                    }
                                    return <div className={styles.poibox}
                                                onClick={this.clickitCopy.bind(this, marker, index)}>
                                        <div className={styles.poibox1}>
                                            <div className={styles.poibox1img}>{icon1}</div>
                                            <div className={styles.amapSimpleMarkerlabel + styles.p1}
                                                 style={{color: "rgb(255, 255, 255)"}}></div>
                                        </div>
                                        <h3 className={styles.poiTitle}><span>{marker.companyName}</span></h3>
                                        <div className={styles.poiInfo}><p
                                            className={styles.poiAddr}>{marker.description}</p></div>
                                        <div className={styles.poiInfo}><p
                                            className={styles.poiAddr}>{marker.msaName}</p></div>
                                        <div className={styles.poiInfo}><p
                                            className={styles.poiAddr}>{moment(marker.createTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                                        </div>

                                    </div>
                                })}
                            </div>
                            <div className={styles.codeArrow} onClick={this.toggleShowTotal}
                                 style={{display: this.state.markers.length > 0 ? "block" : "none"}}>
                                {!this.state.expandRightPlace ? <span><Icon type="left"/></span> :
                                    <span><Icon type="right"/></span>}
                            </div>
                            {this.state.markers.length > 0 ?
                                <Map center={{
                                    lng: 118.767583,
                                    lat: 31.986304,
                                }}
                                     style={{
                                         height: '700px',
                                         width: this.state.widthwidow,
                                         display: this.state.markers.length > 0 ? "block" : "none"
                                     }}
                                     enableScrollWheelZoom={true}
                                     zoom='13'
                                >
                                    {this.state.markers.map((marker, index) => {
                                        if (marker.grade == "2") {
                                            var icon = styles.amapSimpleMarkerStylered;
                                        } else if (marker.grade == "1") {
                                            var icon = styles.amapSimpleMarkerStyledarkyellow;
                                        } else {
                                            var icon = styles.amapSimpleMarkerStyleblue;
                                        }
                                        return <Marker icon={icon} position={{lng: 118.767583, lat: 31.986304}}>
                                            <div onClick={this.clickit.bind(this, marker, index)}
                                                 className={styles.amapSimpleMarker + " " + styles.amapSimpleMarkerFreshstyle + " " + icon}>
                                                <div className={styles.amapSimpleMarkericon}></div>
                                                <div className={styles.amapSimpleMarkerlabel}
                                                     style={{color: "rgb(255, 255, 255)"}}></div>
                                            </div>
                                        </Marker>

                                    })}
                                    <NavigationControl/>

                                    <ScaleControl/>
                                    <OverviewMapControl/>
                                    <InfoWindow position={{lng: 118.767583, lat: 31.986304}}
                                                text={this.state.showInfoWindowContent}
                                                title={this.state.showInfoWindowTitle}/>
                                    {/* <InfoWindow position={{lng: this.state.showInfoWindowlng, lat: this.state.showInfoWindowlat}} text={this.state.showInfoWindowContent} title={this.state.showInfoWindowTitle}/> */}
                                </Map>
                                : ""}
                            {this.state.markers.length == 0 ? <Map center={{
                                lng: 120.613241,
                                lat: 31.299671,
                            }}
                                                                   style={{
                                                                       height: '700px',
                                                                       width: this.state.widthwidow,
                                                                       display: this.state.markers.length > 0 ? "none" : "block"
                                                                   }}
                                                                   enableScrollWheelZoom={true}
                                                                   zoom='13'
                            >
                                <NavigationControl/>

                                <ScaleControl/>
                                <OverviewMapControl/>

                            </Map> : ""}


                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<em className={styles.is00}>区域统计</em>} key="2">
                        <div id="mainAreaBar" style={{
                            width: this.state.widthwidow1,
                            height: this.state.heightwidow1,
                            display: !this.state.dataBar ? "none" : "block"
                        }}></div>
                        <div id="mainAreaPie" style={{
                            width: this.state.widthwidow1,
                            height: this.state.heightwidow1,
                            display: !this.state.dataPie ? "none" : "block"
                        }}></div>

                        {this.state.tabledata1 ? <div>
                            <div className={styles.titlr1}>{self.state.tableTitle1}</div>
                            <Table columns={this.state.tablecolumns1} dataSource={this.state.tabledata1} bordered={true}
                                   pagination={false} style={{textAlign: "center"}}/></div> : ""}
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
                                   pagination={false} style={{textAlign: "center"}}/></div> : ""}

                    </Tabs.TabPane>
                </Tabs>

            </Spin>

		)
     }
}
