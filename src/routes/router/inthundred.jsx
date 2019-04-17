
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'inthundred',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/evaluate/inthundred.jsx'))
    })
  }
}