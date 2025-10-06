function solution(sticker) {
    const n = sticker.length;
    
    if (n === 1) return sticker[n - 1];
    
    // 첫 번째 스티커를 뜯는 경우 -> 마지막 스티커는 뜯을 수 없다
    const dp1 = Array(n).fill(0);
    
    dp1[0] = sticker[0];
    dp1[1] = sticker[0];
    
    for (let i = 2; i < n; i++) {
        dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + sticker[i]);
    }
    
    // 첫 번째 스티커를 뜯지 않는 경우 -> 마지막 스티커를 뜯을 수 있다
    const dp2 = Array(n).fill(0);
    
    dp2[0] = 0;
    dp2[1] = sticker[1];
    
    for (let i = 2; i < n; i++) {
        dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + sticker[i]);
    }
    
    return Math.max(dp1[n - 2], dp2[n - 1]);
}