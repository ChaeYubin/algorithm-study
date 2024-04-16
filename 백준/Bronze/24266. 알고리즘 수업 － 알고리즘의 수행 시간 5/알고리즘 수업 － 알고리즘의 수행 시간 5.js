const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const a = BigInt(parseInt(input, 10));
console.log(`${a * a * a}\n3`);
