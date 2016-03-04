
// ES5 - From for to forEach() to for-of

var arr = ['a', 'b', 'c'];
for (var i=0; i<arr.length; i++) {
    var elem = arr[i];
    console.log(elem);
}

// ES5(each) - From for to forEach() to for-of

arr.forEach(function (elem) {
    console.log(elem);
});

// ES6 - From for to forEach() to for-of

let arr = ['a', 'b', 'c'];
for (let elem of arr) {
    console.log(elem);
}














// ES5 - Handling parameter default values

function foo(x, y) {
    x = x || 0;
    y = y || 0;
}


// ES6 - Handling parameter default values

function foo(x=0, y=0) {
}














// ES5 - From arguments to rest parameters

function logAllArguments() {
    for (var i=0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}


// ES6 - From arguments to rest parameters

function logAllArguments(...args) {
    for (let arg of args) {
        console.log(arg);
    }
}