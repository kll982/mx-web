import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Button,Modal, Radio, Table, Pagination, Tag, Progress, Spin } from "antd";

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

let self,propsData={};

export default class ProfessionCheck extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
    }
}
   // 挂载前
   componentWillMount(){
    propsData=this.props.location.state;
    console.log(propsData);
    
     this.setState({
      tableColumns: [{
        title: "编号",
        dataIndex: "index",
        key: "index",
        className: publicstyle.center,
    }, {
        title: "专项检查时间",
        dataIndex: "sortName",
        key: "sortName",
        className: publicstyle.center,
    }, {
        title: "隐患排查名称",
        dataIndex: "checklistTitle",
        key: "checklistTitle",
        className: publicstyle.center,
        render: (text, record) => {
            return <div>
                {record.checklistTitle}
                &emsp;<img style={{ display: !!record.checklistTitle ? "inline-block" : "none", verticalAlign: "middle", cursor: "pointer", width: "16px" }} src={see} onClick={() => {
                    hashHistory.push({
                        pathname: "/main/Mobilephone",
                        state: {
                            taskId: record.taskId,
                            seePath: "pubilcSpecial",
                            pageNum: this.state.page.pageNum,
                        }
                    })
                }} type="info-circle" />
            </div>
        }
    }, {
        title: "开展时间",
        dataIndex: "publishTime",
        key: "publishTime",
        className: publicstyle.center,
    }, {
        title: "状态",
        dataIndex: "statusValue",
        key: "statusValue",
        className: publicstyle.center,
        render: (text, record) => {
            return <Tag color={record.statusColor}>{record.statusValue}</Tag>
        }
    },
    {
        title: "操作",
        dataIndex: "action",
        key: "action",
        width: "20%",
        className: publicstyle.center,
        render: (text, record) => {
          return <Button type="primary" onClick={() => {
            Modal.confirm({
              title: 'Do you want to delete these items?',
              content: 'When clicked the OK button, this dialog will be closed after 1 second',
              onOk() {
                return new Promise((resolve, reject) => {
                  setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
              },
              onCancel() {},
            });
        }}>终止</Button>
      }
     }
    ],
     })
   }

  render() {
    return (
      <div  className={stylez.wrapPadding} style={{ padding: "0px", background: "#f4f4f4" }}>
      <Breadcrumb separator=">" style={{ textAlign: "left", background: "white", padding: "15px" }}>
        <Breadcrumb.Item>隐患排查管理</Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/main/professionCheck">专项检查</Link></Breadcrumb.Item>
      </Breadcrumb>
      <div className={MaritimeAffairs.cardWrap}>
      <h2 style={{ paddingLeft:"20px"}}>游览经历（通航）</h2>
      <Button style={{ padding:"5px 15px",marginLeft:"20px",marginTop:"20px"
      }} type="primary" ghost onClick={ ()=>{
            this.setState({
                visibily: true,
                specialName: "",
                startTime: null,
                endTime: null,
                startDay: null,
                endDay: null,
            })

      }}>开展隐患排查专项检查</Button>
      <div style={{ overflow: "hidden", marginTop: 40 }}>
            <Table className={MaritimeAffairs.Table} rowKey={record => record.id} columns=      {this.state.tableColumns}  pagination={false}>
              </Table>
             <div className={styles.pageFlex}>
         <span className={styles.pageWrap}>
              <Button type="primary" className={styles.pageFirst}
                     style={{ display: this.state.page.pages > 0 ? "block" : "none", float: "left" }}
                     onClick={this.toFirst.bind(this)}>首页</Button>
                 <Pagination className={styles.page}
                     style={{ display: this.state.page.pages > 0 ? "flex" : "none", float: "left" }}
                     onChange={this.onPageChange.bind(this)} showFISRT
                     current={this.state.page.pageNum}
                     pageSize={this.state.page.pageSize} total={this.state.page.total} />
                 <Button type="primary" className={styles.pageLast}
                     style={{ display: this.state.page.pages > 0 ? "block" : "none", float: "left" }}
                     onClick={this.toLast.bind(this)}>末页</Button>
             </span>
         </div>
      </div>
      </div>
      </div>
    )
  }
}