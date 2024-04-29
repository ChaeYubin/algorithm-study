const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const numbers = input.shift().split(" ").map(Number);
const section = input.map((v) => v.split(" ").map(Number));

function solution(n, m, numbers, section) {
  const answer = [];

  const dp = Array.from({ length: n + 1 }, () => 0);

  for (let i = 0; i < n; i += 1) {
    dp[i + 1] = dp[i] + numbers[i];
  }

  section.forEach(([i, j]) => {
    answer.push(dp[j] - dp[i - 1]);
  });

  return answer.join("\n");
}

console.log(solution(n, m, numbers, section));
