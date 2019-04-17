
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'profitStatistics',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/financialmanage/profitStatistics.jsx'))
    })
  }
}