const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();

function solution(n) {
  let answer = 1;
  let end = 1;

  while (end < n) {
    end += answer * 6;
    answer += 1;
  }

  return answer;
}

console.log(solution(n));
