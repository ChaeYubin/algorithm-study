class MinHeap {
  constructor() {
    this.heap = [];
  }

  empty() {
    if (this.heap.length == 0) {
      return true;
    }
    return false;
  }

  swap(arr, x, y) {
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
    return;
  }


  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[parentIndex].cost <= this.heap[currentIndex].cost) break;
      this.swap(this.heap, parentIndex, currentIndex)
      currentIndex = parentIndex;
    }
  }


  extractMin() {
    if (this.heap.length == 1) {
      return this.heap.pop();
    }
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return min
  }

  sinkDown(index) {
    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;
    const length = this.heap.length;
    let smallestIndex = index;

    if (leftIndex < length && this.heap[leftIndex].cost < this.heap[smallestIndex].cost) {
      smallestIndex = leftIndex;
    }
    if (rightIndex < length && this.heap[rightIndex].cost < this.heap[smallestIndex].cost) {
      smallestIndex = rightIndex;
    }
    if (smallestIndex !== index) {
      this.swap(this.heap, index, smallestIndex);
      this.sinkDown(smallestIndex)
    }
  }
}


const fs = require('fs');
const input = fs.readFileSync("./dev/stdin").toString().trim().split('\n').map(v => v.split(' ').map(v => +v));
const [E, _] = input.shift();
const [X, Y] = input.pop();
const S = 1;

let adj = Array.from(Array(E + 1), () => [])

input.forEach(x => {
  const [u, v, w] = x;
  adj[u].push([v, w]);
  adj[v].push([u, w]);
})

function route(s) {

  let cost = new Array(E + 1).fill(Infinity);
  cost[s] = 0;

  let heap = new MinHeap();
  heap.insert({ node: s, cost: 0 });

  while (!heap.empty()) {
    let now = heap.extractMin();
    for (let i = 0; i < adj[now.node].length; i++) {
      const [n, c] = adj[now.node][i];
      if (cost[n] > now.cost + c) {
        cost[n] = now.cost + c;
        heap.insert({ node: n, cost: cost[n] })
      }
    }
  }

  return cost
}

const routeS = route(S);
const routeX = route(X);
const routeY = route(Y);

const planA = routeS[X] + routeX[Y] + routeY[E];
const planB = routeS[Y] + routeY[X] + routeX[E];
if (planA == Infinity && planB == Infinity) {
  console.log(-1)
} else {
  console.log(planA > planB ? planB : planA)
}