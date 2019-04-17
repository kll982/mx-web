import React from "react";
import { Link, hashHistory } from 'react-router';
import { Breadcrumb, Button, Icon, Tree } from "antd";

// less
import MaritimeAffairs from "../MaritimeAffairs/MaritimeAffairs.less"
import publicstyle from "../../img/public.less";
import stylez from '../../container/index.less';
import report from "../report/report.less";
import styles2 from "../admin/index.less";
import PageStyles from "../stastics/taskIndex.less";

// ajax
import $jsonp from '../../utils/service.js';
import $jsonp3 from '../../utils/service3.js';
import $jsonppost from '../../utils/service2.js';
import api from "../../utils/api";

export default class Department extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            leftShowWidth: 274,
            leftHiddenWidth: 0,
            leftShow: false,
            rightWidth: "100%",
        }
    }
    // 挂载前
    componentWillMount() {
        this.setState({
        })
        this.changeWidth();
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
            var rightWidth = clientWidth - 200 - 15 - this.state.leftShowWidth;
            this.setState({
                rightWidth: rightWidth,
                leftShow: true,
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
    // 窗口大小
    changeWindowWidth() {
        var clientWidth = document.body.clientWidth;
        // 减 菜单栏宽度 减 左右padding 减左侧宽度
        if (self.state.leftShow == true) {
            var rightWidth = clientWidth - 200 - 15 - 274;
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
    // 渲染
    render() {
        return (
            <div style={{ height: "100%", overflow: "hidden", }}>
                <Breadcrumb separator=">" style={{ textAlign: "left", padding: "15px 0px 0px 15px", zIndex: 1 }}>
                    <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/main/department">部门管理</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={this.back} style={{ marginTop: 15 }} className={styles2.returnbackbutton}>返回</Button>
                <div className={publicstyle.clearfloatTop}></div>
                <div style={{ height: "100%", position: "relative", backgroundColor: "#F7F7F7" }}>
                    {/* left */}
                    <div className={MaritimeAffairs.leftWidth} style={{ left: this.state.leftShow == true ? this.state.leftHiddenWidth : -(this.state.leftShowWidth), }}>
                        {/* button */}
                        <div className={MaritimeAffairs.leftButtonWrap} onClick={this.changeWidth.bind(this)}>
                            <Icon type={this.state.leftShow == true ? "right" : "left"} />
                        </div>
                        {/* 树状图 */}

                    </div>
                    {/* right */}
                    <div className={MaritimeAffairs.rightWidth} style={{ width: this.state.rightWidth }}>
                    </div>
                </div>

            </div>
        )

    }
}