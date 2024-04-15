const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const arr = input.map(Number);

const dp = Array.from({ length: Math.max(...arr) + 1 }, () => [0, 0]);
dp[0] = [1, 0];
dp[1] = [0, 1];

function plus(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

function fibonacci(n) {
  if (JSON.stringify(dp[n]) !== JSON.stringify([0, 0])) return dp[n];
  else dp[n] = plus(fibonacci(n - 1), fibonacci(n - 2));

  return dp[n];
}

function solution(arr) {
  const answer = [];

  arr.forEach((v) => {
    answer.push(fibonacci(v));
  });

  return answer.map((v) => `${v[0]} ${v[1]}`).join("\n");
}

console.log(solution(arr));
