const [[N, M], ...input] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map(v => v.split(' ').map(Number));

const table = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

input.slice(0, N).forEach((row, x) => {
  row.forEach((cell, y) => {
    table[x + 1][y + 1] = cell;
  });
});

for (let x = 1; x <= N; x++) {
  for (let y = 1; y <= N; y++) {
    table[x][y] += table[x - 1][y] + table[x][y - 1] - table[x - 1][y - 1];
  }
}

const coords = input.slice(N);
const output = [];

coords.forEach(([x1, y1, x2, y2]) => {
  output.push(table[x2][y2] - table[x1 - 1][y2] - table[x2][y1 - 1] + table[x1 - 1][y1 - 1]);
});

console.log(output.join('\n'));