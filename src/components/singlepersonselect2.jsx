import React from "react";
import {TreeSelect } from "antd";
//const {TreeNode} = TreeSelect;
import styles from './sellect1.less'

export default class Singlepersonselect extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const loop = data => data.map((item) => {
	      if (item.children && item.children.length) {
	        return <TreeSelect.TreeNode title={item.name} key={item.idSign} value={item.idSign} className={item.idSign.indexOf("Dept")>-1?styles.red:styles.blue}>{loop(item.children)}</TreeSelect.TreeNode>;
	      }
	      return <TreeSelect.TreeNode title={item.name} key={item.idSign} value={item.idSign}
	      className={item.idSign.indexOf("Dept")>-1?styles.red:styles.blue}/>;
	    });
		return (
			<TreeSelect
			showSearch
			className={this.props.className}
			value={this.props.value?this.props.value:[]}
			dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
			placeholder="请选择"
			allowClear
			dropdownMatchSelectWidth={false}
			treeDefaultExpandAll
			onChange={this.props.onChange}
			>
			{loop(this.props.personData)}

			</TreeSelect>
			)
	}
}