const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const arr = [];

input.forEach((row) => arr.push(row.split("").map(Number)));

function solution(n, m, arr) {
  let answer = 0;

  const dp = [];
  arr.forEach((row) => dp.push([...row]));

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (arr[i][j] === 0) continue;
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      answer = Math.max(answer, dp[i][j]);
    }
  }

  return answer ** 2;
}

console.log(solution(n, m, arr));
