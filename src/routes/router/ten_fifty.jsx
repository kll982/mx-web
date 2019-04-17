
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'ten_fifty',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/evaluate/ten_fifty.jsx'))
    })
  }
}