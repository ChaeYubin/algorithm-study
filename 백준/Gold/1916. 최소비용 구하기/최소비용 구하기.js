const fs = require('fs')
let [N, M, ...I] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
N = +N
let [x, y] = I.pop().split(' ').map(Number)
let G = Array.from({length: N + 1}, _ => [])
for (const i in I) {
  const [a, b, cost] = I[i].split(' ').map(Number)
  G[a].push([b, cost])
}
const O = new Array(N + 1).fill(Infinity)
O[x] = 0
const Q = [[x, 0]]
while (Q.length) {
  const [c, cost] = Q.shift()
  if (cost > O[c]) continue
  for (const [n, nCost] of G[c])
    if (O[c] + nCost < O[n]) {
      O[n] = O[c] + nCost
      Q.push([n, O[n]])
    }
}
console.log(O[y])