
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'three_hundred',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/evaluate/three_hundred.jsx'))
    })
  }
}