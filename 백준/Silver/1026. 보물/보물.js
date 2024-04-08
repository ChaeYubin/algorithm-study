const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const a = input.shift().split(" ").map(Number);
const b = input.shift().split(" ").map(Number);

function solution() {
  a.sort((a, b) => a - b);
  b.sort((a, b) => b - a);

  let sum = 0;

  for (let i = 0; i < n; i++) {
    sum += a[i] * b[i];
  }

  console.log(sum);
}

solution();
