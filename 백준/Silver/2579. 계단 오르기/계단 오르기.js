const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const init = [0];
const score = init.concat(...input.map(Number));

function solution(score) {
  const dp = Array.from({ length: n + 1 }, () => Infinity);

  dp[0] = 0;
  dp[1] = score[1];
  dp[2] = score[1] + score[2];

  let count = 0;

  for (let i = 3; i <= n; i++) {
    dp[i] = Math.max(dp[i - 3] + score[i - 1], dp[i - 2]) + score[i];
  }

  return dp[n];
}

console.log(solution(score));
