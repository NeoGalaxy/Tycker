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

The global variable `Tycker` will be set to the initial Tycker instance. So you can directly use `Tycker()`, `Tycker.match` ect…

See the [api]().

### Using NPM

Simply import the module into a variable, and this variable will be the initial Tycker instance. So, to use the variable `Tycker` as the initial Tycker instance, you can simply do `const Tycker = require('Tycker')`.

See [api]() for more on how to use a Tycker instance.

## License

#### TL;DR

You have to contact me before using it. Otherwise, you can‘t copy, distribute, or modify this project (due to copyrights). You can try it on your own computer (have fun trying it), and don’t hesitate contacting me for any other use !

#### Longer version

This project has no license, and because of the copyright you can’t copy, distribute, or modify it. In other words, you can just use it on your own, to try it or have fun. As soon as you need to distribute it in order to use it, you need my permission.

Don’t worry, I’m quite friendly so feel free to ask me the permission. I mainly don’t want to give out my work to someone that would use it and make a lot of money without knowing.

#### How to contact me ?

Simply contact [me](https://github.com/NeoGalaxy) by e-mail telling me simply what you want to do with Tycker. You can give me your Discord if you prefer me to contact you over there. Also, fell free giving me feedback, advices, or anything else. 

