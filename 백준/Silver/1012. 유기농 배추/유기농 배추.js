const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const t = +input.shift();
let m, n, k, map;
const answer = [];

for (let i = 0; i < t; i += 1) {
  [m, n, k] = input.shift().split(" ").map(Number);
  map = Array.from({ length: m }, () => Array(n).fill(0));

  for (let j = 0; j < k; j += 1) {
    const [x, y] = input.shift().split(" ").map(Number);
    map[x][y] = 1;
  }

  let sectionCnt = 0;

  for (let x = 0; x < m; x += 1) {
    for (let y = 0; y < n; y += 1) {
      if (map[x][y] === 1) {
        sectionCnt += 1;
        map[x][y] = 0;
        dfs(x, y);
      }
    }
  }

  answer.push(sectionCnt);
}

function dfs(x, y) {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  for (let i = 0; i < 4; i += 1) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= m || ny < 0 || ny >= n || map[nx][ny] === 0) continue;

    map[nx][ny] = 0;
    dfs(nx, ny);
  }
}

console.log(answer.join("\n"));
