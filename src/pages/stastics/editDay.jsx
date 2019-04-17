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
import companypng from "../../img/company.png";
import departmentpng from "../../img/department.png";
import emppng from "../../img/emp.png";
import phone from "../../img/phone.png";
let self, data, rootSubmenuKeys, NoneLength, items = {
	column1: "投入的值班人员(人次)",
	column2: "出动海巡艇(艘次）",
	column3: "出动海巡艇巡航里程(公里）",
	column4: "渡口渡船渡运旅客(人次)",
	column5: "水上风景旅游区乘船游客(人次)",
	column6: "危险货物运输船舶申报（艘次）",
	column7: "危险货物运输船舶装卸量(吨)",
	column8: "12395等报警电话接/处警(次)",
	column9: "辖区发生的小事故(起)",
	column10: "辖区发生的一般及以上等级事故(起)"
}, forindate = [];

const TreeNode = Tree.TreeNode, Option = Select.Option, { Header, Content, Footer, Sider } = Layout;

export default class all extends React.Component {
	constructor(props) {
		super(props);
		self = this;
		rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
	}
	state = {
		openKeys: ['sub1'],
		noneLength: 0,
		Value: {},
		statsticsday: null,
		peo: "none",
		writepeo: {},
		valueColumn: [],
		change: true,
	};

	// onlunch
	componentWillMount() {
		data = JSON.parse(self.props.location.state.data);
		forindate = data.tableInfo;
		self.handleClick(data);
	}

	// onload
	componentDidMount() {
	}
	// 选择单位
	handleClick = (data) => {
		self.setState({
			Value: ""
		})
		var valueColumn = [];
		$jsonp3(self, api.getStatistics, {
			msaId: data.msaId,
			taskId: data.taskId,
			statisticsDate: self.state.statsticsday
		}).then((res) => {
			var value = res.data.response.specialStowtss;

			valueColumn.push({
				title: items.column1,
				value: value.column1,
				sign: "column1",
			},
				{
					title: items.column2,
					value: value.column2,
					sign: "column2",
				},
				{
					title: items.column3,
					value: value.column3,
					sign: "column3",
				},
				{
					title: items.column4,
					value: value.column4,
					sign: "column4",
				},
				{
					title: items.column5,
					value: value.column5,
					sign: "column5",
				}, {
					title: items.column6,
					value: value.column6,
					sign: "column6",
				}, {
					title: items.column7,
					value: value.column7,
					sign: "column7",
				}, {
					title: items.column8,
					value: value.column8,
					sign: "column8",
				}, {
					title: items.column9,
					value: value.column9,
					sign: "column9",
				}, {
					title: items.column10,
					value: value.column10,
					sign: "column10",
				})


			self.setState({
				Value: res.data.response.specialStowtss,
				writepeo: res.data.response,
				valueColumn: valueColumn,
			})

		});
	}

	// 选择日期
	SelectChange = (value) => {
		var detailId = value.split("+")[0];
		var statsticsday = value.split("+")[1];
		async function wait() {
			self.setState({
				statsticsday: value.split("+")[1]
			})
		}
		wait().then(function () {
			if (detailId == "null") {
				self.setState({
					peo: "none"
				})
			} else {
				self.setState({
					peo: "block"
				});
			}
			self.handleClick(data);
		})
	}
	input = (event) => {
		self.setState({
			change: false,
		});
		var aa = event.target.getAttribute("data-index");
		console.log(aa, event.target.getAttribute("data-title"), event.target.getAttribute("data-sign"), event.target.value);
	}

	render() {
		const column = (data) => (data).map((item, index) => {
			return <Col span={8}>
				<laber style={{ position: "relative", width: "100%" }}>
					<span style={{ position: "absolute", left: "12%", top: "1%", zIndex: 1 }}>{item.title}</span>
					<Input size="large" style={{ paddingLeft: "65%", margin: "3% 10%", width: "80%", boxSizing: "border-box", textAlign: "right", }} data-sign={item.sign} data-title={item.title} data-index={index} defaultValue={item.value} placeholder={item.value} onInput={this.input} />
				</laber>
			</Col>

		});
		return (
			<div style={{ height: "100%" }}>
				<Breadcrumb separator=">" style={{ textAlign: "left" }}>
					<Breadcrumb.Item>专项统计</Breadcrumb.Item>
					<Breadcrumb.Item><Link to="main/sendTable">已上报报表</Link></Breadcrumb.Item>
					<Breadcrumb.Item>查看</Breadcrumb.Item>
				</Breadcrumb>
				<div className={publicstyle.clearfloat}></div>
				<Row type="flex" justify="space-between" style={{}}>
					<Col span={24}>
						<h2 style={{ textAlign: "center", margin: "20px 0px 30px" }}>{data.name}</h2>
					</Col>
					<Col span={6} offset={2} style={{ padding: '5px 10px', textAlign: "left", fontSize: "16px", lineHeight: "1.5" }}>
						<div style={{ display: self.state.peo }}>
							<span style={{ float: "left", margin: "0px 5px" }}>填写人</span>
							&ensp;
									<Button style={{ float: "left", margin: "0px 10px 0px 5px" }}>{self.state.writepeo.name}</Button>
							&ensp;&ensp;
									<img src={phone} style={{ float: "left", margin: "5px 5px" }} />
							&ensp;
									<Button style={{ float: "left", margin: "0px 10px 0px 5px" }}>{self.state.writepeo.phone}</Button>
						</div>
					</Col>
					<Col span={8} pull={1} offset={1} style={{ padding: '10px', textAlign: "right" }}>
						<span style={{ margin: "0px 20px" }}>统计日期</span>
						<Select defaultValue={null + "+" + null} style={{ width: 120 }} onChange={self.SelectChange}>
							<Option value={null + "+" + null}>汇总</Option>
							{
								forindate.map((item) => {
									return <Option value={item.id + "+" + item.statisticsDate}>{item.statisticsDate.split("-").splice(1, 2).join("月") + "日"}</Option>
								})
							}
						</Select>
					</Col>
				</Row>
				<h3 style={{ background: "#108fe9", color: "#fff", textAlign: "center", padding: "10px", margin: "30px auto" }}>统计项目</h3>
				<Row>
					{column(self.state.valueColumn)}

					{/* {
						<Col span={8}>
							<laber style={{ position: "relative", width: "100%" }}>
								<span style={{ position: "absolute", left: "12%", top: "1%", zIndex: 1 }}>{items.column1}</span>
								<span style={{ position: "absolute", right: "12%", top: "3%", zIndex: 1 }}>{self.state.Value.column1}</span>
								<Input size="large" style={{ paddingLeft: "65%", margin: "3% 10%", width: "80%", boxSizing: "border-box" }} disabled />
							</laber>
						</Col>
					}
					{
						<Col span={8}>
							<laber style={{ position: "relative", width: "100%" }}>
								<span style={{ position: "absolute", left: "12%", top: "1%", zIndex: 1 }}>{items.column2}</span>
								<span style={{ position: "absolute", left: "65%", top: "3%", zIndex: 1 }}>{self.state.Value.column2}</span>
								<Input size="large" style={{ paddingLeft: "65%", margin: "3% 10%", width: "80%", boxSizing: "border-box" }} disabled />
							</laber>
						</Col>
					}
					{
						<Col span={8}>
							<laber style={{ position: "relative", width: "100%" }}>
								<span style={{ position: "absolute", left: "12%", top: "1%", zIndex: 1 }}>{items.column3}</span>
								<span style={{ position: "absolute", left: "65%", top: "3%", zIndex: 1 }}>{self.state.Value.column3}</span>
								<Input size="large" style={{ paddingLeft: "65%", margin: "3% 10%", width: "80%", boxSizing: "border-box" }} disabled />
							</laber>
						</Col>
					}
					{
						<Col span={8}>
							<laber style={{ position: "relative", width: "100%" }}>
								<span style={{ position: "absolute", left: "12%", top: "1%", zIndex: 1 }}>{items.column4}</span>
								<span style={{ position: "absolute", left: "65%", top: "3%", zIndex: 1 }}>{self.state.Value.column4}</span>
								<Input size="large" style={{ paddingLeft: "65%", margin: "3% 10%", width: "80%", boxSizing: "border-box" }} disabled />
							</laber>
						</Col>
					}
					{
						<Col span={8}>
							<laber style={{ position: "relative", width: "100%" }}>
								<span style={{ position: "absolute", left: "12%", top: "1%", zIndex: 1 }}>{items.column5}</span>
								<span style={{ position: "absolute", left: "65%", top: "3%", zIndex: 1 }}>{self.state.Value.column5}</span>
								<Input size="large" style={{ paddingLeft: "65%", margin: "3% 10%", width: "80%", boxSizing: "border-box" }} disabled />
							</laber>
						</Col>
					}
					{
						<Col span={8}>
							<laber style={{ position: "relative", width: "100%" }}>
								<span style={{ position: "absolute", left: "12%", top: "1%", zIndex: 1 }}>{items.column6}</span>
								<span style={{ position: "absolute", left: "65%", top: "3%", zIndex: 1 }}>{self.state.Value.column6}</span>
								<Input size="large" style={{ paddingLeft: "65%", margin: "3% 10%", width: "80%", boxSizing: "border-box" }} disabled />
							</laber>
						</Col>
					}
					{
						<Col span={8}>
							<laber style={{ position: "relative", width: "100%" }}>
								<span style={{ position: "absolute", left: "12%", top: "1%", zIndex: 1 }}>{items.column7}</span>
								<span style={{ position: "absolute", left: "65%", top: "3%", zIndex: 1 }}>{self.state.Value.column7}</span>
								<Input size="large" style={{ paddingLeft: "65%", margin: "3% 10%", width: "80%", boxSizing: "border-box" }} disabled />
							</laber>
						</Col>
					}
					{
						<Col span={8}>
							<laber style={{ position: "relative", width: "100%" }}>
								<span style={{ position: "absolute", left: "12%", top: "1%", zIndex: 1 }}>{items.column8}</span>
								<span style={{ position: "absolute", left: "65%", top: "3%", zIndex: 1 }}>{self.state.Value.column8}</span>
								<Input size="large" style={{ paddingLeft: "65%", margin: "3% 10%", width: "80%", boxSizing: "border-box" }} disabled />
							</laber>
						</Col>
					}
					{
						<Col span={8}>
							<laber style={{ position: "relative", width: "100%" }}>
								<span style={{ position: "absolute", left: "12%", top: "1%", zIndex: 1 }}>{items.column9}</span>
								<span style={{ position: "absolute", left: "65%", top: "3%", zIndex: 1 }}>{self.state.Value.column9}</span>
								<Input size="large" style={{ paddingLeft: "65%", margin: "3% 10%", width: "80%", boxSizing: "border-box" }} disabled />
							</laber>
						</Col>
					}
					{
						<Col span={8}>
							<laber style={{ position: "relative", width: "100%" }}>
								<span style={{ position: "absolute", left: "12%", top: "1%", zIndex: 1 }}>{items.column10}</span>
								<span style={{ position: "absolute", left: "65%", top: "3%", zIndex: 1 }}>{self.state.Value.column10}</span>
								<Input size="large" style={{ paddingLeft: "65%", margin: "3% 10%", width: "80%", boxSizing: "border-box" }} disabled />
							</laber>
						</Col>
					} */}
				</Row>
				<Row>
					<Col span={4} offset={10} style={{ marginTop: "5%" }}>
						<Button style={{ width: "100%", height: "40px" }} type="primary" disabled={self.state.change}>保存更改</Button>
					</Col>
				</Row>
			</div>
		)
	}
}