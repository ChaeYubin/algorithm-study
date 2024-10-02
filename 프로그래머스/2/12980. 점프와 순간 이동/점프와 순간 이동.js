function solution(n) {
    let answer = 0;
    let num = n;
    
    while (num > 0) {
        if (num % 2 === 0) {
            num /= 2;
        } else {
            num -= 1;
            answer += 1;
        }
    }
    
    return answer;
}