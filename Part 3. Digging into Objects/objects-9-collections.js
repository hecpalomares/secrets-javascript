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

// [Iterating over Arrays]
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

const directors = moviesWithDirector.map(movie => movie.director);	// [ 'Ridley Scott', 'James Cameron', 'Quentin Tarantino' ]

// [Testing Array Items]

// 9.9 Testing array with every and some methods
const drinks = [{name: "Tequila", country: "Mexico", cost: 45}, 
								{name: "Wine", country: "France", cost: 90},  
								{name: "Whisky", country: "Scotland", cost: 15}, 
								{name: "Beer", cost: 9},
								{name: "Mezcal", country: "Mexico", cost: 28}];

const allDrinksNamed = drinks.every(drink => "name" in drink);						// Callback function that is tested per each array item
const allDrinksHasCountry = drinks.every(drink => "country" in drink);		// If one the cb function tested return false, stops the subsequent items (retuens false)

assert(allDrinksNamed); 
assert(!allDrinksHasCountry, "Not all drinks has the country property");	// If one cb function tested returns true, stops the subsequen items (returns true)

const someDrinksHasCountry = drinks.some(drink => "country" in drink);
assert(someDrinksHasCountry);

// 9.9 Finding array items

const drinkFromFrance = drinks.find(drink => {				// Find the first array of the item that satisfies a certain condition.
	return drink.country === "France";
});

assert(drinkFromFrance.country === "France" && drinkFromFrance.name === "Wine");

const drinkFromBrazil = drinks.find(drink => {			// Returns undefined if there is no match
	return drink.country === "Brazil";
});

assert(drinkFromBrazil === undefined);

const drinksFromMexico = drinks.filter(drink => {		// Filter method to find multiple items that satisfy certain condition
	return drink.country === "Mexico";								// creates a new array with the items that satisfy the criteria.
});

assert(drinksFromMexico.length === 2);

const drinkFromFranceIndex = drinks.findIndex(drink => {		// Similar to .find method, however returns the index of the first item that satigies the conidtion
	return drink.country === "France";
});

assert(drinkFromFranceIndex === 1);

// 9.11 Sorting Array

// Sorting A-Z (Ascending)
const drinksSortedByName = drinks.sort((drink1, drink2) => {
	return drink1.name > drink2.name;
});

// Sorting Z-A (Descending)
const drinkSortedByCost = drinks.sort((drink1, drink2) => {
	return drink2.cost > drink1.cost;
});

// 9.12 Agregating items with a reduce
const drinksCost = [{name: "Tequila", amount: 3, cost: 45.50}, 
										{name: "Wine", amount: 2, cost: 90.15},  
										{name: "Whisky", amount: 0, cost: 15.50}, 
										{name: "Beer", amount: 10, cost: 9.85},
										{name: "Mezcal", amount: 2, cost: 28.25}];


const total = drinksCost.reduce((total, drink) => {	// Using reduce to accumulate a single value from an array
	let totalCostPerDrink = (drink.cost*drink.amount);
	return total + totalCostPerDrink; 
}, 0);

console.log(`Total money spent was: $${total.toFixed(2)}`);