// [Classes]: Act as syntatic sugar around JavaScript prototypes

class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	eat() {
		return true;
	}
}

class Programmer extends Person {
	constructor(name, age, programmingLanguage) {
		super(name, age);
		this.programmingLanguage = programmingLanguage;
	}

	static compare(programmer1, programmer2) {
		return programmer1.programmingLanguage === programmer2.programmingLanguage;
	}
}

let alice = new Programmer("Alice", 28, "JavaScript");
let bob = new Programmer("Bob", 25, "JavaScript");
let chuck = new Programmer("Chuck", 40, "Cobol");

console.log(Programmer.compare(alice, bob));			// True
console.log(Programmer.compare(alice, chuck));		// False

// [Proxies]: control access to other objects. Custom actions can be executed when an object is interacted with
// for example, when a property is read, set a new valued, or a function is called

class Victim extends Person {
	constructor(name, age, money) {
		super(name, age);
		this.money = money;
	}
}

let dave = new Victim("Dave", 29, 1000);

const fraudDave = new Proxy(dave, {
	get: (target, key) => {
		if(key === "money") {
			return `Hello you own $${(target[key] / 2).toFixed(2)}`;
		}
		else return target[key];
	},
	set: (target, key, value) => {
		target[key] = value;
	}
});

console.log(dave.money);				// 1000
console.log(fraudDave.money);		// Hello, you own $500

// [Maps]: are mappins between a key and a value
let bookshelf = new Map(); // Creates a new Map

const book1 = "Principles";
const book2 = "Catcher in the Rye";
const book3 = "Creativity Inc";

const author1 = "Ray Dalio";
const author2 = "J.D. Salinger";
const author3 = "Ed Catmull";

bookshelf.set(book1, author1);			// add a new mapping, book1 to author1
bookshelf.set(book2, author2);			// add a new mapping, book2 to author2

console.log(bookshelf.get(book1));	// Ray Dalio
console.log(bookshelf.get(book2));	// J.D Salinger
	
console.log(bookshelf.has(book3));	// False, never set() on the bookshelf

console.log(bookshelf.size);				// 2, check the map size

bookshelf.delete(book1);						// delete an association on the bookshelf map

console.log(bookshelf.has(book1))		// False, deleted on line 77

console.log(book1);									// The variable still exists, deleting the association doesen't delete on the code

//  [Sets]: collection of unique items
let countries = new Set(["Mexico", "Germany", "USA", "Mexico"]);		// Creates a new Set

console.log(countries);				// Set { 'Mexico', 'Germany', 'USA' }, Mexico is repeated not added for a second time
console.log(countries.size);	// 3

countries.add("Germany");			// Not added since Germany already exists in the Set
console.log(countries.size);	// 3

countries.add("Italy");				// Added on the Set since it hasn't been there before
console.log(countries.size);	// 4

countries.delete("Mexico");		// Deleted from the Set
console.log(countries);				// Set { 'Germany', 'USA', 'Italy' }

// [for...of]: loops iterate over collections and generators

// [Destructuring]: extracts data from objects and arrays

// Destructuring an object
const me = {name: "Hector", sport: "Football", position: "left-midfielder"};
const {name, sport, position} = me;

console.log(name, sport, position);

// Destructuring an array
const drinks = ["Whisky", "Beer", "Wine"];
const [firstDrink, secondDrink, thirdDrink] = drinks;

console.log(firstDrink, secondDrink, thirdDrink);

// Swaping variables
let x = 10, y = 15;
console.log({x, y});

[x, y] = [y, x];
console.log({x, y});

// [Modules]: larger units of organzing code that allows us to divide programs into clusters

export class People{};					// Export an item
export default class Animal{}; 	// Default export
export {me};										// Export existing variable
export {me as alternativeMe}		// Rename an export

import Countries from "Countries.js";							// Import a defalt export
import {languagues} from "Languagues.js";					// Import named exports
import * as Data from "Data.js"										// Import all named exports
import { team as spanishTeams } from "Teams.js";	// Import with new name