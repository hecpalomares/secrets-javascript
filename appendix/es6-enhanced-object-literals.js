const assert = require('assert');

// Enhanced object literals:

// A.5: Enhanced Object Literals
const name = "Whisky";
const years = 18;

const oldDrink = {
	name: name,
	getName: function() {
		return this.name;
	}
};

oldDrink["oldYears" + years] = years;		// Create a property that is dynamic calculated
assert(oldDrink.name === "Whisky");
assert(typeof oldDrink.getName === "function");	
assert("oldYears18" in oldDrink);					

const newDrink = {
	name,
	getName() {
		return this.name;
	},
	["newYears"+years]: 18
};

assert(newDrink.name === "Whisky");
assert(typeof newDrink.getName === "function");
assert("newYears18" in newDrink);

// Property value shorthand syntax: assigns the value of the same named variable to the property (line 22)
// Method definition shorthand, no need to add a colon and a function keyword, the parenthesis signals the method (line 23)
// Computed property name