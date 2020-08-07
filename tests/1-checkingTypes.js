function test(tycker, configList) {
	let ret = true;
	configList.forEach((conf) => {
		if(conf.valids) conf.valids.forEach((el,i) => {
			if(!tycker(el, conf.type)){
				console.log('Assertion Failed.');
				console.log(`+ type : ${conf.type}, index : ${i}`);
				ret = false;
			}
		});
		if(conf.invalids) conf.invalids.forEach((el,i) => {
			if(tycker(el, conf.type)){
				console.log('Assertion Failed.');
				console.log(`- type : ${conf.type}, index : ${i}`);
				ret = false;
			}
		});
	});
	return ret;
}

function main(Tycker) {
	///////////////////// BuiltIn types /////////////////////
	let success = test(Tycker, [
		/*~~~ specific ~~~*/
			{type : 'any', 
				valids : [undefined,null,1,"hello",[],{},Symbol("waa")]},
			{type : 'array', 
				valids : [[],["waaa"],[1,2,3]], 
				invalids : [{},2,'cdzcz']},
			{type : 'null', 
				valids : [null], 
				invalids : [undefined, NaN,'null']},
		/*~~~ primitives and basic ~~~*/
			{type : 'undefined', 
				valids : [undefined], 
				invalids : ['undefined',[],null,21,0,false]},
			{type : 'number', 
				valids : [0,1,2,3,NaN,Infinity], 
				invalids : [2n,'cd',true]},
			{type : 'boolean', 
				valids : [true,false], 
				invalids : ['true','false',1,0,null,undefined,[],'']},
			{type : 'string', 
				valids : ['','Hello',"It's me"], 
				invalids : [0,true,false,undefined,null]},
			{type : 'bigint', 
				valids : [2n,0n,10n], 
				invalids : [1,3,4,NaN,Infinity]},
			{type : 'symbol', 
				valids : ["sac","hello","test"].map(Symbol), 
				invalids : ["hello",2,false]},
			{type : 'object', 
				valids : [{},[],new Map(),{x:3},null], 
				invalids : [Symbol("descr"), 2, true]},
			{type : 'function', 
				valids : [Tycker, () => true, test, Number], 
				invalids : [new Map()]},
		/*~~~ fundamental ~~~*/
			{type : 'Object', 
				valids : [{},[],new Map(),{x:3}], 
				invalids : [Symbol("descr"), 2, true,null]},
			{type : 'Function', 
				valids : [Tycker, () => true, test, Number], 
				invalids : [new Map()]},
			{type : 'Boolean', 
				valids : [new Boolean(true),new Boolean(false)], 
				invalids : [true,false,'true','false',1,0,null,undefined,[],'']},
		/*~~~ errors ~~~*/
			{type : 'Error', 
				valids : [new Error(),new EvalError()], 
				invalids : ["test", {value:"this is not an error"}]},
			{type : 'EvalError', 
				valids : [new EvalError()], 
				invalids : [new ReferenceError(), "test", {value:"Hello Test"}]},
			{type : 'RangeError', 
				valids : [new RangeError()], 
				invalids : [new EvalError(), "test", {value:"This is invalid"}]},
			{type : 'ReferenceError', 
				valids : [new ReferenceError()], 
				invalids : [new TypeError(), "test", {value:"cdzc"}]},
			{type : 'SyntaxError', 
				valids : [new SyntaxError()], 
				invalids : [new URIError(), "test", {value:"efvae"}]},
			{type : 'TypeError', 
				valids : [new TypeError()], 
				invalids : [new EvalError(), "test", {value:"vfezgrfcd"}]},
			{type : 'URIError', 
				valids : [new URIError()], 
				invalids : [new SyntaxError(), "test", {value:"gfdcc"}]},
		/*~~~ numbers & dates ~~~*/
			{type : 'Number', 
				valids : [new Number()], 
				invalids : [1,2,1,2]},
			{type : 'Date', 
				valids : [new Date()], 
				invalids : ["0/1/2345"]},
		/*~~~ Text processing ~~~*/
			{type : 'String', 
				valids : [new String()], 
				invalids : ["random string",""]},
			{type : 'RegExp', 
				valids : [new RegExp("try matching this"), /or this/], 
				invalids : ["cdzzc"]},
		/*~~~ Indexed collections ~~~*/
			{type : 'Array', 
				valids : [new Array(), ["this",'is',`an`,"array"]], 
				invalids : [{0:'and',1:'this',2:"isn't",length:3}]},
		/*~~~ Keyed collections ~~~*/
			{type : 'Map', 
				valids : [new Map()], 
				invalids : [{gosh:"I'm",lost:'again...'},new WeakMap()]},
			{type : 'Set', 
				valids : [new Set()], 
				invalids : [['Nope','this','is','ordered'],{value:"this is not a set either"}]},
			{type : 'WeakMap', 
				valids : [new WeakMap()], 
				invalids : [{value:"this is not an error"},new Map()]},
			{type : 'WeakSet', 
				valids : [new WeakSet()], 
				invalids : [new Set(), ['As','well','as','this']]},
	]);

	///////////////////// Custom types /////////////////////
	Tycker.def('stru', {
	  x:'string',
	  y:'number',
	  'z?':'boolean',
	  'a?':'any'
	});

	success = success && test(Tycker, [
		{type:'stru', 
			valids:[
				{x:"hello",y:3,z:true}
			], invalids : [
				{x:"waa"},
				{x:null,y:3},
				{x:"hello",y:3,z:"hello !!"},
				{x:"hello",y:3,z:undefined},
				{x:"hello",y:3,z:true,w:"hello !!"},
				{x:"hello",y:3,z:true,w:undefined}
			]
		}
	]);

	return success;
}
module.exports = main;
