const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();

function solution(n) {
  let answer = 1;
  let end = 1;

  while (end < n) {
    answer += 1;
    end += (answer - 1) * 6;
  }

  return answer;
}

console.log(solution(n));
