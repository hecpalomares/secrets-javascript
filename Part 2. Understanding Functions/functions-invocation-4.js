const assert = require('assert');

// Not receiving enough parameters
function myFunctionA(a, b, c) {
	console.log(a, b, c);	// Somebody once (c = undefined)
}

myFunctionA("Somebody ", "Once ");

// Not passing enough arguments
function myFunctionB(a, b, c) {
	console.log(a, b, c, d);	// I want a (d = null)
}

myFunctionA("I ", "want ", " a", " dog");

// 'arguments' parameter: collection of all arguments passed to a function
function myFunctionC(a, b, c) {
	// Accessing associated parameters
	assert(a === 1, 'The value of a is 1');
	assert(b === 2, 'The value of b is 2');

	// Accessing associated parameters via arguments[n] notation
	assert(arguments[2] === 4, 'The value of c is 3');

	// Accessing not defined parameters via arguments[n] notation
	assert(arguments[3] === 4, 'The value of d is 4');
	assert(arguments[4] === 5, 'The value of e is 5');

	assert(arguments.length === 5, 'I´ve passed 5 arguments');

	console.log(typeof(arguments)); // Object (it's more of Array-like)
}

myFunctionC(1, 2, 3, 4, 5);

// rewrited 4.2 excercise using rest parameters and es6 reduce function
function sum(...numbers) {
	return numbers.reduce((a, b) => a + b, 0);
}

assert(sum(1, 2, 3) === 6, "Adding three numbers");
assert(sum(1, 2) === 3, "Adding two numbers");

