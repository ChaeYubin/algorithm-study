const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);
let goal = [];

const dp = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => Infinity)
);

const map = input.map((row, rowIndex) => {
  const numbers = row.split(" ").map((v, columnIndex) => {
    if (v === "2") {
      goal = [rowIndex, columnIndex];
      dp[rowIndex][columnIndex] = 0; // 목표 지점의 거리는 0이다.
    }
    if (v === "0") dp[rowIndex][columnIndex] = 0;
    return Number(v);
  });
  return numbers;
});

function solution(n, m, map, goal) {
  const queue = [[...goal]];

  const dx = [-1, 0, 1, 0];
  const dy = [0, -1, 0, 1];

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i += 1) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m || map[nx][ny] === 0) continue;

      if (dp[nx][ny] > dp[x][y] + 1) {
        dp[nx][ny] = dp[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }

  const answer = dp
    .map((row) => row.map((v) => (v === Infinity ? -1 : v)).join(" "))
    .join("\n");
  return answer;
}

console.log(solution(n, m, map, goal));
