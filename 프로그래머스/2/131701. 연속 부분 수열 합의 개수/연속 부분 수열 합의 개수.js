function solution(elements) {
    const n = elements.length;
    const el = elements.concat(elements);
    const prefix = [0];
    
    // 누적합 배열 생성
    for (let i = 0; i < el.length; i++) {
        prefix[i + 1] = prefix[i] + el[i];
    }
    
    const answer = new Set();
    
    // 부분 수열 길이(1~n)
    for (let len = 1; len <= n; len++) {
        for (let start = 0; start < n; start++) {
            const end = start + len;
            const sum = prefix[end] - prefix[start];
            answer.add(sum);
        }
    }
    
    return answer.size;
}