
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'buybill',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/dian/buybill.jsx'))
    })
  }
}