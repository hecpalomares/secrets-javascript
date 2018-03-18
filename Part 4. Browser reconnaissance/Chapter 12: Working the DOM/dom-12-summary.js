/* Summary Chapter 12*/

// Converting HTML strings to DOM elements.
// 1. HTML string is valid HTML code.

// Fast inserting of DOM nodes -> DOM fragments, performed in a single operation, reducing the number of operations.

// DOM elements attributes and properties, are not identical. DOM attributes with getAttribute and setAttribute. Write to DOM properties by using object property notation.

// Custom attributes, attributes we place on HTML elements.

// Style element property holds properties of the style of element markup. To get computed styles, taking in account the stylesheets use ComputedStyle method.

// Dimensions of HTML elements -> offsetWidth and offsetHeight properties.

// Layout thrashing -> consecutive reads and writes to DOM forcing to recalculate the layout information.

// Batch DOM updates! (Read with Reads | Writes with Writes)

/*Excercises*/
// 1. The id attribute and id property are linked, a change in one is change in the other.
// 3. getComputedStyle, is a built-in method that can be used to access get the computed styles of a HTML element.
// 4. Layout thrasing occurs when the code performs a series of consecutives reads and writes to DOM. The browser is forced
//		to recalculare the layout information leading to slower, less responsive, web applications.