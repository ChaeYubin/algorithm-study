const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const arr = input.shift().split(" ").map(Number);

function solution(n, arr) {
  const ascending = Array.from({ length: n }, () => 0);
  ascending[0] = 1;

  for (let i = 1; i < n; i += 1) {
    let max = 0;
    for (let j = i - 1; j >= 0; j -= 1) {
      if (arr[j] < arr[i] && ascending[j] > max) {
        max = ascending[j];
      }
      ascending[i] = max + 1;
    }
  }

  const descending = Array.from({ length: n }, () => 0);
  descending[n - 1] = 1;

  for (let i = n; i >= 0; i -= 1) {
    let max = 0;
    for (let j = i + 1; j < n; j += 1) {
      if (arr[j] < arr[i] && descending[j] > max) {
        max = descending[j];
      }
      descending[i] = max + 1;
    }
  }

  let answer = 0;

  for (let i = 0; i < n; i += 1) {
    answer = Math.max(answer, ascending[i] + descending[i] - 1);
  }

  return answer;
}

console.log(solution(n, arr));
