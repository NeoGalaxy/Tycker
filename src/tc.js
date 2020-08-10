"use strict"
const reserved = require('./reserved');
const {parseName, parseType, parseStr, Type, TypeEditor} = require('./utility');
/*
.cast
*/
const Tycker = function(arg, type, exception) {
	if (arg === undefined && type === undefined && exception === undefined){
		return Tycker.clone();
	}
	if (type === undefined && exception === undefined){
		return Tycker.get(arg);
	}
	return Tycker.check(arg, type, exception); 
}

// Not called 'typeMap' to avoid errors from using typeMap instead of this.typeMap in methods
let wholeTypeMap = {
	content : new Map(),
	//nameToType : new Map(),
	//typeToName : new Map(), 
	get : function(name, getOriginal) {
		let res = this.content.get(name);
		if (getOriginal) return res;
		if (res) res = new Type(res);
		return res;
	},
	/*find : function(type) {
		let typename = (typeof type) == 'string' ?
		           type :
		           this.name(type);
		if (!this.content.has(typename)) return undefined;
		return typename;
	},*/
	isValid : function(type) {
		if (type instanceof Type || type instanceof TypeEditor) return true;
		switch (typeof type) {
			case 'string':
				let parsedType = parseStr(type, (t) => this.get(t));
				return true;
			case 'object':
				for (let t in type) {
					if (!this.isValid(t)) return false;
				}
				return true;
			case 'function': // Assumed to be a class
				return true;
			default:
				return false;
		}
	},
	/*type : function(name) {
		return this.nameToType.get(name);
	},
	name : function(type) {
		return this.typeToName.get(type);
	},*/
	set : function(name, type, force) {
		/*if (typeof name != 'string') {
			this.addtype(name.toString(), name);
			name = name.toString();
		}*/
		if (!force && this.content.has(name)) throw new Error('Type name already taken.');
		return this.content.set(name, type);
	},
	/*addtype : function(name, type) {
		this.nameToType.set(name,type);
		this.typeToName.set(type,name);
	},*/
	copy : function() {
		return {
			//typeToName : new Map(this.typeToName), 
			//nameToType : new Map(this.nameToType), 
			content : new Map(this.content),
			get : this.get,
			//find : this.find,
			isValid : this.isValid,
			//type : this.type,
			//name : this.name,
			set : this.set,
			addtype : function(name, type) {
				this.nameToType.set(name,type);
				this.typeToName.set(type,name);
			},
			//sub : this.sub,
			copy : this.copy,
			checkCopy : this.checkCopy
		};
	},
	checkCopy : function(subNames, subTypes) {
		if (subTypes == undefined) subTypes = new Array(subNames.length).fill('unknown');
		let copy = this.copy();
		let parent = this;
		copy.get = function(name, getOriginal) {
			name = (subTypes[subNames.indexOf(name)]) || name;
			return parent.get.call(this,name);
		};
		copy.find = function(type) {
			type = (subTypes[subNames.indexOf(type)]) || type;
			return parent.find.call(this,type);
		};
		copy.type = function(name) {
			name = (subTypes[subNames.indexOf(name)]) || name;
			return parent.type.call(this,name);
		};
		return copy;
	}
}

let properties = {
	typeMap : wholeTypeMap,
	/*find : function(type) {
		return this.typeMap.find(type);
	},*/
	get : function (type) {
		return this.typeMap.get(type,true).editor(this);
	},
	isValid : function(type) {
		return this.typeMap.isValid(type);
	},
	def : function(completeName, typeDescr = 'any') {
		let {name, subtypes} = parseName(completeName);
		let type = parseType(typeDescr, this.typeMap.checkCopy(subtypes));
		type.subtypes = subtypes;
		/*if (typeof typeDescr == "function") {
			this.typeMap.addtype(name, typeDescr);
		}*/
		this.typeMap.set(name, type);
		return type.editor(this);
	},
	match : function(el, matches, fallback) {
		for (let config of matches) {
			if (this.check(el, config.type, false, config.cast == true))
				return config.exe(el);
		}
		if (fallback instanceof Error) throw fallback;
		return fallback;
	},
	check : function(arg, typeObject, exception = false, castBefore = false){
		let type = parseType(typeObject, this.typeMap);
		//let typeName = undefined;
		//let subtypes = [];
		if(type === undefined) {
			console.log(this);
			console.log(typeof(typeObject),':',typeObject);
			throw new Error('Unable to find type or create anonymous type from above object');
		}
		let self = {}
		//if (!type) type = this.typeMap(typeName);
		if (type == undefined) {
			throw new Error(`Should not occur. Please contact me.`);
		}
		if (castBefore) {
			console.log('casting from',type)
			console.log(typeObject)
			let newArg = type.cast(arg, this);
			if (newArg !== undefined) arg = newArg;
		}
		if (!type.check.call(type.editor(this),arg,this)) {
			if (exception instanceof Error){
				throw exception;
			}
			return exception;
		}
		else return true
	},
	cast : function(arg, typeObject, exception = undefined) {
		let type = parseType(typeObject, this.typeMap);
		return type.cast(arg,this,exception);
	},
	addCast : function(typename,cast,typecase = 'any') {
		this.typeMap.get(typename).addCast(cast, typename);
	},
	clone: function() {
		let newFunc = function(arg, type, exception) {
			if (arg === undefined && type === undefined && exception === undefined){
				return newFunc.clone();
			}
			if (type === undefined && exception === undefined){
				return newFunc.get(arg);
			}
			return newFunc.check(arg, type, exception); 
		}
		Object.keys(this).forEach((m) => {if (typeof this[m] == 'function') newFunc[m] = this[m]});
		newFunc.typeMap = this.typeMap.copy();
		return newFunc;
	},
	checkClone : function(subNames, subTypes) {
		for (var i = subTypes.length; i < subNames.length; i++) {
			subTypes.push('any');
		}
		let newFunc = function(arg, type, exception) {
			if (arg === undefined && type === undefined && exception === undefined){
				throw new Error("A checkClone can't be cloned");
			}
			if (type === undefined && exception === undefined){
				return newFunc.get(arg);
			}
			return newFunc.check(arg, type, exception); 
		}
		newFunc.find = this.find;
		newFunc.isValid = this.isValid;
		newFunc.check = this.check;
		newFunc.checkClone = this.checkClone;
		newFunc.typeMap = this.typeMap.checkCopy(subNames, subTypes);
		return newFunc;
	}
}

for (let name in reserved) {
	properties.typeMap.content.set(name, new Type(reserved[name]));
	//let type = (typeof reserved[name]) == "object" ? name : reserved[name];
	//properties.typeMap.nameToType.set(name,type);
	//properties.typeMap.typeToName.set(type,name);
}

for (let name in properties) {
	Tycker[name] = properties[name];
}

//Tycker.type = Type;

module.exports = Tycker;