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

// 정리
const [n, m] = input.shift().split(" ").map(Number);

const map = [];
let cheeseCnt = 0; // 처음 받은 치즈의 개수

input.forEach((line, i) => {
  map.push(line.split(" ").map(Number));

  line.split(" ").forEach((item) => {
    if (item === "1") cheeseCnt += 1;
  });
});

const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];
let answer = 0;

function distinguishExterior() {
  const visited = Array.from({ length: n }, () => Array(m).fill(false));

  const queue = new Queue();
  queue.enqueue([0, 0]);
  visited[0][0] = true;

  while (queue.size() > 0) {
    const [x, y] = queue.dequeue();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (visited[nx][ny]) continue;

      if (map[nx][ny] >= 1) {
        map[nx][ny] += 1;
      } else {
        queue.enqueue([nx, ny]);
        visited[nx][ny] = true;
      }
    }
  }
}

function melting() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] >= 3) {
        // 3 이상이 되었다면 외부 공기와 2번 이상 접촉한 것이므로, 녹이고 외부 공기로 바꾸어준다.
        map[i][j] = 0;
        cheeseCnt -= 1;
      }

      // 외부 공기와 1번 접촉한 것은 다시 1로 바꾸어준다.
      if (map[i][j] === 2) {
        map[i][j] = 1;
      }
    }
  }
}

function solution() {
  while (true) {
    // 외부 공기 식별
    distinguishExterior(0, 0);

    // 치즈를 녹이고, 녹인 치즈 자리는 외부 공기로 채운다.
    melting();
    answer += 1;

    // 남은 치즈가 있는지 확인
    if (cheeseCnt === 0) return answer;
  }
}

console.log(solution());
