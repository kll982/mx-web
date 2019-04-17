import React from 'react';
import moment from "moment";
moment.locale('zh-cn');
import { Pagination, Breadcrumb, Select, Row, Col, Input, Modal, Button, Icon, Table, message, Spin } from 'antd';

import { Link, hashHistory } from 'react-router';

import $jsonp from '../../utils/service';
import $jsonppost from '../../utils/service2.js';
import $jsonp3 from '../../utils/service3';
import api from '../../utils/api';
import styles from './accountapply.less'
import publicstyle from '../../img/public.less'

let self;

export default class customeppqqrlist extends React.Component {
	constructor(props) {
		super(props);
		self = this;
		this.state = {
			loading: false,
			selectApplyStatus: "0",
			current: 1,
			total: 30,
		}
	}
	componentWillMount() {
		self.loadData(1, 10);
	}
	componentDidMount() {

	}
	setApplyStatus = (value) => {
		this.setState({
			selectApplyStatus: value
		})
	}
	queryProfitOfCondition = () => {
		self.loadData(1, 10);
	}
	reset = () => {
		this.setState({
			selectApplyStatus: "0",
		}, () => {
			self.loadData(1, 10);
		});
	}
	loadData = (page, pageSize) => {
		self.setState({
			loading: true
		});
		$jsonp3(self, api.accountApplyList, {
			applyStatus: self.state.selectApplyStatus,
			pageNum: page,
		}).then((res) => {
			console.log(res)
			var currentItemLength = (res.data.response.pageInfo.pageNum - 1) * (res.data.response.pageInfo.pageSize);
			var resda = res.data.response.list;
			console.log("list", resda);
			var resdatashowing = [];
			for (var k0 = 0; k0 < resda.length; k0++) {
				let obj = {};
				for (let p in resda[k0]) {
					obj[p] = resda[k0][p];
				}
				obj.index = currentItemLength + k0;
				obj.key = resda[k0].id;
				resdatashowing.push(obj);
			}

			self.setState({
				data: resdatashowing,
				page: res.data.response.pageInfo,
				current: res.data.response.pageInfo.pageNum,
				totalPage: res.data.response.pageInfo.pages,
			});

			self.setState({
				loading: false
			});
		});

	}
	onPageChange = (page, pageSize) => {
		self.loadData(page, pageSize);
	}
	toFirst = () => {
		self.loadData(1, this.state.page.pageSize)
	}
	toLast = () => {
		self.loadData(this.state.page.pages, this.state.page.pageSize);
	}
	passapply = (record) => {
		Modal.confirm({
			content: `确认通过${record.mobile}账号？`,
			onOk: function () {
				$jsonppost(self, api.accountApplyPass, {
					id: record.id,
				}).then((res) => {
					self.loadData();
					Modal.success({
						content: "已审核通过" + record.mobile + "账号",
						onOk: function () {

						}
					})
				});
			}
		});
	}
	refuseapply = (record) => {
		Modal.confirm({
			content: `确认不通过${record.mobile}账号？`,
			onOk: function () {
				$jsonppost(self, api.accountApplyRefuse, {
					id: record.id,
				}).then((res) => {
					self.loadData();
					Modal.success({
						content: "已审核不通过" + record.mobile + "账号",
						onOk: function () {

						}
					})
				});
			}
		});
	}

	render() {
		const columns = [
			{
				title: '姓名',
				dataIndex: 'nickName',
				key: 'nickName',
				width: "120px",
				className: publicstyle.center,
			},
			{
				title: '手机号',
				dataIndex: 'mobile',
				key: 'mobile',
				width: "150px",
				className: publicstyle.center,
				render: (text, record, index) => {
					return <span>{text}</span>
				},
			},
			{
				title: '所属海事局',
				dataIndex: 'msaName',
				key: 'msaName',
				width: "200px",
				className: publicstyle.center,
				render: (text, record, index) => {
					if (!text) { return <span>-</span> }
					else { return <span>{text}</span> }
				},
			},
			{
				title: '注册时间',
				dataIndex: 'registerTime',
				key: 'registerTime',
				width: "140px",
				className: publicstyle.center,
				render: (text, record, index) => {
					return moment(text).format("YYYY-MM-DD HH:mm")
				},
			},
			{
				title: '操作',
				key: 'action',
				width: "200px",
				className: publicstyle.center,
				render: (text, record, index) => {
					if (record.applyStatus == "0") {
						return <div style={{ textAlign: "center", cursor: "pointer" }}>
							<Button type="primary" style={{ marginRight: 10, marginBottom: 5 }} onClick={this.passapply.bind(this, record)}>通过</Button>
							<Button type="default" style={{ marginBottom: 5 }} onClick={this.refuseapply.bind(this, record)}>不通过</Button>
						</div>
					} else if (record.applyStatus == "1") {
						return <div style={{ textAlign: "center" }}>
						</div>
					} else if (record.applyStatus == "2") {
						return <div style={{ textAlign: "center", cursor: "pointer" }}>
							<Button type="primary" style={{ marginBottom: 5 }} onClick={this.passapply.bind(this, record)}>重新通过</Button>

						</div>
					} else {
						return <div></div>
					}


				},
			}];
		{ }
		return (
			<Spin spinning={this.state.loading}>
				<Breadcrumb separator=">">
					<Breadcrumb.Item>系统管理</Breadcrumb.Item>
					<Breadcrumb.Item>账号审核</Breadcrumb.Item>
				</Breadcrumb>
				<div className={styles.clearfloat}></div>
				<Row className={styles.antrow1}>

					<Col span={8}><span style={{ paddingRight: 10 }}>审核状态</span>
						<Select value={this.state.selectApplyStatus} style={{ width: "50%" }} onChange={this.setApplyStatus}>
							<Select.Option value="0">待审核</Select.Option>
							<Select.Option value="1">审核成功</Select.Option>
							<Select.Option value="2">审核失败</Select.Option>
						</Select>
					</Col>

					<Col span={8}>
						<Button type="primary" onClick={this.queryProfitOfCondition}>查询</Button>
						<Button type="default" style={{ marginLeft: 20 }} onClick={this.reset}>重置</Button>
					</Col>
				</Row>
				{this.state.data && this.state.page ? <div><Table columns={columns} dataSource={this.state.data} bordered={true} pagination={false} style={{ textAlign: "center" }} />
					<Button type="primary" className={styles.pageFirst} style={{ display: this.state.page.pages > 0 ? "block" : "none" }} onClick={this.toFirst}>首页</Button>
					<Pagination className={styles.page} style={{ display: this.state.page.pages > 0 ? "block" : "none" }} onChange={this.onPageChange} showFISRT current={this.state.current} pageSize={this.state.page.pageSize} total={this.state.page.total} />
					<Button type="primary" className={styles.pageLast} style={{ display: this.state.page.pages > 0 ? "block" : "none" }} onClick={this.toLast}>末页</Button></div> : <div></div>}
			</Spin>

		)
	}
}
