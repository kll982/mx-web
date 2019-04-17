// import moment from "moment";
// import {message} from "antd";
var styles=require("../pages/bill/addbill.less");
function formating(obj,num) { 
    obj = obj.replace(/[^\d.]/g, "");  
        //必须保证第一位为数字而不是.
        obj = obj.replace(/^\./g, "");  
        //保证只有出现一个.而没有多个.
        obj = obj.replace(/\.{2,}/g, "."); 
        //保证.只出现一次，而不能出现两次以上
        obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        if(num==2){
          obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入2个小数   
        }
        if(num==3){
          obj = obj.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3');//只能输入4个小数
        }

        if(num==4){
          obj = obj.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3');//只能输入4个小数   
        }
        if(num==6){
          obj = obj.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/,'$1$2.$3');//只能输入6个小数   
        }  
        return obj;
}

function zNumber(obj){
	if(obj.length==1){
		obj=obj.replace(/[^1-9]/g,'');
	}else{
		obj=obj.replace(/\D/g,'');
		
	}
	  return obj;
}
function zreoNumber(obj){
	if(obj.length==1){
		obj=obj.replace(/[^0-9]/g,'');
	}else{
		obj=obj.replace(/\D/g,'');
		
	}
	  return obj;
}
//数组中书否含有某个值
function arrInclue(arr,num){
  for (let i in arr) {
    if (arr[i] == num) return true;
  }
  return false;
}

//入库时数据计算
function caculate(buyOrSell,self,amount,quoteType,rate,small,handleCharge,payAmount,realPoint,payType,payed,willPay,adjustDay,outMoney){
  
    if(amount){
      if(quoteType==2){
        var amounts=(amount-0)*10000||0;
        var smalls=small-0||0;
        var handleCharges=handleCharge-0||0;
        var payAmounts=payAmount-0||0; //应付大款
        var realPoints=realPoint-0||0; 
        var payeds=payed-0||0;
        var willPays=willPay-0||0;
        var adjustDays=adjustDay;
        var outMoneys=outMoney-0||0;
        var realMoney=0;
        var rates=rate/100;//扣点
        var money = amounts * rates;// 票面贴息
        payAmounts=amounts-money; // 应付大款
        
        if(buyOrSell==1){
          realMoney=money-(amounts/100000)*smalls; //买票-真实贴息
        }else if(buyOrSell==2){
          realMoney=money+(amounts/100000)*smalls;//卖票-真实贴息
        }
        
        realPoints=(realMoney/amounts)*100; //真实扣点
       
        if(payType==0){
          payeds=0;
          willPays=payAmounts;
        }else if(payType==1){
          willPays=payAmounts-payeds;
          if(payeds>payAmounts){
            payeds=payAmounts;
          }else if(payeds<0){
            payeds=0;
          }
          if(willPays>payAmounts){
            willPays=payAmounts;
          }else if(willPays<0){
            willPays=0;
          }
        }else{
          payeds=payAmounts;
          willPays=0;
        }
        var chaAmount=((payAmounts-outMoneys)-0).toFixed(2);
        if(chaAmount==="-0.00"){
          chaAmount=0.00;
        }else{
          chaAmount=chaAmount;
        }
        self.setState({
          payAmount:payAmounts.toFixed(2),
          realPoint:realPoints.toFixed(4),
          payedAmount:payeds.toFixed(2),
          noPayedAmount:willPays.toFixed(2),
          chaAmount:chaAmount,
        });
      }else if(quoteType==0){
        var amounts=(amount-0)*10000||0;
        var smalls=small-0||0;
        var handleCharges=handleCharge-0||0;
        var payAmounts=payAmount-0||0;
        var realPoints=realPoint-0||0;
        var payeds=payed-0||0;
        var willPays=willPay-0||0;
        var adjustDays=adjustDay;
        var outMoneys=outMoney-0||0;
        var realMoney=0;
        var rates=(rate / 1000) *(adjustDays / 30);
        
        var money = amounts * rates+(amounts/100000)*handleCharges;// 票面贴息
        payAmounts=amounts-money;
       
        if(buyOrSell==1){
          realMoney=money-(amounts/100000)*smalls;
        }else if(buyOrSell==2){
          realMoney=money+(amounts/100000)*smalls;
        }
        realPoints=(realMoney/amounts)*100;
        if(payType==0){
          payeds=0;
          willPays=payAmounts;
        }else if(payType==1){
          // payeds=payAmounts-willPays;
          willPays=payAmounts-payeds;
          if(payeds>payAmounts){
            payeds=payAmounts;
          }else if(payeds<0){
            payeds=0;
          }
          if(willPays>payAmounts){
            willPays=payAmounts;
          }else if(willPays<0){
            willPays=0;
          }
        }else{
          payeds=payAmounts;
          willPay=0;
        }
        var chaAmount=((payAmounts-outMoneys)-0).toFixed(2);
        
        if(chaAmount==="-0.00"){
          chaAmount=0.00;
        }else{
          chaAmount=chaAmount;
        }
        
        self.setState({
          payAmount:payAmounts.toFixed(2),
          realPoint:realPoints.toFixed(4),
          payedAmount:payeds.toFixed(2),
          noPayedAmount:willPays.toFixed(2),
          chaAmount:chaAmount,
        });
      }else{
        var amounts=(amount-0)*10000||0;
        var smalls=small-0||0;
        var handleCharges=handleCharge-0||0;
        var payAmounts=payAmount-0||0;
        var realPoints=realPoint-0||0;
        var payeds=payed-0||0;
        var willPays=willPay-0||0;
        var adjustDays=adjustDay;
        var outMoneys=outMoney-0||0;
        var realMoney=0;
        var rates=(rate / 100) *(adjustDays/ 360);
        var money = amounts * rates+(amounts/100000)*handleCharges;// 票面贴息
        payAmounts=amounts-money;
        if(buyOrSell==1){
          realMoney=money-(amounts/100000)*smalls;
        }else if(buyOrSell==2){
          realMoney=money+(amounts/100000)*smalls;
        }
        realPoints=(realMoney/amounts)*100;
        if(payType==0){
          payeds=0;
          willPays=payAmounts;
        }else if(payType==1){
          willPays=payAmounts-payed;
          if(payeds>payAmounts){
            payeds=payAmounts;
          }else if(payeds<0){
            payeds=0;
          }
          if(willPays>payAmounts){
            willPays=payAmounts;
          }else if(willPays<0){
            willPays=0;
          }
        }else{
          payeds=payAmounts;
          willPays=0;
        }
       
        var chaAmount=((payAmounts-outMoneys)-0).toFixed(2);
        if(chaAmount==="-0.00"){
          chaAmount=0.00;
        }else{
          chaAmount=chaAmount;
        }
        self.setState({
          payAmount:payAmounts.toFixed(2),
          realPoint:realPoints.toFixed(4),
          payedAmount:payeds.toFixed(2),
          noPayedAmount:willPays.toFixed(2),
          chaAmount:chaAmount,
        });
      }
    }
  

}

var ticketTypeArr=[
    {
      value:"1",
      name:"电银",
    },
    {
      value:"2",
      name:"纸银",
    },
    {
      value:"3",
      name:"电商",
    },
    {
      value:"4",
      name:"纸商",
    },
  ];
var quoteTypeArr=[
  {
    value:"2",
    name:"扣点",
  },
  {
    value:"0",
    name:"月息",
  },
  {
    value:"1",
    name:"年息",
  },
];
var payTypeArr=[
  {
    value:"0",
    name:"未预付",
  },
  {
    value:"1",
    name:"部分预付",
  },
  {
    value:"2",
    name:"全额预付",
  },
];


var reciveTypeArr=[
  {
    value:"0",
    name:"未预收",
  },
  {
    value:"1",
    name:"部分预收",
  },
  {
    value:"2",
    name:"全额预收",
  },
];
var preTimeArr=[
  {
    value:"5",
    name:"5分钟"
  },
  {
    value:"10",
    name:"10分钟"
  },
  {
    value:"15",
    name:"15分钟"
  },
  {
    value:"20",
    name:"20分钟"
  },
  {
    value:"25",
    name:"25分钟"
  },
  {
    value:"30",
    name:"30分钟"
  },
];

var isOpenArr=[
  {
    value:"1",
    name:"是"
  },
  {
    value:"0",
    name:"否"
  },
];

var billinStatusArr=[
  {
    value:"1",
    name:"正常在库",
  },
  {
    value:"2",
    name:"已预订",
  },
  {
    value:"3",
    name:"已停用",
  },
  {
    value:"4",
    name:"出库中",
  },
  {
    value:"5",
    name:"已作废",
  },
  
];
var passReasonArr=[
    {
      value:"票面非常清晰",
      name:"票面非常清晰",
    },
    {
      value:"其他",
      name:"其他",
    },

];
var noPassReasonArr=[
 
  {
    value:"票面垃圾",
    name:"票面垃圾",
  },
  {
    value:"其他",
    name:"其他",
  },

];
var historycolumns = [
  {
   dataIndex: 'orderNo',
   key:"orderNo",
   title: '序号',
   className: styles.textcenter,
   },
   {
   dataIndex: 'billinTime',
   key:"billintime",
   title: '票据类型',
   className: styles.textcenter,
   },
   {
   dataIndex: 'ticketType',
   key:"ticketType",
   title: '承兑方',
   className: styles.textcenter,
   }, 
   {
   dataIndex: 'cf',
   key:"cf",
   title: '承兑方类型',
   className: styles.textcenter,
   }, 
   {
   dataIndex: 'singleAmount',
   key:"singleAmount",
   title: '票据到期日',
   className: styles.textcenter,
   
   },
   {
   dataIndex: 'endTime',
   key:"endTime",
   title: '交易金额（元）',
   className: styles.textcenter,
   
   },
   {
   dataIndex: 'ebank',
   key:"ebank",
   title: '交易类型',
   className: styles.textcenter,
   
   },
   {
   dataIndex: 'cwcompany',
   key:"cwcompany",
   title: '交易方式',
   className: styles.textcenter,
   
   },
   {
   dataIndex: 'billNum',
   key:"billNum",
   title: '交易时间',
   className: styles.textcenter,
   
   
   }, {
   dataIndex: 'point',
   key:"point",
   title: '客户联系人',
   className: styles.textcenter,
   },
   {
   dataIndex: 'maskingName',
   key:"maskingName",
   title: '联系人手机',
   className: styles.textcenter,
   },
   {
   dataIndex: 'mytradeName',
   key:"mytradeName",
   title: '我方交易户',
   className: styles.textcenter,
   },
   {
   dataIndex: 'marketName',
   key:"marketName",
   title: '营销经理',
   className: styles.textcenter,
   },
   ];
var invalidReasonArr=[
  {
    value:"票据有瑕疵",
    name:"票据有瑕疵",
  },
  {
    value:"交易户停用",
    name:"交易户停用",
  },
  
  {
    value:"其他",
    name:"其他",
  },
];
function e0(arr,items,key){
	if(items.children && items.children.length > 0){
		items.children.map((itemss,indexss) => {
		  if(itemss.code == key){
		      arr.push(itemss);
		  }
		  e0(arr,itemss,key);
		})
	}
}

function getAuth(arr,key,departsArr){
  departsArr.map((item,index) => {
    if(item.code == key){
      arr.push(item);
    }
    e0(arr,item,key);
  })
}

function e2(arr,items,key){
	if(items.children && items.children.length > 0){
		items.children.map((itemss,indexss) => { 
		  if(itemss.id == key){
		      arr.push(itemss);
		  }
		  e2(arr,itemss,key);
		})
	}
}

function e1(arr,key,departsArr){
  departsArr.map((item,index) => {
    if(item.id == key){
      arr.push(item);
    }
    e2(arr,item,key);
  })
}

function getEmploy(arrs){

	for (var i=0;i<arrs.length;i++){
	  if(arrs[i].empList&&arrs[i].empList.length>0 || arrs[i].children&&arrs[i].children.length>0){
		arrs[i].children=[...arrs[i].children,...arrs[i].empList];
		getEmploy(arrs[i].children);
	  }
	}
	
	return arrs;
}

function retryData1(items){
	if(items.children && items.children.length > 0){
		items.children.map((itemss,indexss) => { 
			if(itemss.nodeType==1){
				itemss.id="company"+itemss.id
			}else if(itemss.nodeType==2){
				itemss.id="department"+itemss.id
			}else if(itemss.nodeType==3){
				itemss.id="duty"+itemss.id
			}
		    retryData1(itemss);
		})
	}
}

function retryData(departsArr){
  departsArr.map((item,index) => {
    if(item.nodeType==1){
		item.id="company"+item.id
    }else if(item.nodeType==2){
		item.id="department"+item.id
	}else if(item.nodeType==3){
		item.id="duty"+item.id
	}
    retryData1(item);
  })
}
function formatTerminal(obj){
  let year=obj.slice(0,4);
	let month=obj.slice(4,6);
  let day=obj.slice(6,8);
  return year+"-"+month+"-"+day;

}

module.exports={
    formating:formating,
    ticketTypeArr:ticketTypeArr,
    quoteTypeArr:quoteTypeArr,
    payTypeArr:payTypeArr,
    reciveTypeArr:reciveTypeArr,
    preTimeArr:preTimeArr,
    historycolumns:historycolumns,
    caculate:caculate,
    isOpenArr:isOpenArr,
    billinStatusArr:billinStatusArr,
    invalidReasonArr:invalidReasonArr,
 
    getAuth:getAuth,
    zNumber:zNumber,
    zreoNumber:zreoNumber,
    arrInclue:arrInclue,
    e1:e1,
	  getEmploy:getEmploy,
    formatTerminal:formatTerminal,
    retryData:retryData
   
}