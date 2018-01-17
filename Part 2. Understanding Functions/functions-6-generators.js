const assert = require('assert');

/* Core Concepts */
// generator: function that generates a sequence of values, but not all at once (as a standard function) but as per request basis.

function* DogGenerator() {	// defines generator with * symbol
	yield "Labrador";					// individual values using the yield word
	yield "Pomeranian";
	yield "German Shepard";
}

for(let dog of DogGenerator()) {	// consumes the generated sequence of the new loop
	assert(dog !== undefined, dog);
}

// (6.2) Controlling the generator trough the iterator object 
function* WeaponGenerator() {
	yield "Katana";
	yield "Shuriken";
}

const weaponIterator = WeaponGenerator();	// iterator, control the generator execution

const result1 = weaponIterator.next();		// iterator.next() calls the new value, which is an object
assert(typeof result1 === "object" && result1.value === "Katana" && !result1.done, "Katana is received!");

const result2 = weaponIterator.next();		// iterator.next() calls the next new value, which again is an object
assert(typeof result2 === "object" && result2.value === "Shuriken" && !result2.done, "Shuriken is received!");

const result3 = weaponIterator.next();		// iterator.next() calls the last value, returns undefined and it's done
assert(typeof result3 === "object" && result3.value === undefined && result3.done, "No more results!");

// (6.3) Iterating over generator with a while loop
function* MusicGenerator() {
	yield "Piano";
	yield "Guitar";
}

const musicIterator = MusicGenerator();

let instrument;
let arrayInstruments = [];
while(!(instrument = musicIterator.next()).done) {
	arrayInstruments.push(instrument.value);
}

console.log(arrayInstruments);

// (6.4) Using yield* to delegate to another generator
function* DrinksGenerator() {
	yield "Beer";
	yield* WineGenerator();
	yield "Soda";
}

function* WineGenerator() {
	yield "Merlot";
	yield "Shiraz";
}

let drinksArray = [];
for(let drink of DrinksGenerator()){
	drinksArray.push(drink);
}

console.log(drinksArray);

// Examples

// Generating id's
function *IdGenerator() {
	let id = 0;		// variable to keep track of the Ids
	while(true) {	// loop to generate IDs
		yield ++id;
	}
}

// An iterator through which we'll request new IDs from the generator
const idIterator = IdGenerator();

// Request three new ids
const bill1 = { id: idIterator.next().value };
const bill2 = { id: idIterator.next().value };
const bill3 = { id: idIterator.next().value };

assert(bill1.id === 1, "First ninja has id 1");
assert(bill2.id === 2, "First ninja has id 2");
assert(bill3.id === 3, "First ninja has id 3");

