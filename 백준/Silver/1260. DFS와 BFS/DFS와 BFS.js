const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m, v] = input.shift().split(" ").map(Number);
const graph = Array.from({ length: n + 1 }, () => []);

input.map((v) => {
  const [start, end] = v.split(" ").map(Number);
  graph[start].push(end);
  graph[end].push(start);
});

graph.forEach((v) => {
  v.sort((a, b) => a - b);
});

const dfsVisited = Array.from({ length: n + 1 }, () => false);
const dfsAnswer = [];

function DFS(v) {
  if (dfsVisited[v]) return;
  dfsVisited[v] = true;
  dfsAnswer.push(v);

  for (let nv of graph[v]) {
    if (dfsVisited[nv]) continue;
    DFS(nv);
  }
}

const bfsVisited = Array.from({ length: n + 1 }, () => false);
const bfsAnswer = [];

function BFS(v) {
  const queue = [v];
  bfsVisited[v] = true; // 시작점을 미리 방문 처리

  while (queue.length > 0) {
    const x = queue.shift();
    bfsAnswer.push(x);

    for (let nv of graph[x]) {
      if (bfsVisited[nv]) continue;
      bfsVisited[nv] = true; // 시작점을 미리 방문 처리
      queue.push(nv);
    }
  }
}

function solution(n, m, v) {
  DFS(v);
  BFS(v);

  return [dfsAnswer.join(" "), bfsAnswer.join(" ")];
}

console.log(solution(n, m, v).join("\n"));
