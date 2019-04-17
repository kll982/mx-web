import React from "react";
import {TreeSelect } from "antd";
//const {TreeNode} = TreeSelect;
// let TreeNode = TreeSelect.TreeNode;
import companypng from "../img/company.png"
import departmentpng from "../img/department.png"
import zhiwupng from "../img/zhiwu.png"
import emppng from "../img/emp.png"
import styles from "../components/common.less"
export default class Singlepersonselect extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const loop = data => data.map((item) => {
	    //   if (item.children && item.children.length) {
	    //   		return <TreeNode title={item.idSign.slice(0,1)=="D"?<span><img src={departmentpng} className={styles.qicon}/>{item.name}</span>:<span><img src={emppng} className={styles.qicon}/>{item.name}</span>} key={item.idSign} pops={item.name} value={item.idSign}>{loop(item.children)}</TreeNode>;
	    //   }
		//   	return <TreeNode title={item.idSign.slice(0,1)=="D"?<span><img src={departmentpng} className={styles.qicon}/>{item.name}</span>:<span><img src={emppng} className={styles.qicon}/>{item.name}</span>} key={item.idSign} pops={item.name} value={item.idSign}/>;
		if (item.children && item.children.length) {
			var ptitle="";
			if(item.nodeType==1){
				 ptitle=<span><img src={companypng} className={styles.qicon}/>{item.name}</span>;
			}else if(item.nodeType==2){
				 ptitle=<span><img src={departmentpng} className={styles.qicon}/>{item.name}</span>;
			}else if(item.nodeType==3){
				 ptitle=<span><img src={zhiwupng} className={styles.qicon}/>{item.name}</span>;
			}
			else{
				ptitle=<span><img src={emppng} className={styles.qicon}/>{item.name}</span>;
		    }
	        return <TreeSelect.TreeNode title={ptitle} pops={item.name} key={item.id} value={item.id.toString()}>{loop(item.children)}</TreeSelect.TreeNode>;
		  }
		  	var ptitle="";
			if(item.nodeType==1){
				ptitle=<span><img src={companypng} className={styles.qicon}/>{item.name}</span>;
			}else if(item.nodeType==2){
				ptitle=<span><img src={departmentpng} className={styles.qicon}/>{item.name}</span>;
			}else if(item.nodeType==3){
				ptitle=<span><img src={zhiwupng} className={styles.qicon}/>{item.name}</span>;
			}
			else{
				ptitle=<span><img src={emppng} className={styles.qicon}/>{item.name}</span>;
			}
	      return <TreeSelect.TreeNode title={ptitle} pops={item.name} key={item.id} value={item.id.toString()}/>;
	      
	    });
		return (
			<TreeSelect
			showSearch
			treeNodeFilterProp="pops"
			className={this.props.className}
			value={this.props.value?this.props.value:""}
			dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
			placeholder="请选择"
			allowClear
			dropdownMatchSelectWidth={false}
			
			treeDefaultExpandAll={false}
			onChange={this.props.onChange}
			disabled={this.props.disabled}
			>
			{loop(this.props.personData)}

			</TreeSelect>
			)
	}
}