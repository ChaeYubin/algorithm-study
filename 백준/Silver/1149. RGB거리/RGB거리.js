const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const arr = [];

input.forEach((v) => {
  arr.push(v.split(" ").map(Number));
});

function solution(arr) {
  let answer = 0;

  const dp = Array.from({ length: n + 1 }, () => Array(3).fill(0));

  // 1번째 집 초기화
  dp[1][0] = arr[0][0];
  dp[1][1] = arr[0][1];
  dp[1][2] = arr[0][2];

  for (let i = 2; i <= n; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + arr[i - 1][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + arr[i - 1][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + arr[i - 1][2];
  }

  answer = Math.min(...dp[n]);
  return answer;
}

console.log(solution(arr));
