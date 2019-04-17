// 汇总页
import React from 'react';
import {Link, hashHistory} from 'react-router';
import {Input, Button, Row, Col, Breadcrumb ,message, Menu, Icon, Layout , Select } from 'antd';

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";
import publicstyle from "../../img/public.less";

let self,data,rootSubmenuKeys,NoneLength ,items={
	emowsar1:"接处警（起）",
	emowsar2:"救助人员（人次）",
	emowsar3:"救助遇险船舶（艘次）",
	emowsar4:"挽回损失（万元）",
	emowsar5:"处置险情",
	emowsar6:"死亡",
	emowsar7:"沉船",
	emowsar8:"排除险情（起）",
	emowsar9:"其中航道堵塞",
	emowsar10:"清除碍航物",
	emowsar11:"出动人力（人次）",
	emowsar12:"出动艇力（艘次）",
	emowsar13:"协调社会力量（人次）",
	aiah1:"事故起数",
	aiah2:"一般等级以上事故起数",
	aiah3:"小事故起数",
	aiah4:"伤亡人数",
	aiah5:"沉船艘数",
	aiah6:"直接经济损失（万元）",
	aiah7:"立案调查起数",
	aiah8:"受理调解起数",
	aiah9:"危化品、客渡船事故起数",
    leiahti1:"执法检查次数",
    leiahti2:"出动人次",
    leiahti3:"出动车艇",
    leiahti4:"聘请专家人次",
    leiahti5:"检查企业数",
    leiahti6:"检查船舶数",
    leiahti7:"隐患数量",
    leiahti8:"立即整改",
    leiahti9:"限期整改",
    leiahti10:"追究违法责任",
    leiahti11:"采取强制措施",
    leiahti12:"挂牌督办",
    leiahti13:"下达整改通知书",
    leiahti14:"发执法抄送函",
    leiahti15:"责令停止作业",
    leiahti16:"查处违章船舶数",
    leiahti17:"行政处罚次数",
    leiahti18:"罚没金额（万元）",
    sss1:"船舶报告数（艘次）",
    sss2:"其中：危险货物船舶数（艘次）",
    sss3:"船舶货物量（万吨）",
    sss4:"其中：危险货物量（万吨）",
    sss5:"船舶现场监督（艘次）",
    sss6:"发现违法行为（起）",
    sss7:"启动安全检查（次）",
    sss8:"船旗国监督检查（艘次）",
    sss9:"其中危化品船舶",
    sss10:"其中客渡船",
    sss11:"查出缺陷数（项）",
    sss12:"滞留船舶（艘）",
    sss13:"发出船舶安全检查信息通报表（份）",
    sss14:"其中危化品船舶",
    nsmowaua1:"核发水工许可（件）",
    nsmowaua2:"发布航行通告、警告（份）",
    nsmowaua3:"水上群体性文娱体育活动（次）",
    nsmowaua4:"已核发许可在建工程（项）",
    nsmowaua5:"交通管制（天）",
    nsmowaua6:"出动人员（人次）",
    nsmowaua7:"动用艇力（艘次）",
    todgaam1:"载运危险货物船舶适装申报艘次",
    todgaam2:"其中现场核查艘次",
    todgaam3:"危险货物吞吐量（万吨）",
    todgaam4:"防污检查艘次",
    todgaam5:"固废检查艘次",
    todgaam6:"接收船舶垃圾（吨）",
    todgaam7:"生活污水装置检查（艘）",
    todgaam8:"处罚起数",
}

const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;

export default class all extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    }
    state = {
        openKeys: ['sub1'],
        noneLength:0,
        Value:{},
        statsticsday:null,
    };

    // submenu keys of first level
    // onlunch
	componentWillMount(){
	}

	// onload
	componentDidMount(){
		data = self.props.location.state;
		self.getDate(data);
	}
     getDate=(data)=>{
        $jsonp3(self,api.listStatsticsdayByTaskId,{
            taskId:data.id
        }).then((res) => {
            self.setState({
                forindate:res.data.response.statsticsday
            });
        });
    }
    
        tab=(e)=>{
            self.type="primary";
            self.setState({
                selectId:e.target.getAttribute("data-id")
            })
          
        }

    render() {
	    const renderDate=dates=>dates.map((item)=>{
	        return <Button style={{margin:"5px 10px"}} data-id={item} key={item} onClick={self.tab}>{item.split("-").splice(1,1)+"月"}</Button>


        });
		return (
            <div style={{height:"100%"}}>
                <Breadcrumb separator=">" style={{ textAlign: "left" }}>
					<Breadcrumb.Item><Link to="main/statictisTask">报表管理</Link></Breadcrumb.Item>
					<Breadcrumb.Item>查看</Breadcrumb.Item>
				</Breadcrumb>
				<div className={publicstyle.clearfloat}></div>
                        <Row>
                        	<Col span={24}>
                        		<h1 style={{textAlign:"center",margin:"20px 0px 30px"}}>{self.props.location.state.name}</h1>
							</Col>
							<Col span={23} offset={1}  style={{textAlign:"right",paddingRight:"3%"}}>
                        <span>统计日期</span>
                            {
                                 this.state.forindate?renderDate(this.state.forindate):'22332'
                            }
                            <Button style={{margin:"5px 10px"}} data-id={null} key={null} onClick={self.tab}>汇总</Button>
                        </Col>
						</Row>

                {/*第一单元*/}
                        <h3 style={{background:"#108fe9",color:"#fff",textAlign:"center",padding:"10px",margin:"30px auto"}}>水上搜救应急管理</h3>
                        <Row>
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.emowsar1}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.emowsar2}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.emowsar3}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.emowsar4}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.emowsar5}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.emowsar6}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.emowsar7}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.emowsar8}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.emowsar9}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.emowsar10}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.emowsar11}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.emowsar12}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.emowsar13}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						</Row>
                {/*第二单元*/}
                         <h3 style={{background:"#108fe9",color:"#fff",textAlign:"center",padding:"10px",margin:"30px auto"}}>事故调查处理</h3>
                        <Row>
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.aiah1}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.aiah2}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.aiah3}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.aiah4}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.aiah5}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.aiah6}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.aiah7}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.aiah8}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.aiah9}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						</Row>
                {/*第三单元*/}
                        <h3 style={{background:"#108fe9",color:"#fff",textAlign:"center",padding:"10px",margin:"30px auto"}}>执法检查与隐患排查</h3>
                        <Row>
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti1}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti2}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti3}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti4}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti5}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti6}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti7}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti8}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti9}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti10}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti11}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti12}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti13}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti14}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti15}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti16}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti17}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.leiahti18}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						</Row>
                {/*第四单元*/}
                        <h3 style={{background:"#108fe9",color:"#fff",textAlign:"center",padding:"10px",margin:"30px auto"}}>船舶安全监督</h3>
                        <Row>
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.sss1}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.sss2}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.sss3}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.sss4}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.sss5}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.sss6}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.sss7}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.sss8}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.sss9}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.sss10}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.sss11}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.sss12}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.sss13}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.sss14}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						</Row>
                 {/*第五单元*/}
                        <h3 style={{background:"#108fe9",color:"#fff",textAlign:"center",padding:"10px",margin:"30px auto"}}>水上水下活动通航安全管理</h3>
                        <Row>
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.nsmowaua1}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.nsmowaua2}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.nsmowaua3}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.nsmowaua4}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.nsmowaua5}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.nsmowaua6}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.nsmowaua7}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						</Row>
                {/*第六单元*/}
                        <h3 style={{background:"#108fe9",color:"#fff",textAlign:"center",padding:"10px",margin:"30px auto"}}>危险货物运输、防污染管理</h3>
                        <Row>
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.todgaam1}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.todgaam2}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.todgaam3}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.todgaam4}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.todgaam5}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.todgaam6}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.todgaam7}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						{
							<Col span={8}>
								<laber style={{position: "relative", width: "100%"}}>
									<span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.todgaam8}</span>
									<Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
								</laber>
							</Col>
						}
						</Row>
            </div>
        )
    }
}