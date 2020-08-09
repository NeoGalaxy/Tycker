# Tycker

*Next level run-time type-checking.*

**Version** : 0.2.1 (Pre-Alpha)

Tycker is a JavaScript run-time type checker who’s purpose is to facilitate type checking. It has several built-in types, supports creating highly customizable types, checking if a variable matches to a given type and executing code depending on the given type. The goal is to write make type checking easy to write and to read. Here is an example of usage :  

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

/!\ You can use this project, but not distribute it. Check the [licensing](#Licence) /!\

### Table of contents

[TOC]

## Installation

*Work in progress*

## Usage

### On Client-side

The global variable `Tycker` will be set to the initial Tycker instance. So you can directly use `Tycker()`, `Tycker.match` ect…

See the [specification]().

### Using NPM

Simply import the module into a variable, and this variable will be the initial Tycker instance. So, to use the variable `Tycker` as the initial Tycker instance, you can simply do `const Tycker = require('Tycker')`.

See [specification]() for more on how to use a Tycker instance.

## License

#### TL;DR

You can‘t copy, distribute, or modify. You can try it on your own computer (have fun trying it), and don’t hesitate contacting me for any other use !

#### Longer version

This project has no license, and because of the copyright you can’t copy, distribute, or modify it. In other words, you can just use it on your own, to try it or have fun. As soon as you need to distribute it in order to use it, you need my permission.

Don’t worry, I’m quite friendly so feel free to ask me the permission. I mainly don’t want to give out my work to someone that would use it and make a lot of money without knowing.

#### Why don’t I put a license ?

Well, first of all, this project is still in **(Pre-)Alpha**. I created it for myself (it will be usefull in other projects), and it is not fully tested. For the moment no one seems to want to use it, so I don’t see the why I’ll bother finding a licence. But if many people asks me to use it, I will consider putting a licence.

Also, this is the first public project I make, that might be really useful, and I don’t want to give freely my work (in which I have put many hours). 

**Fell free to try it on your own, and contact me if you like it and/or want to use it.**

#### Why do you plan to do a specification if it is for yourself ?

Because I will use this specification myself (maybe I’ll forget about how I’ve done the library ?), and it will be useful if others are interested. Two birds with one stone.

#### How to contact me ?

Simply send me an [e-mail](https://github.com/NeoGalaxy) telling me what you want to say me about Tycker. You can give me your Discord if you prefer me to contact you over there. Also, fell free giving me feedback, advices, or anything else. 

