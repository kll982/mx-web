import React from "react"
import moment from "moment"
import {
    Pagination,
    Table,
    Button,
    Row,
    Col,
    Modal,
    message,
    Icon,
    Checkbox,
    TreeSelect,
    Spin,
    Tree,
    Input,
    Breadcrumb, Select
} from "antd";

const TreeNode1 = TreeSelect.TreeNode;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
import { Link, hashHistory } from "react-router";
import $jsonp from "../../utils/service.js";
import api from "../../utils/api.js";
import styles from "./index.less";
import publicstyle from '../../img/public.less'
import stylez from '../../container/index.less';

import roledata1 from "./roledata1.js";

const TreeNode = Tree.TreeNode;

require('es6-promise').polyfill();
let self;

export default class Addroles extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            roleLevel: "",
            roleName: "",
            rid: "",
            havePer: [],
            havePerUSE: [],
            Idisd: [],
            ssss: [],
            croleinput: "",
            ctextareaValue: "",
            treePerShow1: false,
            isHaveChecked: false,
            ismaxlength: false,
            roleNameLengthInit: 0,

        }
    }

    componentWillMount() {
        self.setState({
            rid: self.props.location.state.rid,
            etextareaValue: self.props.location.state.description,
            eroleinput: self.props.location.state.name,
            addOrEdit: self.props.location.state.add,
            roleLevel: self.props.location.state.roleLevel == "null" ? "系统默认角色" : self.props.location.state.roleLevel,
            roleDisabled: self.props.location.state.roleLevel == "null" ? true : false
        })
        if (!self.props.location.state.description) {
        } else {
            self.setState({
                ismaxlength: self.props.location.state.description.length >= 50 ? true : false,
                roleNameLengthInit: self.props.location.state.description.length,
            })
        }

    }

    componentDidMount = () => {

        let self = this;
        self.setState({
            rid: self.props.location.state.rid
        })
        $jsonp(self, api.allPrivileges, {}).then((res) => {
            let arrs = [];
            let listOne = res.data.response.list;
            listOne.map((item, index) => {
                if (item.children.length > 0) {
                    item.children.map((items, index) => {
                        items.label = items.name;
                        items.value = items.code;
                        items.key = items.code;
                        if (items.children.length > 0) {
                            items.children.map((itemss, indexss) => {
                                itemss.label = itemss.name;
                                itemss.value = itemss.code;
                                itemss.key = itemss.code;
                                arrs.push(itemss.name)

                            })

                        }

                    })
                }
            });
            self.setState({
                rolesArr: listOne,
                plainOptions: arrs,
            })
        })

        if (self.props.location.state.add == "add") {
            self.setState({
                treePerShow1: true,
            })
            return
        }

        $jsonp(self, api.getPermissionOfRole, {
            rid: self.props.location.state.rid
        }).then((res) => {
            let privileges = res.data.response.privileges ? res.data.response.privileges.split(",") : [];
            let privilegesArr = [];
            for (let j = 0; j < privileges.length; j++) {
                if (privileges[j].length > 0) {
                    privilegesArr.push(privileges[j])
                }
            }
            self.setState({
                havePer: privilegesArr,
                ssss: privilegesArr,
                updateformer: privileges
            })
            self.setState({
                treePerShow1: true,
            })
        }).catch((err) => {
            self.setState({
                treePerShow1: true,
            })
        })
    }
    onSelect = (selectedKeys, info) => {
    }
    onCheck = (checkedKeys, info) => {
        this.setState({ checkedKeys: checkedKeys.concat(info.halfCheckedKeys) })
        this.setState({ isHaveChecked: true })

    }


    save = () => {
        let self = this;
        var IdisdSET = self.state.checkedKeys;
        // 100,101,104,101100,104102,104103
        // 101100,104102,104103,100
        if (self.props.location.state.add == "add") {
            var newrES = /\<script\>|\<.{1,}\>]/g;
            var newrES1 = /\<script\>|\<.{1,}\>]/g;
            if (newrES.test(self.state.croleinput)) {
                message.warning("角色名称包含非法字符");
                return
            }
            if (newrES1.test(self.state.ctextareaValue)) {
                message.warning("角色描述包含非法字符");
                return
            }
            if (!self.state.croleinput) {
                return Modal.success({
                    title: "提示",
                    content: '请输入角色名称',
                    onOk: function () {

                    }
                })
            }
            if (!self.state.ctextareaValue) {
                return Modal.success({
                    title: "提示",
                    content: '请输入角色描述',
                    onOk: function () {

                    }
                })
            }
            if (!IdisdSET || IdisdSET.length == 0) {
                IdisdSET = []
            }
            // if (self.ckeckISin2(100, IdisdSET) == false) {
            //     IdisdSET.push("100");
            // }
            $jsonp(self, api.addRole, {
                roleLevel: self.state.roleLevel,
                name: self.state.croleinput,
                desc: self.state.ctextareaValue,
                pids: IdisdSET.length > 0 ? IdisdSET.join(",") : []
            }).then((res) => {
                Modal.success({
                    title: "提示",
                    content: '添加成功',
                    onOk: function () {
                        hashHistory.push({
                            pathname: "/main/roleset"
                        })
                    }
                })
            })
            return
        } else {
            /*code对应的id*/
            var arrId1 = this.state.updateformer;
            if (!self.state.eroleinput) {
                return Modal.success({
                    title: "提示",
                    content: '请输入角色名称',
                    onOk: function () {

                    }
                })
            }
            if (!self.state.etextareaValue) {
                return Modal.success({
                    title: "提示",
                    content: '请输入角色描述',
                    onOk: function () {

                    }
                })
            }
            var newrES = /\<script\>|\<.{1,}\>/g;
            var newrES1 = /\<script\>|\<.{1,}\>]/g;

            if (newrES.test(self.state.eroleinput)) {
                message.warning("角色名称包含非法字符");
                return
            }
            if (newrES1.test(self.state.etextareaValue)) {
                message.warning("角色描述包含非法字符");
                return
            }

            var changePids = [];
            if (self.state.isHaveChecked == true) {
                // if (self.ckeckISin2(100, IdisdSET) == false) {
                //     IdisdSET.push("100");
                // }
                changePids = IdisdSET;
            }
            if (self.state.isHaveChecked == false) {
                // if (self.ckeckISin2(100, arrId1) == false) {
                //     arrId1.push("100");
                // }
                changePids = arrId1;
            }

            $jsonp(self, api.modifyRole, {
                id: self.state.rid,
                pids: changePids.join(","),
                name: self.state.eroleinput,
                desc: self.state.etextareaValue,
                roleLevel: self.state.roleLevel,
            }).then((res) => {
                Modal.success({
                    title: "提示",
                    content: '修改成功',
                    onOk: function () {
                        hashHistory.push({
                            pathname: "/main/roleset"
                        })
                    }
                })

            })

        }


    }
    cancel = () => {
        hashHistory.push({
            pathname: "/main/roleset"
        })
    }
    ckeckISin2 = (key, arrayCheck) => {
        var time = false;
        for (var kk1 = 0; kk1 < arrayCheck.length; kk1++) {
            if (arrayCheck[kk1] == key) {
                time = true
            }
        }
        return time
    }

    setRoleLevel = (value) => {
        this.setState({
            roleLevel: value
        })
    }

    cgetRoleName = (e) => {
        var value = e.target.value;

        if (value.length > 50) {
            return
        }
        self.setState({
            croleinput: e.target.value
        })
    }
    ctextareaChange = (e) => {
        var value = e.target.value;
        if (value.length > 50) {
            return
        }
        self.setState({
            roleNameLengthInit: value.length,
            ismaxlength: value.length >= 50 ? true : false,
        })
        self.setState({
            ctextareaValue: value
        })
    }
    egetRoleName = (e) => {
        var value = e.target.value;
        if (value.length > 50) {
            return
        }

        self.setState({
            eroleinput: value
        })
    }
    etextareaChange = (e) => {
        var value = e.target.value;
        if (value.length > 50) {
            return
        }
        self.setState({
            roleNameLengthInit: value.length,
            ismaxlength: value.length >= 50 ? true : false,
        })
        self.setState({
            etextareaValue: value
        })
    }


    render() {

        if (this.state.rolesArr && this.state.treePerShow1) {
            return (
                <div className={stylez.wrapPadding}>
                    <div>
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item><Link to="">系统管理</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to="main/roleset">角色权限</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.addOrEdit == "add" ? "新增角色" : "修改角色"}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className={publicstyle.clearfloat} style={{ margin: "0 0 20px 0 " }}></div>

                        <Button type="primary" onClick={this.cancel} className={styles.returnbackbutton} style={{ marginTop: 15 }}>返回</Button>
                    </div>
                    {this.state.addOrEdit == "add" ? <div>
                        <div className={styles.magin}>
                            <span>角色层级：</span>
                            <Select value={this.state.roleLevel} className={styles.roleinput}
                                onChange={this.setRoleLevel} disabled={this.state.roleDisabled}>
                                <Option value="1">一级（省级）</Option>
                                <Option value="2">二级（市级）</Option>
                                <Option value="3">三级（区县级、市级直属所）</Option>
                                <Option value="4">四级（区县级直属所）</Option>
                            </Select>

                        </div>
                        <div className={styles.magin}>
                            <span>角色名：</span>
                            <Input type="text" className={styles.roleinput} value={this.state.croleinput}
                                onChange={this.cgetRoleName} />

                        </div>
                        <div className={styles.maginDescription}>
                            <span>角色描述：</span>
                            <textarea className={styles.textarearole} value={this.state.ctextareaValue} cols="45"
                                rows="6" onChange={this.ctextareaChange} />
                            <span
                                className={this.state.ismaxlength ? styles.gundan1 + " " + styles.maxLengthOver : styles.gundan1}><em
                                    className={styles.commentcount}>{this.state.roleNameLengthInit}</em>/50</span>
                        </div>
                    </div> : <div>
                            <div className={styles.magin}>
                                <span>角色层级：</span>
                                <Select value={this.state.roleLevel} className={styles.roleinput}
                                    onChange={this.setRoleLevel} disabled={this.state.roleDisabled}>
                                    <Option value="1">一级（省级）</Option>
                                    <Option value="2">二级（市级）</Option>
                                    <Option value="3">三级（区县级、市级直属所）</Option>
                                    <Option value="4">四级（区县级直属所）</Option>
                                </Select>

                            </div>

                            <div className={styles.magin}>
                                <span>角色名：</span>
                                <Input type="text" className={styles.roleinput} onChange={this.egetRoleName}
                                    value={this.state.eroleinput} disabled={self.state.isChaoguanRole} />
                            </div>
                            <div className={styles.maginDescription}>
                                <span>角色描述：</span>
                                <textarea className={styles.textarearole} cols="45" rows="6" onChange={this.etextareaChange}
                                    value={this.state.etextareaValue} disabled={self.state.isChaoguanRole} />
                                <span
                                    className={this.state.ismaxlength ? styles.gundan1 + " " + styles.maxLengthOver : styles.gundan1}><em
                                        className={styles.commentcount}>{this.state.roleNameLengthInit}</em>/50</span>
                            </div>
                        </div>
                    }
                    <div className={styles.firstContainer}>

                        <Tree
                            checkable
                            defaultExpandAll
                            defaultSelectedKeys={this.state.havePer}
                            defaultCheckedKeys={this.state.havePer}
                            onSelect={this.onSelect}
                            onCheck={this.onCheck}
                            className={styles.trees}

                        >
                            {
                                this.state.rolesArr.map((item, index) => {

                                    return <TreeNode title={item.name} key={item.code}>
                                        {
                                            item.children.length > 0 ?
                                                item.children.map((items, indexs) => {

                                                    return <TreeNode title={items.name} key={items.code}>
                                                        {
                                                            items.children.length > 0 ?
                                                                items.children.map((itemss, indexss) => {
                                                                    return <TreeNode title={itemss.name}
                                                                        key={itemss.code} />
                                                                }) : ""
                                                        }
                                                    </TreeNode>

                                                })
                                                : ""
                                        }
                                    </TreeNode>

                                })
                            }
                        </Tree>
                    </div>

                    <Button type="primary" onClick={this.save}
                        style={{ "display": (this.state.isChaoguanRole ? "none" : "inlineBlock") }}
                        className={styles.btnmargin}>保存</Button>
                    <Button type="default" onClick={this.cancel}
                        style={{ "display": (this.state.isChaoguanRole ? "none" : "inlineBlock") }}
                        className={styles.btnmargin}>取消</Button>
                </div>

            )
        }
        else {
            return <div></div>
        }

    }

}



