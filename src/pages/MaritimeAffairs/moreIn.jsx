// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Button, Input, Select, TreeSelect, message } from "antd";

// less
import MaritimeAffairs from "../MaritimeAffairs/MaritimeAffairs.less"
import publicstyle from "../../img/public.less";
import stylez from '../../container/index.less';
import report from "../report/report.less";
import styles2 from "../admin/index.less";
import styles from "../stastics/taskIndex.less";
import PageStyles from "../stastics/taskIndex.less";
import Cardstyles from '../businessmanage/addcompanyNew.less';

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import $FromData from "../../utils/formData.jsx";
import api from "../../utils/api";

let self, propsData = {}, name = "", node, msaId;

const Option = Select.Option, TreeNode = TreeSelect.TreeNode;

export default class AddMangerment extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            ChildrenMsa: [],
            allLevel: [],
        }
    }
    // 挂载前
    componentWillMount() {
        propsData = this.props.location.state;
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        var level = localStorage.getItem("level");

        name = (userInfo.departmentName == "江苏省地方海事局" ? "" : userInfo.departmentName);
        msaId = (userInfo.departmentId == 1 ? "" : userInfo.departmentId);
        node = (level == "省" ? true : false);

        this.setState({
            propsData: propsData,
            userInfo: userInfo,
            MsaNameValue: name,
            msaId: msaId,
            node: node,
        }, () => {
            this.getChildrenMsa();
            if (node == false) {
                this.getLevel();
            }
        })
    }
    // 挂载后
    componentDidMount() {

    }
    getLevel() {
        $jsonp3(self, api.listSortLevelBySortIdAndMsaId, {
            sortId: this.state.propsData.sortId,
            msaId: this.state.msaId,
        }).then(res => {
            if (res.code == 200) {
                let arr = res.data.response.list;
                this.setState({
                    allLevel: arr,
                })
            }
        })
    }
    getChildrenMsa() {
        $jsonp3(self, api.listDepartmentByUser, {}).then(res => {
            let list = res.data.response.list;
            this.setState({
                ChildrenMsa: list
            })
        })
    }
    selectLevel = (value) => {
        this.setState({
            level: value,
            levelValue: value,
        })
    }
    selectMsaName(value) {
        this.setState({
            MsaNameValue: value,
            msaId: value,
            levelValue: "",
        }, () => {
            this.getLevel();
        })
    }

    chooseFile(e) {
        var file = e.target.files;
        this.setState({
            file: file[0],
            fileName: file[0].name,
        })
    }
    back() {
        hashHistory.push({
            pathname: "/main/library",
            state: propsData
        })
    }
    ok() {
        if (!!!self.state.msaId) {
            return message.error("请选择所属海事局");
        }
        if (!!!self.state.levelValue) {
            return message.error("请选择等级");
        }
        if (!!!self.state.file) {
            return message.error("请上传模板文件");
        }
        var formData = new FormData();
        formData.append("sortLevelId", self.state.levelValue);
        formData.append("msaId", this.state.msaId);
        formData.append("file", this.state.file);

        $FromData(self, api.importCompanys, formData).then(res => {
            if (res.code == 200) {
                message.success("导入成功")
                hashHistory.push({
                    pathname: "/main/library",
                    state: propsData
                })
            }
        })
    }
    // 渲染
    render() {
        return (
            <div className={stylez.wrapPadding} style={{ padding: "0px" }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", background: "white", padding: "15px" }}>
                    <Breadcrumb.Item>检查项目管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查对象名录库</Breadcrumb.Item>
                    <Breadcrumb.Item>批量导入</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloatTop}></div>
                <div className={Cardstyles.form1}>
                    <h3 style={{ textAlign: "center", marginBottom: 24, }}>{this.state.propsData.checkName}</h3>

                    <dl className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}><i></i>所属海事局：</span>
                        <TreeSelect style={{ width: "50%" }} onChange={this.selectMsaName.bind(this)} value={this.state.MsaNameValue} placeholder={"请输入选择所属海事局"} treeDefaultExpandAll>
                            <TreeNode value={this.state.userInfo.departmentId
                                + ""} key={this.state.userInfo.departmentName} title={this.state.userInfo.departmentName} disabled={this.state.node}>
                                {
                                    this.state.ChildrenMsa.map(item => {
                                        return <treeNode value={item.id + ""} title={item.name} key={item.id + ""} />
                                    })
                                }
                            </TreeNode>
                        </TreeSelect>
                    </dl>
                    <dl className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}><i></i>选择等级：</span>

                        <Select style={{ width: "50%" }} onChange={this.selectLevel.bind(this)} value={this.state.levelValue} placeholder={"请先选择海事局再选择等级"} disabled={!!!this.state.msaId ? true : false}>
                            {
                                this.state.allLevel.map((item, index) => {
                                    return <Option key={item.id + ""} value={item.id + ""} disabled={item.status == 0}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </dl>
                    <dl className={Cardstyles.formitem1}>
                        <span className={Cardstyles.bitian}><i></i>上传表格：</span>
                        <span style={{ position: "relative", width: "50%", display: "inline-block" }}>
                            <Button icon="upload">选择导入模板</Button>
                            <Input type="file" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={this.chooseFile.bind(this)} style={{ width: "138px", display: "inline-block", position: "absolute", left: 0, top: -7, zIndex: 1, opacity: "0" }} />
                            <br />
                            {this.state.fileName}
                        </span>

                    </dl>
                    <dl className={Cardstyles.formitem1} style={{ textAlign: "center" }}>
                        <Button type="primary" className={MaritimeAffairs.ButtonMargin} onClick={this.ok.bind(this)}>导入</Button>
                    </dl>
                </div>
            </div>
        )

    }
}