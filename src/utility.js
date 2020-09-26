// © NeoGalaxy, personnal use only.
// Todo : change obj.hasOwnProperty to Object.hasOwnProperty.call(obj,...)
// Todo : add prototype copy
class TypeEditor {
	constructor(type, tycker) {
		if (typeof tycker != 'function') 
			throw new Error('Type editor should not be created without a valid Tycker instance.');
		this.__type__ = type;
		this.__tycker__ = tycker;
	}
	setChecker(checker, overwriteChecker = false) {
		let self = this.__type__;
		if (typeof checker == 'function') {
			if (overwriteChecker) {
				self.check = checker;
			} else {
				let old = self.check;
				self.check = function(...args) {
					return old.call(this, ...args) && checker.call(this, ...args);
				}
			}
		} else throw new TypeError('Checker should be a funtion.');
		return this;
	}
	check(el, exception = false, castBefore = false) {
		return this.__tycker__.check(el, this.__type__, exception, castBefore);
	}
	addCast(...args) {
		this.__type__.addCast(this.__tycker__, ...args);
		return this;
	}
	cast(el, exception) {
		return this.__type__.cast(el, this.__tycker__,exception);
	}
}

class Type {
	constructor(arg) {
		this.subtypes = [];
		this.casters = [];
		//this.content = undefined; // Useless ?
		switch (typeof arg) {
			case 'string':
				this.check = (el) => (typeof el) == arg;
				break;
			case 'function': // Classes
				this.check = (el) => el instanceof arg;
				//this.casters = [(el) => new arg(el)];
				break;
			case 'object':
				if (arg.hasOwnProperty('subtypes')) this.subtypes = arg.subtypes;
				if (arg.hasOwnProperty('check')) this.check = arg.check;
				if (arg.hasOwnProperty('casters')) this.casters = arg.casters;
				//if (arg.hasOwnProperty('content')) this.content = arg.content;
				break;
			default:
				throw new TypeError("Can't create type from given argument.");
				break;
		}
	}
	editor(tycker) {
		return new TypeEditor(this,tycker);
	}
	addCast(tc,arg1,arg2) {
		let type = arg2 ? arg1 : 'any';
		let cast = arg2 ? arg2 : arg1;
		tc(type, 'type', new TypeError('When adding cast: the specified type is invalid.'));
		tc(cast, 'function', new TypeError('When adding cast: the cast function should be a function.'));
		this.casters.push({type : type, func : cast});
		return this;
	}
	cast(elem, tc, exception) {
		let editor = this.editor(tc);
		if (this.check.call(editor,elem,tc)) return elem;
		for (let caster of this.casters) {
			if (!tc(elem,caster.type)) continue;
			let res = caster.func.call(editor,elem,tc);
			if (this.check.call(editor,res,tc)) return res;
		}
		if (this.casters.length == 0) console.log(new Error('Casting warning : no casting function in type'));
		if (exception instanceof Error){
			throw exception;
		}
		return exception;
	}
}

function scatter(str) {
	let regex = / *([a-zA-Z]+|\(|\)|<([a-zA-Z]+( *, *[a-zA-Z]+)*)?>|\[(\d*(:(\d*)?)?)?\]|\|) */g;
	/* possibilities : 
	 - alphabetical word (To improve)
	 - left parenthesis
	 - right parenthesis
	 - type list in angle braces <T[,Q[,R...]]>
	 - list element [], [i], [i:] or [i:j] (todo : [:j])
	 - a vertical line
	*/
	let match = str.match(regex);
	if (match.join("") != str) throw new Error("The string contains invalid characters.");
	return match.map(s=>s.trim());
}

function parseName(str) {
	if (typeof str != "string") return {name:'',subtypes:[]};
	if (!/^[a-zA-Z]+ ?(< ?[a-zA-Z]+( ?, ?[a-zA-Z]+)* ?>)?$/.test(str)) 
		throw new SyntaxError(`Invalid type name '${str}'`);
	let splitted = str.replace(' ','').split('<');
	return {
		typeName : splitted[0] ? splitted[0] : undefined,
		subtypes : splitted[1] ? splitted[1].slice(0,-1).split(',') : []
	}
}

function parseStr(str, tycker, getType) {
	//let s = {global : 0, par : 1};
	let state = {
		inPar : false,
		last : '',
		type : undefined,
		enum : undefined
	};
	let stack = [];
	let addToEnum = (state) => {state.enum.push(state.type); state.type = undefined};
	let endEnum = function(state) {
		addToEnum(state);
		let sEnum = state.enum;
		state.enum = undefined;
		state.type = new Type({
			check : (...args) => sEnum.some(t => t.check(...args))
		})
		if (tycker) state.type.addCast(tycker, (el,tc,...args) => {
			for (type of sEnum) {
				let ret = type.cast(el,tc,undefined);
				if (ret != undefined) return ret;
			}
		});
	};

	for (let el of scatter(str)) {
		switch (el[0]) {
			case ('('):
				if (state.type !== undefined) throw new Error('Two types should not follow each other');
				stack.push(state);
				state = {
					inPar : true,
					last : '',
					type : undefined,
					enum : undefined
				};
				break;
			case (')'):
				if (!state.inPar) throw new Error("Unmatched closing parenthesis");
				if (state.type === undefined) throw new Error("Empty parenthesis");
				if (state.enum) endEnum(state);
				let newType = state.type;
				state = stack.pop();
				state.type = newType;
				state.last = '()';
				break;
			case ('<'):
				// There should be a type litteral before
				let typeList = el.slice(1,-1).split(",").map(s=>s.trim());
				if (typeList[0] == '' && typeList.length == 1) typeList = [];
				if ('' != state.last) throw new Error("unexpected",el);
				let type = state.type;
				let oldCheck = type.check;
				state.type.check = function(el, tc, ...args) {
					return oldCheck.call(this, el, tc.checkClone(type.subtypes, typeList), ...args);
				}
				state.last = '<>';
				break;
			case ('|'):
				if (!state.enum) {
					state.enum = [];
				}
				addToEnum(state);
				break;
			case ('['):
				if (!['','<>','()'].includes(state.last)) throw new Error(`last : ${state.last} -- unexpected `+el);
				indexes = el.slice(1,-1).split(":");
				// if (indexes.length > 2) throw new Error() // impossible case ?
				let oldType = state.type;
				//let checker = 
				let tmp = new Type({
					check:/*  if  */(indexes.length == 1) ? 
					      /* then */   (arr,tc, ...args) => tc(arr,'array') 
					                               && (indexes[0] == '' || arr.length == indexes[0])
					                               && arr.every(e => oldType.check(e, tc, ...args)):
					      /* else */   (arr,tc, ...args) => tc(arr,'array') // length of 2
					                               && (indexes[0] == '' || arr.length >= indexes[0]) 
					                               && (indexes[1] == '' || arr.length <= indexes[1]) 
					                               && arr.every(e => oldType.check(e, tc, ...args))
				})
				if (tycker) tmp.addCast(tycker, 'any'+el, (el, tc) => {
					let error = new Error()
					try {
						return el.map((e,i) => tmp.cast(e, tc, error));
					} catch(e) {
						if (e == error) return undefined;
						else throw e;
					}
				});
				state.type = tmp;
				break;
			default:
				state.type = (getType) ? getType(el) : tycker.typeMap.get(el);
				if (state.type == undefined) throw new Error(`The type ${el} does not exist.`);
				break;
		}
	}

	if (state.inPar) throw new Error("Unmatched opening parenthesis");
	if (state.type === undefined) throw new Error("There is no type");
	if (state.enum) endEnum(state);
	return state.type;
}

function parseType(type, tycker) {
	if (type instanceof Type) {
		return type;
	}
	if (type instanceof TypeEditor) {
		return type.__type__;
	}
	if (Array.isArray(type)) {
		type.forEach((e) => {
			if (!tycker.isValid(e)) throw new Error("The type '"+e+"' is not valid.");
		});
			
		return new Type({
			check : function (el,tc) {
				return Array.isArray(el) 
					&& el.length == type.length
					&& type.every((t,i) => tc(el[i], t));
			}
		}).addCast(tycker, `any[${type.length}]`, (el, tc) => {
			let error = new Error()
			try {
				return type.map((t,i) => tc.cast(el[i], t, error));
			} catch(e) {
				if (e == error) return undefined;
				else throw e;
			}
		});
	}
	if (typeof type == 'object') {
		for (let k in type) {
			if (!tycker.isValid(type[k]))
				throw new Error("An value of the object is not a valid type.");
			if (k.slice(-1) == '?' && type[k.slice(0,-1)] !== undefined)
				throw new Error("A key is in double (optionnal and non-optionnal).");
		}
		let ret = tycker.typeMap.get('object');
		return new Type({
			check : function (el,tc) {
				if (typeof el != "object") return false;
				for (let name in type) {
					if (name == '...') continue;
					let propType = type[name];
					if (name.slice(-1) == '?') {
						name = name.slice(0,-1);
						if (!el.hasOwnProperty(name)) continue;
					}
					if (!tc(el[name], propType)) {
						return false;
					}
				}
				let remainType = type['...'] || 'void';
				if (remainType != 'any') for (let key in el) {
					if (!type.hasOwnProperty(key) && !type.hasOwnProperty(key+'?')
					    && !tycker(el[key],remainType)) {
						return false;
					}
				}
				return true;
			}
		}).addCast(tycker, `object`, (el, tc) => {
			let ret = {...el};
			for (let key in type) {
				if (key.slice(-1) == '?') {
					key = key.slice(0,-1);
					if (!el.hasOwnProperty(key)) {
						continue;
					}
				}
				let param = tc.cast(el[key], type[key], undefined);
				if (param == undefined) return undefined;
				ret[key] = param;
			}
			return ret;
		});
	}
	if (typeof type == 'function') {
		return new Type(type);
	}
	if (typeof type == 'string') {
		try {
			var res = parseStr(type, tycker);
		} catch(e) {
			throw new Error("No type matching "+type);
		}
		if (res == undefined) {
			throw new Error("Should not occur - please contact me");
		}
		return res;
	}
	throw new TypeError('Invalid type element.');
}

module.exports = {
	parseName: parseName,
	parseType: parseType,
	parseStr: parseStr,
	TypeEditor: TypeEditor,
	Type: Type
}
