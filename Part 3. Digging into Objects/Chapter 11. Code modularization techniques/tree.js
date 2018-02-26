// 11.5 Exporting from a Tree.js module
const tree = "Oak";
export const message = "Hi";

export function sayHiToTree() {
	return `${message} ${tree};`
}