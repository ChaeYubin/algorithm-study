const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const schedule = [];

input.forEach((v) => {
  schedule.push([...v.split(" ").map(Number), false]);
});

const answer = [];
function dfs(day) {
  if (day > n) {
    const payment = schedule
      .filter((v) => v[2] === true)
      .reduce((acc, cur) => acc + cur[1], 0);
    answer.push(payment);
  } else {
    // day일 상담을 하는 경우
    schedule[day - 1][2] = true;
    if (schedule[day - 1][0] > n - day + 1) schedule[day - 1][2] = false;
    dfs(day + schedule[day - 1][0]);

    // day일 상담을 하지 않는 경우
    schedule[day - 1][2] = false;
    dfs(day + 1);
  }
}
function solution() {
  dfs(1);
  console.log(Math.max(...answer));
}

solution();
