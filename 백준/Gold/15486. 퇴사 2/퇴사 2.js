const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const arr = [];

input.forEach((v) => {
  arr.push(v.split(" ").map(Number));
});

function solution(arr) {
  const dp = Array.from({ length: n + 1 }, () => 0);
  let max = 0;

  for (let i = 0; i < n; i += 1) {
    max = Math.max(max, dp[i]);

    const [day, pay] = arr[i];
    if (i + day <= n) dp[i + day] = Math.max(dp[i + day], max + pay);
  }

  return Math.max(...dp);
}

console.log(solution(arr));
