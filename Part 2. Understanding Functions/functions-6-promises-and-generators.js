const fetch = require('node-fetch');

function* peopleGenerator() {
	try {
		const person1 = yield(fetch("https://randomuser.me/api/").then(result => result.json()).then(data => data));
		const person2 = yield(fetch("https://randomuser.me/api/").then(result => result.json()).then(data => data));
		const person3 = yield(fetch("https://randomuser.me/api/").then(result => result.json()).then(data => data));
	} catch (e) {
		console.log("Error", e);
	}
};

function helperFunc(generator) {
	let iterator = generator();

	console.log(iterator);

	function handle(iteratorResult) {
		if(iteratorResult.done) {
			return;
		}

		let iteratorValue = iteratorResult.value;

		console.log("x");

		if(iteratorValue instanceof Promise) {
			iteratorValue.then(res => handle(iteratorValue.next(res)))
									 .catch(err => iterator.throw(err));
		}

		try {
			handle(iterator.next());
		} catch (e) {
			iterator.throw(e);
		}
	}
}

helperFunc(peopleGenerator());