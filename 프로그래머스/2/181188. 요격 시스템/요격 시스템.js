function solution(targets) {
    const sortedTargets = targets.sort((a, b) => a[1] - b[1]);
    
    let end = 0;
    let answer = 0;
    
    for (let target of sortedTargets) {
        if (target[0] >= end) {
            answer++;
            end = target[1];
        }
    }
    
    return answer;
}