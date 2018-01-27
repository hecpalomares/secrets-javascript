const fetch = require('node-fetch');

async(function*() {	// Functions as a first-class object. Send a function as argument. Generator function.
	try {
		const person1 = yield(fetch("https://randomuser.me/api/").then(result => result.json()).then(data => data));	// Promise to deal with async code
		const person2 = yield(fetch("https://randomuser.me/api/").then(result => result.json()).then(data => data));
		const person3 = yield(fetch("https://randomuser.me/api/").then(result => result.json()).then(data => data));
	} catch (e) {
		console.log("Error", e);
	}
});

function async(generator) {
	let iterator = generator();

	function handle(iteratorResult) {
		if(iteratorResult.done) {
			return;
		}

		let iteratorValue = iteratorResult.value;

		if(iteratorValue instanceof Promise) {
			iteratorValue.then(res => handle(iterator.next(res)))	// Arrow function for simplicty
									 .catch(err => iterator.throw(err));
		}
	}

	try {
		handle(iterator.next());
	} catch (e) {
		iterator.throw(e);
	}
}

// Summary Generators:
// 1. Functions that generate sequence of values -not all at once, but on request basis-.
// 2. Can suspend and resume their execution. After generating a value it suspends the main thread, and waits for next request.
// 3. Declared using an (*). Use yield to yields a value and suspend the main thread. Use yield* to yields another generator.
// 4. Use .next() method to request new values.

// Summary Promises:
// 1. Promise is placerholder for a future result. It can either succed or fail.
// 2. Simplyifies our dealing with async tasks. Using then method to chain promises.
// 3. Using Promise.all method we can handle paralley multiple async tasks (wait for all to finish).

// Excercises
// 1
function *EvenGenerator() {
	let num = 2;
	while(true) {
		yield num;
		num = num + 2;
	}
}

let evenGen = EvenGenerator();

let a1, a2, a3, a4, a5;

console.log("Value a1 = ", a1 = evenGen.next().value);					// 2
console.log("Value a2 = ", a2 = evenGen.next().value); 					// 4
console.log("Value a3 = ", a3 = EvenGenerator().next().value);	// 2 (This is a new generator)!
console.log("Value a4 = ", a4 = evenGen.next().value);					// 6
console.log("Value a5 = ", a5 = EvenGenerator().next().value);	// 2 (This is a new generator)!

// 2
function* TreeGenerator() {
	yield "Pine";
	yield "Oak";
	yield "Cherry Blossom";
}

let trees = [];

for(let tree of TreeGenerator()) {	// for...of in generators yields every value of the generator
	trees.push(tree);
}

console.log(trees);

// 3
function *Gen(val) {
	val = yield val * 2;
	yield val;
}

let myGenerator = Gen(2);
let b1 = myGenerator.next(3).value;	// 4 	when first called got the value of (line 84)
let b2 = myGenerator.next(4).value;	// 4	directly from (line 85)
let b3 = myGenerator.next(2).value;	// undefined, since we only have two yieilds.

console.log(b1);
console.log(b2);
console.log(b3);

// 4
const promiseX = new Promise((resolve, reject) => {
	reject("Nay");
});

promiseX.then(val => console.log("Success: ", val))
				.catch(e => console.log("Error", e));	// Error nay since is a reject (line 99)

// 5
const promiseY = new Promise((resolve, reject) => {
	resolve("Aye!");	
	setTimeout(() => reject("Nay"), 500);
});

promiseY.then(val => console.log("Success 2: ", val))	// Resolve, since it got solved first than the reject
				.catch(e => console.log("Error 2: ", e));