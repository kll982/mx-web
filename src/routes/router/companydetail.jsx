
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'companybill/companydetail',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/bill/companydetail.jsx'))
    })
  }
}