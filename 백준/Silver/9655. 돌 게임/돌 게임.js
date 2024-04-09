const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();

function solution() {
  if (n % 2 === 0) return "CY";
  else return "SK";
}

console.log(solution());
