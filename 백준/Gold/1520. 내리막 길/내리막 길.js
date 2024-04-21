const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [m, n] = input.shift().split(" ").map(Number);
const arr = [];
input.forEach((row) => arr.push(row.split(" ").map(Number)));

const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

const dp = Array.from({ length: m }, () => Array.from({ length: n }, () => -1));
dp[m - 1][n - 1] = 1;

function dfs(x, y) {
  if (dp[x][y] !== -1) return dp[x][y];

  let count = 0;
  for (let i = 0; i < 4; i += 1) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;

    if (arr[x][y] > arr[nx][ny]) count += dfs(nx, ny);
  }

  dp[x][y] = count;
  return count;
}

console.log(dfs(0, 0));
