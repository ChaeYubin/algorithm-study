const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input.shift().split(' ').map(Number);
let arr = Array.from({ length: n }, () => Array.from({ length: m }, () => 0));

input.map((i, idx) => (arr[idx] = i.trim().split('').map(Number)));
let dp = arr.map((x) => [...x]);

for (let i = 1; i < n; i++) {
  for (let j = 1; j < m; j++) {
    if (arr[i][j]) dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
  }
}

let ans = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    ans = dp[i][j] > ans ? dp[i][j] : ans;
  }
}
console.log(ans ** 2);