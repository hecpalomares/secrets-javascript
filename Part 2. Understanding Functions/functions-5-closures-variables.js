const assert = require('assert');

// Javascript variables in lexical enviroment: var, let, const

// var: related to the closest function or global lexical enviroment. (Code blocks are ignored).
var globalVar = "Tree";

function reportActivity() {
	var functionActivity = "Cutting";

	for(var i = 1; i < 3; i++) {
		var forMessage = `${functionActivity} a ${globalVar}`;
		assert(forMessage === "Cutting a Tree");
		assert(i, "Current loop counter:" + i);
	}

	assert(i === 3 && forMessage === "Cutting a Tree", "Loop Variables accessed outside the loop");
}

reportActivity();

assert(typeof forMessage === "undefined" && typeof i === "undefined" && typeof functionActivity === "undefined", "Function variables outside the scope");