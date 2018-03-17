const assert = require('assert');

/* Summary Chapter 8*/
// 1.0 We can monitor our objects with getters, setters and proxies
// 2.0 By Using accessor methods (getters/setters) we control the access to object properties
// 2.1 Accessor properties accessible both Object.defineProperty or special get and set syntax
// 2.2 get method is called when trying to read a property. set method is called when assign a value to the matching object property
// 3.0 Proxies enables to establish special interactions with the object depending how the property is used (trigger traps)
// 3.1 Proxies are used for logging, performance measurements, data validation, autopopulating object properties, negative array index
// 3.2 Proxies are not that fast, careful when overused since it affects performance

// Example 1
const ninja = {
	get name() {
		return "Hanzo";
	}
};

//ninja.name();										// get() is implictily called. There is no need of the get function invocation ().
const randomName = ninja.name;		// correct, it will implicitly call get, return the name and assign it to the variable
console.log(randomName);

// Example 2
function Programmer() {
	const _computer = "iMac";
	Object.defineProperty(this, "computer", {			// Object.defineProperty creates a closures on the instance
		get: () => _computer
	});
}

const me = new Programmer();

assert(me._computer === undefined);		// Trying to access the private variable directly returns undefined
assert(me.computer === "iMac");				// Trying to access the variable _computer with getter (is accessible through closures)

// Closures allows getters to access private object variables. At (line 27) creates a closures on _computer private variable
// defined in the constructor function keeping the private variable alive.

// Example 3
const king = { name: "Louis XV", country: "France" };
const traitor = new Proxy(king, {
	get: (target, key) => {
		if(key === "country") {
			return "England";
		}
	}
});

assert(king.country === "France");					// This passes since king has a property country
assert(traitor.country === "England");			// This passes since we access the property through the proxy activating a get trap

traitor.country = "Italy";									// The proxy changed the king.country property value to Italy, becouse it doesn't own a set trap
																						// the action is carried to to the target 'king' (line 41)

// assert(king.country === "France");				// The king now has "Italy" as value
assert(traitor.country === "England");			// The traitor (proxy) always returns "England", as a method regarding the value stored on king object

// Example 4
const general = { name: "Patton", country: "US", armySize: 100 };

const proxyGen = new Proxy(general, {
	set: (target, key, value) => {
		if(key === "armySize") {
			const number = Number.parseInt(value);
			if(!Number.isNaN(number)) {
				target[key] = number;
			} else {
				target[key] = value;
			}
		}
	}
});

assert(general.armySize === 100);				// True. At general object, the property 'armySize' is 100
assert(proxyGen.armySize === 100);			// True. Since there is no get trap, the value of the target (general) armysize is returned

proxyGen.armySize = "large";						
assert(general.armySize === "large");		// False. The setter checks that we are setting a number. 
																				// Since we are setting a string it doesn't set the value of the string.

general.armySize = "large";							
assert(general.armySize === "large");		// True. Since we are overriding directly on the property of the object, bypassing the proxy.