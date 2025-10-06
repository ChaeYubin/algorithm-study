function solution(schedules, timelogs, startday) {
    const toMinutes = (value) => Math.floor(value / 100) * 60 + (value % 100);  // 시간 기록을 분 단위로 변환
    const n = schedules.length;

    const dayOfTheWeek = Array.from({ length: 7 }, (_, i) => (startday + i) % 7);
    const weekdayLogs = timelogs.map(logs =>
        logs.filter((_, i) => dayOfTheWeek[i] !== 0 && dayOfTheWeek[i] !== 6)
    );  // 주말 제외

    const isWinner = Array(n).fill(true);

    for (let i = 0; i < n; i++) {
        const schedule = toMinutes(schedules[i]);
        for (let j = 0; j < 5; j++) {
            const timelog = toMinutes(weekdayLogs[i][j]);
            
            if (timelog - schedule > 10) {
                isWinner[i] = false;
                break;
            }
        }
    }

    return isWinner.reduce((count, v) => count + (v ? 1 : 0), 0);
}