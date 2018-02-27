// 11.9 A default export from Vehicle.js
export default class Vehicle {										// Use export default keywords to specify the default module binding 
	constructor(name) {
		this.name = name
	}
}

export function compareVehicles (v1, v2) {				// Named exports are still usuable
	return v1.name === v2.name;
}