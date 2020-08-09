var Tycker =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/tc.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/reserved.js":
/*!*************************!*\
  !*** ./src/reserved.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const reserved = {\n\t/********* specific types **********/\n\t\t'any' : {check:() => true},\n\t\t'unknown' : {check:() => {throw new Error('This type is unknown')}},\n\t\t//'enum' : {check:(e,tc) => this.subtypes.some(t => tc(e,t))},\n\t\t'array' : {check : (el) => Array.isArray(el)},\n\t/*** primitives and basic types ***/\n\t\t'undefined' : 'undefined',\n\t\t'number' : 'number',\n\t\t'boolean' : 'boolean',\n\t\t'string' : 'string',\n\t\t'bigint' : 'bigint',\n\t\t'symbol' : 'symbol',\n\t\t'null' : {check : (el) => el === null},\n\t\t'object' : 'object',\n\t\t'function' : 'function',\n\t/******* fundamental classes *******/\n\t\t'Object' : Object,\n\t\t'Function' : Function,\n\t\t'Boolean' : Boolean,\n\t/************* errors *************/\n\t\t'Error' : Error,\n\t\t//'AggregateError' : AggregateError,\n\t\t'EvalError' : EvalError,\n\t\t//'InternalError' : InternalError,\n\t\t'RangeError' : RangeError,\n\t\t'ReferenceError' : ReferenceError,\n\t\t'SyntaxError' : SyntaxError,\n\t\t'TypeError' : TypeError,\n\t\t'URIError' : URIError,\n\t/******** numbers and dates ********/\n\t\t'Number' : Number,\n\t\t'Date' : Date,\n\t/********* Text processing *********/\n\t\t'String' : String,\n\t\t'RegExp' : RegExp,\n\t/******* Indexed collections *******/\n\t\t\"Array\" : Array,\n\t\t//\"Int8Array\" : Int8Array,\n\t\t//\"Uint8Array\" : Uint8Array,\n\t\t//\"Uint8ClampedArray\" : Uint8ClampedArray,\n\t\t//\"Int16Array\" : Int16Array,\n\t\t//\"Uint16Array\" : Uint16Array,\n\t\t//\"Int32Array\" : Int32Array,\n\t\t//\"Uint32Array\" : Uint32Array,\n\t\t//\"Float32Array\" : Float32Array,\n\t\t//\"Float64Array\" : Float64Array,\n\t\t//\"BigInt64Array\" : BigInt64Array,\n\t\t//\"BigUint64Array\" : BigUint64Array,\n\t/******* Keyed collections *******/\n\t\t\"Map\" : Map,\n\t\t\"Set\" : Set,\n\t\t\"WeakMap\" : WeakMap,\n\t\t\"WeakSet\" : WeakSet,\t\n\t/******** Remaining to come ********/\n\n\t\t/*Structured data*/\n\t\t//ArrayBuffer\n\t\t//SharedArrayBuffer \n\t\t//Atomics \n\t\t//DataView\n\t\t//JSON\n\t\t/*Control abstraction objects*/\n\t\t//Promise\n\t\t//Generator\n\t\t//GeneratorFunction\n\t\t//AsyncFunction\n\t\t/*Reflection*/\n\t\t//Reflect\n\t\t//Proxy\n\t\t/*Internationalization*/\n\t\t//Intl\n\t\t//Intl.Collator\n\t\t//Intl.DateTimeFormat\n\t\t//Intl.ListFormat\n\t\t//Intl.NumberFormat\n\t\t//Intl.PluralRules\n\t\t//Intl.RelativeTimeFormat\n\t\t//Intl.Locale\n\t\t/*WebAssembly*/\n\t\t//WebAssembly\n\t\t//WebAssembly.Module\n\t\t//WebAssembly.Instance\n\t\t//WebAssembly.Memory\n\t\t//WebAssembly.Table\n\t\t//WebAssembly.CompileError\n\t\t//WebAssembly.LinkError\n\t\t//WebAssembly.RuntimeError\n\t\t/*Other*/\n\t\t//arguments\n}\n\n// NaN ?\n// \n//\nmodule.exports = reserved;\n\n\n//# sourceURL=webpack://Tycker/./src/reserved.js?");

/***/ }),

/***/ "./src/tc.js":
/*!*******************!*\
  !*** ./src/tc.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst reserved = __webpack_require__(/*! ./reserved */ \"./src/reserved.js\");\nconst {parseName, parseType, parseStr, Type, TypeEditor} = __webpack_require__(/*! ./utility */ \"./src/utility.js\");\n/*\n.cast\n*/\nconst Tycker = function(arg, type, exception) {\n\tif (arg === undefined && type === undefined && exception === undefined){\n\t\treturn Tycker.clone();\n\t}\n\tif (type === undefined && exception === undefined){\n\t\treturn Tycker.get(arg);\n\t}\n\treturn Tycker.check(arg, type, exception); \n}\n\nlet methodList = ['find','isValid','def','match','check','clone','checkClone'];\n\n// Not called 'typeMap' to avoid errors from using typeMap instead of this.typeMap in methods\nlet wholeTypeMap = {\n\tcontent : new Map(),\n\t//nameToType : new Map(),\n\t//typeToName : new Map(), \n\tget : function(name, getOriginal) {\n\t\tlet res = this.content.get(name);\n\t\tif (getOriginal) return res;\n\t\tif (res) res = new Type(res);\n\t\treturn res;\n\t},\n\t/*find : function(type) {\n\t\tlet typename = (typeof type) == 'string' ?\n\t\t           type :\n\t\t           this.name(type);\n\t\tif (!this.content.has(typename)) return undefined;\n\t\treturn typename;\n\t},*/\n\tisValid : function(type) {\n\t\tif (type instanceof Type || type instanceof TypeEditor) return true;\n\t\tswitch (typeof type) {\n\t\t\tcase 'string':\n\t\t\t\tlet parsed = parseName(type);\n\t\t\t\treturn this.content.has(parsed.name) && parsed.subtypes.every((el) => this.isValid(el));\n\t\t\tcase 'object':\n\t\t\t\tfor (let t in type) {\n\t\t\t\t\tif (!this.isValid(t)) return false;\n\t\t\t\t}\n\t\t\t\treturn true;\n\t\t\tcase 'function': // Assumed to be a class\n\t\t\t\treturn true;\n\t\t\tdefault:\n\t\t\t\treturn false;\n\t\t}\n\t},\n\t/*type : function(name) {\n\t\treturn this.nameToType.get(name);\n\t},\n\tname : function(type) {\n\t\treturn this.typeToName.get(type);\n\t},*/\n\tset : function(name, type, force) {\n\t\t/*if (typeof name != 'string') {\n\t\t\tthis.addtype(name.toString(), name);\n\t\t\tname = name.toString();\n\t\t}*/\n\t\tif (!force && this.content.has(name)) throw new Error('Type name already taken.');\n\t\treturn this.content.set(name, type);\n\t},\n\t/*addtype : function(name, type) {\n\t\tthis.nameToType.set(name,type);\n\t\tthis.typeToName.set(type,name);\n\t},*/\n\tcopy : function() {\n\t\treturn {\n\t\t\t//typeToName : new Map(this.typeToName), \n\t\t\t//nameToType : new Map(this.nameToType), \n\t\t\tcontent : new Map(this.content),\n\t\t\tget : this.get,\n\t\t\t//find : this.find,\n\t\t\tisValid : this.isValid,\n\t\t\t//type : this.type,\n\t\t\t//name : this.name,\n\t\t\tset : this.set,\n\t\t\taddtype : function(name, type) {\n\t\t\t\tthis.nameToType.set(name,type);\n\t\t\t\tthis.typeToName.set(type,name);\n\t\t\t},\n\t\t\t//sub : this.sub,\n\t\t\tcopy : this.copy,\n\t\t\tcheckCopy : this.checkCopy\n\t\t};\n\t},\n\tcheckCopy : function(subNames, subTypes) {\n\t\tif (subTypes == undefined) subTypes = new Array(subNames.length).fill('unknown');\n\t\tlet copy = this.copy();\n\t\tlet parent = this;\n\t\tcopy.get = function(name, getOriginal) {\n\t\t\tname = (subTypes[subNames.indexOf(name)]) || name;\n\t\t\treturn parent.get.call(this,name);\n\t\t};\n\t\tcopy.find = function(type) {\n\t\t\ttype = (subTypes[subNames.indexOf(type)]) || type;\n\t\t\treturn parent.find.call(this,type);\n\t\t};\n\t\tcopy.type = function(name) {\n\t\t\tname = (subTypes[subNames.indexOf(name)]) || name;\n\t\t\treturn parent.type.call(this,name);\n\t\t};\n\t\treturn copy;\n\t}\n}\n\nlet properties = {\n\ttypeMap : wholeTypeMap,\n\t/*find : function(type) {\n\t\treturn this.typeMap.find(type);\n\t},*/\n\tget : function (type) {\n\t\treturn this.typeMap.get(type,true).editor(this);\n\t},\n\tisValid : function(type) {\n\t\treturn this.typeMap.isValid(type);\n\t},\n\tdef : function(completeName, typeDescr = 'any') {\n\t\tlet {name, subtypes} = parseName(completeName);\n\t\tlet type = parseType(typeDescr, this.typeMap.checkCopy(subtypes));\n\t\ttype.subtypes = subtypes;\n\t\t/*if (typeof typeDescr == \"function\") {\n\t\t\tthis.typeMap.addtype(name, typeDescr);\n\t\t}*/\n\t\tthis.typeMap.set(name, type);\n\t\treturn type.editor(this);\n\t},\n\tmatch : function(el, matches, fallback) {\n\t\tfor (let config of matches) {\n\t\t\tif (this.check(el, config.type, false, confing.cast == true))\n\t\t\t\treturn config.exe(el);\n\t\t}\n\t\tif (fallback instanceof Error) throw fallback;\n\t\treturn fallback;\n\t},\n\tcheck : function(arg, typeObject, exception = false, castBefore = false){\n\t\tlet type = parseType(typeObject, this.typeMap);\n\t\t//let typeName = undefined;\n\t\t//let subtypes = [];\n\t\tif(type === undefined) {\n\t\t\tconsole.log(this);\n\t\t\tconsole.log(typeof(typeObject),':',typeObject);\n\t\t\tthrow new Error('Unable to find type or create anonymous type from above object');\n\t\t}\n\t\tlet self = {}\n\t\t//if (!type) type = this.typeMap(typeName);\n\t\tif (type == undefined) {\n\t\t\tthrow new Error(`Should not occur. Please contact me.`);\n\t\t}\n\t\tif (castBefore) {\n\t\t\tlet newArg = type.cast(arg, this);\n\t\t\tif (newArg !== undefined) arg = newArg;\n\t\t}\n\t\tif (!type.check.call(type.editor(this),arg,this)) {\n\t\t\tif (exception instanceof Error){\n\t\t\t\tthrow exception;\n\t\t\t}\n\t\t\treturn exception;\n\t\t}\n\t\telse return true\n\t},\n\tcast : function(arg, typeObject, exception = undefined) {\n\t\tlet type = parseType(typeObject);\n\t\treturn type.cast(arg,this,exception);\n\t},\n\taddCast : function(typename,cast,typecase = 'any') {\n\t\tthis.typeMap.get(typename).addCast(cast, typename);\n\t},\n\tclone: function() {\n\t\tlet newFunc = function(arg, type, exception) {\n\t\t\tif (arg === undefined && type === undefined && exception === undefined){\n\t\t\t\treturn newFunc.clone();\n\t\t\t}\n\t\t\tif (type === undefined && exception === undefined){\n\t\t\t\treturn newFunc.get(arg);\n\t\t\t}\n\t\t\treturn newFunc.check(arg, type, exception); \n\t\t}\n\t\tmethodList.forEach((m) => newFunc[m] = this[m]);\n\t\tnewFunc.typeMap = this.typeMap.copy();\n\t\treturn newFunc;\n\t},\n\tcheckClone : function(subNames, subTypes) {\n\t\tfor (var i = subTypes.length; i < subNames.length; i++) {\n\t\t\tsubTypes.push('any');\n\t\t}\n\t\tlet newFunc = function(arg, type, exception) {\n\t\t\tif (arg === undefined && type === undefined && exception === undefined){\n\t\t\t\tthrow new Error(\"A checkClone can't be cloned\");\n\t\t\t}\n\t\t\tif (type === undefined && exception === undefined){\n\t\t\t\treturn newFunc.get(arg);\n\t\t\t}\n\t\t\treturn newFunc.check(arg, type, exception); \n\t\t}\n\t\tnewFunc.find = this.find;\n\t\tnewFunc.isValid = this.isValid;\n\t\tnewFunc.check = this.check;\n\t\tnewFunc.checkClone = this.checkClone;\n\t\tnewFunc.typeMap = this.typeMap.checkCopy(subNames, subTypes);\n\t\treturn newFunc;\n\t}\n}\n\nfor (let name in reserved) {\n\tproperties.typeMap.content.set(name, new Type(reserved[name]));\n\t//let type = (typeof reserved[name]) == \"object\" ? name : reserved[name];\n\t//properties.typeMap.nameToType.set(name,type);\n\t//properties.typeMap.typeToName.set(type,name);\n}\n\nfor (let name in properties) {\n\tTycker[name] = properties[name];\n}\n\n//Tycker.type = Type;\n\nmodule.exports = Tycker;\n\n//# sourceURL=webpack://Tycker/./src/tc.js?");

/***/ }),

/***/ "./src/utility.js":
/*!************************!*\
  !*** ./src/utility.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class TypeEditor {\n\tconstructor(type, tycker) {\n\t\tif (typeof tycker != 'function') \n\t\t\tthrow new Error('Type editor should not be created without a valid Tycker instance.');\n\t\tthis.__type__ = type;\n\t\tthis.__tycker__ = tycker;\n\t}\n\tsetChecker(checker, overwriteChecker = false) {\n\t\tlet self = this.__type__;\n\t\tif (typeof checker == 'function') {\n\t\t\tif (overwriteChecker) {\n\t\t\t\tself.check = checker;\n\t\t\t} else {\n\t\t\t\tlet old = self.check;\n\t\t\t\tself.check = function(el, arg2) {\n\t\t\t\t\treturn old.call(this, el, arg2) && checker.call(this, el, arg2);\n\t\t\t\t}\n\t\t\t}\n\t\t} else throw new TypeError('Checker should be a funtion.');\n\t\treturn this;\n\t}\n\tcheck(el, exception = false, castBefore = false) {\n\t\treturn this.__tycker__.check(el, this.__type__, exception, castBefore);\n\t}\n\taddCast(arg1, arg2) {\n\t\tlet typeCase = arg2 ? arg1 : 'any';\n\t\tlet caster = arg2 ? arg2 : arg1;\n\t\tthis.__type__.addCast(caster,typeCase);\n\t\treturn this;\n\t}\n\tcast(el) {\n\t\treturn this.__type__.cast(el, this.__tycker__);\n\t}\n}\n\nclass Type {\n\tconstructor(arg) {\n\t\tthis.subtypes = [];\n\t\tthis.casters = [];\n\t\t//this.content = undefined; // Useless ?\n\t\tswitch (typeof arg) {\n\t\t\tcase 'string':\n\t\t\t\tthis.check = (el) => (typeof el) == arg;\n\t\t\t\tbreak;\n\t\t\tcase 'function': // Classes\n\t\t\t\tthis.check = (el) => el instanceof arg;\n\t\t\t\tbreak;\n\t\t\tcase 'object':\n\t\t\t\tif (arg.hasOwnProperty('subtypes')) this.subtypes = arg.subtypes;\n\t\t\t\tif (arg.hasOwnProperty('check')) this.check = arg.check;\n\t\t\t\tif (arg.hasOwnProperty('casters')) this.casters = arg.casters;\n\t\t\t\t//if (arg.hasOwnProperty('content')) this.content = arg.content;\n\t\t\t\tbreak;\n\t\t\tdefault:\n\t\t\t\tthrow new TypeError(\"Can't create type from given argument.\");\n\t\t\t\tbreak;\n\t\t}\n\t}\n\teditor(tycker) {\n\t\treturn new TypeEditor(this,tycker);\n\t}\n\taddCast(cast,type) {\n\t\tthis.casters.push({type : type, func : cast});\n\t}\n\tcast(elem, tc, exception) {\n\t\tlet editor = this.editor(tc);\n\t\tif (this.check.call(editor,elem,tc)) return elem;\n\t\tfor (let caster of this.casters) {\n\t\t\tif (!tc(elem,caster.type)) continue;\n\t\t\tlet res = caster.func.call(editor,elem,tc);\n\t\t\tif (this.check.call(editor,res,tc)) return res;\n\t\t}\n\t\tif (this.casters.length == 0) console.log(new Error('Casting warning : no casting function in type'));\n\t\tif (exception instanceof Error){\n\t\t\tthrow exception;\n\t\t}\n\t\treturn exception;\n\t}\n}\n\nfunction scatter(str) {\n\tlet regex = / *([a-zA-Z]+|\\(|\\)|<[a-zA-Z]+(,[a-zA-Z]+)*>|\\[(\\d*(:(\\d*)?)?)?\\]|\\|) */g;\n\t/* possibilities : \n\t - alphabetical word (To improve)\n\t - left parenthesis\n\t - right parenthesis\n\t - type list in angle braces <T[,Q[,R...]]>\n\t - list element [], [i], [i:] or [i:j] (todo : [:j])\n\t - a vertical line\n\t*/\n\tlet match = str.match(regex);\n\tif (match.join(\"\") != str) throw new Error(\"The string contains invalid characters.\");\n\treturn match.map(s=>s.trim());\n}\n\nfunction parseName(str) {\n\tif (typeof str != \"string\") return {name:str,subtypes:[]};\n\tif (!/^[a-zA-Z]+ ?(< ?[a-zA-Z]+( ?, ?[a-zA-Z]+)* ?>)?$/.test(str)) \n\t\tthrow new SyntaxError('Invalid type name');\n\tlet splitted = str.replace(' ','').split('<');\n\treturn {\n\t\tname : splitted[0],\n\t\tsubtypes : splitted[1] ? splitted[1].slice(0,-1).split(',') : []\n\t}\n}\n\nfunction parseStr(str, getType) {\n\t//let s = {global : 0, par : 1};\n\tlet state = {\n\t\tinPar : false,\n\t\tlast : '',\n\t\ttype : undefined,\n\t\tenum : undefined\n\t};\n\tlet stack = [];\n\tlet addToEnum = (state) => {state.enum.push(state.type); state.type = undefined};\n\tlet endEnum = function(state) {\n\t\taddToEnum(state);\n\t\tlet sEnum = state.enum;\n\t\tstate.enum = undefined;\n\t\tstate.type = new Type({\n\t\t\tcheck : function(...args) {return sEnum.some(t => t.check(...args))}\n\t\t});\n\t};\n\n\tfor (let el of scatter(str)) {\n\t\tswitch (el[0]) {\n\t\t\tcase ('('):\n\t\t\t\tif (state.type !== undefined) throw new Error('Two types should not follow each other');\n\t\t\t\tstack.push(state);\n\t\t\t\tstate = {\n\t\t\t\t\tinPar : true,\n\t\t\t\t\tlast : '',\n\t\t\t\t\ttype : undefined,\n\t\t\t\t\tenum : undefined\n\t\t\t\t};\n\t\t\t\tbreak;\n\t\t\tcase (')'):\n\t\t\t\tif (!state.inPar) throw new Error(\"Unmatched closing parenthesis\");\n\t\t\t\tif (state.type === undefined) throw new Error(\"Empty parenthesis\");\n\t\t\t\tif (state.enum) endEnum(state);\n\t\t\t\tlet newType = state.type;\n\t\t\t\tstate = stack.pop();\n\t\t\t\tstate.type = newType;\n\t\t\t\tstate.last = '()';\n\t\t\t\tbreak;\n\t\t\tcase ('<'):\n\t\t\t\t// There should be a type litteral before\n\t\t\t\tlet typeList = el.slice(1,-1).split(\",\");\n\t\t\t\tif ('' != state.last) throw new Error(\"unexpected\",el);\n\t\t\t\tlet type = state.type;\n\t\t\t\tlet oldCheck = type.check;\n\t\t\t\tstate.type.check = function(el, ...args) {\n\t\t\t\t\treturn oldCheck.call(this, el, this.tycker.checkClone(type.subtypes, typeList), ...args);\n\t\t\t\t}\n\t\t\t\tstate.last = '<>';\n\t\t\t\tbreak;\n\t\t\tcase ('|'):\n\t\t\t\tif (!state.enum) {\n\t\t\t\t\tstate.enum = [];\n\t\t\t\t}\n\t\t\t\taddToEnum(state);\n\t\t\t\tbreak;\n\t\t\tcase ('['):\n\t\t\t\tif (!['','<>','()'].includes(state.last)) throw new Error(`last : ${state.last} -- unexpected `+el);\n\t\t\t\tindexes = el.slice(1,-1).split(\":\");\n\t\t\t\t// if (indexes.length > 2) throw new Error() // impossible case ?\n\t\t\t\tlet oldType = state.type;\n\t\t\t\tlet checker = \n\t\t\t\t\t/*  if  */  (indexes.length == 1) ? \n\t\t\t\t\t/* then */     (arr,tc) => tc(arr,'array') \n\t\t\t\t\t                           && (indexes[0] == '' || arr.length == indexes[0])\n\t\t\t\t\t                           && arr.every(e => oldType.check(e)):\n\t\t\t\t\t/* else */     (arr,tc) => tc(arr,'array') // length of 2\n\t\t\t\t\t                           && (indexes[0] == '' || arr.length >= indexes[0]) \n\t\t\t\t\t                           && (indexes[1] == '' || arr.length <= indexes[1]) \n\t\t\t\t\t                           && arr.every(e => oldType.check(e));\n\t\t\t\tstate.type = new Type({check : checker});\n\t\t\t\tbreak;\n\t\t\tdefault:\n\t\t\t\tstate.type = getType(el);\n\t\t\t\tif (state.type == undefined) throw new Error(`The type ${el} does not exist.`)\n\t\t\t\tbreak;\n\t\t}\n\t}\n\n\tif (state.inPar) throw new Error(\"Unmatched opening parenthesis\");\n\tif (state.type === undefined) throw new Error(\"There is no type\");\n\tif (state.enum) endEnum(state);\n\treturn state.type;\n}\n\nfunction parseType(type, typeMap) {\n\tif (type instanceof Type) {\n\t\treturn type;\n\t}\n\tif (type instanceof TypeEditor) {\n\t\treturn type.__type__;\n\t}\n\tif (Array.isArray(type)) {\n\t\ttype.forEach((e) => {\n\t\t\tif (!typeMap.isValid(e)) throw new Error(\"The type '\"+e+\"' is not valid.\");\n\t\t});\n\t\t\t\n\t\treturn new Type({\n\t\t\tcheck : function (el) {\n\t\t\t\treturn Array.isArray(el) \n\t\t\t\t\t&& el.length == type.length\n\t\t\t\t\t&& type.every((t,i) => this.tycker(el[i], t));\n\t\t\t}\n\t\t});\n\t}\n\tif (typeof type == 'object') {\n\t\tfor (let k in type) {\n\t\t\tif (!typeMap.isValid(type[k]))\n\t\t\t\tthrow new Error(\"An value of the object is not a valid type.\");\n\t\t\tif (k.slice(-1) == '?' && type[k.slice(0,-1)] !== undefined)\n\t\t\t\tthrow new Error(\"A key is in double (optionnal and non-optionnal).\");\n\t\t}\n\t\tlet ret = typeMap.get('object');\n\t\treturn new Type({\n\t\t\tcheck : function (el) {\n\t\t\t\tif (typeof el != \"object\") return false;\n\t\t\t\tfor (let name in type) {\n\t\t\t\t\tlet propType = type[name];\n\t\t\t\t\tif (name.slice(-1) == '?') {\n\t\t\t\t\t\tname = name.slice(0,-1);\n\t\t\t\t\t\tif (!el.hasOwnProperty(name)) continue;\n\t\t\t\t\t}\n\t\t\t\t\tif (!this.tycker(el[name], propType)) {\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tfor (let key in el) {\n\t\t\t\t\tif (!type.hasOwnProperty(key) && !type.hasOwnProperty(key+'?')) {\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn true;\n\t\t\t}\n\t\t});\n\t}\n\tif (typeof type == 'function') {\n\t\treturn new Type(type);\n\t}\n\tif (typeof type == 'string') {\n\t\ttry {\n\t\t\tvar res = parseStr(type, (t) => typeMap.get(t));\n\t\t} catch(e) {\n\t\t\tconsole.log(e);\n\t\t\tthrow new Error(\"No type matching \"+type);\n\t\t}\n\t\tif (res == undefined) {\n\t\t\tthrow new Error(\"Should not occur - please contact me\");\n\t\t}\n\t\treturn res;\n\t}\n\tthrow new TypeError('Invalid type element.');\n\t//return typeMap.get(\"any\");\n}\n\nmodule.exports = {\n\tparseName: parseName,\n\tparseType: parseType,\n\tparseStr: parseStr,\n\tTypeEditor: TypeEditor,\n\tType: Type\n}\n\n\n//# sourceURL=webpack://Tycker/./src/utility.js?");

/***/ })

/******/ });