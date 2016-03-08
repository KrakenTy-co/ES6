
// ES5 - From for to forEach() to for-of

var arr = ['a', 'b', 'c'];
for (var i=0; i<arr.length; i++) {
    var elem = arr[i];
    console.log(elem);
}

// ES5(each)

arr.forEach(function (elem) {
    console.log(elem);
});

// ES5(for..in)

for (var i in arr) {
    var elem = arr[i];
    console.log(elem);
}

// ES6 - From for to forEach() to for-of

for (let elem of arr) {
    console.log(elem);
}


/*
 https://jsperf.com/for-of-vs-for-loop/15

 1000 times repeating letter x

 traditional for loop -  906,773 Ops/sec
 for of               -  35,993 Ops/sec
 for in               -  15,759 Ops/sec
 forEach              -  15,651 Ops/sec
*/

















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


















// ES5 - From apply(), push(), concat() to the spread operator (...)

var x = Math.max.apply(null, [-1, 5, 11, 3]);

var y = arr1.push.apply(arr1, arr2);

var z = arr1.concat(arr2, arr3);


// ES6 - From apply(), push(), concat() to the spread operator (...)

let x = Math.max(...[-1, 5, 11, 3]);

let y = arr1.push(...arr2);

let z = [...arr1, ...arr2, ...arr3];




















// ES5 - From function expressions in object literals to method definitions

var obj = {
    foo: function () {
    },
    bar: function () {
        this.foo();
    }
};


// ES6 - From function expressions in object literals to method definitions

let obj = {
    foo() {
    },
    bar() {
        this.foo();
    }
};