const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const map = [];
for (let i = 0; i < n; i += 1) {
  map[i] = input[i].split("").map(Number);
}

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
let houseCount = 0; // 각 단지별 집의 개수
const answer = [];

function DFS(x, y) {
  for (let i = 0; i < 4; i += 1) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= n || ny < 0 || ny >= n || map[nx][ny] === 0) continue;

    houseCount += 1;
    map[nx][ny] = 0;
    DFS(nx, ny);
  }
}

function solution() {
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (map[i][j] === 0) continue;

      // 새로운 단지 발견
      houseCount = 1;
      map[i][j] = 0;
      DFS(i, j);
      answer.push(houseCount);
    }
  }

  answer.sort((a, b) => a - b);
  answer.unshift(answer.length);

  return answer.join("\n");
}

console.log(solution());
