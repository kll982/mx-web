
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'billin/addbillin',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/bill/addbillin.jsx'))
    })
  }
}