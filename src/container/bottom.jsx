import React from 'react'
import {Layout} from 'antd'
import bot from './bottom.less'

export default class Bottom extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <Layout.Footer className={bot.bottom}>
        <div className="text">
          <div><span className="me">©海事隐患预警系统</span>
          </div>
        </div>
      </Layout.Footer>
    );
  }
}
