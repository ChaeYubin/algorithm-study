const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const virus = []; // 바이러스
const empty = []; // 빈 공간

const lab = input.map((row, rowIndex) => {
  const numbers = row.split(" ").map((v, columnIndex) => {
    if (v === "0") {
      empty.push([rowIndex, columnIndex]);
    }
    if (v === "2") {
      virus.push([rowIndex, columnIndex]);
    }
    return Number(v);
  });
  return numbers;
});

function bfs(tmpLab, virus) {
  const lab = JSON.parse(JSON.stringify(tmpLab));
  const queue = JSON.parse(JSON.stringify(virus));
  let virusCount = 0;

  const dx = [-1, 0, 1, 0];
  const dy = [0, -1, 0, 1];

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i += 1) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

      if (lab[nx][ny] === 0) {
        lab[nx][ny] = 2;
        virusCount += 1;
        queue.push([nx, ny]);
      }
    }
  }

  return virusCount;
}

function solution(lab, virus, empty) {
  const tmpLab = JSON.parse(JSON.stringify(lab));
  const safeArea = [];

  for (let i = 0; i < empty.length; i += 1) {
    for (let j = i + 1; j < empty.length; j += 1) {
      for (let k = j + 1; k < empty.length; k += 1) {
        tmpLab[empty[i][0]][empty[i][1]] = 1;
        tmpLab[empty[j][0]][empty[j][1]] = 1;
        tmpLab[empty[k][0]][empty[k][1]] = 1;

        safeArea.push(empty.length - 3 - bfs(tmpLab, virus));

        tmpLab[empty[i][0]][empty[i][1]] = 0;
        tmpLab[empty[j][0]][empty[j][1]] = 0;
        tmpLab[empty[k][0]][empty[k][1]] = 0;
      }
    }
  }

  return Math.max(...safeArea);
}

console.log(solution(lab, virus, empty));
