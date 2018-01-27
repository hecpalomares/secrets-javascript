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