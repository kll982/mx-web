import React from "react"
import moment from "moment"
import { hashHistory} from "react-router";
import {
  Pagination,
  Table,
  Button,
  Row,
  Col,
  Modal,
  message,
  Icon,
  Checkbox,
  TreeSelect,
  Spin,
  Tree
} from "antd";
const CheckboxGroup = Checkbox.Group;
import $jsonp from "../../utils/service.js";
import api from "../../utils/api.js";
import styles from  "./index.less";
const TreeNode = Tree.TreeNode;
let newRoles=[];

export default class Addroles extends React.Component {
  constructor(props){
    super(props);
    this.state={
      roleName:"",
      rid:"",
      havePer:[],
      isHaveChecked:false,
    }
  }
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys);
  }
  onCheck = (checkedKeys, info) => {
    console.log(checkedKeys);
    console.log(checkedKeys.concat(info.halfCheckedKeys))
    this.setState({checkedKeys:checkedKeys.concat(info.halfCheckedKeys)})
    this.setState({isHaveChecked:true})
   
  }
  componentWillMount() {
    let self = this;
    console.log(self.props.location.state.rid)
    self.setState({
      rid:self.props.location.state.rid
    })
    

    $jsonp(self,api.allPrivileges,{

    }).then((res)=>{
      console.log(res)
      let arrs=[];
      let listOne=res.data.response.list;
      listOne.map((item,index)=>{
        if(item.children.length>0){
          item.children.map((items,index)=>{
            items.label=items.name;
            items.value=items.code;
            items.key=items.code;
            if(items.children.length>0){
              items.children.map((itemss,indexss)=>{
                itemss.label=itemss.name;
                itemss.value=itemss.code;
                itemss.key=itemss.code;
                arrs.push(itemss.name)

              })

            }

          })
        }
      });
      console.log(listOne)
  
      self.setState({
        rolesArr:listOne,
        plainOptions:arrs
      })
    })

  

    $jsonp(self,api.findPrivilegesByRoleId,{
      rid:self.props.location.state.rid
    }).then((res)=>{
      console.log(res)
      let privileges=res.data.response.privileges?res.data.response.privileges.split(","):[];
      let privilegesArr=[];
      for (let j=0;j<privileges.length;j++){
        if(privileges[j].length>3){
          privilegesArr.push(privileges[j])
        }
      }
      self.setState({
          havePer:privilegesArr,
          ssss:privilegesArr
      })
  })
  }

  save=()=>{
    let self=this;
  
    console.log(self.state.checkedKeys)
    var IdisdSET=self.state.checkedKeys;
    var arrId1=this.state.ssss;
    if(self.state.isHaveChecked==true){
      var changePids=IdisdSET;
    }
    if(self.state.isHaveChecked==false){
      var changePids=arrId1;
    }
    if(self.props.location.state.add == "add"){
      $jsonp(self,api.addPermission,{
        rid:self.state.rid,
        pids:this.state.checkedKeys.join(","),
      }).then((res)=>{
        console.log(res);
        Modal.success({
          title:"提示",
          content: '添加成功',
          onOk:function(){
             hashHistory.push({
              pathname:"/main/roleset"
            })
          }
        })

      })
    }else{
      if(!self.state.eroleinput){
          return Modal.success({
                  title:"提示",
                  content: '请输入角色名称',
                  onOk:function(){
                    
                  }
                })
      }
      if(!self.state.etextareaValue){
        return Modal.success({
                title:"提示",
                content: '请输入角色描述',
                onOk:function(){
                  
                }
              })
      }
      if(!self.state.roleLevel){
        return Modal.success({
                title:"提示",
                content: '请选择角色层级',
                onOk:function(){

                }
              })
      }
      $jsonp(self,api.modifyRole,{
        id:self.state.rid,
        pids:changePids.join(","),
          roleLevel:self.state.roleLevel,
        name:self.state.eroleinput,
        desc:self.state.etextareaValue,
      }).then((res)=>{
        console.log(res);
        Modal.success({
          title:"提示",
          content: '修改成功',
          onOk:function(){
             hashHistory.push({
              pathname:"/main/roleset"
            })
          }
        })

      })

      $jsonp(self,api.addPermission,{
        rid:self.state.rid,
        pids:this.state.checkedKeys.join(","),
      }).then((res)=>{
        console.log(res);
        Modal.success({
          title:"提示",
          content: '添加成功',
          onOk:function(){
             hashHistory.push({
              pathname:"/main/roleset"
            })
          }
        })
       
       
      })
    }
   

   }
   cancle=()=>{
      hashHistory.push({
        pathname:"/main/roleset"
      })
   }
  
  render() {
     if(this.state.rolesArr && this.state.havePer){
       
        return(
          <div>
            <p className={styles.magin}>权限管理</p>
            <Tree
                checkable
                defaultExpandAll
                defaultSelectedKeys={this.state.havePer}
                defaultCheckedKeys={this.state.havePer}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
                className={styles.trees}
               
              >
             {
              this.state.rolesArr.map((item,index)=>{
               
                return <TreeNode title={item.name} key={item.code}>
                {
                  item.children.length>0?
                  item.children.map((items,indexs)=>{

                    return <TreeNode title={items.name} key={items.code}>
                    {
                      items.children.length>0?
                      items.children.map((itemss,indexss)=>{
                        return <TreeNode title={itemss.name} key={itemss.code} />
                      }):""

                    }
                    </TreeNode>

                  })
                  : ""
                }
                </TreeNode>
                
              })
            }
            </Tree>
            <Button type="primary" onClick={this.save} className={styles.btnmargin}>保存</Button>
            <Button type="default" onClick={this.cancle} className={styles.btnmargin}>取消</Button>
          </div>
         
        )
     }
     else{
      return <div></div>
     }
     
  }
    
}




