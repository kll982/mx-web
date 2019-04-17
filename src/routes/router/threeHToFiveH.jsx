
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'threeHToFiveH',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/evaluate/devaluate/threeHToFiveH.jsx'))
    })
  }
}