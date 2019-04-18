import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Button, Radio, Table, Pagination, Tag, Progress, Spin } from "antd";

// less
import MaritimeAffairs from "../MaritimeAffairs/MaritimeAffairs.less"
import publicstyle from "../../img/public.less";
import stylez from '../../container/index.less';
import report from "../report/report.less";
import styles2 from "../admin/index.less";
import styles from "../stastics/taskIndex.less";
import PageStyles from "../stastics/taskIndex.less";

export default class ProfessionCheck extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
    }
}
   // 挂载前
   componentWillMount(){
     this.setState({
       
     })
   }

  render() {
    return (
      <div  className={stylez.wrapPadding} style={{ padding: "0px", background: "#f4f4f4" }}>
      <Breadcrumb separator=">" style={{ textAlign: "left", background: "white", padding: "15px" }}>
        <Breadcrumb.Item>隐患排查管理</Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/main/professionCheck">专项检查</Link></Breadcrumb.Item>
      </Breadcrumb>
      <h2 style={{ paddingLeft:"20px"}}>游览经历（通航）</h2>
      <Button style={{ padding:"5px 15px",marginLeft:"20px",marginTop:"20px"
      }} type="primary" ghost onClick={ ()=>{

      }}>开展隐患排查专项检查</Button>
      </div>
    )
  }
}