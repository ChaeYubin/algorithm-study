const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const arr = input.map(Number);

function solution(arr) {
  const answer = [];

  arr.forEach((n) => {
    const dp = Array.from({ length: n }, () => 0);
    dp[1] = 1;
    dp[2] = 2;
    dp[3] = 4;

    for (let i = 4; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
    }

    answer.push(dp[n]);
  });

  return answer.join("\n");
}

console.log(solution(arr));
