/*Summary Chapter 14*/

if(!Array.prototype.find) {
	Array.prototype.find = function(predicate) {
		/* Polyfill code */
	}
}

// Quality of code should never be sacrfied for coverage. It is impossible to cover all the browsers.

// Excercises.

// 1. When deciding the browser to support take in consideration:
// a. Expectations of the target audience
// b. Market share of the browser
// c. Amount of effort neccessary to support the browser

// 2. Greedy IDs: Working with form elements, the browser adds properties to the form element descendants so we can access them through it.
// this can overrides some logic of 'action' and 'submit' properties.

// 3. Feature Detection: Determine whether a certain object or object property exists, if so assumes it provides the implied functionality. 
// Instead of testing if a user is using a particular kind of browser and work implementations around it, we test directly for the feautre. (line 3.

// 4. Polyfill: Is a browser fallback. If the browser doesn't support a functionality (using feature detection) 
// we provide the implementation (polyfill). (line 4+).