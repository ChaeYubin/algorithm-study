const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const arr = input.shift().split(" ").map(Number);

function solution(n, m, arr) {
  let answer = 0;
  let sum = 0;
  let p1 = 0;
  let p2 = 0;

  while (true) {
    if (sum >= m) {
      sum -= arr[p1];
      p1 += 1;
    } else if (p2 === n) {
      break;
    } else {
      sum += arr[p2];
      p2 += 1;
    }

    if (sum === m) answer += 1;
  }

  return answer;
}

console.log(solution(n, m, arr));
