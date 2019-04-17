import React from "react"
import { Table, Button, Modal, Input, Radio, Select, Icon, Tag, Form, Progress, message, Row, Col, Breadcrumb, Spin } from "antd"
import { Link, hashHistory } from 'react-router';
const Option = Select.Option;

import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import api from "../../utils/api.js";
import styles from "./bulletin.less";
import publicstyle from '../../img/public.less'
import stylez from '../../container/index.less';

let self;
export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      visible: false,
      loading: true,
      id: "",
      sort: 0,
      crandom: 0.5,
      title: "",
      updateId: "",
      data: [],
    }
  }

  componentWillMount() {
    let self = this;
    self.loadData();
  }

  componentDidMount() {

  }
  trim = (str) => { //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }
  sortChange = (e) => {
    var value = e.target.value;
    value = value.replace(/[^\d]/g, "");
    if (value.length > 11) {
      return
    }
    this.setState({
      sort: value
    })
  }
  showModal = (record) => {
    this.setState({
      visible: true,
      updateId: record.id,
      crandom: Math.random()
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      crandom: Math.random()
    });
  }
  handleCreate = () => {
    $jsonp3(self, api.articleSort, {
      id: self.state.updateId,
      sortIndex: self.state.sort,
    }).then((res) => {
      self.setState({
        visible: false,

      })
      self.loadData();
    })
  }
  //下架
  unline = (record) => {
    let self = this;

    Modal.confirm({
      content: `确定下架快报${record.title}？`,
      onOk: function () {
        $jsonp3(self, api.articlePost, {
          id: record.id,
        }).then((res) => {
          self.loadData();
          message.success("已经下架");
        });
      }
    });


  }
  //发布
  upline = (record) => {
    let self = this;
    Modal.confirm({
      content: `确定发布快报${record.title}？`,
      onOk: function () {
        $jsonp3(self, api.articlePost, {
          id: record.id,
        }).then((res) => {
          self.loadData();
          message.success("已经发布");
        });
      }
    });

  }
  //删除
  deleteItem = (record) => {
    let self = this;
    Modal.confirm({
      title: "提示",
      content: "确定定要删除此项吗？",
      okText: "确定",
      maskClosable: true,
      onOk: function () {
        $jsonp3(self, api.articleDel, {
          id: record.id
        }).then((res) => {
          self.loadData();
        })

      }
    })

  }
  //设置查询的文章标题
  setTitle = (e) => {
    var value = e.target.value;
    if (value.length > 50) {
      return
    }
    this.setState({
      title: value
    })
  }
  reset = () => {
    this.setState({
      title: "",
    }, () => self.loadData());
  }
  queryProfitOfCondition = () => {
    self.loadData();
  }

  loadData = () => {
    self.setState({
      loading: true
    });
    $jsonp3(self, api.articleList4Manage, {
      title: self.trim(self.state.title),
    }).then((res) => {
      console.log("list", res);
      var resda = res.data.response.list;
      for (var k1 = 0; k1 < resda.length; k1++) {
        resda[k1].key = resda[k1].id;
        resda[k1].index = k1 + 1;
        resda[k1].writerName = resda[k1].author.name;
        resda[k1].writermsaName = resda[k1].author.msaName;
      }
      self.setState({
        data: resda,
      }, () => {
        console.log(self.state.data)
      });
      self.setState({
        loading: false
      });
    });

  }
  addBulletin = (addoredit, record) => {
    hashHistory.push({
      pathname: '/main/bulletindetail',
      state: {
        top: addoredit,
        title: self.state.title,
        updateId: record.id,
      }
    })
  }
  previewArt = (record) => {
    hashHistory.push({
      pathname: '/main/bulletinpreview',
      state: {
        updateId: record.id,
        top: "edit",
      }
    })
  }

  render() {
    const columns = [
      {
        dataIndex: 'title',
        key: "title",
        title: '标题',
        width: '42%',
        className: publicstyle.center,
        render: (text, record, index) => {
          return <div className={styles.left1} onClick={this.previewArt.bind(this, record)}>{text}</div>
        }
      },
      {
        dataIndex: 'writerName',
        className: publicstyle.center,
        key: "writerName",
        title: '作者',
        width: '100px',
        render: (text, record, index) => {
          if (!text) { return <span>-</span> }
          else { return <span>{text}</span> }
        }
      },
      {
        dataIndex: 'writermsaName',
        className: publicstyle.center,
        key: "writermsaName",
        title: '部门',
        width: '100px',
        render: (text, record, index) => {
          if (!text) { return <span>-</span> }
          else { return <span>{text}</span> }
        }
      },
      {
        dataIndex: 'postStatus',
        className: publicstyle.center,
        key: "postStatus",
        title: '状态',
        width: '100px',
        render: (text, record, index) => {
          if (record.postStatus === "1") {
            return <span><Tag color="blue">已发布</Tag></span>
          } else {
            return <span><Tag color="red">下架</Tag></span>
          }
        }
      },
      {
        dataIndex: 'sortIndex',
        className: publicstyle.center,
        key: "sortIndex",
        title: '排序',
        width: '100px',
        render: (text, record, index) => {
          return <span>{record.sortIndex}</span>
        }
      }, {
        title: '操作',
        className: publicstyle.center,
        key: 'Action',
        width: '250px',
        render: (text, record, index) => {
          if (record.postStatus === "1") {
            return (
              <span>
                <Button type="primary" onClick={this.addBulletin.bind(this, "edit", record)} style={{ marginRight: 10, marginBottom: 5, marginTop: 5, cursor: "pointer" }}>编辑</Button>
                <Button type="danger" onClick={this.unline.bind(this, record)} style={{ marginRight: 10, marginBottom: 5, marginTop: 5, cursor: "pointer" }}>下架</Button>
                <Button type="default" onClick={this.deleteItem.bind(this, record)} style={{ cursor: "pointer", marginTop: 5, display: record.delStatus == "0" ? "inline-block" : "none" }}>删除</Button>
              </span>
            )
          } else {
            return (
              <span>
                <Button type="primary" onClick={this.addBulletin.bind(this, "edit", record)} style={{ marginRight: 10, marginBottom: 5, marginTop: 5, cursor: "pointer" }}>编辑</Button>
                <Button type="primary" onClick={this.upline.bind(this, record)} style={{ marginRight: 10, marginBottom: 5, marginTop: 5, cursor: "pointer" }}>发布</Button>
                <Button type="default" onClick={this.deleteItem.bind(this, record)} style={{ cursor: "pointer", marginTop: 5, display: record.delStatus == "0" ? "inline-block" : "none" }}>删除</Button>
              </span>
            )
          }
        }

      }];
    { }
    return (
      <div className={stylez.wrapPadding}>
        <Spin spinning={this.state.loading}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>系统管理</Breadcrumb.Item>
            <Breadcrumb.Item>快报管理</Breadcrumb.Item>
          </Breadcrumb>
          <div className={styles.clearfloat}></div>
          <Button type="primary" onClick={this.addBulletin.bind(this, "add")}><Icon type="plus"></Icon>新增快报</Button>
          <Row className={styles.antrow1}>

            <Col span={6}><span style={{ paddingRight: 10 }}>快报标题:</span>
              <Input type="text" style={{ width: "60%" }} onChange={this.setTitle} value={this.state.title} />
            </Col>
            <Col span={8}>
              <Button type="primary" className={publicstyle.button} onClick={this.queryProfitOfCondition}>查询</Button>
              <Button type="default" className={publicstyle.cancelbutton} style={{ marginLeft: "20px" }} onClick={this.reset}>重置</Button>
            </Col>

          </Row>
          <Table
            pagination={false}
            bordered
            columns={columns}
            dataSource={this.state.data}
          />

          <Modal key={this.state.crandom} title="快报排序" visible={this.state.visible}
            onOk={this.handleCreate} onCancel={this.handleCancel}
          >
            <Row style={{ marginBottom: 20 }}>
              <Col span={16} offset={4}>
                <span>
                  <span>序号:</span><Input type="text" value={this.state.sort} style={{ width: "50%", marginLeft: 10 }} onChange={this.sortChange} placeholder="" />
                </span>
              </Col>
            </Row>
          </Modal>

        </Spin>
      </div>
    );
  }
}


