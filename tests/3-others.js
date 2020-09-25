
module.exports = function (Tycker) {
	let exceptionnal = Symbol('What ??');
	foo = Tycker.func(['any'], function(a1) {
		if (a1 == exceptionnal) return "Errrr.... Mhh... Hello ?";
		return Tycker.match(a1, [{
			type : "string",
			exe : s => console.log(s)
		},{
			type : "int",
			exe : i => console.log('An int !', i)
		},{
			type : "number",
			exe : n => console.log('A number !', n)
		},{
			type : "symbol",
			exe : () => console.log('errr?')
		},{
			type : "Date",
			exe : d => console.log('The date is', d.toLocaleString())
		}]);
	}, 'undefined');
	return (
		!foo('Hello Here !') && !foo(23) && !foo(23.3) && 
		!foo(Symbol('What a symbol !')) && !foo(new Date()) && (() => {
			try {
				foo(exceptionnal)
				throw 'That was unexpected'
			} catch (e) {
				console.log(e.message)
				return true
			} 
		})() && (() => {
			try {
				foo(42, 'OOps')
				throw 'That was unexpected'
			} catch (e) {
				console.log(e.message)
				return true
			} 
		})()
	)
}