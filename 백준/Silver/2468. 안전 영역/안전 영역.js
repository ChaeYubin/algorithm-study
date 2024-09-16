const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const map = [];

let max = 0;
let min = 101;

for (let i = 0; i < n; i += 1) {
  map[i] = input[i].split(" ").map(Number);
  min = Math.min(min, Math.min(...map[i]));
  max = Math.max(max, Math.max(...map[i]));
}

let visited = Array.from({ length: n }, () =>
  Array.from({ length: n }, () => false)
);

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

function dfs(rain, x, y) {
  for (let i = 0; i < 4; i += 1) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (
      nx < 0 ||
      nx >= n ||
      ny < 0 ||
      ny >= n ||
      map[nx][ny] <= rain ||
      visited[nx][ny]
    )
      continue;

    visited[nx][ny] = true;
    dfs(rain, nx, ny);
  }
}

function solution() {
  let answer = 0;

  for (let rain = 0; rain < max; rain += 1) {
    let sectionCnt = 0;

    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < n; j += 1) {
        if (map[i][j] > rain && !visited[i][j]) {
          sectionCnt += 1;
          dfs(rain, i, j);
        }
      }
    }

    answer = Math.max(answer, sectionCnt);

    visited = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => false)
    );
  }

  return answer;
}

console.log(solution());
