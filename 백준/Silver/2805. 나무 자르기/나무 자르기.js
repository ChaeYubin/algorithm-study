const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const tree = input[0]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function solution(n, m, tree) {
  let start = 0;
  let end = tree[tree.length - 1];
  let answer = Number.MIN_SAFE_INTEGER;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let sum = 0;

    for (let x of tree) {
      if (x > mid) sum += x - mid;
    }

    if (sum >= m) {
      if (mid > answer) answer = mid;
      // 최댓값 계속 구해주기
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return answer;
}

console.log(solution(n, m, tree));
