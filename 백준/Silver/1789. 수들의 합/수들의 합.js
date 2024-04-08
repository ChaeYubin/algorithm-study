const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();

function solution() {
  let sum = 0;
  let answer = 0;

  let i = 1;
  while (true) {
    sum += i;
    answer = i;

    if (sum > n) {
      answer -= 1;
      break;
    }

    i += 1;
  }

  console.log(answer);
}

solution();
