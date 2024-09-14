const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const lectures = input.shift().split(" ").map(Number);

function solution(n, m, lectures) {
  let low = Math.max(...lectures);
  let high = lectures.reduce((sum, cur) => sum + cur, 0);
  let answer = high;

  while (low <= high) {
    let bluraySize = Math.floor((low + high) / 2);
    let count = 1; // 사용된 블루레이의 개수 (m개를 넘어설 수 없다.)
    let currentSize = 0;

    for (let i = 0; i < n; i += 1) {
      if (currentSize + lectures[i] <= bluraySize) {
        currentSize += lectures[i];
      } else {
        count += 1;
        currentSize = lectures[i];
      }
    }

    if (count > m) {
      low = bluraySize + 1;
    } else {
      high = bluraySize - 1;

      if (bluraySize < answer) {
        answer = bluraySize;
      }
    }
  }

  return answer;
}

console.log(solution(n, m, lectures));
