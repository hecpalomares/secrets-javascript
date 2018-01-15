const assert = require('assert');

// Javascript variables in lexical enviroment: var, let, const

// var: related to the closest function or global lexical enviroment. (Code blocks are ignored).
var globalTree = "Tree";

function reportActivity() {
	var functionActivity = "Cutting";

	for(var i = 1; i < 3; i++) {
		var forMessage = `${functionActivity} a ${globalTree}`;
		assert(forMessage === "Cutting a Tree");
		assert(i, "Current loop counter:" + i);
	}

	assert(i === 3 && forMessage === "Cutting a Tree", "Loop Variables accessed outside the loop");
}

reportActivity();

assert(typeof forMessage === "undefined" && typeof i === "undefined" && typeof functionActivity === "undefined", "Function variables outside the scope");

// let, const: related to the closest lexical enviorments. (Code blocks apply).
const GLOBAL_TREE = "Tree";

function reportActivity2() {
	const functionActivity2 = "Cutting";

	for(let i = 1; i < 3; i++) {
		let forMessage2 = `${functionActivity2} a ${GLOBAL_TREE}`;
		assert(forMessage2 === "Cutting a Tree");
		assert(i, "Current loop counter:" + i);
	}

	assert(typeof forMessage2 === "undefined" && typeof i === "undefined", "Loop variables not accesible outside the scope");
}

reportActivity();

assert(typeof forMessage2 === "undefined" && typeof i === "undefined" && typeof functionActivity2 === "undefined", "Function variables outside the scope");

//  Revisting mimicking private variables with closures
function Dog() {
	let barks = 0;	// Declares a variable inside the constructor. Because the scope of the variable is limited to the Dog() cons, its a "private" variable.
	
	this.getBarks = function() {	// Accessor method to "private" variable
		return barks;
	};

	this.bark = function() {			// The value is private, they have limited access via our methods.
		barks++;
	};
}

let rutila = new Dog();

assert(rutila.barks === undefined, "The private variable is undefined");
rutila.bark();
assert(rutila.getBarks() === 1, "Via our method getBarks() we can get our private variable");

let nacho = new Dog();
assert(nacho.getBarks() === 0, "The second Dog object gets its own barks variable");