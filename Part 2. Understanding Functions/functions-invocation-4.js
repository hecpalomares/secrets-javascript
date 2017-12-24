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
	assert(arguments[2] === 3, 'The value of c is 3');

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

// 4 Ways to Invoke Functions
function someFunction() { 
	console.log('returning someFunction') 
}

someFunction();	// (1) as a function, straightforward

let someObject = {
	someOtherFunction: function() { 
		console.log('returning someOtherFunction') 
	}
};

someObject.someOtherFunction();	// (2) as a method, invocation of an object

function Tree(type = "pine") {
	this.type = type;
}

let myTree = new Tree("bamboo");	// (3) as a constructor, 'new' brings a new object
console.log(myTree.type);

// (4) with method apply.(thisArg, arrayOfValues)
let numbers = [4, 2, 1, 9, 6, 7];

let max = Math.max.apply(null, numbers);
console.log(max);

let min = Math.min.apply(null, numbers);
console.log(min);

// (4) with method call.(thisArg, comma separated values)
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price); // reference to call Product with 'this' Food object
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);	// reference to call Product with 'this' Toy object
  this.category = 'toy';
}

let cheese = new Food('cheese', 8.00);
let fun = new Toy('superhero doll', 12.00);

// 'this' context in functions
function whatsMyContext() { return this; }

let myYObject = {
	getMyThis: whatsMyContext
}

let myXObject = {
	getMyThis: whatsMyContext
}

assert(whatsMyContext() === global, "'this' reference to window object");

assert(myXObject.getMyThis() === myXObject, "'this' reference to myXObject");

assert(myYObject.getMyThis() === myYObject, "'this' reference to myYObject");

// Invoking our functions directly (line 106) with 'this' as a refernce to global.
// Or via a methods (line 108, 110) with 'this' referencing to the object (function) itself

function Dog(name, race, age) {
	this.name = name;
	this.race = race;
	this.age = age;

	this.myContext = function() {
		return this;
	}
}

let dadsDog1 = new Dog("Nacho", "Golden Labrador", 7);
let dadsDog2 = new Dog("Thor", "Black Labrador", 3);

assert(dadsDog1 !== dadsDog2.myContext(), "'this' reference to a different instance since 'new' returns a new Object");