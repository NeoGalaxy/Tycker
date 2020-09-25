test = require('./tester')
module.exports = function (Tycker) {
	Tycker.def('hello<a,b>',['a','b'])
	return true;
}
