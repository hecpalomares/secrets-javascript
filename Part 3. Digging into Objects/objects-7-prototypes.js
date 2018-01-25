const assert = require('assert');

// 7.1 Objects Review
let objectX = {
	prop1: 1, 												// Asign a simple value
	prop2: function() { return 2 }, 	// Assign a simple function
	prop3: {}													// Assign a simple object
};

objectX.prop1 = [];			// Assigns an empty array to the prop1
delete objectX.prop2;		// Removes completly a property on a object

objectX.prop4 = "Hi!";	// Create a new property

console.log(objectX);		// {prop1: [], prop3: {}, prop4: "Hi!"}

// In Javascript inhertiance is implemented with prototyping

// 7.2 Setting up inheritance with prototypes
let myCat = { eat: true };
let myDog = { bark: true };
let myFish = { swim: true };

 