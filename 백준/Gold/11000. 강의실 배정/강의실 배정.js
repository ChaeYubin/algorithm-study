const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const lecture = [];

input.map((line) => {
  const [startTime, endTime] = line.split(" ").map(Number);
  lecture.push({ time: startTime, isStart: 1 });
  lecture.push({ time: endTime, isStart: -1 });
});

function solution(n, lecture) {
  const sortedLecture = lecture.sort((a, b) =>
    a.time === b.time ? a.isStart - b.isStart : a.time - b.time
  );

  let maxCount = 0;
  let curCount = 0;

  for (const lectureTime of sortedLecture) {
    if (lectureTime.isStart === 1) {
      curCount += 1;
    } else {
      curCount -= 1;
    }
    maxCount = Math.max(curCount, maxCount);
  }

  return maxCount;
}

console.log(solution(n, lecture));
