// Template Strings: Make manipulating strings much easier, enabling string interpolation and multiline strings.

//  A.1 Template Strings
const me = {
	name: "Hector",
	hobby: "football",
	number: "13",
	position: "left-midfielder"
}

// Old way
const playerInfo = me.name + " practices " + me.hobby + " wearing the number " + me.number + " at the position " + me.position + ".";

// ES6 Way
const playerTemplate = `${me.name} practices ${me.hobby} wearing the number ${me.number} at the position ${me.position}.`;

console.log(playerTemplate);

// A.2 Multiline template literals

const multilineTemplate = 
`Name: ${me.name}
Number:${me.number}`;

console.log(multilineTemplate);