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
const graph = Array.from({ length: n + 1 }, () => []);

if (m > 0) {
  input.forEach((edge) => {
    const [s, e] = edge.split(" ").map(Number);
    graph[s].push(e);
    graph[e].push(s);
  });
}

for (let i = 1; i <= n; i += 1) {
  graph[i].push(i); // 자기 자신은 자기 자신과 연결되어 있다.
}

function bfs(s, graph) {
  const queue = new Queue();
  queue.enqueue(s);

  while (queue.size() > 0) {
    const start = queue.dequeue();

    graph[start].forEach((v) => {
      queue.enqueue(v);
    });

    graph[start] = [];
  }
}

function solution(n, m) {
  if (m === 0) return n;

  let answer = 0;

  for (let i = 0; i <= n; i += 1) {
    if (graph[i].length) {
      answer += 1;
      bfs(i, graph);
    }
  }

  return answer;
}

console.log(solution(n, m, graph));
