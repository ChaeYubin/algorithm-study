function solution(array, commands) {
    const answer = [];
    
    for (let [s, e, k] of commands) {
        answer.push(array.slice(s - 1, e).sort((a, b) => a - b)[k - 1]);
    }
    
    return answer;
}