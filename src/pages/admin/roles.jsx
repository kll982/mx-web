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
  Input,
  Spin,
  Breadcrumb
} from "antd";

import $jsonp from "../../utils/service.js";
import api from "../../utils/api.js";
import { Link, hashHistory } from "react-router";

import publicstyle from '../../img/public.less'
import styles from "./index.less"
import stylez from '../../container/index.less';


export default class Roles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rolesdata: [],
      loading: false,
      cvisible: false,
      evisible: false,
      id: "",
      croleinput: "",
      eroleinput: "",
      etextareaValue: "",
      ctextareaValue: "",

    }
  }

  componentWillMount() {
    let self = this;
    self.searchData();

  }

  searchData = () => {
    let self = this;
    self.setState({
      loading: true
    })
    $jsonp(self, api.getAll, {
    }).then((res) => {
      console.log(res)
      let data = [];
      let list = res.data.response.allRoleList;

      for (let i = 0; i < list.length; i++) {
        let obj = {};
        obj.roleLevel = "" + list[i].roleLevel;
        obj.key = list[i].id;
        obj.index = i + 1;
        obj.role = list[i].name;
        obj.description = list[i].description ? list[i].description : "无";
        obj.description1 = list[i].description ? list[i].description : "";
        obj.id = list[i].id;
        obj.status = list[i].status;
        data.push(obj);
      }
      self.setState({
        rolesdata: data,
        loading: false
      })

    })
  }

  //delete
  deleteItem = (record) => {
    let self = this;
    Modal.confirm({
      title: "提示",
      content: "确定要删除该项吗？",
      maskClosable: true,
      onOk: function () {
        $jsonp(self, api.deleteRole, {
          rid: record.id,
        }).then((res) => {
          self.searchData()
          Modal.success({
            title: '提示',
            content: '删除成功',
            onOk: function () {

            }
          });
        })
      }
    })

  }

  add = () => {
    hashHistory.push({
      pathname: "/main/addnewroles",
      state: {
        add: "add"
      }
    })
  }
  edit = (record) => {
    console.log(record)
    hashHistory.push({
      pathname: "/main/addnewroles",
      state: {
        rid: record.id,
        roleLevel: record.roleLevel,
        add: "edit",
        name: record.role,
        description: record.description1
      }
    })

  }


  render() {
    const columns = [
      {
        dataIndex: 'index',
        title: '角色编号',
        width: "100px",
        className: publicstyle.center,
      },
      {
        dataIndex: 'role',
        title: '角色',
        className: publicstyle.center,
      },
      {
        dataIndex: 'description',
        title: '角色描述',
        width: "30%",
        className: publicstyle.center,
      },
      {
        title: '操作',
        key: 'Action',
        className: publicstyle.center,
        render: (text, record, index) => {
          return (
            <span>
              <Button type="primary" style={{ cursor: "pointer", marginRight: 10 }} onClick={this.edit.bind(this, record)}>编辑</Button>
              <Button type="default" onClick={this.deleteItem.bind(this, record)}>删除</Button>
            </span>
          )
        }
      }];

    return (
      <div className={stylez.wrapPadding}>
        <Spin spinning={this.state.loading}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item><Link to="">系统管理</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link >角色权限</Link></Breadcrumb.Item>
          </Breadcrumb>
          <div className={publicstyle.clearfloat} style={{ margin: "0 0 20px 0 " }}></div>
          <div>
            <div className={styles.row}>
              <Row>
                <Col span={24}>
                  <Button type="primary" className={styles.addbtn} onClick={this.add}><Icon type="plus" />新增角色</Button>
                </Col>
              </Row>
            </div>

            <Table
              pagination={false}
              bordered
              columns={columns}
              dataSource={this.state.rolesdata}

            />

          </div>

        </Spin>
      </div>
    )
  }
}

