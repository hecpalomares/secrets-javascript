const assert = require('assert');

/* Summary Chapter 9*/

/*Arrays*/
// Arrays are special type of object, with length property and Array.prototype. Created via new Array constructor or [] literal
// .push / .pop > To add and remove items at the end of array
// .unshift / .shift > To add and remove at the start of array
// .splice > remove items and add items at arbitrary positions
// .map > create a new array with the results of calling a callback on every element
// .every / .some > determine whether all or some array items satisfy a certain condition (returns a boolean)
// .find / .filter > find array items that satisfy certain conditions (returns an element or an array)
// .sort > sort the array by ascending or descending order depending if (a > b) or (b > a)
// .reduce > aggregates all itmes in an array into a single value

// Maps and dictonaries are objects that contain mappings brtween a key and a value
// Objects are 'lousy' maps. 1. Keys can only be strings, 2. Risk of accessing prototype properties. Better use Map collection
// Maps are collections and can be accessed via for...of loop
// Sets are collections of unique items (remove duplicates)

// Ex 1
const trees = ["Oak", "Pine"];
trees[3] = "Cactus"; 

/* Trees: ["Oak", "Pine", undefined, "Cactus"]; */

// Ex 2
const cars = [];
cars.push("Chevy");
cars.unshift("Mustang");
cars.length = 3;
cars.pop();

/* Cars: ["Mustang", "Chevy"] */

// Ex 3
const countries = [];
countries.push("Italy");
countries.unshift("Mexico");
countries.splice(1, 0, "Germany", "England");
countries.pop();

/* Countries: ["Mexico", "Germany", "England"] */

// Ex 4
const quarterbacks = [{name: "Luck", age: 27}, {name: "Brady", age: 41}, {name: "Mayerfield", age: 20}];

const firstMap = quarterbacks.map(qb => qb.age); // [27, 41, 21]
const secondFilter = quarterbacks.filter(qb => qb.age < 24); // [{name: "Mayerfield", age: 20}];
const thirdReduce = quarterbacks.reduce((aggregate, qb) => aggregate + qb.age, 0); // 88

// Ex 5
const fourthSome = quarterbacks.some(qb => qb.age % 2 === 0);
const fifthSome = quarterbacks.every(qb => qb.age % 2 === 0);

// Ex 6
const bookshelfMap = new Map();
const book1 = { name: "Creativity Inc" };
const book2 = { name: "Principles" };
const book3 = { name: "Meditations" };

const author1 = { author: "Ed Catmull" };
const author2 = { author: "Ray Dalio" };
const author3 = { author: "Marcus Aurelis" };

bookshelfMap.set(book1, author1);
bookshelfMap.set(book2, author2);
bookshelfMap.set(book2, author3);

assert(bookshelfMap.size === 2);
assert(bookshelfMap.has(book1));
assert(!bookshelfMap.has(book3));

// Ex 7
const spainTeams = new Set(["Real Madrid", "Barcelona", "Atletico Madrid", "Valencia"]);
assert(spainTeams.size === 4);

spainTeams.add("Real Betis");
assert(spainTeams.size === 5);

assert(spainTeams.has("Real Betis") && spainTeams.has("Valencia"));