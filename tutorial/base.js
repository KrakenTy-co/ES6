
// ES5 - From var to let/const

var x = 3;
function func(randomize) {
    if (randomize) {
        var x = Math.random(); // (A) scope: whole function
        return x;
    }
    return x; // accesses the x from line A
}
func(false); // undefined

// ES6 - From var to let/const

let x = 3;
function func(randomize) {
    if (randomize) {
        let x = Math.random();
        return x;
    }
    return x;
}
func(false); // 3












// ES5 - From IIFEs to blocks

(function () {  // open IIFE
    var tmp = 'foo';
}());  // close IIFE

console.log(tmp); // ReferenceError

// ES6 - From IIFEs to blocks

{  // open block
    let tmp = 'bar';
}  // close block

console.log(tmp); // ReferenceError












// ES5 - From concatenating strings to template literals

function printCoord(x, y) {
    console.log('('+x+', '+y+')');
}

// ES6 - From concatenating strings to template literals

function printCoord(x, y) {
    console.log(`(${x}, ${y})`);
}












// ES5 - Handling multiple return values

var matchObj =
    /^(\d\d\d\d)-(\d\d)-(\d\d)$/
        .exec('2999-12-31');
var year = matchObj[1];
var month = matchObj[2];
var day = matchObj[3];

// ES6 - Handling multiple return values

let [, year, month, day] =
    /^(\d\d\d\d)-(\d\d)-(\d\d)$/
        .exec('2999-12-31');


// x2 -es5
var obj = { foo: 123 };

var propDesc = Object.getOwnPropertyDescriptor(obj, 'foo');
var writable = propDesc.writable;
var configurable = propDesc.configurable;

console.log(writable, configurable); // true true


// x2 -es6
let obj = { foo: 123 };

let {writable, configurable} =
    Object.getOwnPropertyDescriptor(obj, 'foo');

console.log(writable, configurable); // true true