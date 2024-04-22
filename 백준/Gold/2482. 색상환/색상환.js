const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = input.map(Number);
const DIVISOR = 1000000003;
const dp = Array.from({ length: n + 5 }, () =>
  Array.from({ length: k + 1 }, () => -1)
);

function dpFunc(n, k) {
  if (n < 2 * k) return 0;
  if (k === 1) return n;

  if (dp[n][k] === -1) {
    return (dp[n][k] = (dpFunc(n - 2, k - 1) + dpFunc(n - 1, k)) % DIVISOR);
  } else {
    return dp[n][k];
  }
}

console.log(dpFunc(n, k));
