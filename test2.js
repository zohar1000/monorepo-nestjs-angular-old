const obj = { 1: 'a', 2: 'b' };

const keys = Object.keys(obj);
const entries = Object.entries(obj);

console.log(typeof keys[0]);
console.log(obj[0]);
console.log(Array.from(obj));
