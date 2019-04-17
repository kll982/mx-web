
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'twoHToThreeH',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/evaluate/devaluate/twoHToThreeH.jsx'))
    })
  }
}