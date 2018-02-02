const assert = require('assert');

function Archer(skill) {
	this.skill = skill;
}

const randomArcher = new Archer(10);

// 8.1 Using getters and setters to guard private properties
function ArcherProtected(skill) {
	let skillLevel; 												// Private variable

	this.getSkillLevel = () => skillLevel;	// Getter method control access to our private variable skillLevel

	this.setSkillLevel = value => {					// Setter method controls the value we can assign to skillLevel
		skillLevel = value;
	};
}

const robinHood = new ArcherProtected();
robinHood.setSkillLevel(100);								// Sets a new value
assert(robinHood.getSkillLevel() === 100);	// Retrieves the value of skillLevel with a getter method

// 8.2 Defining getters and setters in object literals

const warriorCollection = {
	warriors: ["Leon", "Xanxa", "Riu"],
	get firstWarrior() {											// Define a getter method by prefixing get keyword, no arguments
		console.log("Getting First Warrior");
		return this.warriors[0];
	},
	set firstWarrior(value) {
		console.log("Setting First Warrior");		// Define a setter method by prefixing set keyword, receives one argument
		this.warriors[0] = value;
	}
};

assert(warriorCollection.firstWarrior === "Leon");		// Implicitly call the getter by reading property value
warriorCollection.firstWarrior = "Davos";							// Iimplictly call the setter by assiging a value of a property
assert(warriorCollection.firstWarrior === "Davos" && warriorCollection.warriors[0] === "Davos");

// 8.3 Using getters and setters with ES6 Classes

class DogCollection {
	constructor() {
		this.dogs = ["Nacho", "Thor", "Argento"];
	}

	get firstDoggo() {
		console.log("Getting first dog");
		return this.dogs[0];
	}

	set firstDoggo(name) {
		console.log("Setting first dog");
		this.dogs[0] = name;
	}
}

const dogCollection = new DogCollection();

assert(dogCollection.firstDoggo === "Nacho");
dogCollection.firstDoggo = "Koggy";
assert(dogCollection.firstDoggo === "Koggy" && dogCollection.dogs[0] === "Koggy");

// 8.4 Degine getters and setters with Object.defineProperty

function Ninja() {
	let _skillLevel = 0;														// Defines 'private' variable, accessible only through closures

	Object.defineProperty(this, 'skillLevel', {			// Defines skillLevel property trough .defineProperty method
		get: () => {
			console.log("Returning variable via getter method");
			return _skillLevel;
		},
		set: value => {
			console.log("Setting variable via setter method");
			_skillLevel = value;
		}
	});
}

const hanzo = new Ninja();	// new Ninja instance

assert(typeof hanzo._skillLevel === "undefined");	// Trying to access the private variable returns undefined
assert(hanzo.skillLevel === 0);										// Getter implictly called

hanzo.skillLevel = 8;															// Setter implicitly called 
assert(hanzo.skillLevel === 8);										// Getter implictly called