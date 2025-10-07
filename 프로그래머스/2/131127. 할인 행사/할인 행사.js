function solution(want, number, discount) {
    const map = new Map();  // 필요한 제품의 수
    
    for (let i = 0; i < want.length; i++) {
        map.set(want[i], number[i]);
    }
    
    let answer = 0;
    
    let p1 = 0;
    let p2 = 9;
    
    // map 초기값 설정
    for (let i = 0; i < 10; i++) {
        map.set(discount[i], (map.get(discount[i]) || 0) - 1);
    }
    
    while (p2 < discount.length) {
        // 정답인지 확인하여 카운팅
        const isAnswer = [...map.values()].filter(v => v > 0).length === 0;
        
        if (isAnswer) {
            answer++;
        }
        
        // 정답이 아니라면 p1, p2 한 칸씩 이동
        map.set(discount[p1], (map.get(discount[p1]) || 0) + 1);
        p1++;
        
        p2++;
        map.set(discount[p2], (map.get(discount[p2]) || 0) - 1);
    }
   
    
    return answer;
}