const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution([n, ...arr]) {
  n = +n;
  const dp = [];

  for (let line of arr) {
    dp.push(line.split(" ").map(Number));
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let prev;
      if (j === 0) prev = dp[i - 1][j];
      else if (j === i) prev = dp[i - 1][j - 1];
      else prev = Math.max(dp[i - 1][j - 1], dp[i - 1][j]);
      dp[i][j] += prev;
    }
  }
  console.log(Math.max(...dp[n - 1]));
}

solution(input);
