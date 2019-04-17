
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'profitdetails',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/financialmanage/profitdetails.jsx'))
    })
  }
}