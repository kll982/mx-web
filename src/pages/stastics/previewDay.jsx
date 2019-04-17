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
	column1:"投入的值班人员(人次)",
	column2:"出动海巡艇(艘次）",
	column3:"出动海巡艇巡航里程(公里）",
	column4:"渡口渡船渡运旅客(人次)",
	column5:"水上风景旅游区乘船游客(人次)",
	column6:"危险货物运输船舶申报（艘次）",
	column7:"危险货物运输船舶装卸量(吨)",
	column8:"12395等报警电话接/处警(次)",
	column9:"辖区发生的小事故(起)",
	column10:"辖区发生的一般及以上等级事故(起)"
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
                forindate : res.data.response.statsticsday
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
	        return <Button style={{margin:"5px 10px"}} data-id={item} key={item} onClick={self.tab}>{item.split("-").splice(1,2).join("月")+"日"}</Button>


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
                        <Col span={23} offset={1} style={{textAlign:"right",paddingRight:"3%"}}>
                        <span>统计日期</span>
                            {
                                 this.state.forindate?renderDate(this.state.forindate):'22332'
                              }
                            
                            <Button style={{margin:"5px 10px"}} data-id={null} key={null} onClick={self.tab}>汇总</Button>
                        </Col>
                    </Row>
                    <h3 style={{background:"#108fe9",color:"#fff",textAlign:"center",padding:"10px",margin:"30px auto"}}>统计项目</h3>
                    <Row>
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.column1}</span>
                                <Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
                            </laber>
                        </Col>
                    }
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.column2}</span>
                                <Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
                            </laber>
                        </Col>
                    }
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.column3}</span>
                                <Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
                            </laber>
                        </Col>
                    }
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.column4}</span>
                                <Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
                            </laber>
                        </Col>
                    }
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.column5}</span>
                                <Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
                            </laber>
                        </Col>
                    }
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.column6}</span>
                                <Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
                            </laber>
                        </Col>
                    }
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.column7}</span>
                                <Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
                            </laber>
                        </Col>
                    }
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.column8}</span>
                                <Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
                            </laber>
                        </Col>
                    }
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.column9}</span>
                                <Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
                            </laber>
                        </Col>
                    }
                    {
                        <Col span={8}>
                            <laber style={{position: "relative", width: "100%"}}>
                                <span style={{position: "absolute",left: "12%", top: "1%",zIndex: 1}}>{items.column10}</span>
                                <Input size="large" style={{paddingLeft: "65%", margin: "3% 10%",width: "80%",boxSizing: "border-box"}} disabled/>
                            </laber>
                        </Col>
                    }
                    </Row>
            </div>
        )
    }
}