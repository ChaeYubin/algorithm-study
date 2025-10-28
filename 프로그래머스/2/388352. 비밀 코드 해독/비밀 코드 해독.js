function solution(n, q, ans) {
    let count = 0;
    
    const dfs = (index, combo) => {
        if (combo.length > 5) return;  // 5개 이상이면 종료
        
        if (index === n) {
            if (combo.length === 5) {
                // 모든 q와 ans 조건 체크
                let valid = true;
                
                for (let i = 0; i < q.length; i++) {
                    const match = combo.filter(v => q[i].includes(v)).length;
                    
                    if (match !== ans[i]) {
                        valid = false;
                        break;
                    }
                }
                
                if (valid) count++;
            }
    
            return;
        }
        
        // 숫자 index + 1 선택하지 않는 경우
        dfs(index + 1, combo);
        
        // 숫자 index + 1 선택하는 경우
        dfs(index + 1, [...combo, index + 1]);
    }
    
    dfs(0, []);
    return count;
}
