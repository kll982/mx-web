import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Button, Icon, Tree, Table, Tag, Input, Modal, message, Row, Col, Select, Pagination, TreeSelect } from "antd";
import { NONAME } from "dns";

// less
import MaritimeAffairs from "../MaritimeAffairs/MaritimeAffairs.less"
import publicstyle from "../../img/public.less";
import stylez from '../../container/index.less';
import report from "../report/report.less";
import styles2 from "../admin/index.less";
import styles from '../businessmanage/departmentsetNew.less';
import PageStyles from "../stastics/taskIndex.less";

// ajax
import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";

// img
import companypng from "../../img/company.png"
import departmentpng from "../../img/department.png"
import emppng from "../../img/emp.png"
import editIcon from "../../img/editIcon.png"
import closeIcon from "../../img/closeIcon.png"
import addMember from "../../img/addMember.png"
import deparmentSort from "../../img/deparmentSort.png"
import recoveryMember from "../../img/recoveryMember.png"
import stopMember from "../../img/stopMember.png"

const TreeNode = Tree.TreeNode, confirm = Modal.confirm, Option = Select.Option, TextArea = Input.TextArea, TreeOption = TreeSelect.TreeNode;

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
let self, userInfo, userCode, propsData;

export default class Department extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            leftShowWidth: 308,
            leftHiddenWidth: 0,
            leftShow: false,
            rightWidth: "100%",
            departArr: [{
                id: 1,
                name: "江苏省地方海事局",
            }],
            selectedKeys: ["1"],
            selectDepartmentName: "",
            selectDepartmentShortName: "",
            treesData: [{}],
            inputVisible: false,
            inputValue: '',
            role: [],
            allDepartment: [],
            memberName: "",
            editAllDepartment: [],
            tableParent: 1,
        }
    }
    // 挂载前
    componentWillMount() {
        userInfo = JSON.parse(localStorage.getItem("userInfo"));
        userCode = localStorage.getItem("userCode");
        propsData = this.props.location.state;

        this.getMemberRole();
        this.changeWidth();
        if (propsData == null) {
            this.setState({
                userInfo: userInfo,
                userCode: userCode
            }, () => {
                this.treeData();
            })
        } else {
            this.setState({
                userInfo: userInfo,
                userCode: userCode,
                selectedKeys: [propsData.msaId + ""],
            }, () => {
                this.treeData([propsData.msaId + ""]);
            })
        }

    }
    // 挂载后
    componentDidMount() {
        window.addEventListener('resize', this.changeWindowWidth) //监听窗口大小改变
    }
    // 获取dom
    componentWillUnmount() {
        //移除监听
        window.removeEventListener('resize', this.changeWindowWidth)
    }
    // 左侧宽度
    changeWidth() {
        var clientWidth = document.body.clientWidth;
        // 减 菜单栏宽度 减 左右padding 减左侧宽度
        if (this.state.leftShow == true) {
            var rightWidth = clientWidth - 200 - 15;
            this.setState({
                rightWidth: rightWidth,
                leftShow: false
            })
        } else {
            var rightWidth = clientWidth - 200 - 15 - self.state.leftShowWidth;
            this.setState({
                rightWidth: rightWidth,
                leftShow: true,
            })
        }
    }
    // 窗口大小
    changeWindowWidth() {
        var clientWidth = document.body.clientWidth;
        // 减 菜单栏宽度 减 左右padding 减左侧宽度
        if (self.state.leftShow == true) {
            var rightWidth = clientWidth - 200 - 15 - self.state.leftShowWidth;
            self.setState({
                rightWidth: rightWidth,
            })
        } else {
            var rightWidth = clientWidth - 200 - 15;
            self.setState({
                rightWidth: rightWidth,
            })
        }
    }
    // 树状图
    treeData(values) {
        $jsonp3(self, api.getAllCompanyDepartmentTreeInUse, {})
            .then((res) => {
                // let treesData = res.data.response.MsaInfoList;
                let treesData = res.data.response.companyDepartmentList;
                this.setState({
                    departArr: treesData,
                });
                if (treesData[0].children && (treesData[0].children != null || treesData[0].children != "")) {
                    let ee = JSON.stringify(treesData[0]);
                    let ee1 = JSON.parse(ee);
                    let data = [];
                    if (ee1) {
                        ee1.children = "";
                        ee1.key = 1;
                        data = [ee1];
                    }

                    let departCord = treesData[0].code;

                    let buttonsVisibily;
                    if (departCord.match(this.state.userCode) == null) {
                        buttonsVisibily = false
                    } else {
                        buttonsVisibily = true
                    }
                    let visi = buttonsVisibily ? "inline-block" : "none"
                    let addCompanyButton = true;
                    if (ee1.nodeType == 4) {
                        addCompanyButton = false
                    }
                    self.setState({
                        tableParent: treesData[0].id,
                        treesData: data,
                        selectDepartmentName: treesData[0].name,
                        selectedKeys: [treesData[0].id.toString()],
                        addCompanyButton: addCompanyButton,
                        selectCompanyName: treesData[0].name,
                        selectCompanyShortName: treesData[0].shortName,
                        selectCompanyAddress: treesData[0].address,
                        buttonsVisibily: buttonsVisibily,
                        visi,
                    }, () => {
                        self.getMsaInfo();
                        if (values) {
                            self.SelectDepartment(values)
                        } else {
                            self.SelectDepartment(this.state.selectedKeys)
                        }
                    });
                }
            });
    }
    // 当前登录用户的部门及以下部门

    // 选择部门
    SelectDepartment(value) {
        this.resetSeachMember()
        if (value.length == 0) {
            self.getMsaInfo();
            self.seachMember();
            return
        } else {
            var arr1 = [];
            e1(arr1, value[0], self.state.departArr);
            if (!arr1[0].children) {
                var data = [];
            } else {
                var ee = JSON.stringify(arr1[0]);
                var ee1 = JSON.parse(ee);

                ee1.children = "";
                ee1.key = 1;
                var data = [ee1];

            }
            let addCompanyButton = true;
            if (ee1.nodeType == 4) {
                addCompanyButton = false
            }
            let departCord = arr1[0].code;

            let buttonsVisibily;
            if (departCord.match(this.state.userCode) == null) {
                buttonsVisibily = false
            } else {
                buttonsVisibily = true
            }
            let visi = buttonsVisibily ? "inline-block" : "none"
            self.setState({
                tableParent: arr1[0].id,
                treesData: data,
                selectedKeys: value,
                arr1Show: arr1,
                selectDepartmentName: arr1[0].name,
                code: arr1[0].code,
                addCompanyButton: addCompanyButton,
                selectCompanyName: arr1[0].name,
                selectCompanyShortName: arr1[0].shortName,
                selectCompanyAddress: arr1[0].address,
                buttonsVisibily: buttonsVisibily,
                visi,
            }, () => {
                self.getMsaInfo();
                self.seachMember();
            })
        }
    }
    // 获取海事部门科室信息
    getMsaInfo() {
        $jsonp3(self, api.listAllDeptByMsaId, {
            msaId: self.state.tableParent,
        }).then((res) => {
            let list = res.data.response.list, data = this.state.treesData;
            data[0].department = list;
            $jsonp3(self, api.getEmployeeCount, {
                id: self.state.tableParent,
            }).then((res) => {
                data[0].count = res.data.response.count;
                let chooseAddMemberDepartmentNone;
                if (list.length == 0) {
                    chooseAddMemberDepartmentNone = true;
                } else {
                    chooseAddMemberDepartmentNone = false;
                }
                self.setState({
                    allDepartment: list,
                    treesData: data,
                    chooseAddMemberDepartmentNone: chooseAddMemberDepartmentNone,
                }, function () {
                    self.firstTableData();
                })
            })
        })
    }
    // 获取人员信息
    getMemberInfo(page) {
        $jsonp3(self, api.getCompanyEmployeeByPage, {
            departmentId: self.state.tableParent,//部门ID
            account: "",//用户名
            deptId: this.state.searchMemberCompany,//科室ID
            name: self.trim(this.state.memberName),//姓名
            code: self.state.code,//部门ID
            roleId: this.state.searchMemberRole,//系统角色
            jobStatus: this.state.searchMemberStatus,//工作状态：-1：离职 0：停用 1：在职
            pageNo: page,
            pageSize: "10",
        }).then(res => {
            self.setState({
                memberData: res.data.response.companyEmployeeList,
                page: res.data.response.page,
            }, function () {
                self.secondTableData();
            })
        })
    }
    // 删除科室
    deleteDepartment(record, id) {
        confirm({
            title: '删除',
            content: '确定删除当前科室吗？', okText: "确认",
            // cancelText: "取消",
            okType: 'danger',
            onOk() {
                $jsonppost(self, api.deleteDept, {
                    deptId: id
                }).then((res) => {
                    if (res.code == 200) {
                        self.setState({
                            ["tags" + record.id + "-" + id]: false
                        })
                        message.success("删除成功")
                    }
                })
            },
            onCancel() {
            },
        });
    }

    // 海事局基本信息
    firstTableData() {
        self.setState({
            firstTableColumns: [{
                title: "海事局名称",
                dataIndex: 'name',
                key: 'name1',
                className: publicstyle.center,
            }, {
                title: "辖区",
                dataIndex: 'shortName',
                key: 'shortName1',
                className: publicstyle.center,
            }, {
                title: "科室",
                dataIndex: 'department',
                key: 'department1',
                width:"15%",
                className: publicstyle.center,
                render: (text, record, index) => {
                    if (record.department != undefined && record.department.length == 0) {
                        return <Link style={{ display: this.state.visi, textDecoration: "underline", float: "left" }} to={{ pathname: "main/addDepartment", state: { msaId: record.id, MsaName: this.state.selectDepartmentName } }}>编辑科室</Link>
                    } else if (record.department != undefined && record.department.length > 0) {
                        return <div style={{ textAlign: "left" }}>
                            {record.department.map((item, index) => {
                                return item.name
                                // return <Tag key={item.id} style={{ display: (this.state["tags" + record.id + "-" + item.id] != false) ? "inline-block" : "none" }}
                                //     onClick={this.deleteDepartment.bind(this, record, item.id, index)}>{item.name} <Icon type="edit" /> </Tag>
                            }).join("、")
                            }
                            <p><Link style={{ display: this.state.visi }} to={{ pathname: "main/addDepartment", state: { msaId: record.id, MsaName: this.state.selectDepartmentName } }}><u>编辑科室</u></Link></p>
                        </div >
                    }
                }
            }, {
                title: "在职人员",
                dataIndex: 'count',
                key: 'count1',
                className: publicstyle.center,
            },
            {
                title: "地址",
                dataIndex: 'address',
                key: 'address1',
                className: publicstyle.center,
            }, {
                title: "海事局状态",
                dataIndex: 'status',
                key: 'status1',
                className: publicstyle.center,
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
                key: 'action1',
                className: publicstyle.center,
                render: (text, record, index) => {
                    if (record.nodeType == 1) { var edittype = "editCompany"; }
                    else if (record.nodeType == 2) { var edittype = "editDepartment"; }
                    else if (record.nodeType == 3) { var edittype = "editDuty"; }
                    else if (record.nodeType == 4) { var edittype = "editRank"; }
                    // if (record.status == 0) {
                    return <div style={{ textAlign: "center", cursor: "pointer", display: this.state.visi }}>
                        <button className={MaritimeAffairs.BlueButton12} type="primary" style={{ margin: "0px 10px 10px 0px" }} onClick={this.editCompany.bind(this, record, edittype)} disabled={(record.status == 0) ? true : false}>编辑</button>
                        <button className={MaritimeAffairs.BlueButton12} style={{ margin: "0px 10px 10px 0px", background: (record.status == 1) ? "#F0BD31" : "#5ecf8b" }} onClick={this.stopCompany.bind(this, record)}>删除</button>
                        <button className={MaritimeAffairs.BlueButton12} style={{ margin: "0px 10px 10px 0px", display: this.state.addCompanyButton == true ? "inline-block" : "none" }} onClick={this.addCompany.bind(this, record)}>+ 下级海事部门</button>

                    </div>

                },
            }]
        })
    }
    // 新增下级海事部门
    addCompany(record) {
        if (record.nodeType == 4) {
            this.setState({
                addCompanyButton: false
            })
        }
        this.setState({
            addCompany: true,
            addCompanyName: "",
            addCompanyShortName: "",
            addCompanyAddress: "",
        })

    }
    // 编辑部门信息
    editCompany() {
        this.setState({
            editCompany: true,
            editCompanyName: this.state.selectCompanyName,
            editCompanyShortName: this.state.selectCompanyShortName,
            editCompanyAddress: this.state.selectCompanyAddress,
        })
    }
    // 停用部门
    stopCompany = () => {
        confirm({
            title: '删除',
            content: '确定删除当前海事部门吗？', okText: "确认",
            // cancelText: "取消",
            okType: 'danger',
            onOk() {
                $jsonp3(self, api.enableOrDisable, {
                    id: self.state.tableParent,
                    type: self.state.treesData[0].nodeType,
                    parId: self.state.treesData[0].parId,
                    status: 0,
                }).then(res => {
                    if (res.code == 200) {
                        self.treeData();
                    }
                })
            },
            onCancel() {
            },
        });
        // enableOrDisable
    }
    // 第二个表格数据
    secondTableData() {
        self.setState({
            secondTableColumns: [{
                title: "科室",
                dataIndex: 'deptName',
                key: 'deptName2',
                className: publicstyle.center,
            }, {
                title: "人员姓名",
                dataIndex: 'name',
                key: 'name2',
                className: publicstyle.center,
            }, {
                title: "执法证编号",
                dataIndex: 'certificateCode',
                key: 'certificateCode',
                className: publicstyle.center,
            },
            {
                title: "系统角色",
                dataIndex: 'roleName',
                key: 'roleName2',
                className: publicstyle.center,
            }, {
                title: "手机号",
                dataIndex: 'mobile',
                key: 'mobile2',
                className: publicstyle.center,
            }, {
                title: "用户名",
                dataIndex: 'account',
                key: 'account2',
                className: publicstyle.center,
            }, {
                title: "人员状态",
                dataIndex: 'jobStatus',
                key: 'jobStatus2',
                className: publicstyle.center,
                render: (text, record, index) => {
                    if (record.jobStatus == 1) {
                        return <Tag color="blue">在职</Tag>
                    }
                    else if (record.jobStatus == -1) {
                        return <Tag>离职</Tag>
                    }
                    else if (record.jobStatus == 0) {
                        return <Tag color="red">停用</Tag>
                    }
                }
            }, {
                title: "操作",
                dataIndex: 'status',
                key: 'status2',
                className: publicstyle.center,
                render: (text, record, index) => {
                    if (record.jobStatus == 1) {
                        return <div>
                            <button className={MaritimeAffairs.BlueButton12} type="primary" onClick={this.editMember.bind(this, record)} style={{ margin: "0px 10px 10px 0px", display: this.state.visi }}>编辑</button>
                            <button className={MaritimeAffairs.BlueButton12} style={{ background: "#F0BD31", margin: "0px 10px 10px 0px", display: this.state.visi }} onClick={this.suspension.bind(this, record)}>停用</button>
                        </div>
                    }
                    else if (record.jobStatus == -1) {
                        return ""
                    }
                    else if (record.jobStatus == 0) {
                        return <div>
                            <button className={MaritimeAffairs.BlueButton12} type="primary" onClick={this.editMember.bind(this, record)} style={{ margin: "0px 10px 10px 0px", display: this.state.visi }}>编辑</button>
                            <button className={MaritimeAffairs.BlueButton12} type="primary" style={{ margin: "0px 10px 10px 0px", display: this.state.visi }} onClick={this.suspension.bind(this, record)}>在用</button>
                        </div>
                    }

                }
            },]
        })
    }

    // 首页
    toFirst() {
        this.seachMember();
    }
    // 页面跳转
    onPageChange(page) {
        this.getMemberInfo(page)
    }
    // 尾页
    toLast() {
        this.getMemberInfo(this.state.page.pages)
    }
    // 新增海事局名称
    changeAddCompanyName(e) {
        this.setState({
            addCompanyName: e.target.value
        })
    }
    // 新增海事局辖区
    changeAddCompanyShortName(e) {
        this.setState({
            addCompanyShortName: e.target.value
        })
    }
    // 新增海事局地址
    changeAddCompanyAddress(e) {
        this.setState({
            addCompanyAddress: e.target.value
        })
    }
    // 确认 新增海事局
    addCompanyModel() {
        if (!this.state.addCompanyName) {
            return message.error("请填写海事部门名称")
        }
        if (!this.state.addCompanyShortName) {
            return message.error("请填写辖区")
        }

        $jsonp3(self, api.addCompanyDepartment, {
            name: this.state.addCompanyName,
            shortName: self.trim(this.state.addCompanyShortName),
            parId: this.state.treesData[0].id,
            parCode: this.state.treesData[0].code,
            level: this.state.treesData[0].level + 1,
            nodeType: Number(this.state.treesData[0].nodeType) + 1,
            orderNum: this.state.treesData[0].orderNum,
            address: this.state.addCompanyAddress,
        }).then(res => {
            if (res.code == 200) {
                message.success("新增部门成功");
                let MsaId = this.state.selectedKeys;
                self.treeData(MsaId);
            }
            this.setState({
                addCompany: false
            })
        })
        return

    }
    // 关闭 新增海事局
    hideAddCompanyModel() {
        this.setState({
            addCompany: false
        })

    }
    // 去除首尾空格
    trim = (str) => { //删除左右两端的空格
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    // 编辑海事局名称
    changeEditCompanyName(e) {
        this.setState({
            editCompanyName: e.target.value
        })
    }
    // 编辑海事局辖区
    changeEditCompanyShortName(e) {
        this.setState({
            editCompanyShortName: e.target.value
        })
    }
    // 编辑海事局地址
    changeEditCompanyAddress(e) {
        this.setState({
            editCompanyAddress: e.target.value
        })
    }
    // 确认 编辑海事局
    editCompanyModel() {
        if (!this.state.editCompanyName) {
            return message.error("请填写海事部门名称")
        }
        if (!this.state.editCompanyShortName) {
            return message.error("请填写辖区")
        }
        $jsonp3(self, api.upDateCompanyDepartment, {
            id: this.state.tableParent,
            name: this.state.editCompanyName,
            shortName: self.trim(this.state.editCompanyShortName),
            parId: this.state.treesData[0].parId,
            level: this.state.treesData[0].level,
            nodeType: this.state.treesData[0].nodeType,
            address: this.state.editCompanyAddress,
        }).then(res => {
            self.setState({
                editCompany: false
            })
            if (res.code == 200) {
                message.success("修改信息成功");
                let MsaId = this.state.selectedKeys;
                self.treeData(MsaId);

            }
        })
        return

    }
    // 关闭 编辑海事局
    hideEditCompanyModel() {
        this.setState({
            editCompany: false
        })

    }
    // 点击 添加人员
    addMember() {
        this.setState({
            addMemberVisibitity: true,
            AddMemberDepartment: "",
            selectAddMemberABCName: "",
            selectAddMemberName: "",
            selectAddMemberMobileNumber: "",
            AddMemberABCName: "",
            AddMemberName: "",
            AddMemberMobileNumber: "",
            AddMemberRole: "",
            addCertificateCode: "",
        })
    }
    // 确认 添加人员
    addMemberModal() {


        if (this.state.AddMemberName == "") {
            return message.error("请输入正确的人员姓名")

        }

        if (this.state.AddMemberABCName == "") {
            return message.error("用户名必须字母开头，长度2-16，允许字母数字下划线");

        }

        if (this.state.AddMemberMobileNumber == "") {
            return message.error("请输入正确的手机号")

        }
        if (this.state.AddMemberDepartment == "") {
            if (this.state.allDepartment.length == 0) {
                return message.error("请先添加科室,再选择科室")
            }
            return message.error("请选择人员所属科室")
        }

        if (!!this.state.addCertificateCode && !/^\d{10}$/.test(this.state.addCertificateCode)) {
            return message.error("请输入10位执法证编号")
        }

        if (this.state.AddMemberRole == "") {
            return message.error("请选择人员的系统角色")

        }
        $jsonp(self, api.addCompanyEmployee, {
            account: this.state.AddMemberABCName,
            mobile: this.state.AddMemberMobileNumber,
            name: this.state.AddMemberName,
            departmentId: this.state.tableParent,
            departmentName: this.state.selectDepartmentName,
            roleId: this.state.AddMemberRole,
            deptId: this.state.AddMemberDepartment,
            certificateCode: this.state.addCertificateCode,
        }).then((res) => {
            if (res.code == 200) {
                message.success("添加成功")
                self.seachMember();
                self.setState({
                    addMemberVisibitity: false
                })
            }
        }).catch((error) => {
            this.setState({
                addMemberVisibitity: false
            })
        })
    }
    // 关闭 添加人员
    hideAddMemberModal() {
        this.setState({
            addMemberVisibitity: false
        })
    }
    // 选择新添加人员的科室
    chooseAddMemberDepartment(value) {
        this.setState({
            AddMemberDepartment: value,
        })
    }

    // 添加人员 执法证编号
    changeAddCertificateCode(e) {
        this.setState({
            addCertificateCode: e.target.value
        })
    }

    // 选择新添加人员的系统角色
    selectAddMemberRole(value) {
        this.setState({
            AddMemberRole: value,
        })
    }
    // 填写新增人员的用户名
    ChangeAddMemberABCName(e) {
        var isNormalAccount = /[a-zA-Z][a-zA-Z0-9_]{1,15}/g;
        var isNormalAccount1 = isNormalAccount.test(e.target.value);
        this.setState({
            selectAddMemberABCName: e.target.value,
        })
        if (isNormalAccount1) {
            this.setState({
                AddMemberABCName: e.target.value,
            })
            return
        }
    }
    // 填写新增人员的姓名
    ChangeAddMemberName(e) {
        var specialText = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\s]/g;
        this.setState({
            AddMemberName: e.target.value,
        })
        if (!specialText.test(e.target.value)) {
            this.setState({
                selectAddMemberName: e.target.value,
            })
        }
    }

    // 填写新增人员的手机号
    ChangeAddMemberMobileNumber = (e) => {
        this.setState({
            selectAddMemberMobileNumber: e.target.value,
        })
        if (e.target.value.length == 11 && (/^1[345789]\d{9}$/.test(e.target.value))) {
            this.setState({
                AddMemberMobileNumber: e.target.value,
            })
        }
    }
    // 编辑
    // 点击 编辑人员
    editMember(record) {
        this.setState({
            editMemberVisibitity: true,
            editMemberRecord: record,
            editMemberName: record.name,
            editMemberABCName: record.account,
            editMemberMobile: record.mobile,
            editMemberDepartmentName: record.deptName,
            editMemberDepartmentName1: "",
            editMemberRoleId: record.roleId,
            editMemberRoleName: record.roleName,
            editMemberId: record.id,
            editMemberDepartmentId: record.deptId,
            editMemberMsaName: record.departmentName,
            editMemberMsaId: record.departmentId,
            selectEditMemberMobile: record.mobile,
            editCertificateCode: record.certificateCode,
            editAllDepartment: this.state.allDepartment,
        }, () => {
            this.SelectEditMsa(record.departmentId + "=" + record.departmentName + "=" + record.nodeType);
        })
    }
    // 人员姓名
    ChangeEditMemberName(e) {
        this.setState({
            editMemberName: e.target.value,
        })
    }
    // 手机号
    ChangeEditMemberMobileNumber(e) {
        this.setState({
            selectEditMemberMobile: e.target.value,
        })
        if (e.target.value.length == 11 && (/^1[345789]\d{9}$/.test(e.target.value))) {
            this.setState({
                editMemberMobile: e.target.value,
            })
        }
    }
    // 所属海事局
    SelectEditMsa(value) {
        this.setState({
            editMemberMsaName: value.split("=")[1],
            editMemberMsaId: value.split("=")[0],
            editMemberNodeType: value.split("=")[2],
            editAllDepartment: [],
            editMemberMsaInfo: value,
            editMemberRoleName:"",
            editMemberRoleId:"",
        }, () => {
            this.getEditDepartmentNone(value.split("=")[0]);
        })

    }
    // 获取所属科室
    getEditDepartmentNone(id) {
        $jsonp3(self, api.listAllDeptByMsaId, {
            msaId: id,
        }).then((res) => {
            let list = res.data.response.list, chooseEditMemberDepartmentNone, editMemberDepartmentName;
            if (list.length == 0) {
                chooseEditMemberDepartmentNone = true;
                editMemberDepartmentName = "未添加科室，请先添加"
            } else {
                chooseEditMemberDepartmentNone = false;
                editMemberDepartmentName = this.state.editMemberDepartmentName;
            }
            this.setState({
                editAllDepartment: list,
                chooseEditMemberDepartmentNone: chooseEditMemberDepartmentNone,
                editMemberDepartmentName1: editMemberDepartmentName,
            })
        })
    }
    // 所属科室
    chooseEditMemberDepartment(value) {
        this.setState({
            editMemberDepartmentId: value,
            editMemberDepartmentName: value, 
            editMemberDepartmentName1: value,
        })
    }
    // 系统角色
    selectEditMemberRole(value) {
        this.setState({
            editMemberRoleId: value,
            editMemberRoleName: value,
        })
    }
    changeEditCertificateCode(e) {
        this.setState({
            editCertificateCode: e.target.value,
        })
    }
    // 关闭 编辑人员
    hideEditMember() {
        this.setState({
            editMemberVisibitity: false
        })
    }
    // 确认编辑
    editMemberModel() {

        if (this.state.editMemberName == "") {
            return message.error("请输入正确的人员姓名")
        }
        if (!/^1[345789]\d{9}$/.test(this.state.selectEditMemberMobile)) {
            return message.error("请输入正确的手机号")
        }
        if (this.state.editMemberDepartmentId == "") {
            if (this.state.editAllDepartment.length == 0) {
                return message.error("请先添加科室,再选择科室")
            }
            return message.error("请选择人员所属科室")
        }

        if (!!this.state.editCertificateCode && !/^\d{10}$/.test(this.state.editCertificateCode)) {
            return message.error("请输入10位执法证编号")
        }

        if (this.state.editMemberRoleId == "") {
            return message.error("请选择人员的系统角色")
        }
        $jsonp(self, api.upDateCompanyEmployee, {
            id: this.state.editMemberId,
            account: this.state.editMemberABCName,
            mobile: this.state.selectEditMemberMobile,
            name: this.state.editMemberName,
            departmentId: this.state.editMemberMsaId,
            departmentName: this.state.editMemberMsaName,
            roleId: this.state.editMemberRoleId,
            deptId: this.state.editMemberDepartmentId,
            certificateCode: this.state.editCertificateCode,
        }).then((res) => {
            if (res.code == 200) {
                message.success("修改成功")
                self.seachMember();
                self.setState({
                    editMemberVisibitity: false
                })
            }
        }).catch((error) => {
            // this.setState({
            //     editMemberVisibitity: false
            // })
        })

    }

    // 查询
    // 人员姓名
    changMemberName(e) {
        this.setState({
            memberName: e.target.value
        })
    }
    // 科室
    memberCompany(value) {
        this.setState({
            searchMemberCompany: value
        })
    }
    // 获取系统角色
    getMemberRole() {
        $jsonp(self, api.getAll, {}).then((res) => {
            var list = res.data.response.allRoleList;
            this.setState({
                role: list
            });
        });
    }
    // 系统角色
    memberRole(value) {
        this.setState({
            searchMemberRole: value
        })
    }
    // 人员状态
    memberStatus(value) {
        this.setState({
            searchMemberStatus: value
        })
    }
    // 查询
    seachMember() {
        this.getMemberInfo(1);
    }
    // 重置
    resetSeachMember() {
        this.setState({
            memberName: "",
            searchMemberCompany: "",
            searchMemberRole: "",
            searchMemberStatus: "",
        }, () => {
            this.getMemberInfo(1);
        })
    }
    // 停用、在用
    suspension(record) {
        let memberStatus, changeStatus;
        if (record.jobStatus == 1) {
            memberStatus = "停用<" + record.name + ">吗？";
            changeStatus = 0;
        }
        else if (record.jobStatus == 0) {
            memberStatus = "在用<" + record.name + ">吗？";
            changeStatus = 1;
        }
        Modal.confirm({
            content: `确定${memberStatus}`,
            onOk: function () {
                $jsonp(self, api.upDateJobStatus, {
                    id: record.id,
                    account: record.mobile,
                    jobStatus: changeStatus,
                }).then((res) => {
                    if (res.code == 200) {
                        self.getMemberInfo(self.state.page.pageNum);
                    }
                });
            }
        });
    }
    // 海事部门排序
    ChangeOrder(selectedKeys) {
        var arr1 = [];
        e1(arr1, selectedKeys[0], this.state.departArr);
        sessionStorage.setItem("departmentorder", JSON.stringify(this.state.departArr));
        hashHistory.push({
            pathname: '/main/departmentorder'
        })

    }
    // 渲染
    render() {
        let styleObj = { display: 'inline-block !important' };
        let styleObj2 = { display: 'none !important' };
        var visi = this.state.buttonsVisibily ? "inline-block" : "none"

        const loop = data => data.map(item => {
            if (item.children && item.children.length != 0) {
                // icon
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
                    ptitle = <span>&emsp;{itemName}</span>;
                }
                return <TreeNode title={ptitle} key={item.id} className={item.status == 0 ? styles.red : ""} value={item.id + ""}>{loop(item.children)}</TreeNode>;
            } else {
                var itemName = item.name;
                if (itemName.length > 25) { itemName = itemName.substring(0, 25) + "..."; }
                if (item.nodeType == 1) {
                    ptitle = <span><img src={companypng} className={styles.qicon} />{itemName}</span>;
                } else if (item.nodeType == 2) {
                    ptitle = <span><img src={departmentpng} className={styles.qicon} />{itemName}</span>;
                } else if (item.nodeType == 3) {
                    ptitle = <span><img src={emppng} className={styles.qicon} />{itemName}</span>;
                } else if (item.nodeType == 4) {
                    ptitle = <span>&emsp;{itemName}</span>;
                }
                return <TreeNode title={ptitle} key={item.id} className={item.status == 0 ? styles.red : ""} selectable={item.status == 1} style={{ display: (item.status == 0 ? "none" : "block") }} value={item.id + ""} />
            }
        })
        const loop1 = data => data.map(item => {
            if (item.children && item.children.length != 0) {
                // icon
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
                    ptitle = <span>&emsp;{itemName}</span>;
                }
                return <TreeOption title={ptitle} key={item.id} className={item.status == 0 ? styles.red : ""} value={item.id + "=" + itemName + "=" + item.nodeType}>{loop1(item.children)}</TreeOption>;
            } else {
                var itemName = item.name;
                if (itemName.length > 25) { itemName = itemName.substring(0, 25) + "..."; }
                if (item.nodeType == 1) {
                    ptitle = <span><img src={companypng} className={styles.qicon} />{itemName}</span>;
                } else if (item.nodeType == 2) {
                    ptitle = <span><img src={departmentpng} className={styles.qicon} />{itemName}</span>;
                } else if (item.nodeType == 3) {
                    ptitle = <span><img src={emppng} className={styles.qicon} />{itemName}</span>;
                } else if (item.nodeType == 4) {
                    ptitle = <span>&emsp;{itemName}</span>;
                }
                return <TreeOption title={ptitle} key={item.id} className={item.status == 0 ? styles.red : ""} selectable={item.status == 1} style={{ display: (item.status == 0 ? "none" : "block") }} value={item.id + "=" + itemName + "=" + item.nodeType} />
            }
        })

        return (
            <div style={{ height: "100%", overflow: "hidden", position: "relative" }}>
                {/* <Breadcrumb separator=">" style={{ textAlign: "left", padding: "15px 0px 0px 15px", zIndex: 1 }}>
                    <Breadcrumb.Item><Link to="/main/department">部门管理</Link></Breadcrumb.Item>
                </Breadcrumb> */}
                {/* <div className={publicstyle.clearfloat}></div> */}
                <div style={{ height: "100%", position: "relative", backgroundColor: "#F7F7F7" }}>
                    {/* button */}
                    <div className={MaritimeAffairs.leftButtonWrap} style={{ left: this.state.leftShow == true ? this.state.leftShowWidth : this.state.leftHiddenWidth }} onClick={this.changeWidth.bind(this)}>
                        <Icon type={this.state.leftShow == true ? "right" : "left"} />
                    </div>
                    {/* left */}
                    <div className={MaritimeAffairs.leftWidth} style={{ left: this.state.leftShow == true ? this.state.leftHiddenWidth : -(this.state.leftShowWidth), paddingBottom: 120 }}>
                        {/* 树状图 */}
                        <Tree
                            defaultExpandedKeys={[this.state.departArr[0].id.toString()]}
                            //     defaultSelectedKeys={[this.state.departArr[0].id.toString()]}
                            // defaultExpandedKeys={this.state.selectedKeys}
                            defaultSelectedKeys={this.state.selectedKeys}
                            onSelect={this.SelectDepartment.bind(this)}
                        >
                            {loop(this.state.departArr)}
                        </Tree>
                        <Button style={{ position: "fixed", left: 240, bottom: 24, background: "linear-gradient(128deg,rgba(47,141,235,1) 0%,rgba(61,125,235,1) 100%)", color: "#fff", padding: "0px 24px" }} onClick={this.ChangeOrder.bind(this, self.state.selectedKeys)}>
                            <img style={{ display: "inline-block", verticalAlign: "middle" }} src={deparmentSort} />
                            <span style={{ display: "inline-block", verticalAlign: "middle" }}>&ensp;海事部门排序</span>
                        </Button>
                    </div>
                    {/* right */}
                    <div className={MaritimeAffairs.rightWidth} style={{ width: this.state.rightWidth }}>
                        <div className={MaritimeAffairs.cardWrap}>
                            <div className={MaritimeAffairs.cardTitle}>
                                {this.state.selectDepartmentName}
                            </div>
                            {this.state.departArr && this.state.selectedKeys.length > 0 ?
                                <Table className={MaritimeAffairs.Table} rowKey={record => record.key} style={{ width: "100%", }} columns={this.state.firstTableColumns} dataSource={this.state.treesData} pagination={false} />
                                : ""}
                        </div>
                        <div className={MaritimeAffairs.cardWrap}>
                            <div className={MaritimeAffairs.cardTitle}>
                                人员管理
                                <button className={MaritimeAffairs.cardTitleRightItem + " " + MaritimeAffairs.BlueButton12} style={{ display: visi }} onClick={this.addMember.bind(this)}>
                                    + 添加人员</button>
                            </div>
                            <Row>
                                <Col span="6" className={MaritimeAffairs.searchGroup}>人员姓名&emsp;<Input onChange={this.changMemberName.bind(this)} value={this.state.memberName}></Input></Col>
                                <Col span="6" className={MaritimeAffairs.searchGroup}>科室&emsp;
                                <Select onSelect={this.memberCompany.bind(this)} value={this.state.searchMemberCompany}>
                                        {
                                            this.state.allDepartment.map((item, index) => {
                                                return <Option key={index} value={item.id + ""} disabled={item.status == 1}>{item.name}</Option>
                                            })
                                        }
                                    </Select>
                                </Col>
                                <Col span="6" className={MaritimeAffairs.searchGroup}>系统角色&emsp;

                                <Select onSelect={this.memberRole.bind(this)} value={this.state.searchMemberRole}>
                                        {
                                            this.state.role.map((item, index) => {
                                                return <Option key={index} value={item.id + ""} disabled={item.status == 1} >{item.name}</Option>
                                            })
                                        }
                                    </Select>
                                </Col>
                                <Col span="6" className={MaritimeAffairs.searchGroup}>人员状态&emsp;

                                <Select onSelect={this.memberStatus.bind(this)} value={this.state.searchMemberStatus}>
                                        <Option value={"1"}>在职</Option>
                                        <Option value={"0"}>停用</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row style={{ padding: "18px 0px 40px" }}>
                                <Button onClick={this.seachMember.bind(this)} type="primary">查询</Button>&emsp;
                                <Button onClick={this.resetSeachMember.bind(this)}>重置</Button>
                            </Row>
                            {this.state.memberData ?
                                <div>
                                    <Table className={MaritimeAffairs.Table} rowKey={record => record.id} style={{ width: "100%", }} columns={this.state.secondTableColumns} dataSource={this.state.memberData} pagination={false} />
                                    <div className={PageStyles.pageFlex}>
                                        <span className={PageStyles.pageWrap}>
                                            <Button type="primary" className={PageStyles.pageFirst}
                                                style={{ display: this.state.page.pages > 0 ? "block" : "none", float: "left" }}
                                                onClick={this.toFirst.bind(this)}>首页</Button>
                                            <Pagination className={PageStyles.page}
                                                style={{ display: this.state.page.pages > 0 ? "flex" : "none", float: "left" }}
                                                onChange={this.onPageChange.bind(this)} showFISRT
                                                current={this.state.page.pageNum}
                                                pageSize={this.state.page.pageSize} total={this.state.page.total} />
                                            <Button type="primary" className={PageStyles.pageLast}
                                                style={{ display: this.state.page.pages > 0 ? "block" : "none", float: "left" }}
                                                onClick={this.toLast.bind(this)}>末页</Button>
                                        </span>
                                    </div>
                                </div>
                                : ""}
                        </div>

                        {/* 新增海事局 */}
                        <Modal
                            title="新增下级海事部门"
                            visible={this.state.addCompany}
                            onOk={this.addCompanyModel.bind(this)}
                            onCancel={this.hideAddCompanyModel.bind(this)}
                            okText="确认"
                            cancelText="取消"
                            className={MaritimeAffairs.Model}
                        >
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>海事部门名称：</dt>
                                <dd><Input onChange={this.changeAddCompanyName.bind(this)} value={this.state.addCompanyName} /></dd>
                            </dl>
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>辖区：</dt>
                                <dd><Input onChange={this.changeAddCompanyShortName.bind(this)} value={this.state.addCompanyShortName}></Input></dd>
                            </dl>
                            <dl>
                                <dt>地址：</dt>
                                <dd>
                                    <TextArea onChange={this.changeAddCompanyAddress.bind(this)} value={this.state.addCompanyAddress}></TextArea>
                                </dd>
                            </dl>
                        </Modal>
                        {/* 编辑海事局 */}
                        <Modal
                            title="编辑海事局"
                            visible={this.state.editCompany}
                            onOk={this.editCompanyModel.bind(this)}
                            onCancel={this.hideEditCompanyModel.bind(this)}
                            okText="确认"
                            cancelText="取消"
                            className={MaritimeAffairs.Model}
                        >
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>海事部门名称：</dt>
                                <dd><Input placeholder={self.state.selectCompanyName} onChange={this.changeEditCompanyName.bind(this)} value={this.state.editCompanyName} /></dd>
                            </dl>
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>辖区：</dt>
                                <dd><Input placeholder={self.state.selectCompanyShortName} onChange={this.changeEditCompanyShortName.bind(this)} value={this.state.editCompanyShortName}></Input></dd>
                            </dl>
                            <dl>
                                <dt>地址：</dt>
                                <dd>
                                    <TextArea placeholder={self.state.selectCompanyAddress} onChange={this.changeEditCompanyAddress.bind(this)} value={this.state.editCompanyAddress}></TextArea>
                                </dd>
                            </dl>
                        </Modal>
                        {/* 添加人员 */}
                        <Modal
                            title="添加人员"
                            visible={this.state.addMemberVisibitity}
                            onOk={this.addMemberModal.bind(this)}
                            onCancel={this.hideAddMemberModal.bind(this)}
                            okText="确认"
                            cancelText="取消"
                            className={MaritimeAffairs.Model}
                        >
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>人员姓名：</dt>
                                <dd><Input onChange={this.ChangeAddMemberName.bind(this)} value={this.state.selectAddMemberName}></Input></dd>
                            </dl>
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>用户名：</dt>
                                <dd><Input onChange={this.ChangeAddMemberABCName.bind(this)} value={this.state.selectAddMemberABCName}></Input></dd>
                            </dl>
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>手机：</dt>
                                <dd><Input onChange={this.ChangeAddMemberMobileNumber.bind(this)} value={this.state.selectAddMemberMobileNumber} maxLength="11"></Input></dd>
                            </dl>
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>所属海事局：</dt>
                                <dd><Input placeholder={self.state.selectCompanyName} value={self.state.selectCompanyName} disabled readOnly></Input></dd>
                            </dl>
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>所属科室：</dt>
                                <dd>
                                    <Select onChange={this.chooseAddMemberDepartment.bind(this)} value={this.state.AddMemberDepartment}
                                        disabled={this.state.chooseAddMemberDepartmentNone}
                                        defaultValue={this.state.chooseAddMemberDepartmentNone ? "未添加科室，请先添加" : null} style={{ color: this.state.chooseAddMemberDepartmentNone ? "red" : "" }}>
                                        {
                                            this.state.chooseAddMemberDepartmentNone ? <Option key={null} value={""}>未添加科室，请先添加</Option> : ""
                                        }
                                        {
                                            this.state.allDepartment.map((item, index) => {
                                                return <Option key={index} value={item.id + ""} disabled={item.status == 1}>{item.name}</Option>
                                            })
                                        }
                                    </Select>
                                </dd>
                            </dl>
                            <dl>
                                <dt>执法证编号：</dt>
                                <dd>
                                    <Input maxLength="10" onChange={this.changeAddCertificateCode.bind(this)} value={this.state.addCertificateCode}></Input>
                                </dd>
                            </dl>
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>系统角色：</dt>
                                <dd>
                                    <Select onSelect={this.selectAddMemberRole.bind(this)} value={this.state.AddMemberRole}>
                                        {
                                            this.state.role.map((item, index) => {
                                                if (item.status == 1 || (item.roleLevel != self.state.treesData[0].nodeType)) {
                                                    return
                                                } else {
                                                    return <Option key={index} value={item.id + ""} disabled={item.status == 1 || (item.roleLevel != self.state.treesData[0].nodeType)} >{item.name}</Option>
                                                }
                                            })
                                        }
                                    </Select>
                                </dd>
                            </dl>
                            <dl>
                                <a href="javaScript:void(0)"><Icon type="exclamation-circle-o" />&emsp;新增人员的默认密码: 123456789</a>
                            </dl>
                        </Modal>
                        {/* 编辑人员 */}
                        <Modal
                            title="编辑人员"
                            visible={this.state.editMemberVisibitity}
                            onOk={this.editMemberModel.bind(this)}
                            onCancel={this.hideEditMember.bind(this)}
                            okText="确认"
                            cancelText="取消"
                            className={MaritimeAffairs.Model}
                        >
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>人员姓名：</dt>
                                <dd><Input onChange={this.ChangeEditMemberName.bind(this)} value={this.state.editMemberName}></Input></dd>
                            </dl>
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>用户名：</dt>
                                <dd><Input value={this.state.editMemberABCName} disabled></Input></dd>
                            </dl>
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>手机：</dt>
                                <dd><Input onChange={this.ChangeEditMemberMobileNumber.bind(this)} value={this.state.selectEditMemberMobile} maxLength="11"></Input></dd>
                            </dl>
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>所属海事局：</dt>
                                <dd>
                                    <TreeSelect
                                        defaultExpandedKeys={[this.state.departArr[0].id.toString()]}
                                        defaultSelectedKeys={[this.state.departArr[0].id.toString()]}
                                        onChange={this.SelectEditMsa.bind(this)}
                                        value={this.state.editMemberMsaName}
                                    >
                                        {loop1(this.state.departArr)}
                                    </TreeSelect>
                                </dd>
                            </dl>
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>所属科室：</dt>
                                <dd>
                                    <Select onChange={this.chooseEditMemberDepartment.bind(this)}
                                        disabled={this.state.chooseEditMemberDepartmentNone}
                                        value={this.state.editMemberDepartmentName1} style={{ color: this.state.chooseEditMemberDepartmentNone ? "red" : "" }} >

                                        {this.state.chooseEditMemberDepartmentNone ?
                                            <Option key={null} value={" "}>未添加科室，请先添加</Option> : ""
                                        }
                                        {
                                            this.state.editAllDepartment.map((item, index) => {
                                                return <Option key={index} value={item.id + ""} disabled={item.status == 1}>{item.name}</Option>
                                            })
                                        }
                                    </Select>


                                </dd>
                            </dl>

                            <dl>
                                <dt>执法证编号：</dt>
                                <dd>
                                    <Input maxLength="10" onChange={this.changeEditCertificateCode.bind(this)} value={this.state.editCertificateCode}></Input>
                                </dd>
                            </dl>
                            <dl>
                                <dt><span className={MaritimeAffairs.must}>*</span>系统角色：</dt>
                                <dd>
                                    <Select onSelect={this.selectEditMemberRole.bind(this)} value={this.state.editMemberRoleName}>
                                        {
                                            this.state.role.map((item, index) => {
                                                if (item.status == 1 || (item.roleLevel != this.state.editMemberNodeType)) {
                                                    return
                                                } else {
                                                    return <Option key={index} value={item.id + ""}>{item.name}</Option>
                                                }
                                            })
                                        }
                                    </Select>
                                </dd>
                            </dl>
                        </Modal>
                    </div>
                </div>

            </div>
        )

    }
}