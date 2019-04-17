
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'roleset',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/admin/roles.jsx'))
    })
  }
}