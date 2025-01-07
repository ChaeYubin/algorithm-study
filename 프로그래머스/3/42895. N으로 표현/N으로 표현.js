function solution(N, number) {
    const dp = {};
    
    for (let i = 0; i <= 8; i++) {
        dp[i] = (new Set());
    };
    
    // N을 i번 반복한 숫자를 만들어서 집합에 추가
    for (let i = 1; i <= 8; i++) {
        let baseNum = N.toString().repeat(i);
        dp[i].add(Number(baseNum));
        
        // 가능한 모든 경우를 탐색하면서 숫자를 만들어 집합에 추가
        for (let j = 1; j < i; j++) {
            for (let op1 of dp[j]) {
                for (let op2 of dp[i - j]) {
                    dp[i].add(op1 + op2);
                    dp[i].add(op1 - op2);
                    dp[i].add(op1 * op2);
                    
                    if (op2 !== 0) {
                        dp[i].add(op1 / op2);
                    }
                }
            }
        }
        
        // 목표 숫자가 집합에 있으면 최솟값 갱신 후 종료
        if (dp[i].has(number)) {
            return i;
        }
    }
    
    return -1;
}