
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'billin',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/bill/billin.jsx'))
    })
  }
}