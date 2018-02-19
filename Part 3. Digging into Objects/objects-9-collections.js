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

// Maps: maps a key to a specific value (dictonaries or maps)

// Dont use objects as maps
// 9.14 Objects have access to properties that weren't explicitly defined

const dictonary = {
	"es": {
		"Good morning!": "¡Buenos días!"
	},
	"por": {
		"Good morning!": "Bom dia!"
	},
	"ger": {
		"Good morning!": "Guten tag!"
	}
};

assert(dictonary.por["Good morning!"] === "Bom dia!");
assert(typeof dictonary.por["constructor"] !== undefined);

// All objects have prototypes, still have properties of the prototype objects; just like the constructor.
// With objects, all keys ["es", "por", "ger"] are needed to be string values. They will silently coherted to it.

// 9.16 Creating our first map

const ninjaIslandMap = new Map(); // Map constructor to create a map

const ninja1 = { name: "Hanzo" };
const ninja2 = { name: "Shonun" };	// Defines three normal objects
const ninja3 = { name: "Akira" };

ninjaIslandMap.set(ninja1, { homeIsland: "Nakato" });		// Creates a mapping for the first two ninja objects, by using the map set method
ninjaIslandMap.set(ninja2, { homeIsland: "Tottori" });

assert(ninjaIslandMap.get(ninja1).homeIsland === "Nakato");
assert(ninjaIslandMap.get(ninja2).homeIsland === "Tottori");		// Get the mapping for the first two ninja objects, by using the map get method
assert(ninjaIslandMap.get(ninja3) === undefined);

assert(ninjaIslandMap.size === 2);		// Check the map size

assert(ninjaIslandMap.has(ninja1) && ninjaIslandMap.has(ninja2));		// Check wheter the mapping exist for a particual key, by using the map has method
assert(!ninjaIslandMap.has(ninja3));

ninjaIslandMap.delete(ninja1);
assert(!ninjaIslandMap.has(ninja1));	// Delete the mapping, by using the map delete method

ninjaIslandMap.clear();
assert(ninjaIslandMap.size === 0);		// Delete completly the map, by using the map clear method

// 9.17 Key equality in maps

const map = new Map();
const currentLocation = '/products';

const firstLink = {currentLocation};		
const secondLink = {currentLocation};

map.set(firstLink, { description: "firstLink" });						// Adds a mapping for both links
map.set(secondLink, { description: "secondLink" });

assert(map.get(firstLink).description === "firstLink");
assert(map.get(secondLink).description === "secondLink");		// Each link has its own mapping even thought they point to the same page.
assert(map.size === 2);

// 9.18 Iterating over maps

const directory = new Map();

directory.set("Andrew", "+555 1234 5678");
directory.set("Tom", "+555 3453 4562");
directory.set("Jimmy", "+555 1232 1112");

// iterates over each item in a dictonary using the for...of loop. Each item is a two-itwm array: a key and a value
for(let item of directory) {
	assert(item[0] !== null, "Key:" + item[0]);
	assert(item[1] !== null, "Value:" + item[1]);
}

// iterate over keys using the built-in method keys method
for(let key of directory.keys()) {
	assert(key !== null, "Key:" + key);
	assert(directory.get(key) !== null, "Value:" + directory.get(key));	
}

// iterate over values using the built-in values method
for(let value of directory) {
	assert(value !== null, "Value:" + value);
}

// Best way is using the for..of loop (line 249). Each iteration is a two item array, where first item is a key and second item is a value.

// 9.18 Mimicking sets with objects

function FakeSet() {
	this.data = {};			// Object to store items
	this.length = 0;
}

// Check whether the item is already stored
FakeSet.prototype.has = function(item) {
	return typeof this.data[item] !== "undefined";	
}

// Adds an item only if it its already contained in the FakeSet
FakeSet.prototype.add = function(item) {
	if(!this.has(item)) {
		this.data[item] = true;
		this.length++;
	}
}

// Remove an item only if its already contained in the FakeSet
FakeSet.prototype.remove = function(item) {
	if(this.has(item)) {
		delete this.data[item];
		this.length--;
	}
}

const fakeCountrySet = new FakeSet();
fakeCountrySet.add("France");
fakeCountrySet.add("Italy");
fakeCountrySet.add("France");

assert(fakeCountrySet.has("France") && fakeCountrySet.has("Italy") && fakeCountrySet.length === 2);	

fakeCountrySet.remove("France");

assert(!fakeCountrySet.has("France") && fakeCountrySet.has("Italy") && fakeCountrySet.length === 1);

// Simple example of how sets can be mimicked with objects. Object 'data' keeps track of our items. Include methods has, add and remove similar to Set().
// Bad mimick, since objects can't store objects as keys. Only numbers and strings.

// 9.20 Creating a set
let genresMusic = new Set(["Rock", "Classical", "Electronic", "Classical"]); // Set constructor can take an array of items to initialize.

assert(genresMusic.has("Classical"));
assert(genresMusic.size === 3);		// Discards any duplicate value (classical!

genresMusic.add("Pop");

assert(genresMusic.has("Pop"));
assert(genresMusic.size === 4);		// Size is increased

// 9.21 Union of Sets: Creates a new Set that contains all elemnts of Set A and Set B

const colorsRGB = ["Red", "Green", "Blue"];
const colorsPrimary = ["Yellow", "Blue", "Red"];

const colorsUnion = new Set([...colorsRGB, ...colorsPrimary]);	// Merge them into one array by spreading the array with the ... operator


assert(colorsUnion.has("Red") && colorsUnion.has("Green") && colorsUnion.has("Blue") && colorsUnion.has("Yellow"));
assert(colorsUnion.size === 4);	// Removed the Blue and Red entries

// 9.22 Intersections of Sets: Creates a new Set that matches set A and set B

const goodTeams = new Set(["Real Madrid", "Barcelona", "Atletico Madrid", "Sevilla", "Valencia"]);
const averageTeams = new Set(["Sevilla", "Real Sociedad", "Valencia", "Real Betis"]);

// Use spread operator to turn the set into an array so we can use the filter() method to keep the goodTeams contained into the averageTeam set.
const midTeams = new Set(
	[...goodTeams].filter(goodTeam => averageTeams.has(goodTeam))	
);

assert(midTeams.size === 2);
assert(midTeams.has("Sevilla") && midTeams.has("Valencia"));

// 9.23 Difference of Sets. Creates a new Set that contains all elements in set A that are not in Set B

// Use spread operator to turn the set into an array so we can use the filter() method to return only the one exclusive for Set A
const eliteTeams = new Set(
	[...goodTeams].filter(goodTeam => !averageTeams.has(goodTeam))	
);

assert(eliteTeams.size === 3);
assert(eliteTeams.has("Real Madrid") && eliteTeams.has("Barcelona") && eliteTeams.has("Atletico Madrid"));