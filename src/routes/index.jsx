import React from 'react';
import { Router, Route, Redirect, IndexRoute, hashHistory, browserHistory } from 'react-router';
//登录
import app from "../container/index.jsx"
// import home from "../pages/index/index.jsx"
import home from "../pages/index/home.jsx"

import login from "../pages/login/index.jsx"
import roleset from "../pages/admin/roles.jsx"
import resetpsd from "../pages/password/resetpsd.jsx"
import addroles from "../pages/admin/addroles.jsx"
import addnewroles from "../pages/admin/addnewroles.jsx"

//企业管理
import companymanageNew from "../pages/businessmanage/companymanageNew.jsx"
import addcompanyNew from "../pages/businessmanage/addcompanyNew.jsx"

import departmentsetNew from "../pages/businessmanage/departmentsetNew.jsx"
import departmentorder from "../pages/businessmanage/departmentorder.jsx"
import staffmanageNew from "../pages/businessmanage/staffmanageNew.jsx"
import addstaffNew from "../pages/businessmanage/addstaffNew.jsx"
import bulletin from "../pages/businessmanage/bulletin.jsx"
import bulletinorder from "../pages/businessmanage/bulletinorder.jsx"

import bulletindetail from "../pages/businessmanage/bulletindetail.jsx"
import bulletinpreview from "../pages/businessmanage/bulletinpreview.jsx"
//orderlist检查单
import orderlist from "../pages/businessmanage/orderlist.jsx"
//账号审核
import accountapply from "../pages/businessmanage/accountapply.jsx"

import echartsr from "../pages/echarts/echarts2.jsx"
//echarts
import echarts from "../pages/echarts/echarts.jsx"

import banner from "../pages/bannermanage/banner.jsx"

import statictisTask from "../pages/stastics/taskIndex.jsx"
import addStatisticTask from "../pages/stastics/addStatisticTask1.jsx"
import fillStatictisTaskList from "../pages/stastics/fillStatictisTaskList.jsx"

// 已上传
import sendTable from "../pages/stastics/sendTable.jsx"

import SecurityRisk from "../pages/stastics/formDay.jsx"

import SecurityRisk3 from "../pages/stastics/formYear.jsx"

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import store from './reactredux-reducer.js'

import allTable from "../pages/stastics/allTable.jsx"
import watchDay from "../pages/stastics/watchDay.jsx"
import watchYear from "../pages/stastics/watchYear.jsx"
// 图表
import charts from "../pages/inspect/charts.jsx"
// 预览
import previewDay from "../pages/stastics/previewDay.jsx"
import previewYear from "../pages/stastics/previewYear.jsx"
// 修改
import editDay from "../pages/stastics/editDay.jsx"
import editYear from "../pages/stastics/editYear.jsx"
// 专项检查
import addChecklist from "../pages/inspect/addChecklist.jsx"
import Checklist from "../pages/inspect/Checklist.jsx"
import specialExamination from "../pages/inspect/specialExamination.jsx"
import SpecialInspectionItems from "../pages/inspect/SpecialInspectionItems.jsx"

// 日常检查
import DailySupervision from "../pages/inspect/DailySupervision.jsx"
// 隐患地图
import map from "../pages/echarts/map.jsx"

// import addSpecialExamination from "../pages/inspect/addSpecialExamination.jsx"

import Mobilephone from "../pages/inspect/Mobilephone.jsx"

// 12月修改
// 报表管理
import management from "../pages/report/management";// 报表管理
import addManagement from "../pages/report/addMangrment";//新增报表
import watchManagement from "../pages/report/watchMangrment";//查看报表

import summary from "../pages/report/summary";//接收汇总
import TOreceive from "../pages/report/TOreceive";//接收
import TOsummary from "../pages/report/TOsummary";//汇总
import TOreport from "../pages/report/TOreport";//上报
import TOfill from "../pages/report/TOfill";//填写
import TOreportChild from '../pages/report/TOreportChild';
import printIt from "../pages/report/printIt.jsx"; // 打印

import audit from "../pages/audit/audit.jsx"; // 审核
import auditDetails from "../pages/audit/auditDetails.jsx"; // 审核页

import Department from "../pages/MaritimeAffairs/department.jsx";  // 部门管理

import ProjectItemItm from "../pages/MaritimeAffairs/projectItem.jsx"; //项目管理
import ProfessionCheck from "../pages/MaritimeAffairs/professionCheck.jsx"; //隐患排查专项检查
import addDepartment from "../pages/MaritimeAffairs/addDepartment.jsx";  // 新增科室
import ProInform from "../pages/MaritimeAffairs/proInform.jsx"; //基本信息
import checklistManagement from "../pages/MaritimeAffairs/checklistManagement.jsx";  // 检查单

import ListPatrolInfo from '../pages/listPatro/listPatrolInfo.jsx'; //安全检查
import ListChecklistByConditional from '../pages/listPatro/listChecklistByConditional.jsx'; //安全检查 /检查单 
import ListSortLevelBySortId from '../pages/MaritimeAffairs/listSortLevelBySortId.jsx'; // 省/返回各市检查项目信息

import Library from '../pages/MaritimeAffairs/library.jsx'; // 检查对象名录库
import addCheckObject from '../pages/MaritimeAffairs/addCheckObject.jsx'; // 编辑/新增对象
import archive from '../pages/MaritimeAffairs/archive.jsx'; // 档案
import moreIn from '../pages/MaritimeAffairs/moreIn.jsx'; // 批量导入


import special from '../pages/special/special.jsx'; // 专项检查
import pubilcSpecial from '../pages/special/pubilcSpecial.jsx'; // 发布专项检查
import specialDetails from '../pages/special/specialDetails.jsx'; // 专项检查详情
import searchChecklistCode from '../pages/special/searchChecklistCode.jsx'; // 检查单查询


class Routes extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={login}>
                        <IndexRoute component={home} />
                    </Route>
                    <Route path="/resetpsd" component={resetpsd} />
                    <Route path="/main" component={app}>
                        <Route path="home" component={home} />
                        <Route path="roleset" component={roleset} />
                        <Route path="staffmanage" component={staffmanageNew} />
                        <Route path="departmentset" component={departmentsetNew} />
                        <Route path="departmentorder" component={departmentorder} />
                        <Route path="addnewroles" component={addnewroles} />
                        <Route path="addroles" component={addroles} />
                        <Route path="addstaff" component={addstaffNew} />
                        <Route path="companymanage" component={companymanageNew} />
                        <Route path="addcompany" component={addcompanyNew} />
                        <Route path="echarts" component={echartsr} />
                        <Route path="bannermanage" component={banner} />
                        <Route path="bulletin" component={bulletin} />
                        <Route path="bulletinorder" component={bulletinorder} />
                        <Route path="bulletindetail" component={bulletindetail} />
                        <Route path="bulletinpreview" component={bulletinpreview} />
                        <Route path="orderlist" component={orderlist} />
                        <Route path="accountApply" component={accountapply} />
                        <Route path="statictisTask" component={statictisTask} />
                        <Route path="addStatisticTask" component={addStatisticTask} />
                        <Route path="fillStatictisTaskList" component={fillStatictisTaskList} />
                        <Route path="SecurityRisk3" component={SecurityRisk3} />
                        <Route path="SecurityRisk" component={SecurityRisk} />
                        <Route path="watchDay" component={watchDay} />
                        <Route path="watchYear" component={watchYear} />
                        <Route path="allTable" component={allTable} />
                        <Route path="previewDay" component={previewDay} />
                        <Route path="previewYear" component={previewYear} />
                        <Route path="editDay" component={editDay} />
                        <Route path="editYear" component={editYear} />
                        <Route path="sendTable" component={sendTable} />
                        {/*检查项生成图表页*/}
                        <Route path="charts" component={charts} />
                        {/*检查单*/}
                        <Route path="Checklist" component={Checklist} />
                        <Route path="addChecklist" component={addChecklist} />
                        {/*專項檢查*/}
                        <Route path="specialExamination" component={specialExamination} />
                        <Route path="SpecialInspectionItems" component={SpecialInspectionItems} />
                        {/*日常检查*/}
                        <Route path="DailySupervision" component={DailySupervision} />
                        {/*<Route path="addSpecialExamination" component={addSpecialExamination}/>*/}
                        <Route path="Mobilephone" component={Mobilephone} />
                        {/*隐患地图*/}
                        {/*<Route path="trouble_report" component={echarts}/>*/}
                        <Route path="trouble_report" component={map} />
                        {/* 12月修改 */}
                        {/* 报表管理 */}
                        <Route path="management" component={management} />
                        {/* 新增报表 */}
                        <Route path="addManagement" component={addManagement} />
                        <Route path="watchManagement" component={watchManagement} />
                        {/* 接收汇总 */}
                        <Route path="summary" component={summary} />
                        {/* 接收 */}
                        <Route path="TOreceive" component={TOreceive} />
                        {/* 汇总 */}
                        <Route path="TOsummary" component={TOsummary} />
                        {/* 上报 */}
                        <Route path="TOreport" component={TOreport} />
                        {/* 填写 */}
                        <Route path="TOfill" component={TOfill} />
                        {/* {上报2} */}
                        <Route path="TOreportChild" component={TOreportChild} />
                        {/* 打印 */}
                        <Route path="printIt" component={printIt} />
                        {/* 审核 */}
                        <Route path="audit" component={audit} />
                        {/* 审核详情页 */}
                        <Route path="auditDetails" component={auditDetails} />

                        {/* 部门管理 */}
                        <Route path="department" component={Department} />
                        {/* 新增科室 */}
                        <Route path="addDepartment" component={addDepartment} />

                        {/* 项目管理 */}
                        <Route path="projectItem" component={ProjectItemItm} />
                        {/* 隐患排查专项检查 */}
                        <Route path="professionCheck" component={ProfessionCheck}/>
                        {/* 基本信息 */}
                        <Route path="proInform" component={ProInform} />
                        {/* 安全检查 */}
                        <Route path="listPatrolInfo" component={ListPatrolInfo} />
                        {/* 安全检查 /检查单*/}
                        <Route path="listChecklistByConditional" component={ListChecklistByConditional} />
                        {/* 返回各市检查项目信息 */}
                        <Route path="listSortLevelBySortId" component={ListSortLevelBySortId} />

                        {/* 检查单 */}
                        <Route path="checklistManagement" component={checklistManagement} />
                        {/* 检查对象名录库 */}
                        <Route path="library" component={Library} />
                        {/* 编辑/新增对象 */}
                        <Route path="addCheckObject" component={addCheckObject} />
                        <Route path="archive" component={archive} />
                        <Route path="moreIn" component={moreIn} />

                        {/* 专项检查 */}
                        <Route path="special" component={special} />
                        <Route path="pubilcSpecial" component={pubilcSpecial} />
                        <Route path="specialDetails" component={specialDetails} />
                        <Route path="searchChecklistCode" component={searchChecklistCode} />
                    </Route>
                </Router>
            </Provider>
        )
    }
}


export default Routes;
