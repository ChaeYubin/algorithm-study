const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m, x, y, k] = input.shift().split(" ").map(Number);

const map = input.splice(0, n).map((v) => v.split(" ").map(Number));
const move = input.shift().split(" ").map(Number);

const moveDice = (dice, direction) => {
  const newDice = [...dice];

  switch (direction) {
    case 1:
      newDice[0] = dice[2];
      newDice[1] = dice[3];
      newDice[2] = dice[1];
      newDice[3] = dice[0];
      return newDice;
    case 2:
      newDice[0] = dice[3];
      newDice[1] = dice[2];
      newDice[2] = dice[0];
      newDice[3] = dice[1];
      return newDice;
    case 3:
      newDice[0] = dice[4];
      newDice[1] = dice[5];
      newDice[4] = dice[1];
      newDice[5] = dice[0];
      return newDice;
    case 4:
      newDice[0] = dice[5];
      newDice[1] = dice[4];
      newDice[4] = dice[0];
      newDice[5] = dice[1];
    default:
      return newDice;
  }
};

function solution(n, m, x, y, k, map, move) {
  const answer = [];

  // [윗면, 아랫면, 왼쪽면, 오른쪽면, 앞면, 뒷면]
  let dice = [0, 0, 0, 0, 0, 0];

  // 1: 동쪽, 2: 서쪽, 3: 북쪽, 4: 남쪽
  const direction = [null, [0, 1], [0, -1], [-1, 0], [1, 0]];

  move.forEach((dir) => {
    const [dx, dy] = direction[dir];
    const [nx, ny] = [x + dx, y + dy];

    if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
      [x, y] = [nx, ny];
      dice = moveDice(dice, dir);

      if (map[x][y] === 0) map[x][y] = dice[1];
      else {
        dice[1] = map[x][y];
        map[x][y] = 0;
      }
      answer.push(dice[0]);
    }
  });

  return answer.join("\n");
}

console.log(solution(n, m, x, y, k, map, move));
