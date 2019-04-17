
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'addnewroles',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/admin/addnewroles.jsx'))
    })
  }
}