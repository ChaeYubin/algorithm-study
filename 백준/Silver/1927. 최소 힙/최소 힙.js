class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  add(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  poll() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return value;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    let parentIdx = Math.floor((index - 1) / 2);
    while (this.heap[parentIdx] && this.heap[index] < this.heap[parentIdx]) {
      this.swap(index, parentIdx);
      index = parentIdx;
      parentIdx = Math.floor((index - 1) / 2);
    }
  }

  bubbleDown() {
    let index = 0;
    let leftIdx = index * 2 + 1;
    let rightIdx = index * 2 + 2;

    while (
      (this.heap[leftIdx] && this.heap[leftIdx] < this.heap[index]) ||
      (this.heap[rightIdx] && this.heap[rightIdx] < this.heap[index])
    ) {
      let smallerIdx = leftIdx;
      if (this.heap[rightIdx] && this.heap[rightIdx] < this.heap[smallerIdx]) {
        smallerIdx = rightIdx;
      }

      this.swap(index, smallerIdx);
      index = smallerIdx;
      leftIdx = index * 2 + 1;
      rightIdx = index * 2 + 2;
    }
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const x = input.map(Number);

function solution(n, x) {
  const minHeap = new MinHeap();

  const answer = [];

  for (let num of x) {
    if (num === 0) {
      if (minHeap.size() === 0) answer.push(0);
      else answer.push(minHeap.poll());
    } else {
      minHeap.add(num);
    }
  }

  return answer.join("\n");
}

console.log(solution(n, x));
