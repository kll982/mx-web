export const allMenu = [
  {
    key:"home",
    name: '工作站',
    url: 'main/home',
    icon: 'home',
  },
  {
    key:"echart",
    name: '统计报表',
    icon: 'smile-o',
    children: [
      {
        key:"echarts1",
        url: "main/echarts",
        name: "隐患区域统计",
      },
    ]
  },
  {
    key:" businessmanage",
    name: '系统管理',

    icon: 'user',
    children: [
      {
        key:"staffmanage",
        url: 'main/staffmanage',
        name: '员工管理',
      },
      {
        key:"departmentset",
        url: 'main/departmentset',
        name: '部门管理',
      },
      {
        key:"roleset",
        url: 'main/roleset',
        name: '角色权限设置',
      },
      {
        key:"companymanage",
        url: 'main/companymanage',
        name: '公司管理1111',
      },
      {
        key:"bannermanage",
        url: 'main/bannermanage',
        name: 'banner管理',
      },
    ]
  },
]

