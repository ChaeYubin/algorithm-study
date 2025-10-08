function solution(begin, target, words) {
    const visited = Array(words.length).fill(0);  // 방문 여부 체크 배열(한번 확인했던 단어는 확인할 필요가 없으므로)
    
    const queue = [];
    queue.push([begin, 0]);  // [단어, 단어에 도달한 단계]
    
    // 규칙에 따라 변환 가능한지 확인하는 함수
    const isConvertable = (str1, str2) => {
        let different = 0;
        
        for (let i = 0; i < str1.length; i++) {
            if (str1[i] !== str2[i]) {
                if (++different > 1) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    while (queue.length > 0) {
        const [current, stage] = queue.shift();
        
        for (let i = 0; i < words.length; i++) {
            if (visited[i]) continue;  // 방문한 적 있다면 스킵
            
            if (isConvertable(current, words[i])) {
                if (words[i] === target) {
                    return stage + 1;  // target을 발견하면 즉시 리턴
                }
                
                // target이 아닌 경우 방문 처리하고 다음 탐색에 포함
                visited[i] = 1;
                queue.push([words[i], stage + 1]);
            }
        } 
    }
  
    return 0;
}