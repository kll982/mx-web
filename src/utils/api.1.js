
// var port = "http://bm-t.jinbill.com/";
// var loginport="http://passport-test.jinbill.com/";
// var port = "https://bmbm-new.jinbill.com/";
// var loginport="https://passport-new.jinbill.com/";
var port = "http://bm-110.jinbill-99.com/";
var loginport="http://passport-110.jinbill-99.com/";
if (window.bowserEnv === 'test') {
  port = "http://bm-local-test.jinbill.com/";
  loginport="http://passport-local-test.jinbill.com/";
  // loginport="http://passport-test.jinbill.com/"; 
  // port = "http://bm-t.jinbill.com/";
}else if (window.bowserEnv === 'test_0308merge') {
  port = "http://bm-120.jinbill-99.com/"
  loginport="http://passport-120.jinbill-99.com/";
} else if (window.bowserEnv === 'test_0413') {
  port = "http://bm-110.jinbill-99.com/"
  loginport="http://passport-110.jinbill-99.com/";
} else if (window.bowserEnv === 'product') {
  port = "https://bmbm-new.jinbill.com/";
  loginport="https://passport-new.jinbill.com/";
}

const apiList = {
  tradePageSize:5,
  pageSize:10,
  total:10,
  //所有的url都列在这里
  login: loginport + 'bmlogin',
  logout: loginport + 'bmlogout',
  checkBmSSO:loginport+"checkBmSSO",
  //获取用户的信息
  getUserInfo:port+"companyEmployee/findBmUserInfo",
  //权限管理
  //返回所有权限菜单
  getAllMenu:port+"permission/allPrivileges",
  //添加权限
  addpermission:port+"permission/add",
  
  //返回用户的权限菜单

  getUserAllMenu:port+"permission/findPrivilegesByRoleId",
  //返回用户所有权限字符串code
  getUserAllCode:port+"permission/getPrivilegesByUserId",

  //管理员设置
  addRoleToUser:port+"admin/addRoleToUser",
  addUser:port+"admin/addUser",
  getallUsers:port+"admin/allUsers",
  forbidUserById:port+"admin/forbidUserById",
  modifyUser:port+"admin/modifyUser",
  resetPwd:port+"admin/resetPwd",

  //用户相关接口

  findPrivileges:port+"permission/findPrivilegesByUserId",
  ueserresetPwd:port+"user/resetPwd",

  //角色设置
  addPermission2Role:port+"role/addPermission2Role",
  getRoleList:port+"role/getAll",


  //银行设置
  bankgetList: port + "categoryBank/queryCategoryBank",
  bankadd: port + "categoryBank/addCategoryBank",
  bankdelete: port + "categoryBank/delCategoryBank",
  bankedit: port + "categoryBank/updateCategoryBank",
  bankupdateSolr: port + "categoryBank/updateSolrCategoryBank",
  //银行分类关系
  classgetLis: port + "categoryBank/queryCategoryTypeRelation",
  classadd: port + "categoryBank/addCategoryTypeRelation",
  classedit: port + "categoryBank/updateCategoryTypeRelation",
  classdelete: port + "categoryBank/delCategoryTypeRelation",

  //电票查询
  dgetListUrl: port + "digitalTicketAssess/getDigitalTicketAssessByPage",
  ddealUrl: port + "digitalTicketAssess/handleDigitalTicketAssess",
  //纸票查询
  zgetListUrl:port+"appPaperTicketAssess/getListByPage",
//纸票估价
  //50-100万
  fiftytohundredgetList: port + "assPaper/getPaper50100",
  fiftytohundreadd: port + "assPaper/addPaper50100",
  //足半年整数票
  halfgetListUrl: port + "assPaper/getPaper10300Integer",
  halfaddUrl: port + "assPaper/addPaper10300Integer",
  //50到100万整数票
  fhgetListUrl: port + "assPaper/getPaper50100Integer",
  fhaddUrl: port + "assPaper/addPaper50100Integer",
  //200到300万整数票
  ttgetListUrl: port + "assPaper/getPaper200300Integer",
  ttaddUrl: port + "assPaper/addPaper200300Integer",
  //100-200万整数票
  ohgetListUrl: port + "assPaper/getPaper100200Integer",
  ohaddUrl: port + "assPaper/addPaper100200Integer",
  //50-100万
  tenfiftygetListUrl: port + "assPaper/getPaper1050",
  tenfiftyaddUrl: port + "assPaper/addPaper1050",
  //100-300万
  onetothreegetListUrl: port + "assPaper/getPaper100300",
  onetothreeaddUrl: port + "assPaper/addPaper100300",
  //0-10万
  //assPaper/addPaper010
  zerogetListUrl: port + "assPaper/getPaper010",
  zeroaddUrl: port + "assPaper/addPaper010",

  //电票估价(查询)
  //1
  getElectronic05:port+"assElectronic/getElectronic05",
  //2
  getElectronic550:port+"assElectronic/getElectronic550",
  //3
  getElectronic1050Integer:port+"assElectronic/getElectronic1050Integer",
  //4
  getElectronic50100:port+"assElectronic/getElectronic50100",
  //5
  getElectronic100200:port+"assElectronic/getElectronic100200",
  //6
  getElectronic200300:port+"assElectronic/getElectronic200300",
  //7
  getElectronic300500:port+"assElectronic/getElectronic300500",
  //8
  getElectronic500700:port+"assElectronic/getElectronic500700",
  //9
  getElectronic7001000:port+"assElectronic/getElectronic7001000",
  //10
  getElectronic1000100000:port+"assElectronic/getElectronic1000100000",

  //(编辑)
  //1
  addElectronic05:port+"assElectronic/addElectronic05",
  //2
  addElectronic550:port+"assElectronic/addElectronic550",
  //3
  addElectronic1050Integer:port+"assElectronic/addElectronic1050Integer",
  //4
  addElectronic50100:port+"assElectronic/addElectronic50100",
  //5
  addElectronic100200:port+"assElectronic/addElectronic100200",
  //6
  addElectronic200300:port+"assElectronic/addElectronic200300",
  //7
  addElectronic300500:port+"assElectronic/addElectronic300500",
  //8
  addElectronic500700:port+"assElectronic/addElectronic500700",
  //9
  addElectronic7001000:port+"assElectronic/addElectronic7001000",
  //10
  addElectronic1000100000:port+"assElectronic/addElectronic1000100000",


  //获取票面的公共接口
  getPic:port+"billGodownEntry/getPic",
  //获取票号的公共接口
  getTicketNo:port+"billGodownEntry/getTicketNo",
  //获取部门和员工
  getAllCompanyDepartmentTreeWithEmp:port+"companyDepartment/getAllCompanyDepartmentTreeWithEmp",
  //票据入库列表
  billinList:port+"billGodownEntry/queryBillGodownEntryListV100",
  billindetail:port+"billGodownEntry/getBillGodownEntryDetail",
  billincancel:port+"billGodownEntry/cancel",
  addBillGodownEntry:port+"billGodownEntry/addBillGodownEntryWithSubmit",
  addBillGodownEntryWithSave:port+"billGodownEntry/addBillGodownEntryWithSave",
  //票面识别
  recoginze:port+"ocrBank/recoginze",
  //票面识别有问题
  addErrorRecord:port+"ocrBank/addErrorRecord",
  //根据银行名称获取总行id接口
  queryBankCategoryId:port+"categoryBank/queryBankCategoryId",
  //根据总行id获取总行承兑方类型
  getBankCategory:port+"categoryBank/getBankCategory",
  //付款交易户列表
  queryTradeHouse:port+"tradeHouseAccount/queryTradeHouseAccount",

  //审核入库订单
  updateOrderWithCheck:port+"billGodownEntry/updateOrderWithCheck",
  //调整天
  getAdjustDay:port+"billGodownEntry/getAdjustDay",
  //接单
  addOrderReceive:port+"billGodownEntry/addOrderReceive",
  //入库转单
  addTransferOrder:port+"billGodownEntry/addTransferOrder",
  //根据大分类返回所有具有该分类的员工
  findUserListByRoleBank:port+"billGodownEntry/findUserListByRoleBank",
  //根据交易户获取交易记录列表(入库,出库,退票)
  queryCustomerTradeRecord:port+"billGodownEntry/queryCustomerTradeRecord",
  //票据出库
  billoutList:port+"billOutStock/queryBillOutStock",
  billoutcancel:port+"billOutStock/cancel",
  //出库转单
  addTransferOrderOut:port+"billOutStock/addTransferOrder",
  //退票入库转单
  addTransferOrderback:port+"billOutStock/addTransferOrder",
  //票据出库保存接口
  addBillOutStockWithSave:port+"billOutStock/addBillOutStockWithSave",
  //票据出库提交接口
  addBillOutStockWithSubmit:port+"billOutStock/addBillOutStockWithSubmit",
  //票据出库详情
  getBillOutStockDetail:port+"billOutStock/getBillOutStockDetail",
  //获取可以出库的库存列表
  queryBillRepertoryWithOut:port+"billRepertory/queryBillRepertoryWithOut",
  //出库审核
  updateoutOrderWithCheck:port+"billOutStock/updateOrderWithCheck",
  //出库作废
  updateOutStockWithCancel:port+"billOutStock/updateOutStockWithCancel",
  //获取库存票面
  getRepertoryPics:port+"billRepertory/getPics",
  //获取出库票面
  getoutStockPics:port+"billOutStock/getPics",
  //出库接单
  addOutOrderReceive:port+"billOutStock/addOrderReceive",
  //保存背书状态
  updateOrderReciteStatus:port+"billOutStock/updateOrderReciteStatus",
  //退票入库列表
  billbacklist:port+"refundGodownEntry/queryRefundGodownEntry",
  //退票入库详情
  billbackdetail:port+"refundGodownEntry/getRefundGodownEntryDetail",
  //退票入库票面
  billbackgetPics:port+"refundGodownEntry/getPics",
  //退票入库转单
  addTransferOrderRefund:port+"refundGodownEntry/addTransferOrder",
  //退票入库审核
  updatebillbackOrderWithCheck:port+"refundGodownEntry/updateOrderWithCheck",
  //退票入库提交
  addRefundGodownEntryWithSubmit:port+"refundGodownEntry/addRefundGodownEntryWithSubmit",
  //退票入库保存
  addRefundGodownEntryWithSave:port+"refundGodownEntry/addRefundGodownEntryWithSave",
  //退票入库接单
  addbillbackOrderReceive:port+"refundGodownEntry/addOrderReceive",
  //退票入库作废
  updateRefundWithCancel:port+"refundGodownEntry/updateRefundWithCancel",
  queryOutStockWithRefund:port+"billOutStock/queryOutStockWithRefund",

  //库存
  companyList:port+"billRepertory/queryBillRepertoryList",
  companyDetail:port+"billRepertory/getBillRepertoryDetail",
  //批量操作库存票据接口
  updateBillRepertoryWithBatch:port+"billRepertory/updateBillRepertoryWithBatch",
  //更改拟售价
  updateExpectPoint:port+"billRepertory/updateExpectPoint",
  //库存详情-匹配
  queryBillRepertorMatchList:port+"billRepertory/queryBillRepertorMatchList",
  //库存备注记录
  queryBillRepertoryRemarksList:port+"billRepertory/queryBillRepertoryRemarksList",
  //更新库存状态接口
  updateBillRepertorStatus:port+"billRepertory/updateBillRepertorStatus",
  //更新备注
  updateRemarks:port+"billRepertory/updateRemarks",
  //库存作废
  updateBillRepertorWithCancel:port+"billRepertory/updateBillRepertorWithCancel",
  //新增票据库存预订保存接口
  addBillRepertorReserveWithSave:port+"billRepertoryReserve/addBillRepertorReserveWithSave",
  //新增库存票据预订提交接口
  addBillRepertorReserveWithSubmit:port+"billRepertoryReserve/addBillRepertorReserveWithSubmit",
  //库存预订列表
 predeterList:port+"billRepertoryReserve/queryBillRepertoryList",
//取消预订
predeterCancel:port+"billRepertoryReserve/updateRepertoryReserveWithCancel",
//库存预订详情
predeterDetail:port+"billRepertoryReserve/getRepertoryReserveDetail",
//待收款列表
queryDueinAccountBill:port+"finance/queryDueinAccountBill",
//待付款列表
queryWaitPayAccountBill:port+"finance/queryWaitPayAccountBill",
//预收定金列表
queryDepositReceivedBill:port+"finance/queryDepositReceivedBill",
//处理
updateRepertoryReserveWithHandle:port+"billRepertoryReserve/updateRepertoryReserveWithHandle",
//获取票号该交易户背书状态接口
getTicketNoReciteStatus:port+"billGodownEntry/getTicketNoReciteStatus",

setSync:port+"businessInventory/setSync",
getSync:port+"businessInventory/getSync",
//估价同步到app
getAssessSync:port+ "assessSync/getAssessSync",
updateAssessSync:port+"assessSync/updateAssessSync",
//获取图片上传阿里云需要的数据
getOssTicketSign:port+"oss/getOssSTSPackageTicketSign",

  
  //角色管理
 //部门设置
 addCompanyDepartment:port+"companyDepartment/addCompanyDepartment",
 enableOrDisable:port+"companyDepartment/enableOrDisable",
 getAllCompanyDepartment:port+"companyDepartment/getAllCompanyDepartment",
 getAllCompanyDepartmentTree:port+"companyDepartment/getAllCompanyDepartmentTree",
 companysort:port+"companyDepartment/sort",
 upDateCompanyDepartment:port+"companyDepartment/upDateCompanyDepartment",


  //角色管理
  addRole:port+"role/addRole",
  deleteRole:port+"role/deleteRole",
  getAll:port+"role/getAll",
  getAllRole:port+"role/getAllRole",
  getPermissionOfRole:port+"role/getPermissionOfRole",
  modifyRole:port+"role/modifyRole",

//权限管理
addPermission:port+"permission/addPermission",
allPrivileges:port+"permission/allPrivileges",
findPrivilegesByRoleId:port+"permission/findPrivilegesByRoleId",
findPrivilegesByUserId:port+"permission/findPrivilegesByUserId",

  //员工管理
  addCompanyEmployee:port+"companyEmployee/addCompanyEmployee",
  getCompanyEmployeeByPage:port+"companyEmployee/getCompanyEmployeeByPage",
  joinAgain:port+"companyEmployee/joinAgain",
  revokeJoin:port+"companyEmployee/revokeJoin",
  upDateCompanyEmployee:port+"companyEmployee/upDateCompanyEmployee",
  upDateJobStatus:port+"companyEmployee/upDateJobStatus",

  getAllCompanyDepartmentTreeInUse:port+"companyDepartment/getAllCompanyDepartmentTreeInUse",

  //获取公司信息
  getByCompanyId:port+"company/getByCompanyId",

  //修改密码
  updateBmPwd:loginport+"updateBmPwd",
  //获取入库草稿按钮
  getdraftList:port+"billGodownEntryDraft/queryBillGodownEntryDraftList",
  deleteDraft:port+"billGodownEntryDraft/delBillGodownEntryDraft",
  //根据草稿ID获取草稿票面和草稿票号接口
  findPicAndTicketNoByDraftId:port+"billGodownEntryDraft/findPicAndTicketNoByDraftId",
  //新增入库草稿
  addBillGodownEntryDraft:port + "billGodownEntryDraft/addBillGodownEntryDraft",
  updateBillGodownEntryDraft:port+ "billGodownEntryDraft/updateBillGodownEntryDraft",
  

  //钱海添加
  queryTradeOrder:port+"digitalBillOrder/queryTradeOrder",

  confirmSign:port+"digitalBillOrder/confirmSign",

  confirmPay:port+"digitalBillOrder/confirmPay",

  getTradeOrderDetail:port+"digitalBillOrder/getTradeOrderDetail",

  confirmRecite:port+"digitalBillOrder/confirmRecite",

  cancelTradeOrder:port+"digitalBillOrder/cancelTradeOrder",

  updateCompany:port+"company/updateCompany",

  getTradeAgreementUrl:port+"digitalBillOrder/getTradeAgreementUrl",

  //获取订单交易动态
  queryTradeOrderOrbit:port+"digitalBillOrder/queryTradeOrderOrbit",

  //客户管理
  //新增客户
  addCustomer:port+"customer/addCustomer",
  //新增客户交易户
  addCustomerTradeHouse:port+"customer/addCustomerTradeHouse",
  //新增交易户账号
  addCustomerTradeHouseAccount:port+"customer/addCustomerTradeHouseAccount",
  //删除客户交易户
  delCustomerTradeHouse:port+"customer/delCustomerTradeHouse",
  //删除交易户账号
  delCustomerTradeHouseAccount:port+"customer/delCustomerTradeHouseAccount",
  //潜在用户加入/拒绝
  potentialCustomerYesOrNo:port+"customer/potentialCustomerYesOrNo",
  //获取黑/白/潜在客户列表
  queryBlackOrWhiteCustomerList:port+"customer/queryBlackOrWhiteCustomerList",

  
  //获取客户列表
  queryCustomer:port+"customer/queryCustomer",
  //查询客户及其交易户详情
  queryCustomerAndTradeHouseList:port+"customer/queryCustomerAndTradeHouseList",
  //获取客户交易户账号列表
  queryCustomerTradeHouseAccount:port+"customer/queryCustomerTradeHouseAccount",
  //分页获取交易户账号列表
  queryCustomerTradeHouseAccountList:port+"customer/queryCustomerTradeHouseAccountList",
  //更新客户信息
  updateCustomer:port+"customer/updateCustomer",
  //更新客户状态
  updateCustomerStatus:port+"customer/updateCustomerStatus",
  //更新客户交易户
  updateCustomerTradeHouse:port+"customer/updateCustomerTradeHouse",
  //更新交易户账号
  updateCustomerTradeHouseAccount:port+"customer/updateCustomerTradeHouseAccount",

   //获取客户联系记录列表
   queryCustomerContactRecordList:port+"customer/queryCustomerContactRecordList",
   //新增客户联系记录
   addCustomerContactRecord:port+"customer/addCustomerContactRecord",
   //更新客户联系记录
   updateCustomerContactRecord:port+"customer/updateCustomerContactRecord",
   //删除客户联系记录
   delCustomerContactRecord:port+"customer/delCustomerContactRecord",
   //客户交易记录分页查询
   queryCustomerTradeRecordListByPage:port+"customer/queryCustomerTradeRecordListByPage",
   //更新公司完整信息
   updateCompanyInfo:port+"company/updateCompanyInfo",

   //我方账号操作相关接口
   //新增交易户
   addBusinessTradeHouse:port+"tradeHouseAccount/addBusinessTradeHouse",
   //新增交易户账号
   addBusinessTradeHouseAccount:port+"tradeHouseAccount/addBusinessTradeHouseAccount",
   //启用/停用商家交易户
   delBusinessTradeHouse:port+"tradeHouseAccount/delBusinessTradeHouse",
   //启用/停用交易户账号
   delBusinessTradeHouseAccount:port+"tradeHouseAccount/delBusinessTradeHouseAccount",
   //查询商家及其交易户详情
   getCompanyInfoAndTradeHouseList:port+"tradeHouseAccount/getCompanyInfoAndTradeHouseList",
   //分页获取交易户账号列表
   queryBusinessTradeHouseAccountList:port+"tradeHouseAccount/queryBusinessTradeHouseAccountList",
   //更新商家交易户
   updateBusinessTradeHouse:port+"tradeHouseAccount/updateBusinessTradeHouse",
   //更新交易户账号
   updateBusinessTradeHouseAccount:port+"tradeHouseAccount/updateBusinessTradeHouseAccount",
   //银行操作相关接口
   //(万商汇1.0)银行分类列表查询接口
   getCategoryBankListByPage:port+"categoryBank/getCategoryBankListByPage",
   //(万商汇1.0)编辑银行特价分类
   updateBankCategorySpecialPrice:port+"categoryBank/updateBankCategorySpecialPrice",
   //(万商汇1.0)编辑银行分类
   updateCategoryBankNew:port+"categoryBank/updateCategoryBankNew",
  //(万商汇1.0)根据银行名查询列表
  getSolrListByBankName:port+"categoryBank/getSolrListByBankName",
  //(万商汇1.0)根据银行简称查询列表
  getSolrListByBankShortName:port+"categoryBank/getSolrListByBankShortName",

   //特价票估价参数维护相关接口
   //新增特价票估价参数
   addAssSpecialPrice:port+"assSpecialPrice/addAssSpecialPrice",
   //复制特价票估价参数
   copyAssSpecialPrice:port+"assSpecialPrice/copyAssSpecialPrice",
   //删除特价票估价参数
   delAssSpecialPrice:port+"assSpecialPrice/delAssSpecialPrice",
   //查看拟购价详情
   getAssSpecialPriceBuyListByPage:port+"assSpecialPrice/getAssSpecialPriceBuyListByPage",
   //获取特价票估价参数列表
   queryAssSpecialPriceList:port+"assSpecialPrice/queryAssSpecialPriceList",
   //编辑特价票估价参数
   updateAssSpecialPrice:port+"assSpecialPrice/updateAssSpecialPrice",

   //商家买进机会相关接口
   //商家买进机会分页查询
   getBusinessBuyChanceListByPage:port+"businessBuyChance/getBusinessBuyChanceListByPage",
   //商家买进机会处理
   handleBusinessBuyChance:port+"businessBuyChance/handleBusinessBuyChance",

   //获取表单提交token
   getToken:port+"bmRepeatToken/getToken",

    //根据经理人获取员工树形结构
    getCompanyEmployeeTreeByRoleId:port+"companyEmployee/getCompanyEmployeeTreeByRoleId",

    //获取服务器时间接口
    getServerCurrentTime:port+"util/getServerCurrentTime",
    //获取交易列表待办事项状态
    getWaitHandleStatus:port+"digitalBillOrder/getWaitHandleStatus"
    

};

export default apiList;
