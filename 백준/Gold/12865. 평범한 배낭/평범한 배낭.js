const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = input.shift().split(" ").map(Number);
const arr = [];

input.forEach((v) => {
  arr.push(v.split(" ").map(Number));
});

const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));

function solution(n, k, arr) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= k; j++) {
      if (j >= arr[i - 1][0]) {
        dp[i][j] = Math.max(
          dp[i - 1][j - arr[i - 1][0]] + arr[i - 1][1],
          dp[i - 1][j]
        );
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n][k];
}

console.log(solution(n, k, arr));
