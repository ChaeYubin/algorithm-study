function solution(arr) {
    const answer = [0, 0];
    
    function divideConquer(x, y, n) {
        const temp = [0, 0];
        
        for (let i = x; i < x + n; i++) {
            for (let j = y; j < y + n; j++) {
                if (arr[i][j] === 0) {
                    temp[0]++;
                } else {
                    temp[1]++;
                }
            }
        }
        
        if (temp[0] === 0) {
            answer[1]++;
        } else if (temp[1] === 0) {
            answer[0]++;
        } else {
            divideConquer(x, y, n / 2);  // 1사분면
            divideConquer(x, y + n / 2, n / 2);  // 2사분면
            divideConquer(x + n / 2, y, n / 2);  // 3사분면
            divideConquer(x + n / 2, y + n / 2, n / 2);  // 4사분면
        }
    }
    
    divideConquer(0, 0, arr.length);
    
    return answer;
}