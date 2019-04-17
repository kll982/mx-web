
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'fiftyToOneH',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/evaluate/devaluate/fiftyToOneH.jsx'))
    })
  }
}