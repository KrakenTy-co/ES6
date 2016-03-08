
// ES5 - From constructors to classes

function Person(name) {
    this.name = name;
}
Person.prototype.describe = function () {
    return 'Person called '+this.name;
};


// ES6 - From constructors to classes

class Person {
    constructor(name) {
        this.name = name;
    }
    describe() {
        return 'Person called '+this.name;
    }
}

















// ES5 - Derived classes

function Employee(name, title) {
    Person.call(this, name); // super(name)
    this.title = title;
}
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;
Employee.prototype.describe = function () {
    return Person.prototype.describe.call(this) // super.describe()
        + ' (' + this.title + ')';
};


// ES6 - Derived classes

class Employee extends Person {
    constructor(name, title) {
        super(name);
        this.title = title;
    }
    describe() {
        return super.describe() + ' (' + this.title + ')';
    }
}





















// ES5 - From function expressions to arrow functions

function UiComponent() {
    var _this = this; // (A)

    var button = document.getElementById('myButton');

    button.addEventListener('click', function (event) {
        _this.handleClick(); // (B)
    });
}
UiComponent.prototype.handleClick = function () {};


// ES6 - From function expressions to arrow functions

class UiComponent {
    constructor() {
        let button = document.getElementById('myButton');

        button.addEventListener('click', (event) => {
            this.handleClick(); // (A)
        });
    }
    handleClick() {}
}


let odds = evens.map(v => v + 1);
let nums = evens.map((v, i) => v + i);


















// ES5 - Errors, Map, Set, WeakMap, WeakSet

var find = 3;
var data = ['a', 'b', 'c'];

function isIn(data, find) {
    for(var i in data) {
        if(i == find) {
            return true;
        }
    }
    return false;
}

console.log(isIn(data, find)); // false


// ES6 - Errors, Map, Set, WeakMap, WeakSet

var find = 3;
var data = new Map();
data.set(0, 'a');
data.set(1, 'b');
data.set(2, 'c');

function isIn(data, find) {
    return data.has(find);
}

console.log(isIn(data, find)); // false




// PS

var myMap = new Map([["key1", "value1"], ["key2", "value2"]]); // Use the regular Map constructor to transform a 2D key-value Array into a map
myMap.get("key1"); // returns "value1"





// x2
// ES5 - Errors, Map, Set, WeakMap, WeakSet

function MyList() {
    // Use Map as a function
    var superInstance = Map.apply(null, arguments);
    copyOwnPropertiesFrom(this, superInstance);
}
MyList.prototype = Object.create(Map.prototype);
MyList.prototype.constructor = MyList;


// ES6 - Errors, Map, Set, WeakMap, WeakSet

class MyList extends Map {
}






















// ES5 - From CommonJS modules to ES6 modules

//------ myFunc.js ------
module.exports = function () { };

//------ main1.js ------
var myFunc = require('myFunc');
myFunc();


// ES6 - From CommonJS modules to ES6 modules

//------ myFunc.js ------
export default function () { } // no semicolon!

//------ main1.js ------
import myFunc from 'myFunc';
myFunc();





















// multiple

// ES5 - From CommonJS modules to ES6 modules

//------ lib.js ------
var sqrt = Math.sqrt;
function square(x) { return x * x; }
function diag(x, y) { return sqrt(square(x) + square(y)); }
module.exports = { sqrt: sqrt, square: square, diag: diag };

//------ main1.js ------
var square = require('lib').square;
var diag = require('lib').diag;

console.log(square(11)); // 121
console.log(diag(4, 3)); // 5

//------ main2.js ------
var lib = require('lib');
console.log(lib.square(11)); // 121
console.log(lib.diag(4, 3)); // 5


// ES6 - From CommonJS modules to ES6 modules

//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) { return x * x; }
export function diag(x, y) { return sqrt(square(x) + square(y)); }

//------ main1.js ------
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5

//------ main2.js ------
import * as lib from 'lib';
console.log(lib.square(11)); // 121
console.log(lib.diag(4, 3)); // 5