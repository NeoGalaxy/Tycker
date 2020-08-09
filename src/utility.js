class Type {
	constructor(arg) {
		this.subtypes = [];
		//this.contentType = undefined;
		this.content = undefined; 
		// Contenu si le type a du contenu. Ex1 : myType = [string, number]. Ex2 : myType<T,U> = [T, U, T]
		switch (typeof arg) {
			case 'string':
				this.check = (el) => (typeof el) == arg;
				break;
			case 'function': // Classes
				this.check = (el) => el instanceof arg;
				break;
			case 'object':
				if (arg.hasOwnProperty('subtypes')) this.subtypes = arg.subtypes;
				if (arg.hasOwnProperty('check')) this.check = arg.check;
				if (arg.hasOwnProperty('content')) this.content = arg.content;
				break;
			default:
				throw new TypeError("Can't create type from given argument.");
				break;
		}
	}
}

function scatter(str) {
	let regex = / *([a-zA-Z]+|\(|\)|<[a-zA-Z]+(,[a-zA-Z]+)*>|\[(\d*(:(\d*)?)?)?\]|\|) */g;
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
	if (typeof str != "string") return {name:str,subtypes:[]};
	if (!/^[a-zA-Z]+ ?(< ?[a-zA-Z]+( ?, ?[a-zA-Z]+)* ?>)?$/.test(str)) 
		throw new SyntaxError('Invalid type name');
	let splitted = str.replace(' ','').split('<');
	return {
		name : splitted[0],
		subtypes : splitted[1] ? splitted[1].slice(0,-1).split(',') : []
	}
}

function parseStr(str, getType) {
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
			check : function(...args) {return sEnum.some(t => t.check(...args))}
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
				let typeList = el.slice(1,-1).split(",");
				if ('' != state.last) throw new Error("unexpected",el);
				let type = state.type;
				let oldCheck = type.check;
				state.type.check = function(el, ...args) {
					return oldCheck.call(this, el, this.tycker.checkClone(type.subtypes, typeList), ...args);
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
				let checker = 
					/*  if  */  (indexes.length == 1) ? 
					/* then */     (arr,tc) => tc(arr,'array') 
					                           && (indexes[0] == '' || arr.length == indexes[0])
					                           && arr.every(e => oldType.check(e)):
					/* else */     (arr,tc) => tc(arr,'array') // length of 2
					                           && (indexes[0] == '' || arr.length >= indexes[0]) 
					                           && (indexes[1] == '' || arr.length <= indexes[1]) 
					                           && arr.every(e => oldType.check(e));
				state.type = new Type({check : checker});
				break;
			default:
				state.type = getType(el);
				break;
		}
	}

	if (state.inPar) throw new Error("Unmatched opening parenthesis");
	if (state.type === undefined) throw new Error("There is no type");
	if (state.enum) endEnum(state);
	return state.type;
}

function parseType(type, typeMap) {
	if (Array.isArray(type)) {
		type.forEach((e) => {
			if (!typeMap.isValid(e)) throw new Error("The type '"+e+"' is not valid.");
		});
			
		return new Type({
			check : function (el) {
				return Array.isArray(el) 
					&& el.length == type.length
					&& type.every((t,i) => this.tycker(el[i], t));
			}
		});
	}
	if (typeof type == 'object') {
		for (let k in type) {
			if (!typeMap.isValid(type[k]))
				throw new Error("An value of the object is not a valid type.");
			if (k.slice(-1) == '?' && type[k.slice(0,-1)] !== undefined)
				throw new Error("A key is in double (optionnal and non-optionnal).");
		}
		let ret = typeMap.get('object');
		return new Type({
			check : function (el) {
				if (typeof el != "object") return false;
				for (let name in type) {
					let propType = type[name];
					if (name.slice(-1) == '?') {
						name = name.slice(0,-1);
						if (!el.hasOwnProperty(name)) continue;
					}
					if (!this.tycker(el[name], propType)) {
						return false;
					}
				}
				for (let key in el) {
					if (!type.hasOwnProperty(key) && !type.hasOwnProperty(key+'?')) {
						return false;
					}
				}
				return true;
			}
		});
	}
	if (typeof type == 'function') {
		return new Type(type);
	}
	if (typeof type == 'string') {
		type = typeMap.get(type);
		if (type == undefined) throw new Error("No type matching "+type);
		return type;
	}
	return typeMap.get("any");
}

module.exports = {
	parseName: parseName,
	parseType: parseType,
	parseStr: parseStr,
	Type: Type
}
