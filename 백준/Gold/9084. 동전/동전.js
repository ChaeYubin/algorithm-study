const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const t = +input.shift();

const arr = [];

for (let i = 0; i < t; i += 1) {
  const _ = input.shift();
  const coin = input.shift().split(" ").map(Number);
  const m = +input.shift();

  arr.push([coin, m]);
}

function solution(arr) {
  const answer = [];

  for (let i = 0; i < t; i += 1) {
    const [coin, m] = arr[i];

    const dp = Array.from({ length: m + 1 }, () => 0);
    dp[0] = 1;

    // coin을 순회하며 하나씩 선택한다.
    for (let j = 0; j < coin.length; j += 1) {
      // coin값부터 시작해서 그 누적값을 더한다.
      for (let k = coin[j]; k <= m; k += 1) {
        dp[k] += dp[k - coin[j]];
      }
    }

    answer.push(dp[m]);
  }

  return answer.join("\n");
}

console.log(solution(arr));
