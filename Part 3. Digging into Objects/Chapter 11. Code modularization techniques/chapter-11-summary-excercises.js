/* Summary Chapter 11 */ 

// Large, monolithic codebases are dificult to understand and mantain; compared to smaller ones that are well organized. 
// Break them into smaller, relatively loosed coupled segments or modules.

// Modules are larger units of organizing code, divide programs into clusters that belong together. 
// Modules breed understandability, ease mantiance and code reusability.

// Pre-ES6 Javascript no bulti-in modules. Combine immediate invoked functions with closures.
// IIFE create a new scope for defining module variables, that aren't visible outside the scope.
// Closures enable keep module variables alive.
// Popular pattern is module pattern. Immediate function -> Returns a new object that represent the public interface.

// Module standards
// AMD: automatically resolve dependancies. Modules are loaded synchronously. 
// CommonJS: simple syntax, synchornous loads modules, many packages via npm.

// ES6 Modules designed into taking account AMD and CommonJS advantages. Simpler syntax of CommonJS and async load of AMD.
// File based, one module per file.
// Export identifiers to other modules via the 'export' keyword.
// Import identiefiers from other moduels via the 'import' keyword.
// single 'default' export, represent whole moudle through a single export.
// Both 'export' and 'import' can be renamed via the 'as' keyword.

// 1. Mechanism enables private module variables in the module pattern? -> Closures

