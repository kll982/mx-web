
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'home',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/index/index.jsx'))
    })
  }
}