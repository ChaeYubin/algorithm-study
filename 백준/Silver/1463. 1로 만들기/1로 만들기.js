const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();

function solution(n) {
  const dp = Array.from({ length: n + 1 }, () => 0);
  dp[2] = 1;
  dp[3] = 1;

  for (let i = 4; i <= n; i += 1) {
    let tmp1 = Infinity;
    let tmp2 = Infinity;
    let tmp3 = Infinity;

    if (i % 3 === 0) tmp1 = dp[i / 3] + 1;
    if (i % 2 === 0) tmp2 = dp[i / 2] + 1;
    if (i - 1 > 0) tmp3 = dp[i - 1] + 1;

    dp[i] = Math.min(tmp1, tmp2, tmp3);
  }

  return dp[n];
}

console.log(solution(n));
