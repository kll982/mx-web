
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'hundred',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/evaluate/fifty_hundred.jsx'))
    })
  }
}