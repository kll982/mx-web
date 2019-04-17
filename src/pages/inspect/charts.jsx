import React from 'react';
import {Link, hashHistory} from 'react-router';
import '../echarts/westeros.js';
import {Breadcrumb, Row, Col, Card, Spin, Button} from "antd";
import api from '../../utils/api.js';
import $jsonp3 from "../../utils/service3";
import styles from "../index/index.less";
import publicstyle from "../../img/public.less";
import styles2 from "../admin/index.less";
import stylez from '../../container/index.less';
// 引入 ECharts 主模块

var echarts = require('echarts/lib/echarts');
// 引入饼状图
require('echarts/lib/chart/pie');
// 引入线图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
var self, column, taskId, typeName, msaId;
export default class charts extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            pieLoad: true,
            lineLoad: true,
            line: false,
            ringLoad: true,
            msaName: '',
        }
    }

    componentWillMount() {
        taskId = self.props.location.state.taskId;
        column = self.props.location.state.type;
        typeName = self.props.location.state.typeName;
        msaId = self.props.location.state.msaId;
        self.getMsaName();
    }

    componentDidMount() {
        self.pieChart();
        self.lineChart();

    }
    // 部门名称
    getMsaName(){
        $jsonp3(self, api.getMsaInfo, {
            msaId: msaId
        }).then((res) => {
            self.setState({
                msaName: res.data.response.msaInfo.name
            })
        })
    }

    pieChart = () => {
        $jsonp3(self, api.getStatsticsOfPieChart, {
            taskId: taskId
        }).then((res) => {
            var PieArray = res.data.response.statisticListDtos;
            self.setState({
                pieLoad: false
            });
            var PieData = [];
            PieArray.map((item) => {
                if (item.specialStowtss == null || item.specialStowtss.length == "0") {
                    PieData.push({
                        name: item.msaInfo.shortName,
                        value: Number(item.specialTsowst[column]),
                    })
                } else {
                    PieData.push({
                        name: item.msaInfo.shortName,
                        value: Number(item.specialStowtss[column]),
                    })
                }
            });
            let myPieChart = echarts.init(document.getElementById("pie"));
            let options = {
                title: {
                    text: self.state.msaName + " " + typeName + ' 数量构成',
                    left: 'left',
                    top: 0,
                    textStyle: {
                        color: '#108ee9'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name: '部门',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '55%'],
                        data: PieData.sort(function (a, b) { return a.value - b.value; }),
                        avoidLabelOverlap: true,
                        roseType: 'radius',
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                    }
                ]
            }
            myPieChart.setOption(options);
        })
    }

    back() {
        window.history.back();
    }

    lineChart = () => {
        $jsonp3(self, api.getStatsticsOfLineChart, {
            taskId: taskId,
        }).then((res) => {
            var lineStatisticListDtos = res.data.response.statisticListDtos;
            self.setState({
                lineLoad: false
            });
            let myLineChart = echarts.init(document.getElementById("line"));
            let LineData = [], LineName = [];
            lineStatisticListDtos.map((item) => {
                if (item.specialStowtss == null && item.specialTsowst == null) {
                    self.setState({
                        line: true
                    })
                }
                else if (item.specialStowtss == null) {
                    LineName.push(item.statsticsday);
                    LineData.push(Number(item.specialTsowst[column]));
                }
                else if (item.specialTsowst == null) {
                        LineName.push(item.statsticsday);
                        LineData.push(Number(item.specialStowtss[column]));
                }
            })
            let option = {
                title: {
                    text: self.state.msaName + " " + typeName + ' 数量变动',
                    left: 'left',
                    top: 0,
                    textStyle: {
                        color: '#108ee9'
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: LineName,
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: LineData,
                    type: 'line',
                    markLine: {}
                }]
            };
            myLineChart.setOption(option);
        })
    }

    render() {
        return (
            <div className={`${styles.welcomea}  ${stylez.wrapPadding}`}>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>数据统计</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="main/allTable">统计报表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>查看</Breadcrumb.Item>
                    <Breadcrumb.Item>图表</Breadcrumb.Item>
                </Breadcrumb>
                <div className={publicstyle.clearfloatTrans}></div>
                <Button type="primary" onClick={this.back} className={styles2.returnbackbutton}
                        style={{marginTop: 15}}>返回</Button>
                <Row gutter={24}>
                    <Col lg={12} md={24}>
                        <Spin spinning={this.state.pieLoad}>
                            <Card bordered={false} style={{
                                padding: '24px 0 24px 0',
                                height: 450,
                                background: '#fff',
                            }} className={styles.numberCard1}>
                                <div id="pie" style={{width: "100%", height: 400}}>
                                    暂无数据
                                </div>
                            </Card>
                        </Spin>
                    </Col>
                    <Col lg={12} md={24} style={{display: self.state.line == false ? "inline-block" : "none"}}>
                        <Spin spinning={this.state.lineLoad}>
                            <Card bordered={false} style={{
                                padding: '24px 0 24px 0',
                                height: 450,
                                background: '#fff',
                            }} className={styles.numberCard1}>
                                <div id="line" style={{width: "100%", height: 400}}>
                                    暂无数据
                                </div>
                            </Card>
                        </Spin>
                    </Col>
                </Row>
            </div>
        )
    }

}