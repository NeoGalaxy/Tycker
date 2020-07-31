class Type {
	constructor(arg, tc) {
		this.subtypes = {vals : [], names : []};
		this.subtypesName = undefined;
		//this.contentType = undefined;
		this.content = undefined; 
		// Contenu si le type a du contenu. Ex1 : myType = [string, number]. Ex2 : myType<T,U> = [T, U, T]
		//this.id = tc.getNewID();
		//this.tc = tc;
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
	if (!/^[a-zA-Z]+ ?(< ?[a-zA-Z]+( ?, ?[a-zA-Z]+)* ?>)?$/.test(str)) 
		throw new SyntaxError('Invalid type name');
	let splitted = str.replace(' ','').split('<');
	return {
		name : splitted[0],
		subtypes : splitted[1] ? splitted.slice(0,-1).split(',') : []
	}
}

function parseStr(str, getType) {
	//let s = {global : 0, par : 1};
	let state = {
		inPar : false,
		last : undefined,
		type : undefined,
		enum : null
	};
	let stack = [];
	addToEnum = (state) => {state.enum.subtypes.vals.push(state.type); state.type = undefined};
	endEnum = (state) => {addToEnum(state); state.type = state.enum};

	for (let el of scatter(str)) {
		switch (el[0]) {
			case ('('):
				if (state.type !== undefined) throw new Error('Two types should not follow each other');
				stack.push(state);
				state = {
					inPar : true,
					last : undefined,
					type : undefined,
					enum : null
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
				if ('' != state.last) new Error("unexpected",el);
				state.type.subtypes.vals = el.substring(1, el.length - 2).split(',');
				state.last = '<>';
				break;
			case ('|'):
				if (!state.enum) {
					state.enum = getType('enum', true);
					state.enum.subtypes.vals = [];
				}
				addToEnum(state);
				break;
			case ('['):
				if (!['','<>','()'].includes(state.last)) new Error("unexpected",el);
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
		if (!type.every((e) => typeMap.isValid(e))) 
			throw new Error("The array's values aren't valid types");
		let ret = typeMap.get('array');
		ret.check = function (el) {
			return Array.isArray(el) 
			    && el.length == type.length
			    && type.forEach((t,i) => this.tycker(el[i], t));
		}
		return ret;
	}
	if (typeof type == 'object') {
		for (let k in type) {
			if (!typeMap.isValid(type[k]))
				throw new Error("An value of the object is not a valid type.");
			if (k.slice(-1) == '?' && type[k.slice(0,-1)] !== undefined)
				throw new Error("A key is in double (optionnal and non-optionnal).");
		}
		let ret = typeMap.get('object');
		ret.check = function (el) {
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
		return ret;
	}
	if (typeof type == 'function') {
		return new Type(type);
	}
	if (typeof type == 'string') {
		type = typeMap.get(type);
		if (type == undefined) throw new Error("No type matching the given string.");
		return type;
	}
}

module.exports = {
	parseName: parseName,
	parseType: parseType,
	Type: Type
}
