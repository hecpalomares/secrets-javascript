// Functions are first-class objects

//	Objects recap
//	Creation via literals, assigned to variables, array enties or properties of other objects (line 5, 7, 8)
let myObject = {};	// created via literal
let myArray = [];
myArray.push({});	// pushed to an array
myObject.dataY = {};	// assign an object as a property of another object

// Passed as arguments to functions
function showAnswers(test) {
	test.visibility = true;
}
showAnswers({});

// Returned as values from functions
function getMyProfile () {
	return {};
}

// Posses properties that can be dynmically created and assigned
let myCar = {};
myCar.color = "light-grey";

//	Functions as First-Class Objects
//	Created via literals, assigned to variables, array enties or propoerties of another object (line 27, 28, 29, 30)
function myFunctions() {};
let myVariable = function() {};
myArray.push(function(){});
myObject.dataX = function(){};

// Passed as arguments to functions (callback function)
function calling(myFunction) {
	myFunction();
}

calling(function(){console.log('Hi!')});	// Hi!

// Returned as values from functions
function returnMyFunction() {
	return function(){console.log('Bye?')};
}
console.log(returnMyFunction()());	// Bye?

// Posses properties that can be dynmically created and assigned
let myFunctionX = function(){};
myFunctionX.name = "Champ";