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

function sumAllNumbers() {
	let result = 0;
	for(let n = 0; n < arguments.length; n++) {
		result+=arguments[n];
	}
	this.result = result;
}

let objA = {};
let objB = {};

sumAllNumbers.apply(objA, [1, 2, 3, 4]);	// setting the function context to be this: objA
sumAllNumbers.call(objB, 5, 6, 7, 8);			// setting the function context to be this: objB

assert(objA.result === 10, "called sumAllNumbers via apply");
assert(objB.result === 26, "called sumAllNumbers via call");

/*Excercises*/
// Sum all numbers using implicit 'arguments' parameter (imperative)
function sumArgs() {
	let sum = 0;
	for(let i = 0; i < arguments.length; i++) {
		sum+=arguments[i];
	}
	return sum;
}

assert(sumArgs(1, 2, 3, 4) === 10, "Adding four numbers should be 10");
assert(sumArgs(1, 2) === 3, "Adding two numbers should be 3");

// Sum all numbers using implicit 'rest' parameters (imperative)
function sumRest(...numbers) {
	let sum = 0;
	for(let i = 0; i < numbers.length; i++) {
		sum+=numbers[i];
	}
	return sum;
}

assert(sumRest(1, 2, 3, 4) === 10, "Adding four numbers should be 10");
assert(sumRest(1, 2) === 3, "Adding two numbers should be 3");

// Sum all numbers using implicit 'rest' parameters and reduce es6 function (declarative)
function sumRestReduce(...numbers) {
	return numbers.reduce((a, b) => a + b, 0);
}

assert(sumRestReduce(1, 2, 3, 4) === 10, "Adding four numbers should be 10");
assert(sumRestReduce(1, 2) === 3, "Adding two numbers should be 3");

// Ex 3.
function whoIamThree() {
	"use strict";
	return this;
}

function whoIamThreeTwo() {
	return this;
}

// assert(whoIamThree() !== window);
// assert(whoIamThreeTwo() === window);

// The value of the 'this' parameter on line 183 returns as undefined since is running on strict mode.
// The value of the 'this' parameter on line 187 returns as window, returning the global object

// Ex 4. 
let myDog1 = {
	whoAmI() {
		return this;
	}
};

let myDog2 = {
	whoAmI: myDog1.whoAmI
}

let identify = myDog2.whoAmI;

assert(myDog1.whoAmI() === myDog1);		// Called as a method of myDog1
assert(myDog2.whoAmI() === myDog2);		// Called as a method of myDog2

assert(identify() !== "window");			// identify calls the function as a function refering to the object window
assert(myDog1.whoAmI.call(myDog2) === myDog2);		// Using call to supply the execution context

// Ex 5. 
function Team() {
	this.whoAmI = () => this;
}

let sevilla = new Team();
let betis = {
	whoAmI: sevilla.whoAmI;
};

// whoAmI is an arrow function inherits the function context from the context in which was created.
// since it was created at the construction of sevilla it will always point to sevilla
assert(sevilla.whoAmI === sevilla);		

// 'this' will always point to sevilla
assert(betis.whoAmI !== betis);																			

// Ex 6.
function Ninja() {
	this.whoAmI = function() {
		return this;
	}.bind(this);
}

let ninja1 = new Ninja();
let ninja2 = {
	whoAmI: ninja1.whoAmI;
};

// the function assigned to whoAmI is a function bound to ninja1 (the value of this when the constructor is invoked).
assert(ninja1.whoAmI() === ninja1);		

// 'this' in whoAmI alwatys refers to ninja1 since it is a bound function
assert(ninja2.whoAmI() !== ninja2);