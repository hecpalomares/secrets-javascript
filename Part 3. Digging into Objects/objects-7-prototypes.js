const assert = require('assert');

// 7.1 Objects Review
let objectX = {
	prop1: 1, 												// Asign a simple value
	prop2: function() { return 2 }, 	// Assign a simple function
	prop3: {}													// Assign a simple object
};

objectX.prop1 = [];			// Assigns an empty array to the prop1
delete objectX.prop2;		// Removes completly a property on a object

objectX.prop4 = "Hi!";	// Create a new property

console.log(objectX);		// {prop1: [], prop3: {}, prop4: "Hi!"}

// In Javascript inhertiance is simulated with prototyping

// 7.2 Setting up inheritance with prototypes
let myCat = { eat: true };
let myDog = { jump: true };
let myFish = { swim: true };

assert(("eat" in myCat), "Cat can eat");				// Only access to its own property
assert(!("jump" in myCat), "Cat cant jump");
assert(!("swim" in myCat), "Cat cant swim");

Object.setPrototypeOf(myCat, myDog);						// Method Object.setPrototypeOf set one object as the prototype of antoher object
assert(("jump" in myCat), "Cat can jump");
assert(!("swim" in myCat), "Cat cant swim");

Object.setPrototypeOf(myCat, myFish);						// Access to myFish properties
assert(("swim" in myCat), "Cat can swim");

// Object.setPrototypeOf(a, b) takes two arguments and sets the second object as the prototype of the first. A chained to B.

// 7.2 Creating a new instance with a prototype method
function Dog() {}									// Function that does nothing and returns nothing

Dog.prototype.bark = function() {	// Modify function prototype method
	return true;
};

const thor = Dog();								// Calls the function as a function, nothing happened.
assert(thor === undefined, "No instance of Dog was created");

const nacho = new Dog();					// Calls the function as a constructor, a new instance is created associated to a variable. 
assert(nacho && nacho.bark && nacho.bark(), "Instance of Dog exists and a method is callable");

// All objects created with Dog constructor have access to .bark method. Code reuse in action!. The .bark method
// is a property of Dog prototype, NOT a property of a dog instance.

// 7.3 Precedence of initalization activites
function Player(){
	this.kicked = false;
	this.kick = function() {
		return !this.kicked;
	};
}
Player.prototype.kick = function() {
	return this.kicked;
};

let player = new Player();
assert(player.kick(), "Calling the instance method, not the prototype method.");

// Avoid calling instance methods and prototype methods the same, since instance > prototype, as shown by (lines 65).
// If a property can be found on the instance itself, the prototype is not consulted.

// 7.5 Examing the type of an instance and its constructor
function Drink() {}
const whisky = new Drink();

assert(typeof whisky === "object", "The type of the instance is object.");
assert(whisky instanceof Drink, "instanceof describes the constructor");
assert(whisky.constructor === Drink, "The whisky object was created by the Drink function");

// 7.6 Instantiang a new object using a reference to a constructor
function Sport(){}

const football = new Sport();
const basketball = new football.constructor();				// Constructs a second sport from the first

assert(basketball instanceof Sport, "It is a sport");	// Proves the new object
assert(football !== basketball, "Different sports");	// Two diferent instances, not the same object

// Achieving inheritance, form of reuse in which new objects have access to properties of existing objects.

// 7.8 Achieving inhertiance via prototypes
function Person(){}
Person.prototype.eat = function(){}

function Programmer(){}
Programmer.prototype = new Person();

const me = new Programmer();
assert(me instanceof Programmer, "I'm an instance of Programmer prototype");
assert(me instanceof Person, "... and the Person prototype");
assert(me instanceof Object, "... and the Object prototype");
assert(typeof me.eat === "function", "... and can eat!");
console.log(me.constructor === Person); // (Why not Progammer?!)

// 7.9 Configuring Object Properties
let plane = {};
plane.model = "Boeing 747";
plane.color = "Blue";

Object.defineProperty(plane, "id", {
	configurable: false,	// Property description can be changed; and delete
	enumerable: false,		// Show up in for...in loops
	value: "XFU-754",			// Value of the property, starts as undefined
	writable: false				// The property value can be reassigned
});

assert("id" in plane, "We can access the id");

for(let prop in plane) {
	console.log(prop);	// model, color (id not enumerable, line 109)
	assert(prop !== undefined, "Enumerating property")
}

plane.id = "RZT-624";
console.log(plane.id);	// XFU-754 (id not writable, line 111)

delete plane.id;
console.log(plane.id);	// XFU-754 (id not deletable, line 108)

// 7.10 Fixing the Constructor Property Problem
function Animal(){}
Animal.prototype.eat = function(){}

function Dog(){}
Dog.prototype = new Animal();

Object.defineProperty(Dog.prototype, "constructor", {
	enumerable: false,
	value: Dog,
	writable: true
});

let ignaxio = new Dog();
assert(ignaxio.constructor === Dog, "dog instances and Dog constructor are matched, unlike the line 101");

for(let prop in ignaxio) {
	console.log(prop);	// Only enumerable property is eat
}

// 7.13 Using a class of ES6
class Car {
	constructor(model) {	// Constructor function that gets returned when called with keyword new
		this.model = model;
		this.engineTurnedOn = false;
	}

	turnOnEngine() {				// Defines addiotional methods accesible by all Car instances
		this.engineTurnedOn = true;
		return this.engineTurnedOn;
	}
}

let myFirstCar = new Car("Chevy Monza");	// Instanties a new car object with the keyword new. Passing needed parameters.

assert(myFirstCar instanceof Car, "myFirstCar is a instanceof Car");
assert(myFirstCar.model === "Chevy Monza", "The model of my car is Chevy Monza");
assert(myFirstCar.turnOnEngine(), "And can be turned on");

// Classes are syntatic sugar, we are still using old prototypes
// function Car(model) {
// 	this.model = model;
// 	this.engineTurnedOn = false;
// }

// Car.prototype.turnOnEngine = function() {
// 	this.turnOnEngine = true;
// 	return this.turnOnEngine;
// }

// 7.14 Static Methods on ES6
class Plane {
	constructor(model, price) {
		this.model = model;
		this.price = price;
	}

	takeFlight() {
		return true;
	}

	static compare(plane1, plane2) {
		return plane1.price - plane2.price;
	}

}

let plane1 = new Plane("Boeing 747", 45);
let plane2 = new Plane("F-15", 30);

assert(!("compare" in plane1) && !("compare" in plane2), "Plane instances do not have access to compare static method");
assert(Plane.compare(plane1, plane2) > 0, "The Plane class can use the compare static method");
assert(!("takeFlight" in Plane), "The Plane class can't use the takeFlight() method");

// 7.15 Inheritance in ES6
class Movie {
	constructor(name, rating) {
		this.name = name;
		this.rating = rating;
	}

	getRating() {
		return this.rating;
	}
}

class HorrorMovie extends Movie {	// Use extends keyword to inherit from another class
	constructor(name, rating, classification) {
		super(name, rating);					// Use the super keyword to call the base class constructor
		this.classification = classification;
	}

	getClassification() {
		return this.classification;
	}
}

let gladiator = new Movie("Gladiator", 4);

assert(gladiator instanceof Movie, "It is a instance of a Movie");
assert(gladiator.getRating() >= 4, "Has a rating");
assert(gladiator.name === "Gladiator", "Has a name");
assert(!(gladiator instanceof HorrorMovie), "It is not a Horror Movie");
assert(!("getClassification" in gladiator), "Cannot get classification");

let roseMaryBaby = new HorrorMovie("Rose Mary Baby", 3, "R+");

assert(roseMaryBaby instanceof HorrorMovie, "It is an HorrorMovie");
assert(roseMaryBaby.getClassification() === "R+", "Can has own methods");
assert(roseMaryBaby.getRating() > 1, "We can call getRating");
assert(roseMaryBaby instanceof Movie, "It extends from Movie");
assert(roseMaryBaby.name === "Rose Mary Baby", "Has a name");

/* Summary */
// Javascript objects are a simple collections of named properties with values, separated by commas. let object = {namedProperty: value, namedProperty2: value2, n: n}

// Javascript use prototypes
// Object have a reference to a prototype, an object to which we deleage the search for a particular property (if the object itself doesn't have the property, forming a prototype chain.
// Define the prototype of an object using Object.setPrototypeOf
// Prototypes are linked to constructor functions. Accessible to all objects instantiated with that function (using 'new').

// To "inherit" (have access to), set the prototype of Child to a 'new' instance of Parent class (line 94)

// JS properties have attributes (configurable, enumerable, writable). Defined via Object.defineProperty.

// JS ES6 add support to classes with 'class' keyword. Sugar syntax, at the end it is still a prototype.
// 'extends' keyword enable elegeant inheritance.

// 7.6 Exercises

// 1. Prototype, the property that would be searched if the target object doesn't have the property.

// 2. value of a1 = "Hi!"
function Person() {}
Person.prototype.talk = function() {
	return "Hi!";
}

const randomperson = new Person();
const a1 = randomperson.talk();

// 3. value of a2 = undefined
Person.jump = "jump";
const randomperson2 = new Person();
const a2 = randomperson2.jump;
console.log(a2);

// 4. First fragment created a new getFullName() function per instance (wasting memory resources). Second fragment actually creates only one function that all instnaces share! (less memory resources)

// 5. naxo.constructor should point to Doggo
function Doggo() {}
function Catto() {}

const naxo = new Doggo();
console.log(naxo.constructor === Doggo);

// 6.  randomCrow.constructor should point to Bird
function Bird() {}
function Crow() {}

Crow.prototype = new Bird();

const randomCrow = new Crow();
assert(randomCrow.constructor === Bird);

// 7. Explain why, randomCrow instanceof Bird === true. instanceof in Javascript checks if the instance is in the current prototype chain, thats why it is true; just like randomCrow instanceof Crow === true and randomCrow instanceof Object === true.
assert(randomCrow instanceof Crow === true);		// First in the prototype chain
assert(randomCrow instanceof Bird === true);		// Second instance in the prototype chain
assert(randomCrow instanceof Object === true);	// Third (and last) instance in the prototype chain

// 8: Tranlate to ES5 Code
function Warrior(weapon){
	this.weapon = weapon;
}

// Instance method: All Warrior objects have this method available
Warrior.prototype.wield = function() {
	return "Wilding " + this.weapon;
}

// Static method: only lives in the class Warrior)
Warrior.duel = function(warrrior1, warrrior2) {
	return warrrior1.wield() + " " + warrrior2.wield();
}