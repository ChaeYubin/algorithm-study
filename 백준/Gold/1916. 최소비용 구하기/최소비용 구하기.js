const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift(); // 도시 개수
const m = +input.shift(); // 버스 개수
const [start, end] = input.pop().split(" ").map(Number);

const bus = Array.from({ length: n + 1 }, () => []);

for (const i in input) {
  const [start, end, cost] = input[i].split(" ").map(Number);
  bus[start].push([end, cost]);
}

function solution(n, m, start, end, bus) {
  const dis = Array.from({ length: n + 1 }, () => Infinity);
  const queue = [[start, 0]];
  dis[start] = 0;

  while (queue.length) {
    const [cur, cost] = queue.shift();

    // 이미 이전에 더 작은 값이 구해졌다면 건너뛴다.
    if (cost > dis[cur]) continue;

    for (const [next, nextCost] of bus[cur]) {
      if (dis[cur] + nextCost < dis[next]) {
        dis[next] = dis[cur] + nextCost;
        queue.push([next, dis[next]]);
      }
    }
  }

  return dis[end];
}

console.log(solution(n, m, start, end, bus));
