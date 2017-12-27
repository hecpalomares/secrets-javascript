const assert = require('assert');

// Functions are first-class objects

//	Objects recap
//	Creation via literals, assigned to variables, array enties or properties of other objects (line 5, 7, 8)
let myObject = {};	// created via literal
let myArray = [];
myArray.push({});	// pushed to an array
myObject.dataY = {};	// assign an object as a property of another object

// Passed as arguments to functions
function showAnswers(test) {
	test.visibility = true;
}
showAnswers({});

// Returned as values from functions
function getMyProfile () {
	return {};
}

// Posses properties that can be dynmically created and assigned
let myCar = {};
myCar.color = "light-grey";

//	Functions as First-Class Objects
//	Created via literals, assigned to variables, array enties or propoerties of another object (line 27, 28, 29, 30)
function myFunctions() {};
let myVariable = function() {};
myArray.push(function(){});
myObject.dataX = function(){};

// Passed as arguments to functions (callback function)
function calling(myFunction) {
	myFunction();
}

calling(function(){console.log('Hi!')});	// Hi!

// Returned as values from functions
function returnMyFunction() {
	return function(){console.log('Bye?')};
}
console.log(returnMyFunction()());	// Bye?

// Posses properties that can be dynmically created and assigned
let myFunctionX = function(){};
myFunctionX.name = "Champ";

// Since functions are first-class objects they can receive other functions as arguments (callback functions)
let text = "Some Random Text";

function uselessFn(callbackFn) {
	return callbackFn();
}

assert(uselessFn(function() { return text; }) === text, "The useless function works!");

// Storing a collection of unique functions
let store = {
	nextId: 1,
	cache: {},
	add: function(fn) {
		if(!fn.id) {
			fn.id = this.nextId++;
			this.cache[fn.id] = fn;
			return true;
		}
	}
};

function myVideoMaker(){}

assert(store.add(myVideoMaker), "Function was safely added.");
assert(!store.add(myVideoMaker), "Function was added once.");

// Self-memoizing functions: building functions capable of remember its previously computed values
// good uses: calculating animations, searching data that barely changes, time-consuming math
function isPrime(value) {
	if(!isPrime.answers) {
		isPrime.answers = {};	// creates the cache
	}

	if(isPrime.answers[value] !== undefined) {
		return isPrime.answers[value];
	}

	let prime = value !== 1;

	for (let i = 2; i < value; i++) {
		if(value % i === 0) {
			prime = false;
			break;
		}
	}
	return isPrime.answers[value] = prime;	// Stores the computed value
}

assert(isPrime(11), "11 is a prime");
assert(isPrime.answers[11], "11 is cached");

// Function declarations and function expressions
// Declarations: name is mandatory, they're hoisted.
function myFunctionDeclaration(a1, a2, a3) {
	console.log(a1 * a2 * a3);
}
myFunctionDeclaration(2, 2, 2);	// 8

// Expressions. Name is optional, they're not hoisted.
let myFunctionExp = function(b1, b2, b3) {
	console.log(b1 + b2 + b3);
}
myFunctionExp(1, 2, 3);	// 6

// IIFE, gets executed as a immediate function
(function selfExecutedFunction(c1, c2, c3){
	console.log(c1 + c2 + c3);	// 9
})(2, 3, 4);

// Arrow Function, syntatic sugar for functions
let values = [8, 2, 9, 1, 11, 3];
let sortedValues = values.sort((value1, value2) => value1 - value2);
console.log(sortedValues);

// Arguments and parameters
function exampleFunction(a, b, c) {}	// a, b, c are parameters
let exampleVariable = exampleFunction("Hi", "Bye", 2); // "Hi", "Bye", 2 are arguments

//	Rest parameters: Last function paramater can group all the rest of arguments
function usingRestParamaeters(team, ...players) {
	return `${team} is made up by ${players} `;
}
console.log(usingRestParamaeters('Colts', 'Andrew Luck', ' Frank Gore ', ' T. Y Hilton' ));

//	Default parameters: We can assign primitive values and complex values, even functions.
function usingDefaultParameters(artist = "Frank Sinatra", song = "My Way", multimediaPlayer = "Spotify") {
	let string = `My favorite song is ${song} by ${artist}, currently playing at ${multimediaPlayer}`;
	return string;
}

console.log(usingDefaultParameters());	// Uses default parameters since no values are passed
console.log(usingDefaultParameters('Daft Punk', 'Instant Crush'));	// Uses the first and second argument