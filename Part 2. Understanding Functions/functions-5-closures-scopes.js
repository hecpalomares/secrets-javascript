const assert = require('assert');

/* Core Concepts */
// Closure: Allow a functiosn to access and manipulate variables that are external to that function.
// Scope: Visibility of identifiers in certain parts of the program.

// Example 5.1: Simple closure. Declared in global scope both varaible and function, global scope nevers go away.
let outerValue = "tree";

function outerFunction() {
	assert(outerValue === "tree", "I can see a tree");
}

outerFunction();

// Example 5.2: Closure Example.
let outerValue2 = "pizza";

function outerFunction2() {
	let innerValue = "beer";

	function innerFunction() {
		assert(outerValue2 === "pizza", "I can see a pizza");
		assert(innerValue === "beer", "I can see a beer");
	}
}

outerFunction2();

// Example 5.3: Closure to mimicking private variables.
function Tree() {
	let _leaves = 0; // Declare variable inside Tree constructor function. Scope of variable is limited inisde constructor it becomes "private"
	this.getLeaves = function() {
		return _leaves;	// Accessor method, for read-only access to the _leaves value
	};
	this.grow = function() {
		_leaves++;
	};
}

let myPine = new Tree();
myPine.grow();
myPine.grow();

assert(myPine._leaves === undefined, "The _leaves private variable is innaccesible to us");
assert(myPine.getLeaves() === 2, "Through getLeaves() we can access the private variable _leaves");

let myOak = new Tree();	// new object instance myOak has its own _leaves variable
myOak.grow();

assert(myOak.getLeaves() === 1, "My second tree has its own leaves variable");

// Execution Context: Internal JS concept tht the JS Engine use to track the execution of functions
function reportAnimal(animal) {
	reportMessage(`The ${animal} has escaped!`);	// 
}

function reportMessage(message) {
	console.log(message);
}

reportAnimal("cebra");
reportAnimal("lion");

// The call stack, keeps track of all the execution context

// Call stack: reportAnimal("cebra");
// Call stack: reportMessage("The cebra has escaped!"), reportAnimal("cebra");
// Push reportMessage("The cebra has escaped!") from CS
// Push reportAnimal("cebra") from CS

// Call stack: reportAnimal("lion");
// Call stack: reportMessage("The lion has escaped!"), reportAnimal("lion");
// Push reportMessage("The lion has escaped!") from CS
// Push reportAnimal from CS("lion")