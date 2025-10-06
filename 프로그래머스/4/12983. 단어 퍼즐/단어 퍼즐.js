function solution(strs, t) {
    const n = t.length;
    // dp[i] = 문자열 t의 0번째부터 i번째 문자까지(t[0..i-1])를 만드는 데 필요한 최소 조각 수
    const dp = Array(n + 1).fill(Infinity);
    dp[0] = 0; 
    
    for (let i = 1; i <= n; i++) {
        for (let s of strs) {
            const len = s.length;
            
            if (i - len >= 0 && t.slice(i - len, i) === s) {
                dp[i] = Math.min(dp[i], dp[i - len] + 1);
            }
        }
    }
    
    return dp[n] === Infinity ? -1 : dp[n];
}