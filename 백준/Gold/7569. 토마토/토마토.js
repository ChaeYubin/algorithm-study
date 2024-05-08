class Queue {
  constructor() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(item) {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }

  dequeue() {
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  }

  peek() {
    return this.items[this.headIndex];
  }

  size() {
    return this.tailIndex - this.headIndex;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [m, n, h] = input.shift().split(" ").map(Number);

const tomatoes = Array.from({ length: h }, () =>
  Array.from({ length: n }, () => [])
);

const day = Array.from({ length: h }, () =>
  Array.from({ length: n }, () => Array.from({ length: m }, () => 0))
);

const queue = new Queue();

for (let i = 0; i < h; i += 1) {
  tomatoes[i] = input.slice(i * n, i * n + n).map((row, rowIndex) => {
    let temp = row.split(" ").map(Number);
    temp.map((v, colIndex) => {
      if (v === 1) {
        queue.enqueue([i, rowIndex, colIndex]);
      }
    });
    return temp;
  });
}

// 저장될 때부터 모든 토마토가 익어있는 상태이면 0을 출력한다.
if (queue.length === 0) {
  console.log(0);
  return;
}

function bfs() {
  let answer = 0;

  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];
  const dh = [1, -1];

  while (queue.size() > 0) {
    const [ch, cx, cy] = queue.dequeue();

    // 상, 하, 좌, 우에 있는 토마토를 익힌다.
    for (let i = 0; i < 4; i += 1) {
      const [nx, ny] = [cx + dx[i], cy + dy[i]];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

      if (tomatoes[ch][nx][ny] === 0) {
        tomatoes[ch][nx][ny] = 1;
        day[ch][nx][ny] = day[ch][cx][cy] + 1;
        answer = Math.max(answer, day[ch][nx][ny]);
        queue.enqueue([ch, nx, ny]);
      }
    }

    // 앞, 뒤에 있는 토마토를 익힌다.
    for (let i = 0; i < 2; i += 1) {
      const nh = ch + dh[i];

      if (nh < 0 || nh >= h) continue;

      if (tomatoes[nh][cx][cy] === 0) {
        tomatoes[nh][cx][cy] = 1;
        day[nh][cx][cy] = day[ch][cx][cy] + 1;
        answer = Math.max(answer, day[nh][cx][cy]);
        queue.enqueue([nh, cx, cy]);
      }
    }
  }

  // 익지 않은 토마토가 있다면 -1을 출력한다.
  for (let i = 0; i < h; i += 1) {
    for (let j = 0; j < n; j += 1) {
      for (let k = 0; k < m; k += 1) {
        if (tomatoes[i][j][k] === 0) {
          console.log(-1);
          return;
        }
      }
    }
  }

  // 모든 토마토가 익어있는 상태이면, 가장 오래된 토마토가 익는데 며칠이 걸리는지 출력한다.
  console.log(answer);
}

bfs();
