const assert = require('assert');

// Modules: a cluster of a program that belongs together. Examples of modules: namespaces (C++ and C#) and packages (Java). Enclose names in another name.
// Javascript need advanced code modularization techniques with Javascript constructs as objects, immediate functions and closures.

// 11.1 The Module Pattern

const MouseCounterModule = function() {		// Create a global module variable and assigns the result of a immediatly invoking function
	let numClicks = 0;											// Creates a "private" module variable		

	const handleClick = () => {							// Creates a "priavte" module function
		console.log(++numClicks);
	};

	return {
		countClicks: () => {
			document.addEventListener("click", handleClick);		// Returns an object that represent the module interface. 
		}																											// Access "private" module variables and functions.
	};

}();

assert(typeof MouseCounterModule.countClicks === "function", "We can acess module functionality");		// Access granted to properties exposed by the interface
assert(typeof MouseCounterModule.numClicks === "undefined" && 
			 typeof MouseCounterModule.handleClick === "undefined", "We cannot access internal module details");	// No access to module internals.

