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

// 10.3 Compiling regular expressions
const regex1 = /test/i;
const regex2 = new RegExp("test", "i");

assert(regex1.toString() === "/test/i");
assert(regex1.test("TesT"));

assert(regex2.test("tESt"));
assert(regex1.toString() === regex2.toString(), "Equal regular expressions");

assert(regex1 !== regex2, "Different objects");

// 10.5 Difference between global and local matches
const html = "<div class='test'><b>Hello</b> <i>World</i></div>";

const results = html.match(/<(\/?)(\w+)([^>]*?)>/);
assert(results[0] === "<div class='test'>");
assert(results[1] === "");
assert(results[2] === "div");
assert(results[3] === " class='test'");


const all = html.match(/<(\/?)(\w+)([^>]*?)>/g);
assert(all[0] === "<div class='test'>");
assert(all[1] === "<b>");
assert(all[2] === "</b>");
assert(all[3] === "<i>");
assert(all[4] === "</i>");
assert(all[5] === "</div>");

// Summary
// 1. Create regular expressions with literals -> /abcd/. Create regular expressions with constructor new RegExp("/abcd/");
// [] > set of characters to match | ^ > beggining of the string | $ > end of the String. 
// ? > term is optional | + > term appears one or more times | * > term appears zero, one or many times
// . > match any character
// use (\) to escape special regex characters ($^.][) etc.
// use () to group multiple terms together. use | (pipe) to provide alternation
// Portions of the string can be easily matched with \1 or \2 (number capture)
// ("myString").match(regexExpression)
// replace function causes a replacement on pattern matches rather than on a fixed string.

