var port = "http://bm.moxiang1.com/",
    loginport = "http://passport.moxiang1.com/";
// var port = "http://bm.jsmsa.com/", loginport = "http://passport.jsmsa.com/";
if (window.bowserEnv === 'test') {
    port = "http://bm-msa.jinbill-199.com/";
    loginport = "http://passport-msa.jinbill-199.com/";
    // loginport="http://passport-test.jinbill.com/";
    // port = "http://bm-t.jinbill.com/";
} else if (window.bowserEnv === 'test_0308merge') {
    port = "http://bm-120.jinbill-99.com/"
    loginport = "http://passport-120.jinbill-99.com/";
} else if (window.bowserEnv === 'test_0413') {
    port = "http://bm-110.jinbill-99.com/"
    loginport = "http://passport-110.jinbill-99.com/";
} else if (window.bowserEnv === 'product') {
    port = "http://bm.jsmsa.com/";
    loginport = "http://passport.jsmsa.com/";
}

//以前的正式环境
// port = "http://106.15.193.237:59092/";
// loginport="http://106.15.193.237:58888/";

let report = port + "spStatistic/",
    checklist = port + "checklist/",
    dept = port + "dept/",
    msaInfo = port + "msaInfo/",
    checklistSort = port + "checklistSort/",
    charts = port + "checklistChartController/",
    spChecklistController = port + "spChecklistController/",
    newSpChecklistController = port + "newSpChecklistController/";

const apiList = {
    tradePageSize: 5,
    pageSize: 10,
    total: 10,

    apiHeader: port,
    apiLoginHeader: loginport,
    //所有的url都列在这里
    login: loginport + 'bmlogin',
    logout: loginport + 'bmlogout',



    checkBmSSO: loginport + "checkBmSSO",
    //获取用户的信息
    getUserInfo: port + "employee/findBmUserInfo",
    //权限管理
    //返回所有权限菜单
    getAllMenu: port + "permission/allPrivileges",
    //添加权限
    addpermission: port + "permission/add",
    //返回用户的权限菜单
    getUserAllMenu: port + "permission/findPrivilegesByRoleId",
    //返回用户所有权限字符串code
    getUserAllCode: port + "permission/getPrivilegesByUserId",
    //管理员设置
    addRoleToUser: port + "admin/addRoleToUser",
    addUser: port + "admin/addUser",
    getallUsers: port + "admin/allUsers",
    forbidUserById: port + "admin/forbidUserById",
    modifyUser: port + "admin/modifyUser",
    resetPwd: port + "admin/resetPwd",
    //用户相关接口
    findPrivileges: port + "permission/findPrivilegesByUserId",
    ueserresetPwd: port + "user/resetPwd",
    //角色设置
    addPermission2Role: port + "role/addPermission2Role",
    getRoleList: port + "role/getAll",
    //获取部门和员工
    getAllCompanyDepartmentTreeWithEmp: port + "companyDepartment/getAllCompanyDepartmentTreeWithEmp",
    //票面识别
    recoginze: port + "ocrBank/recoginze",
    //获取图片上传阿里云需要的数据
    getOssTicketSign: port + "oss/getBannerSign",
    //海事部门后台维护接口
    //新增部门
    addCompanyDepartment: port + "msaInfo/addMsaInfo",
    enableOrDisable: port + "msaInfo/enableOrDisable",
    getAllCompanyDepartment: port + "companyDepartment/getAllCompanyDepartment",
    //获取江苏海事部门树形结构（包括停用的）
    getAllCompanyDepartmentTree: port + "msaInfo/getAllMsaInfoTree",
    //部门排序
    companysort: port + "msaInfo/sort",
    //编辑部门
    upDateCompanyDepartment: port + "msaInfo/updateMsaInfo",
    //角色管理
    addRole: port + "role/addRole",
    deleteRole: port + "role/deleteRole",
    getAll: port + "role/getAllRole",
    //员工页获取角色
    getAllRoleForEmployee: port + "role/getAllRoleForEmployee",
    //获取角色所拥有的权限字符串
    getPermissionOfRole: port + "role/getPermissionOfRole",
    modifyRole: port + "role/modifyRole",
    //权限管理
    addPermission: port + "role/addRole",
    allPrivileges: port + "permission/allPrivileges",
    findPrivilegesByRoleId: port + "permission/findPrivilegesByRoleId",
    findPrivilegesByUserId: port + "permission/findPrivilegesByUserId",
    //员工管理
    addCompanyEmployee: port + "employee/addCompanyEmployee",
    getCompanyEmployeeByPage: port + "employee/getCompanyEmployeeByPage",
    joinAgain: port + "companyEmployee/joinAgain",
    revokeJoin: port + "companyEmployee/revokeJoin",
    upDateCompanyEmployee: port + "employee/upDateCompanyEmployee",
    upDateJobStatus: port + "employee/upDateJobStatus",
    //获取海事所有部门(已启用)树形结构
    getAllCompanyDepartmentTreeInUse: port + "msaInfo/getAllCompanyDepartmentTreeInUse",
    //获取公司信息
    getByCompanyId: port + "company/getByCompanyId",
    //修改密码
    updateBmPwd: loginport + "updateBmPwd",
    //客户管理
    //新增客户
    addCustomer: port + "customer/addCustomer",
    //新增客户交易户
    addCustomerTradeHouse: port + "customer/addCustomerTradeHouse",
    //新增交易户账号
    addCustomerTradeHouseAccount: port + "customer/addCustomerTradeHouseAccount",
    //删除客户交易户
    delCustomerTradeHouse: port + "customer/delCustomerTradeHouse",
    //删除交易户账号
    delCustomerTradeHouseAccount: port + "customer/delCustomerTradeHouseAccount",
    //潜在用户加入/拒绝
    potentialCustomerYesOrNo: port + "customer/potentialCustomerYesOrNo",
    //获取黑/白/潜在客户列表
    queryBlackOrWhiteCustomerList: port + "customer/queryBlackOrWhiteCustomerList",
    //获取客户列表
    queryCustomer: port + "customer/queryCustomer",
    //查询客户及其交易户详情
    queryCustomerAndTradeHouseList: port + "customer/queryCustomerAndTradeHouseList",
    //获取客户交易户账号列表
    queryCustomerTradeHouseAccount: port + "customer/queryCustomerTradeHouseAccount",
    //分页获取交易户账号列表
    queryCustomerTradeHouseAccountList: port + "customer/queryCustomerTradeHouseAccountList",
    //更新客户信息
    updateCustomer: port + "customer/updateCustomer",
    //更新客户状态
    updateCustomerStatus: port + "customer/updateCustomerStatus",
    //更新客户交易户
    updateCustomerTradeHouse: port + "customer/updateCustomerTradeHouse",
    //更新交易户账号
    updateCustomerTradeHouseAccount: port + "customer/updateCustomerTradeHouseAccount",
    //获取客户联系记录列表
    queryCustomerContactRecordList: port + "customer/queryCustomerContactRecordList",
    //新增客户联系记录
    addCustomerContactRecord: port + "customer/addCustomerContactRecord",
    //更新客户联系记录
    updateCustomerContactRecord: port + "customer/updateCustomerContactRecord",
    //删除客户联系记录
    delCustomerContactRecord: port + "customer/delCustomerContactRecord",
    //客户交易记录分页查询
    queryCustomerTradeRecordListByPage: port + "customer/queryCustomerTradeRecordListByPage",
    //更新公司完整信息
    updateCompanyInfo: port + "company/updateCompanyInfo",
    //我方账号操作相关接口
    //新增交易户
    addBusinessTradeHouse: port + "tradeHouseAccount/addBusinessTradeHouse",
    //新增交易户账号
    addBusinessTradeHouseAccount: port + "tradeHouseAccount/addBusinessTradeHouseAccount",
    //启用/停用商家交易户
    delBusinessTradeHouse: port + "tradeHouseAccount/delBusinessTradeHouse",
    //启用/停用交易户账号
    delBusinessTradeHouseAccount: port + "tradeHouseAccount/delBusinessTradeHouseAccount",
    //查询商家及其交易户详情
    getCompanyInfoAndTradeHouseList: port + "tradeHouseAccount/getCompanyInfoAndTradeHouseList",
    //分页获取交易户账号列表
    queryBusinessTradeHouseAccountList: port + "tradeHouseAccount/queryBusinessTradeHouseAccountList",
    //更新商家交易户
    updateBusinessTradeHouse: port + "tradeHouseAccount/updateBusinessTradeHouse",
    //更新交易户账号
    updateBusinessTradeHouseAccount: port + "tradeHouseAccount/updateBusinessTradeHouseAccount",
    //银行操作相关接口
    //(万商汇1.0)银行分类列表查询接口
    getCategoryBankListByPage: port + "categoryBank/getCategoryBankListByPage",
    //(万商汇1.0)编辑银行特价分类
    updateBankCategorySpecialPrice: port + "categoryBank/updateBankCategorySpecialPrice",
    //(万商汇1.0)编辑银行分类
    updateCategoryBankNew: port + "categoryBank/updateCategoryBankNew",
    //(万商汇1.0)根据银行名查询列表
    getSolrListByBankName: port + "categoryBank/getSolrListByBankName",
    //(万商汇1.0)根据银行简称查询列表
    getSolrListByBankShortName: port + "categoryBank/getSolrListByBankShortName",
    //特价票估价参数维护相关接口
    //新增特价票估价参数
    addAssSpecialPrice: port + "assSpecialPrice/addAssSpecialPrice",
    //复制特价票估价参数
    copyAssSpecialPrice: port + "assSpecialPrice/copyAssSpecialPrice",
    //删除特价票估价参数
    delAssSpecialPrice: port + "assSpecialPrice/delAssSpecialPrice",
    //查看拟购价详情
    getAssSpecialPriceBuyListByPage: port + "assSpecialPrice/getAssSpecialPriceBuyListByPage",
    //获取特价票估价参数列表
    queryAssSpecialPriceList: port + "assSpecialPrice/queryAssSpecialPriceList",
    //编辑特价票估价参数
    updateAssSpecialPrice: port + "assSpecialPrice/updateAssSpecialPrice",
    //商家买进机会相关接口
    //商家买进机会分页查询
    getBusinessBuyChanceListByPage: port + "businessBuyChance/getBusinessBuyChanceListByPage",
    //商家买进机会处理
    handleBusinessBuyChance: port + "businessBuyChance/handleBusinessBuyChance",
    //获取表单提交token
    getToken: port + "bmRepeatToken/getToken",
    //根据经理人获取员工树形结构
    getCompanyEmployeeTreeByRoleId: port + "companyEmployee/getCompanyEmployeeTreeByRoleId",
    //获取服务器时间接口
    getServerCurrentTime: port + "util/getServerCurrentTime",
    //banner管理
    bannerList: port + "appBanner/list",
    bannerAdd: port + "appBanner/add",
    bannerunlineUrl: port + "appBanner/downline",
    banneruplineUrl: port + "appBanner/upline",
    bannerdeleteUrl: port + "appBanner/remove",
    bannerupdateUrl: port + "appBanner/modify",
    //公司后台维护接口
    //新增公司
    addCompanyInfo: port + "company/addCompanyInfo",
    //获取公司信息
    getCompanyInfoById: port + "company/getCompanyInfoById",
    //公司分页查询
    getCompanyInfoByPage: port + "company/getCompanyInfoByPage",
    //修改公司
    updateCompanyInfo1: port + "company/updateCompanyInfo",
    //修改公司
    companyEnableOrDisable: port + "company/enableOrDisable",
    //统计相关接口
    //水域地图异常点展示
    trouble4Map: port + "stat/order/trouble4Map",
    //不同区域 指定时间段内（按年、按月、按日） 不同等级隐患数量 统计【柱状、线性、饼图
    troubleOfMsa: port + "stat/order/troubleOfMsa",
    //不同区域 指定时间段内（按年、按月、按日） 每天 不同等级隐患数量统计【柱状、线性】
    troubleOfMsaPreDay: port + "stat/order/troubleOfMsaPreDay",
    //当前部门及子部门 指定时间段 发布的检查单数量
    countOfCurrentMsa: port + "stat/order/countOfCurrentMsa",
    //当前部门及以下部门 指定时间段内 总的隐患数量
    troubleOfCurrentMsa: port + "stat/order/troubleOfCurrentMsa",
    //当前部门及以下部门 指定时间段内 隐患数量排名
    rankListTroubleOfCurrentMsa: port + "stat/order/rankListTroubleOfCurrentMsa",
    //不同区域 指定时间段内（按年、按月、按日） 不同等级隐患数量 统计【矢量地图
    troubleOfMsa4VectorMap: port + "stat/order/troubleOfMsa4VectorMap",
    //不同区域 指定时间段内（按年、按月、按日） 不同等级隐患数量 统计【表格】
    troubleOfMsa4Table: port + "stat/order/troubleOfMsa4Table",
    //不同区域 指定时间段内（按年、按月、按日） 每天 不同等级隐患数量统计【表格】
    troubleOfMsaPreDay4Table: port + "stat/order/troubleOfMsaPreDay4Table",
    //不同区域 指定时间段内（按年、按月、按日） 不同等级隐患数量 统计【Excel】
    troubleOfMsa4Excel: port + "stat/order/troubleOfMsa4Excel",
    //不同区域 指定时间段内（按年、按月、按日） 每天 不同等级隐患数量统计【excel】
    troubleOfMsaPreDay4Excel: port + "stat/order/troubleOfMsaPreDay4Excel",
    //01-01 检查单列表
    orderList: port + "order/list",
    // 获取当前部门ID 和 名称
    commonFilterData: port + "commonFilterData",
    //根据当前部门ID获取下一级部门，
    getChildByParId: port + "msaInfo/getChildByParId",
    //快报管理
    //删除快报
    articleDel: port + "article/del",
    //快报详情
    articleDetail: port + "article/detail",
    //管理端快报详情
    articleDetail4Manage: port + "article/detail4Manage",
    //快报列表
    articleList4Manage: port + "article/list4Manage",
    //发布 or 下架快报
    articlePost: port + "article/post",
    //快报详情编辑或新增
    articleSave: port + "article/save",
    //快报排序
    articleSort: port + "article/sort",
    //文章图片
    getArticleSign: port + "oss/getArticleSign",
    //账号审核列表
    accountApplyList: port + "account/apply/list",
    //审核通过
    accountApplyPass: port + "account/apply/pass",
    //审核不通过
    accountApplyRefuse: port + "account/apply/refuse",
    //获取所有的报表模板
    getAllTemplates: port + "statistic/listAllTemplate",
    queryStatisticTask: port + "statistic/listBasicInfoByCondition",
    //查询所有部门节点
    queryStatisticMsaDepartments: port + "statistic/listDepartmentByTemplateCode",
    //提交任务
    addNewTask: port + "statistic/createTask",
    updateNewTask: port + "statistic/updateTask",
    //删除任务
    delNewTask: port + "statistic/removeTask",
    //发布
    publishTask: port + "statistic/publishTask",
    //查询填写任务列表
    listTaskInfoByUser: port + "statistic/listTaskInfoByUser",
    // 返回模板
    infoDask: port + "statistic/listInfoDetailsByInfoId",
    // 录入通航安全业务工作量统计表
    SecurityRisk: port + "statistic/saveStowtss",
    // 长表
    SecurityRisk3: port + "statistic/saveTsowst",
    // 修改
    editSecurityRisk: port + "statistic/updateStowtss",
    // 登录者手机号
    phone: port + "statistic/getUserNameAndMobile",
    // 根据infoId返回区县填写界面的详细信息
    InfoGetdelites: port + "statistic/listInfoDetailsByInfoId",
    // 已上报
    listSucceedByUser: port + "statistic/listSucceedByUser",
    // 提交 - 树形结构
    getStatisticsInfo: port + "statistic/listStatisticsInfo",
    // 汇总表
    getStatistics: port + "statistic/getStatistics",
    // 根据taskID获取时间
    listStatsticsdayByTaskId: port + "statistic/listStatsticsdayByTaskId",
    // 发送短信
    send: port + "statistic/testSMS",
    // 根据detailID获取用户信息
    getNameAndMobileByDetailId: port + "statistic/getNameAndMobileByDetailId",
    // 根据detailID获取用户信息
    getDetailAndStatisticalResultByDetailId: port + "statistic/getDetailAndStatisticalResultByDetailId",
    // chart pie
    getStatsticsOfPieChart: port + "statistic/getStatsticsOfPieChart",
    // chart line
    getStatsticsOfLineChart: port + "statistic/getStatsticsOfLineChart",
    // 检查单
    // 检查对象
    listAllCheckSort: port + "checklist/listAllCheckSort",
    // 检查状态
    listAllItemOption: port + "checklist/listAllItemOption",
    // 查询符合条件的检查单
    listChecklistInfo: port + "checklist/listChecklistInfo",
    // 新增时的检查单位
    listDepartmentByUser: port + "checklist/listDepartmentByUser",
    // 检查单模糊匹配
    listTaskNameFuzzyQuery: port + "checklist/listTaskNameFuzzyQuery",
    // 检查表上传
    getOrderTplSign: port + "oss/getOrderTplSign",
    // test: port + "checklist/test",//测试文件上传
    // 创建检查单
    createChecklist: port + "checklist/createChecklist",
    // 检查单信息
    getTaskInfoById: port + "checklist/getTaskInfoById",
    // 删除检查单
    removeChecklistByTaskId: port + "checklist/removeChecklistByTaskId",
    // 编辑检查单
    updateChecklist: port + "checklist/updateChecklist",
    // 发布检查单
    checklistPublishTask: port + "checklist/publishTask",
    // 复用检查单
    reuseChecklistByTaskId: port + "checklist/reuseChecklistByTaskId",
    // 日常督查&专项检查单[条件查询]
    listCheckByConditional: port + "checklist/listCheckByConditional",
    // 根据deailId返回所有的检查项
    listAllItemByTaskId: port + "checklist/listAllItemByTaskId",
    // 工作台 检查时间 月
    homeListCheckMonth: charts + "listCheckMonth",
    // 工作台 数据
    homeListStatisticsByConditional: charts + "listStatisticsByConditional",
    // 公司名称模糊查询
    listCompanyFuzzyQuery: port + "checklist/listCompanyFuzzyQuery",
    // 获取角色等级
    getUserLevel: port + "checklist/getUserLevel",
    // 工作台 词云
    troubleWordCloudMap: charts + "troubleWordCloudMap",
    // 根据部门id获取部门名称
    getMsaInfo: port + "statistic/getMsaInfo",
    // 隐患地图
    checklistStatisticsByMap: charts + "checklistStatisticsByMap",
    // 区域统计
    checklistStatisticsByCity: charts + "checklistStatisticsByCity",
    // 区域统计 导出
    checklistStatisticsCityByExcel: charts + "checklistStatisticsCityByExcel",
    // 时间统计 线
    checklistStatisticsByDate: charts + "checklistStatisticsByDate",
    // 时间统计 表格
    checklistStatisticsDateByTable: charts + "checklistStatisticsDateByTable",
    // 时间统计 导出
    checklistStatisticsDateByExcel: charts + "checklistStatisticsDateByExcel",
    // 检查单基本数据
    // listChecklistMsaInfoAndBlockTime: port + "checklist/listChecklistMsaInfoAndBlockTime",

    // 所有固定报表
    listAllStatisticsTemplate: report + "listAllStatisticsTemplate",
    // 生成报表
    createTask: report + "createTask",
    // 报表查询
    listTaskBasicInfoByCondition: report + "listTaskBasicInfoByCondition",
    // 删除报表
    deleteTaskById: report + "deleteTaskById",
    // 编辑报表
    getTaskById: report + "getTaskById",
    // 发布报表
    reportPublishTask: report + "publishTask",
    // 编辑报表
    updateTask: report + "updateTask",
    // 删除报表
    stopTaskById: report + "stopTaskById",
    // 查看报表
    getTaskDetailByTaskId: report + "getTaskDetailByTaskId",

    // 接收汇总
    listStatisticsBasicInfoByCondition: report + "listStatisticsBasicInfoByCondition",

    // 保存按钮
    insertStatistics: report + "insertStatistics",
    // 接收 信息
    listByReceptionButton: report + "listByReceptionButton",
    // 上报|填报 信息
    listByWriteButton: report + "listByWriteButton",

    // 接收页面
    listReceptionInfo: report + "listReceptionInfo",
    // 统计
    statistics: report + "statistics",
    // 填写界面基本信息
    listWriteInfoByTaskId: report + "listWriteInfoByTaskId",
    //填写界面报表状态详细信息  
    listWriteDetailInfoByDetailId: report + "listWriteDetailInfoByDetailId",
    // 统计
    statistics: report + "statistics",
    // 上报
    uploadDetail: report + "uploadDetail",
    // 报表状态
    listReceptionDetail: report + "listReceptionDetail",
    // 退回按钮
    returnDetail: report + "returnDetail",
    // 汇总数据
    summarizQueryCondition: report + "summarizQueryCondition",
    // 汇总
    summarizTask: report + "summarizTask",
    // 导出为Excel
    summarizTaskForExcel: report + "summarizTaskForExcel",

    // 隐患复查审核页面隐患详情
    getReviewDetailForPass: checklist + "getReviewDetailForPass",
    // 隐患复查审核页面条件查询[审核]
    listReviewAuditByConditional: checklist + "listReviewAuditByConditional",
    // 审核
    checkPass: checklist + "checkPass",

    listAllDeptByMsaId: dept + "listAllDeptByMsaId", //返回当前海事部门下的所有科室
    deleteDept: dept + "deleteDept", //删除、停用科室
    getEmployeeCount: msaInfo + "getEmployeeCount", // 在职人员人数
    updateDept: dept + "updateDept", //编辑科室
    addDept: dept + "addDept", //编辑科室    // 检查项目管理
    projectItem: port + "checklistSort/listAllSortLevel",
    // 基本信息
    listSortLevelDetail: port + "checklistSort/listSortLevelDetail",
    // 删除分级
    deleteSortLevel: port + "checklistSort/deleteSortLevel",
    // 增加分级
    addSortLevel: port + "checklistSort/addSortLevel",
    // 编辑分级
    updateSortLevel: port + "checklistSort/updateSortLevel",
    // 安全检查
    listPatrolInfo: port + "checklist/listPatrolInfo",
    // 安全检查 检查单
    listChecklistByConditional: port + "checklist/listChecklistByConditional",
    // 检查对象分类分级相关接口
    listSortLevelBySortId: port + "checklistSort/listSortLevelBySortId",


    listChecklist: checklist + "listChecklist", // 检查单页面[新]

    listSortLevelBySortIdAndMsaId: checklistSort + "listSortLevelBySortIdAndMsaId", // 返回当前类型当前海事部门的所有分级
    listCompanyByConditional: port + "company/listCompanyByConditional", // 公司条件查询[新]
    getCompanyExponentInfo: port + "company/getCompanyExponentInfo", // 返回公司指数信息

    importCompanys: port + "company/importCompanys", // 检查对象批量导入
    massTransferSortLevel: port + "company/massTransferSortLevel", // 批量转移公司分级

    blockChecklist: spChecklistController + "blockChecklist", //停用专项检查单 
    spCreateChecklist: spChecklistController + "createChecklist", //创建专项检查 post
    publishSpTaskPage: spChecklistController + "publishSpTaskPage", //发布专项检查页面
    spPublishTask: spChecklistController + "publishTask", //发布专项检查单
    removeChecklist: spChecklistController + "removeChecklist", //删除专项检查检查单
    spUpdateChecklist: spChecklistController + "updateChecklist", //编辑专项检查 post
    listSpDetailByTaskId: spChecklistController + "listSpDetailByTaskId", //专项检查单列表页面
    spChecklistStatisticsPage: spChecklistController + "spChecklistStatisticsPage", //专项检查统计页面
    listCheckMsaIdName: spChecklistController + "listCheckMsaIdName", // 返回专项检查被统计部门信息
    listChecklistByCode: port + "checklist/listChecklistByCode", // 检查单编号条件查询

    createSpTaskPage: newSpChecklistController + "createSpTaskPage", // 开展专项检查页面
    createSpTask: newSpChecklistController + "createSpTask", // 开展专项检查
    blockSpTask: newSpChecklistController + "blockSpTask", //停用专项检查
    removeSpTask: newSpChecklistController + "removeSpTask", // 删除专项检查
};

export default apiList;