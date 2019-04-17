// 录入和编辑 通航安全业务工作量统计表

// 必填项未实现

import React from 'react';
import {Link, hashHistory} from 'react-router';
import {Input, Button, Row, Col, Breadcrumb, message} from 'antd';

import $jsonp from '../../utils/service.js';
import $jsonp3 from "../../utils/service3";
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";
import styles1 from "./addStatisticTask.less";
import publicstyle from "../../img/public.less";
import phone from "../../img/phone.png";
import styles from "../admin/index.less";
import styles2 from "../admin/index.less";

let self, items = {
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

}, forindate = [], data;

export default class SecurityRisk extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        // let items = [
        // 	{id:"column1",title:"投入的值班人员(人次)"},
        // 	{id:"column2",title:"出动海巡艇(艘次）"},
        // 	{id:"column3",title:"出动海巡艇巡航里程(公里）"},
        // 	{id:"column4",title:"渡口渡船渡运旅客(人次)"},
        // 	{id:"column5",title:"水上风景旅游区乘船游客(人次)"},
        // 	{id:"column6",title:"危险货物运输船舶申报（艘次）"},
        // 	{id:"column7",title:"危险货物运输船舶装卸量(吨)"},
        // 	{id:"column8",title:"12395等报警电话接/处警(次)"},
        // 	{id:"column9",title:"辖区发生的小事故(起)"},
        // 	{id:"column10",title:"辖区发生的一般及以上等级事故(起)"}
        // ];
        self.state = {
            value: "",
            emowsar1Value: 0,
            emowsar2Value: 0,
            emowsar3Value: 0,
            emowsar4Value: 0,
            emowsar5Value: 0,
            emowsar6Value: 0,
            emowsar7Value: 0,
            emowsar8Value: 0,
            emowsar9Value: 0,
            emowsar10Value: 0,
            emowsar11Value: 0,
            emowsar12Value: 0,
            emowsar13Value: 0,
            aiah1Value: 0,
            aiah2Value: 0,
            aiah3Value: 0,
            aiah4Value: 0,
            aiah5Value: 0,
            aiah6Value: 0,
            aiah7Value: 0,
            aiah8Value: 0,
            aiah9Value: 0,
            leiahti1Value: 0,
            leiahti2Value: 0,
            leiahti3Value: 0,
            leiahti4Value: 0,
            leiahti5Value: 0,
            leiahti6Value: 0,
            leiahti7Value: 0,
            leiahti8Value: 0,
            leiahti9Value: 0,
            leiahti10Value: 0,
            leiahti11Value: 0,
            leiahti12Value: 0,
            leiahti13Value: 0,
            leiahti14Value: 0,
            leiahti15Value: 0,
            leiahti16Value: 0,
            leiahti17Value: 0,
            leiahti18Value: 0,
            sss1Value: 0,
            sss2Value: 0,
            sss3Value: 0,
            sss4Value: 0,
            sss5Value: 0,
            sss6Value: 0,
            sss7Value: 0,
            sss8Value: 0,
            sss9Value: 0,
            sss10Value: 0,
            sss11Value: 0,
            sss12Value: 0,
            sss13Value: 0,
            sss14Value: 0,
            nsmowaua1Value: 0,
            nsmowaua2Value: 0,
            nsmowaua3Value: 0,
            nsmowaua4Value: 0,
            nsmowaua5Value: 0,
            nsmowaua6Value: 0,
            nsmowaua7Value: 0,
            todgaam1Value: 0,
            todgaam2Value: 0,
            todgaam3Value: 0,
            todgaam4Value: 0,
            todgaam5Value: 0,
            todgaam6Value: 0,
            todgaam7Value: 0,
            todgaam8Value: 0,
            userPhone: {},
            writeDate: {},
            detailId: ""
        }
    }

    // onlunch
    componentWillMount() {
    }

    // onload
    componentDidMount() {
        data = self.props.location.state;
        // self.getinfo(351);
        // 获取登录者手机号和姓名
        self.getPhone();
        self.getDate(data);
    }

    // 获取手机号
    getPhone = () => {
        $jsonp3(self, api.phone, {}).then((res) => {
            self.setState({
                userPhone: res.data.response.statisticListDto
            });
        });
    }
    getDate = (data) => {
        $jsonp3(self, api.InfoGetdelites, {
            id: data.id
        }).then((res) => {
            forindate = res.data.response.statisticListDto.specialStatsticsTaskInfoDetails;
            if (forindate.length != 0) {
                self.setState({
                    writeDate: res.data.response.statisticListDto,
                    detailId: res.data.response.statisticListDto.specialStatsticsTaskInfoDetails[0].id
                })
            } else {
                self.setState({
                    writeDate: res.data.response.statisticListDto,
                })
            }
        });
    }
    tab = (e) => {
        async function wait() {
            self.type = "primary";
            self.setState({
                detailId: e.target.getAttribute("data-id")
            })
        }

        wait().then(() => {
        })
    }
    // 提交
    SecurityRisk = (e) => {
        if (self.state.detailId == "") {
            message.info('请选择上报日期');
            return
        }
        $jsonppost(self, api.SecurityRisk3, {
            detailId: self.state.detailId,
            emowsar1: Number(self.state.emowsar1Value),
            emowsar2: Number(self.state.emowsar2Value),
            emowsar3: Number(self.state.emowsar3Value),
            emowsar4: Number(self.state.emowsar4Value),
            emowsar5: Number(self.state.emowsar5Value),
            emowsar6: Number(self.state.emowsar6Value),
            emowsar7: Number(self.state.emowsar7Value),
            emowsar8: Number(self.state.emowsar8Value),
            emowsar9: Number(self.state.emowsar9Value),
            emowsar10: Number(self.state.emowsar10Value),
            emowsar11: Number(self.state.emowsar11Value),
            emowsar12: Number(self.state.emowsar12Value),
            emowsar13: Number(self.state.emowsar13Value),
            aiah1: Number(self.state.aiah1Value),
            aiah2: Number(self.state.aiah2Value),
            aiah3: Number(self.state.aiah3Value),
            aiah4: Number(self.state.aiah4Value),
            aiah5: Number(self.state.aiah5Value),
            aiah6: Number(self.state.aiah6Value),
            aiah7: Number(self.state.aiah7Value),
            aiah8: Number(self.state.aiah8Value),
            aiah9: Number(self.state.aiah9Value),
            leiahti1: Number(self.state.leiahti1Value),
            leiahti2: Number(self.state.leiahti2Value),
            leiahti3: Number(self.state.leiahti3Value),
            leiahti4: Number(self.state.leiahti4Value),
            leiahti5: Number(self.state.leiahti5Value),
            leiahti6: Number(self.state.leiahti6Value),
            leiahti7: Number(self.state.leiahti7Value),
            leiahti8: Number(self.state.leiahti8Value),
            leiahti9: Number(self.state.leiahti9Value),
            leiahti10: Number(self.state.leiahti10Value),
            leiahti11: Number(self.state.leiahti11Value),
            leiahti12: Number(self.state.leiahti12Value),
            leiahti13: Number(self.state.leiahti13Value),
            leiahti14: Number(self.state.leiahti14Value),
            leiahti15: Number(self.state.leiahti15Value),
            leiahti16: Number(self.state.leiahti16Value),
            leiahti17: Number(self.state.leiahti17Value),
            leiahti18: Number(self.state.leiahti18Value),
            sss1: Number(self.state.sss1Value),
            sss2: Number(self.state.sss2Value),
            sss3: Number(self.state.sss3Value),
            sss4: Number(self.state.sss4Value),
            sss5: Number(self.state.sss5Value),
            sss6: Number(self.state.sss6Value),
            sss7: Number(self.state.sss7Value),
            sss8: Number(self.state.sss8Value),
            sss9: Number(self.state.sss9Value),
            sss10: Number(self.state.sss10Value),
            sss11: Number(self.state.sss11Value),
            sss12: Number(self.state.sss12Value),
            sss13: Number(self.state.sss13Value),
            sss14: Number(self.state.sss14Value),
            nsmowaua1: Number(self.state.nsmowaua1Value),
            nsmowaua2: Number(self.state.nsmowaua2Value),
            nsmowaua3: Number(self.state.nsmowaua3Value),
            nsmowaua4: Number(self.state.nsmowaua4Value),
            nsmowaua5: Number(self.state.nsmowaua5Value),
            nsmowaua6: Number(self.state.nsmowaua6Value),
            nsmowaua7: Number(self.state.nsmowaua7Value),
            todgaam1: Number(self.state.todgaam1Value),
            todgaam2: Number(self.state.todgaam2Value),
            todgaam3: Number(self.state.todgaam3Value),
            todgaam4: Number(self.state.todgaam4Value),
            todgaam5: Number(self.state.todgaam5Value),
            todgaam6: Number(self.state.todgaam6Value),
            todgaam7: Number(self.state.todgaam7Value),
            todgaam8: Number(self.state.todgaam8Value),
        }).then((res) => {
            if (res.message == "ok") {
                message.success("已上报")
                // 跳转路由
                // hashHistory.push({
                // 	pathname: 'main/SecurityRisk3',
                // 	state: {
                // 		current: ""
                // 	}
                // })
            } else {
                message.info('请重试');
            }
        });

    }
    onEmowsar1Change = (e) => {
        async function wait() {
            self.setState({
                emowsar1Value: Number(e.target.value)
            })
        }

        wait().then();
    }

    onEmowsar2Change = (e) => {
        async function wait() {
            self.setState({
                emowsar2Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onEmowsar3Change = (e) => {
        async function wait() {
            self.setState({
                emowsar3Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onEmowsar4Change = (e) => {
        async function wait() {
            self.setState({
                emowsar4Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onEmowsar5Change = (e) => {
        async function wait() {
            self.setState({
                emowsar5Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onEmowsar6Change = (e) => {
        async function wait() {
            self.setState({
                emowsar6Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onEmowsar7Change = (e) => {
        async function wait() {
            self.setState({
                emowsar7Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onEmowsar8Change = (e) => {
        async function wait() {
            self.setState({
                emowsar8Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onEmowsar9Change = (e) => {
        async function wait() {
            self.setState({
                emowsar9Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onEmowsar10Change = (e) => {
        async function wait() {
            self.setState({
                emowsar10Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onEmowsar11Change = (e) => {
        async function wait() {
            self.setState({
                emowsar11Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onEmowsar12Change = (e) => {
        async function wait() {
            self.setState({
                emowsar12Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onEmowsar13Change = (e) => {
        async function wait() {
            self.setState({
                emowsar13Value: Number(e.target.value)
            })
        }

        wait().then();
    }

    // 第二单元
    onAiah1Change = (e) => {
        async function wait() {
            self.setState({
                aiah1Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onAiah2Change = (e) => {
        async function wait() {
            self.setState({
                aiah2Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onAiah3Change = (e) => {
        async function wait() {
            self.setState({
                aiah3Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onAiah4Change = (e) => {
        async function wait() {
            self.setState({
                aiah4Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onAiah5Change = (e) => {
        async function wait() {
            self.setState({
                aiah5Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onAiah6Change = (e) => {
        async function wait() {
            self.setState({
                aiah6Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onAiah7Change = (e) => {
        async function wait() {
            self.setState({
                aiah7Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onAiah8Change = (e) => {
        async function wait() {
            self.setState({
                aiah8Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onAiah9Change = (e) => {
        async function wait() {
            self.setState({
                aiah9Value: Number(e.target.value)
            })
        }

        wait().then();
    }

    // 第三单元
    onLeiahti1Change = (e) => {
        async function wait() {
            self.setState({
                leiahti1Value: Number(e.target.value)
            })
        }

        wait().then();
    }

    onLeiahti2Change = (e) => {
        async function wait() {
            self.setState({
                leiahti2Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti3Change = (e) => {
        async function wait() {
            self.setState({
                leiahti3Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti4Change = (e) => {
        async function wait() {
            self.setState({
                leiahti4Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti5Change = (e) => {
        async function wait() {
            self.setState({
                leiahti5Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti6Change = (e) => {
        async function wait() {
            self.setState({
                leiahti6Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti7Change = (e) => {
        async function wait() {
            self.setState({
                leiahti7Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti8Change = (e) => {
        async function wait() {
            self.setState({
                leiahti8Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti9Change = (e) => {
        async function wait() {
            self.setState({
                leiahti9Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti10Change = (e) => {
        async function wait() {
            self.setState({
                leiahti10Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti11Change = (e) => {
        async function wait() {
            self.setState({
                leiahti11Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti12Change = (e) => {
        async function wait() {
            self.setState({
                leiahti12Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti13Change = (e) => {
        async function wait() {
            self.setState({
                leiahti13Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti14Change = (e) => {
        async function wait() {
            self.setState({
                leiahti14Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti15Change = (e) => {
        async function wait() {
            self.setState({
                leiahti15Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti16Change = (e) => {
        async function wait() {
            self.setState({
                leiahti16Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti17Change = (e) => {
        async function wait() {
            self.setState({
                leiahti17Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onLeiahti18Change = (e) => {
        async function wait() {
            self.setState({
                leiahti18Value: Number(e.target.value)
            })
        }

        wait().then();
    }

    // 第四单元
    onSss1Change = (e) => {
        async function wait() {
            self.setState({
                sss1Value: Number(e.target.value)
            })
        }

        wait().then();
    }

    onSss2Change = (e) => {
        async function wait() {
            self.setState({
                sss2Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onSss3Change = (e) => {
        async function wait() {
            self.setState({
                sss3Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onSss4Change = (e) => {
        async function wait() {
            self.setState({
                sss4Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onSss5Change = (e) => {
        async function wait() {
            self.setState({
                sss5Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onSss6Change = (e) => {
        async function wait() {
            self.setState({
                sss6Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onSss7Change = (e) => {
        async function wait() {
            self.setState({
                sss7Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onSss8Change = (e) => {
        async function wait() {
            self.setState({
                sss8Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onSss9Change = (e) => {
        async function wait() {
            self.setState({
                sss9Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onSss10Change = (e) => {
        async function wait() {
            self.setState({
                sss10Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onSss11Change = (e) => {
        async function wait() {
            self.setState({
                sss11Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onSss12Change = (e) => {
        async function wait() {
            self.setState({
                sss12Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onSss13Change = (e) => {
        async function wait() {
            self.setState({
                sss13Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onSss14Change = (e) => {
        async function wait() {
            self.setState({
                sss14Value: Number(e.target.value)
            })
        }

        wait().then();
    }

    // 第五单元
    onNsmowaua1Change = (e) => {
        async function wait() {
            self.setState({
                nsmowaua1Value: Number(e.target.value)
            })
        }

        wait().then();
    }

    onNsmowaua2Change = (e) => {
        async function wait() {
            self.setState({
                nsmowaua2Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onNsmowaua3Change = (e) => {
        async function wait() {
            self.setState({
                nsmowaua3Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onNsmowaua4Change = (e) => {
        async function wait() {
            self.setState({
                nsmowaua4Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onNsmowaua5Change = (e) => {
        async function wait() {
            self.setState({
                nsmowaua5Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onNsmowaua6Change = (e) => {
        async function wait() {
            self.setState({
                nsmowaua6Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onNsmowaua7Change = (e) => {
        async function wait() {
            self.setState({
                nsmowaua7Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    // 第六单元
    onTodgaam1Change = (e) => {
        async function wait() {
            self.setState({
                todgaam1Value: Number(e.target.value)
            })
        }

        wait().then();
    }

    onTodgaam2Change = (e) => {
        async function wait() {
            self.setState({
                todgaam2Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onTodgaam3Change = (e) => {
        async function wait() {
            self.setState({
                todgaam3Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onTodgaam4Change = (e) => {
        async function wait() {
            self.setState({
                todgaam4Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onTodgaam5Change = (e) => {
        async function wait() {
            self.setState({
                todgaam5Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onTodgaam6Change = (e) => {
        async function wait() {
            self.setState({
                todgaam6Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onTodgaam7Change = (e) => {
        async function wait() {
            self.setState({
                todgaam7Value: Number(e.target.value)
            })
        }

        wait().then();
    }
    onTodgaam8Change = (e) => {
        async function wait() {
            self.setState({
                todgaam8Value: Number(e.target.value)
            })
        }

        wait().then();
    }

    back() {
        window.history.back();
    }

    render() {
        return (
            <div className={styles2.magin}>
                <Breadcrumb separator=">" style={{textAlign: "left"}}>
                    <Breadcrumb.Item>专项统计</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="main/fillStatictisTaskList">填写报表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>填写</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloat}></div>
                <h2 style={{textAlign: "center", margin: "20px auto"}}>{self.state.writeDate.statisticsTitle}</h2>
                <Row type="flex" justify="space-between">
                    <Col span={8} offset={1}>
                        <span style={{display: "inline-block"}}>
                            填写人
                            &ensp;
                            <Button>{self.state.userPhone.userName}</Button>
                        </span>

                        &ensp;&ensp;
                        <span style={{display: "inline-block"}}>
							<img src={phone}/>
                            &ensp;
                            <Button>{self.state.userPhone.mobile}</Button>
						</span>

                    </Col>
                    <Col span={14} offset={1} style={{textAlign: "right"}}>
                        <span>选择日期</span>
                        {
                            forindate.map((item) => {
                                // if (self.state.writeDate.templateCode == "103") {
                                    return <Button style={{margin: "5px 10px"}} data-id={item.id} key={item.id}
                                                   onClick={self.tab}>{item.statisticsDate.split("-").splice(1, 1) + "月"}</Button>
                                // } else if (self.state.writeDate.templateCode == "101") {
                                //     return <Button style={{margin: "5px 10px"}} data-id={item.id} key={item.id}
                                //                    onClick={self.tab}>{item.statisticsDate.split("-").splice(1, 2).join("月") + "日"}</Button>
                                // }
                            })
                        }
                    </Col>
                </Row>
                <h3 style={{
                    background: "#108fe9",
                    color: "#fff",
                    textAlign: "center",
                    padding: "10px",
                    margin: "20px"
                }}>水上搜救应急管理</h3>
                <Row style={{margin: "30px"}}>
                    {/*{ items.map(function (item) {*/}
                    {/*return <Col span={8} key={item.id}>*/}
                    {/*<laber style={{position:"relative",width:"100%"}}>*/}
                    {/*<span style={{position:"absolute",left:"12%",top:"1%",zIndex:1}}>{item.id}</span>*/}
                    {/*<Input size="large" style={{paddingLeft:"65%",margin:"3% 10%",width:"80%",boxSizing:"border-box"}} placeholder="0" onChange={self.onChange}  data-id={item.id}/>*/}
                    {/*</laber>*/}
                    {/*</Col>*/}
                    {/*})}*/}
                    {/*投入的值班人员(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.emowsar1}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onEmowsar1Change} data-id={items.emowsar1} required/>
                            </laber>
                        </Col>
                    }
                    {/*出动海巡艇(艘次）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.emowsar2}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onEmowsar2Change} data-id={items.emowsar2}/>
                            </laber>
                        </Col>
                    }

                    {/*出动海巡艇巡航里程(公里）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.emowsar3}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onEmowsar3Change} data-id={items.emowsar3}/>
                            </laber>
                        </Col>
                    }

                    {/*渡口渡船渡运旅客(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.emowsar4}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onEmowsar4Change} data-id={items.emowsar4}/>
                            </laber>
                        </Col>
                    }

                    {/*水上风景旅游区乘船游客(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.emowsar5}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onEmowsar5Change} data-id={items.emowsar5}/>
                            </laber>
                        </Col>
                    }

                    {/*危险货物运输船舶申报（艘次）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.emowsar6}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onEmowsar6Change} data-id={items.emowsar6}/>
                            </laber>
                        </Col>
                    }

                    {/*危险货物运输船舶装卸量(吨)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.emowsar7}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onEmowsar7Change} data-id={items.emowsar7}/>
                            </laber>
                        </Col>
                    }

                    {/*12395等报警电话接/处警(次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.emowsar8}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onEmowsar8Change} data-id={items.emowsar8}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的小事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.emowsar9}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onEmowsar9Change} data-id={items.emowsar9}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的一般及以上等级事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.emowsar10}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onEmowsar10Change} data-id={items.emowsar10}/>
                            </laber>
                        </Col>
                    }

                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.emowsar11}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onEmowsar11Change} data-id={items.emowsar11}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的小事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.emowsar12}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onEmowsar12Change} data-id={items.emowsar12}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的一般及以上等级事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.emowsar13}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onEmowsar13Change} data-id={items.emowsar13}/>
                            </laber>
                        </Col>
                    }
                </Row>

                {/*第二单元*/}
                <h3 style={{background: "#108fe9", color: "#fff", textAlign: "center", padding: "10px"}}>事故调查处理</h3>
                <Row style={{margin: "30px"}}>
                    {/*{ items.map(function (item) {*/}
                    {/*return <Col span={8} key={item.id}>*/}
                    {/*<laber style={{position:"relative",width:"100%"}}>*/}
                    {/*<span style={{position:"absolute",left:"12%",top:"1%",zIndex:1}}>{items.id}</span>*/}
                    {/*<Input size="large" style={{paddingLeft:"65%",margin:"3% 10%",width:"80%",boxSizing:"border-box"}} placeholder="0" onChange={self.onChange}  data-id={items.id}/>*/}
                    {/*</laber>*/}
                    {/*</Col>*/}
                    {/*})}*/}

                    {/*投入的值班人员(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.aiah1}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onAiah1Change} data-id={items.aiah1} required/>
                            </laber>
                        </Col>
                    }
                    {/*出动海巡艇(艘次）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.aiah2}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onAiah2Change} data-id={items.aiah2}/>
                            </laber>
                        </Col>
                    }

                    {/*出动海巡艇巡航里程(公里）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.aiah3}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onAiah3Change} data-id={items.aiah3}/>
                            </laber>
                        </Col>
                    }

                    {/*渡口渡船渡运旅客(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.aiah4}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onAiah4Change} data-id={items.aiah4}/>
                            </laber>
                        </Col>
                    }

                    {/*水上风景旅游区乘船游客(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.aiah5}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onAiah5Change} data-id={items.aiah5}/>
                            </laber>
                        </Col>
                    }

                    {/*危险货物运输船舶申报（艘次）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.aiah6}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onAiah6Change} data-id={items.aiah6}/>
                            </laber>
                        </Col>
                    }

                    {/*危险货物运输船舶装卸量(吨)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.aiah7}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onAiah7Change} data-id={items.aiah7}/>
                            </laber>
                        </Col>
                    }

                    {/*12395等报警电话接/处警(次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.aiah8}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onAiah8Change} data-id={items.aiah8}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的小事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.aiah9}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onAiah9Change} data-id={items.aiah9}/>
                            </laber>
                        </Col>
                    }

                </Row>

                {/*第三单元*/}
                <h3 style={{background: "#108fe9", color: "#fff", textAlign: "center", padding: "10px"}}>执法检查与隐患排查</h3>
                <Row style={{margin: "30px"}}>
                    {/*{ items.map(function (item) {*/}
                    {/*return <Col span={8} key={item.id}>*/}
                    {/*<laber style={{position:"relative",width:"100%"}}>*/}
                    {/*<span style={{position:"absolute",left:"12%",top:"1%",zIndex:1}}>{items.id}</span>*/}
                    {/*<Input size="large" style={{paddingLeft:"65%",margin:"3% 10%",width:"80%",boxSizing:"border-box"}} placeholder="0" onChange={self.onChange}  data-id={items.id}/>*/}
                    {/*</laber>*/}
                    {/*</Col>*/}
                    {/*})}*/}

                    {/*投入的值班人员(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti1}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti1Change} data-id={items.leiahti1} required/>
                            </laber>
                        </Col>
                    }
                    {/*出动海巡艇(艘次）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti2}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti2Change} data-id={items.leiahti2}/>
                            </laber>
                        </Col>
                    }

                    {/*出动海巡艇巡航里程(公里）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti3}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti3Change} data-id={items.leiahti3}/>
                            </laber>
                        </Col>
                    }

                    {/*渡口渡船渡运旅客(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti4}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti4Change} data-id={items.leiahti4}/>
                            </laber>
                        </Col>
                    }

                    {/*水上风景旅游区乘船游客(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti5}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti5Change} data-id={items.leiahti5}/>
                            </laber>
                        </Col>
                    }

                    {/*危险货物运输船舶申报（艘次）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti6}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti6Change} data-id={items.leiahti6}/>
                            </laber>
                        </Col>
                    }

                    {/*危险货物运输船舶装卸量(吨)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti7}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti7Change} data-id={items.leiahti7}/>
                            </laber>
                        </Col>
                    }

                    {/*12395等报警电话接/处警(次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti8}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti8Change} data-id={items.leiahti8}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的小事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti9}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti9Change} data-id={items.leiahti9}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的一般及以上等级事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti10}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti10Change} data-id={items.leiahti10}/>
                            </laber>
                        </Col>
                    }

                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti11}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti11Change} data-id={items.leiahti11}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的小事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti12}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti12Change} data-id={items.leiahti12}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的一般及以上等级事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti13}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti13Change} data-id={items.leiahti13}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的一般及以上等级事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti14}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti14Change} data-id={items.leiahti14}/>
                            </laber>
                        </Col>
                    }
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti15}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti15Change} data-id={items.leiahti15}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的小事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti16}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti16Change} data-id={items.leiahti16}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的一般及以上等级事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti17}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti17Change} data-id={items.leiahti17}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的一般及以上等级事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.leiahti18}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onLeiahti18Change} data-id={items.leiahti18}/>
                            </laber>
                        </Col>
                    }
                </Row>

                {/*第四单元*/}
                <h3 style={{background: "#108fe9", color: "#fff", textAlign: "center", padding: "10px"}}>船舶安全监督</h3>
                <Row style={{margin: "30px"}}>
                    {/*{ items.map(function (item) {*/}
                    {/*return <Col span={8} key={item.id}>*/}
                    {/*<laber style={{position:"relative",width:"100%"}}>*/}
                    {/*<span style={{position:"absolute",left:"12%",top:"1%",zIndex:1}}>{items.id}</span>*/}
                    {/*<Input size="large" style={{paddingLeft:"65%",margin:"3% 10%",width:"80%",boxSizing:"border-box"}} placeholder="0" onChange={self.onChange}  data-id={items.id}/>*/}
                    {/*</laber>*/}
                    {/*</Col>*/}
                    {/*})}*/}

                    {/*投入的值班人员(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.sss1}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onSss1Change} data-id={items.sss1} required/>
                            </laber>
                        </Col>
                    }
                    {/*出动海巡艇(艘次）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.sss2}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onSss2Change} data-id={items.sss2}/>
                            </laber>
                        </Col>
                    }

                    {/*出动海巡艇巡航里程(公里）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.sss3}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onSss3Change} data-id={items.sss3}/>
                            </laber>
                        </Col>
                    }

                    {/*渡口渡船渡运旅客(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.sss4}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onSss4Change} data-id={items.sss4}/>
                            </laber>
                        </Col>
                    }

                    {/*水上风景旅游区乘船游客(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.sss5}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onSss5Change} data-id={items.sss5}/>
                            </laber>
                        </Col>
                    }

                    {/*危险货物运输船舶申报（艘次）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.sss6}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onSss6Change} data-id={items.sss6}/>
                            </laber>
                        </Col>
                    }

                    {/*危险货物运输船舶装卸量(吨)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.sss7}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onSss7Change} data-id={items.sss7}/>
                            </laber>
                        </Col>
                    }

                    {/*12395等报警电话接/处警(次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.sss8}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onSss8Change} data-id={items.sss8}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的小事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.sss9}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onSss9Change} data-id={items.sss9}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的一般及以上等级事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.sss10}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onSss10Change} data-id={items.sss10}/>
                            </laber>
                        </Col>
                    }

                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.sss11}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onSss11Change} data-id={items.sss11}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的小事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.sss12}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onSss12Change} data-id={items.sss12}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的一般及以上等级事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.sss13}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onSss13Change} data-id={items.sss13}/>
                            </laber>
                        </Col>
                    }

                    {/*辖区发生的一般及以上等级事故(起)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.sss14}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onSss14Change} data-id={items.sss14}/>
                            </laber>
                        </Col>
                    }
                </Row>

                {/*第五单元*/}
                <h3 style={{
                    background: "#108fe9",
                    color: "#fff",
                    textAlign: "center",
                    padding: "10px"
                }}>水上水下活动通航安全管理</h3>
                <Row style={{margin: "30px"}}>
                    {/*{ items.map(function (item) {*/}
                    {/*return <Col span={8} key={item.id}>*/}
                    {/*<laber style={{position:"relative",width:"100%"}}>*/}
                    {/*<span style={{position:"absolute",left:"12%",top:"1%",zIndex:1}}>{items.id}</span>*/}
                    {/*<Input size="large" style={{paddingLeft:"65%",margin:"3% 10%",width:"80%",boxSizing:"border-box"}} placeholder="0" onChange={self.onChange}  data-id={items.id}/>*/}
                    {/*</laber>*/}
                    {/*</Col>*/}
                    {/*})}*/}

                    {/*投入的值班人员(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.nsmowaua1}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onNsmowaua1Change} data-id={items.nsmowaua1}
                                       required/>
                            </laber>
                        </Col>
                    }
                    {/*出动海巡艇(艘次）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.nsmowaua2}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onNsmowaua2Change} data-id={items.nsmowaua2}/>
                            </laber>
                        </Col>
                    }

                    {/*出动海巡艇巡航里程(公里）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.nsmowaua3}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onNsmowaua3Change} data-id={items.nsmowaua3}/>
                            </laber>
                        </Col>
                    }

                    {/*渡口渡船渡运旅客(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.nsmowaua4}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onNsmowaua4Change} data-id={items.nsmowaua4}/>
                            </laber>
                        </Col>
                    }

                    {/*水上风景旅游区乘船游客(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.nsmowaua5}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onNsmowaua5Change} data-id={items.nsmowaua5}/>
                            </laber>
                        </Col>
                    }

                    {/*危险货物运输船舶申报（艘次）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.nsmowaua6}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onNsmowaua6Change} data-id={items.nsmowaua6}/>
                            </laber>
                        </Col>
                    }

                    {/*危险货物运输船舶装卸量(吨)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.nsmowaua7}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onNsmowaua7Change} data-id={items.nsmowaua7}/>
                            </laber>
                        </Col>
                    }

                </Row>

                {/*第六单元*/}
                <h3 style={{
                    background: "#108fe9",
                    color: "#fff",
                    textAlign: "center",
                    padding: "10px"
                }}>危险货物运输、防污染管理</h3>
                <Row style={{margin: "30px"}}>
                    {/*{ items.map(function (item) {*/}
                    {/*return <Col span={8} key={item.id}>*/}
                    {/*<laber style={{position:"relative",width:"100%"}}>*/}
                    {/*<span style={{position:"absolute",left:"12%",top:"1%",zIndex:1}}>{items.id}</span>*/}
                    {/*<Input size="large" style={{paddingLeft:"65%",margin:"3% 10%",width:"80%",boxSizing:"border-box"}} placeholder="0" onChange={self.onChange}  data-id={items.id}/>*/}
                    {/*</laber>*/}
                    {/*</Col>*/}
                    {/*})}*/}

                    {/*投入的值班人员(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.todgaam1}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onTodgaam1Change} data-id={items.todgaam1} required/>
                            </laber>
                        </Col>
                    }
                    {/*出动海巡艇(艘次）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.todgaam2}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onTodgaam2Change} data-id={items.todgaam2}/>
                            </laber>
                        </Col>
                    }

                    {/*出动海巡艇巡航里程(公里）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.todgaam3}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onTodgaam3Change} data-id={items.todgaam3}/>
                            </laber>
                        </Col>
                    }

                    {/*渡口渡船渡运旅客(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.todgaam4}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onTodgaam4Change} data-id={items.todgaam4}/>
                            </laber>
                        </Col>
                    }

                    {/*水上风景旅游区乘船游客(人次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.todgaam5}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onTodgaam5Change} data-id={items.todgaam5}/>
                            </laber>
                        </Col>
                    }

                    {/*危险货物运输船舶申报（艘次）*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.todgaam6}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onTodgaam6Change} data-id={items.todgaam6}/>
                            </laber>
                        </Col>
                    }

                    {/*危险货物运输船舶装卸量(吨)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.todgaam7}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onTodgaam7Change} data-id={items.todgaam7}/>
                            </laber>
                        </Col>
                    }

                    {/*12395等报警电话接/处警(次)*/}
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    color: "red",
                                    paddingRight: "13%",
                                    left: "7%",
                                    top: "1%"
                                }}>*</span>
                                <span style={{
                                    position: "absolute",
                                    left: "12%",
                                    top: "1%",
                                    zIndex: 1
                                }}>{items.todgaam8}</span>
                                <Input size="large" style={{
                                    paddingLeft: "65%",
                                    margin: "3% 10%",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }} placeholder="0" onChange={self.onTodgaam8Change} data-id={items.todgaam8}/>
                            </laber>
                        </Col>
                    }
                    <Col span={4} offset={10} style={{marginTop: "5%"}}>
                        <Button style={{color: "#fff", width: "100%", height: "40px"}} onClick={self.SecurityRisk}
                                type="primary">上报</Button>
                    </Col>
                </Row>

            </div>
        )
    }
}


// onChange={self.onChange.bind(this)}  data-id={items.column1}