import React from 'react';
import moment from "moment";
moment.locale('zh-cn');
import { Breadcrumb, Row, Col, Select, Input, DatePicker,TreeSelect, Button, message, Icon } from 'antd';
const Option = Select.Option;
import { Link, hashHistory } from 'react-router';

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import api from '../../utils/api.js';
import stylez from '../../container/index.less';

import beard from '../../img/Breadcrumbsymbol.jpg'
import publicstyle from '../../img/public.less'
import styles from './addcompanyNew.less'
import Singlepersonselect from '../../components/singlepersonselect1.jsx'
import companypng from "../../img/company.png"
import departmentpng from "../../img/department.png"
import emppng from "../../img/emp.png"
import styles1 from "../../components/common.less"
import styles2 from "../admin/index.less";

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

function fetchNodeType(nodeType,nodeName){
	var returnDiv="";
	if(nodeType==1){
		returnDiv=<div><img src={companypng} className={styles1.qicon}/>{nodeName}</div>
	}
	else if(nodeType==2){
		returnDiv=<div><img src={departmentpng} className={styles1.qicon}/>{nodeName}</div>
	}
	else if(nodeType==3){
		returnDiv=<div><img src={emppng} className={styles1.qicon}/>{nodeName}</div>
	}
	return returnDiv
}
const loop = data => data.map((item) => {
    if (item.children && item.children.length) {
        var ptitle = "";
        ptitle = fetchNodeType(item.nodeType, item.name)
        return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id}
                                    value={item.id.toString()}>{loop(item.children)}</TreeSelect.TreeNode>;
    }
    var ptitle = "";
    ptitle = fetchNodeType(item.nodeType, item.name)
    return <TreeSelect.TreeNode title={ptitle} isLeaf={item.isLeaf} dataRef={item} pops={item.name} key={item.id}
                                value={item.id.toString()}/>;
});

class Addstaff extends React.Component {
	constructor(props) {
		super(props);
		self = this;
		this.state = {
			loading: false,
			personData: [],
			showErrorText1: "",
			name: "",
			unit: "",
			operator: "",
			operatorPhone: "",
			town: "",
			townManager: "",
			townManagerPhone: "",
			selectType: "1",
			terminalTime1: "",
			terminalTimeShow1: "",
			selectNavigableWaterStatus: "0"

		}
	}

	componentWillMount() {

		this.fetchDepartment1();

        if (self.props.location.state.top == "edit") {
            var staffmanage = JSON.parse(sessionStorage.getItem("staffmanage"));
            this.setState({staffmanage});
            self.setState({
                departmentId: staffmanage.msaId,
                departmentName: <div><img src={departmentpng} className={styles1.qicon}/>{staffmanage.msaName}</div>,
                showStatus: true,
            })
            $jsonp(self, api.getCompanyInfoById, {
                id: staffmanage.id,
            }).then((res) => {
                var list = res.data.response.info
                self.setState({
                    name: list.name,
                    unit: !list.unit ? "" : list.unit,
                    operator: !list.operator ? "" : list.operator,
                    operatorPhone: !list.operatorPhone ? "" : list.operatorPhone,
                    town: !list.town ? "" : list.town,
                    townManager: !list.townManager ? "" : list.townManager,
                    townManagerPhone: !list.townManagerPhone ? "" : list.townManagerPhone,
                    selectType: !list.type ? "1" : list.type,
                    selectStatus: list.status,
                    terminalTime1: !list.recordTime ? "" : moment(list.recordTime).format('YYYY-MM-DD'),
                    terminalTimeShow1: !list.recordTime ? "" : moment(list.recordTime),
                    selectNavigableWaterStatus: !list.navigableWaterStatus ? "0" : list.navigableWaterStatus,

                });
            }).catch((error) => {
            })
        }
        if (self.props.location.state.top == "add") {
            this.setState({
                departmentId: "",
                departmentName: "",
                showStatus: false,
                name: "",
                unit: "",
                operator: "",
                operatorPhone: "",
                town: "",
                townManager: "",
                townManagerPhone: "",
                selectType: "1",
                terminalTime1: "",
                terminalTimeShow1: "",
                selectStatus: "1",
                selectNavigableWaterStatus: "0"
            });

        }
    }

    // fetchDepartment() {
    // 	$jsonp(self, api.getAllCompanyDepartmentTreeInUse, {}).then((res) => {
    // 		var list = res.data.response.companyDepartmentList;
    // 		this.setState({
    // 			personData: list,
    // 			personData1: list,
    // 		});
    // 	});
    // }
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
            if (self.props.location.state.top == "add") {
                //根据是否是新增初始化选择
                var returnDiv = fetchNodeType(post1.nodeType, post1.name);
                this.setState({
                    departmentName: returnDiv,
                    departmentId: post1.id,
                });
            }
            this.setState({
                department: list,
                msaInitInfo: post1,
                personData: list,
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
                    department: [...this.state.personData],
                    personData: [...this.state.personData],
                }, () => {
                });
                resolve();
            });
        });
    }

    back() {
        window.history.back();
    }

	handleSubmit = (e) => {
		var roleIdd = "";
		var arr1 = [];
		var name = !self.state.name ? "" : self.state.name;
		var unit = !self.state.unit ? "" : self.state.unit;
		var operator = !self.state.operator ? "" : self.state.operator;
		var operatorPhone = !self.state.operatorPhone ? "" : self.state.operatorPhone;
		var town = !self.state.town ? "" : self.state.town;
		var townManager = !self.state.townManager ? "" : self.state.townManager;
		var townManagerPhone = !self.state.townManagerPhone ? "" : self.state.townManagerPhone;
		var selectType = !self.state.selectType ? "1" : self.state.selectType;
		var selectStatus = self.state.selectStatus;
		var selectNavigableWaterStatus = self.state.selectNavigableWaterStatus;
		var recordTime = self.state.terminalTime1;

		if (selectType == "1") {
			var p1 = "渡口名称"
			unit = ""
			selectNavigableWaterStatus = "0";
			recordTime = "";
		} else {
			var p1 = "游览经营活动项目";
			town = ""
			townManager = "";
			townManagerPhone = "";
		}
		if (!self.state.name) {
			message.info("请填写" + p1);
			return
		}
		if (!self.state.departmentId || this.state.departmentId.length == 0) {
			message.info("请选择所属海事局");
			return
		}
		self.setState({
			loading: true
		})

		if (self.props.location.state.top == "add") {
			$jsonp(self, api.addCompanyInfo, {
				msaId: this.state.departmentId,
				name: name,
				unit: unit,
				operator: operator,
				operatorPhone: operatorPhone,
				town: town,
				townManager: townManager,
				townManagerPhone: townManagerPhone,
				recordTime: recordTime,
				type: selectType,
				navigableWaterStatus: selectNavigableWaterStatus,
			}).then((res) => {
				hashHistory.push({
					pathname: '/main/companymanage',
					state: {
						current: ""
					}
				})
			}).catch((error) => {
				self.setState({
					loading: false
				})
			})
		}
		else {
			$jsonp(self, api.updateCompanyInfo1, {
				id: this.state.staffmanage.id,
				msaId: this.state.departmentId,
				name: name,
				unit: unit,
				operator: operator,
				operatorPhone: operatorPhone,
				town: town,
				townManager: townManager,
				townManagerPhone: townManagerPhone,
				recordTime: recordTime,
				type: selectType,
				status: selectStatus,
				navigableWaterStatus: selectNavigableWaterStatus,
			}).then((res) => {
				var eeee = self.props.location.state;
				hashHistory.push({
					pathname: '/main/companymanage',
					state: {
						current: eeee.current,
						name: eeee.name,
						departmentId: eeee.departmentId,
						departmentCode: eeee.departmentCode,
					}
				})

			}).catch((error) => {
				self.setState({
					loading: false
				})
			});
		}


	}
	// 选择海事局
	setChange = (value) => {
		var arr1 = [];
		e1(arr1, value, this.state.personData);
		if (!value) {
			this.setState({
				departmentId: "",
				departmentName: "",
			})
		}
		else {
			if ((arr1.length > 0)) {
				this.setState({
					showErrorText1: ""
				})
				if (arr1[0].nodeType == 1) {
					var depatname = <div><img src={companypng} className={styles1.qicon} />{arr1[0].name}</div>;
				} else if (arr1[0].nodeType == 2) {
					var depatname = <div><img src={departmentpng} className={styles1.qicon} />{arr1[0].name}</div>;
				} else if (arr1[0].nodeType == 3) {
					var depatname = <div><img src={emppng} className={styles1.qicon} />{arr1[0].name}</div>;
				}
				this.setState({
					departmentId: value,
					departmentName: depatname,
				})

			}

		}
	}
	cancel = () => {
		var eeee = self.props.location.state;
		hashHistory.push({
			pathname: '/main/companymanage',
			state: {
				current: eeee.current,
				name: eeee.name,
				departmentId: eeee.departmentId,
				departmentCode: eeee.departmentCode,
			}
		})
	}
	//设置新增票据承兑方简称
	setCompanytName = (e) => {
		var value = e.target.value;
		if (value.length >= 50) {
			return
		}
		this.setState({
			name: value
		})
	}
	setUnit = (e) => {
		var value = e.target.value;
		if (value.length >= 50) {
			return
		}
		this.setState({
			unit: value
		})
	}
	setOperator = (e) => {
		var value = e.target.value;
		if (value.length >= 50) {
			return
		}
		this.setState({
			operator: value
		})
	}
	setOperatorPhone = (e) => {
		var value = e.target.value;
		value = value.replace(/[^\d-]/g, "");
		if (value.length > 11) {
			return
		}
		this.setState({
			operatorPhone: value
		})

	}
	setTown = (e) => {
		var value = e.target.value;
		if (value.length >= 50) {
			return
		}
		this.setState({
			town: value
		})
	}
	setTownManager = (e) => {
		var value = e.target.value;
		if (value.length >= 50) {
			return
		}
		this.setState({
			townManager: value
		})
	}
	setTownManagerPhone = (e) => {
		var value = e.target.value;
		value = value.replace(/[^\d-]/g, "");
		if (value.length > 11) {
			return
		}
		this.setState({
			townManagerPhone: value
		})

	}
	timeChange1 = (date, dateString) => {
		let self = this
		this.setState({
			terminalTime1: dateString,
			terminalTimeShow1: date
		})
	}
	setType = (value) => {
		this.setState({
			selectType: value
		})
	}
	setNavigableWaterStatus = (value) => {
		this.setState({
			selectNavigableWaterStatus: value
		})
		if (value == "1") {
			this.setState({
				terminalTime1: "",
				terminalTimeShow1: null
			})
		}
	}
	setStatus = (value) => {
		this.setState({
			selectStatus: value
		})
	}
	render() {

		return (
			<div className={stylez.wrapPadding}>
                <Breadcrumb separator=">" style={{textAlign: "left"}}>
					<Breadcrumb.Item>系统管理</Breadcrumb.Item>
					<Breadcrumb.Item><Link to="main/companymanage">检查对象管理</Link></Breadcrumb.Item>
					<Breadcrumb.Item>{self.props.location.state.top == "add" ? "新增检查对象" : "编辑检查对象"}</Breadcrumb.Item>
				</Breadcrumb>
                <Button type="primary" onClick={this.back} className={styles2.returnbackbutton}
                        style={{marginTop: 15}}>返回</Button>
				<div className={publicstyle.clearfloat}></div>

				<div className={styles.form1}>
					<dl className={styles.formitem1} style={{ display: this.state.showStatus ? "none" : "block" }}>
						<span className={styles.bitian}><i></i>企业类型：</span>
						<Select className={styles.selectrole} value={this.state.selectType} onChange={this.setType}>
							<Option value="1">渡口渡船</Option>
							<Option value="2">游览经营</Option>
						</Select>
					</dl>
					<dl className={styles.formitem1}>
						<span className={styles.bitian}><i></i>{this.state.selectType == "1" ? "渡口名称：" : "游览经营活动项目："}</span>
						<Input
							value={this.state.name}
							onChange={this.setCompanytName.bind(this)}
							placeholder={this.state.selectType == "1" ? "请输入渡口名称" : "请输入游览经营活动项目"}
						/>
					</dl>
					<dl className={styles.formitem1}>
						<span className={styles.bitian}><i></i>所属海事局：</span>
						{/* <Singlepersonselect value={this.state.departmentName} onChange={this.setChange} multiple={false} className={styles.singleSelect} personData={this.state.personData} /> */}
						<TreeSelect
					 	loadData={this.onTreeLoadData}
						showSearch
						className={styles.singleSelect}
						treeNodeFilterProp="pops"
						value={this.state.departmentName?this.state.departmentName:""}
						dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
						placeholder="请选择"
						allowClear
						multiple={false}
						dropdownMatchSelectWidth={false}
						onChange={this.setChange}
						>
						{loop(this.state.personData)}
						</TreeSelect>
						<label className={styles.xuanzeTishi}>{this.state.showErrorText1}</label>
					</dl>

					<dl className={styles.formitem1} style={{ display: this.state.selectType == "2" ? "block" : "none" }}>
						<span><i></i>游览经营单位：</span>
						<Input
							value={this.state.unit}
							onChange={this.setUnit.bind(this)}
							placeholder="请输入游览经营单位"
						/>
					</dl>
					<dl className={styles.formitem1} style={{ display: this.state.selectType == "1" ? "block" : "none" }}>
						<span><i></i>所在乡镇：</span>
						<Input
							value={this.state.town}
							onChange={this.setTown.bind(this)}
							placeholder="请输入所在乡镇"
						/>
					</dl>
					<dl className={styles.formitem1} style={{ display: this.state.selectType == "1" ? "block" : "none" }}>
						<span><i></i>乡镇负责人：</span>
						<Input
							value={this.state.townManager}
							onChange={this.setTownManager.bind(this)}
							placeholder="请输入乡镇负责人"
						/>
					</dl>
					<dl className={styles.formitem1} style={{ display: this.state.selectType == "1" ? "block" : "none" }}>
						<span><i></i>乡镇负责人手机号：</span>
						<Input
							value={this.state.townManagerPhone}
							onChange={this.setTownManagerPhone.bind(this)}
							placeholder="请输入乡镇负责人手机号"
						/>
					</dl>
					<dl className={styles.formitem1}>
						<span><i></i>{this.state.selectType == "1" ? "运营人：" : "联系人："}</span>
						<Input
							value={this.state.operator}
							onChange={this.setOperator.bind(this)}
							placeholder={this.state.selectType == "1" ? "请输入运营人" : "请输入联系人"}
						/>
					</dl>
					<dl className={styles.formitem1}>
						<span><i></i>{this.state.selectType == "1" ? "运营人手机号：" : "联系人手机："}</span>
						<Input
							value={this.state.operatorPhone}
							onChange={this.setOperatorPhone.bind(this)}
							placeholder={this.state.selectType == "1" ? "请输入运营人手机号" : "请输入联系人手机号"}
						/>
					</dl>
					<dl className={styles.formitem1} style={{ display: this.state.selectType == "2" ? "block" : "none" }}>
						<span className={styles.bitian}><i></i>是否通航：</span>
                        <Select className={styles.selectrole} value={this.state.selectNavigableWaterStatus}
                                onChange={this.setNavigableWaterStatus}>
							<Option value="0">非通航水域</Option>
							<Option value="1">通航水域</Option>
						</Select>
					</dl>
                    <dl className={styles.formitem1}
                        style={{display: this.state.selectType == "2" && this.state.selectNavigableWaterStatus == "0" ? "block" : "none"}}>
						<span><i></i>游览经营项目备案时间：</span>
						<DatePicker showTime
							size="large"
							format="YYYY-MM-DD"
							placeholder={'游览经营项目备案时间'}
							value={this.state.terminalTimeShow1}
							onOk={this.timeOk}
							style={{ width: "170px" }}
							onChange={this.timeChange1} />
					</dl>

                    <dl className={styles.formitem1}
                        style={{display: this.state.showStatus && this.state.selectType == "2" ? "block" : "none"}}>
                        <span className={styles.bitian}><i></i>游览经营项目状态：</span>
                        <Select className={styles.selectrole} value={this.state.selectStatus} onChange={this.setStatus}>
                            <Option value="0">无效</Option>
                            <Option value="1">有效</Option>
                        </Select>
                    </dl>

                    <dl className={styles.formitem1}>
                        <Button type="primary" size="large" className={publicstyle.button + " " + styles.button}
                                onClick={this.handleSubmit.bind(this)} loading={this.state.loading}>
                            保存
                        </Button>
                        <Button size="large" className={publicstyle.button + " " + styles.button} onClick={this.cancel}>
                            取消
                        </Button>
                    </dl>

				</div>


			</div>

		)
	}
}
export default Addstaff;

