// 	Closures allow a functions to access all variables inside the scope when a funtions was defined.
// 	Helpful to mimick private variables. Deal with callbacks.

//	JS Engine track function execution through call stack. Everytime a function is called is placed on top of call stack.
//	when it's done it gets popped from the stack.

// 	We can define globally-scoped, function-scoped and blocked scoped. (x = 5, var x = 5, let x = 5 | const = 5);

function Person(name) {
	let game = "Blackjack";				// Accessed through closure

	this.getGame = function() {
		return game;
	}

	this.getName = function() {
		return name;
	}

	this.description = `${name} plays ${game}`;

	this.getDescription = function() {
		return this.description;		// Accessed through closure
	}
}

let me = new Person("Hector");

me.getGame();
me.getName();
me.getDescription();