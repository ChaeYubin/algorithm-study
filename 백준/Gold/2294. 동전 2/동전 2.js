const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = input.shift().split(" ").map(Number);

const coin = [];

input.forEach((v) => {
  coin.push(+v);
});

function solution(coin, k) {
  let answer;

  // 동전 가치의 중복을 제거하고 오름차순으로 정렬한다.
  const coinSet = [...new Set(coin)].sort((a, b) => a - b);

  const dp = Array.from({ length: k + 1 }, () => Infinity);
  // 기저값은 0을 만들기 위해 사용한 동전의 최소 개수이므로 0개이다.
  dp[0] = 0;

  // coin을 순회하며 하나씩 선택한다.
  for (let i = 0; i < coinSet.length; i += 1) {
    for (let j = coinSet[i]; j <= k; j += 1) {
      dp[j] = Math.min(dp[j], dp[j - coinSet[i]] + 1);
    }
  }

  return dp[k] === Infinity ? -1 : dp[k];
}

console.log(solution(coin, k));
