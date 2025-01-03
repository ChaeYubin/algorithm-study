function solution(n, left, right) {
    // (a, b) 좌표에 해당하는 칸의 수 = (a와 b 중 더 큰 수) + 1
    return Array.from({ length: right - left + 1 }, (_, i) => {
        const row = Math.floor((i + left) / n);
        const col = (i + left) % n;
        return Math.max(row, col) + 1;
    });
}