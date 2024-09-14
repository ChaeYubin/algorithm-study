const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [k, n] = input.shift().split(" ").map(Number);
const lan = input.map(Number);

function solution(k, n, lan) {
  let low = 1;
  let high = Math.max(...lan);

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let count = 0; // mid로 잘랐을 때 만들어지는 랜선의 개수

    for (let i = 0; i < k; i += 1) {
      count = count + Math.floor(lan[i] / mid);
    }

    if (count < n) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return high;
}

console.log(solution(k, n, lan));
