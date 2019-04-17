import React from 'react';
import moment from "moment";
moment.locale('zh-cn');
import { hashHistory } from 'react-router';
import {
	Breadcrumb,
	Row,
	Col,
	Form,
	Input,
	Select,
	Button,
	message,
	Modal,
	Table,
	Icon,
	Tag,
	Spin,
	Tree
} from "antd";
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;

import beard from '../../img/Breadcrumbsymbol.jpg'
import publicstyle from '../../img/public.less'
import styles from './departmentsetNew.less'
import $jsonp from '../../utils/service.js'
import api from '../../utils/api.js'
import stylez from '../../container/index.less';

import companypng from "../../img/company.png"
import departmentpng from "../../img/department.png"
import emppng from "../../img/emp.png"

const TreeNode = Tree.TreeNode;

let self;
let arr4 = [];
var arr5 = {};
var ticketTextarr = ["全部", "正常", "停用"];
var ticketTypearr = ["1", "2", "3"];
var dutyIsZhuguanTextarr = ["是", "否"];
var dutyIsZhuguanTypearr = ["1", "0"];


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

function e2(arr, items, key) {
	if (items.children && items.children.length > 0) {
		items.children.map((itemss, indexss) => {
			if (itemss.id == key) {
				arr.push(items);
			}
			e2(arr, itemss, key);
		})
	}
}

function e3(arr, key, departsArr) {
	departsArr.map((item, index) => {
		if (item.id == key) {
			arr.push(item);
		}
		e2(arr, item, key);
	})
}

function findCompanyLoop(arr, items, key, departsArr) {
	if (items.children && items.children.length > 0) {
		items.children.map((itemss, indexss) => {
			if (itemss.id == key) {
				if (itemss.nodeType == 1) {
					arr.push(itemss);
				}
				else {
					//	findCompany(arr,key,departsArr)
					findCompanyLoop(arr, itemss, key, departsArr);
				}
			}
			findCompanyLoop(arr, itemss, key, departsArr);
		})
	}
}

function findCompany(arr, key, departsArr) {
	departsArr.map((item, index) => {
		arr.push(item);
		if (item.id == key) {

		}
		findCompanyLoop(arr, item, key, departsArr);
	})
}




class departmentset extends React.Component {
	constructor(props) {
		super(props);
		self = this;
		this.state = {
			departmentVisible: false,
			companyVisible: false,
			dutyVisible: false,
			rankVisible: false,
			nodeTypeText: "company",
			loading: false,
			buttondisabled: false,
			value: undefined,
			erandom: 0.5,
			addHighDeprtment: "",
			addLowDeprtment: "",
			addaddress: "",
			addDescription: "",
			stopArr: {},
			departArr: "",
			startdepart: "停用市海事局",
			selectType: "",
			ticketType: "",
			selectedKeys: [],
			columns: [],
		}

	}
	componentWillMount() {
		self.setState({
			loading: true,
		})
		$jsonp(self, api.getAllCompanyDepartmentTree, {}).then((res) => {
			this.setState({
				departArr: res.data.response.MsaInfoList,
				loading: false,
			});
			if (!res.data.response.MsaInfoList[0].children) {
				return
			}
			var ee = JSON.stringify(res.data.response.MsaInfoList[0]);
			var ee1 = JSON.parse(ee);
			if (ee1) {
				ee1.children = "";
				ee1.key = 1;
				var data = [ee1];
			} else {
				var data = [];
			}
			this.setState({
				tableParent: res.data.response.MsaInfoList[0].id
			})
			console.log("data",data)
			this.setState({
				data,
				selectedKeys: [res.data.response.MsaInfoList[0].id.toString()],
				startdepart: res.data.response.MsaInfoList[0].status == 0 ? "启用市海事局" : "停用市海事局"
			});
			self.setColumns1();



		}).catch((err) => {
			this.setState({
				loading: false,
			})
		});

	}

	showTree1() {
		self.setState({
			loading: true,
		})
		$jsonp(self, api.getAllCompanyDepartmentTree, {}).then((res) => {
			this.setState({
				departArr: res.data.response.MsaInfoList,
				loading: false,
			});
			var arr1 = [];
			e1(arr1, this.state.selectedKeys[0], res.data.response.MsaInfoList);
			if (!arr1[0].children) {
				var data = [];
			} else {
				var ee = JSON.stringify(arr1[0]);
				var ee1 = JSON.parse(ee);

				ee1.children = "";
				ee1.key = 1;


				if (self.state.saveaddOredit == "editDuty") {
					var shift1 = self.state.arr1Show;
					var arr7 = [];
					e3(arr7, shift1[0].id, this.state.departArr);
					if (arr7[0].nodeType == 1) {
						var upperCompany = arr7[0].name;
						var upperDepart = ""
					} else {
						var arr9 = [];
						var e11 = findCompany(arr9, arr7[0].parId, this.state.departArr, arr7[0]);
						var upperCompany = arr9[arr9.length - 1].name;
						var upperDepart = arr7[0].name
					}

					ee1.parCompanyName = upperCompany;
					ee1.parDepartmentName = upperDepart;
				}
				var data = [ee1];
			}

			this.setState({
				data: data,
			})

		}).catch((err) => {
			this.setState({
				loading: false,
			})
		});



	}
	componentDidMount() {

	}


	onSelect = (selectedKeys, info) => {
		if (selectedKeys.length == 0) {
			this.setState({
				buttondisabled: true
			})
			this.setState({
				data: []
			})
			var nodeTypeText = "";
			if (this.state.nodeTypeText == "company") { self.setColumns1(); }
			else if (this.state.nodeTypeText == "department") { self.setColumns1(); }
			else if (this.state.nodeTypeText == "duty") { self.setColumns2(); }
			else if (this.state.nodeTypeText == "rank") { self.setColumns3(); }
			return
		}
		else {
			this.setState({
				buttondisabled: false
			})
		}
		var arr1 = [];
		e1(arr1, selectedKeys[0], this.state.departArr);
		this.setState({
			tableParent: arr1[0].id
		})
		var nodeTypeText = "";

		if (arr1[0].nodeType == 1) { nodeTypeText = "company"; }
		else if (arr1[0].nodeType == 2) { nodeTypeText = "department"; }
		else if (arr1[0].nodeType == 3) { nodeTypeText = "duty"; }
		else if (arr1[0].nodeType == 4) { nodeTypeText = "rank"; }
		var arr7 = [];
		e3(arr7, selectedKeys[0], this.state.departArr);
		if (arr7[0].nodeType == 1) {
			var upperCompany = arr7[0].name;
			var upperDepart = ""
		} else {
			var arr9 = [];
			var e11 = findCompany(arr9, arr7[0].parId, this.state.departArr, arr7[0]);
			var upperCompany = arr9[arr9.length - 1].name;
			var upperDepart = arr7[0].name
		}
		this.setState({
			nodeTypeText: nodeTypeText
		}, () => {
			if (arr1[0].nodeType == 1) { self.setColumns1(); }
			else if (arr1[0].nodeType == 2) { self.setColumns1(); }
			else if (arr1[0].nodeType == 3) { self.setColumns2(); }
			else if (arr1[0].nodeType == 4) { self.setColumns3(); }
		})
		this.setState({
			startdepart: arr1[0].status == 0 ? "启用市海事局" : "停用市海事局"
		})
		if (!arr1[0].children) {
			var data = [];
		} else {
			var ee = JSON.stringify(arr1[0]);
			var ee1 = JSON.parse(ee);

			ee1.children = "";
			ee1.key = 1;
			if (arr1[0].nodeType == 3) {
				ee1.parCompanyName = upperCompany;
				ee1.parDepartmentName = upperDepart;
			}
			var data = [ee1];

		}

		this.setState({
			data: data,
			selectedKeys: selectedKeys,
			arr1Show: arr1
		})

	}
	addNewDepartment = (selectedKeys, arg1) => {
		this.props.form.resetFields()

		var arr1 = [];
		e1(arr1, selectedKeys[0], this.state.departArr);

		var arr7 = [];
		e3(arr7, selectedKeys[0], this.state.departArr);


		this.setState({ arr1: arr1, arr7: arr7 });

		this.setState({
			parId: arr7[0].id,
			parLevel: arr7[0].level,
			selId: arr1[0].id,
			selLevel: arr1[0].level
		})
		this.setState({
			level: arr1[0].level,
			selectId: arr1[0].id,
			erandom: Math.random(0.5, 1),
			saveaddOredit: arg1
		})
		if (arg1 == "addCompany") {
			this.setState({
				addHighDeprtment: arr1[0].name,
				addShortName: "",
				addLowDeprtment: "",
				addaddress: "",
				addDescription: ""
			})
		}
		else if (arg1 == "editCompany") {
			this.setState({
				addHighDeprtment: arr7[0].name,
				addShortName: arr1[0].shortName,
				addLowDeprtment: arr1[0].name,
				addaddress: arr1[0].address,
				addDescription: arr1[0].description,
			})
		}
		if (arg1 == "addDepartment") {

			this.setState({
				addHighDeprtment: arr1[0].name,
				addShortName: "",
				addLowDeprtment: "",
				addaddress: "",
				addDescription: "",
			})
		}
		else if (arg1 == "editDepartment") {

			this.setState({
				addHighDeprtment: arr7[0].name,
				addLowDeprtment: arr1[0].name,
				addShortName: arr1[0].shortName,
				addaddress: arr1[0].address,
				addDescription: arr1[0].description
			})
		}
		if (arg1 == "addDuty") {
			if (arr1[0].nodeType == 1) {
				var upperCompany = arr1[0].name;
				var upperDepart = ""
			} else {
				var arr9 = [];
				var e11 = findCompany(arr9, arr1[0].parId, this.state.departArr);
				var upperCompany = arr9[arr9.length - 1].name;
				var upperDepart = arr1[0].name
			}
			this.setState({
				addHighDeprtment: upperCompany,
				addLowDeprtment: upperDepart,
				addShortName: "",
				addDutynName: "",
				addaddress: arr1[0].address,
				addDescription: ""
			})
		}
		else if (arg1 == "editDuty") {
			if (arr7[0].nodeType == 1) {
				var upperCompany = arr7[0].name;
				var upperDepart = ""
			} else {
				var arr9 = [];
				var e11 = findCompany(arr9, arr7[0].parId, this.state.departArr);
				var upperCompany = arr9[arr9.length - 1].name;
				var upperDepart = arr7[0].name
			}
			this.setState({
				addHighDeprtment: upperCompany,
				addLowDeprtment: upperDepart,
				addShortName: arr1[0].shortName,
				addDutynName: arr1[0].name,
				addaddress: arr1[0].address,
				addDescription: arr1[0].description
			})
		}
		if (arg1 == "addRank") {
			if (arr1[0].nodeType == 1) {
				var upperCompany = arr1[0].name;
				var upperDepart = ""
			} else {
				var arr9 = [];
				var e11 = findCompany(arr9, arr1[0].parId, this.state.departArr);
				var upperCompany = arr9[arr9.length - 1].name;
				var upperDepart = arr1[0].name
			}
			this.setState({
				addHighDeprtment: upperCompany,
				addLowDeprtment: upperDepart,
				addShortName: "",
				addranknName: "",
				addaddress: arr1[0].address,
				addDescription: ""
			})
		}
		else if (arg1 == "editRank") {
			if (arr7[0].nodeType == 1) {
				var upperCompany = arr7[0].name;
				var upperDepart = ""
			} else {
				var arr9 = [];
				var e11 = findCompany(arr9, arr7[0].parId, this.state.departArr);
				var upperCompany = arr9[arr9.length - 1].name;
				var upperDepart = arr7[0].name
			}
			this.setState({
				addHighDeprtment: upperCompany,
				addLowDeprtment: upperDepart,
				addShortName: arr1[0].shortName,
				addranknName: arr1[0].name,
				addaddress: arr1[0].address,
				addDescription: arr1[0].description
			})
		}

		if (arg1 == "editDepartment" || arg1 == "addDepartment") {
			this.setState({
				departmentVisible: true
			});
		} else if (arg1 == "editCompany" || arg1 == "addCompany") {
			this.setState({
				companyVisible: true
			});
		} else if (arg1 == "editDuty" || arg1 == "addDuty") {
			this.setState({
				dutyVisible: true
			});
		} else if (arg1 == "editRank" || arg1 == "addRank") {
			this.setState({
				rankVisible: true
			});
		}
		this.render();
	}

	handleCancel = () => {
		self.setState({ departmentVisible: false, companyVisible: false, dutyVisible: false, rankVisible: false, });
		self.props.form.resetFields();

	}
	trim = (str) => { //删除左右两端的空格
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	handleSubmit = (e) => {
		e.preventDefault();

		var nodeTypeText = "";
		var backTextShow1 = "", backTextShow2 = "";

		var formdata = this.props.form.getFieldsValue();

		if (this.state.saveaddOredit == "addCompany" || this.state.saveaddOredit == "editCompany") {
			var setAertPanduan = formdata.addHighDeprtment1 && formdata.addLowDeprtment1 && formdata.addShortName1;
			var testCompanyName = formdata.addLowDeprtment1;
			var testaddDescription = formdata.addDescription1;
			var testaddShortName = formdata.addShortName1;
			var testaddaddress = formdata.addaddress1;

		}
		else if (this.state.saveaddOredit == "addDepartment" || this.state.saveaddOredit == "editDepartment") {
			var setAertPanduan = formdata.addHighDeprtment2 && formdata.addLowDeprtment2 && formdata.addShortName2;
			var testCompanyName = formdata.addLowDeprtment2;
			var testaddDescription = formdata.addDescription2;
			var testaddShortName = formdata.addShortName2;
			var testaddaddress = formdata.addaddress2;
		}
		else if (this.state.saveaddOredit == "addDuty" || this.state.saveaddOredit == "editDuty") {
			var setAertPanduan = formdata.addLowDeprtment3 && formdata.addShortName3;
			var testCompanyName = formdata.addLowDeprtment3;
			var testaddDescription = formdata.addDescription3;
			var testaddShortName = formdata.addShortName3;
			var testaddaddress = formdata.addaddress3;
		}
		else if (this.state.saveaddOredit == "addRank" || this.state.saveaddOredit == "editRank") {
			var setAertPanduan = formdata.addLowDeprtment4 && formdata.addShortName4;
			var testCompanyName = formdata.addLowDeprtment4;
			var testaddDescription = formdata.addDescription4;
			var testaddShortName = formdata.addShortName4;
			var testaddaddress = formdata.addaddress4;
		}
		if (!testaddDescription) {
			testaddDescription = "";
		}
		if (!testaddShortName) {
			testaddShortName = "";
		}
		if (!testaddaddress) {
			testaddaddress = "";
		}

		this.props.form.validateFields((err, values) => {

			if (setAertPanduan) {
				//添加市海事局
				if (this.state.saveaddOredit == "addCompany" || this.state.saveaddOredit == "editCompany") {
					nodeTypeText = 1; backTextShow1 = "添加省海事局成功"; backTextShow2 = "修改省海事局成功";
				}
				else if (this.state.saveaddOredit == "addDepartment" || this.state.saveaddOredit == "editDepartment") {
					nodeTypeText = 2; backTextShow1 = "添加市海事局成功"; backTextShow2 = "修改市海事局成功";
				}
				else if (this.state.saveaddOredit == "addDuty" || this.state.saveaddOredit == "editDuty") {
					nodeTypeText = 3; backTextShow1 = "添加区县海事局成功"; backTextShow2 = "修改区县海事局成功";
				}
				else if (this.state.saveaddOredit == "addRank" || this.state.saveaddOredit == "editRank") {
					nodeTypeText = 4; backTextShow1 = "添加所级海事局成功"; backTextShow2 = "修改所级海事局成功";
				}
				var newrES = /\<script\>|\<.{1,}\>/g;
				var specialText = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\s]/g;
				if (newrES.test(testCompanyName) || specialText.test(testCompanyName)) {
					var tipalertword = backTextShow1.substring(2, 4) + "名称"
					message.warning(tipalertword + "包含非法字符");
					return
				}
				if (testaddDescription.length > 50) {
					var tipalertword = backTextShow1.substring(2, 4) + "职能描述："
					message.warning(tipalertword + "不能超过50个字");
					return
				}
				if (testaddShortName.length > 20) {
					var tipalertword = backTextShow1.substring(2, 4) + "简称"
					message.warning(tipalertword + "不能超过20个字");
					return
				}
				if (nodeTypeText == 1) {
					if (testCompanyName.length > 50) { message.warning("省海事局名称不能超过50个字"); return }
				} else if (nodeTypeText == 2) {
					if (testCompanyName.length > 20) { message.warning("市海事局名称不能超过20个字"); return }
				} else if (nodeTypeText == 3) {
					if (testCompanyName.length > 20) { message.warning("区县海事局名称不能超过20个字"); return }
				} else if (nodeTypeText == 4) {
					if (testCompanyName.length > 20) { message.warning("所级海事局名称不能超过20个字"); return }
				}
				this.setState({ loading: true });
				
				if (this.state.saveaddOredit == "addCompany" || this.state.saveaddOredit == "addDepartment" || this.state.saveaddOredit == "addDuty" || this.state.saveaddOredit == "addRank") {
					$jsonp(self, api.addCompanyDepartment, {
						name: self.trim(testCompanyName),
						address: self.trim(testaddaddress),
						description: self.trim(testaddDescription),
						parId: this.state.arr1[0].id,
						level: this.state.arr1[0].level + 1,
						orderNum: this.state.arr1[0].orderNum,
						parCode: this.state.arr1[0].code,
						nodeType: nodeTypeText,
						shortName: self.trim(testaddShortName)
					}).then((res) => {
						Modal.success({
							content: backTextShow1
						})
						this.showTree1();

						this.setState({ loading: false, departmentVisible: false, departmentVisible: false, companyVisible: false, dutyVisible: false });

					}).catch((res) => {
						this.setState({ loading: false, departmentVisible: false, companyVisible: false, dutyVisible: false });
					})
				}
				else if (this.state.saveaddOredit == "editCompany" || this.state.saveaddOredit == "editDepartment" || this.state.saveaddOredit == "editDuty" || this.state.saveaddOredit == "editrank") {
					//修改市海事局
					$jsonp(self, api.upDateCompanyDepartment, {
						name: self.trim(testCompanyName),
						address: self.trim(testaddaddress),
						description: self.trim(testaddDescription) || "",
						parId: this.state.arr1[0].parId,
						id: this.state.arr1[0].id,
						level: this.state.arr1[0].level,
						nodeType: nodeTypeText,
						shortName: self.trim(testaddShortName)

					}).then((res) => {
						Modal.success({
							content: backTextShow2
						})
						this.showTree1();
						this.setState({ loading: false, departmentVisible: false, departmentVisible: false, companyVisible: false, dutyVisible: false });
					}).catch((res) => {
						this.setState({ loading: false, departmentVisible: false, companyVisible: false, dutyVisible: false });
					})
				}
			}
			else {
			}
		});

	}
	//停用或启用市海事局
	stop = (selectedKeys, arg1, nodeType) => {

		var arr1 = [];
		var arg2;
		e1(arr1, selectedKeys[0], this.state.departArr);
		arg2 = arg1 == "启用" ? 1 : 0;
		var tishiword = "";
		if (nodeType == 1) { tishiword = "省海事局"; }
		else if (nodeType == 2) { tishiword = "市海事局"; }
		else if (nodeType == 3) { tishiword = "区县海事局"; }
		Modal.confirm({
			title: "提示",
			content: arg1 + tishiword + "?",
			onOk: function () {
				$jsonp(self, api.enableOrDisable, {
					parId: arr1[0].parId,
					type: arr1[0].nodeType,
					id: arr1[0].id,
					status: arg2,
				}).then((res) => {
					self.setState({
						startdepart: arg1 == "启用" ? "停用市海事局" : "启用市海事局"
					});

					self.showTree1();
					Modal.success({
						content: `${arg1 == "启用" ? "启用" + tishiword : "停用" + tishiword}${arr1[0].name}成功`
					})

				})
			}
		})
	}
	order = (selectedKeys) => {
		var arr1 = [];
		e1(arr1, selectedKeys[0], this.state.departArr);
		sessionStorage.setItem("departmentorder", JSON.stringify(this.state.departArr));
		hashHistory.push({
			pathname: '/main/departmentorder'
		})
	}

	setColumns1 = () => {
		self.setState({
			columns: [{
				title: self.state.nodeTypeText == "company" ? "省海事局名称" : "市海事局名称",
				dataIndex: 'name',
				key: 'name',
				className: publicstyle.center,
			}, {
				title: self.state.nodeTypeText == "company" ? "省海事局简称" : "市海事局简称",
				dataIndex: 'shortName',
				key: 'shortName',
				className: publicstyle.center,
			}, {
				title: self.state.nodeTypeText == "company" ? "省海事局地址" : "市海事局地址",
				dataIndex: 'address',
				key: 'address',
				className: publicstyle.center,
			}, {
				title: "海事局描述",
				dataIndex: 'description',
				key: 'description',
				className: publicstyle.center,
			}, {
				title: self.state.nodeTypeText == "company" ? "省海事局状态" : "市海事局状态",
				dataIndex: 'status',
				key: 'status',
				className: publicstyle.center,
				width: "100px",
				render: (text, record, index) => {
					if (record.status == 1) {
						return <div style={{ textAlign: "center" }}>
							<Tag color="blue">正常</Tag>
						</div>
					}
					else if (record.status == 0) {
						return <div style={{ textAlign: "center", color: "red" }}>
							<Tag color="red">已停用</Tag>
						</div>
					}

				}
			}, {
				title: '操作',
				key: 'action',
				className: publicstyle.center,
				render: (text, record, index) => {
					if (record.nodeType == 1) { var edittype = "editCompany"; }
					else if (record.nodeType == 2) { var edittype = "editDepartment"; }
					else if (record.nodeType == 3) { var edittype = "editDuty"; }
					else if (record.nodeType == 4) { var edittype = "editRank"; }
					if (record.status == 0) {
						return <div style={{ textAlign: "center", cursor: "pointer" }}>
							<Button type="primary" style={{ marginRight: 10 }} onClick={this.addNewDepartment.bind(this, [record.id], edittype)} disabled={true}>编辑</Button>
							<Button type="primary" style={{ marginRight: 10 }} onClick={this.stop.bind(this, [record.id], "启用", record.nodeType)}>启用</Button>

						</div>
					}
					else if (record.status == 1) {
						return <div style={{ textAlign: "center", cursor: "pointer" }}>
							<Button style={{ marginRight: 10 }} type="primary" onClick={this.addNewDepartment.bind(this, [record.id], edittype)}>编辑</Button>
							<Button style={{ marginRight: 10 }} type="danger" onClick={this.stop.bind(this, [record.id], "停用", record.nodeType)}>停用</Button>
						</div>
					}

				},
			}]
		})
	}
	setColumns2 = () => {
		self.setState({
			columns: [{
				title: "区县海事局名称",
				dataIndex: 'name',
				key: 'name',
				className: publicstyle.center,
			}, {
				title: "区县海事局简称",
				dataIndex: 'shortName',
				key: 'shortName',
				className: publicstyle.center,
			}, {
				title: "所属市海事局",
				dataIndex: 'parDepartmentName',
				key: 'parDepartmentName',
				className: publicstyle.center,
			}, {
				title: "区县海事局地址",
				dataIndex: 'address',
				key: 'address',
				className: publicstyle.center,
			},
			{
				title: "海事局描述",
				dataIndex: 'description',
				key: 'description',
				className: publicstyle.center,
			}, {
				title: "区县海事局状态",
				dataIndex: 'status',
				key: 'status',
				className: publicstyle.center,
				width: "110px",
				render: (text, record, index) => {
					if (record.status == 1) {
						return <div style={{ textAlign: "center" }}>
							<Tag color="blue">正常</Tag>
						</div>
					}
					else if (record.status == 0) {
						return <div style={{ textAlign: "center", color: "red" }}>
							<Tag color="red">已停用</Tag>
						</div>
					}

				}
			}, {
				title: '操作',
				key: 'action',
				className: publicstyle.center,
				render: (text, record, index) => {
					if (record.nodeType == 1) { var edittype = "editCompany"; }
					else if (record.nodeType == 2) { var edittype = "editDepartment"; }
					else if (record.nodeType == 3) { var edittype = "editDuty"; }
					else if (record.nodeType == 4) { var edittype = "editRank"; }
					if (record.status == 0) {
						return <div style={{ textAlign: "center", cursor: "pointer" }}>
							<Button type="primary" style={{ marginRight: 10 }} onClick={this.addNewDepartment.bind(this, [record.id], edittype)} disabled={true}>编辑</Button>
							<Button type="primary" style={{ marginRight: 10 }} onClick={this.stop.bind(this, [record.id], "启用", record.nodeType)}>启用</Button>

						</div>
					}
					else if (record.status == 1) {
						return <div style={{ textAlign: "center", cursor: "pointer" }}>
							<Button style={{ marginRight: 10 }} type="primary" onClick={this.addNewDepartment.bind(this, [record.id], edittype)}>编辑</Button>
							<Button style={{ marginRight: 10 }} type="danger" onClick={this.stop.bind(this, [record.id], "停用", record.nodeType)}>停用</Button>
						</div>
					}

				},
			}]
		})
	}

	setColumns3 = () => {
		self.setState({
			columns: [{
				title: "所级海事局名称",
				dataIndex: 'name',
				key: 'name',
				className: publicstyle.center,
			}, {
				title: "所级海事局简称",
				dataIndex: 'shortName',
				key: 'shortName',
				className: publicstyle.center,
			}, {
				title: "所属区县海事局",
				dataIndex: 'parDepartmentName',
				key: 'parDepartmentName',
				className: publicstyle.center,
			}, {
				title: "所级海事局地址",
				dataIndex: 'address',
				key: 'address',
				className: publicstyle.center,
			},
			{
				title: "海事局描述",
				dataIndex: 'description',
				key: 'description',
				className: publicstyle.center,
			}, {
				title: "所级海事局状态",
				dataIndex: 'status',
				key: 'status',
				className: publicstyle.center,
				width: "110px",
				render: (text, record, index) => {
					if (record.status == 1) {
						return <div style={{ textAlign: "center" }}>
							<Tag color="blue">正常</Tag>
						</div>
					}
					else if (record.status == 0) {
						return <div style={{ textAlign: "center", color: "red" }}>
							<Tag color="red">已停用</Tag>
						</div>
					}

				}
			}, {
				title: '操作',
				key: 'action',
				className: publicstyle.center,
				render: (text, record, index) => {
					if (record.nodeType == 1) { var edittype = "editCompany"; }
					else if (record.nodeType == 2) { var edittype = "editDepartment"; }
					else if (record.nodeType == 3) { var edittype = "editDuty"; }
					else if (record.nodeType == 4) { var edittype = "editRank"; }
					if (record.status == 0) {
						return <div style={{ textAlign: "center", cursor: "pointer" }}>
							<Button type="primary" style={{ marginRight: 10 }} onClick={this.addNewDepartment.bind(this, [record.id], edittype)} disabled={true}>编辑</Button>
							<Button type="primary" style={{ marginRight: 10 }} onClick={this.stop.bind(this, [record.id], "启用", record.nodeType)}>启用</Button>

						</div>
					}
					else if (record.status == 1) {
						return <div style={{ textAlign: "center", cursor: "pointer" }}>
							<Button style={{ marginRight: 10 }} type="primary" onClick={this.addNewDepartment.bind(this, [record.id], edittype)}>编辑</Button>
							<Button style={{ marginRight: 10 }} type="danger" onClick={this.stop.bind(this, [record.id], "停用", record.nodeType)}>停用</Button>
						</div>
					}

				},
			}]
		})
	}

	render() {

		const loop1 = data => data.map((item) => {
			if (item.children && item.children.length!=0) {
				return <TreeNode title={item.name} key={item.id} className={item.status == 0 ? styles.red : ""}>{loop(item.children)}</TreeNode>;
			}
			return <TreeNode title={item.name} key={item.id} className={item.status == 0 ? styles.red : ""} />;
		});

		const loop = data => data.map((item) => {
			if (item.children && item.children.length!=0) {
				var ptitle = "";
				var itemName = item.name;
				if (itemName.length > 25) { itemName = itemName.substring(0, 25) + "..."; }
				if (item.nodeType == 1) {
					ptitle = <span><img src={companypng} className={styles.qicon} />{itemName}</span>;
				} else if (item.nodeType == 2) {
					ptitle = <span><img src={departmentpng} className={styles.qicon} />{itemName}</span>;
				} else if (item.nodeType == 3) {
					ptitle = <span><img src={emppng} className={styles.qicon} />{itemName}</span>;
				} else if (item.nodeType == 4) {
					ptitle = <span><img src={emppng} className={styles.qicon} />{itemName}</span>;
				}
				return <TreeNode title={ptitle} key={item.id} className={item.status == 0 ? styles.red : ""}>{loop(item.children)}</TreeNode>;
			}
			var ptitle = "";
			var itemName = item.name;
			if (itemName.length > 25) { itemName = itemName.substring(0, 25) + "..."; }
			if (item.nodeType == 1) {
				ptitle = <span><img src={companypng} className={styles.qicon} />{itemName}</span>;
			} else if (item.nodeType == 2) {
				ptitle = <span><img src={departmentpng} className={styles.qicon} />{itemName}</span>;
			} else if (item.nodeType == 3) {
				ptitle = <span><img src={emppng} className={styles.qicon} />{itemName}</span>;
			} else if (item.nodeType == 4) {
				ptitle = <span><img src={emppng} className={styles.qicon} />{itemName}</span>;
			}
			return <TreeNode title={ptitle} key={item.id} className={item.status == 0 ? styles.red : ""} value={item.id.toString()} />;
		});

		const { getFieldDecorator } = this.props.form;

		return (
			<div className={stylez.wrapPadding}>
				<Spin spinning={this.state.loading}>
					<Breadcrumb separator=">">
						<Breadcrumb.Item>系统管理</Breadcrumb.Item>
						<Breadcrumb.Item>海事部门管理</Breadcrumb.Item>
					</Breadcrumb>
					<div className={publicstyle.clearfloat}></div>


					<div className={styles.setdepart}>
						<Button type="primary" className={publicstyle.button + " " + styles.button} onClick={this.addNewDepartment.bind(this, this.state.selectedKeys, "addCompany")} disabled={this.state.buttondisabled || this.state.startdepart == "启用市海事局"} style={{
							display: "none"
						}}><Icon type="plus" />新增省海事局</Button>
						<Button type="primary" className={publicstyle.button + " " + styles.button} onClick={this.addNewDepartment.bind(this, this.state.selectedKeys, "addDepartment")} disabled={this.state.buttondisabled || this.state.startdepart == "启用市海事局"} style={{
							display: this.state.nodeTypeText == "company" ? "inline-block" : "none"
						}}><Icon type="plus" />新增市海事局</Button>

						<Button type="primary" className={publicstyle.button + " " + styles.button} onClick={this.addNewDepartment.bind(this, this.state.selectedKeys, "addDuty")} disabled={this.state.buttondisabled || this.state.startdepart == "启用市海事局"} style={{
							display: this.state.nodeTypeText == "department" ? "inline-block" : "none"
						}}><Icon type="plus" />新增区县海事局</Button>

						<Button type="primary" className={publicstyle.button + " " + styles.button} onClick={this.addNewDepartment.bind(this, this.state.selectedKeys, "addRank")} disabled={this.state.buttondisabled || this.state.startdepart == "启用区县海事局"} style={{
							display: this.state.nodeTypeText == "duty" ? "inline-block" : "none"
						}}><Icon type="plus" />新增所级海事局</Button>

						<Button type="primary" className={publicstyle.button + " " + styles.button} onClick={this.order.bind(this, this.state.selectedKeys)} disabled={this.state.buttondisabled}><Icon type="setting" />部门排序</Button>
					</div>


					{this.state.departArr && this.state.selectedKeys.length > 0 ? <div style={{ display: "flex", marginTop: "20px" }}>
						<Tree
							defaultExpandAll
							defaultSelectedKeys={this.state.selectedKeys}
							onSelect={this.onSelect}
							className={styles.tree}
						>
							{loop(this.state.departArr)}
						</Tree>
						<Table columns={this.state.columns} dataSource={this.state.data} bordered className={styles.table} pagination={false} />
					</div> : ""}

					<div style={{ display: this.state.departmentVisible ? "block" : "none" }} className={styles.mask}></div>
					<div style={{ display: this.state.companyVisible ? "block" : "none" }} className={styles.mask}></div>
					<div style={{ display: this.state.dutyVisible ? "block" : "none" }} className={styles.mask}></div>
					<div style={{ display: this.state.rabkVisible ? "block" : "none" }} className={styles.mask}></div>


					<Form onSubmit={this.handleSubmit} className={styles.loginform} style={{ display: this.state.departmentVisible ? "block" : "none" }}>
						<FormItem>
							<dl>{this.state.saveaddOredit == "addDepartment" ? "新增市海事局：" : "编辑市海事局："}</dl>

						</FormItem>
						<FormItem>
							<span>上级海事局：</span>
							{getFieldDecorator('addHighDeprtment2', {
								rules: [{ required: true, message: '输入不能是空' }],

								initialValue: this.state.addHighDeprtment
							})(
								<Input disabled />
							)}
						</FormItem>
						<FormItem>
							<span>市海事局名称：</span>
							{getFieldDecorator('addLowDeprtment2', {
								rules: [{ required: true, message: '输入不能是空' }],
								initialValue: this.state.addLowDeprtment
							})(
								<Input type="text" />
							)}
						</FormItem>

						<FormItem>
							<span>市海事局简称：</span>
							{getFieldDecorator('addShortName2', {
								rules: [{ required: true, message: '输入不能是空' }],
								initialValue: this.state.addShortName
							})(
								<Input type="text" />
							)}
						</FormItem>
						<FormItem>
							<span>地址：</span>
							{getFieldDecorator('addaddress2', {
								rules: [{ required: false }],
								initialValue: this.state.addaddress
							})(
								<Input type="text" />
							)}
						</FormItem>

						<FormItem>
							<span className={styles.decr}>职能描述：</span>
							{getFieldDecorator('addDescription2', {
								rules: [{ required: false }],
								initialValue: this.state.addDescription
							})(
								<TextArea className={styles.uresize} autosize={{ minRows: 2, maxRows: 6 }} />
							)}
						</FormItem>
						<FormItem>
							<Button type="primary" size="large" htmlType="submit" loading={this.state.loading}>
								保存
			          </Button>
							<Button size="large" onClick={this.handleCancel}>
								取消
			          </Button>

						</FormItem>
					</Form>
					<Form onSubmit={this.handleSubmit} className={styles.loginform} style={{ display: this.state.companyVisible ? "block" : "none" }}>
						<FormItem>
							<dl>{this.state.saveaddOredit == "addCompany" ? "新增省海事局：" : "编辑省海事局："}</dl>
						</FormItem>
						<FormItem>
							<span>上级省海事局：</span>
							{getFieldDecorator('addHighDeprtment1', {
								rules: [{ required: true, message: '输入不能是空' }],

								initialValue: this.state.addHighDeprtment
							})(
								<Input disabled />
							)}
						</FormItem>
						<FormItem>
							<span>省海事局名称：</span>
							{getFieldDecorator('addLowDeprtment1', {
								rules: [{ required: true, message: '输入不能是空' }],
								initialValue: this.state.addLowDeprtment
							})(
								<Input type="text" />
							)}
						</FormItem>
						<FormItem>
							<span>省海事局简称：</span>
							{getFieldDecorator('addShortName1', {
								rules: [{ required: true, message: '输入不能是空' }],
								initialValue: this.state.addShortName
							})(
								<Input type="text" />
							)}
						</FormItem>
						<FormItem>
							<span>地址：</span>
							{getFieldDecorator('addaddress1', {
								rules: [{ required: false }],
								initialValue: this.state.addaddress
							})(
								<Input type="text" />
							)}
						</FormItem>
						<FormItem>
							<span className={styles.decr}>职能描述：</span>
							{getFieldDecorator('addDescription1', {
								rules: [{ required: false }],
								initialValue: this.state.addDescription
							})(
								<TextArea className={styles.uresize} autosize={{ minRows: 2, maxRows: 6 }} />
							)}
						</FormItem>
						<FormItem>
							<Button type="primary" size="large" htmlType="submit" loading={this.state.loading}>
								保存
							</Button>
							<Button size="large" onClick={this.handleCancel}>
								取消
							</Button>

						</FormItem>
					</Form>
					<Form onSubmit={this.handleSubmit} className={styles.loginform} style={{ display: this.state.dutyVisible ? "block" : "none" }}>
						<FormItem>
							<dl>{this.state.saveaddOredit == "addDuty" ? "新增区县海事局：" : "编辑区县海事局："}</dl>
						</FormItem>
						<FormItem>
							<span>所属省海事局：</span>
							{getFieldDecorator('addHighDeprtment3', {
								rules: [{ required: true, message: '输入不能是空' }],

								initialValue: this.state.addHighDeprtment
							})(
								<Input disabled />
							)}
						</FormItem>
						<FormItem>
							<span>所属市海事局：</span>
							{getFieldDecorator('addHighDeprtment3', {
								initialValue: this.state.addLowDeprtment
							})(
								<Input disabled />
							)}
						</FormItem>
						<FormItem>
							<span>区县海事局名称：</span>
							{getFieldDecorator('addLowDeprtment3', {
								rules: [{ required: true, message: '输入不能是空' }],
								initialValue: this.state.addDutynName
							})(
								<Input type="text" />
							)}
						</FormItem>
						<FormItem>
							<span>区县海事局简称：</span>
							{getFieldDecorator('addShortName3', {
								rules: [{ required: true, message: '输入不能是空' }],
								initialValue: this.state.addShortName
							})(
								<Input type="text" />
							)}
						</FormItem>
						<FormItem>
							<span>地址：</span>
							{getFieldDecorator('addaddress3', {
								rules: [{ required: false }],
								initialValue: this.state.addaddress
							})(
								<Input type="text" />
							)}
						</FormItem>
						<FormItem>
							<span className={styles.decr}>职能描述：</span>
							{getFieldDecorator('addDescription3', {
								rules: [{ required: false }],
								initialValue: this.state.addDescription
							})(
								<TextArea className={styles.uresize} autosize={{ minRows: 2, maxRows: 6 }} />
							)}
						</FormItem>
						<FormItem>
							<Button type="primary" size="large" htmlType="submit" loading={this.state.loading}>
								保存
			          </Button>
							<Button size="large" onClick={this.handleCancel}>
								取消
			          </Button>

						</FormItem>
					</Form>
					{/* 所级 */}
					<Form onSubmit={this.handleSubmit} className={styles.loginform} style={{ display: this.state.rankVisible ? "block" : "none" }}>
						<FormItem>
							<dl>{this.state.saveaddOredit == "addRank" ? "新增所级海事局：" : "编辑所级海事局："}</dl>
						</FormItem>
						<FormItem>
							<span>所属省海事局：</span>
							{getFieldDecorator('addHighDeprtment4', {
								rules: [{ required: true, message: '输入不能是空' }],

								initialValue: this.state.addHighDeprtment
							})(
								<Input disabled />
							)}
						</FormItem>
						<FormItem>
							<span>所属区县海事局名称：</span>
							{getFieldDecorator('addHighDeprtment4', {
								initialValue: this.state.addLowDeprtment
							})(
								<Input disabled />
							)}
						</FormItem>
						<FormItem>
							<span>所级海事局名称：</span>
							{getFieldDecorator('addLowDeprtment4', {
								rules: [{ required: true, message: '输入不能是空' }],
								initialValue: this.state.addRanknName
							})(
								<Input type="text" />
							)}
						</FormItem>
						<FormItem>
							<span>所级海事局简称：</span>
							{getFieldDecorator('addShortName4', {
								rules: [{ required: true, message: '输入不能是空' }],
								initialValue: this.state.addShortName
							})(
								<Input type="text" />
							)}
						</FormItem>
						<FormItem>
							<span>地址：</span>
							{getFieldDecorator('addaddress4', {
								rules: [{ required: false }],
								initialValue: this.state.addaddress
							})(
								<Input type="text" />
							)}
						</FormItem>
						<FormItem>
							<span className={styles.decr}>职能描述：</span>
							{getFieldDecorator('addDescription4', {
								rules: [{ required: false }],
								initialValue: this.state.addDescription
							})(
								<TextArea className={styles.uresize} autosize={{ minRows: 2, maxRows: 6 }} />
							)}
						</FormItem>
						<FormItem>
							<Button type="primary" size="large" htmlType="submit" loading={this.state.loading}>
								保存
			          </Button>
							<Button size="large" onClick={this.handleCancel}>
								取消
			          </Button>

						</FormItem>
					</Form>


				</Spin>
			</div>

		)
	}
}
const departmentsetA = Form.create()(departmentset);
export default departmentsetA;