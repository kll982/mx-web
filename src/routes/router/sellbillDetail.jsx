
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'sellbillDetail',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/dian/sellbillDetail.jsx'))
    })
  }
}