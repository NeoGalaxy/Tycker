test = require('./tester')
module.exports = function (Tycker) {
	Tycker.def({name:'hello<a,b>',type:['a','b']}).__type__;

	allTests = [[1,2],["szcc",23],[23,"szcc"],new Array(2), 
		[Symbol('zz'),"szcc"], [Symbol('zz'),{}], [Symbol('zz'),1321],
		[], [2], [2,3,4]];
	test.alwaysUse = allTests;
	return test(Tycker, [
		{type:'hello<>', 
			invalids:allTests.slice(-3),
			remain: true},
		{type:'hello<symbol>', 
			valids:allTests.slice(4,7)},
		{type:'hello<string, number>', 
			valids:[allTests[1]]},
		{type:'hello<symbol, string>', 
			valids:[allTests[4]]},
		{type:'hello<symbol, object>', 
			valids:[allTests[5]]}
	]);
}
