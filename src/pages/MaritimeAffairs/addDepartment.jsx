// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Button, Table, Modal, Input, message, Row, Col } from "antd";

// less
import MaritimeAffairs from "../MaritimeAffairs/MaritimeAffairs.less"
import publicstyle from "../../img/public.less";
import stylez from '../../container/index.less';
import report from "../report/report.less";
import styles2 from "../admin/index.less";
import styles from "../stastics/taskIndex.less";
import PageStyles from "../stastics/taskIndex.less";

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";

const confirm = Modal.confirm;

let self, propsData = {
    MsaName: "",
    MsaId: ""
};

export default class AddDepartment extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            allDepartment: [],
        }
    }
    // 挂载前
    componentWillMount() {
        propsData = this.props.location.state;
        this.setState({
            propsData: propsData
        }, () => {
            this.getAllDepartment();
        })
    }
    // 挂载后
    componentDidMount() {

    }
    // 获取科室
    getAllDepartment() {
        $jsonp3(self, api.listAllDeptByMsaId, {
            msaId: this.state.propsData.msaId,
        }).then((res) => {
            let list = res.data.response.list;
            this.setState({
                allDepartment: list,
            })
        })
    }

    back = () => {
        hashHistory.push({
            pathname: "/main/department",
            state: self.state.propsData,
        })
    }
    addDepartment() {
        this.setState({
            addDeparmentVisibily: true,
            departmentNameInput:"",
        })
    }
    onNameInput(e) {
        this.setState({
            departmentNameInput: e.target.value
        })
    }
    addDeparmentOK() {
        if (this.state.departmentNameInput == "") {
            return message.error("请输入科室名称")
        }
        $jsonppost(self, api.addDept, {
            name: this.state.departmentNameInput,
            msaId: this.state.propsData.msaId,
        }).then(res => {
            if (res.code == 200) {
                self.getAllDepartment();
                message.success("添加成功")
                self.setState({
                    addDeparmentVisibily: false,
                })
            }
        })
    }
    hideAddDeparmentModel() {
        this.setState({
            addDeparmentVisibily: false,
        })
    }
    editDeparment(record) {
        this.setState({
            editDeparmentVisibily: true,
            departmentId: record.id,
            departmentNameChange: record.name,
        })
    }
    deleteDeparment(record) {
        confirm({
            title: '删除',
            content: '确定删除当前科室吗？', okText: "确认",
            // cancelText: "取消",
            okType: 'danger',
            onOk() {
                $jsonppost(self, api.deleteDept, {
                    deptId: record.id
                }).then((res) => {
                    if (res.code == 200) {
                        this.getAllDepartment();
                        message.success("删除成功")
                    }
                })
            },
            onCancel() {
            },
        });
    }
    onNameChange(e) {
        this.setState({
            departmentNameChange: e.target.value,
        })

    }
    editDeparmentOK() {
        if (this.state.departmentNameChange == "") {
            return message.error("请输入科室名称")
        }
        $jsonppost(self, api.updateDept, {
            deptId: this.state.departmentId,
            name: this.state.departmentNameChange,
            msaId: this.state.propsData.msaId,
        }).then(res => {
            if (res.code == 200) {
                self.getAllDepartment();
                message.success("修改成功")
                self.setState({
                    editDeparmentVisibily: false,
                })
            }
        })

    }
    hideEditDeparmentModel() {
        this.setState({
            editDeparmentVisibily: false,
        })
    }
    // 渲染
    render() {
        const columns = [{
            title: "科室名称",
            dataIndex: 'name',
            key: 'name',
            className: publicstyle.center,
        }, {
            title: "操作",
            key: 'action',
            className: publicstyle.center,
            render: (text, record) => {
                return <div>
                    <Button style={{ margin: "0px 10px 10px 0px" }} onClick={this.editDeparment.bind(this, record)} type="primary">编辑</Button>
                    <Button style={{ margin: "0px 10px 10px 0px" }} onClick={this.deleteDeparment.bind(this, record)}>删除</Button>
                </div>
            }
        },];
        return (
            <div className={stylez.wrapPadding} style={{ background: "#F7F7F7", padding: 0, position: "relative" }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", background: "#fff", padding: 15, }}>
                    <Breadcrumb.Item><Link to="/main/department">部门管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>编辑科室</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloatTop}></div>
                <div className={MaritimeAffairs.cardWrap}>
                    <div className={MaritimeAffairs.cardTitle}>
                        {this.state.propsData.MsaName}
                    </div>
                    <Row>
                        <Button type="primary" style={{ marginBottom: 18 }} onClick={this.addDepartment.bind(this)}>+ 添加科室</Button>
                    </Row>
                    {this.state.allDepartment ?
                        <Table rowKey={record => record.id} style={{ width: "100%", }} columns={columns} dataSource={this.state.allDepartment} bordered className={styles.table} pagination={false} ></Table> : ""}
                </div>
                <Modal visible={this.state.addDeparmentVisibily} title="新增科室"
                    onOk={this.addDeparmentOK.bind(this)}
                    onCancel={this.hideAddDeparmentModel.bind(this)}
                    okText="确认"
                    cancelText="取消"
                    className={MaritimeAffairs.Model}>
                    <dl>
                        <dt><i className={MaritimeAffairs.must}>*</i>&emsp;科室名称：</dt>
                        <dd><Input onChange={this.onNameInput.bind(this)} value={this.state.departmentNameInput} /></dd>
                    </dl>
                </Modal>
                <Modal visible={this.state.editDeparmentVisibily} title="修改科室名称"
                    onOk={this.editDeparmentOK.bind(this)}
                    onCancel={this.hideEditDeparmentModel.bind(this)}
                    okText="确认"
                    cancelText="取消"
                    className={MaritimeAffairs.Model}>
                    <dl>
                        <dt><i className={MaritimeAffairs.must}>*</i>&emsp;科室名称：</dt>
                        <dd><Input onChange={this.onNameChange.bind(this)} value={this.state.departmentNameChange} /></dd>
                    </dl>
                </Modal>
            </div>
        )

    }
}