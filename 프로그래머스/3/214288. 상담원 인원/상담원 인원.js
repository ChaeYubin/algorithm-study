function solution(k, n, reqs) {
    // 1. 유형별로 상담 요청 분리
    const byType = Array.from({ length: k }, () => []);
    
    for (const [start, duration, type] of reqs) {
        byType[type - 1].push([start, duration]);
    }
    
    // 시작 시간 기준 정렬
    for (let i = 0; i < k; i++) {
        byType[i].sort((a, b) => a[0] - b[0]);
    }
    
    // 2. cost[type][m] = 해당 유형에 멘토 m명을 배정했을 때 총 대기 시간
    const cost = Array.from({ length: k }, () => Array(n + 1).fill(0));
    
    const simulate = (request, m) => {
        let waitTime = 0;
        
        // mentors[i] = i번째 멘토가 끝나는 시간
        const mentors = Array(m).fill(0);
        
        for (const [start, duration] of request) {
            // 1. 가장 빨리 끝나는 멘토 찾기
            let idx = 0;
            for (let i = 1; i < m; i++) {
                if (mentors[i] < mentors[idx]) {
                    idx = i;
                }
            }
            
            // 2. 이 상담이 실제로 시작되는 시간
            const realStart = Math.max(start, mentors[idx]);
            
            // 3. 대기시간 누적
            waitTime += realStart - start;
            
            // 4. 멘토 종료 시간 갱신
            mentors[idx] = realStart + duration;
        }
        
        return waitTime;
    }
    
    // 멘토 수 1~n까지 시뮬레이션 해서 cost 채우기
    for (let i = 0; i < k; i++) {
        for (let j = 1; j <= n; j++) {
            cost[i][j] = simulate(byType[i], j);
        }
    }
 
    const INF = Number.MAX_SAFE_INTEGER;
    
    // dp[i][j]: i번째 유형까지 고려했을 때 멘토를 j명 사용한 최소 대기시간
    const dp = Array.from({ length: k + 1 }, () => Array(n + 1).fill(INF));
    
    dp[0][0] = 0;
    
    for (let i = 1; i <= k; i++) {
        for (let j = i; j <= n; j++) {
            // i번째 유형에 x명의 멘토 배정
            for (let x = 1; x <= j; x++) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - x] + cost[i - 1][x]);
            }
        }
    }
    
    return dp[k][n];
}