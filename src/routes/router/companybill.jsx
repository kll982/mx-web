
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'companybill',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/bill/company.jsx'))
    })
  }
}