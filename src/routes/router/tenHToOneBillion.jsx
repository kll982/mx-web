
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'tenHToOneBillion',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/evaluate/devaluate/tenHToOneBillion.jsx'))
    })
  }
}