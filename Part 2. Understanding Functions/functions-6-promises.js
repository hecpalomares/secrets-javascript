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

// (6.12) Explicitly rejection a Promise
const promiseRejected = new Promise((resolve, reject) => {
	reject("Reject Our Promise");
});

promiseRejected.then(result => {
	console.log(`Result: ${result}`);
}, err => {
	console.log(`Error: ${err}`);	// When rejecting a promise the second callback (err) is always invoked
});

// (6.13) Chaining a catch method
promiseRejected.then(result => {
	console.log(`Result: ${result} 2`);
}).catch(err => {
	console.log(`Error: ${err} 2`);	// Catch provides an error callback, useful when working with chains of promises
});

// (6.14) Exceptions implicitly rejects a promise
const promiseRejected2 = new Promise((resolve, reject) => {
	randomVariable++;	// Promise is implicitly rejected if an unhandled exceptions occurs
});

promiseRejected2.then(result => {
	console.log(`Result: ${result}`);
}).catch(error => {
	console.log(`Error: ${error}`);
});

// (6.15) Returning a getJSON Promise
function getJSON(url) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();	// Create XMLHttpRequest object

		request.open("GET", url);	// Initialize the request with the verb "GET"

		request.onload = function() {	// Register an onload event. Called when the server has responded.
			try {
				if(this.status === 200) {
					resolve(JSON.parse(this.response));	// Parse the JSON String, resolve to a successfull object
				} else {
					reject(this.status + " " + this.statusText);	// If there is a different status or an error trying to parse the JSON. Reject the promise
				}
			} catch (e){
				reject(e.message);
			}
		};

		request.onerror = function() {
			reject(this.status + " " + this.statusText);	// Error while trying to communicate with the server, reject the promise (bad url for example)
		};

		request.send();	// Send the request

	});
}

getJSON("https://api.github.com/users/hecpalomares").then(data => {	// Register the resolve and reject callback
	console.log(data);	// Running on Chrome we get the data for that user
}).catch(e => console.log("Error: " + e));	// Running on node.js gets XMLHttpRequest error not defined

