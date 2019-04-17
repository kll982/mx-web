
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'buybillDetail',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/dian/buybillDetail.jsx'))
    })
  }
}