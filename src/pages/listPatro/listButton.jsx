import React from "react";
import { Link, hashHistory } from 'react-router';

import listPatr from "./listPatr.less";
import MaritimeAffairs from "../MaritimeAffairs/MaritimeAffairs.less"

class projectItem extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        self.state = {
            id: self.props.record.itemId,
            sort: self.props.record.sort
        }
    }

    onInformation(id, sort) {
        hashHistory.push({
            pathname: "main/listChecklistByConditional",
            state: {
                id: id,
                sort: sort
            }
        })
    }
    render() {
        return (
            <div>
                <button onClick={self.onInformation.bind(self, self.state.id, self.state.sort)} className={MaritimeAffairs.Button2F8DEB}>检查单</button>
            </div>
        )
    }
}

export default projectItem;