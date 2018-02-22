const assert = require('assert');

// Regular expressions has uses like: 
// Manipulate HTML nodes, locating partial selections within a CSS selector expression,
// Determining whether an element has a specific class name, input validation, etc.

// 10.1 Check for a zip code
function isThisAZipCode(number) {
	const pattern = /^\d{5}-\d{4}$/;
	return pattern.test(number);
}

assert(isThisAZipCode("62634-4832"));

// 10.2.1 Literal Syntax vs Constructor approach (Summary)
const patternLiteral = /test/;										// Passed between forward slashes
const patternConstructor = new RegExp("test");		// Passed as a string

// Literal Syntax is used when regex is known at development time. Constructor approach is used at runetime by building dynamically the string.

// Flags
// i - makes regex case-insensitive
// g - matches all instances of the pattern, instead of the first occurance
// m - matches across multiple lines (text area)
// y - sticky matching, attmpting to match from last area
// u - enables the use of Unicode

// Passed at the end of literla /testing/igy or as second parameter of the constructor new Regexp("testing", "igu");

// 10.3 Compling regular expressions
const regex1 = /test/i;
const regex2 = new RegExp("test", "i");

assert(regex1.toString() === "/test/i");
assert(regex1.test("TesT"));

assert(regex2.test("tESt"));
assert(regex1.toString() === regex2.toString(), "Equal regular expressions");

assert(regex1 !== regex2, "Different objects");