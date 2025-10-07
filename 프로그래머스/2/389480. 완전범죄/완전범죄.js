function solution(info, n, m) {
    const memo = new Map();
    
    const dfs = (index, a, b) => {
        // 종료 조건
        if (a >= n || b >= m) return Infinity;  // 둘 중 하나라도 한계 넘으면 불가능
        if (index === info.length) return a;  // 모든 물건을 훔쳤을 때 A 흔적 개수 리턴
        
        // 메모이제이션 키
        const key = `${index}-${a}-${b}`;
        if (memo.has(key)) return memo.get(key);
        
        // A가 훔칠 경우
        const takeA = dfs(index + 1, a + info[index][0], b);
        
        // B가 훔칠 경우
        const takeB = dfs(index + 1, a, b + info[index][1]);
        
        // 둘 중 최솟값으로 갱신
        const result = Math.min(takeA, takeB);
        memo.set(key, result);
        
        return result;
    }
    
    const answer = dfs(0, 0, 0);
    
    return answer === Infinity ? -1 : answer;
}