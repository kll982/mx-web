import React from "react";
import { Link, hashHistory } from 'react-router';
import projectItemLess from "./projectItem.less";
import MaritimeAffairs from "../MaritimeAffairs/MaritimeAffairs.less"
class projectItem extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        let level = localStorage.getItem('level')
        if (level == '市' || level == '省') {
            self.state = {
                displauItem: 'inline-block',
                parId: self.props.record.parId,
                sort: self.props.record.sort,
            }
        } else {
            self.state = {
                displauItem: 'none',
                parId: self.props.record.parId,
                sort: self.props.record.sort,
            }
        }
    }
    onInformation = (parId, sort) => {
        hashHistory.push({
            pathname: "main/proInform",
            state: {
                parId: parId,
                sort: sort,
            }
        })
    }
    ToCheckSidr = (sortId, checkName) => {
        hashHistory.push({
            pathname: "main/checklistManagement",
            state: {
                sortId: sortId,
                checkName: checkName,
            }
        })
    }
    ToLibrary = (sortId, checkName) => {
        hashHistory.push({
            pathname: "main/library",
            state: {
                sortId: sortId,
                checkName: checkName,
            }
        })
    }

    render() {
        return (
            <div>
                <button className={MaritimeAffairs.Button2F8DEB + " "+MaritimeAffairs.ButtonMargin} style={{ display: self.state.displauItem }} onClick={self.onInformation.bind(self, self.state.parId, self.state.sort)}>基本信息</button>
                <button className={MaritimeAffairs.Button5ECF8B + " "+MaritimeAffairs.ButtonMargin} style={{ display: self.state.displauItem }} onClick={self.ToCheckSidr.bind(self, self.state.parId, self.state.sort)}>检查单</button>
                <button className={MaritimeAffairs.ButtonF0BD31 + " "+MaritimeAffairs.ButtonMargin}  onClick={self.ToLibrary.bind(self, self.state.parId, self.state.sort)}>检查对象名录库</button>
            </div>
        )
    }
}

export default projectItem;