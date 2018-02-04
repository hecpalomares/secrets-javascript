const assert = require('assert');

// Proxy: surrgate through we control access to another object. With getter/setter you control the access to only a single property. 
// With proxies you enable the generically handle all interactions with an object.

// 8.7 Creating proxies with the Proxy constructor
const emperor = { name: "Louis XV" };					// target object

const representative = new Proxy(emperor, {
	get: (target, key) => {
		console.log(`Reading ${key} through a proxy`);
		return key in target ? target[key] : "Don't bother the emperor with silly requests.";
	},
	set: (target, key, value) => {
		console.log(`Writing ${key} through a proxy`);
		target[key] = value;
	}
});

assert(emperor.name === "Louis XV", "Getting the name directly.");
assert(representative.name === "Louis XV", "Getting the name through the proxy");	// Accessing the emperor object through the proxy object.

assert(emperor.nickname === undefined, "The emperor doesn't have a nickname");		// Accessing a non-existing property directly on the object returns undefined.
assert(representative.nickname === "Don't bother the emperor with silly requests.", "Proxy jumps");	// Accessing a property through a proxy detects that the object doesn't contain, returns a warning message. 

representative.nickname = "Tallyrand";	// Adding a property through the proxy. The property is accessible both the target object and though the proxy.
assert(emperor.nickname === "Tallyrand", "The emperor has a nickname");
assert(representative.nickname === "Tallyrand", "The nickname is accessible through the proxy");

// Proxies has numerous traps. A trap is a function that gets called between various actions. Some of them are:
// apply: will be activated when calling a function.
// construct: when using the new operator.
// get/set: activated when reading/writing to a property.
// enumerate: activated in for-in statements.
// getPrototype/setPrototypeOf: activated for getting and setting the prototype value.

