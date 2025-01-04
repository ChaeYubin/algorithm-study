function solution(n, m, x, y, r, c, k) {
    let answer = 'zzzzz';
    
    const isValid = (x, y) => {
        return x >= 0 && x < n && y >= 0 && y < m;
    }
    
    const directions = ['d', 'l', 'r', 'u']; // 알파벳 순서에 따라 이동 방향 지정
    const moves = { 'd': [1, 0], 'l': [0, -1], 'r': [0, 1], 'u': [-1, 0] };
    
    const dfs = (x, y, route) => {
        if (answer !== 'zzzzz') return;
        
        // Pruning: 남은 거리 확인
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