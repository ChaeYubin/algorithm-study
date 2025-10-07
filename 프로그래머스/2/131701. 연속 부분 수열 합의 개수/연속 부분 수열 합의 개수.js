function solution(elements) {
    const answer = new Set();
    
    const el = elements.concat(elements);  // 원형임을 나타내기 위해 이어붙인 배열
    
    // 시작이 elements[i]인 연속 부분 수열
    for (let i = 0; i < elements.length; i += 1) {
        let p1 = i;
        let sum = 0;
        
        // 길이가 j인 연속 부분 수열
        for (let j = 0; j < elements.length; j += 1) {
            let p2 = p1 + j;
            
            sum += el[p2];
            
            answer.add(sum);
        }
    }
    
    return answer.size;
}