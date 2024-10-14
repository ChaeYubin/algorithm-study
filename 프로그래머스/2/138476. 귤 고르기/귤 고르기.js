function solution(k, tangerine) {
    const sorted = tangerine.sort((a, b) => a - b);
    const counts = new Map();
    let maxCount = 0;  // 크기가 같은 귤의 최대 갯수

    for (const size of sorted) {
        counts.set(size, (counts.get(size) || 0) + 1);
        maxCount = Math.max(maxCount, counts.get(size));
    }

    let result = 0;
    let remainingCount = k;
    
    // 내림차순 정렬을 해서, 같은 사이즈의 귤이 많은 경우부터 선택한 것으로 생각한다.
    for (const count of [...counts.values()].sort((a, b) => b - a)) {
        if (remainingCount >= count){
            remainingCount -= count;
            result += 1;
        } else if (remainingCount > 0) {
            result += 1;
            break;
        } else {
            break;
        }
    }

    return result;
}