require.ensure = (d, c) => c(require);
module.exports = {
  path: 'draft',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/bill/draft.jsx'))
    })
  }
}