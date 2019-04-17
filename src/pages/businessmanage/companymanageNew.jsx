import React from 'react';
import moment from "moment";
moment.locale('zh-cn');
import { Link, hashHistory } from 'react-router';
import { Pagination, Breadcrumb, Row, Col, Input, Select, Button, Tag, Table, Spin, Icon, TreeSelect, Modal } from 'antd';
import Singlepersonselect from '../../components/singlepersonselect1.jsx'
const Option = Select.Option;
import $jsonp from '../../utils/service.js'
import $jsonp3 from '../../utils/service3.js'
import api from '../../utils/api.js'
import publicstyle from '../../img/public.less'
import styles from './companymanageNew.less'
import beard from '../../img/Breadcrumbsymbol.jpg'
import stylez from '../../container/index.less';

import companypng from "../../img/company.png"
import departmentpng from "../../img/department.png"
import emppng from "../../img/emp.png"
import styles1 from "../../components/common.less"

let self;

function e2(arr, items, key) {
	if (items.children && items.children.length > 0) {
		items.children.map((itemss, indexss) => {
			if (itemss.id == key) {
				arr.push(itemss);
			}
			e2(arr, itemss, key);
		})
	}
}

function e1(arr, key, departsArr) {
	departsArr.map((item, index) => {
		if (item.id == key) {
			arr.push(item);
		}
		e2(arr, item, key);
	})
}

function fetchNodeType(nodeType, nodeName) {
	var returnDiv = "";
	if (nodeType == 1) {
		returnDiv = <div><img src={companypng} className={styles1.qicon} />{nodeName}</div>
	}
	else if (nodeType == 2) {
		returnDiv = <div><img src={departmentpng} className={styles1.qicon} />{nodeName}</div>
	}
	else if (nodeType == 3) {
		returnDiv = <div><img src={emppng} className={styles1.qicon} />{nodeName}</div>
	}
	return returnDiv
}

const loop = data => data.map((item) => {
	if (item.children && item.children.length) {
		var ptitle = "";
		ptitle = fetchNodeType(item.nodeType, item.name)

		return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id} value={item.id.toString()}>{loop(item.children)}</TreeSelect.TreeNode>;
	}
	var ptitle = "";
	ptitle = fetchNodeType(item.nodeType, item.name)
	return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id} value={item.id.toString()} />;
	// isLeaf={item.isLeaf}
});



export default class Employeemanage extends React.Component {
	constructor(props) {
		super(props);
		self = this;
		this.state = {
			current: 1,
			total: 30,
			accountname: "",
			name: "",
			departmentId: "",
			departmentCode: "",
			roleId: "",
			jobStatus: "",
			loading: true,
			options1: [],
			role: [],
			department: [],

			roleIdText: "",
			departmentIdText: [],
			treedata2: [],
			selectType: "",

			AllCheckType: [],
		}
	}
	componentWillMount() {
		this.fetchDepartment1();
		this.fetchDepartment();
		this.getAllCheckType();
		if (self.props.location.state && self.props.location.state.current) {
			var quer = self.props.location.state;
			this.setState({
				current: quer.current,
				name: quer.name,
				departmentId: quer.departmentId,
				departmentCode: quer.departmentCode,
			}, () => {
				self.loadData(quer.current - 0, 10)
			});

		} else {

		}



	}
	componentDidMount() {

	}
	// 获取检查对象
	getAllCheckType() {
		console.log("getAllCheckType")
		$jsonp3(self, api.listAllCheckSort, {}).then((res) => {
			console.log(res.data.response);
			self.state.AllCheckType = res.data.response.list
		})
	}
	reset = () => {
		this.setState({
			accountname: "",
			name: "",
			departmentId: "",
			departmentCode: "",
			departmentIdText: [],
			selectType: "",

		}, () => self.loadData(1, 10));

	}

	fetchDepartment() {
		if (self.props.location.state && self.props.location.state.departmentId) {
			$jsonp(self, api.getAllCompanyDepartmentTreeInUse, {}).then((res) => {
				var list = res.data.response.companyDepartmentList;
				var arr1 = [];
				e1(arr1, self.props.location.state.departmentId, list);
				if (!arr1) { }
				else {
					var departmentIdText1 = fetchNodeType(arr1[0].nodeType, arr1[0].name)
					this.setState({
						departmentIdText: departmentIdText1
					});
				}
			});
		}
	}
	fetchDepartment1() {
		$jsonp3(self, api.commonFilterData, {}).then((res) => {
			var list = [];
			var post1 = res.data.response.msaInfo;

			if (post1.nodeType == "3") {
				post1.isLeaf = true
			} else {
				post1.isLeaf = false
			}
			list[0] = post1;

			if (self.props.location.state && self.props.location.state.current) {
			} else {
				var departmentIdText1 = fetchNodeType(post1.nodeType, post1.name)
				this.setState({
					departmentIdText: departmentIdText1,
					departmentId: post1.id,
					departmentCode: post1.code
				}, () => {
					this.loadData(1, 10);
				});
			}
			this.setState({
				department: list,
				msaInitInfo: post1,
				treedata2: list
			}, () => {
			});
		});
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
				}, () => {
				});

				resolve();

			});

		});

	}

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


	setCompanyname = (e) => {
		var value = e.target.value;
		if (value.length > 50) {
			return
		}
		this.setState({
			name: value
		})
	}
	setType = (value) => {
		this.setState({
			selectType: value
		})
	}
	trim = (str) => { //删除左右两端的空格
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	queryProfitOfCondition = () => {
		self.loadData(1, 10);
	}

	loadData = (page, pageSize) => {
		self.setState({
			loading: true
		});
		var self1 = self;
		$jsonp(self, api.getCompanyInfoByPage, {
			pageNo: page,
			pageSize: pageSize,
			name: self.trim(self.state.name),
			departmentId: self.state.departmentId,
			code: self.state.departmentCode,
			type: self.state.selectType,
		}).then((res) => {

			var currentItemLength = (res.data.response.page.pageNum - 1) * (res.data.response.page.pageSize);
			var resda = res.data.response.companyInfoList;
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
				page: res.data.response.page,
				current: res.data.response.page.pageNum,
				totalPage: res.data.response.page.pages,
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
	edit = (addoredit, record) => {
		if (addoredit == "edit") {
			sessionStorage.setItem("staffmanage", JSON.stringify(record));
		}

		hashHistory.push({
			pathname: '/main/addcompany',
			state: {
				top: addoredit,
				current: self.state.current,
				account: self.state.accountname,
				name: self.state.name,
				departmentId: self.state.departmentId,
				departmentCode: self.state.departmentCode,

			}
		})


	}

	stop = (record, argu) => {
		var statusargu;
		if (argu == 1) { statusargu = "启用" + record.name }
		else if (argu == 0) { statusargu = "停用" + record.name }
		Modal.confirm({
			content: `确定${statusargu}？`,
			onOk: function () {
				$jsonp(self, api.companyEnableOrDisable, {
					id: record.id,
					status: argu,
				}).then((res) => {
					self.loadData(self.state.current - 0, 10);
				});
			}
		});

	}
	render() {
		const columns = [{
			title: '企业编号',
			dataIndex: 'index',
			key: 'index',
			width: "79px",
			className: publicstyle.center,
			render: (text) => { return <span>{text + 1}</span> }
		},
		{
			title: '企业名称',
			dataIndex: 'name',
			key: 'name',
			className: publicstyle.center,
		},
		{
			title: '所属海事局',
			dataIndex: 'msaName',
			key: 'msaName',
			className: publicstyle.center,
			render: (text, record, index) => {
				if (!text) { return <span>-</span> }
				else { return <span>{text}</span> }
			},
		},
		{
			title: '游览经营单位',
			dataIndex: 'unit',
			key: 'unit',
			width: "90px",
			className: publicstyle.center,
			render: (text, record, index) => {
				if (record.type == "1") { return <span>-</span> }
				else {
					if (!text) { return <span>-</span> }
					else { return <span>{text}</span> }
				}
			},
		},
		{
			title: '运营人',
			dataIndex: 'operator',
			key: 'operator',
			width: "90px",
			className: publicstyle.center,
			render: text => {
				if (!text) { return <span>-</span> }
				else { return <span>{text}</span> }
			},
		},
		{
			title: '运营人手机号',
			dataIndex: 'operatorPhone',
			key: 'operatorPhone',
			width: "90px",
			className: publicstyle.center,
			render: text => {
				if (!text) { return <span>-</span> }
				else { return <span>{text}</span> }
			},
		},
		{
			title: '所在乡镇',
			dataIndex: 'town',
			key: 'town',
			width: "100px",
			className: publicstyle.center,
			render: (text, record, index) => {
				if (record.type == "2") { return <span>-</span> }
				else {
					if (!text) { return <span>-</span> }
					else { return <span>{text}</span> }
				}
			},
		},
		{
			title: '乡镇负责人',
			dataIndex: 'townManager',
			key: 'townManager',
			className: publicstyle.center,
			render: (text, record, index) => {
				if (record.type == "2") { return <span>-</span> }
				else {
					if (!text) { return <span>-</span> }
					else { return <span>{text}</span> }
				}

			},
		},
		{
			title: '乡镇负责人手机号',
			dataIndex: 'townManagerPhone',
			key: 'townManagerPhone',
			width: "90px",
			className: publicstyle.center,
			render: (text, record, index) => {
				if (record.type == "2") { return <span>-</span> }
				else {
					if (!text) { return <span>-</span> }
					else { return <span>{text}</span> }
				}
			},
		},
		{
			title: '是否通航',
			dataIndex: 'navigableWaterStatus',
			key: 'navigableWaterStatus',
			className: publicstyle.center,
			width: "90px",
			render: (text, record, index) => {
				if (record.type == "1") { return <span>-</span> }
				else {
					if (text == "1") {
						return "通航水域"
					} else {
						return "非通航水域"
					}
				}
			},
		},
		{
			title: '游览经营项目备案时间',
			dataIndex: 'recordTime',
			key: 'recordTime',
			width: "90px",
			className: publicstyle.center,
			render: (text, record, index) => {
				if (record.type == "1") { return <span>-</span> }
				else {
					if (!text) { return <span>-</span> }
					else {
						return moment(text).format('YYYY-MM-DD')
					}
				}
			},
		}, {
			title: '类型',
			dataIndex: 'type',
			key: 'type',
			width: "75px",
			className: publicstyle.center,
			render: (text) => {
				if (text == 1) { return <div>渡口渡船</div> }
				else if (text == 2) { return <div>游览经营</div> }
			}
		}, {
			title: '企业状态',
			dataIndex: 'status',
			key: 'status',
			width: "75px",
			className: publicstyle.center,
			render: (text) => {
				if (text == 0) { return <div><Tag color="red">无效</Tag></div> }
				else if (text == 1) { return <div><Tag color="blue">有效</Tag></div> }

			}
		}, {
			title: '操作',
			key: 'action',
			width: "170px",
			className: publicstyle.center,
			render: (text, record, index) => {
				if (record.status == "1") {
					return <div style={{ textAlign: "center", cursor: "pointer" }}>
						<Button type="primary" style={{ marginRight: 10, marginBottom: 5 }} onClick={this.edit.bind(this, "edit", record)}>编辑</Button>
						<Button type="danger" onClick={this.stop.bind(this, record, 0)}>停用</Button>
					</div>
				}
				else if (record.status == "0") {
					return <div style={{ textAlign: "center", cursor: "pointer" }}>
						<Button type="primary" style={{ marginRight: 10, marginBottom: 5 }} onClick={this.edit.bind(this, "edit", record)}>编辑</Button>
						<Button type="primary" onClick={this.stop.bind(this, record, 1)}>启用</Button>
					</div>
				}

			},
		}];

		{ }
		return (
			<div className={stylez.wrapPadding}>
				<Spin spinning={this.state.loading}>
					<Breadcrumb separator=">">
						<Breadcrumb.Item>系统管理</Breadcrumb.Item>
						<Breadcrumb.Item>检查对象管理</Breadcrumb.Item>

					</Breadcrumb>
					<div className={publicstyle.clearfloat}></div>


					<Row className={styles.antrow1}>
						<Col>
							<Button type="primary" className={publicstyle.button} onClick={this.edit.bind(this, "add")}><Icon type="plus" />新增企业</Button>
						</Col>
					</Row>
					<Row className={styles.antrow1}>
						<Col span={6}><span style={{ paddingRight: 10 }}>企业名称:</span>
							<Input type="text" style={{ width: "60%" }} onChange={this.setCompanyname} value={this.state.name} />
						</Col>
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
						<Col span={5}><span style={{ paddingRight: 10 }}>企业类型:</span>
							<Select value={this.state.selectType} style={{ width: "50%" }} onChange={this.setType}>
								<Option value="">全部</Option>
								{/* {
								this.state.AllCheckType.map((item)=>{
									return <Option value={item.id+""} key={item.id+""} >{item.sort}</Option>
								})
							} */}
								<Option value="1">渡口渡船</Option>
								<Option value="2">游览经营</Option>
							</Select>
						</Col>
						<Col span={5}>
							<Button type="primary" className={publicstyle.button} onClick={this.queryProfitOfCondition}>查询</Button>
							<Button type="default" className={publicstyle.cancelbutton} style={{ marginLeft: "20px" }} onClick={this.reset}>重置</Button>
						</Col>
					</Row>

					{this.state.data && this.state.page ? <div><Table columns={columns} dataSource={this.state.data} bordered={true} pagination={false} style={{ textAlign: "center" }} />
						<Button type="primary" className={styles.pageFirst} style={{ display: this.state.page.pages > 0 ? "block" : "none" }} onClick={this.toFirst}>首页</Button>
						<Pagination className={styles.page} style={{ display: this.state.page.pages > 0 ? "block" : "none" }} onChange={this.onPageChange} showFISRT current={this.state.current} pageSize={this.state.page.pageSize} total={this.state.page.total} />
						<Button type="primary" className={styles.pageLast} style={{ display: this.state.page.pages > 0 ? "block" : "none" }} onClick={this.toLast}>末页</Button></div> : <div></div>}

				</Spin>
			</div>
		)
	}
}