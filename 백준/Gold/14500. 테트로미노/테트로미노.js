const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const arr = [];

input.forEach((row) => arr.push(row.split(" ").map(Number)));

let visited = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => false)
);

const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

let answer = 0;

function dfs(x, y, num, sum) {
  if (num === 4) {
    answer = Math.max(answer, sum);
    return;
  }

  // 상하좌우 확인하며 방문하지 않은 곳이었다면 방문한다.
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= n || ny < 0 || ny >= m || visited[nx][ny]) continue;

    visited[nx][ny] = true;
    dfs(nx, ny, num + 1, sum + arr[nx][ny]);
    visited[nx][ny] = false; // 다시 돌아왔으므로 방문 처리 해제
  }
}

function func(x, y) {
  // 'ㅜ' 모양 만들기
  if (y - 1 >= 0 && y + 1 < m && x + 1 < n) {
    let tmp = arr[x][y - 1] + arr[x][y] + arr[x][y + 1] + arr[x + 1][y];
    answer = Math.max(answer, tmp);
  }

  // 'ㅏ' 모양 만들기
  if (x - 1 >= 0 && x + 1 < n && y + 1 < m) {
    let tmp = arr[x - 1][y] + arr[x][y] + arr[x + 1][y] + arr[x][y + 1];
    answer = Math.max(answer, tmp);
  }

  // 'ㅗ' 모양 만들기
  if (x - 1 >= 0 && y - 1 >= 0 && y + 1 < m) {
    let tmp = arr[x][y] + arr[x][y - 1] + arr[x][y + 1] + arr[x - 1][y];
    answer = Math.max(answer, tmp);
  }

  // 'ㅓ' 모양 만들기
  if (y - 1 >= 0 && x - 1 >= 0 && x + 1 < n) {
    let tmp = arr[x][y - 1] + arr[x][y] + arr[x - 1][y] + arr[x + 1][y];
    answer = Math.max(answer, tmp);
  }
}

function solution(n, m, arr) {
  // [i][j]부터 시작하여 테트로미노를 만들 수 있는 경우를 찾는다.
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      // 'ㅜ' 모양 제외하고 만들기
      visited[i][j] = true;
      dfs(i, j, 1, arr[i][j]);
      visited[i][j] = false;

      // 'ㅜ' 모양 만들기
      func(i, j);
    }
  }

  return answer;
}

console.log(solution(n, m, arr));
