const assert = require('assert');

// Modules: a cluster of a program that belongs together. Examples of modules: namespaces (C++ and C#) and packages (Java). Enclose names in another name.
// Javascript need advanced code modularization techniques with Javascript constructs as objects, immediate functions and closures.

// 11.1 Module pattern

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

// 11.2 Augmenting modules

(function(module) {
	let numScroll = 0;							// New "private" variable defined in the augmented module

	const handleScroll = () => {		// New "private" method defined in the augmented module
		console.log(++numScroll);
	}

	module.countScroll = () => {	// Extends the module interface
		document.addEventListener("wheel", handleScroll);
	};

})(MouseCounterModule);					// Pass the module as an argument

assert(typeof MouseCounterModule.countClicks === "function", "Initial module functionality");
assert(typeof MouseCounterModule.countScroll === "function", "Augmented module functionality");

// Shortcoming of augmenting modules. Private variables between diferent enviroments can't be accessed. 

// 11.3 Modularizing with AMD (Asynchronous Module Definition)

/*
define("MouseCounterModule", ['jQuery'], $ => {		// Use the define function to specify a module, its dependencies, and the moduel factory function
	let numClicks = 0;							

	const handleClick = () => {
		console.log(++numClicks);
	};

	return {																				// Public interface to interact with
		countClicks: () => {
			$(document).on("click", handleClick);		
		}																					
	};
});
*/

// 11.4 Using CommonJS to define a module
/*
const $ = require("jQuery");								// Synchronosly requires a jQuery module
let numClicks = 0;												

const handleClick = () => {							
	console.log(++numClicks);
};

module.exports = {													// Modifies the module.exports property to specify the public interface of a module
	countClicks: () => {
		$(document).on("click", handleClick);							 
	}																									
};
*/