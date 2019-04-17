
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'zeroTofive',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/evaluate/devaluate/zeroTofive.jsx'))
    })
  }
}