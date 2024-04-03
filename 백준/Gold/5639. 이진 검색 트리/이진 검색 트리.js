const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  add(value) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BinaryTree(value);
      } else {
        this.left.add(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BinaryTree(value);
      } else {
        this.right.add(value);
      }
    }
  }
}

const bt = new BinaryTree(Number(input.shift()));
const answer = [];

input.forEach((value) => {
  bt.add(Number(value));
});

function dfs(root) {
  if (root === null) return;

  dfs(root.left); // 왼쪽 서브트리 탐색
  dfs(root.right); // 오른쪽 서브트리 탐색
  answer.push(root.value); // 루트 노드 저장
}

function solution() {
  dfs(bt);

  console.log(answer.join("\n"));
}

solution();
