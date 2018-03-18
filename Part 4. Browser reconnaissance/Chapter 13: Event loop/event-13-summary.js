/* Summary Chapter 13*/

// Event-loop tasks, action performed by the browser.
// Macrotask: discrete, self-contained such as creating the main document object, handling varios events, url changes.
// Microtask: smaller task that should be executed as soon as possible. Promise callbacks and DOM mutation changes.

// JS is a single-threaded excution model. Tasks processed one at a time, if a task starts it is NEVER interrumped by another task. 
// Event-loop has two queues. Macrotask queue and a Microtask queue. Both queues are handled one at a time.

// Timers provide to asynchronously delay the execution of code by x miliseconds. 
// setTimeout execute a callback after delay elapsed.
// setInterval initiate a timer to execute the callback at the specified delay interval, until canceled.
// Both functions setTimeout and setInterval returns an ID of the timer to cancel it.
// Use timers to break up expensive code into managable chunks.

// DOM is a hierarchical tree of elements. When a event occurs, it is propagated to the DOM.
// Event capturing: the event trickles down from top element (body) to target element.
// Event bubbling: the event bubbles upfrom the target element to the top element.

// Calling event handlers, browser pass the element object. Access the element in which the event occurred with event target property.
// Use 'this' keyword, to refer to the element on whhich the handler is registered.

// Use custom events with CustomEvent constructor, and dispatchEvent method to reduce coupling between different parts of the application.

// Excercises

// 1.	It is important that adding tasks into task queue happens outside the event loop. Because events will be ignored
//		if JavaScript code is currently executed.
// 2. To achieve smooth-render applications, JS try to render 60 times per second. Rendering is performed at the end of the event-loop
// 		Each iteration shouldn't last longer 16ms.
// 3. 
setTimeout(function() {
	console.log("Timeout");
}, 1000);

setInterval(function() {
	console.log("Interval");
}, 500);

// A. [Interval Timeout Interval Interval...]. 
//	setInterval method calls the handler at a fixed delay, until cleared with a clearTimeout.
// 	setTimeout method the callback only once.

// 4. 
let timeoutID = setTimeout(function() {
	console.log("Timeout");
}, 1000);

setInterval(function() {
	console.log("Interval");
}, 500);

clearTimeout(timeoutID);

// A. [Interval Interval Interval Interval...]. setTimeout callback is cleared before it has a chance to fire.

// 5. outer -> inner -> document