
require.ensure = (d, c) => c(require);
module.exports = {
  path: 'main',
  getChildRoutes(location, callback) {
	  require.ensure([], function (require) {
	    callback(null, [
	      require('./home.jsx'),
	      require('./addbillin.jsx'),
	      require('./addbillout.jsx'),
	      require('./addnewroles.jsx'),
	      require('./addroles.jsx'),
	      require('./addstaff.jsx'),
	      require('./bankset.jsx'),
	      require('./baseinfo.jsx'),
	      require('./billin.jsx'),
	      require('./billindetail.jsx'),
	      require('./billout.jsx'),
	      require('./billoutdetail.jsx'),
	      require('./companybill.jsx'),
	      require('./companydetail.jsx'),
	      require('./departmentorder.jsx'),
	      require('./departmentset.jsx'),
	      require('./fiftyToOneH.jsx'),
	      require('./fiveHToSevenH.jsx'),
	      require('./fiveTofifty.jsx'),
	      require('./hundred.jsx'),
	      require('./inthalfyear.jsx'),
	      require('./inthundred.jsx'),
	      require('./intthreehundred.jsx'),
	      require('./inttwohundred.jsx'),
	      require('./oneHToTwoH.jsx'),
	      require('./profitdetails.jsx'),
	      require('./profitStatistics.jsx'),
	      require('./roleset.jsx'),
	      require('./sevenHToTenH.jsx'),
	      require('./staffmanage.jsx'),
	      require('./ten_fifty.jsx'),
	      require('./tenHToOneBillion.jsx'),
	      require('./tenTofiftyint.jsx'),
	      require('./three_hundred.jsx'),
	      require('./threeHToFiveH.jsx'),
	      require('./twoHToThreeH.jsx'),
	      require('./zero_ten.jsx'),
	      require('./zeroTofive.jsx'),
	      require('./draft.jsx')
	    ])
	  })
	},
	getComponents(location, callback) {
      require.ensure([], function (require) {
        callback(null, require('../../container/index.jsx'))
      })
    }
  
}