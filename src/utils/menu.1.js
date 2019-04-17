export const allMenu = [
  {
    key:"home",
    name: '首页',
    url: 'main/home',
    icon: 'home',
  },
  {
    key:"dian",
    name: '电票交易订单',
    icon: 'home',
    children: [
      {
        key:"buybill",
        url: "main/buybill",
        name: "买票交易订单",
      },
      {
        key:"sellbill",
        url: "main/sellbill",
        name: "卖票交易订单",
      } 
    ]
  },
   {
    key:"evaluate",
    name: '票据估价',
    icon: 'smile-o',
    children: [
      {
        key:"specialevaluate",
        url: "main/specialevaluate",
        name: "特价票估价参数",
      },
      {
        key:"zero_ten",
        url: "main/zero_ten",
        name: "纸票估价参数",
      },
      {
        key:"zeroTofive",
        url: "main/zeroTofive",
        name: "电票估价参数",
      },
      {
        key:"buyin",
        url: "main/buyin",
        name: "买进机会",
      },
      
      {
        key:"bankset",
        url: "main/bankset",
        name: "银行分类设置",
      },
    ]

  },

  {
    key:"customer",
    name: '客户管理',
    icon: 'home',
     children: [
      {
        key:"customerlist",
        url: "main/customerlist",
        name: "客户列表",
      },
      {
        key:"customerwhitelist",
        url: "main/customerwhitelist",
        name: "客户白名单",
      },
      {
        key:"customerblacklist",
        url: "main/customerblacklist",
        name: "客户黑名单",
      },
      {
        key:"latentcustomer",
        url: "main/latentcustomer",
        name: "潜在客户管理",
      } 
    
    ]
  },

  {
    key:"invoicing",
    name: '库存票据管理',
    icon: 'mobile',
    children: [
      {
        key:"billin",
        url: 'main/billin',
        name: '票据入库',
      },
      {
        key:"billout",
        url: 'main/billout',
        name: '票据出库',
      },
      {
        key:"billback",
        url: 'main/billback',
        name: '退票入库',
      },
      {
        key:"companybill",
        url: 'main/companybill',
        name: '库存票据',
      },
      {
        key:"predetermine",
        url: 'main/predetermine',
        name: '库存预定',
      },
    ]
  }, 
  {
    key:"financemanage",
    name: '财务管理',
    icon: 'bars',
    children: [
      {
        key:"reciveamount",
        url: 'main/reciveamount',
        name: '待收账款列表',
      },
      {
        key:"payamount",
        url: 'main/payamount',
        name: '待付账款列表',
      },
      {
        key:"willamount",
        url: 'main/willamount',
        name: '预收定金列表',
      },
    ]
  }, 
  {
    key:" businessmanage",
    name: '企业管理',

    icon: 'user',
    children: [
      {
        key:"baseinfo",
        url: 'main/baseinfo',
        name: '基本信息',
      },
      {
        key:"departmentset",
        url: 'main/departmentset',
        name: '部门管理',
      },
      {
        key:"staffmanage",
        url: 'main/staffmanage',
        name: '员工管理',
      },
       {
        key:"roleset",
        url: 'main/roleset',
        name: '角色权限设置',
      },
      {
        key:"accountmanage",
        url: 'main/accountmanage',
        name: '交易户管理',
      }

    ]
  },

]

