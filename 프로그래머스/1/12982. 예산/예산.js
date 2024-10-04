function solution(d, budget) {
    let answer = 0;
    
    let bg = budget;
    const sorted = d.sort((a, b) => a - b);
    
    for (let i = 0; i < d.length; i += 1) {
        if (d[i] > bg) {
            break;
        } else {
            bg -= d[i];
            answer += 1;
        }
    }
    
    return answer;
}