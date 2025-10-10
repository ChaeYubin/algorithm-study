function solution(m, n, puddles) {
    const MOD = 1000000007;
    
    // dp[i][j] - (i + 1, j + 1) 칸에 도달할 수 있는 경우의 수
    const dp = Array.from({ length: n }, () => Array(m).fill(0));
    
    // 시작 위치 초기화
    dp[0][0] = 1;
    
    // 웅덩이 위치 표시
    puddles.forEach(([x, y]) => dp[y - 1][x - 1] = -1);

    for (let i = 0; i < n; i += 1) {
        for (let j = 0; j < m; j += 1) {
            if (i === 0 && j === 0) continue;
            
            if (dp[i][j] === -1) {
                dp[i][j] = 0; // 웅덩이는 0으로 처리
                continue;
            }
            
            const fromTop = i > 0 ? dp[i - 1][j] : 0;
            const fromLeft = j > 0 ? dp[i][j - 1] : 0;
            
            dp[i][j] = (fromTop + fromLeft) % MOD;
        }
    }
    
    return dp[n - 1][m - 1];
}