const assert = require('assert');

// Allows to easy extract data from objects and arrays by using patterns.

// A.3 Destucturing objects
const me = {name: "Hector", sport: "Football", position: "left-midfielder"};

// Old way, explicitly assign each object property to a variable.
const nameOld = me.name;
const sportOld = me.sport;
const positionOld = me.position;

// Object destructuring, we can assign each property to a variable of the same name, all at once.
const {name, sport, position} = me; 

assert(nameOld === name && sportOld === sport && positionOld === position);

// Explictly name the variables to which the values are assigned.
const {name: myName, sport: mySport, position: myPosition} = me;

assert(myName === name && mySport === sport && myPosition === position);

// A.4 Destrucruting arrays

const drinks = ["Whisky", "Beer", "Wine"];

// Array items are in order assigned to specified variables
const [firstDrink, secondDrink, thirdDrink] = drinks;
assert(firstDrink === "Whisky", secondDrink === "Beer", thirdDrink === "Wine");

// Skip certain array items, with commas
const [, , thirdAloneDrink] = drinks;
assert(thirdAloneDrink === "Wine");

// Capture trailing items with ... operator
const [first, ...remainingDrinks] = drinks;
assert(first === "Whisky");
assert(remainingDrinks.length === 2);
assert(remainingDrinks[0] === "Beer");
assert(remainingDrinks[1] === "Wine");