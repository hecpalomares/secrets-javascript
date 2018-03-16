// 	Closures allow a functions to access all variables inside the scope when a funtions was defined.
// 	Helpful to mimick private variables. Deal with callbacks.

//	JS Engine track function execution through call stack. Everytime a function is called is placed on top of call stack.
//	when it's done it gets popped from the stack.

function Person(name) {
	let game = "Blackjack";				// Accessed through closure

	this.getGame = function() {
		return game;
	}

	this.getName = function() {
		return name;								// Accessed the function parameter 'name'
	}

	this.description = `${name} plays ${game}`;

	this.getDescription = function() {
		return this.description;		// this is not accessed through a closure since it is a object property (and not a variable)
	}
}

let me = new Person("Hector");

me.getGame();
me.getName();
me.getDescription();

// 6. We can define globally-scoped, function-scoped and blocked scoped. (x = 5, var x = 5, let x = 5 | const = 5);
// var -> function-scoped or globally-scoped variables
// const / let -> block-scoped, function-scoped and global-scoped

// 7. function declarations are hoisted, created before any code is executed. They can be declared after their invokation.
// Arrow functions are created when it is reached, so it can invoked before throwing an exception.