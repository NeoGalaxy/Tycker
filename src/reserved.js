const reserved = {
	/********* specific types **********/
		'any' : {check:() => true},
		'unknown' : {check:() => {throw new Error('This type is unknown')}},
		//'enum' : {check:(e,tc) => this.subtypes.some(t => tc(e,t))},
		'array' : {check : (el) => Array.isArray(el)},
	/*** primitives and basic types ***/
		'undefined' : 'undefined',
		'number' : 'number',
		'boolean' : 'boolean',
		'string' : 'string',
		'bigint' : 'bigint',
		'symbol' : 'symbol',
		'null' : {check : (el) => el === null},
		'object' : 'object',
		'function' : 'function',
	/******* fundamental classes *******/
		'Object' : Object,
		'Function' : Function,
		'Boolean' : Boolean,
	/************* errors *************/
		'Error' : Error,
		//'AggregateError' : AggregateError,
		'EvalError' : EvalError,
		//'InternalError' : InternalError,
		'RangeError' : RangeError,
		'ReferenceError' : ReferenceError,
		'SyntaxError' : SyntaxError,
		'TypeError' : TypeError,
		'URIError' : URIError,
	/******** numbers and dates ********/
		'Number' : Number,
		'Date' : Date,
	/********* Text processing *********/
		'String' : String,
		'RegExp' : RegExp,
	/******* Indexed collections *******/
		"Array" : Array,
		//"Int8Array" : Int8Array,
		//"Uint8Array" : Uint8Array,
		//"Uint8ClampedArray" : Uint8ClampedArray,
		//"Int16Array" : Int16Array,
		//"Uint16Array" : Uint16Array,
		//"Int32Array" : Int32Array,
		//"Uint32Array" : Uint32Array,
		//"Float32Array" : Float32Array,
		//"Float64Array" : Float64Array,
		//"BigInt64Array" : BigInt64Array,
		//"BigUint64Array" : BigUint64Array,
	/******* Keyed collections *******/
		"Map" : Map,
		"Set" : Set,
		"WeakMap" : WeakMap,
		"WeakSet" : WeakSet,	
	/******** Remaining to come ********/

		/*Structured data*/
		//ArrayBuffer
		//SharedArrayBuffer 
		//Atomics 
		//DataView
		//JSON
		/*Control abstraction objects*/
		//Promise
		//Generator
		//GeneratorFunction
		//AsyncFunction
		/*Reflection*/
		//Reflect
		//Proxy
		/*Internationalization*/
		//Intl
		//Intl.Collator
		//Intl.DateTimeFormat
		//Intl.ListFormat
		//Intl.NumberFormat
		//Intl.PluralRules
		//Intl.RelativeTimeFormat
		//Intl.Locale
		/*WebAssembly*/
		//WebAssembly
		//WebAssembly.Module
		//WebAssembly.Instance
		//WebAssembly.Memory
		//WebAssembly.Table
		//WebAssembly.CompileError
		//WebAssembly.LinkError
		//WebAssembly.RuntimeError
		/*Other*/
		//arguments
}

// NaN ?
// 
//
module.exports = reserved;
