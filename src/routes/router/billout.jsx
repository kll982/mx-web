require.ensure = (d, c) => c(require);
module.exports = {
  path: 'billout',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/bill/billout.jsx'))
    })
  }
}