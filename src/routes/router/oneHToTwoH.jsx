
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'oneHToTwoH',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/evaluate/devaluate/oneHToTwoH.jsx'))
    })
  }
}