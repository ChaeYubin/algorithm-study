const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const t = +input.shift();

const answer = [];

function solution(func, n, numbers) {
  const funcArray = func.split("");
  const tmpNumbers = [...numbers];

  // 수를 왼쪽부터 가리킬 때. false가 되면 수를 오른쪽부터 가리키고 있다(순서가 뒤집힘)고 간주한다.
  let isStartFront = true;

  for (let i = 0; i < func.length; i += 1) {
    if (funcArray[i] === "R") {
      isStartFront = !isStartFront;
    } else if (funcArray[i] === "D") {
      if (tmpNumbers.length === 0) {
        return "error";
      }

      if (isStartFront) {
        tmpNumbers.shift();
      } else {
        tmpNumbers.pop();
      }
    }
  }

  return isStartFront
    ? JSON.stringify(tmpNumbers)
    : JSON.stringify(tmpNumbers.reverse());
}

for (let i = 0; i < t; i += 1) {
  const func = input[i * 3];
  const n = +input[i * 3 + 1];
  const numbers = JSON.parse(input[i * 3 + 2]);

  answer.push(solution(func, n, numbers));
}

console.log(answer.join("\n"));
