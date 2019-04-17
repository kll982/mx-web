import React from "react";
import {TreeSelect } from "antd";
//const {TreeNode} = TreeSelect;
import companypng from "../img/company.png"
import departmentpng from "../img/department.png"
import emppng from "../img/emp.png"
import styles from "../components/common.less"

export default class Singlepersonselect extends React.Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
		let self=this;
		self.setState({
			personData:this.props.personData,
			value:this.props.value
		})
	}
	componentWillReceiveProps(nextProps) {
		let self=this;
		self.setState({
			personData:nextProps.personData,
			value:nextProps.value
		 })
	}
	render(){
		const loop = data => data.map((item) => {
	      if (item.children && item.children.length) {
			var ptitle="";
			if(item.nodeType==1){
				 ptitle=<span><img src={companypng} className={styles.qicon}/>{item.name}</span>;
			}else if(item.nodeType==2){
				 ptitle=<span><img src={departmentpng} className={styles.qicon}/>{item.name}</span>;
			}else if(item.nodeType==3){
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
			autoExpandParent={true}
			treeDefaultExpandAll
			onChange={this.props.onChange}
			>
			{loop(this.state.personData)}

			</TreeSelect>
			)
	}
}