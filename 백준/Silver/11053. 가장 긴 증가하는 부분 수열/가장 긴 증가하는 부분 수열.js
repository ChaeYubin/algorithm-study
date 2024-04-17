const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();

const arr = input.shift().split(" ").map(Number);

function solution(n, arr) {
  const dp = [1];

  for (let i = 1; i < n; i += 1) {
    let max = 0;
    for (let j = i; j >= 0; j -= 1) {
      if (arr[j] < arr[i] && dp[j] > max) max = dp[j];
    }
    dp[i] = max + 1;
  }

  return Math.max(...dp);
}

console.log(solution(n, arr));
