
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'statictisTask',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../pages/stastics/taskIndex.jsx'))
    })
  }
}