# Tycker

*Next level run-time type-checking.*

**Version** : 0.3.0 (Pre-Alpha)

Tycker is a JavaScript run-time type checker who’s purpose is to facilitate type checking. It has several built-in types, supports creating highly customizable types, checking if a variable matches to a given type and executing code depending on the given type. The goal is to make type checking easy to write and to read. Here is an example of usage :  

```js
function add(arg1, arg2) {
    Tycker.match([arg1,arg2],[
        {
        	type : Array[2],
			execute : () => arg1.concat(arg2)
        },{
            type : ["myType","any"],
            execute : () => {arg1.content.push(arg2)}
        },{
            type : ["number | string","number | string"],
            execute : () => arg1 + arg2
        }
    ],new TypeError("The arguments should be both arrays, objects, numbers or string."));
}
```

/!\ You can use this project, but not distribute it and/or modify it. Check out the [licensing](#Licence) /!\ 

### Table of contents

[TOC]

## Installation

*Work in progress*

## Usage

### On Client-side

The global variable `Tycker` will be set to the initial Tycker instance. So you can directly use `Tycker()`, `Tycker.match` etc…

See the [API]().

### Using NPM

Simply import the module into a variable, and this variable will be the initial Tycker instance. So, to use the variable `Tycker` as the initial Tycker instance, you can simply do `const Tycker = require('Tycker')`.

See [API]() for more on how to use a Tycker instance.

## License

&copy; NeoGalaxy. Personal use only


You can use it personally, but you have to contact me before using it. If you don't contact me, you can‘t copy, distribute, or modify this project (but you can use it personally).  
Have fun trying it, and don’t hesitate contacting me for any other use !

If the library gets popular, I will consider searching which license I'll put.

## How to contact me ?

Simply contact [me](https://github.com/NeoGalaxy) by e-mail telling me what you want to do with Tycker. it doesn't have to be something fancy, and I'll answer quickly!!
Fell free giving me any feedback, advices, or anything else. 

