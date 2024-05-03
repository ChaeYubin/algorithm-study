const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const x = input.shift().split(" ").map(Number);

function solution(n, xArr) {
  const xSet = Array.from(new Set([...xArr])).sort((a, b) => a - b);
  const obj = {};

  xSet.forEach((item, index) => {
    obj[item] = index;
  });

  const answer = [];

  for (let i = 0; i < n; i += 1) {
    answer.push(obj[xArr[i]]);
  }

  return answer.join(" ");
}

console.log(solution(n, x));
