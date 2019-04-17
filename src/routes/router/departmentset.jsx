
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'departmentset',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/businessmanage/departmentset.jsx'))
    })
  }
}