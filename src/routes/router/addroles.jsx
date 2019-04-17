
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'addroles',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/admin/addroles.jsx'))
    })
  }
}