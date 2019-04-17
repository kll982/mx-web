
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'resetpsd',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/password/resetpsd.jsx'))
    })
  }
}