require.ensure = (d, c) => c(require);
module.exports = {
  path: 'baseinfo',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/businessmanage/baseinfo.jsx'))
    })
  }
}