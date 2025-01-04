function solution(n, m, x, y, r, c, k) {
    let answer = 'zzzzz';
    
    const isValid = (x, y) => {
        return x >= 0 && x < n && y >= 0 && y < m;
    }
    
    const directions = ['d', 'l', 'r', 'u']; // 알파벳 순서에 따라 이동 방향 지정
    const moves = { 'd': [1, 0], 'l': [0, -1], 'r': [0, 1], 'u': [-1, 0] };
    
    const dfs = (x, y, route) => {
        // moves를 사전 순으로 설정해두면 처음으로 발견한 answer가 답이다. 이후 과정은 필요없으므로 리턴.
        if (answer !== 'zzzzz') return;
        
        // 목표 지점까지 남은 거리가 움직일 수 있는 거리보다 크거나,
        // 목표 지점까지 남은 거리와 이동해야 하는 거리의 차가 홀수이면 리턴
        // ㄴ 홀수이면 목표 지점에 딱 도착할 수 없음
        const remainingSteps = k - route.length;
        const manhattanDistance = Math.abs(x - (r - 1)) + Math.abs(y - (c - 1));
        
        if (manhattanDistance > remainingSteps || (remainingSteps - manhattanDistance) % 2 !== 0) {
            return;
        }
        
        if (route.length === k) {
            if (x === r - 1 && y === c - 1) {
                answer = route < answer ? route : answer;
            }
            return;
        }
        
        for (let dir of directions) {
            const [nx, ny] = [x + moves[dir][0], y + moves[dir][1]];
            
            if (isValid(nx, ny)) {
                dfs(nx, ny, route + dir);
            }
        }
    }
    
    dfs(x - 1, y - 1, '');
    return answer === 'zzzzz' ? 'impossible' : answer;
}