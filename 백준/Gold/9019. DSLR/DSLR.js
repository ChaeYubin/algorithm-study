const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const t = +input.shift();

function D(n) {
  return n * 2 > 9999 ? (n * 2) % 10000 : n * 2;
}

function S(n) {
  return n === 0 ? 9999 : n - 1;
}

function L(n) {
  return (n % 1000) * 10 + Math.floor(n / 1000);
}

function R(n) {
  return Math.floor(n / 10) + (n % 10) * 1000;
}

function DSLR(a, b) {
  const visited = Array.from({ length: 10000 }, () => false);
  visited[a] = true;

  const queue = [];
  queue.push([a, ""]);

  const func = [D, S, L, R];

  while (true) {
    const [value, command] = queue.shift();

    for (let i = 0; i < 4; i += 1) {
      const nextValue = func[i](value);

      if (visited[nextValue]) continue;
      else visited[nextValue] = true;

      if (nextValue === b) {
        return command + func[i].name;
      }

      queue.push([nextValue, command + func[i].name]);
    }
  }
}

const answer = [];

input.forEach((tc) => {
  const [a, b] = tc.split(" ").map(Number);
  answer.push(DSLR(a, b));
});

console.log(answer.join("\n"));
