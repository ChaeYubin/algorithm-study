function solution(numbers) {
    let answer = 0;
    
    for (let i = 1; i <= 9; i += 1) {
        if (!numbers.includes(i)) {
            answer += i;
        }
    }
    
    return answer;
}