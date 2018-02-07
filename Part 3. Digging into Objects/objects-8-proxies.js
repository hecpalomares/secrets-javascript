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

// 8.9 Using proxies makes it easier to add logging to objects

function makeLoggable(target) {
	return new Proxy(target, {
		get: (target, property) => {
			console.log(`Reading ${property}`);
			return target[property];
		},
		set: (target, property, value) => {
			console.log(`Writing value ${value} to ${property}`);
			target[property] = value;
		}
	});
}

let myDog = { name: "Doggo" };	// Create a new dog object
myDog = makeLoggable(myDog);		// Serve the dog as a target and make it loggable

assert(myDog.name === "Doggo");	// Reads from proxy object, logs the get proxy trap
myDog.age = 7;									// Writes from proxy objevt, logs the set proxy trap

// Much cleaner and easier solution to make logging objects with proxies,
// rather than trying to set the individual logic per property getter/setter.

// 8.10 Measuring the performance with proxies

function isPrime(number) {
	if(number < 2) {
		return false;
	}
	for(let i = 2; i < number; i++) {
		if(number % i === 0) {
			return false;
		}
	}
	return true;
}

isPrime = new Proxy(isPrime, {										// Writes the isPrime function to a Proxy function
	apply: (target, thisArg, args) => {							// Provides apply trap, that will get called whenever a proxy is called as a function
		console.time("isPrime");											// Starts timer
		const result = target.apply(thisArg, args);		// Invokes target function
		console.timeEnd("isPrime");										// Stops the timer
		return result;
	}
});

console.log(isPrime(17));

// 8.11 Using proxies to autopopulate properties

function Folder() {
	return new Proxy({}, {
		get:(target, property) => {
			console.log(`Reading ${property}`);		// Logs all readings to our object

			if(!(property in target)) {
				target[property] = new Folder();		// If the accessed property doesn't exist, it is created
			}

			return target[property];
		}
	});
}

const rootFolder = new Folder();

try {
	rootFolder.parentDir.childDir.myFile = "randomTextFile.txt";	// When a property is acceesed, the get trap is activated, which in turn creates the property (line 95)
} catch (e) {
	console.log(e);
}
// Requesting a value of an uninitialized property triggers its creation.

// 8.12 Negative arrays indexes with proxies

function createNegativeArray(array) {
	if(!Array.isArray(array)) {
		throw new TypeError('Expected an array');	// If target object isn't an array, throw an exception
	}

	return new Proxy(array, {										// Returns a new proxy that takes the array, and use it as a target
		get: (target, index) => {									// get trap is activated when an array index is read
			index = +index;													// Turns a property name into a number with the unary plus operator
			return target[index < 0 ? target.length + index : index]; 	// If the read index is a negative number, read from the back of the array. If is a positive number, access to it normally.
		},
		set: (target, index, val) => {						// set trap is activated when an array index is writen to
			index = +index;
			return target[index < 0 ? target.length + index : index] = val;
		}
	});

}

const dogs = ["Ignacio", "Thor", "Yagara", "Sussie"];
const proxiedDogs = createNegativeArray(dogs);

// Normal access to the array, normal access to the proxy
assert(dogs[0] === "Ignacio" && dogs[1] === "Thor", dogs[2] === "Yagara", dogs[3] === "Sussie");
assert(proxiedDogs[0] === "Ignacio" && proxiedDogs[1] === "Thor", proxiedDogs[2] === "Yagara", proxiedDogs[3] === "Sussie");

// Can't use negative indexes at the normal array
assert(typeof dogs[-1] === "undefined" && typeof dogs[-2] === "undefined", typeof dogs[-3] === "undefined");	 

// We can do it through our proxy
assert(proxiedDogs[0] === "Ignacio" && proxiedDogs[-3] === "Thor", proxiedDogs[-2] === "Yagara", proxiedDogs[-1] === "Sussie");

// Modify array items from the back, but only through the proxy array
proxiedDogs[-1] = "Rango";
assert(proxiedDogs[-1] === "Rango");