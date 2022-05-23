class SuperMap {
	map;

	constructor(entries = null) {
		if (entries) {
			if (!Array.isArray(entries)) entries = Object.entries(entries);
			this.map = new Map(entries);
		} else {
			this.map = new Map();
		}
	}

	get(key) {
		return this.map.get(key);
	}

	set(key, value) {
		return this.map.set(key, value);
	}


	getKeyByValue(inValue) {
		let result;
		for (const [key, value] of this.map.entries()) {
			if (inValue === value) {
				result = key;
				break;
			}
		}
		return result;
	}

	get length() {
		return this.map ? this.map.size : 0;
	}
}

// ==============================================================

class SuperMap2 extends Map {
	constructor(entries = null) {
		super();
		if (entries) this.init(entries);
	}

	init(entries) {
		if (Array.isArray(entries)) {
			entries.forEach(entry => {
				if (Array.isArray(entry)) {
					this.set(entry[0], entry[1]);
				} else {
					const key = Object.keys(entry)[0];
					this.set(key, entry[key]);
				}
			});
		} else {
			for (const [key, value] of Object.entries(entries)) {
				this.set(key, value);
			}
		}
	}

	getKeyByValue(inValue) {
		let result;
		for (const [key, value] of this.entries()) {
			if (inValue === value) {
				result = key;
				break;
			}
		}
		return result;
	}

	get length() {
		return this.size;
	}

	get zz2() {
console.log('in zz2');
		return this.size;
	}
}

// SuperMap2.prototype.property = SuperMap2.prototype.zz2;

// ===============================================================

// const data = { a: 1 };
const data = [ [1, 'a'], [2, 'b'] ];
const map = new SuperMap2(data);
console.log('END', map.length);
console.log('try', typeof map.get(2));
// console.log('try', map.property);
