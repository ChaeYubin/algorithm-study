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

const [n, m] = input.shift().split(" ").map(Number);
let x, y;

const campus = input.map((v, i) => {
  const line = v.split("");

  if (line.indexOf("I") !== -1) {
    [x, y] = [i, line.indexOf("I")];
  }

  return line;
});

function solution(n, m, campus, [x, y]) {
  let answer = 0;
  const c = campus;

  const queue = new Queue();
  queue.enqueue([x, y]);

  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  while (queue.size()) {
    const [x, y] = queue.dequeue();

    for (let i = 0; i < 4; i += 1) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        nx < 0 ||
        nx >= n ||
        ny < 0 ||
        ny >= m ||
        c[nx][ny] === "X" ||
        c[nx][ny] === "I"
      )
        continue;

      if (c[nx][ny] === "P") {
        answer += 1;
      }

      c[nx][ny] = "I";
      queue.enqueue([nx, ny]);
    }
  }

  return answer === 0 ? "TT" : answer;
}

console.log(solution(n, m, campus, [x, y]));
