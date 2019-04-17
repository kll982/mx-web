
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'fiveTofifty',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/evaluate/devaluate/fiveTofifty.jsx'))
    })
  }
}