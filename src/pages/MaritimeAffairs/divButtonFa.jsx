import React from "react";
import { Button } from 'antd';
import projectItemLess from "./projectItem.less";
import { Link, hashHistory } from 'react-router';
class projectItemFA extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        self.state = {
            idItem: self.props.record.idItem,
            sort: self.props.record.sort,
        }
    }
    onInformation(idItem, sort) {
        hashHistory.push({
            pathname: "main/listSortLevelBySortId",
            state: {
                idItem: idItem,
                sort: sort,
            }
        })
    }
    ToCheck(sortId, checkName){
        hashHistory.push({
            pathname: "main/checklistManagement",
            state: {
                sortId: sortId,
                checkName: checkName,
            }
        })
    }
    ToLibrary(sortId, checkName) {
        hashHistory.push({
            pathname: "main/library",
            state: {
                sortId: sortId,
                checkName: checkName,
            }
        })
    }
    render(){
        return (
            <div>
                <Button size='small' className={projectItemLess.buttonSmall} id={self.state.sort} onClick={self.onInformation.bind(self,self.state.idItem, self.state.sort)} type="primary" >各市项目信息</Button>
                <Button size='small' className={projectItemLess.buttonSmall} type="primary" onClick={self.ToCheck.bind(self, self.state.idItem, self.state.sort)} >检查单</Button>
                <span>{self.state.sort}</span>
                <Button size='small' className={projectItemLess.buttonSmall} type="primary" onClick={self.ToLibrary.bind(self, self.state.idItem, self.state.sort)}>检查对象名录库</Button>
            </div>
        )
    }
}

export default projectItemFA;