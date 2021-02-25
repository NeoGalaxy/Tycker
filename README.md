# Tycker

*Next level run-time type-checking.*

**Version** : 0.3.0 (Pre-Alpha)

Tycker is a JavaScript run-time type checker who’s purpose is to allow complicated type checking. It has several built-in types, supports creating highly customizable types, checking if a variable matches to a given type and executing code depending on the given type. The goal is to make type checking easy to write and to read. Here is an example of usage :  

```js
Tycker.def({name:'even', baseType:'number', checker: n => n%2 == 0});
Tycker.def({name:'propObject',baseType:{
    name: 'string',
    'id?': 'number',
    value : 'bigint'
}});
Tycker.def({name:'prop',baseType:'even | even[2] | propObject'});

// Defining a function that should take a property as argument and return 
// an even number as output
var parseProp = Tycker.func('prop', prop => {
    Tycker.match(prop,[
        {
        	type : 'even',
			exe : n => n
        },{
            type : 'number[2]',
            exe : array => 2*(array[0]+array[1])
        },{
            type : "propObject",
            exe : () => arg1 + arg2
        }
    ],new TypeError("The arguments should be both arrays, objects, numbers or string."));
}, );
```

/!\ You can use this project, but not distribute it and/or modify it. Check out the [licensing](#License) /!\ 

## Installation

On a website, in order to use the library on the client side, you just have to import it within your wesite using a `<script>` tag:

```html
<script type="text/javascript" src="https://raw.githubusercontent.com/NeoGalaxy/Tycker/master/lib/tycker.js"></script>
```

On a server side using Node.js, just install the package: `npm i --save Tycker`.

> Note : I have not performance-tested the library yet, don't expect too much.

## Usage

### On Client-side

The global variable `Tycker` will be set to the initial Tycker instance. So you can directly use `Tycker()`, `Tycker.match` etc…

See the [API](https://github.com/NeoGalaxy/Tycker/wiki).

### In Node.js

By `require`ing the library, you'll get the inital Tycker instance. So, to put Tycker in the variable `Tycker`, you can simply do `const Tycker = require('Tycker')`.

See [API](https://github.com/NeoGalaxy/Tycker/wiki) for more on how to use a Tycker instance.

## License

&copy; NeoGalaxy. Personal use only


You can use it personally, but you have to contact me before using it. If you don't contact me, you can‘t copy, distribute, or modify this project (but you can use it personally).  
Have fun trying it, and don’t hesitate contacting me for any other use !

If the library gets popular, I will consider searching which license I'll put.

## How to contact me ?

Simply contact [me](https://github.com/NeoGalaxy) by e-mail telling me what you want to do with Tycker. it doesn't have to be something fancy, and I'll answer quickly!!
Fell free giving me any feedback, advices, or anything else. 

