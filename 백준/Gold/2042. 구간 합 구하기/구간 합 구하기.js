const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m, k] = input.shift().split(" ").map(Number);

const numbers = input.splice(0, n).map((v) => BigInt(v));
const mk = input.map((v) => v.split(" ").map((v) => BigInt(v)));

function initiateSegmentTree(n, numbers) {
  let k = 0;

  while (2 ** k < n) {
    k += 1;
  }

  const segmentTree = Array.from({ length: 2 ** k * 2 }, () => 0n);

  for (let i = 0; i < n; i += 1) {
    segmentTree[2 ** k + i] = BigInt(numbers[i]);
  }

  for (let i = 2 ** k - 1; i > 0; i -= 1) {
    segmentTree[i] =
      BigInt(segmentTree[i * 2]) + BigInt(segmentTree[i * 2 + 1]);
  }

  return [k, segmentTree];
}

function update(segmentTree, index, to, k) {
  let treeIndex = 2 ** k + Number(index) - 1;

  const change = BigInt(to) - segmentTree[treeIndex];
  segmentTree[treeIndex] = to;

  while (treeIndex > 1) {
    treeIndex = Math.floor(treeIndex / 2);
    segmentTree[treeIndex] += change;
  }
}

function query(segmentTree, start, end, k) {
  let startIndex = 2 ** k + Number(start) - 1;
  let endIndex = 2 ** k + Number(end) - 1;
  let sum = BigInt(0);

  while (startIndex <= endIndex) {
    if (startIndex % 2 === 1) {
      sum += BigInt(segmentTree[startIndex]);
    }

    if (endIndex % 2 === 0) {
      sum += BigInt(segmentTree[endIndex]);
    }

    startIndex = Math.floor((startIndex + 1) / 2);
    endIndex = Math.floor((endIndex - 1) / 2);
  }

  return sum;
}

function solution(n, m, numbers, mk) {
  const answer = [];

  const [k, segmentTree] = initiateSegmentTree(n, numbers);

  mk.forEach(([a, b, c]) => {
    // b를 c로 업데이트한다.
    if (a === 1n) {
      update(segmentTree, b, c, k);
    }

    // b번째 수부터 c번째 수까지의 합을 구한다.
    if (a === 2n) {
      answer.push(query(segmentTree, b, c, k));
    }
  });

  return answer.join("\n");
}

console.log(solution(n, m, numbers, mk));
