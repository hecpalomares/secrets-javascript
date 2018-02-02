const assert = require('assert');

function

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