// 报表管理
import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb } from "antd";

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

let self, propsData = {};


export default class AddMangerment extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
        }
    }
    // 挂载前
    componentWillMount() {
        // propsData = this.props.location.state;
        // var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // this.setState({
        //     propsData: propsData,
        //     userInfo: userInfo,
        // })
    }
    // 挂载后
    componentDidMount() {

    }
    // 渲染
    render() {
        return (
            <div className={stylez.wrapPadding} style={{ padding: "0px", background: "#f4f4f4" }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", background: "white", padding: "15px" }}>
                    <Breadcrumb.Item>a</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="">b</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>c</Breadcrumb.Item>
                </Breadcrumb>
                <div className={publicstyle.clearfloatTop}></div>
            </div>
        )

    }
}