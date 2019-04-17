
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'zero_ten',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/evaluate/zero_ten.jsx'))
    })
  }
}