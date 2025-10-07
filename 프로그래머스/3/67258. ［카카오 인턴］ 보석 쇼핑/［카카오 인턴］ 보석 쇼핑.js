function solution(gems) {
    const gemMap = new Map();
    const gemKindSize = new Set(gems).size;
    
    gemMap.set(gems[0], 1);  // gemMap 초기값(1번 보석 포함)
    
    let p1 = 0;  
    let p2 = 0; 
    
    let answer = [0, gems.length];
    
    while (p1 <= p2 && p2 < gems.length) {
        // 모든 보석을 가진 구간인 경우
        if (gemMap.size === gemKindSize) {
            if (p2 - p1 < answer[1] - answer[0]) {
                answer = [p1, p2];
            }
            
            // 왼쪽 보석 제거
            gemMap.set(gems[p1], gemMap.get(gems[p1]) - 1);
            
            if (gemMap.get(gems[p1]) === 0) {
                gemMap.delete(gems[p1]);
            }
            
            p1++;
        } else {
            // 오른쪽 확장
            p2++;
            
            if (p2 === gems.length) {
                break;
            }
            
            gemMap.set(gems[p2], (gemMap.get(gems[p2]) || 0) + 1);
        }
    }
    
    return answer.map(v => v + 1);
}