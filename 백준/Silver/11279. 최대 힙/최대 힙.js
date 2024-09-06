class MaxHeap {
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

  bubbleUp() {
    let index = this.heap.length - 1; // 새로 추가된 노드의 인덱스
    let parentIdx = Math.floor((index - 1) / 2); // 부모 노드의 인덱스

    while (
      index > 0 && // 루트 노드가 아니고
      this.heap[index] > this.heap[parentIdx] // 자식이 부모보다 큰 경우
    ) {
      this.swap(index, parentIdx); // 부모와 자식 교환
      index = parentIdx; // 인덱스를 부모 노드로 갱신
      parentIdx = Math.floor((index - 1) / 2); // 새로운 부모 노드 인덱스 계산
    }
  }

  poll() {
    if (this.heap.length === 0) {
      return 0; // 힙이 비어 있을 경우 0 반환
    }

    if (this.heap.length === 1) {
      return this.heap.pop(); // 힙에 하나의 요소만 있으면 바로 반환
    }

    const value = this.heap[0]; // 루트 노드 값 저장
    this.heap[0] = this.heap.pop(); // 마지막 노드를 루트로 이동
    this.bubbleDown();
    return value;
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let leftIdx = index * 2 + 1; // 왼쪽 자식 인덱스
      let rightIdx = index * 2 + 2; // 오른쪽 자식 인덱스
      let largestIdx = index;

      if (leftIdx < length && this.heap[leftIdx] > this.heap[largestIdx]) {
        largestIdx = leftIdx; // 왼쪽 자식이 더 크면 인덱스 갱신
      }

      if (rightIdx < length && this.heap[rightIdx] > this.heap[largestIdx]) {
        largestIdx = rightIdx; // 오른쪽 자식이 더 크면 인덱스 갱신
      }

      if (largestIdx === index) break; // 자식보다 부모가 더 크면 정지

      this.swap(index, largestIdx); // 교환
      index = largestIdx; // 인덱스 갱신
    }
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const arr = input.map(Number);

function solution(n, arr) {
  const heap = new MaxHeap();
  const answer = [];

  for (let i = 0; i < n; i += 1) {
    if (arr[i] > 0) {
      heap.add(arr[i]);
    } else {
      answer.push(heap.poll());
    }
  }

  return answer;
}

console.log(solution(n, arr).join("\n"));
