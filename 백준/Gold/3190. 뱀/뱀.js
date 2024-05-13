const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const k = +input.shift();

const board = Array.from({ length: n }, () =>
  Array.from({ length: n }, () => 0)
);

for (let i = 0; i < k; i += 1) {
  const [x, y] = input.shift().split(" ").map(Number);
  board[x - 1][y - 1] = 2; // 2: 사과
}

const l = +input.shift();

const command = input.map((c) => {
  const [val, type] = c.split(" ").map((v, i) => {
    if (i === 0) return Number(v);
    else return v;
  });

  return [val, type];
});

function solution(n, k, b, l, c) {
  let answer = 0;

  const board = JSON.parse(JSON.stringify(b));
  const command = c;

  const snake = [[0, 0]];
  board[0][0] = 1; // 1: 뱀

  // 오른쪽을 바라본 상태에서 왼쪽으로 회전할 때의 방향
  const rotation = [
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 0],
  ];

  let rotationIndex = 0; // 뱀은 처음에 오른쪽을 향한다.

  let nextCommand = 0;
  let [val, type] = command[nextCommand];

  while (true) {
    answer += 1;

    const [x, y] = snake[snake.length - 1];

    let nx = x + rotation[rotationIndex][0];
    let ny = y + rotation[rotationIndex][1];

    // 벽이나 자기 자신의 몸과 부딪히면 게임이 끝난다.
    if (nx < 0 || nx >= n || ny < 0 || ny >= n || board[nx][ny] === 1) {
      break;
    }

    // 만약 이동한 칸에 사과가 있다면, 그 칸에 있던 사과가 없어지고 꼬리는 움직이지 않는다.
    if (board[nx][ny] === 2) {
      board[nx][ny] = 1;
      snake.push([nx, ny]);
    } else {
      // 만약 이동한 칸에 사과가 없다면, 꼬리가 위치한 칸을 비워준다.
      board[nx][ny] = 1;
      snake.push([nx, ny]);
      const [tailX, tailY] = snake.shift();
      board[tailX][tailY] = 0;
    }

    if (val === answer) {
      if (type === "L") {
        rotationIndex = (rotationIndex + 1) % 4;
      } else {
        rotationIndex =
          rotationIndex - 1 < 0
            ? rotationIndex - 1 + 4
            : (rotationIndex - 1) % 4;
      }

      nextCommand += 1;

      if (nextCommand < command.length) {
        [val, type] = command[nextCommand];
      } else {
        val = 0;
      }
    }
  }

  return answer;
}

console.log(solution(n, k, board, l, command));
