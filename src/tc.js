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
	builtIn : new Map(),
	inherited : new Map(),
	defined : new Map(),
	override : 'redefine',
	//nameToType : new Map(),
	//typeToName : new Map(), 
	get : function(name, getOriginal) {
		let res = this.defined.get(name) || this.inherited.get(name) || this.builtIn.get(name);
		if (getOriginal) return res;
		if (res) res = new Type(res);
		return res;
	},
	isValid : function(type) {
		if (type instanceof Type || type instanceof TypeEditor) return true;
		switch (typeof type) {
			case 'string':
				let parsedType = parseStr(type, null, (t) => this.get(t));
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
	set : function(name, type, force) {
		if (force || this.override == 'all') 
			return this.defined.set(name, type);
		if (this.override == 'inherited' && this.inherited.has(name)) 
			return this.defined.set(name, type);
		if (this.override == 'redefine' && this.defined.has(name)) 
			return this.defined.set(name, type);
		if (this.builtIn.has(name))
			throw new Error('Type name used by a built-in type.');
		if (this.inherited.has(name))
			throw new Error('Type name used by an inherited type.');
		if (this.defined.has(name))
			throw new Error('Type name used by a defined type.');
		return this.defined.set(name, type);
	},
	copy : function(canOverride = 'same') {
		if (!['none','same','inherited','all'].includes(canOverride))
			throw new Error(`Invalid copying method. `
				+ `'canOverride' (first arg) should be 'none', 'same', 'inherited' or 'all'.`);
		
		return {
			//typeToName : new Map(this.typeToName), 
			//nameToType : new Map(this.nameToType), 
			builtIn : this.builtIn,
			inherited : (canOverride == 'same') ? new Map(this.inherited) : new Map([...this.inherited, ...this.defined]),
			defined : (canOverride == 'same') ? new Map(this.defined) : new Map(),
			get : this.get,
			override : (canOverride == 'same') ? this.override : canOverride,
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
	build : function(typeDescr, checker = undefined, casts = []) {
		let type = parseType(typeDescr, this);
		let editor = type.editor(this);
		if (checker) editor = editor.setChecker(checker);
		casts.forEach((c) => {
			switch (typeof c) {
				case 'function':
					editor.addCast(c);
					break;
				case 'object':
					editor.addCast(c.type,c.function);
					break;
				default:
					throw new TypeError('The casts are not of valid type.');
					break;
			}
		});
		return editor;
	},
	def : function(completeName, typeDescr = 'any', checker = undefined, casts = []) {
		let {name, subtypes} = parseName(completeName);
		let type = parseType(typeDescr, this.checkClone(subtypes));
		this.typeMap.set(name, type);
		type.subtypes = subtypes;
		let editor = type.editor(this);
		if (checker) editor = editor.setChecker(checker);
		casts.forEach((c) => {
			switch (typeof c) {
				case 'function':
					editor.addCast(c);
					break;
				case 'object':
					editor.addCast(c.type,c.function);
					break;
				default:
					throw new TypeError('The casts are not of valid type.');
					break;
			}
		});
		return editor;
	},
	defs : function(types, temporary = []) {
		let subTycker = this();
		subTycker.def('tcDefStatement',{
			'name':'string',
			'descr?':'type',
			'checker?':'function',
			'overwriteChecker?':'boolean',
			'casts?':'function[]'
		});
		defList = subTycker.build('tcDefStatement[]').__type__;
		this.check(types, defList, new TypeError('Cannot create types : types config file is invalid.'), true);
		this.check(temporary, defList, new TypeError('Cannot create types : temporary types config file is invalid.'), true);

		subTycker = this();

		////////  Registering  ////////
		for (let conf of temporary) subTycker.def(conf.name);
		for (let conf of types) subTycker.def(conf.name);

		subTycker = subTycker
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
		let type = parseType(typeObject, this);
		//let typeName = undefined;
		//let subtypes = [];
		if(type === undefined) {
			throw new Error('Unable to find type or create anonymous type from above object');
		}
		let self = {}
		//if (!type) type = this.typeMap(typeName);
		if (type == undefined) {
			throw new Error(`Should not occur. Please contact me.`);
		}
		if (castBefore) {
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
		let type = parseType(typeObject, this);
		return type.cast(arg,this,exception);
	},
	addCast : function(typename,cast,typecase = 'any') {
		this.typeMap.get(typename).addCast(cast, typename);
	},
	clone: function(canOverride = 'same') {
		if (!['none','same','inherited','all'].includes(canOverride))
			throw new Error(`Invalid cloning method. `
				+ `'canOverride' (first arg) should be 'none', 'same', 'inherited' or 'all'.`);
		
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
		newFunc.typeMap = this.typeMap.copy(canOverride);
		return newFunc;
	},
	checkClone : function(subNames, subTypes) {
		if (subTypes == undefined) subTypes = new Array(subNames.length).fill('unknown');
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
	properties.typeMap.builtIn.set(name, new Type(reserved[name]));
	//let type = (typeof reserved[name]) == "object" ? name : reserved[name];
	//properties.typeMap.nameToType.set(name,type);
	//properties.typeMap.typeToName.set(type,name);
}

for (let name in properties) {
	Tycker[name] = properties[name];
}

//Tycker.type = Type;

module.exports = Tycker;