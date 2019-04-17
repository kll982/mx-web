require.ensure = (d, c) => c(require);
module.exports = {
  path: 'billin/billindetail',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/bill/billindetail.jsx'))
    })
  }
}