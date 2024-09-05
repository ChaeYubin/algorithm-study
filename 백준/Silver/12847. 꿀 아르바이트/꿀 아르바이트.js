const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const arr = input.shift().split(" ").map(Number);

function solution(n, m, arr) {
  let answer = 0;
  let sum = 0;

  for (let i = 0; i < m; i += 1) {
    sum += arr[i];
  }

  answer = sum;

  for (let i = m; i < n; i += 1) {
    sum -= arr[i - m];
    sum += arr[i];

    if (sum > answer) {
      answer = sum;
    }
  }

  return answer;
}

console.log(solution(n, m, arr));
