"use strict"
const reserved = require('./reserved');
const {parseName, parseType, Type} = require('./utility');
/*
.cast
*/
const Tycker = function(arg, type, exception) {
	if (arg === undefined && type === undefined && exception === undefined){
		return Tycker.clone();
	}
	return Tycker.check(arg, type, exception); 
}

let methodList = ['find','isValid','def','check','clone','checkClone'];

let properties = {
	find : function(type) {
		return this.typeMap.find(type);
	},
	isValid : function(type) {
		return typeMap.isValid(type);
		//if (this.find(type) !== undefined) {
		//	return true;
		//}
		//if (Array.isArray(type)) {
		//	return type.every((t) => this.isValid(t));
		//}
		//if (typeof type == 'object') {
		//	for (let t in type) {
		//		if (!this.isValid(t)) return false;
		//	}
		//	return true;
		//}
		//return false;
	},
	def : function(completeName, typeDescr, checker, overwriteChecker = false) {
		let {name, subtypes} = parseName(completeName);
		let type = parseType(typeDescr, this.typeMap.sub(subtypes));
		type.subtypes.names = subtypes;
		if (typeof checker == 'function') {
			if (overwriteChecker) {
				type.check = checker;
			} else {
				let old = type.check;
				type.check = function(el, arg2) {
					old.call(this, el, arg2) && checker.call(this, el, arg2);
				}
			}
		}
		if (typeof typeDescr == "function") {
			this.typeMap.addtype(name, typeDescr);
		}
		this.typeMap.set(name, type);
	},
	match : function(el, matches, fallback) {
		for (let config in matches) {
			if (this.check(el, config.type))
				return config.execute();
		}
		if (fallback instanceof Error) throw fallback;
		return fallback;
	},
	check : function(arg, typeObject, exception){
		let typeName = this.find(typeObject);
		let type = undefined;
		let subtypes = [];
		if (typeof typeName == 'string') {
			let parsed = parseName(typeName);
			typeName = parsed.name;
			subtypes = parsed.subtypes;
			type = this.typeMap.get(typeName);
		} else {
			if (typeof typeName == 'function') {
				type = new Type(typeName); // Anonymous type
			}
		}
		if(type === undefined) {
			console.log(typeof(typeObject),':',typeObject);
			throw new Error('Unable to find type or create anonymous type from above object');
		}
		let self = {
			tycker : this.checkClone(type.subtypes.names, subtypes),
			subtypes : new Array(type.subtypes.vals)
		}
		if (!type) type = this.typeMap(typeName);
		if (type == undefined) {
			throw new Error(`Unknown type "${typeName}"`);
		}
		if (!type.check.call(self,arg)) {
			if (exception instanceof Error){
				throw exception;
			}
			return exception;
		}
		else return true
	},
	typeMap : {
		content : new Map(),
		nameToType : new Map(),
		typeToName : new Map(), 
		get : function(name, getOriginal) {
			let res = this.content.get(name);
			if (getOriginal) return res;
			if (res) res = new Type(res);
			return res;
		},
		find : function(type) {
			let typename = (typeof type) == 'string' ?
			           type :
			           this.name(type);
			if (!this.content.has(typename)) return undefined;
			return typename;
		},
		isValid : function(type) {
			if (this.find(type) !== undefined) {
				return true;
			}
			if (Array.isArray(type)) {
				return type.every((t) => this.isValid(t));
			}
			if (typeof type == 'object') {
				for (let t in type) {
					if (!this.isValid(t)) return false;
				}
				return true;
			}
			return false;
		},
		type : function(name) {
			return this.nameToType.get(name);
		},
		name : function(type) {
			return this.typeToName.get(type);
		},
		set : function(name, type) {
			if (typeof name != 'string') {
				this.addtype(name.toString(), name);
				name = name.toString();
			}
			if (this.content.has(name)) throw new Error('Type name already taken.');
			this.content.set(name, type);
		},
		addtype : function(name, type) {
			this.nameToType.set(name,type);
			this.typeToName.set(type,name);
		},
		/*set : function(name, type) {
			throw new Error("Can't set in the initial typeMap");
		},
		addtype : function(name, type) {
			throw ReferenceError('You should instanciate the map before assinging new types');
		},*/
		sub : function(subtypes) {
			let copy = this.copy();
			if (subtypes) subtypes.forEach(s => {
				copy.set(s, new Type(this.get('unknown')));
			});
			return copy;
		},
		copy : function() {
			return {
				typeToName : new Map(this.typeToName), 
				nameToType : new Map(this.nameToType), 
				content : new Map(this.content),
				get : this.get,
				find : this.find,
				isValid : this.isValid,
				type : this.type,
				name : this.name,
				set : function(name, type) {
					if (typeof name != 'string') {
						this.addtype(name.toString(), name);
						name = name.toString();
					}
					if (this.content.get(name)) throw new Error('Type name already taken.');
					this.content.set(name);
				},
				addtype : function(name, type) {
					this.nameToType.set(name,type);
					this.typeToName.set(type,name);
				},
				sub : this.sub,
				copy : this.copy
			};
		}
	},
	clone: function() {
		let newFunc = function(arg, type, exception) {
			if (arg === undefined && type === undefined && exception === undefined){
				return newFunc.clone();
			}
			return newFunc.check(arg, type, exception); 
		}
		methodList.forEach((m) => newFunc[m] = this[m]);
		newFunc.typeMap = this.typeMap.copy();
		return newFunc;
	},
	checkClone : function(subNames, subTypes) {
		let newFunc = function(arg, type, exception) {
			if (arg === undefined && type === undefined && exception === undefined){
				throw new Error("A checkClone can't be cloned");
			}
			return newFunc.check(arg, type, exception); 
		}
		newFunc.find = this.find;
		newFunc.isValid = this.isValid;
		newFunc.check = this.check;
		newFunc.checkClone = this.checkClone;
		newFunc.typeMap = this.typeMap.copy();
		for (var i = 0; i < subNames.length && i < subTypes.length; i++) {
			newFunc.typeMap.set(subNames[i], newFunc.typeMap.get(subTypes[i]));
		}
		return newFunc;
	}
}

for (let name in reserved) {
	properties.typeMap.content.set(name, new Type(reserved[name]));
	let type = (typeof reserved[name]) == "object" ? name : reserved[name];
	properties.typeMap.nameToType.set(name,type);
	properties.typeMap.typeToName.set(type,name);
}

for (let name in properties) {
	Tycker[name] = properties[name];
}

//Tycker.type = Type;

module.exports = Tycker;