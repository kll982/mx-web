require("es5-shim");
import './index.html';
import './index.less';
import 'ant-design-pro/dist/ant-design-pro.css';
import ReactDOM from 'react-dom';
import React from 'react';
import Routes from '../routes/index.jsx';

ReactDOM.render(<Routes/>, document.getElementById('root'));
