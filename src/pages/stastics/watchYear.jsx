// 汇总页
import React from 'react';
import { Link, hashHistory } from 'react-router';
import { Input, Button, Row, Col, Breadcrumb, message, Menu, Icon, Layout, Select, Tree } from 'antd';

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";
import publicstyle from "../../img/public.less";
import styles from "../businessmanage/departmentsetNew.less";
import styles2 from "../admin/index.less";
import phone from "../../img/phone.png";

let self, data, rootSubmenuKeys, NoneLength, items = {
    emowsar1: "接处警（起）",
    emowsar2: "救助人员（人次）",
    emowsar3: "救助遇险船舶（艘次）",
    emowsar4: "挽回损失（万元）",
    emowsar5: "处置险情",
    emowsar6: "死亡",
    emowsar7: "沉船",
    emowsar8: "排除险情（起）",
    emowsar9: "其中航道堵塞",
    emowsar10: "清除碍航物",
    emowsar11: "出动人力（人次）",
    emowsar12: "出动艇力（艘次）",
    emowsar13: "协调社会力量（人次）",
    aiah1: "事故起数",
    aiah2: "一般等级以上事故起数",
    aiah3: "小事故起数",
    aiah4: "伤亡人数",
    aiah5: "沉船艘数",
    aiah6: "直接经济损失（万元）",
    aiah7: "立案调查起数",
    aiah8: "受理调解起数",
    aiah9: "危化品、客渡船事故起数",
    leiahti1: "执法检查次数",
    leiahti2: "出动人次",
    leiahti3: "出动车艇",
    leiahti4: "聘请专家人次",
    leiahti5: "检查企业数",
    leiahti6: "检查船舶数",
    leiahti7: "隐患数量",
    leiahti8: "立即整改",
    leiahti9: "限期整改",
    leiahti10: "追究违法责任",
    leiahti11: "采取强制措施",
    leiahti12: "挂牌督办",
    leiahti13: "下达整改通知书",
    leiahti14: "发执法抄送函",
    leiahti15: "责令停止作业",
    leiahti16: "查处违章船舶数",
    leiahti17: "行政处罚次数",
    leiahti18: "罚没金额（万元）",
    sss1: "船舶报告数（艘次）",
    sss2: "其中：危险货物船舶数（艘次）",
    sss3: "船舶货物量（万吨）",
    sss4: "其中：危险货物量（万吨）",
    sss5: "船舶现场监督（艘次）",
    sss6: "发现违法行为（起）",
    sss7: "启动安全检查（次）",
    sss8: "船旗国监督检查（艘次）",
    sss9: "其中危化品船舶",
    sss10: "其中客渡船",
    sss11: "查出缺陷数（项）",
    sss12: "滞留船舶（艘）",
    sss13: "发出船舶安全检查信息通报表（份）",
    sss14: "其中危化品船舶",
    nsmowaua1: "核发水工许可（件）",
    nsmowaua2: "发布航行通告、警告（份）",
    nsmowaua3: "水上群体性文娱体育活动（次）",
    nsmowaua4: "已核发许可在建工程（项）",
    nsmowaua5: "交通管制（天）",
    nsmowaua6: "出动人员（人次）",
    nsmowaua7: "动用艇力（艘次）",
    todgaam1: "载运危险货物船舶适装申报艘次",
    todgaam2: "其中现场核查艘次",
    todgaam3: "危险货物吞吐量（万吨）",
    todgaam4: "防污检查艘次",
    todgaam5: "固废检查艘次",
    todgaam6: "接收船舶垃圾（吨）",
    todgaam7: "生活污水装置检查（艘）",
    todgaam8: "处罚起数",
};

const SubMenu = Menu.SubMenu, TreeNode = Tree.TreeNode,
    Option = Select.Option, { Header, Content, Footer, Sider } = Layout;

export default class all extends React.Component {
    constructor(props) {
        super(props);
        self = this;
    }

    state = {
        openKeys: ['sub1'],
        noneLength: 0,
        Value: {},
        statsticsday: "",
        forindate: [],
        msaId: 1,
        Tablevalue1: [],
        Tablevalue2: [],
        Tablevalue3: [],
        Tablevalue4: [],
        Tablevalue5: [],
        Tablevalue6: [],

        phones: {
            show: false,
        },

        chartImg: true,
        userInfoz:{},
    };

    // onlunch
    componentWillMount() {
        data = JSON.parse(self.props.location.state.data);
        self.setState({
            data: data
        })
        self.getStatisticsInfo(data);
        this.getUserMsa();

    }
    getUserMsa() {
        $jsonp3(self, api.phone, {}).then((res) => {
            self.setState({
                userInfoz: res.data.response.statisticListDto
            })
        })
    }

    // onload
    componentDidMount() {
    }

    componentDidMount() {
        this.setState({
            Tablevalue: []
        })
    }

    // 树形结构
    getStatisticsInfo = (data) => {
        $jsonp3(self, api.getStatisticsInfo, {
            taskId: data.id
        }).then((res) => {
            var forindate = res.data.response.statsticsday;
            var countyList = res.data.response.countyList;
            countyList[0].isUpload = true;
            countyList[0].subTitle = '';
            countyList[0].children.map((item) => {
                if (item.children && item.children.length > 0) {
                    item.children.map((it) => {
                        it.isUpload = true;
                        it.subTitle = ""
                    });
                }
                item.subTitle = ''
                item.isUpload = true
            });
            self.setState({
                tree: countyList,
                specialStatsticsTaskInfoDetails: res.data.response.specialStatsticsTaskInfoDetails,
                forindate: forindate,
            })

            self.handleClick(self.state.tree[0].id);
            self.setIfUpload(self.state.statsticsday);
        });
    }

    //动态设置部门是否上报
    setIfUpload(dateString) {
        // 选择日期
        if (dateString && dateString != 'null' && dateString != null) {
            if (self.state.tree) {
                self.state.tree[0].children.map((item) => {
                    //三级
                    if (item.children && item.children.length > 0) {
                        let flag = false;
                        item.children.map((it1) => {
                            let flag1 = false;
                            self.state.specialStatsticsTaskInfoDetails.map((it) => {
                                if (dateString == it.statisticsDate && it1.id == it.msaId) {
                                    if (it.state == '1') {
                                        flag = true;
                                        flag1 = true;
                                    }
                                    else {
                                        flag1 = false;

                                    }
                                }
                            });

                            if (flag1) {
                                it1.subTitle = "";
                                it1.isUpload = true
                            } else {
                                it1.subTitle = "（未上报）";
                                it1.isUpload = false;
                            }

                        });
                        if (flag) {
                            item.isUpload = true;
                            item.subTitle = '';
                        }
                        else {
                            item.subTitle = "（未上报）";
                            item.isUpload = false
                        }
                    }
                    else {

                        self.state.specialStatsticsTaskInfoDetails.map((it) => {
                            if (dateString == it.statisticsDate && item.id == it.msaId) {
                                if (it.state != '0') {
                                    item.subTitle = "";
                                    item.isUpload = true
                                }
                                else {
                                    item.subTitle = " (未上报)";
                                    item.isUpload = false
                                }
                            }
                        });
                    }

                });
            }

        }
        // 未选择日期
        else {
            if (self.state.tree) {
                self.state.tree[0].children.map((item) => {
                    //三级
                    if (item.children && item.children.length > 0) {
                        let fflag = false;
                        item.children.map((it1) => {
                            let fflag1 = false;

                            self.state.specialStatsticsTaskInfoDetails.map((it) => {
                                if (it1.id == it.msaId) {
                                    if (it.state == '1') {
                                        fflag = true;
                                        fflag1 = true;
                                    }
                                }
                            });
                            if (fflag1) {
                                it1.subTitle = "";
                                it1.isUpload = true;
                            } else {
                                it1.subTitle = "（未上报）";
                                it1.isUpload = false;
                            }

                        });
                        if (fflag) {
                            item.subTitle = "";
                            item.isUpload = true;
                        } else {
                            item.subTitle = "（未上报）";
                            item.isUpload = false;
                        }
                    }
                    else {
                        let flag = false;
                        // 二级
                        self.state.specialStatsticsTaskInfoDetails.map((it) => {
                            if (item.id == it.msaId) {
                                if (it.state == '1') {
                                    flag = true;
                                }
                            }
                        });
                        if (!flag) {
                            item.subTitle = "（未上报）";
                            item.isUpload = false;
                        }
                        else {
                            item.subTitle = "";
                            item.isUpload = true
                        }
                    }

                });
            }
        }
    }
    time = (time) => {
        var Time = new Date(time);
        var year = Time.getFullYear();
        var mon = Time.getMonth() + 1 < 10 ? "0" + (Time.getMonth() + 1) : Time.getMonth() + 1;
        var day = Time.getDate() < 10 ? "0" + Time.getDate() : Time.getDate();
        var hour = Time.getHours() < 10 ? "0" + Time.getHours() : Time.getHours();
        var min = Time.getMinutes() < 10 ? "0" + Time.getMinutes() : Time.getMinutes();
        var sconed = Time.getSeconds() < 10 ? "0" + Time.getSeconds() : Time.getSeconds();
        var days = year + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sconed;
        return days;
    }
    // 选择单位
    handleClick = (e) => {
        if (e.length == 0) {
            return
        }
        localStorage.setItem('ClickMsaId', Number(e));
        self.setState({
            Value: {},
            msaId: Number(e),
        })
        var user = self.state.userInfoz.msaId;
        if (self.state.statsticsday != "" || Number(e)!=user) {
            self.setState({
                chartImg: false,
            })
        } else {
            self.setState({
                chartImg: true,
            })
        }
        $jsonp3(self, api.getStatistics, {
            msaId: Number(e),
            taskId: data.id,
            statisticsDate: self.state.statsticsday
        }).then((res) => {
            var responses = res.data.response;
            if (responses.isOk != null) {
                this.setState({
                    phones: {
                        show: true,
                        isOk: responses.isOk,
                        name: responses.name,
                        phone: responses.phone,
                        updateTime: self.time(responses.updateTime),
                    }
                })
            }

            var Tablevalue1 = [], Tablevalue2 = [], Tablevalue3 = [], Tablevalue4 = [], Tablevalue5 = [],
                Tablevalue6 = [];
            var data = res.data.response.specialTsowst;

            Tablevalue1.push(
                [
                    {
                        name: items.aiah1,
                        type: "aiah1",
                        value: Number(data.aiah1),
                    },
                    {
                        name: items.aiah2,
                        type: "aiah2",
                        value: Number(data.aiah2),
                    },
                    {
                        name: items.aiah3,
                        type: "aiah3",
                        value: Number(data.aiah3),
                    }
                ],
                [
                    {
                        name: items.aiah4,
                        type: "aiah4",
                        value: Number(data.aiah4),
                    },
                    {
                        name: items.aiah5,
                        type: "aiah5",
                        value: Number(data.aiah5),
                    },
                    {
                        name: items.aiah6,
                        type: "aiah6",
                        value: Number(data.aiah6),
                    }
                ],
                [
                    {
                        name: items.aiah7,
                        type: "aiah7",
                        value: Number(data.aiah7),
                    },
                    {
                        name: items.aiah8,
                        type: "aiah8",
                        value: Number(data.aiah8),
                    },
                    {
                        name: items.aiah9,
                        type: "aiah9",
                        value: Number(data.aiah9),
                    }
                ])
            Tablevalue2.push(
                [
                    {
                        name: items.emowsar1,
                        type: "emowsar1",
                        value: Number(data.emowsar1),
                    },
                    {
                        name: items.emowsar2,
                        type: "emowsar2",
                        value: Number(data.emowsar2),
                    },
                    {
                        name: items.emowsar3,
                        type: "emowsar3",
                        value: Number(data.emowsar3),
                    }
                ],
                [
                    {
                        name: items.emowsar4,
                        type: "emowsar4",
                        value: Number(data.emowsar4),
                    },
                    {
                        name: items.emowsar5,
                        type: "emowsar5",
                        value: Number(data.emowsar5),
                    },
                    {
                        name: items.emowsar6,
                        type: "emowsar6",
                        value: Number(data.emowsar6),
                    }
                ],
                [
                    {
                        name: items.emowsar7,
                        type: "emowsar7",
                        value: Number(data.emowsar7),
                    },
                    {
                        name: items.emowsar8,
                        type: "emowsar8",
                        value: Number(data.emowsar8),
                    }, {
                        name: items.emowsar9,
                        type: "emowsar9",
                        value: Number(data.emowsar9),
                    }
                ],
                [
                    {
                        name: items.emowsar10,
                        type: "emowsar10",
                        value: Number(data.emowsar10),
                    },
                    {
                        name: items.emowsar11,
                        type: "emowsar11",
                        value: Number(data.emowsar11),
                    },
                    {
                        name: items.emowsar12,
                        type: "emowsar12",
                        value: Number(data.emowsar12),
                    }
                ],
                [
                    {
                        name: items.emowsar13,
                        type: "emowsar13",
                        value: Number(data.emowsar13),
                    }
                ]);

            Tablevalue3.push(
                [
                    {
                        name: items.leiahti1,
                        type: "leiahti1",
                        value: Number(data.leiahti1),
                    },
                    {
                        name: items.leiahti2,
                        type: "leiahti2",
                        value: Number(data.leiahti2),
                    },
                    {
                        name: items.leiahti3,
                        type: "leiahti3",
                        value: Number(data.leiahti3),
                    }
                ],
                [
                    {
                        name: items.leiahti4,
                        type: "leiahti4",
                        value: Number(data.leiahti4),
                    },
                    {
                        name: items.leiahti5,
                        type: "leiahti5",
                        value: Number(data.leiahti5),
                    },
                    {
                        name: items.leiahti6,
                        type: "leiahti6",
                        value: Number(data.leiahti6),
                    }
                ],
                [
                    {
                        name: items.leiahti7,
                        type: "leiahti7",
                        value: Number(data.leiahti7),
                    }, {
                        name: items.leiahti8,
                        type: "leiahti8",
                        value: Number(data.leiahti8),
                    }, {
                        name: items.leiahti9,
                        type: "leiahti9",
                        value: Number(data.leiahti9),
                    }
                ],
                [
                    {
                        name: items.leiahti10,
                        type: "leiahti10",
                        value: Number(data.leiahti10),
                    }, {
                        name: items.leiahti11,
                        type: "leiahti11",
                        value: Number(data.leiahti11),
                    }, {
                        name: items.leiahti12,
                        type: "leiahti12",
                        value: Number(data.leiahti12),
                    }
                ],
                [
                    {
                        name: items.leiahti13,
                        type: "leiahti13",
                        value: Number(data.leiahti13),
                    }, {
                        name: items.leiahti14,
                        type: "leiahti14",
                        value: Number(data.leiahti14),
                    }, {
                        name: items.leiahti15,
                        type: "leiahti15",
                        value: Number(data.leiahti15),
                    }
                ],
                [
                    {
                        name: items.leiahti16,
                        type: "leiahti16",
                        value: Number(data.leiahti16),
                    },
                    {
                        name: items.leiahti17,
                        type: "leiahti17",
                        value: Number(data.leiahti17),
                    },
                    {
                        name: items.leiahti18,
                        type: "leiahti18",
                        value: Number(data.leiahti18),
                    }
                ]);
            // nsmowaua1-7
            Tablevalue4.push(
                [
                    {
                        name: items.nsmowaua1,
                        type: "nsmowaua1",
                        value: Number(data.nsmowaua1),
                    },
                    {
                        name: items.nsmowaua2,
                        type: "nsmowaua2",
                        value: Number(data.nsmowaua2),
                    },
                    {
                        name: items.nsmowaua3,
                        type: "nsmowaua3",
                        value: Number(data.nsmowaua3),
                    }
                ],
                [
                    {
                        name: items.nsmowaua4,
                        type: "nsmowaua4",
                        value: Number(data.nsmowaua4),
                    },
                    {
                        name: items.nsmowaua5,
                        type: "lnsmowaua5",
                        value: Number(data.nsmowaua5),
                    },
                    {
                        name: items.nsmowaua6,
                        type: "nsmowaua6",
                        value: Number(data.nsmowaua6),
                    }
                ],
                [
                    {
                        name: items.nsmowaua7,
                        type: "nsmowaua7",
                        value: Number(data.nsmowaua7),
                    },])
            // sss1-14
            Tablevalue5.push(
                [
                    {
                        name: items.sss1,
                        type: "sss1",
                        value: Number(data.sss1),
                    },
                    {
                        name: items.sss2,
                        type: "sss2",
                        value: Number(data.sss2),
                    },
                    {
                        name: items.sss3,
                        type: "sss3",
                        value: Number(data.sss3),
                    }
                ],
                [
                    {
                        name: items.sss4,
                        type: "sss4",
                        value: Number(data.sss4),
                    },
                    {
                        name: items.sss5,
                        type: "sss5",
                        value: Number(data.sss5),
                    },
                    {
                        name: items.sss6,
                        type: "sss6",
                        value: Number(data.sss6),
                    }
                ],
                [
                    {
                        name: items.sss7,
                        type: "sss7",
                        value: Number(data.sss7),
                    }, {
                        name: items.sss8,
                        type: "sss8",
                        value: Number(data.sss8),
                    }, {
                        name: items.sss9,
                        type: "sss9",
                        value: Number(data.sss9),
                    }
                ],
                [
                    {
                        name: items.sss10,
                        type: "sss10",
                        value: Number(data.sss10),
                    }, {
                        name: items.sss11,
                        type: "sss11",
                        value: Number(data.sss11),
                    }, {
                        name: items.sss12,
                        type: "sss12",
                        value: Number(data.sss12),
                    }
                ],
                [
                    {
                        name: items.sss13,
                        type: "sss13",
                        value: Number(data.sss13),
                    }, {
                        name: items.sss14,
                        type: "sss14",
                        value: Number(data.sss14),
                    },]
            );
            // todgaam1-8
            Tablevalue6.push(
                [
                    {
                        name: items.todgaam1,
                        type: "todgaam1",
                        value: Number(data.todgaam1),
                    },
                    {
                        name: items.todgaam2,
                        type: "todgaam2",
                        value: Number(data.todgaam2),
                    },
                    {
                        name: items.todgaam3,
                        type: "todgaam3",
                        value: Number(data.todgaam3),
                    }
                ],
                [
                    {
                        name: items.todgaam4,
                        type: "todgaam4",
                        value: Number(data.todgaam4),
                    },
                    {
                        name: items.todgaam5,
                        type: "todgaam5",
                        value: Number(data.todgaam5),
                    },
                    {
                        name: items.todgaam6,
                        type: "todgaam6",
                        value: Number(data.todgaam6),
                    }
                ],
                [
                    {
                        name: items.todgaam7,
                        type: "todgaam7",
                        value: Number(data.todgaam7),
                    }, {
                        name: items.todgaam8,
                        type: "todgaam8",
                        value: Number(data.todgaam8),
                    },
                ]
            )
            self.setState({
                Value: res.data.response.specialTsowst,
                Tablevalue1: Tablevalue1,
                Tablevalue2: Tablevalue2,
                Tablevalue3: Tablevalue3,
                Tablevalue4: Tablevalue4,
                Tablevalue5: Tablevalue5,
                Tablevalue6: Tablevalue6,
            })
        });
    }

    // 选择日期
    SelectChange = (value) => {
        async function wait() {
            self.setState({
                statsticsday: value
            })
        }

        wait().then(function () {
            self.handleClick(localStorage.getItem('ClickMsaId'))
            self.setIfUpload(self.state.statsticsday);
        })
    }

    send = () => {
        $jsonp3(self, api.send, {
            taskId: data.id,
        }).then((res) => {
            message.info("请稍等");
            if (res.message == "ok") {
                message.success("已提醒");
            }
        });
    }

    perviewCharts1(data, recode, index) {
        hashHistory.push({
            pathname: '/main/charts',
            state: {
                taskId: data.id,
                type: self.state.Tablevalue1[recode][index].type,
                typeName: self.state.Tablevalue1[recode][index].name,
                msaId: self.state.msaId,
            }
        })
    }

    perviewCharts2(data, recode, index) {
        hashHistory.push({
            pathname: '/main/charts',
            state: {
                taskId: data.id,
                type: self.state.Tablevalue2[recode][index].type,
                typeName: self.state.Tablevalue2[recode][index].name,
                msaId: self.state.msaId,
            }
        })
    }

    perviewCharts3(data, recode, index) {
        hashHistory.push({
            pathname: '/main/charts',
            state: {
                taskId: data.id,
                type: self.state.Tablevalue3[recode][index].type,
                typeName: self.state.Tablevalue3[recode][index].name,
                msaId: self.state.msaId,
            }
        })
    }

    perviewCharts4(data, recode, index) {
        hashHistory.push({
            pathname: '/main/charts',
            state: {
                taskId: data.id,
                type: self.state.Tablevalue4[recode][index].type,
                typeName: self.state.Tablevalue4[recode][index].name,
                msaId: self.state.msaId,
            }
        })
    }

    perviewCharts5(data, recode, index) {
        hashHistory.push({
            pathname: '/main/charts',
            state: {
                taskId: data.id,
                type: self.state.Tablevalue5[recode][index].type,
                typeName: self.state.Tablevalue5[recode][index].name,
                msaId: self.state.msaId,
            }
        })
    }

    perviewCharts6(data, recode, index) {
        hashHistory.push({
            pathname: '/main/charts',
            state: {
                taskId: data.id,
                type: self.state.Tablevalue6[recode][index].type,
                typeName: self.state.Tablevalue6[recode][index].name,
                msaId: self.state.msaId,
            }
        })
    }

    back() {
        window.history.back();
    }

    render() {
        const renderTreeNodes = data => data.map((item) => {
            if (item.children == null || item.children.length == 0) {
                return <TreeNode title={item.name + item.subTitle} key={item.id + ""} disabled={!item.isUpload} />;
            } else {
                return (
                    <TreeNode title={item.name + item.subTitle} key={item.id + ""} disabled={!item.isUpload}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
        });

        return (
            <div style={{ height: "96.70%" ,overflow:"hidden"}} className={styles2.magin}>
                <Breadcrumb separator=">" style={{ textAlign: "left" }}>
                    <Breadcrumb.Item>数据统计</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="main/allTable">统计报表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>查看</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloat}></div>

                <Row style={{ height: "100%", width: "100%" }}>
                    {/*树状图*/}
                    <Col md={5} sm={8} xs={11} style={{
                        background: '#fff',
                        height: "100%",
                        borderRight: "1px solid #f5f5f5"
                    }} className={publicstyle.relative}>
                        {
                            this.state.tree ?
                                <Tree onSelect={this.handleClick}
                                    defaultSelectedKeys={[this.state.tree[0].id.toString()]}
                                    defaultExpandedKeys={[this.state.tree[0].id.toString()]}>
                                    {renderTreeNodes(this.state.tree)}
                                </Tree> : ""
                        }

                        {/* <Button onClick={this.send.bind(this)} type="danger" style={{
                            position: "absolute",
                            background: "rgba(255,0,0,.7)",
                            color: "#fff",
                            bottom: 50,
                            margin: "0 auto",
                        }}>发送短信 提醒未上报单位</Button> */}

                    </Col>
                    {/*数据*/}
                    <Col md={19} sm={16} xs={13} style={{
                        padding: "0px 10px;",
                        boxSizing: "border-box",
                        borderLeft: "1px solid #f5f5f5",
                        height: "100%",
                        // overflowY: "scroll",
                        overflowY: "auto",
                    }}>
                        <Row>
                            <Col span={23}>
                                <h2 style={{
                                    fontSize: 26,
                                    textAlign: "center",
                                    margin: "65px 0px 20px"
                                }}>{this.state.data.name}</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={16} push={1}>
                                {self.state.phones.show == true ? <div>
                                    <div style={{ display: "inline-block", marginBottom: 10 }}>
                                        填写人&ensp;
                <span className={styles2.bottonBorder}>{self.state.phones.name}</span>
                                    </div>
                                    &ensp;&ensp;
                <div style={{ display: "inline-block", marginBottom: 10 }}>
                                        <img src={phone} />
                                        &ensp;
                <span className={styles2.bottonBorder}>{self.state.phones.phone}</span>
                                    </div>
                                    &ensp;&ensp;
                <div style={{ display: "inline-block", marginBottom: 10 }}>
                                        报出时间&ensp;
                <span className={styles2.bottonBorder}>{self.state.phones.updateTime}</span>
                                    </div>
                                </div> : ""}

                            </Col>
                            <Col offset={1} span={6} style={{ textAlign: "right", }}>
                                <span style={{ margin: "0px 20px" }}>统计日期</span>
                                <Select defaultValue="" style={{ width: 120 }}
                                    onChange={this.SelectChange.bind(this)}>
                                    <Option value="">汇总</Option>
                                    {
                                        this.state.forindate.map((item) => {
                                            return <Option value={item}>{item}</Option>
                                        })
                                    }
                                </Select>
                            </Col>
                            <Col span={22} push={1} pull={1}
                                className={`${publicstyle.border_e6} ${publicstyle.marginT20}  ${publicstyle.fl}`}>
                                {/*一*/}
                                <table cellSpacing={0} cellPadding={0}
                                    className={`${publicstyle.prviewWrapf7}`}>
                                    <thead>
                                        <tr>
                                            <td colSpan={3}>
                                                <h3 className={`${publicstyle.previewTitle} ${publicstyle.paddingLeft37}`}>
                                                    <img src="../../../ico/summary_icon.png" alt=""
                                                        className={publicstyle.previewTitleIcon} />
                                                    <span style={{ float: "left", }}>水上搜救应急管理</span>
                                                </h3>
                                            </td>
                                        </tr>
                                    </thead>
                                    {/*数据*/}
                                    <tbody>
                                        {
                                            self.state.Tablevalue1.map((item, recode) => {
                                                return <tr className={`${publicstyle.trBackground} ${publicstyle.trWidth}`}>
                                                    {
                                                        item.map((it, index) => {
                                                            return <td width={"33%"}
                                                                className={`${publicstyle.paddingLeft37} ${publicstyle.item} ${publicstyle.border_e6}`}
                                                                onClick={this.perviewCharts1.bind(this, data, recode, index)}>
                                                                <span>{it.name}</span>
                                                                <span className={`${publicstyle.fr}`}>
                                                                    <span className={publicstyle.itemNumber}>{it.value}</span>
                                                                    <span className={publicstyle.itemBarWrap} style={{border:"1px dashed #12a"}}>
                                                                        <img src="../../../ico/summary_bar.png" alt=""
                                                                            className={publicstyle.itemBar} style={{display: (self.state.chartImg ? "inline-block" : "none"),}} />
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        })
                                                    }
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </Col>
                            <Col span={22} push={1} pull={1}
                                className={`${publicstyle.border_e6} ${publicstyle.marginT20}  ${publicstyle.fl}`}>
                                {/*二*/}
                                <table cellSpacing={0} cellPadding={0}
                                    className={`${publicstyle.prviewWrap}`}>
                                    <thead>
                                        <tr>
                                            <td colSpan={3}>
                                                <h3 className={`${publicstyle.previewTitle} ${publicstyle.paddingLeft37}`}>
                                                    <img src="../../../ico/summary_icon.png" alt=""
                                                        className={publicstyle.previewTitleIcon} />
                                                    <span style={{ float: "left", }}>事故调查处理</span>
                                                </h3>
                                            </td>
                                        </tr>
                                    </thead>
                                    {/*数据*/}
                                    <tbody>
                                        {
                                            self.state.Tablevalue2.map((item, recode) => {
                                                return <tr className={`${publicstyle.trBackground} ${publicstyle.trWidth}`}>
                                                    {
                                                        item.map((it, index) => {
                                                            return <td width={"33%"}
                                                                className={`${publicstyle.paddingLeft37} ${publicstyle.item} ${publicstyle.border_e6}`}
                                                                onClick={this.perviewCharts2.bind(this, data, recode, index)}>
                                                                <span>{it.name}</span>
                                                                <span className={`${publicstyle.fr}`}>
                                                                    <span className={publicstyle.itemNumber}>{it.value}</span>
                                                                    <span className={publicstyle.itemBarWrap} style={{border:"1px dashed #12a"}}>
                                                                        <img src="../../../ico/summary_bar.png" alt=""
                                                                            className={publicstyle.itemBar} style={{display: (self.state.chartImg ? "inline-block" : "none"),}} />
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        })
                                                    }
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </Col>
                            <Col span={22} push={1} pull={1}
                                className={`${publicstyle.border_e6} ${publicstyle.marginT20}  ${publicstyle.fl}`}>
                                {/*三*/}
                                <table cellSpacing={0} cellPadding={0}
                                    className={`${publicstyle.prviewWrapf7}`}>
                                    <thead>
                                        <tr>
                                            <td colSpan={3}>
                                                <h3 className={`${publicstyle.previewTitle} ${publicstyle.paddingLeft37}`}>
                                                    <img src="../../../ico/summary_icon.png" alt=""
                                                        className={publicstyle.previewTitleIcon} />
                                                    <span style={{ float: "left", }}>执法检查与隐患排查</span>
                                                </h3>
                                            </td>
                                        </tr>
                                    </thead>
                                    {/*数据*/}
                                    <tbody>
                                        {
                                            self.state.Tablevalue3.map((item, recode) => {
                                                return <tr className={`${publicstyle.trBackground} ${publicstyle.trWidth}`}>
                                                    {
                                                        item.map((it, index) => {
                                                            return <td width={"33%"}
                                                                className={`${publicstyle.paddingLeft37} ${publicstyle.item} ${publicstyle.border_e6}`}
                                                                onClick={this.perviewCharts3.bind(this, data, recode, index)}>
                                                                <span>{it.name}</span>
                                                                <span className={`${publicstyle.fr}`}>
                                                                    <span className={publicstyle.itemNumber}>{it.value}</span>
                                                                    <span className={publicstyle.itemBarWrap} style={{border:"1px dashed #12a"}}>
                                                                        <img src="../../../ico/summary_bar.png" alt=""
                                                                            className={publicstyle.itemBar} style={{display: (self.state.chartImg ? "inline-block" : "none"),}} />
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        })
                                                    }
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </Col>
                            <Col span={22} push={1} pull={1}
                                className={`${publicstyle.border_e6} ${publicstyle.marginT20} ${publicstyle.fl}`}>
                                {/*四*/}
                                <table cellSpacing={0} cellPadding={0}
                                    className={`${publicstyle.prviewWrap}`}>
                                    <thead>
                                        <tr>
                                            <td colSpan={3}>
                                                <h3 className={`${publicstyle.previewTitle} ${publicstyle.paddingLeft37}`}>
                                                    <img src="../../../ico/summary_icon.png" alt=""
                                                        className={publicstyle.previewTitleIcon} />
                                                    <span style={{ float: "left", }}>船舶安全监督</span>
                                                </h3>
                                            </td>
                                        </tr>
                                    </thead>
                                    {/*数据*/}
                                    <tbody>
                                        {
                                            self.state.Tablevalue4.map((item, recode) => {
                                                return <tr className={`${publicstyle.trBackground} ${publicstyle.trWidth}`}>
                                                    {
                                                        item.map((it, index) => {
                                                            return <td width={"33%"}
                                                                className={`${publicstyle.paddingLeft37} ${publicstyle.item} ${publicstyle.border_e6}`}
                                                                onClick={this.perviewCharts4.bind(this, data, recode, index)}>
                                                                <span>{it.name}</span>
                                                                <span className={`${publicstyle.fr}`}>
                                                                    <span className={publicstyle.itemNumber}>{it.value}</span>
                                                                    <span className={publicstyle.itemBarWrap} style={{border:"1px dashed #12a"}}>
                                                                        <img src="../../../ico/summary_bar.png" alt=""
                                                                            className={publicstyle.itemBar} style={{display: (self.state.chartImg ? "inline-block" : "none"),}} />
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        })
                                                    }
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </Col>
                            <Col span={22} push={1} pull={1}
                                className={`${publicstyle.border_e6} ${publicstyle.marginT20} ${publicstyle.fl}`}>
                                {/*五*/}
                                <table cellSpacing={0} cellPadding={0}
                                    className={`${publicstyle.prviewWrap}`}>
                                    <thead>
                                        <tr>
                                            <td colSpan={3}>
                                                <h3 className={`${publicstyle.previewTitle} ${publicstyle.paddingLeft37}`}>
                                                    <img src="../../../ico/summary_icon.png" alt=""
                                                        className={publicstyle.previewTitleIcon} />
                                                    <span style={{ float: "left", }}>水上水下活动通航安全管理</span>
                                                </h3>
                                            </td>
                                        </tr>
                                    </thead>
                                    {/*数据*/}
                                    <tbody>
                                        {
                                            self.state.Tablevalue5.map((item, recode) => {
                                                return <tr className={`${publicstyle.trBackground} ${publicstyle.trWidth}`}>
                                                    {
                                                        item.map((it, index) => {
                                                            return <td width={"33%"}
                                                                className={`${publicstyle.paddingLeft37} ${publicstyle.item} ${publicstyle.border_e6}`}
                                                                onClick={this.perviewCharts5.bind(this, data, recode, index)}>
                                                                <span>{it.name}</span>
                                                                <span className={`${publicstyle.fr}`}>
                                                                    <span className={publicstyle.itemNumber}>{it.value}</span>
                                                                    <span className={publicstyle.itemBarWrap} style={{border:"1px dashed #12a"}}>
                                                                        <img src="../../../ico/summary_bar.png" alt=""
                                                                            className={publicstyle.itemBar} style={{display: (self.state.chartImg ? "inline-block" : "none"),}} />
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        })
                                                    }
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </Col>
                            <Col span={22} push={1} pull={1}
                                className={`${publicstyle.border_e6} ${publicstyle.marginT20} ${publicstyle.fl} ${publicstyle.marginB120}`}>
                                {/*六*/}
                                <table cellSpacing={0} cellPadding={0}
                                    className={`${publicstyle.prviewWrap}`}>
                                    <thead>
                                        <tr>
                                            <td colSpan={3}>
                                                <h3 className={`${publicstyle.previewTitle} ${publicstyle.paddingLeft37}`}>
                                                    <img src="../../../ico/summary_icon.png" alt=""
                                                        className={publicstyle.previewTitleIcon} />
                                                    <span style={{ float: "left", }}>危险货物运输、防污染管理</span>
                                                </h3>
                                            </td>
                                        </tr>
                                    </thead>
                                    {/*数据*/}
                                    <tbody>
                                        {
                                            self.state.Tablevalue6.map((item, recode) => {
                                                return <tr className={`${publicstyle.trBackground} ${publicstyle.trWidth}`}>
                                                    {
                                                        item.map((it, index) => {
                                                            return <td width={"33%"}
                                                                className={`${publicstyle.paddingLeft37} ${publicstyle.item} ${publicstyle.border_e6}`}
                                                                onClick={this.perviewCharts6.bind(this, data, recode, index)}>
                                                                <span>{it.name}</span>
                                                                <span className={`${publicstyle.fr}`}>
                                                                    <span className={publicstyle.itemNumber}>{it.value}</span>
                                                                    <span className={publicstyle.itemBarWrap} style={{border:"1px dashed #12a"}}>
                                                                        <img src="../../../ico/summary_bar.png" alt=""
                                                                            className={publicstyle.itemBar} style={{display: (self.state.chartImg ? "inline-block" : "none"),}} />
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        })
                                                    }
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}