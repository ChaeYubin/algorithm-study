const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const tree = Array.from({ length: n + 1 }, () => []);
const answer = Array.from({ length: n + 1 }, () => 0);

input.forEach((edge) => {
  const [v1, v2] = edge.split(" ").map(Number);
  tree[v1].push(v2);
  tree[v2].push(v1);
});

function solution() {
  const queue = [1];

  while (queue.length > 0) {
    const v = queue.shift();

    tree[v].forEach((child) => {
      if (answer[child] === 0) {
        answer[child] = v;
        queue.push(child);
      }
    });
  }

  return answer.slice(2).join("\n");
}

console.log(solution());
