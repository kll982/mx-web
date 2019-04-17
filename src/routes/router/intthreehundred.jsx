
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'intthreehundred',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/evaluate/intthreehundred.jsx'))
    })
  }
}