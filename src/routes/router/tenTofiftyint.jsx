
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'tenTofiftyint',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/evaluate/devaluate/tenTofiftyint.jsx'))
    })
  }
}