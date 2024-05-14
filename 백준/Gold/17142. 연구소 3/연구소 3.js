const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const inactiveVirus = []; // 비활성 바이러스
const activeVirus = []; // 활성 바이러스
let emptyCount = 0; // 빈 공간의 개수
const answer = [];

const lab = input.map((row, rowIndex) => {
  const numbers = row.split(" ").map((v, columnIndex) => {
    if (v === "0") {
      emptyCount += 1;
      return null; // 빈 칸: null
    }
    if (v === "1") {
      return "-"; // 벽: -
    }
    if (v === "2") {
      inactiveVirus.push([rowIndex, columnIndex]);
      return "*"; // 비활성 바이러스: *
    }
  });
  return numbers;
});

function bfs() {
  const tmpLab = JSON.parse(JSON.stringify(lab));
  const queue = JSON.parse(JSON.stringify(activeVirus));
  let tmpEmptyCount = emptyCount;

  // 바이러스를 활성화한다.
  queue.forEach((v) => {
    tmpLab[v[0]][v[1]] = 0;
  });

  const dx = [-1, 0, 1, 0];
  const dy = [0, -1, 0, 1];

  let time = 0;

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i += 1) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= n || tmpLab[nx][ny] === "-")
        continue;

      // 빈 공간으로 바이러스 퍼뜨리기
      if (tmpLab[nx][ny] === "*" || tmpLab[nx][ny] === null) {
        if (tmpLab[nx][ny] === null) {
          tmpEmptyCount -= 1;
        }

        tmpLab[nx][ny] = tmpLab[x][y] + 1;
        time = Math.max(time, tmpLab[nx][ny]);
        queue.push([nx, ny]);
      }

      if (tmpEmptyCount === 0) {
        return time;
      }
    }
  }

  return Infinity;
}

function dfs(start) {
  if (activeVirus.length === m) {
    answer.push(bfs());
  } else {
    for (let i = start; i < inactiveVirus.length; i += 1) {
      activeVirus.push(inactiveVirus[i]);
      dfs(i + 1);
      activeVirus.pop();
    }
  }
}

function solution() {
  // 1. 활성 상태로 변경할 바이러스 M개를 선택한다.(조합) - DFS
  // 2. 바이러스를 퍼뜨리는 시간을 구한다. - BFS

  if (emptyCount === 0) return 0;

  dfs(0);

  return Math.min(...answer) === Infinity ? -1 : Math.min(...answer);
}

console.log(solution());
