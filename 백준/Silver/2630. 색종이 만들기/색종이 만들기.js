const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const paper = input.map((v) => v.split(" ").map(Number));

let whiteCnt = 0;
let blueCnt = 0;

function divideConquer(x, y, n) {
  let blue = 0;

  for (let i = x; i < x + n; i += 1) {
    for (let j = y; j < y + n; j += 1) {
      if (paper[i][j]) blue += 1;
    }
  }

  if (blue === 0) whiteCnt += 1;
  else if (blue === n * n) blueCnt += 1;
  else {
    divideConquer(x, y, n / 2); // left top
    divideConquer(x, y + n / 2, n / 2); // right top
    divideConquer(x + n / 2, y, n / 2); // left bottom
    divideConquer(x + n / 2, y + n / 2, n / 2); // right bottom
  }
}

function solution() {
  divideConquer(0, 0, n);

  return [whiteCnt, blueCnt].join("\n");
}

console.log(solution());
