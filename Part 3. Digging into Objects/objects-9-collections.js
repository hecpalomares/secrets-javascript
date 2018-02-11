const assert = require('assert');

// 9.1 Creating arrays

const dogs = ["Nacho", "Thor", "Sussie"];	// Array literal
const cats = new Array("Mika", "Camila");	// Array constructor

assert(dogs.length === 3);
assert(cats.length === 2);

assert(dogs[0] === "Nacho");
assert(cats[cats.length - 1] === "Camila");

assert(dogs[4] === undefined);	// Similar if we try to access an undefined property object
dogs[4] = "Ishubi";

assert(dogs.length === 5);			// Writing outisde the array bounds extends the array
dogs.length = 2;

assert(dogs.length === 2);			// Manually overriding the length property with a lower values, deletes the excess of items

// 9.2 Adding and removing items with methods
// push: adds an item at the end of the array
// unshift: adds an item at the start of the array 
// pop: removes an item at the end of the array
// shift: adds an item at the start of the array

const people = [];
assert(people.length === 0);

people.push("Andrew");
assert(people[0] === "Andrew");
assert(people.length === 1);

people.push("Peyton");							// Add at the last of the array
assert(people[0] === "Andrew");
assert(people[1] === "Peyton");
assert(people.length === 2);

people.unshift("Jacoby");						// Add at the start of the array
assert(people[0] === "Jacoby");
assert(people[1] === "Andrew");
assert(people[2] === "Peyton");
assert(people.length === 3);

const lastQB = people.pop();				// Remove from the end of the array
assert(lastQB === "Peyton");
assert(people[0] === "Jacoby");
assert(people[1] === "Andrew");
assert(people.length === 2);

const firstQB = people.shift();			// Remove from the start of the array
assert(firstQB === "Jacoby");
assert(people.length === 1);

// Performance considerations. Since push and pop inserts at the end of the array. There is no need to recalculate,
// the indexes of subsequent array items. For this reason, push and pop and considerably faster than shift and unshift.

// 9.3 Incorrect way to remove an item

const team = ["Fernando", "Roberto", "Alice", "Susan"];

delete team[2];										// Using delete command

assert(team.length === 4);				// Array still has 4 elements, only created a hole in the middle of it.

assert(team[0] === "Fernando");
assert(team[1] === "Roberto");
assert(team[2] === undefined);
assert(team[3] === "Susan");

// 9.4 Correct way to add items

const cities = ["Paris", "New York", "Milan", "Atlanta"];

let removedItems = cities.splice(2, 1);	// Remove 1 element starting at index 1

assert(removedItems.length === 1);			// Removed items has a length of 1
assert(removedItems[0] === "Milan");		// Returns an array with the removed item
assert(cities.length === 3);

cities.splice(2, 1, "Rome", "Peru");		// Starting at index 2, removes one item and adds items "Rome" and "Lima"
assert(cities.length === 4);

// Iterating over Arrays
const movies = ["Dunkirk", "Alien", "Gladiator"];

// 9.4 Using a for loop
for (let i = 0; i < movies.length; i++) {
	assert(movies[i] !== null);
}

// 9.5 Using forEach method
movies.forEach(movie => {
	assert(movie !== null);
});

// 9.7 Using a map method. Constructs a new array and then iterates over the input array.
const moviesWithDirector = [{name: "Dunkirk", director: "Ridley Scott"}, 
														{name: "Avatar", director: "James Cameron"}, 
														{name: "Reservoir Dogs", director: "Quentin Tarantino"}];

const directors = moviesWithDirector.map(movie => movie.director);
console.log(directors);