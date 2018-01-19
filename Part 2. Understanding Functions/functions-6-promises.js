const assert = require('assert');

/* Core Concepts */
// A promise is a placeholder for a value that we don't have immediatly, but we will have later.

// (6.10) A simple Promise
const myProfilePromise = new Promise((resolve, reject) => {
	resolve("My Data");	// Succesfully solved
	// reject("An error for solving my promise");	// Rejected by calling an error
});

myProfilePromise.then(result => {
	assert(result === "My Data", "We promised to return my data");
}, err => {
	fail("There shouldn't be an error");
});

// (6.11) Promise order of execution
console.log("At Code Start");

let myDelayedPromise = new Promise((resolve, reject) => {
	console.log("Executor myDelayedPromise");
	setTimeout(() => {
		console.log("Resolving myDelayedPromise");
		resolve({name: "Hector", age: 25});
	}, 1500);
});

assert(myDelayedPromise !== null, "After creating myDelayedPromise");

myDelayedPromise.then(result => {
	assert(result.name === "Hector" && result.age === 25, "myDelayedPromise solved succesfully");
});

let myImmediatePromise = new Promise((resolve, reject) => {
	console.log("Executor myImmediatePromise. Immedate resolve.");
	resolve({name: "Andrew", age: 29});
});

myImmediatePromise.then(result => {
	assert(result.name === "Andrew" && result.age === 29, "myImmediatePromise solved succesfully");
});

console.log("At Code End");